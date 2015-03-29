'use strict';
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var chalk   = require('chalk');

// Setup colors
var success = chalk.green;
var warn    = chalk.yellow;
var error   = chalk.red;


var rakrr = module.exports = function(url, opts, cb) {
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
    var url = 'http://corporatecontracts.com/blog';
    collectData(url, opts);

};


function collectData(url, opts) {
    request(url, function(err, response, html) {

        // Check to make sure there are no errors
        if(!err) {

            if(!opts.template) {
                console.log(warn('You must supply a template file.'));
                process.exit(1);
            }

            var template = getTemplate(opts.template);

            console.log(template);

            for(var i = 0; i < Object.keys(template).length; i++) {
                var selector = template[i];
                console.log(selector);
            }

            process.exit(0);

            // Load the html with cheerio
            // var $ = cheerio.load(html);

            // var pieces, band, album, year;
            // var result = {};

            // $('.blog-posts .post h3 a').each(function(i) {
            //     var data = $(this).text();
            //     pieces = data.split(/[-(]+/);

            //     result[i] = {};

            //     result[i].band  = pieces[0].trim();
            //     result[i].album = pieces[1].trim();
            //     result[i].year  = pieces[2].replace(/[\D]+/, '');
            // });

            // console.log(success('New Albums:'));
            // console.log(success(JSON.stringify(result, null, 4)));

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