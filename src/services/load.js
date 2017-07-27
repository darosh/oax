import axios from 'axios'
import yaml from 'yamljs/dist/yaml'

const schemaBundler = import('json-schema-bundler')

export default function load (url) {
  return new Promise((resolve, reject) => {
    schemaBundler.then(res => {
      const schema = new res.Schema(url, null, yaml.parse, axios.get)
      schema.load().then(() => {
        schema.bundle()
        schema.deref()
        resolve(schema)
      }).catch((err) => {
        reject(err)
      })
    })
  })
}

export function simpleOrCors (url) {
  if (isHttpInsideHttps(url)) {
    return cors(url)
  } else {
    return load(url)
  }
}

export function cors (url) {
  return new Promise((resolve, reject) => {
    schemaBundler.then(res => {
      const schema = new res.Schema(url, null, yaml.parse, corsGet)
      schema.load().then(() => {
        schema.bundle()
        schema.deref()
        resolve(schema)
      }).catch((err) => {
        reject(err)
      })
    })
  })
}

function yql (url) {
  return 'http://query.yahooapis.com/v1/public/yql?q=' + 'select * from ' + encodeURIComponent(url)
}

function corsGet (url) {
  if (isHttpInsideHttps(url)) {
    return new Promise((resolve, reject) => {
      axios.get(yql(url))
      .then(res => {

      })
      .catch(res => {

      })
    })
  } else {
    return axios.get(url)
  }
}

function isHttpInsideHttps (url) {
  if (window.location.protocol === 'https:') {
    if (url.indexOf('https:') === 0) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
