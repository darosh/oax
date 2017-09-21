<!-- Based on https://github.com/surmon-china/vue-codemirror -->

<template>
  <textarea></textarea>
</template>

<script>
  import codeMirror from '../../services/codemirror'

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
    },
    mounted: function () {
      const _this = this
      const CodeMirror = codeMirror()
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.value || this.content)

      this.editor.on('change', function (cm, changeObj) {
        if (_this.$emit) {
          _this.$emit('change', changeObj)
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

      for (let i = events.length - 1; i >= 0; i--) {
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
        handler (options) {
          for (const key in options) {
            if(options.hasOwnProperty(key)) {
              this.editor.setOption(key, options[key])
            }
          }
        }
      },
      code: function (newVal) {
        const editorValue = this.editor.getValue()
        if (newVal !== editorValue) {
          const scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
      value: function (newVal) {
        const editorValue = this.editor.getValue()
        if (newVal !== editorValue) {
          const scrollInfo = this.editor.getScrollInfo()
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
        const _this = this
        if (_this.unseenLines !== undefined && _this.marker !== undefined) {
          _this.unseenLines.forEach(line => {
            const info = _this.editor.lineInfo(line)
            _this.editor.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : _this.marker())
          })
        }
      }
    }
  }
</script>
