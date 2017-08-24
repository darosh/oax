import * as types from '../types'

export const state = {
  recent: []
}

export const mutations = {
  [types.RECENT_UNSHIFT] (state, payload) {
    state.recent.unshift(payload)
  },
  [types.RECENT_REMOVE] (state, payload) {
    state.recent.splice(payload, 1)
  }
}

export const getters = {
  [types.RECENT]: (state) => state.recent
}

export default {
  state,
  mutations,
  getters
}
