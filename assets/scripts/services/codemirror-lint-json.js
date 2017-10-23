let lastErr = null
let lastPromise = null

export function lintJson (CodeMirror) {
  CodeMirror.registerHelper('lint', 'json', lint)
}

export function setError (err) {
  lastErr = err ? [
    {
      from: window.CodeMirror.Pos(err.line, 0),
      to: window.CodeMirror.Pos(err.line, 0),
      message: err.message
    }] : []

  if (lastPromise) {
    lastPromise(lastErr)
    lastPromise = null
    lastErr = null
  }
}

function lint () {
  return new Promise(resolve => {
    lastPromise = resolve

    if (lastErr) {
      lastPromise(lastErr)
      lastPromise = null
      lastErr = null
    }
  })
}
