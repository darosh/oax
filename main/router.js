import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    components: {
      default: () => import('../pages/index'),
      toolbar: () => import('../components/toolbars/ExplorerToolbar'),
      panel: () => import('../components/panels/left/ExplorerPanel')
    },
    meta: {name: 'API', panel: true}
  },
  {
    name: 'about',
    path: '/about',
    components: {
      default: () => import('../pages/about'),
      toolbar: () => import('../components/toolbars/AboutToolbar'),
      panel: () => import('../components/panels/left/AboutPanel')
    },
    meta: {name: 'About', panel: true, panelWidth: 280}
  }
]

if (process.OAX_FEATURE_PAGE_METHODS) {
  routes.push({
    path: '/methods',
    components: {
      default: () => import('../pages/methods'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Methods'}
  })
}

if (process.OAX_FEATURE_PAGE_STATUSES) {
  routes.push({
    path: '/statuses',
    components: {
      default: () => import('../pages/statuses'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Statuses'}
  })
}

if (process.OAX_FEATURE_PAGE_HEADERS) {
  routes.push({
    path: '/headers',
    components: {
      default: () => import('../pages/headers'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Headers'}
  })
}

if (process.OAX_FEATURE_PAGE_STATS) {
  routes.push({
    path: '/statistics',
    components: {
      default: () => import('../pages/statistics'),
      toolbar: () => import('../components/toolbars/AboutToolbar')
    },
    meta: {name: 'Statistics'}
  })
}

export function createRouter () {
  return new Router({
    mode: typeof location !== 'undefined' && location.hostname === 'localhost' && location.port === '8080' ? 'history' : 'hash',
    routes: routes,
    scrollBehavior (to) {
      if (to.hash) {
        document.querySelector(to.hash).scrollIntoView()
      }

      return false
    }
  })
}
