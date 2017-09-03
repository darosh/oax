<template lang="pug">
  v-navigation-drawer.pb-0(style="overflow: hidden" persistent v-model="menu", :mobile-break-point="1200", :enable-resize-watcher="true", :disable-route-watcher="true", :touchless="true")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="SET_MENU(false)")
        v-icon close
      v-toolbar-title Specification
    //v-divider
    v-tabs.app--tabs(:scrollable="false" grow v-model="tab")
      v-tabs-bar.transparent
        v-tabs-item.relative(ripple href="tab-dir") Directory
        v-tabs-item.relative(ripple href="tab-recent") Recent
        v-tabs-item.relative(ripple href="tab-edit") Edit
        v-tabs-item.relative(ripple href="tab-test") Test
        v-tabs-slider
      v-tabs-items
        v-tabs-content#tab-dir
          app-spec-directory(:value="tab === 'tab-dir'")
        v-tabs-content#tab-recent
          app-spec-recent
        v-tabs-content#tab-edit
          app-spec-edit(:value="tab === 'tab-edit'")
        v-tabs-content#tab-test
          app-spec-test
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import VNavigationDrawer from './VNavigationDrawer'
  import appSpecDirectory from './SpecDirectory'
  import appSpecRecent from './SpecRecent'
  import appSpecEdit from './SpecEdit'
  import appSpecTest from './SpecTest'

  export default {
    components: {
      VNavigationDrawer,
      appSpecEdit,
      appSpecDirectory,
      appSpecRecent,
      appSpecTest
    },
    data () {
      return {
        tab: 'tab-dir'
      }
    },
    computed: {
      ...mapGetters([
        types.MENU,
        types.IS_API
      ]),
      menu: {
        get () { return this.MENU && this.IS_API },
        set (value) {
          this.SET_MENU(!!value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_MENU
      ])
    }
  }
</script>
