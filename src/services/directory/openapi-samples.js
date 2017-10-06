export default {
  title: 'OpenAPI Samples',
  subTitle: 'Test suite',
  home: 'https://github.com/darosh/openapi-samples',
  base: 'https://darosh.github.io/openapi-samples/index.json',
  transform (data) {
    for (let i = 0; i < data.length; i++) {
      data[i].key = (i + 1).toString() + (data[i].note ? ': ' + data[i].note : '')
    }

    return {apis: data}
  }
}
