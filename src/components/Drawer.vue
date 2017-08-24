<template lang="pug">
  app-navigation-drawer.pb-0(style="overflow: hidden" right overflow :persistent="true", :disable-route-watcher="true" v-model="drawer", :mobile-break-point="1200", :enable-resize-watcher="true", :touchless="true")
    div(style="height: 100%; overflow: auto")
      app-detail(v-if="OPERATION", :operation="OPERATION")
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../store/types'

  import appDetail from './panels/Detail'
  import appNavigationDrawer from './AppNavigationDrawer'

  export default {
    components: {
      appDetail,
      appNavigationDrawer
    },
    computed: {
      ...mapGetters([
        types.OPERATION,
        types.IS_API,
        types.WIDTH,
        types.DRAWER
      ]),
      drawer: {
        get () { return this.IS_API && this.DRAWER },
        set (value) { this.SET_DRAWER(value) }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DRAWER
      ])
    },
    watch: {
      OPERATION: function (val) {
        setTimeout(() => {
          this.drawer = !!val
        }, 100)
      },
      drawer: function (val) {
        if (val && !this.OPERATION) {
          Vue.nextTick(() => {
            this.SET_DRAWER(false)
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .navigation-drawer >>> .expansion-panel
    box-shadow none

  .navigation-drawer
    border-left 1px solid rgba(0, 0, 0, 0.12) !important

  .navigation-drawer >>> .expansion-panel > li
    border-left-width 0
    border-top-width 1px
    border-bottom-width 1px
    border-right-width 0

  .navigation-drawer >>> .expansion-panel > li:last-child
    border-bottom-width 0

  .navigation-drawer >>> .expansion-panel > li:last-child > .expansion-panel__header:not(.expansion-panel__header--active)
    border-bottom 1px solid rgba(0, 0, 0, 0.12)
</style>
