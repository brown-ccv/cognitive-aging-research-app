# cognitive-aging-research-app

## Install Dependencies
```
yarn
```
**Note:** 

At the moment, this package is using `fontawesome-svg-core` which requieres authentication. We authenticate wit CJ token as and environment variable

The require login steps are specified in the `.npmrc` file. This file relies on environment variable

In CI, this environment variable is available to this repository.

Locally you'll need to add it to you `~/.bash_profile` or equivalent location

## Compiles and hot-reloads for development, i.e, run locally
```
yarn start
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributing
Make a new branch based on `main` and open a PR
