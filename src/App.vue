<template lang="pug">
  v-app(:dark='$store.state.view.dark')
    app-drawer(v-if="main")
    app-toolbar
    main
      router-view
</template>

<script>
  export default {
    components: {
      appDrawer: () => import('./components/Drawer'),
      appToolbar: () => import('./components/Toolbar')
    },
    computed: {
      main: {
        get () {
          return this.$store.state.route.path === '/'
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
