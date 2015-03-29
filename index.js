'use strict';
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var chalk   = require('chalk');

// Setup colors
var success = chalk.green;
var warn    = chalk.yellow;
var error   = chalk.red;


var siftr = module.exports = function(url, opts, cb) {
    if(typeof opts !== 'object') {
        cb = opts;
        opts = {};
    }

    if(!url) {
        throw new Error('URL required');
    }

    if(typeof cb !== 'function') {
        throw new Error('Callback required');
    }


    // Example URL
    // var url = 'http://corporatecontracts.com/blog';
    collectData(url, opts);

};


function collectData(url, opts) {
    request(url, function(err, response, html) {

        // Check to make sure there are no errors
        if(!err) {
            // Load the html with cheerio
            var $        = cheerio.load(html);
            var results  = {};
            var template = getTemplate(opts.template);
            var loops    = template.loops;

            // Loop through supplied loops
            for(var l in loops) {
                if(loops.hasOwnProperty(l)) {
                    var loop = loops[l];

                    $(loop.loopSelector).each(function(i, el) {
                        var selector = $(this);
                        results[i]   = {};

                        // console.log(success(JSON.stringify(loop.data, null, 4)));

                        // Loop through the data we need to get
                        var data = loop.data;
                        for(var d in data) {
                            if(data.hasOwnProperty(d)) {
                                // console.log(opts.stripTags);
                                if(opts.stripTags == true) {
                                    results[i][d] = selector.find(data[d]).text();
                                } else {
                                    results[i][d] = selector.find(data[d]).html();
                                }
                            }
                        }
                    });
                }
            }

            // console.log(success('Posts:'));
            console.log(success(JSON.stringify(results, null, 4)));

        } else {
            console.log(error('Error: ' + err));
        }
    });
}


function getTemplate(template) {
    try {
        template = fs.readFileSync(template, 'utf8');
    } catch(e) {
        console.log(error(e));
        process.exit(0);
    }
    return JSON.parse(template);
}