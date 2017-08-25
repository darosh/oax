import CircularJSON from 'circular-json'
import work from 'webworkify-webpack'

const worker = work(require.resolve('./oas-worker.js'))

const jobs = {}

worker.onmessage = function (event) {
  const data = CircularJSON.parse(event.data)
  jobs[data.url](data)
  delete jobs[data.url]
}

export default function OAS (bundled, url) {
  const promise = new Promise((resolve) => {
    jobs[url] = resolve
  })

  worker.postMessage({bundled, url})

  return promise
}
