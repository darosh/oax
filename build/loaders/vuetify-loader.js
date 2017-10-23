const loaderUtils = require('loader-utils')
const vuetify = require('path').join('vuetify', 'src')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)

  if (options.theme && this.resourcePath.endsWith('.styl')) {
    if (this.resourcePath.includes(vuetify) || options.globalImport) {
      return `@import '${options.theme}'\n${source}`
    }
  }

  return source
}
