import * as types from '../types'

export const STORAGE_KEY = 'oasui'

const storedState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '""')

const defaultState = {
  dark: false,
  grouped: 0,
  wide: false,
  description: false,
  path: true
}

export const state = storedState || defaultState

export const mutations = {
  [types.VIEW_SET_DARK] (state) {
    state.dark = !state.dark
  },
  [types.VIEW_SET_VIEW] (state, payload) {
    state.grouped = payload
  },
  [types.VIEW_SET_WIDE] (state, payload) {
    state.wide = payload !== undefined ? payload : !state.wide
  },
  [types.VIEW_SET_SUMMARY] (state) {
    state.description = !state.description
    state.path = !state.path && !state.description ? true : state.path
  },
  [types.VIEW_SET_PATH] (state) {
    state.path = !state.path
    state.description = !state.path && !state.description ? true : state.description
  }
}

export const getters = {
  [types.VIEW_DARK]: state => state.dark,
  [types.VIEW_VIEW]: state => state.grouped,
  [types.VIEW_WIDE]: state => state.wide,
  [types.VIEW_SUMMARY]: state => state.description,
  [types.VIEW_PATH]: state => state.path
}

export default {
  state,
  mutations,
  getters
}
