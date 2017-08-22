# OAX

> OpenAPI Specification Explorer

* This is remake of https://github.com/darosh/angular-swagger-ui-material
* Made with Vue, Vuex and Vuetify
* Rewritten from scratch eg. spec parser is standalone lib: https://github.com/darosh/json-schema-bundler
* Should work as progressive web app, especially offline
* Should be faster and smoother UI, thanks to Vue, Vuetify, Webpack code splitting, web workers for "markdowningication" and similar stuff
* Made for Swagger 2.0, planning OAS 3.0
* Dereferenced spec is the view model with few underscored additional props strictly described in Typescript
* HTTP reference powered by know-your-http-well will be optional on runtime and compiletime as well
* More views (layouts): table, documentation
* Should have per operation auth options
* Probably less theming customization, now it is build around Vuetify light/dark theme and info/success/warn/error colors, primary color is for links, and some buttons and secondary is for floating action buttons and some highlights (latter need to work in light/dark). Hoping late night readers will appreciate it.
* Hopefully better architecture, with Vuex modules, Vue independent plain Typescript models, pure JavaScript services/utils, and as simple Vue components as possible. No more plugins (btw schema bundler has injectable YAML parser)
* Smooth ripples everywhere (it is more must, than nice to have). Much more ripples than in previous version. :)
* Left hamburger menu drawer should serve only for spec purposes and should be optional (runtime/compiletime). It should allow copy/paste (dereferenced spec) and together with table view should help to spec authors quickly overview main operation features
* What I ussualy miss in API docs in general is the "under the REST hood" DB relationship like stuff, https://bl.ocks.org/darosh/81151e4b94d7123eb89c390aa0ec9bf4 and some "flow" hints how to use data from responses in another requests...
* Progressive web app, must use HTTPS, so the API should use HTTPS too

## Demo

[darosh.github.io/oax](https://darosh.github.io/oax/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
