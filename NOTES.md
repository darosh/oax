# Notes

## Random thoughts

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


## Architecture

### Core
- vuejs/[vue](https://github.com/vuejs/vue)
- vuejs/[vuex](https://github.com/vuejs/vuex)
- vuejs/[vue-router](https://github.com/vuejs/vue-router)
- vuejs/[vuex-router-sync](https://github.com/vuejs/vuex-router-sync)

### UI Components
- vuetifyjs/[vuetify](https://github.com/vuetifyjs/vuetify)

### Libraries
- mzabriskie/[axios](https://github.com/mzabriskie/axios)
- jeremyfa/[yamljs](https://github.com/jeremyfa/yaml.js)
- darosh/[json-schema-bundler](https://github.com/darosh/json-schema-bundler)
- showdownjs/[showdown](https://github.com/showdownjs/showdown)

### Structure
- src/components
- src/services
- src/models
- src/store

## URLs

* http://petstore.swagger.io/v2/swagger.json
* https://api.apis.guru/v2/specs/googleapis.com/books/v1/swagger.yaml
* https://api.apis.guru/v2/specs/github.com/v3/swagger.json

## Tools

* https://material.io/resizer/
* npm install -g ngrok
* ngrok http 8080

## Dev notes

- [x] Swipe down to refresh, this is probably not an issue?
- [ ] Pre scroll in drawer
- [x] Drawer over dialog
- [ ] Mobile icons
- [x] Mobile paddings
- [ ] Tab bar is scrolling on swipe
- [ ] Tab bar double line
- [ ] Expand panels border on mobile
- [ ] Explore cache strategies
- [ ] Add support for apis.guru, future proof one
- [ ] Alert layout, padding?
- [ ] Drawer border left missing when scrolled
- [ ] Fixed sidebar toolbars
- [x] Dialog toolbar shadow is ugly
- [ ] Dialog icon buttons deforned on mobile
- [ ] Data table borders weird
- [ ] Highlight selected http reference toolbar button
- [ ] Switching http reference is slow on mobile
- [x] Add mono font to HTML index
- [ ] Review code splitting for best UX
- [x] Reopen same operation on selection
- [ ] Dialog toolbar right subtitles have bigger margin on right?
- [x] Replace dialog rfc link titles with specs
- [ ] Insert direct api spec by text
- [ ] Use spec loader worker
- [ ] Show search when searching
- [ ] Close and clear search on mobile at least
- [x] Expansion panel border color makes shadow look blurry?
- [ ] Extract common base path from "paths"
- [ ] yql for apisguru only on localhost?
- [ ] highlight path params
- [ ] fix drawer and dialog overlays conflicts
- [ ] update dialog param
- [ ] icon
- [ ] doc view
- [ ] table view
- [ ] security (authorization)
- [ ] summaries from descriptions
- [ ] summaries and descriptions MarkDown
- [ ] check showdown supports new OAS 3.0 Markdown flavor
- [ ] drawer needs air?
- [ ] known implementations https://api.coinsecure.in/v1
- [ ] bug? http://localhost:8080/#/?url=https%3A%2F%2Fapi.apis.guru%2Fv2%2Fspecs%2Fgoogleapis.com%2Fdiscovery%2Fv1%2Fswagger.json
- [ ] http://localhost:8080/#/?url=https%3A%2F%2Fapi.apis.guru%2Fv2%2Fspecs%2Fgoogleapis.com%2Fdiscovery%2Fv1%2Fswagger.json
- [ ] https://stackoverflow.com/questions/36634281/list-of-swagger-ui-alternatives
- [ ] https://groups.google.com/forum/#!topic/swagger-swaggersocket/uypw-ozjlx8
- [ ] https://codepen.io/pixelass/pen/zGVWjN

- https://thingful.github.io/openapi-spec/#
- https://kevinoid.github.io/appveyor-swagger/redoc/

PrismJS?
