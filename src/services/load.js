import yaml from 'yaml-js'

const axios = require('axios')
const schemaBundler = require('json-schema-bundler')
const compactJSON = require('json-stringify-pretty-compact')

const cache = {}

export function load (url, progress = null) {
  return new Promise((resolve, reject) => {
    const schema = new schemaBundler.Schema(url, progress, yaml.load, axios.get)
    schema.cache = cache
    schema.load().then(() => {
      try {
        progress({text: 'bundle', section: 'Schema', loaded: 0, total: 1})
        schema.bundle()
        schema.json = compactJSON(schema.bundled)
        progress({text: 'dereference', section: 'Schema', loaded: 1, total: 1})
        schema.deref()
        resolve(schema)
      } catch (err) {
        reject(err)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

export function update (schema, bundled) {
  schema.bundled = bundled

  // schema.bundle()
  schema.refs = schema.bundlePart(schema.bundled, schema.url)
  schema.refs = Object.keys(schema.cache).length === 1
    ? schema.refs
    : schema.getRefs(schema.bundled)
  schema.simplifyRefs(schema.refs)

  schema.deref()
}
