'use strict';
// var fs      = require('fs');
// var exec    = require('child_process').exec;
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

    // console.log(url, opts);

    // Example URL
    var url = 'http://www.deathdjentcore.net/';
    collectData(url);

};

function collectData(url) {
    request(url, function(err, response, html) {

        // Check to make sure there are no errors
        if(!err){

            // Load the html with cheerio
            var $ = cheerio.load(html);


            var pieces, band, album, year;
            var result = {};

            $('.blog-posts .post h3 a').each(function(i) {
                var data = $(this).text();
                pieces = data.split(/[-(]+/);

                result[i] = {};

                result[i].band  = pieces[0].trim();
                result[i].album = pieces[1].trim();
                result[i].year  = pieces[2].replace(/[\D]+/, '');
            });

            console.log(success('New Albums:'));
            console.log(success(JSON.stringify(result, null, 4)));


        } else {
            console.log(error('Error: ' + err));
        }
    });
}
