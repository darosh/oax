import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  external: ['lodash', 'ciena-graphlib'],
  paths: {
    lodash: './lodash.js',
    'ciena-graphlib': './graphlib.js'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}
