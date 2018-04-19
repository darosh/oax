const path = require('path')
const utils = require('./utils/utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const ShakePlugin = require('webpack-common-shake').Plugin;
// const ProgressPlugin = require('progress-bar-webpack-plugin')
// const chalk = require('chalk')

const env = config.build.env

const babel = require('babel-core')
const uglify = require('uglify-js')

let workerJS = uglify.minify(babel.transformFileSync(path.join(__dirname, './assets/service-worker-prod.js')).code).code

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: false
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // new ShakePlugin(),

    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 5,
        compress: true,
        mangle: true
      },
      extractComments: true,
      sourceMap: false,
      cache: true,
      parallel: false
    }),

    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css')
    // }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${workerJS}</script>`
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'oax',
      filename: 'service-worker.js',
      staticFileGlobs: [
        'dist/static/css/*.css',
        'dist/static/js/*.js',
        'dist/*.worker.js'
      ],
      minify: true,
      // templateFilePath: path.resolve(__dirname, './service-worker.tmpl'),
      stripPrefix: 'dist/',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/.*\//,
          handler: 'networkFirst'
        }
      ]
    })

    // new ProgressPlugin({
    //   format: '  [:msg] [:bar] ' + chalk.green.bold(':percent'),
    //   clear: true
    // })
  ]
})

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    defaultSizes: 'gzip',
    generateStatsFile: false
  }))
}

module.exports = webpackConfig
