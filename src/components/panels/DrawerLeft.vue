<template lang="pug">
  v-navigation-drawer.pb-0(app style="overflow: hidden" persistent v-model="menu", @input="menu = $event", :mobile-break-point="$mobile", :enable-resize-watcher="true", :disable-route-watcher="true", :touchless="true", :width="$panelLeft")
    router-view(name="panel")
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import layout from '../mixins/layout'

  export default {
    mixins: [layout],
    data () {
      return {
        opened: false,
        showSlider: true
      }
    },
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER,
        types.APP_API_PAGE,
        types.UI_LEFT_TAB,
        types.UI_LEFT_DRAWER_HALF
      ]),
      menu: {
        get () { return this.UI_LEFT_DRAWER && this.$route.meta.panel && this.opened},
        set (value) {
          this.UI_SET_LEFT_DRAWER(!!value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER,
        types.UI_SET_LEFT_TAB,
        types.UI_SET_LEFT_DRAWER_HALF
      ])
    },
    watch: {
      UI_LEFT_DRAWER (value) {
        if (value) {
          Vue.nextTick(() => {
            this.opened = true
          })
        } else {
          this.opened = false
        }
      }
    }
  }
</script>
