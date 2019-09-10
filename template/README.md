# Carafe Bundle Development

You can directly edit the src files, or you can import an an existing Bundle.

## Prerequisites

You will need to have [Node.js and NPM installed](https://nodejs.org/en/download/) to use this utility.

## Install

You need to install the project before the rest of the npm scripts will work.

```bash
npm install
```

Once your project is installed, you can use the following commands.

## Validate
```bash
# Validate Bundle file
npm run validate <path/to/bundle.json>
```

## Import
```bash
# Import Bundle file
npm run import <path/to/bundle.json>
```

**CAUTION:** The import command overwrites all src files without warning.

## Build
When you are ready to publish your Bundle, you can call either of the following commands, both which will generate a JSON Bundle file in the project dist directory:

```bash
npm run build
```

## Send
By default, Send will prompt you in FileMaker if the Bundle already exists to let you choose to version it or rename it or overwrite it. During development of a new Bundle, a common use case is to automatically overwrite without a prompt. This is what Force Send is designed for. Use this option with caution.

```bash
# Build Bundle file and Send it to FileMaker
npm run send

# Use with care: Sends to Carafe in FileMaker without overwrite warnings
npm run force-send
```

## Watch
During development you can use the built-in live server to test changes as you go:

```bash
# Watch on the default Port 8080
npm run watch
```

```bash
# Watch on a custom Port
npm run watch-port <port>
```

## Watch and Send
The development server can also be told to Send each build to FileMaker automatically

```bash
# Watch on the default Port 8080 and Send
npm run watch-send
```

```bash
# Watch on a custom Port and Send
npm run watch-send-port <port>
```


## Force Watch and Send
By default, Send will prompt you in FileMaker if the Bundle already exists to let you choose to version it or rename it or overwrite it. During development of a new Bundle, a common use case is to automatically overwrite without a prompt. This is what Force Watch and Send is designed for. Use this option with caution.

```bash
# Watch on the default Port 8080 and Send
npm run force-watch-send
```

```bash
# Watch on a custom Port and Send
npm run force-watch-send-port <port>
```

## Advanced Settings
Your `package.json` file contains a `carafe` object with the following defaults.

```
  "carafe": {
    "templateFilename": "src/template.carafe",
    "configFilename": "src/config.json",
    "dataFilename": "src/data.json",
    "metaFilename": "src/meta.json",
    "previewFilename": "src/preview.jpg",
    "librariesDirname": "src/libraries",
    "sendFmpUrl": "",
    "watchedFiles": {}
  }
```

### Source Paths
The first six options are the paths for the five component files that make up a Bundle and the directory for optional libraries files. You may alter these to match a custom work flow. Normally it's a good idea to stick with the defaults.

### Optional sendFmpUrl Override
By default, the Bundler will use the following pattern when you add the Send switch to your command

```fmp://$/Carafe?script=Send%20Carafe%20Bundle&param={sendConfig}```

If you provide your own pattern, you can still include the `{sendConfig}` placeholder, and it will be expanded into a JSON object with `'path'` string and `'forceSend'` bool properties at runtime so that your FileMaker script can access the compiled Bundle and know if you have passed the force switch or not.

### Optional watchedFiles object
You can provide one or more files which the Carafe Bundler will merge into in your Bundle `html`. Changes to any watched file will signal the Carafe dev server to refresh. The contents of each watched file will be merged into the html template using the configured bookend delimiters. This is useful if you are working with your own custom package using a compiler/transpiler such as webpack and you want to inject it into your html template when your external build process runs.

#### Example

Add a file to your project called `example/file.txt` with the following content:

```
foo
```

Add the following property to `"carafe"` in your package.json

```
"watchedFiles": {
  "mergeFieldName": "example/file.txt"
}
```

Assuming you are configured with `__` as bookend, add the following snippet to your project `src/template.json`:

```
<p>__mergeFieldName__</p>
```

When you save any changed `src` file or cause any change to configured `watchedFiles`, the contents of the watched file(s) will be automatically merged into the html of the Bundle whenever it compiles.

```
<p>foo</p>
```
