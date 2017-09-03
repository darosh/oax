<template lang="pug">
  div
    v-divider
    .pl-3.pr-3.pt-3.pb-3
      v-text-field(label="URL" v-model="url" solo single-line hide-details prepend-icon="link" v-focus.wait="MENU && value")
      v-radio-group(v-model="format", :mandatory="true" hide-details)
        v-layout.ma-0
          v-radio.ma-0.pt-0.pb-0.ml-1(v-for="i in formats", :key="i.text", :label="i.text", :value="i.value", color="primary" hide-details)

    v-divider
    div#cm-wrap
      codemirror#editor(v-if="this.spec !== null", @change="change" v-model="spec", :options="editorOptions")
      <!--v-text-field(v-model="spec", :label="format === 1 ? 'JSON' : 'YAML'" multi-line :rows="7" textarea)-->
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as types from '../../store/types'

  import focus from '../../directives/focus'
  import codemirror from '../CodeMirror'

  require('codemirror/addon/display/fullscreen.css')
  require('codemirror/addon/display/fullscreen.js')

  export default {
    directives: {
      focus
    },
    components: {
      codemirror
    },
    props: ['value'],
    data () {
      return {
        formats: [{text: 'JSON', value: 1}, {text: 'YAML', value: 2}],
        format: 1,
        spec: null,
        keys: {},
        editorOptions: {
          tabSize: 2,
          mode: {name: 'javascript', json: true},
          lineNumbers: true,
          line: false,
          extraKeys: {
            F10: function (cm) {
              if (!cm.getOption('fullScreen')) {
                document.body.appendChild(document.querySelector('.CodeMirror'))
              } else {
                document.querySelector('#cm-wrap').appendChild(document.querySelector('.CodeMirror'))
              }
              cm.focus()
              cm.setOption('fullScreen', !cm.getOption('fullScreen'))
            },
            Esc: function (cm) {
              if (cm.getOption('fullScreen')) {
                document.querySelector('#cm-wrap').appendChild(document.querySelector('.CodeMirror'))
                cm.focus()
                cm.setOption('fullScreen', false)
              }
            }
          }
        }
      }
    },
    created () {
      if (this.JSON) {
        this.spec = this.JSON
      }
    },
    computed: {
      ...mapGetters([
        types.MENU,
        types.SPEC,
        types.IS_API,
        types.URL,
        types.APIS,
        types.JSON
      ]),
      active () {
        return this.MENU && this.value
      },
      url: {
        get () {
          return this.URL
        },
        set (value) {
          this.LOAD_URL(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_MENU,
        types.SET_PROXY
      ]),
      ...mapActions([
        types.LOAD_URL,
        types.EDIT_JSON
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
            this.EDIT_JSON(this.changes)
            delete this.changes
          }, 250)
        }
      }
    },
    watch: {
      active: function (value) {
        if (value) {
          document.querySelector('#cm-wrap .CodeMirror').CodeMirror.refresh()
        }
      },
      JSON: function () {
        this.spec = this.JSON
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../stylus/_variables'

  $margin-edit := 166px

  >>> .input-group--solo .input-group__details
    display none

  >>> .CodeMirror
    height 'calc(100vh - %s)' % ($margin-edit + $toolbar-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
      height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-portrait-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
      height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-landscape-height)
</style>
