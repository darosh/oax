const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'oax',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
    ]
  },

  plugins: [
    '~/plugins/url.js',
    '~/plugins/icons.js',
    '~/plugins/vuetify.js',
    '~/plugins/router.js',
    '~/plugins/vuex-router-sync.js',
    '~/plugins/hotkey.js',
    '~/plugins/vue-virtual-scroller.js'
  ],

  css: [
    '~/assets/style/index.styl'
  ],

  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},

  /*
  ** Build configuration
  */
  build: {
    babel: JSON.parse(require('fs').readFileSync('./.babelrc', 'utf8')),

    vendor: [
      './plugins/lodash.js',
      './plugins/d3.js',
      'axios'
    ],

    extractCSS: true,

    extend (config, ctx) {
      /*
      ** Run ESLint on save
      */
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          include: [
            resolve('main'),
            resolve('assets'),
            resolve('components'),
            resolve('plugins'),
            resolve('store')
          ],
          options: {
            cache: true
          }
        })
      }

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }

      config.module.rules.push({
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
          silent: true
        }
      })

      config.resolveLoader = {
        alias: {
          'vuetify-loader': resolve('./build/loaders/vuetify-loader')
        }
      }

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.styl(us)?$/') {
          rule.use.push({
            loader: 'vuetify-loader',
            options: {
              theme: resolve('./assets/style/theme.styl')
            }
          })
        }
      })
    }
  },

  router: {
    extendRoutes (routes, resolve) {
    }
  }
}
