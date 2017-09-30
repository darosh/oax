<template lang="pug">
  v-navigation-drawer.pb-0(app style="overflow: hidden" persistent v-model="menu", @input="menu = $event", :mobile-break-point="$mobile", :enable-resize-watcher="true", :disable-route-watcher="true", :touchless="true", :width="$panelLeft")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="UI_SET_LEFT_DRAWER(false)")
        v-icon close
      v-toolbar-title Specification
      v-spacer
      v-btn.mr-3(icon @click="UI_SET_LEFT_DRAWER_HALF(!UI_LEFT_DRAWER_HALF)")
        v-icon {{UI_LEFT_DRAWER_HALF ? 'arrow_collapse_left' : 'arrow_collapse_right'}}
    //v-divider
    v-tabs.app--tabs(:scrollable="false" grow v-model="tab")
      v-tabs-bar.transparent
        v-tabs-item.relative(ripple href="tab-dir") Directory
        v-tabs-item.relative(ripple href="tab-recent") Recent
        v-tabs-item.relative(ripple href="tab-edit") Edit
        v-tabs-item.relative(ripple href="tab-test") Test
        v-tabs-slider
      v-tabs-items(touchless)
        v-tabs-content#tab-dir
          app-spec-directory(:value="tab === 'tab-dir'")
        v-tabs-content#tab-recent
          app-spec-recent
        v-tabs-content#tab-edit
          app-spec-edit(v-if="editReady || (tab === 'tab-edit')", :value="tab === 'tab-edit'")
        v-tabs-content#tab-test
          app-spec-test
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import appSpecDirectory from './SpecDirectory'
  import appSpecRecent from './SpecRecent'
  import appSpecEdit from './SpecEdit'
  import appSpecTest from './SpecTest'
  import layout from '../mixins/layout'

  export default {
    mixins: [layout],
    data () {
      return {
        editReady: false,
        half: false
      }
    },
    components: {
      appSpecEdit,
      appSpecDirectory,
      appSpecRecent,
      appSpecTest
    },
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER,
        types.APP_API_PAGE,
        types.UI_LEFT_TAB,
        types.UI_LEFT_DRAWER_HALF
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
          this.editReady = this.editReady || (value === 'tab-edit')
          this.UI_SET_LEFT_TAB(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER,
        types.UI_SET_LEFT_TAB,
        types.UI_SET_LEFT_DRAWER_HALF
      ])
    }
  }
</script>
