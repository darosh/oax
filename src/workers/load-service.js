import CircularJSON from 'circular-json'
import work from 'webworkify-webpack'

const worker = work(require.resolve('./load-worker.js'))

const jobs = {}

worker.onmessage = function (event) {
  const data = CircularJSON.parse(event.data)
  jobs[data.url](data)
  delete jobs[data.url]
}

export default function load (url) {
  const promise = new Promise((resolve) => {
    jobs[url] = resolve
  })

  worker.postMessage({url})

  return promise
}
