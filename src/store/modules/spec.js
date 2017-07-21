import Loader from '../../services/loader'
import { OAS } from '../../models/oas/index'
import * as types from '../types'

export const state = {
  spec: null,
  resources: null,
  operations: null,
  metas: null,
  operation: null
}

export const mutations = {
  [types.SET_SPEC] (state, payload) {
    state.resources = payload.resources
    state.operations = payload.operations
    state.spec = payload.spec
    state.metas = payload.metas
  },
  [types.TOGGLE_RESOURCES] (state, payload) {
    OAS.openAll(state.resources, payload)
  },
  [types.SET_OPERATION] (state, payload) {
    state.operation = payload
  },
  [types.FILTER_RESOURCES] (state, payload) {
    OAS.filterSearch(state.resources, OAS.getSearch(payload))
  }
}

export const actions = {
  [types.LOAD_URL] ({commit}, url) {
    commit(types.SET_ERROR, null)
    commit(types.SET_LOADING, true)
    commit(types.SET_URL, url)
    Loader.load(url).then((res) => {
      commit(types.SET_LOADING, false)
      const oas = new OAS(res.bundled, url)
      commit(types.SET_SPEC, {
        resources: oas.resources,
        operations: oas.operations,
        spec: res.bundled,
        metas: oas.metas
      })
    }).catch((err) => {
      commit(types.SET_LOADING, false)
      commit(types.SET_ERROR, err)
      commit(types.SET_SPEC, {
        resources: null,
        operations: null,
        spec: null,
        metas: null
      })
    })
  }
}

export const getters = {
  [types.OPERATION]: (state) => state.operation,
  [types.METAS]: (state) => state.metas,
  [types.OPERATIONS]: (state) => state.operations,
  [types.RESOURCES]: (state) => state.resources
}

export default {
  state,
  mutations,
  getters
}
