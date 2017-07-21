export const STORAGE_KEY = 'oasui'
import * as types from '../types'

const storedState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '""')

const defaultState = {
  dark: false,
  grouped: true,
  description: false
}

export const state = storedState || defaultState

export const mutations = {
  [types.TOGGLE_DARK] (state) {
    state.dark = !state.dark
  },
  [types.TOGGLE_GROUPED] (state) {
    state.grouped = !state.grouped
  },
  [types.TOGGLE_DESCRIPTION] (state) {
    state.description = !state.description
  }
}

export const getters = {
  [types.IS_DARK]: state => state.dark,
  [types.IS_GROUPED]: state => state.grouped,
  [types.IS_DESCRIPTION]: state => state.description
}

export default {
  state,
  mutations,
  getters
}
