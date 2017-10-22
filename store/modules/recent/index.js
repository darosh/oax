import * as types from './types'

export const state = {
  recent: []
}

export const mutations = {
  [types.RECENT_SET_UNSHIFT] (state, payload) {
    const past = state.recent.filter(item => item.url === payload.url)

    // if (past[0]) {
    //   state.recent.splice(state.recent.indexOf(past[0]), 1)
    // }

    if (!past[0]) {
      state.recent.unshift(payload)
    }
  },
  [types.RECENT_SET_REMOVE] (state, payload) {
    state.recent.splice(typeof payload === 'number' ? payload : state.recent.indexOf(payload), 1)
  },
  [types.RECENT_SET_DOC] (state, {doc, slot}) {
    slot.doc = doc
  }
}

export const getters = {
  [types.RECENT]: (state) => state.recent,
  [types.RECENT_FREE_SLOT]: (state) => {
    const d = new Date()

    for (let n = 1; ; n++) {
      const link = memoryLink(d, n)
      if (!state.recent.filter(r => r.url === link).length) {
        return link
      }
    }
  }
}

export default {
  state,
  mutations,
  getters
}

function memoryLink (d, n) {
  let m = d.getMonth() + 1
  m = m < 10 ? `0${m}` : m
  let a = d.getDate()
  a = a < 10 ? `0${a}` : a
  const o = n < 10 ? `0${n}` : n
  return `memory://${d.getFullYear()}-${m}-${a}:${o}`
}
