<template lang="pug">
  v-app(v-resize="resized", :class="classes" v-hotkey="keymap", :dark="VIEW_DARK")
    div(style="font-size: 4px; position: absolute; top: 0; font-family: 'Roboto Mono'; font-weight: bold;") :-)
    app-menu
    app-drawer
    app-toolbar
    main
      <!--v-bottom-nav.white(:value="true")-->
      <!--v-btn(flat class="teal&#45;&#45;text")-->
      //span  Description
      //v-icon description
      <!--v-btn(flat class="teal&#45;&#45;text")-->
      //span  Info
      //v-icon info
      <!--v-btn(flat class="teal&#45;&#45;text")-->
      //span  Operations
      //v-icon list
      router-view
    // app-download-dialog
    v-dialog(width="300" v-model="log" hide-overlay persistent)
      v-card
        v-toolbar.transparent.elevation-0
          v-toolbar-title Log
          v-spacer
          v-btn(icon flat @click="log = !log")
            v-icon close
        v-divider
        v-card-text(style="padding-right: 26px;")
          app-log(style="margin-bottom: 24px", v-if="UI_LOADING", :items="UI_LOADING", :log="true")
          app-log(style="margin-bottom: 24px", v-else :items="UI_LOG", :log="true")
    //app-tour
    #cm-full
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from './store/types'

  import appTour from './components/Tour.vue'

  export default {
    //    directives: {
    //      hotkey
    //    },
    components: {
      appDrawer: () => import('./components/panels/DrawerRight'),
      appMenu: () => import('./components/panels/DrawerLeft'),
      appToolbar: () => import('./components/Toolbar'),
      //      appDownloadDialog: () => import('./components/dialogs/DownloadDialog'),
      appLog: () => import('./components/Log'),
      appTour
    },
    data () {
      return {
        log: false
      }
    },
    created () {
      this.resized()
    },
    computed: {
      ...mapGetters([
        types.VIEW_DARK,
        types.UI_LOG,
        types.UI_LOADING,
        types.UI_ANIMATION
      ]),
      keymap () {
        return {
          'esc': () => (this.log = !this.log),
          'alt+q': () => (this.UI_SET_LEFT_DRAWER())
        }
      },
      classes () {
        return {
          'no-animation': !this.UI_ANIMATION
        }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_WIDTH,
        types.UI_SET_LEFT_DRAWER
      ]),
      resized () {
        this.UI_SET_WIDTH(window.innerWidth)
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/index'
</style>
