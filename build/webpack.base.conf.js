const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const rc = require('rc')('oax', {
  'DIALOG_HEADERS': true,
  'DIALOG_METHODS': true,
  'DIALOG_STATUSES': true,
  'PAGE_HEADERS': true,
  'PAGE_METHODS': true,
  'PAGE_STATUSES': true,
  'PAGE_STATS': true,
  'PAGE_ABOUT': true,
  'PAGE_ABOUT_KEYBOARD': true,
  'GITHUB': true,
  'EDIT': true,
  'DIRECTORY': true,
  'EDITOR': true,
  'MARKDOWN': true,
  'HIGHLIGHT': true
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

Object.keys(rc).forEach(k => rc['process.OAX_FEATURE_' + k] = rc[k])

module.exports = {
  entry: {
    vendor: [
      'lodash-es/flatten',
      'lodash-es/groupBy',
      'lodash-es/map',
      'lodash-es/maxBy',
      'lodash-es/orderBy',
      'lodash-es/round',
      'lodash-es/sum',
      'lodash-es/sumBy',
      'lodash-es/values',
      'lodash-es/findIndex',
      'lodash-es/countBy',
      'lodash-es/isArray',
      'lodash-es/union',
      'lodash-es/defaults',
      'lodash-es/mergeWith',
      'd3-format/src/defaultLocale',
      'd3-shape/src/arc',
      'd3-shape/src/pie',
      'd3-array',
      'd3-scale/src/linear',
      'd3-scale/src/ordinal'
    ],
    app: './main/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.OAX_VERSION': JSON.stringify(require('../package').version),
      'process.OAX_BUILD': JSON.stringify(new Date().toISOString()),
      ...rc
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {appendTsSuffixTo: [/\.vue$/], silent: true}
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        include: [
          resolve('main'),
          resolve('assets'),
          resolve('components'),
          resolve('plugins'),
          resolve('store'),
          resolve('node_modules/vuetify/src'),
          resolve('node_modules/v-hotkey'),
          resolve('node_modules/codemirror'),
          resolve('node_modules/walk-parse5'),
          resolve('node_modules/vue-virtual-scroller'),
          resolve('node_modules/vue-observe-visibility')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
