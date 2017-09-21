<template lang="pug">
  div
    v-divider
    .pl-3.pr-3.pt-3.pb-3
      v-text-field(spellcheck="false" label="URL" v-model="url" solo single-line hide-details prepend-icon="link" v-focus.wait="UI_LEFT_DRAWER && value")
      //v-radio-group(v-model="format", :mandatory="true" hide-details)
        //v-layout.ma-0
          //v-radio.ma-0.pt-0.pb-0.ml-1(v-for="i in formats", :key="i.text", :label="i.text", :value="i.value", color="primary" hide-details)
    v-divider
    div#cm-wrap
      app-codemirror#editor(v-if="this.spec !== null", @change="change" v-model="spec", :options="editorOptions")
      //app-ace(v-if="this.spec !== null" editor-id="editor", :content="spec")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'

  import focus from '../../directives/focus'
  import appCodemirror from '../parts/CodeMirror'
  // import appAce from '../parts/Ace'

  export default {
    directives: {
      focus
    },
    components: {
      appCodemirror
      // appAce
    },
    props: ['value'],
    data () {
      return {
        formats: [{text: 'JSON', value: 1}, {text: 'YAML', value: 2}],
        format: 1,
        spec: null,
        editorOptions: {
          tabSize: 2,
          mode: {name: 'javascript', json: true},
          keyMap: 'sublime',
          lineNumbers: true,
          styleActiveLine: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          foldOptions: {
            widget: '...',
          },
          autoCloseBrackets: true,
          matchBrackets: true,
          showCursorWhenSelecting: true,
          extraKeys: {
              'Ctrl-Q': function (cm){cm.foldCode(cm.getCursor())},
              F10: this.fullScreen
            //            Esc: function (cm) {
            //              if (cm.getOption('fullScreen')) {
            //                document.querySelector('#cm-wrap').appendChild(document.querySelector('.CodeMirror'))
            //                cm.focus()
            //                cm.setOption('fullScreen', false)
            //              }
            //            }
          }
        }
      }
    },
    created () {
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
      // require('codemirror/addon/wrap/hardwrap')

      if (this.SPEC_JSON) {
        this.spec = this.SPEC_JSON
      }
    },
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER,
        types.SPEC,
        types.SETTINGS_URL,
        types.SPEC_JSON
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
          }, 200)
        }
      },
      fullScreen (cm) {
        cm = cm || document.querySelector('.CodeMirror').CodeMirror

        if (!cm.getOption('fullScreen')) {
          document.querySelector('#cm-full').appendChild(document.querySelector('.CodeMirror'))
        } else {
          document.querySelector('#cm-wrap').appendChild(document.querySelector('.CodeMirror'))
        }
        cm.focus()
        cm.setOption('fullScreen', !cm.getOption('fullScreen'))
      }
    },
    watch: {
      active: function (value) {
        if (value) {
          // document.querySelector('#cm-wrap .CodeMirror').CodeMirror.refresh()

          setTimeout(() => {
            document.querySelector('#cm-wrap .CodeMirror').CodeMirror.refresh()
          }, 20)
        }
      },
      SPEC_JSON: function () {
        this.spec = this.SPEC_JSON
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../stylus/_variables'

  //$margin-edit := 166px
  $margin-edit := 128px

  >>> .input-group--solo .input-group__details
    display none

  >>> .CodeMirror
    height 'calc(100vh - %s)' % ($margin-edit + $toolbar-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
      height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-portrait-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
      height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-landscape-height)
</style>
