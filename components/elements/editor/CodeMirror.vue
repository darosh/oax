<!-- Based on https://github.com/surmon-china/vue-codemirror -->

<template>
  <textarea></textarea>
</template>

<script>
  import codeMirror from '../../../assets/scripts/services/codemirror'
  import jsonPath from '../../../assets/scripts/utils/codemirror-json-path'

  export default {
    props: {
      code: String,
      options: {
        type: Object,
        required: true
      }
    },
    created: function () {
      if (this.options.mode === undefined) {
        this.options.mode = 'text/javascript'
      }
    },
    mounted: function () {
      const _this = this
      const CodeMirror = codeMirror()
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || '')

      this.editor.on('change', function (editor, changed) {
        if (_this.$emit) {
          _this.$emit('change', {editor, changed})
        }
      })

      this.editor.on('cursorActivity', function (editor) {
        if (_this.cursorActivityTimeout) {
          clearTimeout(_this.cursorActivityTimeout)
        }

        _this.cursorActivityTimeout = setTimeout(() => {
          _this.cursorActivityTimeout = null
          const parent = jsonPath(editor)

          //          if(!editor.$panelNode) {
          //            editor.$panelNode  = document.createElement("div")
          //            editor.$panelNode.className = "panel"
          //            editor.addPanel(editor.$panelNode, {position: 'bottom', stable: false});
          //          }

          //          editor.$panelNode.textContent = parent.join(' > ')

          _this.$emit('path', parent)
        }, 200)
      })

      //      const events = [
      //        'changes',
      //        'beforeChange',
      //        'cursorActivity',
      //        'keyHandled',
      //        'inputRead',
      //        'electricInput',
      //        'beforeSelectionChange',
      //        'viewportChange',
      //        'swapDoc',
      //        'gutterClick',
      //        'gutterContextMenu',
      //        'focus',
      //        'blur',
      //        'refresh',
      //        'optionChange',
      //        'scrollCursorIntoView',
      //        'update'
      //      ]
      //
      //      for (let i = events.length - 1; i >= 0; i--) {
      //        (function (event) {
      //          _this.editor.on(event, function (a, b, c) {
      //            _this.$emit(event, a, b, c)
      //          })
      //        })(events[i])
      //      }

      this.$emit('ready', this.editor)

      // prevents funky dynamic rendering
      //      window.setTimeout(function () {
      //        _this.editor.refresh()
      //      }, 0)
    },
    beforeDestroy: function () {
      // garbage cleanup
      const element = this.editor.doc.cm.getWrapperElement()

      if (element && element.remove) {
        element.remove()
      }
    },
    watch: {
      //      options: {
      //        deep: true,
      //        handler (options) {
      //          for (const key in options) {
      //            if (options.hasOwnProperty(key)) {
      //              this.editor.setOption(key, options[key])
      //            }
      //          }
      //        }
      //      },
      code: function (newVal) {
        //        this.editor.scrollIntoView({line: 0, ch: 0})
        this.editor.setValue(newVal)
        this.editor.refresh()
      }
    }
  }
</script>

<style lang="stylus">
  .panel
    height: 48px
    padding: 12px
</style>
