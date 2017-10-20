import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('../components/pages/ExplorerPage'),
    meta: {name: 'API'}
  },
  {
    path: '/about',
    component: () => import('../components/pages/AboutPage'),
    meta: {name: 'About'}
  }
]

if (process.OAX_METHODS) {
  routes.push({
    path: '/methods',
    component: () => import('../components/pages/MethodPage'),
    meta: {name: 'Methods'}
  })
}

if (process.OAX_STATUSES) {
  routes.push({
    path: '/statuses',
    component: () => import('../components/pages/StatusPage'),
    meta: {name: 'Statuses'}
  })
}

if (process.OAX_HEADERS) {
  routes.push({
    path: '/headers',
    component: () => import('../components/pages/HeaderPage'),
    meta: {name: 'Headers'}
  })
}

if (process.OAX_STATS) {
  routes.push({
    path: '/stats',
    component: () => import('../components/pages/StatsPage'),
    meta: {name: 'Statistics'}
  })
}

export default new Router({
  mode: (window.location.hostname === 'localhost' && location.port === '8080') ? 'history' : 'hash',
  routes: routes
})
