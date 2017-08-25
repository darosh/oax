import load from '../services/load'
import CircularJSON from 'circular-json'
import serializeError from 'serialize-error'

export default function () {
  self.onmessage = function (event) {
    load(event.data.url).then(res => {
      self.postMessage(CircularJSON.stringify({
        url: event.data.url,
        bundled: res.bundled
      }))
    }).catch(res => {
      self.postMessage(CircularJSON.stringify({
        url: event.data.url,
        err: serializeError(res)
      }))
    })
  }
}
