var GENERATE_ARRAY = true

var know = require('know-your-http-well')
var showdown = require('showdown')
var converter = new showdown.Converter()

var header = {}

know.headers.forEach(function (i) {
  if (GENERATE_ARRAY) {
    header[i.header.toLowerCase()] = [
      i.header,
      i.description.replace(/^"(.*)"/, '$1'),
      i.spec_title,
      i.spec_href
    ]
  } else {
    header[i.header.toLowerCase()] = {
      header: i.header,
      description: i.description.replace(/^"(.*)"/, '$1'),
      title: i.spec_title,
      url: i.spec_href
    }
  }
})

var status = {}

know.statusCodes.forEach(function (i) {
  if (GENERATE_ARRAY) {
    status[i.code] = [
      converter.makeHtml(i.phrase),
      converter.makeHtml(i.description.replace(/^"(.*)"/, '$1')),
      i.spec_title,
      i.spec_href
    ]
  } else {
    status[i.code] = {
      phrase: i.phrase,
      description: i.description.replace(/^"(.*)"/, '$1'),
      title: i.spec_title,
      url: i.spec_href
    }
  }
})

var method = {}
var swaggerMethods = [
  'DELETE',
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'HEAD',
  'OPTIONS']

know.methods.forEach(function (i) {
  if (swaggerMethods.indexOf(i.method) > -1) {
    if (GENERATE_ARRAY) {
      method[i.method.toLowerCase()] = [
        i.description.replace(/^"(.*)"/, '$1'),
        i.spec_title,
        i.spec_href,
        i.safe,
        i.idempotent,
        i.cacheable
      ]
    } else {
      method[i.method.toLowerCase()] = {
        description: i.description.replace(/^"(.*)"/, '$1'),
        title: i.spec_title,
        url: i.spec_href,
        safe: i.safe,
        idempotent: i.idempotent,
        cacheable: i.cacheable
      }
    }
  }
})

var data = {method, header, status};

console.log(JSON.stringify(data[process.argv[2]], null, 2));
