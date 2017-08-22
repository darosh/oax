<template lang="pug">
  v-app(:dark="IS_DARK")
    app-menu
    app-drawer
    app-toolbar
    main(role="main")
      router-view
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from './store/types'
  import { throttle } from './services/events'

  export default {
    components: {
      appDrawer: () => import('./components/Drawer'),
      appMenu: () => import('./components/Menu'),
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
  @import './stylus/grid'
  @import './stylus/sidebar'

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

  .application > main > .container
    min-height calc(100vh - 64px)

  @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
    .toolbar--fixed + main
      margin-top $toolbar-mobile-landscape-height

    .toolbar__items .input-group
      padding-bottom 0
      position relative
      top -10px

  .dialog__content
    z-index 11

  @media $display-breakpoints.xs-only
    .container
      padding 0

    .pa-3-sm
      padding 0 !important

    .pa-3-sm
      padding 0 !important

    .plr-3-sm
      padding-left 16px !important
      padding-right 16px !important

    .container.grid-list-xl
      padding 16px

    .container.grid-list-xl > .layout > .flex
      padding 8px

  .application--dark .menu__content
    background-color #212121

  .application--dark .datatable thead th.column.sortable
  .application--dark .datatable thead th.column.sortable.active
  .application--dark .datatable thead th.column.sortable.active i
    color #fff

  .list__tile__title
  .icon
    transition none

  .application--dark tbody tr:hover
    background-color: $grey.darken-3 !important

  .md > p
    margin-bottom 0

  .nowrap
    white-space nowrap

  .overlay
    z-index 5
</style>
