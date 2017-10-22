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
    '~/plugins/vuetify.js',
    '~/plugins/router.js',
    '~/plugins/vuex-router-sync.js',
    '~/plugins/hotkey.js'
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    babel: {
      // 'presets': [
      //   [
      //     'env',
      //     {
      //       'modules': false
      //     }
      //   ],
      //   'stage-2'
      // ],
      plugins: [
        // 'dynamic-import-webpack',
        // 'transform-runtime',
        [
          'transform-imports',
          {
            'vuetify': {
              'transform': 'vuetify/es5/components/${member}',
              'preventFullImport': true
            }
          }
        ]
      ]
    },
    vendor: [
      '~/plugins/vuetify.js',
      'lodash',
      'axios'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
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
        loader: 'ts-loader'
      })

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.styl(us)?$/') {
          rule.use.push({
            loader: 'vuetify-loader',
            options: {
              theme: resolve('./assets/style/theme.styl')
            }
          })
        }

        // if (rule.loader === 'babel-loader') {
        //   console.log(rule)
        //   delete rule.exclude
        //   rule.include = [
        //     resolve('.nuxt'),
        //     resolve('assets'),
        //     resolve('components'),
        //     resolve('layouts'),
        //     resolve('pages'),
        //     resolve('plugins'),
        //     resolve('store'),
        //     resolve('node_modules/lodash-es'),
        //     resolve('node_modules/v-hotkey'),
        //     resolve('node_modules/codemirror'),
        //     resolve('node_modules/walk-parse5'),
        //     resolve('node_modules/vue-virtual-scroller'),
        //     resolve('node_modules/vue-observe-visibility')
        //   ]
        // }
      })
    }
  },
  router: {
    extendRoutes (routes, resolve) {
    }
  }
}
