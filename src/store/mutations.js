export const STORAGE_KEY = 'oas-ui'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  view: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '""') || {
    dark: false,
    grouped: true,
    description: false
  },
  dialog: {
    name: null,
    payload: null
  },
  operation: null
}

export const mutations = {
  toggleDark () {
    state.view.dark = !state.view.dark
  },
  toggleGrouped () {
    state.view.grouped = !state.view.grouped
  },
  toggleDescription () {
    state.view.description = !state.view.description
  },
  setDialog (state, payload = {name: null, payload: null}) {
    state.dialog.name = typeof payload === 'string' ? payload : payload.name
    state.dialog.payload = typeof payload === 'string' ? null : payload.payload
  },
  setOperation (state, payload) {
    state.operation = payload
  }
}
