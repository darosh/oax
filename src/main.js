// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import * as types from './store/types'
import { sync } from 'vuex-router-sync'
import configuration from './services/configuration'

sync(store, router)

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
    store.dispatch(types.LOAD_URL, configuration.url)
    this.online()
    window.addEventListener('online', this.online)
    window.addEventListener('offline', this.online)
  },
  methods: {
    online () {
      if (typeof window.navigator.onLine === 'undefined') {
        store.commit(types.SET_ONLINE, true)
      } else {
        store.commit(types.SET_ONLINE, navigator.onLine)
      }
    }
  }
})
