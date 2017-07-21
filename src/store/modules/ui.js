export const STORAGE_KEY = 'oas-ui'

import * as types from '../types'

export const state = {
  dialog: {
    type: null,
    param: null
  },
  title: null,
  error: null,
  loading: false
}

export const mutations = {
  [types.SET_DIALOG] (state, payload = {type: null, param: null}) {
    state.dialog.type = typeof payload === 'string' ? payload : payload.type
    state.dialog.param = typeof payload === 'string' ? null : payload.param
  }
}

export const getters = {
  [types.DIALOG_IS]: state => type => state.dialog.type === type,
  [types.DIALOG_PARAM]: state => state.dialog.param
}

export default {
  state,
  mutations,
  getters
}
