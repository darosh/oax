<template lang="pug">
  v-app(:dark="IS_DARK")
    app-drawer
    app-toolbar
    main
      router-view
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from './store/types'

  export default {
    components: {
      appDrawer: () => import('./components/Drawer'),
      appToolbar: () => import('./components/Toolbar')
    },
    computed: {
      ...mapGetters([
        types.IS_DARK
      ])
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
</style>
