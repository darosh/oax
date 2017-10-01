import * as types from '../types'
import axios from 'axios'
import { configuration } from '../../services/configuration'
import * as directory from '../../services/directory'

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
  }
}

let lastObj = null

// function getLoaded (obj, next, searchText) {
//   if(obj.search) {
//     return obj.loaded && obj.loaded[searchText] ? obj.loaded[searchText] : null
//   } else {
//     return obj.loaded
//   }
// }
//
// function setLoaded (obj, apis, categories, nextUrl, searchText) {
//   if(obj.search) {
//     obj.loaded = obj.loaded || {}
//     obj.loaded[searchText] = {apis, nextUrl}
//   } else {
//     obj.loaded = {apis, categories}
//   }
// }

export const actions = {
  [types.APIS_RUN_LOAD] ({commit, getters}, {next, search} = {}) {
    const obj = lastObj = getters[types.APIS_COLLECTION_OBJECT]

    if (obj.loadingApis) {
      return
    } else if (obj.loaded && !next && !obj.pagination) {
      commit(types.APIS_SET, obj.loaded)
      return
    }

    obj.loadingApis = true

    let url

    if (obj.search && (obj.lastSearch !== search)) {
      commit(types.APIS_SET, {apis: null, categories: null})
      obj.loaded = null
      obj.lastSearch = null
      obj.next = null
      url = search ? obj.search(search) : obj.base
    } else {
      if (!next) {
        commit(types.APIS_SET, {apis: null, categories: null})
      }

      url = obj.next || obj.base
    }

    axios.get(url).then(res => {
      if (obj !== lastObj) {
        return
      }

      if (obj.search && (search || obj.lastSearch) && (search !== obj.lastSearch)) {
        return
      }

      const data = res.data
      const {apis, categories} = obj.transform(data, (obj.loaded && obj.loaded.apis) || [])
      obj.loadingApis = false
      obj.loaded = {apis, categories}
      commit(types.APIS_SET, {apis, categories})
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
