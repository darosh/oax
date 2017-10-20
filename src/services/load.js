const yaml = require('yaml-js')
const axios = require('axios')
const schemaBundler = require('json-schema-bundler')
const compactJSON = require('json-stringify-pretty-compact')

const cache = {}

export function load (url, progress = null, doc) {
  return new Promise((resolve, reject) => {
    const validUrl = new URL(url.replace(/^memory:\/\//, 'https://')).href

    if (doc) {
      try {
        cache[validUrl] = JSON.parse(doc)
      } catch (err) {
        reject(err)
      }
    }

    const schema = new schemaBundler.Schema(validUrl, progress, yaml.load, axios.get)
    schema.cache = cache
    schema.load().then(() => {
      try {
        progress({text: 'bundle', section: 'Schema', loaded: 0, total: 1})
        schema.bundle()
        schema.json = compactJSON(schema.bundled)
        progress({text: 'dereference', section: 'Schema', loaded: 1, total: 1})
        schema.deref(true, false)
        resolve(schema)
      } catch (err) {
        reject(err)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
