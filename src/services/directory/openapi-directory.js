export default {
  title: 'OpenAPI Directory',
  subTitle: 'Community driven online collection',
  base: 'https://api.apis.guru/v2/list.json',
  categories: true,
  transform (data) {
    const apis = []

    for (let key in data) {
      if (data.specs.hasOwnProperty(key)) {
        let v = data[key]
        apis.push({
          title: v.versions[v.preferred].title,
          key,
          url: v.versions[v.preferred].swaggerYamlUrl,
          categories: v.versions[v.preferred]['x-apisguru-categories']
        })
      }
    }

    apis.sort((a, b) => a.key.localeCompare(b.key))

    return apis
  }
}
