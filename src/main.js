// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import * as types from './store/types'
import { sync } from 'vuex-router-sync'
import { configuration } from './services/configuration'
import App from './App'

import Vuetify from 'vuetify'
// import Vuetify from './vendor/vuetify'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(Vuetify)
Vue.use(VueVirtualScroller)
Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
window.OAX = new Vue({
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
