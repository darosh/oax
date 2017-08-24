import * as types from '../types'

export const state = {
  recent: []
}

export const mutations = {
  [types.RECENT_UNSHIFT] (state, payload) {
    const past = state.recent.filter(item => item.url === payload.url)

    if (past[0]) {
      state.recent.splice(state.recent.indexOf(past[0]), 1)
    }

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
