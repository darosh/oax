import * as types from './types'

const getters = {
  [types.IS_API]: state => state.route.path === '/',
  [types.PATH]: state => state.route.path
}

export default getters
