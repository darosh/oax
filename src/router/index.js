import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/pages/ExplorerPage'),
      meta: {name: 'API'}
    },
    {
      path: '/about',
      component: () => import('../components/pages/AboutPage'),
      meta: {name: 'About'}
    },
    {
      path: '/http-methods',
      component: () => import('../components/pages/MethodPage'),
      meta: {name: 'Methods'}
    },
    {
      path: '/http-statuses',
      component: () => import('../components/pages/StatusPage'),
      meta: {name: 'Statuses'}
    },
    {
      path: '/http-headers',
      component: () => import('../components/pages/HeaderPage'),
      meta: {name: 'Headers'}
    }
  ]
})
