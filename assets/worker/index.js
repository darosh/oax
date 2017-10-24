import CircularJSON from 'circular-json'

let worker

if (process.WEBPACK) {
  /* eslint-disable import/no-webpack-loader-syntax */
  // const Work = require('./worker.js')
  // const Work = require('worker-loader?publicPath=/worker/!./worker.js')
  // const Work = require('worker-loader?fallback=false&inline!./worker.js')
  const Work = require('worker-loader!./worker.js')
  worker = new Work()
} else {
  if (typeof window !== 'undefined') {
    const Work = require('worker-loader!./worker.js')
    worker = new Work()
  } else {
    let internal

    worker = {
      postMessage (data) {
        if (internal && internal.onmessage) {
          internal.onmessage({data})
        }
      }
    }

    internal = require('./worker.js').default({
      postMessage (data) {
        if (worker && worker.onmessage) {
          worker.onmessage({data})
        }
      }
    })
  }
}

const jobs = {}
let id = 0

worker.onmessage = function (event) {
  const data = CircularJSON.parse(event.data)

  data.elapsed = Date.now() - data.start

  if (data.md) {
    jobs[data.id].resolve(data.md)
    delete jobs[data.id]
  } else if (data.summary) {
    jobs[data.id].resolve(data.summary)
    delete jobs[data.id]
  } else if (data.progress) {
    jobs[data.id].progress(data.progress)
  } else if (data.err) {
    jobs[data.id].reject(data.err)
    delete jobs[data.id]
  } else if (jobs[data.id]) {
    jobs[data.id].resolve(data)
    delete jobs[data.id]
  }
}

/**
 * @param payload object with one of properties: blob|change|summary|md|url|searchSpecs
 * @param progress
 * @returns {Promise}
 */
export default function (payload, progress = null) {
  id++

  const promise = new Promise((resolve, reject) => {
    jobs[id] = {resolve, reject, progress}
  })

  payload.id = id
  payload.progress = !!progress
  payload.start = Date.now()
  worker.postMessage(payload)

  return promise
}
