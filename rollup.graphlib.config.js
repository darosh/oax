import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  external: ['lodash'],
  paths: {lodash: './lodash.js'},
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'ciena-graphlib': ['alg', 'Graph'],
      }
    })
  ]
}
