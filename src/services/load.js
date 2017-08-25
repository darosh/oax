import yaml from 'yaml-js'

const axios = require('axios')
const schemaBundler = require('json-schema-bundler')

const cache = {}

export default function load (url, progress = null) {
  return new Promise((resolve, reject) => {
    const schema = new schemaBundler.Schema(url, progress, yaml.load, axios.get)
    schema.cache = cache
    schema.load().then(() => {
      schema.bundle()
      schema.deref()
      resolve(schema)
    }).catch((err) => {
      reject(err)
    })
  })
}
