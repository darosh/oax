import { configuration } from '../configuration'

export default {
  title: 'APIs.io OpenAPIs',
  subTitle: 'OpenAPI specifications from APIs.io',
  home: 'https://github.com/darosh/apis.io-openapis',
  base: 'https://darosh.github.io/apis.io-openapis/index.json',
  transform (data) {
    const keys = {}

    for (let i = 0; i < data.length; i++) {
      data[i].key = new URL(data[i].url).host

      keys[data[i].key] = keys[data[i].key] || 0
      keys[data[i].key]++

      if (keys[data[i].key] > 1) {
        data[i].key += ':' + keys[data[i].key]
      }

      data[i].url = configuration.proxy + data[i].url
    }

    return {apis: data}
  }
}
