// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

sync(store, router)

// const url = './static/specs/uber.yaml'
// const url = './static/specs/petstore-expanded.yaml'
const url = './static/specs/openapi-specification/yaml/petstore-separate/spec/swagger.yaml'
// const url = './static/specs/api-with-examples.yaml'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created () {
    store.dispatch('loadUrl', url)
  }
})
