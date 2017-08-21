import {Converter} from 'showdown'

export default function () {
  const converter = new Converter()
  converter.setFlavor('github')

  self.onmessage = function (event) {
    self.postMessage(converter.makeHtml(event.data))
  }
}
