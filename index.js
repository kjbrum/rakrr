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

                        // Loop through the data we need to get
                        var data = loop.data;
                        for(var d in data) {
                            if(data.hasOwnProperty(d)) {
                                // Remove tags if flag is set
                                if(opts.stripTags) {
                                    results[i][d] = selector.find(data[d]).text().replace(/(\n|\t)/gm, '').trim();
                                } else {
                                    results[i][d] = selector.find(data[d]).html().replace(/(\n|\t)/gm, '').trim();
                                }
                            }
                        }
                    });
                }
            }

            // Save our data to a file
            saveFile(opts, results);

            // console.log(success(JSON.stringify(results, null, 4)));

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


function saveFile(opts, results) {
    if(opts.filename) {
        var filename = opts.filename+'.json';
    } else {
        var filename = 'siftr-results.json'
    }

    fs.writeFile(filename, JSON.stringify(results, null, 4), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(success('Data has been saved to '+filename+'.json'));
    });
}