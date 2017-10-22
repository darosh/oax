// import { STORAGE_KEY } from './modules/ui'
// import createLogger from 'vuex/dist/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { view }) => {
    // window.localStorage.setItem(STORAGE_KEY, JSON.stringify(view))
  })
}

export default process.env.NODE_ENV !== 'production'
  // ? [createLogger(), localStoragePlugin]
  ? [localStoragePlugin]
  : [localStoragePlugin]
