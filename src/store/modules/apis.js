import * as types from '../types'
import axios from 'axios'
import { apiPath, indexPath } from 'openapi-directory-lite'

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
      const categories = colored(data.categories)
      loadingApis = false
      commit(types.APIS_SET, {apis, categories})
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

      return apis
    }

    function colored (categories) {
      const colors = [
        '#CE93D8',
        '#B39DDB',
        '#9FA8DA',
        '#90CAF9',
        '#81D4FA',
        '#80DEEA',
        '#80CBC4',
        '#A5D6A7',
        '#C5E1A5',
        '#E6EE9C',
        '#FFF59D',
        '#FFE082',
        '#FFCC80',
        '#FFAB91'
      ]

      const sort = []

      for (const c in categories) {
        sort.push({key: c, count: categories[c].count})
      }

      sort.sort((a, b) => a.count - b.count)

      sort.forEach((v, i) => {
        categories[v.key].color = colors[Math.round((i / (sort.length - 1)) * (colors.length - 1))]
      })

      return categories
    }
  }
}

export const getters = {
  [types.APIS]: (state) => state.apis,
  [types.APIS_COLLECTION]: (state) => state.collection,
  [types.APIS_CATEGORIES]: state => state.categories
}

export default {
  state,
  mutations,
  getters,
  actions
}
