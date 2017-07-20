import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/ExplorerPage'),
      meta: {name: 'API'}
    },
    {
      path: '/http-methods',
      component: () => import('../components/HttpMethodPage'),
      meta: {name: 'Methods'}
    },
    {
      path: '/http-statuses',
      component: () => import('../components/HttpStatusPage'),
      meta: {name: 'Statuses'}
    },
    {
      path: '/http-headers',
      component: () => import('../components/HttpHeaderPage'),
      meta: {name: 'Headers'}
    }
  ]
})
