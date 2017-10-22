import * as types from './types'

// export const STORAGE_KEY = 'oax'

// const storedState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')

const defaultState = {
  dark: false,
  type: 0,
  wide: false,
  summary: false,
  path: true
}

// export const state = storedState || defaultState
export const state = defaultState

export const mutations = {
  [types.VIEW_SET_DARK] (state) {
    state.dark = !state.dark
  },
  [types.VIEW_SET_VIEW] (state, payload) {
    state.type = payload !== undefined ? payload : (state.type + 1) % 4
  },
  [types.VIEW_SET_WIDE] (state, payload) {
    state.wide = payload !== undefined ? payload : !state.wide
  },
  [types.VIEW_SET_SUMMARY] (state, payload) {
    state.summary = payload === undefined ? !state.summary : payload
    state.path = !state.path && !state.summary ? true : state.path
  },
  [types.VIEW_SET_PATH] (state, payload) {
    state.path = payload === undefined ? !state.path : payload
    state.summary = !state.path && !state.summary ? true : state.summary
  }
}

export const getters = {
  [types.VIEW_DARK]: state => state.dark,
  [types.VIEW_VIEW]: state => state.type,
  [types.VIEW_WIDE]: state => state.wide,
  [types.VIEW_SUMMARY]: state => state.summary,
  [types.VIEW_PATH]: state => state.path
}

export default {
  state,
  mutations,
  getters
}
