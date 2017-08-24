import load from '../services/load'

export default function () {
  self.onmessage = function (event) {
    load(event.data.url).then(res => {
      self.postMessage(JSON.stringify({
        url: event.data.url,
        bundled: res.bundled
      }))
    })
  }
}
