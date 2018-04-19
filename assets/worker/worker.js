import { load } from '../scripts/services/load'
import CircularJSON from 'circular-json'
import serializeError from 'serialize-error'

import update from '../scripts/utils/update'
import edit from '../scripts/utils/edit'

import { compare } from 'fast-json-patch'
import yaml from 'yaml-js'
import jsonParseError from '../scripts/utils/json-parse-error'
import { searchSpecs } from '../scripts/services/search-specs'

let json = {text: null, lines: null, schema: null, url: null, obj: null}

export default function worker (_self) {
  _self.postMessage(JSON.stringify({id: -1}))

  _self.onmessage = function (event) {
    if (event.data.md) {
      // require.ensure(['../services/markdown'], function () {
      //   const trim = require('../services/markdown').trim
      require.ensure(['./../scripts/specification'], function () {
        const trim = require('./../scripts/specification').trim
        _self.postMessage(JSON.stringify({
          id: event.data.id,
          md: trim(event.data.md)
        }))
      })
    } else if (event.data.summary) {
      // require.ensure(['../services/markdown'], function () {
      //   const summary = require('../services/markdown').summary
      require.ensure(['./../scripts/specification'], function () {
        const summary = require('./../scripts/specification').summary
        _self.postMessage(JSON.stringify({
          id: event.data.id,
          summary: summary(event.data.summary)
        }))
      })
    } else if (event.data.url) {
      load(event.data.url, event.data.progress ? (progress) => {
        _self.postMessage(JSON.stringify({
          id: event.data.id,
          url: event.data.url,
          progress
        }))
      } : null, event.data.doc).then(res => {
        const ret = {
          id: event.data.id,
          url: event.data.url
        }

        require.ensure(['./../scripts/specification'], function () {
          const OAS = require('./../scripts/specification').OAS
          let toThrow

          try {
            OAS(res.bundled, event.data.url,
              event.data.progress ? (progress) => {
                _self.postMessage(
                  JSON.stringify({
                    id: event.data.id,
                    url: event.data.url,
                    progress
                  }))
              } : null)
          } catch (err) {
            toThrow = err
            ret.err = serializeError(err)
          }

          _self.postMessage(JSON.stringify({
            id: event.data.id,
            url: event.data.url,
            progress: {section: 'Worker finishing'}
          }))

          ret.bundled = res.bundled
          json.obj = res.bundled
          json.text = res.json
          json.lines = res.json.split('\n')
          json.schema = res
          json.url = event.data.url
          ret.json = res.json
          // ret.blob = URL.createObjectURL(new Blob([res.json]))

          _self.postMessage(CircularJSON.stringify(ret))

          if (toThrow) {
            throw toThrow
          }
        })
      }).catch(res => {
        _self.postMessage(CircularJSON.stringify({
          id: event.data.id,
          url: event.data.url,
          err: serializeError(res)
        }))

        throw res
      })
    } else if (event.data.change) {
      const ret = {
        id: event.data.id
      }

      event.data.change.forEach(c => edit(json.lines, c))

      json.text = json.lines.join('\n')
      let parsed

      try {
        parsed = JSON.parse(json.text)
      } catch (err) {
        ret.err = serializeError(err)
        ret.err.line = jsonParseError(err, json.text)
        ret.err.json = true
        _self.postMessage(CircularJSON.stringify(ret))
        return
      }

      try {
        update(json.schema, parsed)
      } catch (err) {
        ret.err = serializeError(err)
        _self.postMessage(CircularJSON.stringify(ret))
        return
      }

      require.ensure(['./../scripts/specification'], function () {
        const OAS = require('./../scripts/specification').OAS
        try {
          OAS(json.schema.bundled, json.url)
        } catch (err) {
          ret.err = serializeError(err)
        }

        const source = json.old || JSON.parse(CircularJSON.stringify(json.obj))
        const target = JSON.parse(CircularJSON.stringify(json.schema.bundled))
        const patch = compare(source, target)

        json.obj = json.schema.bundled
        json.old = target
        // ret.bundled = json.schema.bundled
        ret.patch = patch

        _self.postMessage(CircularJSON.stringify(ret))
      })
    } else if (event.data.blob) {
      // require.ensure([], function () {
      const compactJSON = require('json-stringify-pretty-compact')
      let data = event.data.blob.bundled ? json.text : compactJSON(
        json.schema.cache[json.url])

      if (!event.data.blob.json) {
        // const yaml = require('js-yaml')
        data = yaml.dump(JSON.parse(data))
      }

      postMessage(JSON.stringify({
        id: event.data.id,
        blob: URL.createObjectURL(new Blob([data], {type: 'text/plain'}))
      }))
      // })
    } else if (event.data.searchSpecs !== undefined) {
      const res = searchSpecs(event.data.searchSpecs)

      const done = function (found) {
        postMessage(JSON.stringify({
          id: event.data.id,
          found
        }))
      }

      if (res && res.then) {
        res.then(done)
      } else {
        done(res)
      }
    }
  }

  return _self
}

if (typeof self !== 'undefined' && !self.document) {
  worker(self)
}

// if (!target.document) {
//   worker()
// } else {
//   console.warn('Worker running in Window scope.')
// }
