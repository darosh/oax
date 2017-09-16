<!-- Based on https://github.com/surmon-china/vue-codemirror -->

<template>
  <textarea></textarea>
</template>

<script>
  window.CodeMirror = require('codemirror')
  require('codemirror/lib/codemirror.css')
  window.CodeMirror = window.CodeMirror.CodeMirror || window.CodeMirror
  export default {
    data: function () {
      return {
        content: ''
      }
    },
    props: {
      code: String,
      value: String,
      unseenLines: Array,
      marker: Function,
      loadtheme: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      debugger: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      options: {
        type: Object,
        required: true
      }
    },
    created: function () {
      if (this.options.lineNumbers === undefined) {
        this.options.lineNumbers = true
      }
      if (this.options.lineWrapping === undefined) {
        this.options.lineWrapping = false
      }
      if (this.options.mode === undefined) {
        this.options.mode = 'text/javascript'
      }

      const language = this.options.mode

      if (language === 'yaml') {
        require('codemirror/mode/yaml/yaml')
      } else {
        require('codemirror/mode/javascript/javascript')
      }
    },
    mounted: function () {
      const _this = this
      this.editor = (window.CodeMirror || window.CodeMirror.CodeMirror).fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.value || this.content)
      this.editor.on('change', function (cm, changeObj) {
        // _this.content = cm.getValue()

        if (_this.$emit) {
          _this.$emit('change', changeObj)
          // _this.$emit('change', _this.content)
          // _this.$emit('input', _this.content)
        }
      })

      const events = [
        'changes',
        'beforeChange',
        'cursorActivity',
        'keyHandled',
        'inputRead',
        'electricInput',
        'beforeSelectionChange',
        'viewportChange',
        'swapDoc',
        'gutterClick',
        'gutterContextMenu',
        'focus',
        'blur',
        'refresh',
        'optionChange',
        'scrollCursorIntoView',
        'update'
      ]
      for (var i = events.length - 1; i >= 0; i--) {
        (function (event) {
          _this.editor.on(event, function (a, b, c) {
            _this.$emit(event, a, b, c)
          })
        })(events[i])
      }
      this.$emit('ready', this.editor)
      this.unseenLineMarkers()

      // prevents funky dynamic rendering
      window.setTimeout(function () {
        _this.editor.refresh()
      }, 0)
    },
    beforeDestroy: function () {
      // garbage cleanup
      const element = this.editor.doc.cm.getWrapperElement()
      if (element && element.remove) {
        element.remove()
      }
    },
    watch: {
      options: {
        deep: true,
        handler (options, oldOptions) {
          var key
          for (key in options) {
            this.editor.setOption(key, options[key])
          }
        }
      },
      code: function (newVal, oldVal) {
        const editorValue = this.editor.getValue()
        if (newVal !== editorValue) {
          var scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
      value: function (newVal, oldVal) {
        const editorValue = this.editor.getValue()
        if (newVal !== editorValue) {
          var scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      }
    },
    methods: {
      refresh: function () {
        this.editor.refresh()
      },
      unseenLineMarkers: function () {
        var _this = this
        if (_this.unseenLines !== undefined && _this.marker !== undefined) {
          _this.unseenLines.forEach(line => {
            var info = _this.editor.lineInfo(line)
            _this.editor.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : _this.marker())
          })
        }
      }
    }
  }
</script>
