import * as types from '../types'

export const state = {
  proxy: null,
  security: null,
  search: null,
  url: null
}

export const mutations = {
  [types.SET_PROXY] (state, payload) {
    state.proxy = payload
  },
  [types.SET_URL] (state, payload) {
    state.url = payload
  },
  [types.SET_ERROR] (state, payload) {
    state.error = payload
  },
  [types.SET_LOADING] (state, payload) {
    state.loading = payload
  }
}

export const getters = {
  [types.URL]: state => state.url,
  [types.PROXY]: state => state.proxy
}

export default {
  state,
  mutations,
  getters
}
