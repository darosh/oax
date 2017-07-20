export const STORAGE_KEY = 'oas-ui'

import Loader from '../services/loader'
import { OAS } from '../models/oas'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  view: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '""') || {
    dark: false,
    grouped: true,
    description: false
  },
  dialog: {
    name: null,
    payload: null
  },
  url: null,
  title: null,
  search: null,
  operation: null,
  resources: null,
  operations: null,
  spec: null,
  metas: null,
  error: null,
  loading: false
}

export const mutations = {
  toggleDark () {
    state.view.dark = !state.view.dark
  },
  toggleGrouped () {
    state.view.grouped = !state.view.grouped
  },
  toggleDescription () {
    state.view.description = !state.view.description
  },
  setDialog (state, payload = {name: null, payload: null}) {
    state.dialog.name = typeof payload === 'string' ? payload : payload.name
    state.dialog.payload = typeof payload === 'string' ? null : payload.payload
  },
  setOperation (state, payload) {
    state.operation = payload
  },
  toggleResources (state, payload) {
    OAS.openAll(state.resources, payload)
  },
  setUrl (state, payload) {
    state.url = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setSpec (state, payload) {
    state.resources = payload.resources
    state.operations = payload.operations
    state.spec = payload.spec
    state.metas = payload.metas
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setSearch (state, payload) {
    OAS.filterSearch(state.resources, OAS.getSearch(payload))
  }
}

export const actions = {
  loadUrl ({commit}, url) {
    commit('setLoading', true)
    commit('setUrl', url)
    Loader.load(url).then((res) => {
      commit('setLoading', false)
      commit('setError', null)
      const oas = new OAS(res.bundled, url)
      commit('setSpec', {
        resources: oas.resources,
        operations: oas.operations,
        spec: res.bundled,
        metas: oas.metas
      })
    }).catch((err) => {
      commit('setLoading', false)
      commit('setError', err)
      commit('setSpec', {
        resources: null,
        operations: null,
        spec: null,
        metas: null
      })
    })
  }
}
