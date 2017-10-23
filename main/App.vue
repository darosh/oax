<template lang="pug">
  v-app(v-hotkey="keymap" , :class="classes", :dark="VIEW_DARK")
    app-drawer-left
    app-drawer-right
    app-toolbar
    main
      v-content
        router-view
    v-dialog(max-width="300" v-model="log" hide-overlay persistent)
      v-card
        v-toolbar.transparent.elevation-0
          v-toolbar-title Log
          v-spacer
          v-btn(icon flat @click="log = !log")
            v-icon close
        v-divider
        v-card-text(style="padding-right: 26px;")
          app-log(style="margin-bottom: 24px", v-if="UI_LOADING", :items="UI_LOADING", :log="true")
          app-log(style="margin-bottom: 24px", v-else :items="UI_LOG", :log="true")
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
