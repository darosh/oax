<template lang="pug">
  v-navigation-drawer.pb-0(style="overflow: hidden" persistent v-model="menu", :mobile-break-point="1200", :enable-resize-watcher="true", :disable-route-watcher="true", :touchless="true")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="SET_MENU(false)")
        v-icon close
      v-toolbar-title Specification
    //v-divider
    v-tabs.app--tabs(:scrollable="false" grow v-model="tab")
      v-tabs-bar.transparent
        v-tabs-item.relative(ripple href="tab-json") Edit
        v-tabs-item.relative(ripple href="tab-dir") Directory
        v-tabs-item.relative(ripple href="tab-recent") Recent
        v-tabs-item.relative(ripple href="tab-test") Test
        v-tabs-slider
      v-tabs-items
        v-tabs-content#tab-json
          v-divider
          .pl-3.pr-3.pt-3.pb-3
            v-text-field(label="URL" v-model="url" solo single-line hide-details prepend-icon="link" v-focus.wait="MENU && (tab === 'tab-json')")
            v-radio-group(v-model="format", :mandatory="true" hide-details)
              v-layout.ma-0
                v-radio.ma-0.pt-0.pb-0.ml-1(v-for="i in formats", :key="i.text", :label="i.text", :value="i.value", color="primary" hide-details)

          v-divider
          codemirror(v-model="spec", :options="editorOptions")
            <!--v-text-field(v-model="spec", :label="format === 1 ? 'JSON' : 'YAML'" multi-line :rows="7" textarea)-->
        v-tabs-content#tab-dir
          v-divider
          v-layout.pt-3.pb-3.pl-3.pr-3.ma-0.elevation-2.relative
            v-text-field(v-hotkey="{'':''}" solo label="Search" v-model="filter" hide-details single-line prepend-icon="search" v-focus.wait="MENU && (tab === 'tab-dir')")
          v-list.pa-0(two-line v-if="APIS")
            virtual-scroller.scroller(:items="filtered()", item-height="73" prerender="20", key-field="key")
              template(scope="props")
                div(:key="props.itemKey")
                  v-list-tile(avatar @click="url = props.item.url", :href="'#/?url=' + encodeURIComponent(props.item.url)")
                    v-list-tile-avatar
                      .icon.white--text(:style="'background-color: ' + getColor({shades: ['400', '300'], text: props.item.key.split(':')[0]})") {{(props.item.key.split(':')[1] || props.item.key.split(':')[0])[0].toUpperCase()}}
                    v-list-tile-content
                      v-list-tile-title {{props.item.title}}
                      v-list-tile-sub-title {{props.item.key}}
                  v-divider
        v-tabs-content#tab-recent
          v-divider
          v-list.pa-0(two-line)
            virtual-scroller.scroller-recent(:items="RECENT", item-height="73" prerender="20" key-field="url")
              template(scope="props")
                div(:key="props.itemKey")
                  v-list-tile(avatar @click="url = props.item.url", :href="'#/?url=' + encodeURIComponent(props.item.url)")
                    v-list-tile-avatar
                      .icon.white--text(v-if="key(props.item)", :style="'background-color: ' + getColor({shades: ['400', '300'], text: key(props.item).split(':')[0]})") {{(key(props.item).split(':')[1] || key(props.item).split(':')[0])[0].toUpperCase()}}
                      v-icon(v-else class="secondary white--text") link
                    v-list-tile-content
                      v-list-tile-title {{props.item.title}}
                      v-list-tile-sub-title {{key(props.item)}}
                    v-list-tile-action
                      v-btn(icon ripple @click.capture.stop.prevent="RECENT_REMOVE(props.item)")
                        v-icon close
                  v-divider
        v-tabs-content#tab-test
          v-divider
          v-list.pa-0(two-line)
            virtual-scroller.scroller-recent(:items="test", item-height="73" prerender="20" key-field="url")
              template(scope="props")
                div(:key="props.itemKey")
                  v-list-tile(avatar @click="url = props.item.url", :href="'#/?url=' + encodeURIComponent(props.item.url)")
                    v-list-tile-avatar(v-if="key(props.item)")
                      .icon.white--text(:style="'background-color: ' + getColor({shades: ['400', '300'], text: key(props.item).split(':')[0]})") {{(key(props.item).split(':')[1] || key(props.item).split(':')[0])[0].toUpperCase()}}
                    v-list-tile-avatar(v-else)
                      v-icon(class="secondary white--text") link
                    v-list-tile-content
                      v-list-tile-title {{props.item.note}}
                      v-list-tile-sub-title {{props.item.title}}
                  v-divider
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as types from '../../store/types'
  import VNavigationDrawer from './VNavigationDrawer'
  import { getColor } from 'random-material-color'
  import Vue from 'vue'
  import CircularJSON from 'circular-json'
  import test from './../../services/test'

  import focus from '../../directives/focus'

  import codemirror from '../CodeMirror'

  console.log(codemirror)

