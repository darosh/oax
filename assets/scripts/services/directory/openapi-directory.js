import { colored } from './openapi-directory-lite'

export default {
  title: 'OpenAPI Directory',
  subTitle: 'Community driven online collection',
  home: 'https://apis.guru/openapi-directory/',
  base: 'https://api.apis.guru/v2/list.json',
  keys: true,
  categories: true,
  unclassified: true,
  transform (data) {
    const apis = []

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let v = data[key]
        apis.push({
          title: v.versions[v.preferred].info.title,
          key,
          url: v.versions[v.preferred].swaggerYamlUrl,
          categories: v.versions[v.preferred].info['x-apisguru-categories']
        })
      }
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
