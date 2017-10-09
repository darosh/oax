import * as types from './types'
import { version } from '../../package.json'
import { configuration } from '../services/configuration'

const getters = {
  [types.APP_HOME]: state => {
    if (state.spec.url === configuration.url) {
      return '/'
    } else {
      return {path: '/', query: {url: state.spec.url}}
    }
  },
  [types.APP_VERSION]: state => version,
  [types.APP_ROUTED]: state => state.route.name !== null,
  [types.APP_API_PAGE]: state => state.route.name === '/',
  [types.APP_PATH]: state => state.route.path,
  [types.APP_PAGE_NAME]: state => state.route.meta.name,
  [types.UI_FAB]: state => (state.route.path === '/') &&
    !!state.spec.operation && state.ui.right
}

export default getters
