<template lang="pug">
  v-navigation-drawer.pb-0(style="overflow: hidden" persistent v-model="menu", :mobile-break-point="1200", :enable-resize-watcher="true", :disable-route-watcher="true", :touchless="true")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="UI_SET_LEFT_DRAWER(false)")
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
          app-spec-edit(v-if="menu && (tab === 'tab-edit')", :value="tab === 'tab-edit'")
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
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER,
        types.APP_API_PAGE,
        types.UI_LEFT_TAB
      ]),
      menu: {
        get () { return this.UI_LEFT_DRAWER && this.APP_API_PAGE },
        set (value) {
          this.UI_SET_LEFT_DRAWER(!!value)
        }
      },
      tab: {
        get () { return this.UI_LEFT_TAB },
        set (value) {
          this.UI_SET_LEFT_TAB(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER,
        types.UI_SET_LEFT_TAB
      ])
    }
  }
</script>
