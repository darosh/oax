<template lang="pug">
  v-container.pa-0-sm-nl.gpu(v-once style="width: 100%; max-width: 100%")
    v-layout.ma-3-md
      v-spacer.hidden-xs-only
      v-flex(style="max-width: 80em")
        v-card.pa-4.mb-1
          .pt-3.hidden-xs-only
          h3.pb-3.ma-0.display-2 OpenAPI Specification Explorer
          .pb-3.hidden-xs-only
          v-divider
          v-layout.mt-3.mb-3
            v-flex
              .subheading.pt-2 Version {{APP_VERSION}}
                =" "
                span.nowrap ({{APP_BUILD.toLocaleString()}})
            v-spacer
            v-btn.ma-0(flat @click="reload") Update
          v-divider.mb-3
          div#shortcuts.hidden-xs-only
            h4.display-1.mb-3 Keyboard shortcuts

            h5.headline.mb-3 Key color legend

            span.keyboard.mb-4(style="display: inline-block")
              span.key.key-primary Single
              span.key.key-success Alt
              span.key.key-warning Shift
              span.key.key-error Ctrl

            h5.headline.mb-3#application-shortcuts Application shortcuts
            app-keyboard(:shortcuts="appKeys").mb-4

            div(style="float: left").mr-4
              h6.title.mb-3 Application
              table.table-stripes.mb-4
                tbody
                  tr(v-for="(notes, key) in keys.app.Application", :key="key")
                    td.keys.nowrap
                      span(v-for="(k, i) in key.split('+')")
                        span(v-if="i") +
                        .key(:class="classes[k]") {{k}}
                    td.pl-3(v-if="!Array.isArray(notes)") {{notes}}
                    td.pl-3(v-else) one of:
                      ul.unordered-list
                        li(v-for="n in notes") {{n}}

            div
              h6.title.mb-3 API
              table.table-stripes.mb-4
                tbody
                  tr(v-for="(notes, key) in keys.app.API", :key="key")
                    td.keys.nowrap
                      span(v-for="(k, i) in key.split('+')")
                        span(v-if="i") +
                        .key(:class="classes[k]") {{k}}
                    td.pl-3 {{notes}}

            h5.headline.mb-3#editor-shortcuts(style="clear: both") Editor shortcuts

            p Editor shortcuts should be identical to <a href="https://codemirror.net/demo/sublime.html" target="_blank" rel="noopener">CodeMirror Sublime keymap</a> except some extra keys.

            template(v-for="(section, sectionKey) in keys.editor")
              h6.title.mb-3(style="clear: both") {{sectionKey}}
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
          h4.display-1.mb-3#acknowledgement Acknowledgement
          p This app wouldn be posssible without following packages, services and OpenAPI specification directories
          h5.headline.mb-3 Packages
          p
            span(v-for="(i, k) in libs", :key="k")
              span(v-if="k") ,
                =" "
              a.subheading.nowrap(:href="i.href" target="_blank" rel="noopener") {{i.name}}
              | &nbsp;{{i.version}}
          h5.headline.mb-3 Services
          p
            ul.unordered-list
              li(v-for="(i, k) in services", :key="k")
                a(:href="i.home" target="_blank" rel="noopener") {{i.title}}
          h5.headline.mb-3 Directories
          p
            ul.unordered-list
              li(v-for="(i, k) in directories", :key="k")
                a(:href="i.home" target="_blank" rel="noopener") {{i.title}}
                =" "
                | &mdash;
                =" "
                | {{i.subTitle}}
      v-spacer.hidden-xs-only
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'
  import dependencies from '../assets/data/dependencies.json'
  import appKeyboard from '../components/elements/misc/Keyboard'
  import keys from '../assets/data/keys.json'
  import * as directories from '../assets/scripts/services/directory'
  import services from '../assets/data/services.json'

  export default {
    components: {
      appKeyboard
    },
    mounted () {
      if (this.$route.hash) {
        Vue.nextTick(() => {
          document.querySelector(this.$route.hash).scrollIntoView()
        })
      }
    },
    data () {
      const editorKeys = {}
      Object.keys(keys.editor).forEach(k => Object.assign(editorKeys, keys.editor[k]))

      const editorActions = {}

      Object.keys(editorKeys)
        .forEach(k => (editorActions[k] = editorKeys[k].replace(/([a-z])([A-Z])/g, '$1 $2')
          .toLowerCase()
          .replace(/^del /, 'delete ')))

      return {
        keys,
        directories,
        services,
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
        types.APP_BUILD,
        types.UI_LOG,
        types.UI_LOADING
      ])
    },
    methods: {
      reload () {
        if (window.OAX && window.OAX.registration && window.OAX.registration.update) {
          window.OAX.registration.update()
        } else {
          location.reload(true)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/style/app/table-stripes.styl"
</style>
