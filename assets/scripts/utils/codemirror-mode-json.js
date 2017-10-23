// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

export function modeJson (CodeMirror) {
  'use strict'

  CodeMirror.defineMode('javascript', function (config, parserConfig) {
    let indentUnit = config.indentUnit
    let wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/

    // Tokenizer

    let atom = {type: 'atom', style: 'atom'}
    let keywords = {
      'true': atom,
      'false': atom,
      'null': atom
    }

    // Used as scratch variables to communicate multiple values without
    // consing up tons of objects.
    let type, content

    function ret (tp, style, cont) {
      type = tp
      content = cont
      return style
    }

    function tokenBase (stream, state) {
      let ch = stream.next()

      if (ch === '"') {
        state.tokenize = tokenString(ch)
        return state.tokenize(stream, state)
      } else if (ch === '.' && stream.match(/^\d+(?:[eE][+-]?\d+)?/)) {
        return ret('number', 'number')
      } else if (/[[\]{}(),;:.]/.test(ch)) {
        return ret(ch)
      } else if (ch === '0' && stream.eat(/x/i)) {
        stream.eatWhile(/[\da-f]/i)
        return ret('number', 'number')
      } else if (ch === '0' && stream.eat(/o/i)) {
        stream.eatWhile(/[0-7]/i)
        return ret('number', 'number')
      } else if (ch === '0' && stream.eat(/b/i)) {
        stream.eatWhile(/[01]/i)
        return ret('number', 'number')
      } else if (/\d/.test(ch)) {
        stream.match(/^\d*(?:\.\d*)?(?:[eE][+-]?\d+)?/)
        return ret('number', 'number')
      } else if (wordRE.test(ch)) {
        stream.eatWhile(wordRE)
        let word = stream.current()

        if (state.lastType !== '.') {
          if (keywords.propertyIsEnumerable(word)) {
            let kw = keywords[word]
            return ret(kw.type, kw.style, word)
          }
        }
      }
    }

    function tokenString (quote) {
      return function (stream, state) {
        let escaped = false
        let next

        while ((next = stream.next()) != null) {
          if (next === quote && !escaped) break
          escaped = !escaped && next === '\\'
        }

        if (!escaped) {
          state.tokenize = tokenBase
        }

        return ret('string', 'string')
      }
    }

    // Parser

    let atomicTypes = {
      'atom': true,
      'number': true,
      'string': true
    }

    function JSLexical (indented, column, type, align, prev, info) {
      this.indented = indented
      this.column = column
      this.type = type
      this.prev = prev
      this.info = info
      if (align != null) this.align = align
    }

    function parseJS (state, style, type, content, stream) {
      let cc = state.cc
      // Communicate our context to the combinators.
      // (Less wasteful than consing up a hundred closures on every call.)
      cx.state = state
      cx.stream = stream
      cx.marked = null
      cx.cc = cc
      cx.style = style

      if (!state.lexical.hasOwnProperty('align')) {
        state.lexical.align = true
      }

      while (true) {
        let combinator = cc.length ? cc.pop() : expression

        if (combinator(type, content)) {
          while (cc.length && cc[cc.length - 1].lex) {
            cc.pop()()
          }

          if (cx.marked) {
            return cx.marked
          }

          return style
        }
      }
    }

    // Combinator utils

    let cx = {state: null, column: null, marked: null, cc: null}

    function pass () {
      for (let i = arguments.length - 1; i >= 0; i--) {
        cx.cc.push(arguments[i])
      }
    }

    function cont () {
      pass.apply(null, arguments)
      return true
    }

    // Combinators

    function pushlex (type, info) {
      let result = function () {
        let state = cx.state
        let indent = state.indented
        state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info)
      }

      result.lex = true

      return result
    }

    function poplex () {
      let state = cx.state

      if (state.lexical.prev) {
        state.lexical = state.lexical.prev
      }
    }

    poplex.lex = true

    function expect (wanted) {
      function exp (type) {
        if (type === wanted) return cont()
        else return cont(exp)
      }

      return exp
    }

    function expression (type) {
      return expressionInner(type, false)
    }

    function expressionNoComma (type) {
      return expressionInner(type, true)
    }

    function expressionInner (type, noComma) {
      let maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma
      if (atomicTypes.hasOwnProperty(type)) return cont(maybeop)
      if (type === '[') return cont(pushlex(']'), arrayLiteral, poplex, maybeop)
      if (type === '{') return contCommasep(objprop, '}', null, maybeop)
      return cont()
    }

    function maybeexpression (type) {
      if (type.match(/[;})\],]/)) return pass()
      return pass(expression)
    }

    function maybeoperatorComma (type, value) {
      if (type === ',') return cont(expression)
      return maybeoperatorNoComma(type, value, false)
    }

    function maybeoperatorNoComma (type, value, noComma) {
      let me = noComma === false ? maybeoperatorComma : maybeoperatorNoComma

      if (type === '[') {
        return cont(pushlex(']'), maybeexpression, expect(']'), poplex, me)
      }
    }

    function objprop (type) {
      if (cx.style === 'keyword') {
        cx.marked = 'property'
        return cont(afterprop)
      } else if (type === 'number' || type === 'string') {
        cx.marked = cx.style + ' property'
        return cont(afterprop)
      } else if (type === '[') {
        return cont(expression, expect(']'), afterprop)
      } else if (type === ':') {
        return pass(afterprop)
      }
    }

    function afterprop (type) {
      if (type === ':') return cont(expressionNoComma)
    }

    function commasep (what, end, sep) {
      function proceed (type, value) {
        if (sep ? sep.indexOf(type) > -1 : type === ',') {
          return cont(function (type, value) {
            if (type === end || value === end) return pass()
            return pass(what)
          }, proceed)
        }
        if (type === end || value === end) return cont()
        return cont(expect(end))
      }

      return function (type, value) {
        if (type === end || value === end) return cont()
        return pass(what, proceed)
      }
    }

    function contCommasep (what, end, info) {
      for (let i = 3; i < arguments.length; i++) {
        cx.cc.push(arguments[i])
      }

      return cont(pushlex(end, info), commasep(what, end), poplex)
    }

    function arrayLiteral (type) {
      if (type === ']') return cont()
      return pass(commasep(expressionNoComma, ']'))
    }

    // Interface

    return {
      startState: function (basecolumn) {
        let state = {
          tokenize: tokenBase,
          lastType: 'sof',
          cc: [],
          lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, 'block',
            false),
          localVars: parserConfig.localVars,
          context: parserConfig.localVars && {vars: parserConfig.localVars},
          indented: basecolumn || 0
        }

        if (parserConfig.globalVars &&
          typeof parserConfig.globalVars === 'object') {
          state.globalVars = parserConfig.globalVars
        }

        return state
      },

      token: function (stream, state) {
        if (stream.sol()) {
          if (!state.lexical.hasOwnProperty('align')) {
            state.lexical.align = false
          }

          state.indented = stream.indentation()
        }

        if (stream.eatSpace()) {
          return null
        }

        let style = state.tokenize(stream, state)

        state.lastType = type
        return parseJS(state, style, type, content, stream)
      },

      indent: function (state, textAfter) {
        if (state.tokenize !== tokenBase) return 0
        let firstChar = textAfter && textAfter.charAt(0)
        let lexical = state.lexical

        let type = lexical.type
        let closing = firstChar === type

        if (type === 'form' && firstChar === '{') {
          return lexical.indented
        } else if (type === 'form') {
          return lexical.indented + indentUnit
        } else if (lexical.align) {
          return lexical.column + (closing ? 0 : 1)
        } else {
          return lexical.indented + (closing ? 0 : indentUnit)
        }
      },

      electricInput: /^\s*(?:case .*?:|default:|{|})$/,
      blockCommentStart: null,
      blockCommentEnd: null,
      lineComment: null,
      fold: 'brace',
      closeBrackets: '[]{}""',
      helperType: 'json',
      jsonMode: true
    }
  })

  CodeMirror.registerHelper('wordChars', 'javascript', /[\w$]/)

  CodeMirror.defineMIME('application/json', {name: 'javascript', json: true})
  CodeMirror.defineMIME('application/x-json', {name: 'javascript', json: true})
}
