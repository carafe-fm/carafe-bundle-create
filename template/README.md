# Carafe Bundle Development

You can directly edit the src files, or you can import an an existing bundle.

## Prerequisites

You will need to have [Node.js and NPM installed](https://nodejs.org/en/download/) to use this utility.

## Install

If you just initialized this project, it has already been installed, but if you just cloned it from a repository, you need to install.

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

## Watch
During development you can use the built-in live server to test changes:

```bash
# Watch on the default port 8080
npm run watch
```

```bash
# Watch on a custom port
npm run watch-port <port>
```

## Build
When you are ready to publish your bundle, you can call either of the following commands, both which will generate a JSON Bundle in the project dist directory:

```bash
# Build Bundle file
npm run build
```

## Send
```bash
# Build Bundle file and send it to Carafe in FileMaker
npm run send

# Use with care: you may also send to Carafe in FileMaker without overwrite warnings
npm run force-send
```