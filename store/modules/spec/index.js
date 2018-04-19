import * as types from './types'
import * as typesUI from '../ui/types'
import * as typesSETTINGS from '../settings/types'
import * as typesRECENT from '../recent/types'

import worker from '../../../assets/worker/index'
import search from '../../../assets/scripts/specification/methods/search'
import { openAll } from '../../../assets/scripts/specification/methods/tags'
import CircularJSON from 'circular-json'
import { applyPatch } from 'fast-json-patch'
import { observables } from '../../../assets/scripts/specification/methods/observables'
import { setError } from '../../../assets/scripts/services/codemirror-lint-json'
import { isMemory } from '../../../assets/scripts/utils/memory'

export const state = {
  spec: null,
  operation: null,
  observables: null,
  json: null,
  // TODO WORKAROUND doc PROPERTY
  doc: null,
  url: null,
  expandingItems: 0
}

export const mutations = {
  [types.SPEC_FNC] (state, payload) {
    payload()
  },
  [types.SPEC_SET] (state, payload) {
    setError()
    Object.assign(state, payload)
    // state.spec = payload.spec
    // state.observables = payload.observables
    // state.url = payload.url
    //
    // if (payload.json) {
    //   state.json = payload.json
    // }
  },
  [types.SPEC_SET_RESOURCES] (state, payload) {
    openAll(state.spec.tags, payload)
  },
  [types.SPEC_SET_EXPANDING] (state, payload) {
    state.expandingItems = payload
  },
  [types.SPEC_SET_OPERATION] (state, payload) {
    if (state.operation === payload) {
      state.operation = null
    }

    state.operation = payload
  },
  [types.SPEC_SET_PREV_OPERATION] (state) {
    let index = state.spec._operations.indexOf(state.operation)

    if (index === 0) {
      index = state.spec._operations.length
    }

    index--

    state.operation = state.spec._operations[index]
  },
  [types.SPEC_SET_NEXT_OPERATION] (state) {
    let index = state.spec._operations.indexOf(state.operation)

    if (index === (state.spec._operations.length - 1)) {
      index = -1
    }

    index++

    state.operation = state.spec._operations[index]
  },
  [types.SPEC_SET_FILTER_RESOURCES] (state, payload) {
    search(state.tags, payload)
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
let lastSlot = null

export const actions = {
  [types.SPEC_RUN_RESOURCES] ({commit}, payload) {
    commit(types.SPEC_SET_EXPANDING, state.spec.tags.length)

    setTimeout(() => {
      commit(types.SPEC_SET_RESOURCES, payload)

      setTimeout(() => {
        setTimeout(() => {
          commit(types.SPEC_SET_EXPANDING, 0)
        }, 0)
      }, 0)
    }, 0)
  },
  [types.SPEC_SET_EDIT_JSON] ({commit, getters}, {change, doc, router}) {
    if (!isMemory(state.url)) {
      const url = getters[typesRECENT.RECENT_FREE_SLOT]
      lastUrl = url
      lastSlot = {url, doc, title: url}
      commit(typesRECENT.RECENT_SET_UNSHIFT, lastSlot)
      commit(typesSETTINGS.SETTINGS_SET_URL, url)
      commit(types.SPEC_SET, {url})
      router.push({path: '/', query: {url}})
    } else {
      commit(typesRECENT.RECENT_SET_DOC, {slot: lastSlot, doc})
    }

    worker({change}).then(res => {
      if (!circ) {
        const copy = {...state.spec}
        delete copy._observables
        circ = JSON.parse(CircularJSON.stringify(copy))
      }

      circ = applyPatch(circ, res.patch).newDocument

      try {
        res.bundled = CircularJSON.parse(JSON.stringify(circ))
      } catch (err) {
        res.bundled = circ
        console.warn(err)
      }

      commit(types.SPEC_SET, {
        spec: res.bundled,
        // TODO WORKAROUND doc PROPERTY
        doc,
        observables: null
      })
    }).catch(err => {
      if (err.json) {
        setError(err)
      }
    })
  },
  [types.SPEC_SET_LOAD_URL] ({commit, getters}, url) {
    if (url === lastUrl) {
      return
    }

    lastUrl = url

    const mem = isMemory(url)
    const doc = (mem && (getters[typesRECENT.RECENT].filter(r => r.url === url)[0] || {}).doc) || ''

    commit(typesUI.UI_SET_ERROR, null)
    commit(typesSETTINGS.SETTINGS_SET_URL, url)
    commit(types.SPEC_SET_OPERATION, null)
    commit(typesUI.UI_SET_DRAWER, false)
    commit(types.SPEC_SET, {
      spec: null,
      url: url,
      json: doc
    })

    commit(typesUI.UI_SET_LOADING, {text: 'Worker starting', done: 0})

    worker({
      url: mem ? url : new URL(url, typeof location !== 'undefined' ? location.href : undefined).href,
      doc
    },
    (progress) => {
      if (url !== lastUrl) {
        return
      }

      commit(typesUI.UI_SET_LOADING, report(progress))
    }).then((res) => {
      if (url !== lastUrl) {
        return
      }

      if (res.err) {
        commit(typesUI.UI_SET_ERROR, 'ERROR: ' + res.err.message)
        commit(typesUI.UI_SET_LOADING, false)
      } else {
        // const count = (res.bundled._observables || []).length
        // commit(types.UI_SET_LOADING, {text: `Initializing ${count} ${count === 1 ? 'obsevable' : 'obsevables'}`, done: 1})
        commit(typesUI.UI_SET_LOADING,
          {text: 'Collecting observables', done: 0.98})

        setTimeout(() => {
          if (url !== lastUrl) {
            return
          }

          res.bundled._observables = observables(res.bundled)

          commit(typesUI.UI_SET_LOADING, {text: 'Initializing', done: 1})

          setTimeout(() => {
            Object.freeze(res.bundled.tags)
            Object.freeze(res.bundled._operations)
            Object.freeze(res.bundled._metas)
            Object.freeze(res.bundled)
            setTimeout(() => {
              commit(types.SPEC_SET, {
                observables: res.bundled._observables,
                spec: null,
                json: null
              })
              setTimeout(() => {
                commit(types.SPEC_SET, {
                  spec: res.bundled,
                  json: res.json,
                  url: url
                })
                commit(typesRECENT.RECENT_SET_UNSHIFT, {url, title: res.bundled.info.title})
                commit(typesUI.UI_SET_LOADING, false)
              }, 0)
            }, 0)
          }, 0)
        }, 0)
      }
    }).catch((err) => {
      if (url !== lastUrl) {
        return
      }

      commit(typesUI.UI_SET_LOADING, false)
      commit(typesUI.UI_SET_ERROR, err)
      // console.warn(err)
      throw err
    })
  }
}

export const getters = {
  [types.SPEC_TAG_OPENED]: (state) => {
    if (state.spec && state.spec.tags) {
      for (const tag of state.spec.tags) {
        if (tag._._opened) {
          return true
        }
      }
    }

    return false
  },
  [types.SPEC_OPERATION]: (state) => state.operation,
  [types.SPEC_METAS]: (state) => ((state.spec && state.spec._metas) || null),
  [types.SPEC_OPERATIONS]: (state) => ((state.spec && state.spec._operations) ||
    null),
  [types.SPEC_RESOURCES]: (state) => ((state.spec && state.spec.tags) || null),
  [types.SPEC]: (state) => state.spec,
  [types.SPEC_JSON]: (state) => state.json,
  [types.SPEC_DOC]: (state) => state.doc,
  [types.SPEC_URL]: (state) => state.url,
  [types.SPEC_EXPANDING_ITEMS]: (state) => state.expandingItems
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
