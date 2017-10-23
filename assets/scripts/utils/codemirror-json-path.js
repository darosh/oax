export default function (editor) {
  if (!editor.$root) {
    try {
      if (!editor.$rootChange) {
        editor.on('change', () => (editor.$root = null))
        editor.$rootChange = true
      }

      const obj = JSON.parse(editor.getValue())

      editor.$obj = Object.freeze(obj)
      editor.$root = {}

      Object.keys(obj).forEach((r) => {
        if (typeof obj[r] === 'object') {
          Object.keys(obj[r]).forEach((k) => {
            if (!editor.$root[k]) {
              editor.$root[k] = r
            } else {
              delete editor.$root[k]
            }
          })
        }
      })
    } catch (ign) {
      editor.$root = {}
    }
  }

  const STRING_PROPERTY = 'string property'
  const pos = editor.getCursor()
  const ctx = getInitialContext(editor, {line: pos.line, ch: pos.ch})
  let path = []

  // 0 unknown
  // 1 comma
  // 2 object
  // out of object
  let status = 0
  let index = 0
  let hasColon = false
  let parity = 0

  if (ctx.token.type === STRING_PROPERTY) {
    path.unshift(stripQuotes(ctx.token.string))

    if (isTop(ctx, path)) {
      return path
    }

    status = 2
    parity = 1
  }

  while (movePrevToken(ctx)) {
    if (ctx.token.type === null) {
      if (ctx.token.string === ',') {
        if (status < 2) {
          index++
          status = 1
        } else if (status === 3) {
          if (!parity) {
            index++
          }
        }
      } else if (ctx.token.string === ':' && parity === 0) {
        hasColon = true
      } else if (ctx.token.string === '[') {
        if (status === 1 || status === 0 || status === 3) {
          path.unshift(index)

          if (isTop(ctx, path)) {
            return path
          }

          index = 0
          status = 0
        }
      } else if (ctx.token.string === ']') {
      } else if (ctx.token.string === '{') {
        parity--

        if (status === 2 && parity === 0) {
          status = 3
        }
      } else if (ctx.token.string === '}') {
        parity++
      }
    } else if (ctx.token.type === STRING_PROPERTY) {
      if (hasColon && (parity === 0)) {
        path.unshift(stripQuotes(ctx.token.string))

        if (isTop(ctx, path)) {
          break
        }

        hasColon = false
        status = 2
        parity = 1
      }
    }
  }

  return path
}

// based on https://github.com/adobe/brackets

function stripQuotes (string) {
  if (string) {
    if (/^['"]$/.test(string.charAt(0))) {
      string = string.substr(1)
    }
    if (/^['"]$/.test(string.substr(-1, 1))) {
      string = string.substr(0, string.length - 1)
    }
  }
  return string
}

export function getInitialContext (cm, pos) {
  return {
    editor: cm,
    pos: pos,
    token: cm.getTokenAt(pos, true)
  }
}

function movePrevToken (ctx) {
  if (ctx.pos.ch <= 0 || ctx.token.start <= 0) {
    // move up a line
    if (ctx.pos.line <= 0) {
      return false // at the top already
    }
    ctx.pos.line--
    ctx.pos.ch = ctx.editor.getLine(ctx.pos.line).length
  } else {
    ctx.pos.ch = ctx.token.start
  }

  ctx.token = ctx.editor.getTokenAt(ctx.pos, false)
  return true
}

function isTop (ctx, path) {
  const top = !ctx.token.state.lexical.prev || !ctx.token.state.lexical.prev.prev ||
    !ctx.token.state.lexical.prev.prev.prev

  if (top && ctx.editor.$root[path[0]]) {
    path.unshift(ctx.editor.$root[path[0]])
  }

  return top
}
