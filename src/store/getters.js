import * as types from './types'

const getters = {
  [types.IS_API]: state => state.route.path === '/',
  [types.PATH]: state => state.route.path,
  [types.PAGE_NAME]: state => state.route.meta.name
}

export default getters
