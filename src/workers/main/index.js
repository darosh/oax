import CircularJSON from 'circular-json'
import work from 'webworkify-webpack'

// const worker = work(require.resolve('./worker.js'), {all: true})
const worker = work(require.resolve('./worker.js'))

const jobs = {}
let id = 0

worker.onmessage = function (event) {
  const data = CircularJSON.parse(event.data)

  // if (data.id === -1) {
  //   return console.log('Worker started')
  // }

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

export default function load (url, progress = null) {
  id++

  const promise = new Promise((resolve, reject) => {
    jobs[id] = {resolve, reject, progress}
  })

  worker.postMessage({id, url, progress: !!progress})

  return promise
}

export function markdown (md) {
  id++

  const promise = new Promise((resolve, reject) => {
    jobs[id] = {resolve, reject}
  })

  worker.postMessage({md, id})

  return promise
}

export function summary (summary) {
  id++

  const promise = new Promise((resolve, reject) => {
    jobs[id] = {resolve, reject}
  })

  worker.postMessage({summary, id})

  return promise
}
