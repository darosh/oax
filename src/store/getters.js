import * as types from './types'
import {version} from '../../package.json'

const getters = {
  [types.VERSION]: state => version,
  [types.IS_API]: state => state.route.path === '/',
  [types.PATH]: state => state.route.path,
  [types.PAGE_NAME]: state => state.route.meta.name,
  [types.FAB]: state => (state.route.path === '/') && !!state.spec.operation && state.ui.drawer
}

export default getters
