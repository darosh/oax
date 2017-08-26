// import load from '../../services/load'
import load from '../../workers/load'
// import { OAS } from '../../models/oas/index'
import OAS from '../../workers/oas'
import * as types from '../types'
import search from '../../models/oas/methods/search'
import { openAll } from '../../models/oas/methods/tags'
// import Vue from 'vue'

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
    openAll(state.resources, payload)
  },
  [types.SET_OPERATION] (state, payload) {
    if (state.operation === payload) {
      state.operation = null
    }

    state.operation = payload
  },
  [types.PREV_OPERATION] (state) {
    let index = state.operations.indexOf(state.operation)

    if (index === 0) {
      index = state.operations.length
    }

    index--

    state.operation = state.operations[index]
  },
  [types.NEXT_OPERATION] (state) {
    let index = state.operations.indexOf(state.operation)

    if (index === (state.operations.length - 1)) {
      index = -1
    }

    index++

    state.operation = state.operations[index]
  },
  [types.FILTER_RESOURCES] (state, payload) {
    search(state.resources, payload)
  },
  [types.SET_RESULT] (state, payload) {
    payload.operation._result = payload.result
    payload.operation._error = payload.error
  },
  [types.SET_VALUE] (state, payload) {
    payload.item._value = payload.value
  },
  [types.SET_RESOURCE] (state, payload) {
    payload.resource._opened = payload.opened
  }
}

export const actions = {
  [types.LOAD_URL] ({commit, getters}, url) {
    if (url === getters[types.URL]) {
      return
    }

    commit(types.SET_ERROR, null)
    commit(types.SET_URL, url)
    commit(types.SET_OPERATION, null)
    commit(types.SET_DRAWER, false)
    commit(types.SET_SPEC, {
      resources: null,
      operations: null,
      spec: null,
      metas: null
    })

    setTimeout(() => {
      commit(types.SET_LOADING, {text: 'Loading', done: 0})
      load(url, (progress) => {
        commit(types.SET_LOADING,
          {
            text: `Loaded ${progress.loaded} of ${progress.total} files`,
            done: 0.5 * (progress.loaded / progress.total)
          })
      }).then((res) => {
        commit(types.SET_LOADING, {text: 'Parsing', done: 0.5})
        OAS(res.bundled, url, (progress) => {
          commit(types.SET_LOADING,
            {
              text: progress.loaded !== progress.total
                ? `${progress.section || 'Parsing'} ${progress.text}`
                : 'Almost ready',
              done: 0.5 + 0.5 * (progress.loaded / progress.total)
            })
        }).then(res => {
          if (res.err) {
            commit(types.SET_ERROR, 'PARSER ERROR: ' + res.err.message)
            commit(types.SET_LOADING, false)
          } else {
            commit(types.SET_LOADING, {text: 'Rendering', done: 1})

            setTimeout(() => {
              commit(types.SET_SPEC, {
                resources: res.bundled.tags,
                operations: res.bundled._operations,
                spec: res.bundled,
                metas: res.bundled._metas
              }, 0)

              commit(types.RECENT_UNSHIFT, {url, title: res.bundled.info.title})
              commit(types.SET_LOADING, false)
            })
          }
        })
      }).catch((err) => {
        commit(types.SET_LOADING, false)
        console.warn(err)
        commit(types.SET_ERROR, err)
      })
    }, 0)
  }
}

export const getters = {
  [types.OPERATION]: (state) => state.operation,
  [types.METAS]: (state) => state.metas,
  [types.OPERATIONS]: (state) => state.operations,
  [types.RESOURCES]: (state) => state.resources,
  [types.SPEC]: (state) => state.spec
}

export default {
  state,
  mutations,
  getters
}
