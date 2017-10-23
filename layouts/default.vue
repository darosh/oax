<template lang="pug">
  v-app(v-hotkey="keymap" , :class="classes", :dark="VIEW_DARK")
    app-drawer-left
    app-drawer-right
    app-toolbar
    main
      v-content
        nuxt
    app-log-dialog(:value="log")
    app-tour(v-if="UI_HIGHLIGHT")
    appFab
    v-snackbar(:value="APP_UPDATED" top :timeout="1e10") Update ready
      a.snackbar-action(@click="reload") Reload
    #cm-full
</template>

<script>
  export { default } from '../main/app-script'
</script>
