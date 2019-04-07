# Carafe Bundle Development

You can start by editing the default src files, or if you want to initialize the project with an existing bundle, you can extract the src files from a bundle

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
npm run watch
```

## Build
When you are ready to publish your bundle, you can call either of the following commands, both which will generate a JSON Bundle in the project dist directory:

```bash
# Build Bundle file
npm run build
```

## Push
```bash
# Build Bundle file and push it to Carafe in FileMaker
npm run push
```