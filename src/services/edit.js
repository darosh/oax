// Based on https://github.com/codemirror/CodeMirror

export default function (doc, change) {
  function update (lineIndex, text) {
    doc[lineIndex] = text
  }

  function linesFor (start, end) {
    let result = []
    for (let i = start; i < end; ++i) {
      result.push(text[i])
    }

    return result
  }

  let from = change.from
  let to = change.to
  let text = change.text
  let firstLine = getLine(doc, from.line)
  let firstLineIndex = from.line
  let lastLine = getLine(doc, to.line)
  let lastLineIndex = to.line
  let lastText = lst(text)
  let nlines = to.line - from.line

  if (change.full) {
    insert(doc, 0, linesFor(0, text.length))
    remove(doc, text.length, doc.length - text.length)
  } else if (isWholeLineUpdate(change)) {
    let added = linesFor(0, text.length - 1)

    update(lastLineIndex, lastLine)

    if (nlines) {
      remove(doc, from.line, nlines)
    }

    if (added.length) {
      insert(doc, from.line, added)
    }
  } else if (firstLineIndex === lastLineIndex) {
    if (text.length === 1) {
      update(firstLineIndex, firstLine.slice(0, from.ch) + lastText +
        firstLine.slice(to.ch))
    } else {
      let added = linesFor(1, text.length - 1)

      added.push(lastText + firstLine.slice(to.ch))
      update(firstLineIndex, firstLine.slice(0, from.ch) + text[0])
      insert(doc, from.line + 1, added)
    }
  } else if (text.length === 1) {
    update(firstLineIndex, firstLine.slice(0, from.ch) + text[0] +
      lastLine.slice(to.ch))
    remove(doc, from.line + 1, nlines)
  } else {
    update(firstLineIndex, firstLine.slice(0, from.ch) + text[0])
    update(lastLineIndex, lastText + (lastLine ? lastLine.slice(to.ch) : ''))

    let added = linesFor(1, text.length - 1)

    if (nlines > 1) {
      remove(doc, from.line + 1, nlines - 1)
    }

    insert(doc, from.line + 1, added)
  }
}

export function isWholeLineUpdate (change) {
  return change.from.ch === 0 && change.to.ch === 0 && lst(change.text) === ''
}

export function lst (arr) { return arr[arr.length - 1] }

function getLine (doc, num) {
  return doc[num]
}

function insert (doc, at, lines) {
  doc.splice(at, 0, ...lines)
}

function remove (doc, at, n) {
  doc.splice(at, n)
}
