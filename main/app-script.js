import { mapGetters, mapMutations } from 'vuex'
import * as types from '../store/types'

import Vue from 'vue'
import layout from '../components/mixins/layout'
import appToolbar from '../components/toolbars/Toolbar'
import appDetail from '../components/panels/right/Detail'
// import appTour from '../components/elements/misc/Tour.vue'

export default {
  mixins: [layout],
  components: {
    appToolbar,
    appDetail,
    // appTour,
    appFab: () => import('../components/elements/misc/FAB'),
    appLogDialog: () => import('../components/dialogs/LogDialog')
  },
  data () {
    return {
      log: false,
      opened: false,
      showSlider: true,
      openedRight: false,
      leftOpening: false,
      leftClosing: false,
      rightOpening: false,
      rightClosing: false
    }
  },
  computed: {
    ...mapGetters([
      types.APP_API_PAGE,
      types.APP_HOME,
      types.APP_UPDATED,
      types.UI_ANIMATION,
      types.UI_DIALOG,
      types.UI_DLG,
      types.UI_HIGHLIGHT,
      types.UI_LEFT_DRAWER,
      types.UI_LEFT_DRAWER_HALF,
      types.UI_LEFT_TAB,
      types.UI_RIGHT_DRAWER,
      types.VIEW_DARK,
      types.VIEW_PATH,
      types.VIEW_SUMMARY,
      types.SPEC_OPERATION
    ]),
    menu: {
      get () { return !!(this.UI_LEFT_DRAWER && this.$route.meta.panel && this.opened) },
      set (value) {
        this.UI_SET_LEFT_DRAWER(!!value)
      }
    },
    drawer: {
      get () { return this.APP_API_PAGE && this.UI_RIGHT_DRAWER && this.openedRight },
      set (value) { this.UI_SET_DRAWER(value) }
    },
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
    },
    classesLeft () {
      return {
        'navigation-drawer--opening': this.leftOpening,
        'navigation-drawer--closing': this.leftClosing
      }
    },
    classesRight () {
      return {
        'navigation-drawer--opening': this.rightOpening,
        'navigation-drawer--closing': this.rightClosing
      }
    }
  },
  methods: {
    ...mapMutations([
      types.SPEC_SET_PREV_OPERATION,
      types.UI_SET_ANIMATION,
      types.UI_SET_DIALOG,
      types.UI_SET_DRAWER,
      types.UI_SET_EDIT_FOCUS,
      types.UI_SET_LEFT_DRAWER,
      types.UI_SET_LEFT_DRAWER_HALF,
      types.UI_SET_LEFT_TAB,
      types.UI_SET_NEXT_TAB,
      types.VIEW_SET_DARK,
      types.VIEW_SET_PATH,
      types.VIEW_SET_SUMMARY,
      types.VIEW_SET_VIEW,
      types.VIEW_SET_WIDE,
      types.SPEC_SET_NEXT_OPERATION,
      types.SPEC_SET_PREV_OPERATION
    ]),
    reload () {
      window.location.reload()
    }
  },
  watch: {
    UI_LEFT_DRAWER (value) {
      if (value) {
        Vue.nextTick(() => {
          this.opened = true
        })
      } else {
        this.opened = false
      }
    },
    SPEC_OPERATION: function (val) {
      Vue.nextTick(() => {
        this.drawer = !!val
      })
    },
    $panelLeft: function (val, oldVal) {
      this.$vuetify.application.left = this.menu ? val : 0

      this[val < oldVal ? 'leftClosing' : 'leftOpening'] = true
      setTimeout(() => { this[val < oldVal ? 'leftClosing' : 'leftOpening'] = false }, 350)
    },
    $panel: function (val, oldVal) {
      this.$vuetify.application.right = this.drawer ? val : 0

      this[val < oldVal ? 'rightClosing' : 'rightOpening'] = true
      setTimeout(() => { this[val < oldVal ? 'rightClosing' : 'rightOpening'] = false }, 350)
    },
    menu: function (val) {
      this[!val ? 'leftClosing' : 'leftOpening'] = true
      setTimeout(() => { this[!val ? 'leftClosing' : 'leftOpening'] = false }, 350)
    },
    drawer: function (val) {
      this[!val ? 'rightClosing' : 'rightOpening'] = true
      setTimeout(() => { this[!val ? 'rightClosing' : 'rightOpening'] = false }, 350)

      if (val && !this.SPEC_OPERATION) {
        Vue.nextTick(() => {
          this.UI_SET_DRAWER(false)
        })
      }
    },
    UI_RIGHT_DRAWER: function (value) {
      if (value) {
        Vue.nextTick(() => {
          this.openedRight = true
        })
      } else {
        this.openedRight = false
      }
    }
  }
}
