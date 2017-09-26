<template lang="pug">
  div
    v-divider
    .pl-3.pr-3.pt-3.pb-3
      v-text-field(spellcheck="false" label="URL" v-model="url" solo single-line hide-details prepend-icon="link")
    v-divider
    div#cm-wrap
      app-code-mirror#editor(@path="breadcrumbs = $event", v-if="this.spec !== null", @change="change", :code="spec", :options="editorOptions", @ready="editorReady")
      v-divider
      app-breadcrumbs(:items="breadcrumbs")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'

  import focus from '../../directives/focus'
  import appCodeMirror from '../parts/CodeMirror'
  import appBreadcrumbs from '../parts/Breadcrumbs'

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
            'F8': () => {this.fullScreen()}
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
        return this.UI_LEFT_DRAWER && this.value
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
      change (changed) {
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
            this.SPEC_SET_EDIT_JSON(this.changes)
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
      active: function (value) {
        if (value) {
          setTimeout(() => {
            this.editor.then(editor => {
              editor.refresh()

              // TODO editor.scrollTo dows not work?
              if (this.scrollOnActive) {
                setTimeout(() => {
                  this.scrollOnActive = false
                  const scrollInfo = editor.getScrollInfo()
                  editor.scrollTo(scrollInfo.left, scrollInfo.top)
                }, 100)
              }
            })
          }, 50)
        } else {
          this.fullScreen(true)
        }
      },
      SPEC_JSON: function () {
        this.spec = this.SPEC_JSON
        this.scrollOnActive = !this.active
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
  @import '../../stylus/_variables'

  $margin-edit := 128px + 24px + 1px

  >>> .input-group--solo .input-group__details
    display none

  >>> .CodeMirror
    height 'calc(100vh - %s)' % ($margin-edit + $toolbar-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
      height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-portrait-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
      height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-landscape-height)
</style>
