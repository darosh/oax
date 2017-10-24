// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import '../plugins/hotkey'
import '../plugins/router'
import '../plugins/vue-virtual-scroller'
import '../plugins/icons'
import '../plugins/vuetify'
import { default as sync } from '../plugins/vuex-router-sync'
import { createRouter } from './router'
import createStore from '../store'
import { configuration } from '../assets/scripts/services/configuration'
import { selectMixin, select } from '../assets/scripts/utils/select'
import * as types from '../store/types'
import App from './App'

Vue.config.productionTip = false
// Vue.config.performance = true

const store = createStore()
const router = createRouter()
sync({app: {store, router}})

window.OAX = window.OAX || {}

// window.OAX.configuration = configuration

if (process.env.NODE_ENV !== 'production') {
  window.OAX.select = select
  Vue.mixin(selectMixin)
}

/* eslint-disable no-new */
window.OAX.app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created () {
    let url = null
    const ioq = window.location.href.indexOf('?')
    window.OAX.state = this.$store.state

    if (ioq) {
      const qoq = window.location.href.substr(ioq + 1)
        .split('&')
        .map(v => v.split('='))
        .filter(v => v[0] === 'url')[0]
      url = qoq ? decodeURIComponent(qoq[1]) : url
    }

    store.dispatch(types.SPEC_SET_LOAD_URL, url || configuration.url)
    this.online()
    window.addEventListener('online', this.online)
    window.addEventListener('offline', this.online)
  },
  methods: {
    online () {
      if (typeof window.navigator.onLine === 'undefined') {
        store.commit(types.UI_SET_ONLINE, true)
      } else {
        store.commit(types.UI_SET_ONLINE, navigator.onLine)
      }
    }
  }
})
