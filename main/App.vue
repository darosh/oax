<template lang="pug">
  v-app(v-hotkey="keymap" , :class="classes", :dark="VIEW_DARK")
    v-navigation-drawer.pb-0(app fixed stateless v-model="menu", :class="classesLeft", :width="$panelLeft", :mobile-break-point="$mobile" style="overflow: hidden")
      router-view(name="panel")
    v-navigation-drawer.pb-0(app fixed stateless right v-model="drawer", :class="classesRight", :width="$panel", :mobile-break-point="$mobile" style="overflow: hidden")
      div(style="height: 100%; overflow: auto")
        app-detail(v-if="SPEC_OPERATION", :operation="SPEC_OPERATION")
    app-toolbar
    v-content#main
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
</style>
