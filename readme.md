# biohausmann website

## Installing

Node and npm/yarn should be installed in the system.

```
$ yarn install
$ yarn build
```

This will create a fresh new build of the static files under `dist/`.
The HTML is pre-compiled from `handlebars` templates using text from translation files.

## Updating text

The website has two languages - German and English.
Website texts are found in `src/content/<language>.json`.
