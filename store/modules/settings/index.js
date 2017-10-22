import * as types from './types'

export const state = {
  search: null,
  url: null
}

export const mutations = {
  [types.SETTINGS_SET_URL] (state, payload) {
    state.url = payload
  },
  [types.SETTINGS_SET_SEARCH] (state, payload) {
    state.search = payload
  }
}

export const getters = {
  [types.SETTINGS_URL]: state => state.url,
  [types.SETTINGS_SEARCH]: state => state.search
}

export default {
  state,
  mutations,
  getters
}
