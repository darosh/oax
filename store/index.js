import Vue from 'vue'
import Vuex from 'vuex'

import plugins from './plugins'

import {getters} from './modules/app'
import * as apis from './modules/apis'
import * as recent from './modules/recent'
import * as view from './modules/view'
import * as spec from './modules/spec'
import * as ui from './modules/ui'
import * as settings from './modules/settings'
import * as generator from './modules/generator'
import * as validator from './modules/validator'
import * as configuration from './modules/configuration'

Vue.use(Vuex)

export default () => new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  plugins,
  getters,
  modules: {
    apis,
    recent,
    view,
    spec,
    ui,
    settings,
    generator,
    validator,
    configuration
  }
})
