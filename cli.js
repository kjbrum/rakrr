#!/usr/bin/env node
'use strict';

var meow  = require('meow');
var chalk   = require('chalk');
var siftr = require('./');
var warn = chalk.yellow;

// Handle the arguments
var cli = meow({
    help: [
        'Usage:',
        '  siftr <url> <options>',
        '',
        'Example:',
        '  siftr http://sassbreak.com --template=templates/siftr-template-sassbreak.json --strip-tags',
        '',
        'Options:',
        '  --template    Path to a JSON template file to use for extracting the data. (Default: scrapr-template.json)',
        '  --filename    Pass a file name to use when saving the data.',
        '  --format      Output format: json|csv|xml',
        '  --strip-tags  Strip HTML tags from the returned results.'
    ].join('\n')
});

// Check if a URL is supplied
if(!cli.input[0]) {
    console.error(warn('You must provide a URL.'));
    process.exit(1);
}

// Check if a template file is supplied
if(!cli.flags.template) {
    cli.flags.template = 'siftr-template.json';
    // console.log(warn('You must supply a template file.'));
    // process.exit(1);
}

// Call the siftr module
siftr(cli.input[0], cli.flags, function(err, res) {
    if(err) {
        if(err.noStack) {
            console.error(err.message);
            process.exit(1);
        } else {
            throw err;
        }
    }

    process.exit(0);
});
