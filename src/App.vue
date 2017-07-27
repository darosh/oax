<template lang="pug">
  v-app(:dark="IS_DARK")
    v-navigation-drawer.pb-0(temporary v-model="menu")
      v-toolbar
        v-btn(icon @click.stop="SET_MENU()")
          v-icon close
        v-toolbar-title Settings
      div.pa-3 {{'Lorem ipsum... '.repeat(120)}}
    app-drawer
    app-toolbar
    main
      router-view
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from './store/types'
  import { throttle } from './services/events'

  export default {
    components: {
      appDrawer: () => import('./components/Drawer'),
      appToolbar: () => import('./components/Toolbar')
    },
    created () {
      throttle('resize', 'resize.lazy', 200)
      window.addEventListener('resize.lazy', this.resized)
      this.resized()
    },
    destroyed () {
      removeEventListener('resize.lazy', this.resized)
    },
    computed: {
      ...mapGetters([
        types.IS_DARK,
        types.MENU
      ]),
      menu: {
        get () { return this.MENU },
        set (value) { this.SET_MENU(value) }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_WIDTH,
        types.SET_MENU
      ]),
      resized () {
        this.SET_WIDTH(window.innerWidth)
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  .hover--block:hover
    background $material-twelve-percent-dark
    cursor pointer

  pre
    background lighten($material-twelve-percent-dark, 50%)
    border 1px solid $material-twelve-percent-dark
    border-radius 6px !important
    max-height 360px
    overflow auto
    scroll auto

  .input-group__hint
    transition none !important

  html, body, .application, main
    overflow-y hidden !important
    height 100vh
    display block

  .toolbar--fixed + main
    overflow-y auto !important
    padding 0
    margin-top 64px
    height calc(100vh - 64px)

  .navigation-drawer--persistent:not(.navigation-drawer--is-mobile).navigation-drawer--open.navigation-drawer--right ~ main, .navigation-drawer--permanent.navigation-drawer--open.navigation-drawer--right ~ main, .navigation-drawer--persistent:not(.navigation-drawer--is-mobile).navigation-drawer--open.navigation-drawer--right ~ .footer:not(.footer--fixed):not(.footer--absolute), .navigation-drawer--permanent.navigation-drawer--open.navigation-drawer--right ~ .footer:not(.footer--fixed):not(.footer--absolute)
    padding-right 0
    margin-right 300px

  .dialog__content
    z-index 11

  @media only screen and (max-width: 600px) {
    .container {
      padding 0
    }

    .container.grid-list-xl {
      padding 16px
    }
  }
</style>
