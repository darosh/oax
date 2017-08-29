import * as components from './components'
import * as directives from './directives'

// require('./app.styl')

function Vuetify (Vue) {
  const Vuetify = components.Vuetify

  Vue.use(Vuetify, {
    components,
    directives
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetify)
}

export default Vuetify
