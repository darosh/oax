import * as types from './types'
import {version} from '../../package.json'

const getters = {
  [types.APP_VERSION]: state => version,
  [types.APP_API_PAGE]: state => state.route.path === '/',
  [types.APP_PATH]: state => state.route.path,
  [types.APP_PAGE_NAME]: state => state.route.meta.name,
  [types.UI_FAB]: state => (state.route.path === '/') && !!state.spec.operation && state.ui.right
}

export default getters
