import CircularJSON from 'circular-json'
// import work from 'webworkify-webpack'

// const worker = work(require.resolve('./worker.js'))

/* eslint-disable import/no-webpack-loader-syntax */
// const Work = require('worker-loader?inline&fallback=false!./worker.js')
const Work = require('worker-loader!./worker.js')
const worker = new Work()

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
