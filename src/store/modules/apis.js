import * as types from '../types'
import yqlProxy from '../../utils/yql-proxy'
import axios from 'axios'

const BASE = 'https://darosh.github.io/openapi-directory-lite/'
const LIST = BASE + 'list.json'

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
    let proxy = false

    if (proxy) {
      yqlProxy(LIST).then(res => {
        const data = res.data.query.results.json
        const apis = getApis(data)
        loadingApis = false
        commit(types.APIS_SET, apis)
      })
    } else {
      axios.get(LIST).then(res => {
        const data = res.data
        const apis = getApis(data)
        loadingApis = false
        commit(types.APIS_SET, apis)
      })
    }

    function getApis (data) {
      const apis = []

      for (let key in data) {
        // const versions = Object.keys(data[key].versions)
        // versions.sort()
        // let v = data[key].versions[versions[0]]

        // let title = (v.info && v.info.title) || key
        // let url = v.swaggerUrl

        // apis.push({title, key, url})
        let v = data[key]
        apis.push({title: v.title, key, url: BASE + 'specs/' + v.spec, categories: v.categories})
      }

      apis.sort((a, b) => a.key.localeCompare(b.key))

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
