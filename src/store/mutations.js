export const STORAGE_KEY = 'oas-ui'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  view: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '""') || {
    description: false
  }
}

export const mutations = {
  toggleDescription () {
    state.view.description = !state.view.description
  }
}
