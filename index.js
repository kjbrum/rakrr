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

            for(var x=0; x < template.loops.length; x++) {
                var loop = template.loops[x];

                // $('"'+loop.loopSelector+'"').each(function(i, el) {
                $("#main .post").filter(function(i, el) {
                    var data   = $(this);
                    results[i] = {};

                    results[i]['post_title']   = data.find('.post-title a').text();
                    results[i]['post_content'] = data.find('.entry-content').text();
                    results[i]['post_author']  = data.find('.post-header-meta .the-author a').text();
                    results[i]['post_date']    = data.find('.post-header-meta .the-time').text();
                });
            }

            console.log(success('Posts:'));
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