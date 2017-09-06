<template lang="pug">
  v-navigation-drawer.pb-0(style="overflow: hidden" right overflow :persistent="true", :disable-route-watcher="true" v-model="drawer", :mobile-break-point="1200", :enable-resize-watcher="true", :touchless="true")
    div(style="height: 100%; overflow: auto")
      app-detail(v-if="SPEC_OPERATION", :operation="SPEC_OPERATION")
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'

  import appDetail from './Detail'
  import VNavigationDrawer from './VNavigationDrawer'

  export default {
    components: {
      appDetail,
      VNavigationDrawer
    },
    computed: {
      ...mapGetters([
        types.SPEC_OPERATION,
        types.APP_API_PAGE,
        types.UI_WIDTH,
        types.UI_RIGHT_DRAWER
      ]),
      drawer: {
        get () { return this.APP_API_PAGE && this.UI_RIGHT_DRAWER },
        set (value) { this.UI_SET_DRAWER(value) }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DRAWER
      ])
    },
    watch: {
      SPEC_OPERATION: function (val) {
        setTimeout(() => {
          this.drawer = !!val
        }, 100)
      },
      drawer: function (val) {
        if (val && !this.SPEC_OPERATION) {
          Vue.nextTick(() => {
            this.UI_SET_DRAWER(false)
          })
        }
      }
    }
  }
</script>
