# Siftr - (WIP)

> Node CLI to easily scrape the web with predefined JSON templates.

### Install

```
$ npm install -g siftr
```

```
$ siftr --help

  Usage:,
    siftr <url> <options>

  Example:
    siftr thechangelog.com --template=templates/siftr-template.json --strip-tags

  Options:
    --template    Path to a JSON template file to use for extracting the data.
    --filename    Pass a file name to use when saving the data.
    --format      Output format: (json|csv)
    --strip-tags  Strip HTML tags from the returned results.
```

### License
MIT © [Kyle Brumm](http://kylebrumm.com)