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
    siftr http://sassbreak.com --template=templates/siftr-template-sassbreak.json --strip-tags

  Options:
    --template    Path to a JSON template file to use for extracting the data. (Default: scrapr-template.json)
    --filename    Pass a file name to use when saving the data.
    --format      Output format: json|csv|xml
    --strip-tags  Strip HTML tags from the returned results.
```


### To-Do

- Unrequire the user to pass http with the URL
- Ablility to grab thumbnail/file URLs (possibly a flag to download them)
- Additional output formats (csv|xml)
- More complicated loops with advanced options
- Have each set loopSelector data get saved to it's own output file
- Check if output file already exists (prompt or exit without saving)


### License
MIT © [Kyle Brumm](http://kylebrumm.com)