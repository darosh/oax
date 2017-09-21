export default function codeMirror () {
  if (window.CodeMirror) {
    return window.CodeMirror
  }

  window.CodeMirror = require('codemirror')
  require('codemirror/lib/codemirror.css')
  window.CodeMirror = window.CodeMirror.CodeMirror || window.CodeMirror

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
  require('codemirror/addon/scroll/annotatescrollbar')
  require('codemirror/addon/search/matchesonscrollbar.css')
  require('codemirror/addon/search/matchesonscrollbar.js')
  require('codemirror/addon/search/search')
  require('codemirror/addon/search/searchcursor')
  require('codemirror/addon/selection/active-line')
  require('codemirror/keymap/sublime')
  require('codemirror/mode/javascript/javascript')

  // require('codemirror/mode/yaml/yaml')
  // require('codemirror/addon/wrap/hardwrap')

  return window.CodeMirror
}
