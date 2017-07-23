<template lang="pug">
  v-app(:dark="IS_DARK")
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
        types.IS_DARK
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_WIDTH
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
</style>
