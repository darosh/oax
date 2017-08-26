import load from '../../services/load'
import CircularJSON from 'circular-json'
import serializeError from 'serialize-error'
import { OAS } from './../../models/oas'

export default function () {
  self.onmessage = function (event) {
    load(event.data.url, event.data.progress ? (progress) => {
      self.postMessage(JSON.stringify({
        url: event.data.url,
        progress
      }))
    } : null).then(res => {
      const ret = {
        url: event.data.url
      }

      try {
        OAS(res.bundled/* , event.data.url */,
          event.data.progress ? (progress) => {
            self.postMessage(
              JSON.stringify({url: event.data.url, progress}))
          } : null)
      } catch (err) {
        ret.err = serializeError(err)
      }

      self.postMessage(JSON.stringify({url: event.data.url, progress: {section: 'Worker finishing'}}))

      ret.bundled = event.data.bundled

      self.postMessage(CircularJSON.stringify(res))
    }).catch(res => {
      self.postMessage(CircularJSON.stringify({
        url: event.data.url,
        err: serializeError(res)
      }))
    })
  }
}
