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
  online: false
}

export const mutations = {
  [types.SET_DIALOG] (state, payload = {type: null, param: null}) {
    state.dialog.type = typeof payload === 'string' ? payload : payload.type
    state.dialog.param = typeof payload === 'string' ? null : payload.param
  },
  [types.SET_LOADING] (state, payload) {
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
  },
  [types.SET_WIDTH] (state, payload) {
    state.width = payload
  },
  [types.SET_DRAWER] (state, payload) {
    state.drawer = payload
  },
  [types.SET_MENU] (state, payload) {
    state.menu = typeof payload === 'undefined' ? !state.menu : payload
  },
  [types.SET_ONLINE] (state, payload) {
    state.online = payload
  }
}

export const getters = {
  [types.DIALOG_IS]: state => type => state.dialog.type === type,
  [types.DIALOG_PARAM]: state => state.dialog.param,
  [types.ERROR]: state => state.error,
  [types.LOADING]: state => state.loading,
  [types.LOG]: state => state.log,
  [types.FAB_METHOD]: state => state.fabMethod,
  [types.FAB_PENDING]: state => state.fabPending,
  [types.TAB]: state => state.tab,
  [types.WIDTH]: state => state.width,
  [types.DRAWER]: state => state.drawer,
  [types.MENU]: state => state.menu,
  [types.ONLINE]: state => state.online
}

export default {
  state,
  mutations,
  getters
}
