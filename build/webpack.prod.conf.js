var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var env = config.build.env

var babel = require("babel-core");
var uglify = require('uglify-js');

let workerJS = uglify.minify(babel.transformFileSync(path.join(__dirname, './service-worker-prod.js')).code).code

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
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
    // new webpack.optimize.UglifyJsPlugin({
    new UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      comments: false,
      sourceMap: false
      // exclude: /worker/g
    }),
    // new UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   TODO: web worker does not work mangled with webpack@3
    // mangle: false,
    // comments: false,
    // sourceMap: false,
    // include: /worker/g
    // }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
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
    // keep module.id stable when vendor modules does not change
    // TODO: web worker does not work mangled with HashedModuleIdsPlugin
    // new webpack.HashedModuleIdsPlugin(),
    // spl  it vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'worker',
    //   minChunks: function (module, count) {
    //     return (
    //       module.resource &&
    //       /(axios|follow-redirects|is-buffer|yaml-js|parse5|debug|json-schema-bundler|standard|tape|zuul)/.test(module.resource)
    //     )
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // async: true,
    //   name: 'vue',
    //   minChunks: function (module, count) {
    //     return (
    //       module.resource && /vue/.test(module.resource)
    //     )
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // async: true,
    //   name: 'vendor',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       (module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0)
    //       // && (module.resource.indexOf(path.join(__dirname, '../node_modules/vuetify')) === -1)
    //     )
    //   }
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor', 'vue']
    // }),
    // copy custom static assets
    new webpack.optimize.CommonsChunkPlugin({
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      name: 'worker'
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
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
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
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require(
    'webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
