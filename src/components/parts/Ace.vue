<!--based on https://jsfiddle.net/bc_rikko/gbpw2q9x/3/-->
<!-- TODO: unused experiment, depends on brace, it could reuse swagger editor auto completion -->

<template>
  <div :id="editorId" style="width: 100%"></div>
</template>

<script>
  const ace = require('brace')
  require('brace/mode/json')
  require('brace/ext/searchbox')
  require('brace/ext/language_tools')

  export  default {
    template: '',
    props: ['editorId', 'content', 'lang', 'theme'],
    data () {
      return {
        editor: Object,
        beforeContent: ''
      }
    },
    watch: {
      'content' (value) {
        if (this.beforeContent !== value) {
          this.editor.setValue(value, 1)
        }
      }
    },
    mounted () {
      const lang = this.lang || 'json'
      // const theme = this.theme || 'github'

      ace.acequire('ace/ext/language_tools')
      this.editor = ace.edit(this.editorId)

      console.log(this.editor)

      this.editor.$blockScrolling = true
      this.editor.setValue(this.content, 1)

      // mode-xxx.js or theme-xxx.js
      this.editor.getSession().setMode(`ace/mode/${lang}`)
      // this.editor.setTheme(`ace/theme/${theme}`)

      this.editor.on('change', (c) => {
        console.log(c)
        this.beforeContent = this.editor.getValue()
        this.$emit('change-content', this.editor.getValue())
      })
    }
  }
</script>
