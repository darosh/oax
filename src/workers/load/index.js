import CircularJSON from 'circular-json'
import work from 'webworkify-webpack'

const worker = work(require.resolve('./worker.js'))

const jobs = {}

worker.onmessage = function (event) {
  const data = CircularJSON.parse(event.data)

  if (data.err) {
    jobs[data.url].reject(data.err)
  } else {
    jobs[data.url].resolve(data)
  }

  delete jobs[data.url]
}

export default function load (url) {
  const promise = new Promise((resolve, reject) => {
    jobs[url] = {resolve, reject}
  })

  worker.postMessage({url})

  return promise
}
