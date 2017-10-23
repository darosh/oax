import * as types from './types'
import * as typesUI from '../ui/types'

import { configuration } from '../../../assets/scripts/services/configuration'

export const getters = {
  [types.APP_HOME]: state => {
    if (state.spec.url === configuration.url) {
      return '/'
    } else {
      return {path: '/', query: {url: state.spec.url}}
    }
  },
  [types.APP_UPDATED]: state => state.configuration.updated,
  [types.APP_VERSION]: state => process.OAX_VERSION,
  [types.APP_BUILD]: state => new Date(process.OAX_BUILD),
  [types.APP_ROUTED]: state => state.route.name !== null,
  [types.APP_API_PAGE]: state => state.route.name === 'index',
  [types.APP_PATH]: state => state.route.path,
  [types.APP_PAGE_NAME]: state => state.route.meta.name,
  [typesUI.UI_FAB]: state => (state.route.path === '/') &&
    !!state.spec.operation && state.ui.right
}
