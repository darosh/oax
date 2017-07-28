import axios from 'axios'

export default function yqlProxy (url) {
  return axios.get(yql(url))
}

function yql (url) {
  return 'http://query.yahooapis.com/v1/public/yql?q=' +
    encodeURIComponent('select * from json where url="' + url + '"') +
    '&format=json'
}
