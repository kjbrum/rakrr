# Scrapr - (WIP)

> Node CLI to easily scrape the web with predefined JSON templates.

### Install

```
$ npm install -g scrapr
```

```
$ scrapr --help

  Usage:,
    scrapr <url> <options>

  Example:
    scrapr thechangelog.com --template=scrapr-template --strip-tags

  Options:
    --template    The JSON template file to use for extracting the data.
    --format      Output format: (json|csv)
    --strip-tags  Strip HTML tags from the returned results.
```

### License
MIT © [Kyle Brumm](http://kylebrumm.com)