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
</style>
