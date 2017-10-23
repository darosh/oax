<template lang="pug">
  v-app(v-hotkey="keymap" , :class="classes", :dark="VIEW_DARK")
    app-drawer-left
    app-drawer-right
    app-toolbar
    main
      v-content
        router-view
    app-log-dialog(:value="log")
    app-tour(v-if="UI_HIGHLIGHT")
    appFab
    v-snackbar(:value="APP_UPDATED" top :timeout="1e10") Update ready
      a.snackbar-action(@click="reload") Reload
    #cm-full
</template>

<script>
  export { default } from './app-script'
</script>

<style lang="stylus">
  @import '../assets/style/index.styl'

  .snackbar-action
    font-family: 'Roboto Medium'
    text-transform: uppercase
    cursor: pointer
</style>
