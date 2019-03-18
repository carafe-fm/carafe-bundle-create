# Carafe Bundle Development

You can start by editing the default src files, or if you want to initialize the project with an existing bundle, you can extract the src files from a bundle

```bash
npm run extract path/to/bundle.json
```

**CAUTION:** The extract command overwrites all src files without warning.

During development you can use the built-in live server to test changes:

```bash
npm run dev
```

When you are ready to publish your bundle, call the following command, which will generate a `bundle.json` in the project root directory:

```bash
npm run build
```