//  const codemirror = require('vue-codemirror').codemirror

  // custom new mode
  //  CodeMirror.defineMode('mymode', () => {
  // your mode code...
  //  })

  //  require('codemirror/addon/selection/active-line.js')

  //  require('codemirror/addon/fold/foldgutter.css')
  //  require('codemirror/addon/fold/brace-fold.js')
  //  require('codemirror/addon/fold/comment-fold.js')
  //  require('codemirror/addon/fold/foldcode.js')
  //  require('codemirror/addon/fold/foldgutter.js')
  //  require('codemirror/addon/fold/indent-fold.js')
  //  require('codemirror/addon/fold/markdown-fold.js')
  //  require('codemirror/addon/fold/xml-fold.js')

  //  require('codemirror/addon/display/fullscreen.css')
  //  require('codemirror/addon/display/fullscreen.js')

  export default {
    directives: {
      focus
    },
    components: {
      codemirror,
      VNavigationDrawer
    },
    data () {
      return {
        tab: 'tab-json',
        filter: null,
        formats: [{text: 'JSON', value: 1}, {text: 'YAML', value: 2}],
        format: 1,
        spec: '',
        keys: {},
        apis: false,
        test,
        editorOptions: {
          tabSize: 2,
          //          fullScreen: true,
          mode: { name: 'javascript', json: true },
          // mode: {
          //   ext: 'json'
          // },
          //          theme: 'default',
          lineNumbers: true,
          line: false
          // keyMap: 'sublime',
          // extraKeys: {'Ctrl': 'autocomplete'},
          // foldGutter: false,
          // gutters: ['CodeMirror-foldgutter']
        }
      }
    },
    created () {
      this.LOAD_APIS()
      // this.spec = CircularJSON.stringify(this.SPEC || '', null, 2).substr(0, 3000)
      this.spec = CircularJSON.stringify(this.SPEC || '', null, 2)
    },
    computed: {
      ...mapGetters([
        types.MENU,
        types.SPEC,
        types.IS_API,
        types.URL,
        types.APIS,
        types.PROXY,
        types.IS_DARK,
        types.RECENT
      ]),
      menu: {
        get () { return this.MENU && this.IS_API },
        set (value) {
          this.SET_MENU(!!value)
        }
      },
      url: {
        get () {
          return this.URL
        },
        set (value) {
          this.LOAD_URL(value)
        }
      },
      proxy: {
        get () {
          return this.PROXY
        },
        set (value) {
          this.SET_PROXY(value)
        }
      },
      dark: {
        get () {
          return this.IS_DARK
        },
        set (value) {
          if (value !== this.IS_DARK) {
            this.TOGGLE_DARK()
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_MENU,
        types.SET_PROXY,
        types.TOGGLE_DARK,
        types.RECENT_REMOVE
      ]),
      ...mapActions([
        types.LOAD_URL,
        types.LOAD_APIS
      ]),
      encodeURIComponent,
      getColor,
      filtered () {
        if (!this.filter) {
          return this.APIS
        } else {
          const f = this.filter.toLowerCase()
          return this.APIS.filter(item => {
            return item.key.toLowerCase().indexOf(f) > -1 || item.title.toLowerCase().indexOf(f) > -1
          })
        }
      },
      key (item) {
        if (this.keys[item.url]) {
          return this.keys[item.url]
        } else {
          const val = !this.APIS ? '?' : ((this.APIS.filter(v => v.url === item.url)[0] || {}).key || '')
          Vue.set(this.keys, item.url, val)

          return this.keys[item.url]
        }
      }
    },
    watch: {
      SPEC: function (value) {
        this.spec = CircularJSON.stringify(value || '', null, 2)
      },
      APIS: function () {
        if (this.apis) {
          return
        }

        this.apis = true
        //        const link = document.createElement('a')

        for (const k in this.keys) {
          if (this.keys[k] === '?') {
            this.keys[k] = (this.APIS.filter(v => v.url === k)[0] || {}).key
            /* || (link.setAttribute('href', k), link.hostname) */
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../stylus/_variables'

  $margin-scroll := 127px
  $margin-edit := 166px
  $margin-recent := 49px

  .scroller
    height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-portrait-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-landscape-height)

  >>> .input-group--solo .input-group__details
        display none

  >>> .CodeMirror
        height 'calc(100vh - %s)' % ($margin-edit + $toolbar-height)

        @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
          height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-portrait-height)

        @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
          height 'calc(100vh - %s)' % ($margin-edit + $toolbar-mobile-landscape-height)

  >>> .scroller-recent
        height 'calc(100vh - %s)' % ($margin-recent + $toolbar-height)

        @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
          height 'calc(100vh - %s)' % ($margin-recent + $toolbar-mobile-portrait-height)

        @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
          height 'calc(100vh - %s)' % ($margin-recent + $toolbar-mobile-landscape-height)
</style>
