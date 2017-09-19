# OAX &mdash; OpenAPI Specification Explorer [![demo: online](https://img.shields.io/badge/demo-online-brightgreen.svg?style=flat-square)](https://darosh.github.io/oax/)

## Resources

* Online [demo](https://darosh.github.io/oax/)
* Automated [screenshots](./doc/screenshots/README.md)
* [Research](./doc/RESEARCH.md) notes

## Status

|Feature|Status|Note|
|:---|:---|:---|
|OpenApi directory browser|![100%](https://placehold.it/12/44cc11?text=+) 100%| 500+ API specifications powered by [APIs.guru](https://apis.guru/openapi-directory/)
|SDK code generator|![100%](https://placehold.it/12/44cc11?text=+) 100%| powered by [swagger-codegen](https://github.com/swagger-api/swagger-codegen) via [generator.swagger.io](https://generator.swagger.io/) 
|Markdown & syntax highlight|![100%](https://placehold.it/12/44cc11?text=+) 100%| powered by [showdown](https://github.com/showdownjs/showdown) & [highlight.js](https://highlightjs.org/) with 40 language highlighters 
|Using web worker|![100%](https://placehold.it/12/44cc11?text=+) 100%| for non-blocked user interface
|Light & dark theme|![100%](https://placehold.it/12/44cc11?text=+) 100%| thanks to [Vuetify](https://vuetifyjs.com/)
|Built-in HTTP reference|![100%](https://placehold.it/12/44cc11?text=+) 100%| powered by [know-your-http-well](https://github.com/for-GET/know-your-http-well) 
|Responsive & mobile|![100%](https://placehold.it/12/44cc11?text=+) 100%|  
|Offline & progressive|![80%](https://placehold.it/12/44cc11?text=+) 80%| 
|Keyboard shortcuts & navigation|![80%](https://placehold.it/12/44cc11?text=+) 80%|
|View & layout options|![80%](https://placehold.it/12/44cc11?text=+) 80%| 
|Schema & examples|![75%](https://placehold.it/12/dfb317?text=+) 75%| 
|Try out API|![50%](https://placehold.it/12/dfb317?text=+) 50%| 
|Edit specification|![30%](https://placehold.it/12/dfb317?text=+) 30%| using [CodeMirror](http://codemirror.net/) editor and web worker
|Security definitions|![25%](https://placehold.it/12/e05d44?text=+) 25%| 
|Customization & configuration|![10%](https://placehold.it/12/e05d44?text=+) 10%| 
|SEO & SSR|![0%](https://placehold.it/12/e05d44?text=+) 0%| 
|Local storage for user settings|![0%](https://placehold.it/12/e05d44?text=+) 0%| 
|Cross-browser compatibility|![0%](https://placehold.it/12/e05d44?text=+) 0%| not tested yet (Chrome browser should work) 
|OpenAPI version 3.0|![0%](https://placehold.it/12/e05d44?text=+) 0%|

## Build Setup

``` bash
# install dependencies
npm install

# customize vuetify
npm run vuetify

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
