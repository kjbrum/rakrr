#! /usr/bin/env node
'use strict';
var meow   = require('meow');
var rakrr = require('./');

var cli = meow({
  help: [
    'Usage:',
    '  rakrr <url> <options>',
    '',
    'Example:',
    '  rakrr http://deathdjentcore.net --template=rakrr-template --strip-tags',
    '',
    'Options:',
    '  --template    The JSON template file to use for extracting the data.',
    '  --format      Output format: (json|csv)',
    '  --strip-tags  Strip HTML tags from the returned results.'
  ].join('\n')
});

if (!cli.input[0]) {
    console.error('You must provide a URL.');
    process.exit(1);
}

rakrr(cli.input[0], cli.flags, function (err, res) {
    if (err) {
        if (err.noStack) {
            console.error(err.message);
            process.exit(1);
        } else {
            throw err;
        }
    }

    process.exit(0);
});