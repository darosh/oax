<template lang="pug">
  v-navigation-drawer.pb-0(style="overflow: hidden" right overflow :persistent="true", :disable-route-watcher="true" v-model="drawer", :mobile-break-point="1200", :enable-resize-watcher="true", :touchless="true")
    div(style="height: 100%; overflow: auto")
      app-detail(v-if="OPERATION", :operation="OPERATION")
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
