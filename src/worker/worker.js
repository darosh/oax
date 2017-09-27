import load from '../services/load'
import update from '../utils/update'
import CircularJSON from 'circular-json'
import serializeError from 'serialize-error'
import { OAS } from './../models/oas'
import { trim, summary } from '../services/markdown'
import edit from '../utils/edit'

import { compare } from 'fast-json-patch'
import yaml from 'yaml-js'
import jsonParseError from '../utils/json-parse-error'
import searchSpecs from '../services/search-specs'

const compactJSON = require('json-stringify-pretty-compact')

let json = {text: null, lines: null, schema: null, url: null, obj: null}

export default function () {
  self.postMessage(JSON.stringify({id: -1}))

  self.onmessage = function (event) {
    if (event.data.md) {
      self.postMessage(JSON.stringify({
        id: event.data.id,
        md: trim(event.data.md)
      }))
    } else if (event.data.summary) {
      self.postMessage(JSON.stringify({
        id: event.data.id,
        summary: summary(event.data.summary)
      }))
    } else if (event.data.url) {
      load(event.data.url, event.data.progress ? (progress) => {
        self.postMessage(JSON.stringify({
          id: event.data.id,
          url: event.data.url,
          progress
        }))
      } : null).then(res => {
        const ret = {
          id: event.data.id,
          url: event.data.url
        }

        try {
          OAS(res.bundled, event.data.url,
            event.data.progress ? (progress) => {
              self.postMessage(
                JSON.stringify({
                  id: event.data.id,
                  url: event.data.url,
                  progress
                }))
            } : null)
        } catch (err) {
          ret.err = serializeError(err)
        }

        self.postMessage(JSON.stringify({
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

        self.postMessage(CircularJSON.stringify(ret))
      }).catch(res => {
        self.postMessage(CircularJSON.stringify({
          id: event.data.id,
          url: event.data.url,
          err: serializeError(res)
        }))
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
        self.postMessage(CircularJSON.stringify(ret))
        return
      }

      try {
        update(json.schema, parsed)
      } catch (err) {
        ret.err = serializeError(err)
        self.postMessage(CircularJSON.stringify(ret))
        return
      }

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

      self.postMessage(CircularJSON.stringify(ret))
    } else if (event.data.blob) {
      let data = event.data.blob.bundled ? json.text : compactJSON(
        json.schema.cache[json.url])

      if (!event.data.blob.json) {
        data = yaml.dump(JSON.parse(data))
      }

      postMessage(JSON.stringify({
        id: event.data.id,
        blob: URL.createObjectURL(new Blob([data]))
      }))
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
}
