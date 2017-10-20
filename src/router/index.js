import Vue from 'vue'
import Router from 'vue-router'

// import ExplorerPage from '../components/pages/ExplorerPage'
// import AboutPage from '../components/pages/AboutPage'
// import MethodPage from '../components/pages/MethodPage'
// import StatusPage from '../components/pages/StatusPage'
// import HeaderPage from '../components/pages/HeaderPage'
// import StatsPage from '../components/pages/StatsPage'

Vue.use(Router)

export default new Router({
  mode: (window.location.hostname === 'localhost' && location.port === '8080') ? 'history' : 'hash',
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('../components/pages/ExplorerPage'),
      // component: ExplorerPage,
      meta: {name: 'API'}
    },
    {
      path: '/about',
      component: () => import('../components/pages/AboutPage'),
      // component: AboutPage,
      meta: {name: 'About'}
    },
    {
      path: '/methods',
      component: () => import('../components/pages/MethodPage'),
      // component: MethodPage,
      meta: {name: 'Methods'}
    },
    {
      path: '/statuses',
      component: () => import('../components/pages/StatusPage'),
      // component: StatusPage,
      meta: {name: 'Statuses'}
    },
    {
      path: '/headers',
      component: () => import('../components/pages/HeaderPage'),
      // component: HeaderPage,
      meta: {name: 'Headers'}
    },
    {
      path: '/stats',
      component: () => import('../components/pages/StatsPage'),
      // component: StatsPage,
      meta: {name: 'Statistics'}
    }
  ]
})
