# Rakrr - (WIP)

> Node CLI to easily scrape the web with predefined JSON templates.

### Install

```
$ npm install -g rakrr
```

```
$ rakrr --help

  Usage:,
    rakrr <url> <options>

  Example:
    rakrr thechangelog.com --template=templates/rakrr-template.json --strip-tags

  Options:
    --template    Path to a JSON template file to use for extracting the data.
    --format      Output format: (json|csv)
    --strip-tags  Strip HTML tags from the returned results.
```

### License
MIT © [Kyle Brumm](http://kylebrumm.com)