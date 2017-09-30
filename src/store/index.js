import Vue from 'vue'
import Vuex from 'vuex'
// import { state, mutations, actions } from './mutations'
import plugins from './plugins'
import getters from './getters'
import mutations from './mutations'

import * as apis from './modules/apis'
import * as recent from './modules/recent'
import * as view from './modules/view'
import * as spec from './modules/spec'
import * as ui from './modules/ui'
import * as settings from './modules/settings'
import * as generator from './modules/generator'

Vue.use(Vuex)

export const STORAGE_KEY = 'oax'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  // state,
  mutations,
  // actions,
  getters,
  plugins,
  modules: {
    apis,
    recent,
    view,
    spec,
    ui,
    settings,
    generator
  }
})
