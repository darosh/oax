import work from 'webworkify-webpack'

const worker = work(require.resolve('./md-worker.js'))

export function run (msg) {
  const promise = new Promise((resolve) => {
    worker.onmessage = function (event) {
      resolve(event.data)
    }
  })

  worker.postMessage(msg)

  return promise
}
