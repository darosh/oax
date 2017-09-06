// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import * as types from './store/types'
import { sync } from 'vuex-router-sync'
import { configuration } from './services/configuration'
import App from './App'

import VueVirtualScroller from 'vue-virtual-scroller'
import VueHotkey from 'v-hotkey/src/index'

// import Vuetify from 'vuetify'

import {
  Vuetify,
  VApp,
  VAlert,
  VAvatar,
  VBtn,
  VBtnToggle,
  VCard,
  VCheckbox,
  VDataTable,
  VDatePicker,
  VDialog,
  VDivider,
  VExpansionPanel,
  VGrid,
  VIcon,
  VList,
  VMenu,
  VNavigationDrawer,
  VProgressCircular,
  VProgressLinear,
  VRadioGroup,
  VSelect,
  VSubheader,
  VSwitch,
  VTabs,
  VTextField,
  VToolbar
} from 'vuetify'

import { Ripple, Tooltip } from 'vuetify/src/directives'

Vue.use(Vuetify, {
  directives: {Ripple, Tooltip},
  components: {
    VApp,
    VAlert,
    VAvatar,
    VBtn,
    VBtnToggle,
    VCard,
    VCheckbox,
    VDataTable,
    VDatePicker,
    VDialog,
    VDivider,
    VExpansionPanel,
    VGrid,
    VIcon,
    VList,
    VMenu,
    VNavigationDrawer,
    VProgressCircular,
    VProgressLinear,
    VRadioGroup,
    VSelect,
    VSubheader,
    VSwitch,
    VTabs,
    VTextField,
    VToolbar
  }
})

// import Vuetify from '../vendor/vuetify'
// Vue.use(Vuetify)

Vue.use(VueVirtualScroller)
Vue.use(VueHotkey)
Vue.config.productionTip = false

sync(store, router)

window.OAX = window.OAX || {}

/* eslint-disable no-new */
window.OAX.app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created () {
    let url = null
    const ioq = window.location.hash.indexOf('?')
    window.OAX.state = this.$store.state

    if (ioq) {
      const qoq = window.location.hash.substr(ioq + 1)
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
