const webpack = require('webpack')
const path = require('path')
const utils = require('./utils/utils')
const config = require('./config')
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
      './plugins/lodash.js',
      './plugins/d3.js',
      './plugins/dagre.js',
      './plugins/graphlib.js',
      'axios'
    ],
    app: './main/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    globalObject: 'self',
    publicPath: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.WEBPACK': true,
      'process.OAX_VERSION': JSON.stringify(require('../package').version),
      'process.OAX_BUILD': JSON.stringify(new Date().toISOString()),
      ...rc
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity
    // })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': resolve('.'),
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
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
          silent: true
        }
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        include: [
          resolve('main'),
          resolve('assets'),
          resolve('components'),
          // resolve('plugins'),
          resolve('store')
        ],
        options: {
          cache: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // TODO: publicPath does not work
      // {
      //   test: /worker\.js$/,
      //   loader: 'worker-loader',
      //   options: {
      //     publicPath: '/worker/'
      //   }
      // },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/,
        include: [
          resolve('main'),
          resolve('assets'),
          resolve('components'),
          resolve('plugins'),
          resolve('store')
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
