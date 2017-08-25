import CircularJSON from 'circular-json'
import work from 'webworkify-webpack'

const worker = work(require.resolve('./worker.js'))

const jobs = {}

worker.onmessage = function (event) {
  const data = CircularJSON.parse(event.data)

  if (data.progress) {
    jobs[data.url].progress(data.progress)
  } else if (data.err) {
    jobs[data.url].reject(data.err)
    delete jobs[data.url]
  } else {
    jobs[data.url].resolve(data)
    delete jobs[data.url]
  }
}

export default function OAS (bundled, url, progress = null) {
  const promise = new Promise((resolve, reject) => {
    jobs[url] = {resolve, reject, progress}
  })

  worker.postMessage({bundled, url, progress: !!progress})

  return promise
}
