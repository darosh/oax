import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  external: ['d3', 'lodash', 'dagre', 'ciena-graphlib'],
  paths: {
    d3: './d3.js',
    lodash: './lodash.js',
    dagre: './dagre.js',
    'ciena-graphlib': './graphlib.js'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}
