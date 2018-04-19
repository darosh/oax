import * as types from './types'
import * as typesSPEC from '../spec/types'

import axios from 'axios'
import Vue from 'vue'
import { isMemory } from '../../../assets/scripts/utils/memory'

const URL = {
  client: 'https://generator.swagger.io/api/gen/clients',
  server: 'https://generator.swagger.io/api/gen/servers'
}

export const state = {
  type: null,
  language: null,
  languages: {
    client: null,
    server: null
  },
  options: {
    client: {},
    server: {}
  },
  values: {},
  generated: null
}

export const mutations = {
  [types.GENERATOR_SET_LANGUAGES] (state, payload) {
    state.languages.client = payload.client || state.languages.client
    state.languages.server = payload.server || state.languages.server
  },
  [types.GENERATOR_SET_TYPE]: (state, payload) => {
    state.type = payload
  },
  [types.GENERATOR_SET_GENERATED]: (state, payload) => {
    state.generated = payload
  },
  [types.GENERATOR_SET_LANGUAGE]: (
    state, payload) => { state.language = payload },
  [types.GENERATOR_SET_OPTIONS]: (state, payload) => {
    for (const o in payload.options) {
      payload.options[o].display = payload.options[o].opt.replace(
        /([a-z])([A-Z])/g, '$1 $2').toLowerCase()

      if (state.options[o] === undefined) {
        Vue.set(state.values, o,
          payload.options[o].type === 'boolean' ? (payload.options[o].default
            ? payload.options[o].default === 'true'
            : false) : (payload.options[o].default
            ? payload.options[o].default
            : ''))
      }
    }

    Vue.set(state.options[payload.type], payload.language, payload.options)
  }
}

let loadingLanguages = false
let loadingOptions = false

export const actions = {
  [types.GENERATOR_RUN_SET_TYPE] ({commit, dispatch}, payload) {
    commit(types.GENERATOR_SET_TYPE, payload)
    dispatch(types.GENERATOR_RUN_LANGUAGES).then(() => {
      if (!state.languages[state.type][state.language]) {
        commit(types.GENERATOR_SET_LANGUAGE, null)
      } else {
        dispatch(types.GENERATOR_RUN_OPTIONS)
      }
    })
  },
  [types.GENERATOR_RUN_SET_LANGUAGE] ({commit, dispatch}, payload) {
    commit(types.GENERATOR_SET_LANGUAGE, payload)

    if (state.type && state.language) {
      dispatch(types.GENERATOR_RUN_OPTIONS)
    }
  },
  [types.GENERATOR_RUN_LANGUAGES] ({commit}) {
    return new Promise((resolve) => {
      if ((loadingLanguages === state.type) || state.languages[state.type]) {
        return resolve()
      }

      const type = loadingLanguages = state.type

      axios.get(URL[type]).then(res => {
        loadingLanguages = false
        commit(types.GENERATOR_SET_LANGUAGES, {[type]: res.data})
        resolve()
      })
    })
  },
  [types.GENERATOR_RUN_OPTIONS] ({commit}) {
    if ((loadingOptions === (state.type + state.language)) ||
      state.options[state.type][state.language]) {
      return
    }

    loadingOptions = state.type + state.language

    const type = state.type
    const language = state.language

    axios.get(URL[type] + '/' + state.language).then(res => {
      loadingOptions = false
      commit(types.GENERATOR_SET_OPTIONS,
        {type: type, language: language, options: res.data})
    })
  },
  [types.GENERATOR_RUN_GENERATE] ({commit, getters}) {
    commit(types.GENERATOR_SET_GENERATED, null)

    const options = {}

    for (const o in state.options[state.type][state.language]) {
      options[o] = state.values[o]
    }

    let swaggerUrl = getters[typesSPEC.SPEC_URL]
    let spec

    if (isMemory(swaggerUrl)) {
      swaggerUrl = undefined
      // TODO DOC WORKAROUND
      spec = JSON.parse(getters[typesSPEC.SPEC_DOC])
    }

    const data = {
      swaggerUrl,
      spec,
      options: options
    }

    const config = {headers: {'Content-Type': 'application/json'}}

    axios.post(URL[state.type] + '/' + state.language, data, config)
      .then(res => {
        commit(types.GENERATOR_SET_GENERATED, res.data.link)
      })
  }
}

export const getters = {
  [types.GENERATOR_TYPE]: (state) => state.type,
  [types.GENERATOR_LANGUAGE]: (state) => state.language,
  [types.GENERATOR_LANGUAGES]: state => state.languages[state.type],
  [types.GENERATOR_VALUES]: state => state.values,
  [types.GENERATOR_GENERATED]: state => state.generated,
  [types.GENERATOR_OPTIONS]: state => state.type && state.language &&
  state.options[state.type] ? state.options[state.type][state.language] : null
}

export default {
  state,
  mutations,
  getters,
  actions
}
