<template lang="pug">
  v-navigation-drawer.pb-0(right overflow :hide-overlay="small", :temporary="small", :persistent="!small", :disable-route-watcher="true" v-model="drawer")
    app-detail(v-if="OPERATION", :operation="OPERATION")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {
      appDetail: () => import('./panels/Detail')
    },
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      ...mapGetters([
        types.OPERATION,
        types.IS_API,
        types.WIDTH
      ]),
      small: {
        get () { return this.WIDTH < 1024 }
      }
    },
    watch: {
      OPERATION: function (val) {
        if (val) {
          this.drawer = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .navigation-drawer >>> .expansion-panel
    box-shadow none

  .navigation-drawer >>> .expansion-panel > li
    border-left-width 0
    border-top-width 0
    border-bottom-width 1px
    border-right-width 0

  .navigation-drawer >>> .expansion-panel > li:last-child
    border-left-width 0
    border-top-width 0
    border-bottom-width 0
    border-right-width 0

  .navigation-drawer >>> .expansion-panel > li:last-child > .expansion-panel__header:not(.expansion-panel__header--active)
    border-bottom 1px solid rgba(0, 0, 0, 0.12)
</style>
