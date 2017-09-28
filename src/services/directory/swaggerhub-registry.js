export default {
  title: 'SwaggerHub Registry',
  subTitle: 'Online collection by SmartBear',
  base: 'https://api.swaggerhub.com/specs?specType=API&state=PUBLISHED&sort=UPDATED&limit=25',
  pagination: true,
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

    return {apis}
  }
}
