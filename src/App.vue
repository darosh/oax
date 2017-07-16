<template lang="pug">
  v-app(:dark='$store.state.view.dark')
    router-view
</template>

<script>
  export default {
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
