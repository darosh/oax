<template lang="pug">
  v-app(v-hotkey="keymap" , :class="classes", :dark="VIEW_DARK")
    app-drawer-left
    app-drawer-right
    app-toolbar
    main
      v-content
        nuxt
    v-dialog(max-width="300" v-model="log" hide-overlay persistent)
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
    //app-tour(v-if="UI_HIGHLIGHT")
    appFab
    v-snackbar(:value="APP_UPDATED" top :timeout="1e10") Update ready
      a.snackbar-action(@click="reload") Reload
    #cm-full
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../store/types'

  // import appTour from '../components/app/Tour.vue'
  import appToolbar from '../components/toolbars/Toolbar'

  export default {
    components: {
      appDrawerRight: () => import('../components/panels/DrawerRight'),
      appDrawerLeft: () => import('../components/panels/DrawerLeft'),
      // appToolbar: () => import('./components/app/Toolbar'),
      appToolbar,
      //      appDownloadDialog: () => import('./components/dialogs/DownloadDialog'),
      appFab: () => import('../components/parts/FAB'),
      appLog: () => import('../components/app/Log')
      // appTour
    },
    data () {
      return {
        log: false
      }
    },
    computed: {
      ...mapGetters([
        types.VIEW_DARK,
        types.VIEW_PATH,
        types.VIEW_SUMMARY,
        types.APP_API_PAGE,
        types.APP_HOME,
        types.APP_UPDATED,
        types.UI_LOG,
        types.UI_LOADING,
        types.UI_DIALOG,
        types.UI_DLG,
        types.UI_LEFT_DRAWER,
        types.UI_RIGHT_DRAWER,
        types.UI_ANIMATION,
        types.UI_HIGHLIGHT
      ]),
      keymap () {
        return {
          'esc': () => {
            if (this.UI_DLG) {
              this.UI_SET_DIALOG()
            } else if (!this.APP_API_PAGE) {
              this.$router.push(this.APP_HOME)
            } else if (this.UI_LEFT_DRAWER) {
              this.UI_SET_LEFT_DRAWER()
            } else if (this.UI_RIGHT_DRAWER) {
              this.UI_SET_DRAWER(false)
            } else {
              this.UI_SET_LEFT_DRAWER()
            }
          },
          'alt+v': () => (this.APP_API_PAGE ? this.VIEW_SET_VIEW() : ''),
          'alt+w': () => (this.VIEW_SET_WIDE()),
          'alt+s': () => {
            if (this.APP_API_PAGE) {
              let p = ((this.VIEW_SUMMARY * 2 + this.VIEW_PATH * 1) + 1) % 4
              p = !p ? 1 : p
              this.VIEW_SET_PATH(!!(p & 1))
              this.VIEW_SET_SUMMARY(!!(p & 2))
            }
          },
          'alt+l': () => (this.log = !this.log),
          'alt+h': () => (this.$router.push('/about')),
          'alt+t': () => (this.VIEW_SET_DARK()),
          'alt+o': () => {
            if (this.APP_API_PAGE) {
              this.SPEC_SET_NEXT_OPERATION()
            }
          },
          'alt+i': () => {
            if (this.APP_API_PAGE) {
              this.SPEC_SET_PREV_OPERATION()
            }
          },
          'shift+tab': (e) => {
            e.preventDefault()
            this.UI_SET_NEXT_TAB()
          },
          'F8': () => {
            if (!this.APP_API_PAGE) {
              this.UI_SET_ANIMATION(false)
            }

            this.UI_SET_EDIT_FOCUS(null)

            setTimeout(() => {
              if (!this.APP_API_PAGE) {
                this.$router.push(this.APP_HOME)
              }

              this.UI_SET_LEFT_TAB('tab-edit')
              this.UI_SET_LEFT_DRAWER(true)

              setTimeout(() => {
                this.UI_SET_EDIT_FOCUS('editor')
                this.UI_SET_ANIMATION(true)
              }, 0)
            }, 0)
          }
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
        types.VIEW_SET_VIEW,
        types.VIEW_SET_SUMMARY,
        types.VIEW_SET_PATH,
        types.VIEW_SET_WIDE,
        types.UI_SET_DIALOG,
        types.UI_SET_LEFT_DRAWER,
        types.SPEC_SET_NEXT_OPERATION,
        types.SPEC_SET_PREV_OPERATION,
        types.UI_SET_DRAWER,
        types.VIEW_SET_DARK,
        types.UI_SET_LEFT_TAB,
        types.UI_SET_EDIT_FOCUS,
        types.UI_SET_NEXT_TAB,
        types.UI_SET_ANIMATION
      ]),
      reload () {
        window.location.reload()
      }
    }
  }
</script>

<style lang="stylus">
  /*@import './stylus/index.styl'*/

  .snackbar-action
    font-family: 'Roboto Medium'
    text-transform: uppercase
    cursor: pointer
</style>
