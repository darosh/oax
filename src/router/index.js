import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/ExplorerPage')
    },
    {
      path: '/http-methods',
      component: () => import('../components/HttpMethodPage')
    },
    {
      path: '/http-statuses',
      component: () => import('../components/HttpStatusPage')
    },
    {
      path: '/http-headers',
      component: () => import('../components/HttpHeaderPage')
    }
  ]
})
