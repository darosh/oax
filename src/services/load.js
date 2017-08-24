// import axios from 'axios'
// import yaml from 'yamljs/dist/yaml'
// let yaml = null

import yaml from 'yaml-js'

export default function load (url) {
  const axios = require('axios')
  const schemaBundler = require('json-schema-bundler')

  return new Promise((resolve, reject) => {
    // schemaBundler.then(res => {
    const schema = new schemaBundler.Schema(url, null, yaml.load, axios.get)
    schema.load().then(() => {
      schema.bundle()
      schema.deref()
      resolve(schema)
    }).catch((err) => {
      reject(err)
    })
    // })
  })
}
