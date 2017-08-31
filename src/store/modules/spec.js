import main from '../../workers/main'
import * as types from '../types'
import search from '../../models/oas/methods/search'
import { openAll } from '../../models/oas/methods/tags'
import { absoluteUrl } from '../../services/utils'

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
    // setTimeout(_ => {
    if (state.operation === payload) {
      state.operation = null
    }

    state.operation = payload
    // }, 50)
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
    payload.operation._._result = payload.result
    payload.operation._._error = payload.error
  },
  [types.SET_VALUE] (state, payload) {
    payload.item._._value = payload.value
  },
  [types.SET_RESOURCE] (state, payload) {
    payload.resource._._opened = payload.opened
  }
}

let lastUrl = null

export const actions = {
  [types.LOAD_URL] ({commit, getters}, url) {
    if (url === lastUrl) {
      return
    }

    lastUrl = url
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

    commit(types.SET_LOADING, {text: 'Worker starting', done: 0})

    main(absoluteUrl(url), (progress) => {
      if (url !== lastUrl) {
        return
      }

      commit(types.SET_LOADING, report(progress))
    }).then((res) => {
      if (url !== lastUrl) {
        return
      }

      if (res.err) {
        commit(types.SET_ERROR, 'ERROR: ' + res.err.message)
        commit(types.SET_LOADING, false)
      } else {
        commit(types.SET_LOADING, {text: 'Rendering', done: 1})

        setTimeout(() => {
          if (url !== lastUrl) {
            return
          }

          Object.freeze(res.bundled)
          Object.freeze(res.bundled.tags)
          Object.freeze(res.bundled._operations)
          Object.freeze(res.bundled._metas)

          commit(types.SET_SPEC, {
            resources: res.bundled.tags,
            operations: res.bundled._operations,
            spec: res.bundled,
            metas: res.bundled._metas,
            observables: res.bundled._observables
          })

          commit(types.RECENT_UNSHIFT, {url, title: res.bundled.info.title})
          commit(types.SET_LOADING, false)
        }, 0)
      }
    }).catch((err) => {
      if (url !== lastUrl) {
        return
      }

      commit(types.SET_LOADING, false)
      console.warn(err)
      commit(types.SET_ERROR, err)
    })
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

const sections = {
  'Worker starting': [0, 0],
  'Worker started': [0.03, 0.03],
  'Loading': [0.06, 0.4, true],
  'Schema': [0.45, 0.6],
  'Parsing': [0.66, 0.94],
  'Markdown': [0.66, 0.94],
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
