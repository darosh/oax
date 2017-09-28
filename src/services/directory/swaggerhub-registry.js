const that = {
  title: 'SwaggerHub Registry',
  subTitle: 'Free specification hosting by SmartBear',
  base: 'https://api.swaggerhub.com/specs?specType=API&state=PUBLISHED&sort=UPDATED&order=DESC&limit=25',
  pagination: true,
  next: null,
  lastSearch: '',
  search (search) {
    if (that.next && (search === that.lastSearch)) {
      return that.next
    } else {
      that.lastSearch = search
    }

    return that.base + '&query=' + search
  },
  transform (data, apis) {
    for (let i = 0; i < data.apis.length; i++) {
      const url = data.apis[i].properties.filter(d => d.type === 'Swagger')[0].url

      const api = {
        title: data.apis[i].name,
        url,
        key: url.split('/').slice(4, 7).join(':')
      }

      apis.push(api)
    }

    if (data.totalCount > (data.offset + 25)) {
      that.next = that.base + '&page=' + (data.offset / 25 + 1) + (that.lastSearch ? '&query=' + that.lastSearch : '')
    } else {
      that.next = null
    }

    return {apis}
  }
}

export default that
