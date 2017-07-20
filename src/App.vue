<template lang="pug">
  v-app(:dark='$store.state.view.dark')
    app-drawer
    app-toolbar
    main
      router-view
</template>

<script>
  export default {
    components: {
      appDrawer: () => import('./components/Drawer'),
      appToolbar: () => import('./components/Toolbar')
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
