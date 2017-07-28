import * as types from '../types'
import yqlProxy from '../../services/yql-proxy'

const LIST = 'https://api.apis.guru/v2/list.json'

export const state = {
  apis: []
}

export const mutations = {
  [types.SET_APIS] (state, payload) {
    state.apis = payload
  }
}

export const actions = {
  [types.LOAD_APIS] ({commit}, url) {
    const apis = []

    yqlProxy(LIST).then(res => {
      const data = res.data.query.results.json
      for (let a in data) {
        const versions = Object.keys(data[a].versions)
        versions.sort()
        let v = data[a].versions[versions[0]]

        let title = (v.info && v.info.title) || a
        let url = v.swaggerUrl

        apis.push({title, url})
      }

      apis.sort((a, b) => a.title.localeCompare(b.title))

      commit(types.SET_APIS, apis)
    })
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
