import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  external: ['lodash'],
  output: { paths: { lodash: './lodash.js' } },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        // 'ciena-graphlib': ['alg', 'Graph']
      }
    })
  ]
}
