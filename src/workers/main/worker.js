import load from '../../services/load'
import CircularJSON from 'circular-json'
import serializeError from 'serialize-error'
import { OAS } from './../../models/oas'
import { trim, summary, text } from './../../services/md-converter'

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
        summary: summary(text(event.data.summary))
      }))
    } else {
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

        self.postMessage(CircularJSON.stringify(ret))
      }).catch(res => {
        self.postMessage(CircularJSON.stringify({
          id: event.data.id,
          url: event.data.url,
          err: serializeError(res)
        }))
      })
    }
  }
}
