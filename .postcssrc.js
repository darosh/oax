// https://github.com/michael-ciniawsky/postcss-load-config
const postcss = require('postcss')
const mqpacker = require('css-mqpacker')
// const willChange = require('postcss-will-change')
const autoprefixer = require('autoprefixer')
const calc = require('postcss-calc')
const discardDuplicates = require('postcss-discard-duplicates')

module.exports = () => ({
  'plugins': [
    discardDuplicates(),
    // willChange(),
    mqpacker(),
    precision(),
    calc(),
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer()
  ]
})

// Define the plugin.
const precision = postcss.plugin('postcss-precision', function () {
  const getMatch = (value) => {
    const longTest = /(\d+?\.\d{3,})(%|em|px)/gi

    value = value + ''
    const matches = longTest.exec(value + '')

    if (!matches) return null
    else return matches[1]
  }

  return function (style) {
    style.walkDecls(function (decl) {
      if (decl.value) {
        // Grab array of matches.
        const value = getMatch(decl.value)

        if (!value) return

        // Round two decimal places.
        const rounded = Math.round(parseFloat(value) * 100) / 100

        // Change the value in the tree.
        decl.value = decl.value.replace(value, rounded.toString())
      }
    })
  }
})
