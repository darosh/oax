import * as types from '../types'

export const STORAGE_KEY = 'oas-ui'

export const state = {
  dialog: {
    type: null,
    param: null
  },
  title: null,
  error: null,
  loading: false,
  log: false,
  fabMethod: null,
  fabPending: false,
  tab: 'tab-info',
  width: null,
  drawer: false,
  menu: false,
  online: false,
  animation: true
}

export const mutations = {
  [types.UI_SET_DIALOG] (state, payload = {type: null, param: null}) {
    state.dialog.type = typeof payload === 'string' ? payload : payload.type
    state.dialog.param = typeof payload === 'string' ? null : payload.param
  },
  [types.UI_SET_LOADING] (state, payload) {
    if (payload === false) {
      state.loading[0].elapsed = Date.now() - state.loading[0].time
      state.loading.elapsed += state.loading[0].elapsed
      state.log = state.loading.slice()
      state.log.elapsed = state.loading.elapsed
      state.loading = payload
    } else {
      state.loading = state.loading || []
      state.loading.elapsed = state.loading.elapsed || 0
      payload.time = Date.now()

      if (state.loading[0]) {
        state.loading[0].elapsed = payload.time - state.loading[0].time
        state.loading.elapsed += state.loading[0].elapsed
      } else {
        payload.elapsed = 0
      }

      state.loading.unshift(payload)
    }
  },
  [types.UI_SET_ERROR] (state, payload) {
    state.error = payload
  },
  [types.UI_SET_FAB_METHOD] (state, payload) {
    state.fabMethod = payload
  },
  [types.UI_SET_FAB_PENDING] (state, payload) {
    state.fabPending = payload
  },
  [types.UI_SET_TAB] (state, payload) {
    state.tab = payload
  },
  [types.UI_SET_WIDTH] (state, payload) {
    state.width = payload
  },
  [types.UI_SET_DRAWER] (state, payload) {
    state.drawer = payload
  },
  [types.UI_SET_LEFT_DRAWER] (state, payload) {
    state.menu = typeof payload === 'undefined' ? !state.menu : payload
  },
  [types.UI_SET_ONLINE] (state, payload) {
    state.online = payload
  }
}

export const getters = {
  [types.UI_DIALOG]: state => type => state.dialog.type === type,
  [types.UI_DIALOG_PARAM]: state => state.dialog.param,
  [types.UI_ERROR]: state => state.error,
  [types.UI_LOADING]: state => state.loading,
  [types.UI_LOG]: state => state.log,
  [types.UI_FAB_METHOD]: state => state.fabMethod,
  [types.UI_FAB_PENDING]: state => state.fabPending,
  [types.UI_TAB]: state => state.tab,
  [types.UI_WIDTH]: state => state.width,
  [types.UI_RIGHT_DRAWER]: state => state.drawer,
  [types.UI_LEFT_DRAWER]: state => state.menu,
  [types.UI_ONLINE]: state => state.online,
  [types.UI_ANIMATION]: state => state.animation
}

export default {
  state,
  mutations,
  getters
}
