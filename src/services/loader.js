import axios from 'axios'
import yaml from 'yamljs/dist/yaml'

const schemaBundler = import('json-schema-bundler')

export default class Loader {
  static load (url) {
    return new Promise((resolve, reject) => {
      schemaBundler.then(res => {
        const schema = new res.Schema(url, null, yaml.parse, axios.get)
        schema.load().then(() => {
          schema.bundle()
          schema.deref()
          resolve(schema)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }
}
