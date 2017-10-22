const that = {
  title: 'SwaggerHub Registry',
  subTitle: 'Free specification hosting by SmartBear',
  home: 'https://app.swaggerhub.com/',
  base: 'https://api.swaggerhub.com/specs?specType=API&state=PUBLISHED&sort=UPDATED&order=DESC&limit=25',
  pagination: true,
  search (search) {
    return that.base + (search ? '&query=' + search : '')
  },
  transform (data, apis, search, push) {
    for (let i = 0; i < data.apis.length; i++) {
      const url = data.apis[i].properties.filter(d => d.type === 'Swagger')[0].url

      const api = {
        title: data.apis[i].name,
        url,
        key: url.split('/').slice(4, 7).join(':')
      }

      push({apis, api})
    }

    let nextUrl

    if (data.totalCount > (data.offset + 25)) {
      nextUrl = that.base + '&page=' + (data.offset / 25 + 1) + (search ? '&query=' + search : '')
    } else {
      nextUrl = null
    }

    return {apis, nextUrl}
  }
}

export default that
