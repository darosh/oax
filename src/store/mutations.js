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
  }
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
  }
}
