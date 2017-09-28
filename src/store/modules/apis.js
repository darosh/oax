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
  [types.APIS_RUN_LOAD] ({commit, getters}, next) {
    const obj = getters[types.APIS_COLLECTION_OBJECT]

    if (obj.loadingApis) {
      return
    } else if (obj.loaded && !next) {
      commit(types.APIS_SET, obj.loaded)
      return
    }

    obj.loadingApis = true

    if (!next) {
      commit(types.APIS_SET, {apis: null, categories: null})
    }

    axios.get(obj.next || obj.base).then(res => {
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
