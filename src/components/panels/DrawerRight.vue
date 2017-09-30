<template lang="pug">
  v-navigation-drawer.pb-0(app style="overflow: hidden" right overflow :persistent="true", :disable-route-watcher="true" v-model="drawer", @input="drawer = $event", :mobile-break-point="$mobile", :enable-resize-watcher="true", :touchless="true", :width="$panel")
    div(style="height: 100%; overflow: auto")
      app-detail(v-if="SPEC_OPERATION", :operation="SPEC_OPERATION")
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import layout from '../mixins/layout'
  import appDetail from './Detail'

  export default {
    mixins: [layout],
    components: {
      appDetail
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
