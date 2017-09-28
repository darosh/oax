export default {
  title: 'APIs.io OpenAPIs',
  subTitle: 'OpenAPI specifications from APIs.io',
  base: 'https://darosh.github.io/apis.io-openapis/index.json',
  transform (data) {
    return {apis: data}
  }
}
