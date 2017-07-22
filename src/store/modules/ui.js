export const STORAGE_KEY = 'oas-ui'

import * as types from '../types'

export const state = {
  dialog: {
    type: null,
    param: null
  },
  title: null,
  error: null,
  loading: false,
  fabMethod: null,
  fabPending: false,
  tab: 'tab-info'
}

export const mutations = {
  [types.SET_DIALOG] (state, payload = {type: null, param: null}) {
    state.dialog.type = typeof payload === 'string' ? payload : payload.type
    state.dialog.param = typeof payload === 'string' ? null : payload.param
  },
  [types.SET_LOADING] (state, payload) {
    state.loading = payload
  },
  [types.SET_ERROR] (state, payload) {
    state.error = payload
  },
  [types.SET_FAB_METHOD] (state, payload) {
    state.fabMethod = payload
  },
  [types.SET_FAB_PENDING] (state, payload) {
    state.fabPending = payload
  },
  [types.SET_TAB] (state, payload) {
    state.tab = payload
  }
}

export const getters = {
  [types.DIALOG_IS]: state => type => state.dialog.type === type,
  [types.DIALOG_PARAM]: state => state.dialog.param,
  [types.ERROR]: state => state.error,
  [types.FAB_METHOD]: state => state.fabMethod,
  [types.FAB_PENDING]: state => state.fabPending,
  [types.TAB]: state => state.tab
}

export default {
  state,
  mutations,
  getters
}
