import { load, edit } from '../../worker'
import * as types from '../types'
import search from '../../models/oas/methods/search'
import { openAll } from '../../models/oas/methods/tags'
import { absoluteUrl } from '../../services/absolute-url'
import CircularJSON from 'circular-json'

import { applyPatch } from 'fast-json-patch'
import { observables } from '../../models/oas/methods/observables'

export const state = {
  spec: null,
  resources: null,
  operations: null,
  metas: null,
  operation: null,
  observables: null,
  json: null,
  url: null
}

export const mutations = {
  [types.SPEC_SET] (state, payload) {
    state.resources = payload.resources
    state.operations = payload.operations
    state.spec = payload.spec
    state.metas = payload.metas
    state.observables = payload.observables
    state.url = payload.url

    if (payload.json) {
      state.json = payload.json
    }
  },
  [types.SPEC_SET_RESOURCES] (state, payload) {
    openAll(state.resources, payload)
  },
  [types.SPEC_SET_OPERATION] (state, payload) {
    // setTimeout(_ => {
    if (state.operation === payload) {
      state.operation = null
    }

    state.operation = payload
    // }, 50)
  },
  [types.SPEC_SET_PREV_OPERATION] (state) {
    let index = state.operations.indexOf(state.operation)

    if (index === 0) {
      index = state.operations.length
    }

    index--

    state.operation = state.operations[index]
  },
  [types.SPEC_SET_NEXT_OPERATION] (state) {
    let index = state.operations.indexOf(state.operation)

    if (index === (state.operations.length - 1)) {
      index = -1
    }

    index++

    state.operation = state.operations[index]
  },
  [types.SPEC_SET_FILTER_RESOURCES] (state, payload) {
    search(state.resources, payload)
  },
  [types.SPEC_SET_RESULT] (state, payload) {
    payload.operation._._result = payload.result
    payload.operation._._error = payload.error
  },
  [types.SPEC_SET_VALUE] (state, payload) {
    payload.item._._value = payload.value
  },
  [types.SPEC_SET_RESOURCE] (state, payload) {
    payload.resource._._opened = payload.opened
  }
}

let lastUrl = null
let circ = null

export const actions = {
  [types.SPEC_SET_EDIT_JSON] ({commit}, change) {
    edit(change).then(res => {
      circ = applyPatch(circ || JSON.parse(CircularJSON.stringify(state.spec)),
        res.patch).newDocument

      res.bundled = CircularJSON.parse(JSON.stringify(circ))

      commit(types.SPEC_SET, {
        resources: res.bundled.tags,
        operations: res.bundled._operations,
        spec: res.bundled,
        metas: res.bundled._metas
      })
    }).catch(err => err)
  },
  [types.SPEC_SET_LOAD_URL] ({commit}, url) {
    if (url === lastUrl) {
      return
    }

    lastUrl = url
    commit(types.UI_SET_ERROR, null)
    commit(types.SETTINGS_SET_URL, url)
    commit(types.SPEC_SET_OPERATION, null)
    commit(types.UI_SET_DRAWER, false)
    commit(types.SPEC_SET, {
      resources: null,
      operations: null,
      spec: null,
      metas: null
    })

    commit(types.UI_SET_LOADING, {text: 'Worker starting', done: 0})

    load(absoluteUrl(url), (progress) => {
      if (url !== lastUrl) {
        return
      }

      commit(types.UI_SET_LOADING, report(progress))
    }).then((res) => {
      if (url !== lastUrl) {
        return
      }

      if (res.err) {
        commit(types.UI_SET_ERROR, 'ERROR: ' + res.err.message)
        commit(types.UI_SET_LOADING, false)
      } else {
        // const count = (res.bundled._observables || []).length
        // commit(types.UI_SET_LOADING, {text: `Initializing ${count} ${count === 1 ? 'obsevable' : 'obsevables'}`, done: 1})
        commit(types.UI_SET_LOADING, {text: 'Collecting observables', done: 0.98})

        setTimeout(() => {
          if (url !== lastUrl) {
            return
          }

          res.bundled._observables = observables(res.bundled)

          commit(types.UI_SET_LOADING, {text: 'Initializing', done: 1})

          setTimeout(() => {
            Object.freeze(res.bundled.tags)
            Object.freeze(res.bundled._operations)
            Object.freeze(res.bundled._metas)
            Object.freeze(res.bundled)

            commit(types.SPEC_SET, {
              resources: res.bundled.tags,
              operations: res.bundled._operations,
              spec: res.bundled,
              metas: res.bundled._metas,
              observables: res.bundled._observables,
              json: res.json,
              url: url
            })

            commit(types.RECENT_SET_UNSHIFT, {url, title: res.bundled.info.title})
            commit(types.UI_SET_LOADING, false)
          }, 0)
        }, 0)
      }
    }).catch((err) => {
      if (url !== lastUrl) {
        return
      }

      commit(types.UI_SET_LOADING, false)
      console.warn(err)
      commit(types.UI_SET_ERROR, err)
    })
  }
}

export const getters = {
  [types.SPEC_OPERATION]: (state) => state.operation,
  [types.SPEC_METAS]: (state) => state.metas,
  [types.SPEC_OPERATIONS]: (state) => state.operations,
  [types.SPEC_RESOURCES]: (state) => state.resources,
  [types.SPEC]: (state) => state.spec,
  [types.SPEC_JSON]: (state) => state.json,
  [types.SPEC_URL]: (state) => state.url
}

export default {
  state,
  mutations,
  getters
}

const sections = {
  'Worker starting': [0, 0],
  'Worker started': [0.03, 0.03],
  'Loading': [0.06, 0.4, true],
  'Schema': [0.45, 0.6],
  'Parsing': [0.66, 0.94],
  'Markdown': [0.66, 0.94],
  'Cleaning': [0.94, 0.95],
  'Collecting': [0.95, 0.95],
  'Worker finishing': [0.95, 0.95]
}

function report (p) {
  const s = p.section || 'Loading'

  return {
    text: sections[s][2]
      ? p.cached
        ? `Cached ${p.loaded} of ${p.total} files`
        : `Loaded ${p.loaded} of ${p.total} files`
      : `${p.section} ${p.text || ''}`,
    done: sections[s][0] +
    (sections[s][1] - sections[s][0]) * (p.total ? (p.loaded / p.total) : 1)
  }
}
