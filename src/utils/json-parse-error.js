// Chrome, Opera, node: position 10
// Edge: position:10 (-1)
// Firefox: line 10 (+1)
export default function (err, text) {
  let line = 0
  let m = /position( |:)(\d+)/.exec(err.message)

  if (m && m[2]) {
    const p = parseInt(m[2]) + (m[1] === ':' ? -1 : 0)

    for (let i = p; i > -1; i--) {
      if (text[i] === '\n') {
        line++
      } else if ((text[i] === '\r') &&
        (((i + 1) >= text.length) || (text[i + 1] !== '\n'))) {
        line++
      }
    }
  } else {
    m = /line (\d+)/.exec(err.message)

    if (m && m[1]) {
      line = parseInt(m[1])
      line = line > 0 ? line - 1 : 0
    }
  }

  return line
}
