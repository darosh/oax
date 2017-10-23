// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },

  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard'
    // ,
    // TODO: PUG ignored, not supported yet: https://github.com/vuejs/eslint-plugin-vue/pull/180
    // 'plugin:vue/recommended'
  ],

  // required to lint *.vue files
  plugins: [
    'html'
  ],

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },

  globals: {}
}
