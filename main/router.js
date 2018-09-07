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
