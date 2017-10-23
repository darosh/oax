import * as types from './types'
import axios from 'axios'
import { configuration } from '../../../assets/scripts/services/configuration'
import * as directory from '../../../assets/scripts/services/directory/index'

export const state = {
  apis: null,
  categories: null,
  collection: 2
}

export const mutations = {
  [types.APIS_SET] (state, payload) {
    state.apis = payload.apis
    state.categories = payload.categories
  },
  [types.APIS_SET_COLLECTION] (state, payload) {
    state.collection = payload
  },
  [types.APIS_SET_PUSH] (state, payload) {
    state.categories.push(payload)
  },
  APIS_PUSH (state, payload) {
    payload.apis.push(payload.api)
  }
}

function getLoaded (obj, searchText) {
  if (obj.pagination) {
    const loaded = (obj.loaded && obj.loaded[searchText || 'no_search_text'])
      ? obj.loaded[searchText || 'no_search_text']
      : null

    if (loaded && (!!loaded.nextUrl !== !!obj.next)) {
      obj.next = !!loaded.nextUrl
    }

    return loaded
  } else {
    return obj.loaded
  }
}

function setLoaded (obj, apis, categories, nextUrl, searchText) {
  if (obj.pagination) {
    obj.loaded = obj.loaded || {}
    obj.loaded[searchText || 'no_search_text'] = {apis, nextUrl, searchText}

    if (!!nextUrl !== !!obj.next) {
      obj.next = !!nextUrl
    }
  } else {
    obj.loaded = {apis, categories}
  }
}

let lastUrl = null

export const actions = {
  [types.APIS_RUN_LOAD] ({commit, getters}, {next, searchText} = {}) {
    const obj = getters[types.APIS_COLLECTION_OBJECT]
    const loaded = getLoaded(obj, searchText)

    if (obj.loading) {
      return
    }

    if (loaded) {
      commit(types.APIS_SET, loaded)

      if (!obj.pagination) {
        return
      } else if (!next) {
        return
      }
    } else {
      commit(types.APIS_SET, {apis: null, categories: null})
    }

    let url

    if (obj.pagination) {
      if (next && loaded.nextUrl) {
        url = loaded.nextUrl
      } else {
        url = obj.search(searchText)
      }
    } else {
      url = obj.base
    }

    lastUrl = url

    obj.loading = true

    axios.get(url).then(res => {
      obj.loading = false
      const {apis, categories, nextUrl} =
        obj.transform(res.data,
          (loaded && loaded.apis) || [],
          searchText,
          (payload) => { commit('APIS_PUSH', payload) })

      setLoaded(obj, apis, categories, nextUrl, searchText)

      if (url === lastUrl) {
        commit(types.APIS_SET, {apis, categories})
      }
    })
  }
}

export const getters = {
  [types.APIS]: (state) => state.apis,
  [types.APIS_COLLECTION]: (state) => state.collection,
  [types.APIS_CATEGORIES]: state => state.categories,
  [types.APIS_COLLECTION_OBJECT]: state => directory[configuration.directory[state.collection - 1]]
}

export default {
  state,
  mutations,
  getters,
  actions
}
