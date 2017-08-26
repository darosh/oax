import CircularJSON from 'circular-json'
import work from 'webworkify-webpack'

const worker = work(require.resolve('./worker.js'))

const jobs = {}
const mdJobs = {}
let id = 0

worker.onmessage = function (event) {
  const data = CircularJSON.parse(event.data)

  if (data.id) {
    mdJobs[data.id].resolve(data.md)
    delete mdJobs[data.id]
  } else if (data.progress) {
    jobs[data.url].progress(data.progress)
  } else if (data.err) {
    jobs[data.url].reject(data.err)
    delete jobs[data.url]
  } else {
    jobs[data.url].resolve(data)
    delete jobs[data.url]
  }
}

export default function load (url, progress = null) {
  const promise = new Promise((resolve, reject) => {
    jobs[url] = {resolve, reject, progress}
  })

  worker.postMessage({url, progress: !!progress})

  return promise
}

export function markdown (md) {
  id++

  const promise = new Promise((resolve, reject) => {
    mdJobs[id] = {resolve, reject}
  })

  worker.postMessage({md, id})

  return promise
}
