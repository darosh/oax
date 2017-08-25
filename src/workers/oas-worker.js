import { OAS } from '../models/oas/index'
import CircularJSON from 'circular-json'

export default function () {
  self.onmessage = function (event) {
    const res = {
      url: event.data.url
    }

    try {
      OAS(event.data.bundled/* , event.data.url */)
    } catch (err) {
      console.error(err)
      res.err = err
    }

    res.bundled = event.data.bundled

    self.postMessage(CircularJSON.stringify(res))
  }
}
