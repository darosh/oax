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
  }
}

export const actions = {
  [types.APIS_RUN_LOAD] ({commit, getters}, {next, search} = {}) {
    const obj = getters[types.APIS_COLLECTION_OBJECT]

    if (obj.loadingApis) {
      return
    } else if (obj.loaded && !next && !obj.pagination) {
      commit(types.APIS_SET, obj.loaded)
      return
    }

    obj.loadingApis = true

    if (!next) {
      commit(types.APIS_SET, {apis: null, categories: null})
    }

    let url

    if (obj.search && search) {
      if (obj.lastSearch !== search) {
        commit(types.APIS_SET, {apis: null, categories: null})
        obj.loaded = null
      }

      url = obj.search(search)
    } else {
      if (obj.lastSearch !== search) {
        commit(types.APIS_SET, {apis: null, categories: null})
        obj.lastSearch = null
        obj.next = null
        obj.loaded = null
      }

      url = obj.next || obj.base
    }

    axios.get(url).then(res => {
      if ((!search && !obj.lastSearch) || (search === obj.lastSearch)) {
        const data = res.data
        const {apis, categories} = obj.transform(data, (obj.loaded && obj.loaded.apis) || [])
        obj.loadingApis = false
        obj.loaded = {apis, categories}
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
