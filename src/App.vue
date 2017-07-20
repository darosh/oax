<template lang="pug">
  v-app(:dark='$store.state.view.dark')
    app-toolbar
    main
      router-view
</template>

<script>
  export default {
    components: {
      appToolbar: () => import('./components/Toolbar')
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
