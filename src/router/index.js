import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '/',
    components: {
      default: () => import('../components/pages/ExplorerPage'),
      toolbar: () => import('../components/toolbars/ExplorerToolbar'),
      panel: () => import('../components/panels/ExplorerPanel')
    },
    meta: {name: 'API', panel: true}
  },
  {
    name: 'about',
    path: '/about',
    components: {
      default: () => import('../components/pages/AboutPage'),
      toolbar: () => import('../components/toolbars/AboutToolbar'),
      panel: () => import('../components/panels/AboutPanel')
    },
    meta: {name: 'About', panel: true}
  }
]

if (process.OAX_FEATURE_PAGE_METHODS) {
  routes.push({
    path: '/methods',
    components: {
      default: () => import('../components/pages/MethodPage'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Methods'}
  })
}

if (process.OAX_FEATURE_PAGE_STATUSES) {
  routes.push({
    path: '/statuses',
    components: {
      default: () => import('../components/pages/StatusPage'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Statuses'}
  })
}

if (process.OAX_FEATURE_PAGE_HEADERS) {
  routes.push({
    path: '/headers',
    components: {
      default: () => import('../components/pages/HeaderPage'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Headers'}
  })
}

if (process.OAX_FEATURE_PAGE_STATS) {
  routes.push({
    path: '/stats',
    components: {
      default: () => import('../components/pages/StatsPage'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Statistics'}
  })
}

export default new Router({
  mode: (window.location.hostname === 'localhost' && location.port === '8080') ? 'history' : 'hash',
  routes: routes,
  scrollBehavior (to) {
    if (to.hash) {
      document.querySelector(to.hash).scrollIntoView()
    }

    return false
  }
})
