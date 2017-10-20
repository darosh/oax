module.exports = function codeMirror () {
  if (window.CodeMirror) {
    return window.CodeMirror
  }

  const modeJson = require('../utils/codemirror-mode-json').modeJson
  const lintJson = require('./codemirror-lint-json').lintJson

  window.CodeMirror = require('codemirror')
  window.CodeMirror = window.CodeMirror.CodeMirror || window.CodeMirror

  require('codemirror/lib/codemirror.css')
  require('codemirror/addon/dialog/dialog.css')
  require('codemirror/addon/dialog/dialog.js')
  require('codemirror/addon/display/fullscreen.css')
  require('codemirror/addon/display/fullscreen.js')
  require('codemirror/addon/edit/closebrackets')
  require('codemirror/addon/edit/matchbrackets')
  require('codemirror/addon/fold/brace-fold')
  require('codemirror/addon/fold/foldcode')
  require('codemirror/addon/fold/foldgutter.css')
  require('codemirror/addon/fold/foldgutter.js')
  require('codemirror/addon/lint/lint.css')
  require('codemirror/addon/lint/lint.js')
  require('codemirror/addon/scroll/annotatescrollbar')
  require('codemirror/addon/search/matchesonscrollbar.css')
  require('codemirror/addon/search/matchesonscrollbar.js')
  require('codemirror/addon/search/search')
  require('codemirror/addon/search/searchcursor')
  require('codemirror/addon/selection/active-line')
  require('codemirror/keymap/sublime')

  modeJson(window.CodeMirror)
  lintJson(window.CodeMirror)

  return window.CodeMirror
}
