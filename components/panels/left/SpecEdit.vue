<template lang="pug">
  div
    v-divider
    .pl-3.pr-3.pt-3.pb-3
      v-text-field(spellcheck="false" label="URL" v-model="url" solo single-line hide-details prepend-icon="link")
    v-divider
    div.mt-3.text-xs-center(v-if="!active")
      v-progress-circular(class="primary--text" indeterminate)
    div#cm-wrap(v-else)
      app-code-mirror#editor(@path="breadcrumbs = $event", @change="change", :code="spec", :options="editorOptions", @ready="editorReady")
      v-divider
      app-breadcrumbs(:items="breadcrumbs")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../../store/types'
  import focus from '../../directives/focus'
  import appBreadcrumbs from '../../elements/editor/Breadcrumbs'

  const appCodeMirror = process.OAX_FEATURE_EDITOR ? () => import('../../elements/editor/CodeMirror') : () => {}

  export default {
    directives: {
      focus
    },
    components: {
      appCodeMirror,
      appBreadcrumbs
    },
    props: ['value'],
    data () {
      let editorResolve
      const editor = new Promise((resolve) => { editorResolve = resolve })

      return {
        activated: false,
        breadcrumbs: [],
        formats: [{text: 'JSON', value: 1}, {text: 'YAML', value: 2}],
        scrollOnActive: false,
        format: 1,
        spec: null,
        editor: editor,
        editorResolve: editorResolve,
        editorResolved: false,
        editorOptions: {
          mode: {name: 'javascript', json: true},
          keyMap: 'sublime',
          tabSize: 2,
          lineNumbers: true,
          styleActiveLine: true,
          foldGutter: true,
          lint: {delay: 400},
          autoCloseBrackets: true,
          matchBrackets: true,
          showCursorWhenSelecting: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          foldOptions: {
            widget: '...'
          },
          extraKeys: {
            'F8': () => { this.fullScreen() }
          }
        }
      }
    },
    created () {
      if (this.SPEC_JSON) {
        this.spec = this.SPEC_JSON
        this.beginTime = Date.now()
      }
    },
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER,
        types.SPEC,
        types.SETTINGS_URL,
        types.SPEC_JSON,
        types.UI_EDIT_FOCUS
      ]),
      active () {
        return this.activated
      },
      url: {
        get () {
          return this.SETTINGS_URL
        },
        set (value) {
          this.SPEC_SET_LOAD_URL(value)
        }
      }
    },
    methods: {
      ...mapActions([
        types.SPEC_SET_LOAD_URL,
        types.SPEC_SET_EDIT_JSON
      ]),
      editorReady (editor) {
        setTimeout(() => {
          this.editorResolve(editor)
        }, Math.max(0, 200 - Date.now() + this.beginTime))
      },
      change ({changed, editor}) {
        if (changed.origin !== 'setValue') {
          // changed.removed may be big
          delete changed.removed

          if (this.timeout) {
            clearTimeout(this.timeout)
          }

          this.changes = this.changes || []
          this.changes.push(changed)

          this.timeout = setTimeout(() => {
            delete this.timeout
            this.SPEC_SET_EDIT_JSON({router: this.$router, change: this.changes, doc: editor.getValue()})
            delete this.changes
          }, 400)
        }
      },
      fullScreen (cancel = false) {
        this.editor.then(editor => {
          if (editor.getOption('fullScreen') || cancel) {
            const cmf = document.querySelectorAll('#cm-full > *')
            const cmw = document.querySelector('#cm-wrap')
            cmf.forEach(e => cmw.appendChild(e))
          } else {
            const cmf = document.querySelector('#cm-full')
            const cmw = document.querySelectorAll('#cm-wrap > *')
            cmw.forEach(e => cmf.appendChild(e))
          }

          if (!cancel) {
            editor.focus()
          }

          editor.setOption('fullScreen', cancel ? false : !editor.getOption('fullScreen'))
        })
      }
    },
    beforeDestroy () {
      this.fullScreen(true)
    },
    watch: {
      value: function (value) {
        if (value && !this.activated) {
          setTimeout(() => {
            if (this.value) {
              this.activated = true
            }
          }, 325)
        }
      },
      active: function (value) {
        if (!value) {
          this.fullScreen(true)
        }
      },
      SPEC_JSON: function () {
        this.spec = this.SPEC_JSON
        this.activated = false
        this.editor = new Promise((resolve) => { this.editorResolve = resolve })
      },
      UI_EDIT_FOCUS: function (value) {
        if (value === 'editor') {
          this.editor.then(editor => {
            editor.refresh()
            editor.focus()
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../assets/style/config/variables.styl'

  $margin-scroll := 48px + 80px + 24px + 1px

  >>> .input-group--solo .input-group__details
    display none

  >>> .CodeMirror
    height 'calc(100vh - %s)' % ($margin-scroll + 64px)

    @media $mobile-portrait
      height 'calc(100vh - %s)' % ($margin-scroll + 56px)

    @media $mobile-landscape
      height 'calc(100vh - %s)' % ($margin-scroll + 48px)
</style>
