<template lang="pug">
  v-container(v-once fluid style="max-width: 80em")
    v-layout.gpu.ma-3-md
      v-spacer.hidden-xs-only
      v-flex
        v-card.pa-4.mb-1
          .pt-3.hidden-xs-only
          h3.pb-3.ma-0 OpenAPI Specification Explorer
          .pb-3.hidden-xs-only
          v-divider
          v-layout.mt-3.mb-3
            v-flex
              .subheading.pt-2 Version {{APP_VERSION}}
            v-spacer
            v-btn.ma-0(flat @click="reload") Reload
          v-divider.mb-3
          div.hidden-xs-only
            h4 Keyboard shortcuts

            h5 Key color legend

            span.keyboard.mb-4(style="display: inline-block")
              span.key.key-primary Single
              span.key.key-success Alt
              span.key.key-warning Shift
              span.key.key-error Ctrl

            h5 Application shortcuts
            app-keyboard(:shortcuts="appKeys").mb-4

            div(style="float: left").mr-4
              h6 Application
              table.table-stripes.mb-4
                tbody
                  tr(v-for="(notes, key) in keys.app.Application", :key="key")
                    td.keys.nowrap
                      span(v-for="(k, i) in key.split('+')")
                        span(v-if="i") +
                        .key(:class="classes[k]") {{k}}
                    td.pl-3(v-if="!Array.isArray(notes)") {{notes}}
                    td.pl-3(v-else) one of:
                      ul
                        li(v-for="n in notes") {{n}}

            div
              h6 API
              table.table-stripes.mb-4
                tbody
                  tr(v-for="(notes, key) in keys.app.API", :key="key")
                    td.keys.nowrap
                      span(v-for="(k, i) in key.split('+')")
                        span(v-if="i") +
                        .key(:class="classes[k]") {{k}}
                    td.pl-3 {{notes}}

            h5(style="clear: both") Editor shortcuts

            p Editor shortcuts should be identical to <a href="https://codemirror.net/demo/sublime.html" target="_blank">CodeMirror Sublime keymap</a> except some extra keys.

            template(v-for="(section, sectionKey) in keys.editor")
              h6(style="clear: both") {{sectionKey}}
              app-keyboard(:shortcuts="section" style="float:left").mb-4.mr-4
              table.table-stripes.mb-4
                tbody
                  tr(v-for="(notes, key) in section", :key="key")
                    td.keys.nowrap
                      span(v-for="(k, i) in key.split(' ')")
                        span(v-for="(l, j) in k.split('+')")
                          span(v-if="j") +
                          .key(:class="classes[l]") {{l}}
                    td.pl-3 {{editorActions[key]}}

            v-divider.mb-3
          h4 Acknowledgement
          p This app wouldn be posssible without following packages
          span(v-for="(i, k) in libs", :key="k")
            span(v-if="k") ,
              =" "
            a.subheading.nowrap(:href="i.href" target="_blank") {{i.name}}
            | &nbsp;{{i.version}}
      v-spacer.hidden-xs-only
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import appLog from '../app/Log'
  import dependencies from '../../assets/dependencies.json'
  import appKeyboard from '../parts/Keyboard'
  import keys from '../../assets/keys.json'

  export default {
    components: {
      appLog,
      appKeyboard
    },
    data () {
      const editorKeys = {}
      Object.keys(keys.editor).forEach(k => Object.assign(editorKeys, keys.editor[k]))

      const editorActions = {}

      Object.keys(editorKeys).forEach(k => editorActions[k] = editorKeys[k].replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().replace(/^del /, 'delete '))

      return {
        keys,
        appKeys: {...keys.app.Application, ...keys.app.API},
        editorKeys,
        editorActions,
        classes: {
          Alt: 'key-success',
          Ctrl: 'key-error',
          Shift: 'key-warning'
        },
        libs: Object.keys(dependencies).filter(i => i[0] !== '@').map(i => ({
          name: i,
          version: dependencies[i].indexOf('github:') === 0 ? '' : dependencies[i][0] === '^' ? dependencies[i].substr(
            1) : dependencies[i],
          href: dependencies[i].indexOf('github:') === 0
            ? 'https://github.com/' + dependencies[i].substr(7)
            : ('https://www.npmjs.com/package/' + i)
        }))
      }
    },
    computed: {
      ...mapGetters([
        types.APP_VERSION,
        types.UI_LOG,
        types.UI_LOADING
      ])
    },
    methods: {
      reload () {
        location.reload()
      }
    }
  }
</script>
