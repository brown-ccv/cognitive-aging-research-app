# cognitive-aging-research-app

## Install Dependencies

```
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" <<FONTAWESOME_TOKEN>>
yarn
```

**Note:** 

At the moment, this package is using `fontawesome-svg-core` which requires authentication (PRO version). We authenticate wit CJ token as and environment variable

In CI, this environment variable is available to this repository.


## Compiles and hot-reloads for development, i.e, run locally
```
yarn start
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributing
Make a new branch based on `main` and open a PR
