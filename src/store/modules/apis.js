import * as types from '../types'
import axios from 'axios'
import { apiPath, indexPath } from 'openapi-directory-lite'

export const state = {
  apis: null
}

export const mutations = {
  [types.APIS_SET] (state, payload) {
    state.apis = payload
  }
}

let loadingApis = false

export const actions = {
  [types.APIS_RUN_LOAD] ({commit}) {
    if (loadingApis || state.apis) {
      return
    }

    loadingApis = true

    axios.get(indexPath()).then(res => {
      const data = res.data
      const apis = getApis(data)
      loadingApis = false
      commit(types.APIS_SET, apis)
    })

    function getApis (data) {
      const apis = []

      for (let key in data.specs) {
        let v = data.specs[key]
        apis.push({
          title: v.title,
          key,
          url: apiPath(key, data.specs[key]),
          categories: v.categories
        })
      }

      apis.sort((a, b) => a.key.localeCompare(b.key))
      console.log(apis)

      return apis
    }
  }
}

export const getters = {
  [types.APIS]: (state) => state.apis
}

export default {
  state,
  mutations,
  getters,
  actions
}
