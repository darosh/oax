<template lang="pug">
  div
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(aria-label="Close specification edit" icon @click.stop="UI_SET_LEFT_DRAWER(false)")
        v-icon close
      v-toolbar-title Specification
      v-spacer(v-if="$half < $vuetify.breakpoint.width")
      v-btn.mr-3(aria-label="Wide specification edit" v-if="$half < $vuetify.breakpoint.width" icon @click="UI_SET_LEFT_DRAWER_HALF(!UI_LEFT_DRAWER_HALF)")
        v-icon {{UI_LEFT_DRAWER_HALF ? 'arrow_collapse_left' : 'arrow_collapse_right'}}
    v-tabs(:scrollable="false" grow v-model="tab")
      v-tab.relative(ripple href="#tab-dir") Directory
      v-tab.relative(ripple href="#tab-recent") Recent
      v-tab.relative(ripple href="#tab-edit") Edit
      v-tab.relative(ripple href="#tab-test") Validator
      v-tab-item#tab-dir
        app-spec-directory(:value="tab === 'tab-dir'")
      v-tab-item#tab-recent
        app-spec-recent
      v-tab-item#tab-edit
        app-spec-edit(:value="tab === 'tab-edit'")
      v-tab-item#tab-test
        app-spec-test(v-if="tab === 'tab-test'")
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import appSpecDirectory from './SpecDirectory'
  import appSpecRecent from './SpecRecent'
  import appSpecEdit from './SpecEdit'
  import appSpecTest from './SpecTest'
  import layout from '../../mixins/layout'

  export default {
    mixins: [layout],
    data () {
      return {
        opened: false,
        showSlider: true
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
        get () { return this.UI_LEFT_DRAWER && this.APP_API_PAGE && this.opened },
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
      },
      // TODO this forces tab slider update
      UI_LEFT_DRAWER_HALF () {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
          }, 300)
        }, 25)
      }
    }
  }
</script>
