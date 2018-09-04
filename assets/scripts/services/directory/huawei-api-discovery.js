import { colored } from './openapi-directory-lite'

export default {
  title: 'Huawei OpenAPI Discovery',
  subTitle: 'Huawei Cloud serivce collection',
  home: 'http://159.138.29.201/discovery/v1/',
  base: 'http://159.138.29.201/discovery/v1/schemas/',
  keys: true,
  categories: true,
  unclassified: true,
  fullText: false,
  transform (data) {
    const apis = []

    for (let i = 0; i < data.schemas.length; i++) {
      apis.push({
        title: data.schemas[i].title,
        url: data.schemas[i].payload_href,
        categories: [],
        key: data.schemas[i].name
      })
    }
    apis.sort((a, b) => a.key.localeCompare(b.key))

    let cats = {}

    for (let i = 0; i < apis.length; i++) {
      const c = apis[i].categories

      if (c) {
        for (let j = 0; j < c.length; j++) {
          cats[c[j]] = cats[c[j]] || {
            title: (c[j][0].toUpperCase() + c[j].substr(1)).replace(/_/g, ' '),
            count: 0
          }

          cats[c[j]].count++
        }
      }
    }

    const keys = Object.keys(cats)
    keys.sort()

    const categories = {}
    keys.forEach(k => (categories[k] = cats[k]))
    colored(categories)

    return {apis, categories}
  }
}
