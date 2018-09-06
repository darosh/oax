import * as types from './types'
import {next} from '../../../assets/scripts/utils/next'

export const STORAGE_KEY = 'oas-ui'

export const state = {
  dialog: {
    type: null,
    param: null
  },
  title: null,
  error: null,
  loading: false,
  log: false,
  fabMethod: null,
  fabPending: false,
  tab: 'tab-params',
  right: false,
  left: false,
  leftHalf: false,
  online: false,
  animation: true,
  highlight: null,
  leftTab: null,
  editFocus: null,
  regions: [
    {value: 'cn-north-1a', name: '华北-北京-可用区1'},
    {value: 'cn-north-1b', name: '华北-北京-可用区2'},
    {value: 'cn-east-2a', name: '华东-上海-可用区1'},
    {value: 'cn-east-2b', name: '华东-上海-可用区2'},
    {value: 'cn-east-2c', name: '华东-上海-可用区3'},
    {value: 'cn-south-1a', name: '华南-广州-可用区1'},
    {value: 'cn-south-1b', name: '华南-广州-可用区2'},
    {value: 'cn-south-1c', name: '华南-广州-可用区3'},
    {value: 'ap-southeast-1a', name: '亚太-香港-可用区1'},
    {value: 'ap-southeast-1b', name: '亚太-香港-可用区2'},
    {value: 'cn-northeast-1', name: '东北-大连-可用区1'}
  ],
  selected_region: null
  // highlight: {
  //   el: 'app-meta',
  //   text: 'Metadata'
  // }
}

export const mutations = {
  [types.UI_SET_DIALOG] (state, payload = {type: null, param: null}) {
    state.dialog.type = typeof payload === 'string' ? payload : payload.type
    state.dialog.param = typeof payload === 'string' ? null : payload.param
  },
  [types.UI_SET_LOADING] (state, payload) {
    if (payload === false) {
      state.loading[0].elapsed = Date.now() - state.loading[0].time
      state.loading.elapsed += state.loading[0].elapsed
      state.log = state.loading.slice()
      state.log.elapsed = state.loading.elapsed
      state.loading = payload
    } else {
      state.loading = state.loading || []
      state.loading.elapsed = state.loading.elapsed || 0
      payload.time = Date.now()

      if (state.loading[0]) {
        state.loading[0].elapsed = payload.time - state.loading[0].time
        state.loading.elapsed += state.loading[0].elapsed
      } else {
        payload.elapsed = 0
      }

      state.loading.unshift(payload)
    }
  },
  [types.UI_SET_ERROR] (state, payload) {
    state.error = payload
  },
  [types.UI_SET_FAB_METHOD] (state, payload) {
    state.fabMethod = payload
  },
  [types.UI_SET_FAB_PENDING] (state, payload) {
    state.fabPending = payload
  },
  [types.UI_SET_TAB] (state, payload) {
    state.tab = payload
  },
  [types.UI_SET_DRAWER] (state, payload) {
    state.right = payload
  },
  [types.UI_SET_LEFT_DRAWER] (state, payload) {
    state.left = typeof payload === 'undefined' ? !state.left : payload
  },
  [types.UI_SET_LEFT_DRAWER_HALF] (state, payload) {
    state.leftHalf = payload
  },
  [types.UI_SET_ONLINE] (state, payload) {
    state.online = payload
  },
  [types.UI_SET_LEFT_TAB] (state, payload) {
    state.leftTab = payload
  },
  [types.UI_SET_EDIT_FOCUS] (state, payload) {
    state.editFocus = payload
  },
  [types.UI_SET_ANIMATION] (state, payload) {
    state.animation = payload
  },
  [types.UI_SET_NEXT_TAB] (state, payload) {
    const tabs = ['tab-dir', 'tab-recent', 'tab-edit', 'tab-test']
    state.leftTab = next(state.leftTab, tabs)
  },
  [types.UI_SET_SELECTED_REGION] (state, payload) {
    let selected = state.regions.find(function (value) {
      return value.name === payload.name
    })
    state.selected_region = selected === undefined ? null : selected.value
  }
}

export const getters = {
  [types.UI_DLG]: state => state.dialog.type,
  [types.UI_DIALOG]: state => type => state.dialog.type === type,
  [types.UI_DIALOG_PARAM]: state => state.dialog.param,
  [types.UI_ERROR]: state => state.error,
  [types.UI_LOADING]: state => state.loading,
  [types.UI_LOG]: state => state.log,
  [types.UI_FAB_METHOD]: state => { console.log(state.fabMethod); return state.fabMethod },
  [types.UI_FAB_PENDING]: state => state.fabPending,
  [types.UI_TAB]: state => state.tab,
  [types.UI_RIGHT_DRAWER]: state => state.right,
  [types.UI_LEFT_DRAWER]: state => state.left,
  [types.UI_LEFT_DRAWER_HALF]: state => state.leftHalf,
  [types.UI_ONLINE]: state => state.online,
  [types.UI_ANIMATION]: state => state.animation,
  [types.UI_HIGHLIGHT]: state => state.highlight,
  [types.UI_LEFT_TAB]: state => state.leftTab,
  [types.UI_EDIT_FOCUS]: state => state.editFocus,
  [types.UI_GET_REGIONS]: state => state.regions,
  [types.UI_GET_SELECTED_REGION] (state) {
    let region = state.regions.find(function (value) {
      return value.value === state.selected_region
    })
    if (region === undefined || region.length === 0) {
      return null
    }
    return region.name
  }
}

export default {
  state,
  mutations,
  getters
}
