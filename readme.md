# biohausmann website

[![Build Status](https://travis-ci.org/lopis/biohofhausmann.svg?branch=master)](https://travis-ci.org/lopis/biohofhausmann)

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

The pages of the website are found in `src/pages`.

The menu entries are found in the partial template `src/partials/menu`.

## Updating website

By running `yarn build`, a new local version of the website is created.
Just push it to git and the git page will be updated shortly after.
