<template lang="pug">
  v-list(subheader)
    div(v-if="a" style="height: 8px")
    div.hidden-sm-and-up(v-if="b" style="height: 8px")
    v-list-tile.hidden-sm-and-up(v-if="b && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length", @click="UI_SET_DIALOG('security')")
      v-list-tile-action
        v-icon lock
      v-list-tile-content
        v-list-tile-title(style="min-width: 100px") Authorization

    v-divider.hidden-sm-and-up(v-if="b && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length")

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="nextTick(VIEW_SET_DARK)")
      v-list-tile-action
        v-icon brightness_4
      v-list-tile-content
        v-list-tile-title Dark theme
      v-list-tile-action
        v-icon(v-if="VIEW_DARK") check

    v-divider(v-if="!c && (VIEW_VIEW < 2)", :class="{'hidden-sm-and-up': b}")

    v-list-tile(v-if="!c && (VIEW_VIEW < 2)", :class="{'hidden-sm-and-up': b}", @click="nextTick(VIEW_SET_PATH)")
      v-list-tile-action
        v-icon directions
      v-list-tile-content
        v-list-tile-title Path
      v-list-tile-action
        v-icon(v-if="VIEW_PATH") check

    v-list-tile(v-if="!c && (VIEW_VIEW < 2)", :class="{'hidden-sm-and-up': b}", @click="nextTick(VIEW_SET_SUMMARY)")
      v-list-tile-action
        v-icon speaker_notes
      v-list-tile-content
        v-list-tile-title Summary
      v-list-tile-action
        v-icon(v-if="VIEW_SUMMARY") check

    v-divider(v-if="!c && (VIEW_VIEW < 2 || VIEW_VIEW === 3)", :class="{'hidden-sm-and-up': b}")

    v-list-tile(v-if="!c && (VIEW_VIEW < 2 || VIEW_VIEW === 3)", :class="{'hidden-sm-and-up': b}", @click="nextTick(VIEW_SET_WIDE)")
      v-list-tile-action
        v-icon settings_ethernet
      v-list-tile-content
        v-list-tile-title Wide
      v-list-tile-action
        v-icon(v-if="VIEW_WIDE") check

    v-divider(v-if="b", :class="{'hidden-sm-and-up': b}")

    template(v-if="!a")

      v-subheader(style="min-width: 180px") HTTP Reference

      v-list-tile(to="/methods" tag="a")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-title Methods

      v-list-tile(to="/statuses" tag="a")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-title Statuses

      v-list-tile(to="/headers" tag="a")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-title Headers

      v-divider

      v-list-tile(to="/stats" tag="a")
        v-list-tile-action
          v-icon data_usage
        v-list-tile-title Statistics

      v-divider

      v-list-tile(to="/about" tag="a")
        v-list-tile-action
          v-icon help
        v-list-tile-title About
      v-list-tile(href="https://github.com/darosh/oax" tag="a" target="_blank")
        v-list-tile-action
          v-icon github_circle
        v-list-tile-title GitHub
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import Vue from 'vue'

  export default {
    props: ['type'],
    data: function () {
      return {
        a: this.type === 'a',
        b: this.type === 'b',
        c: this.type === 'c'
      }
    },
    watch: {
      type () {
        this.a = this.type === 'a'
        this.b = this.type === 'b'
        this.c = this.type === 'c'
      }
    },
    computed: {
      ...mapGetters([
        types.APP_API_PAGE,
        types.VIEW_DARK,
        types.VIEW_SUMMARY,
        types.VIEW_PATH,
        types.VIEW_VIEW,
        types.UI_LEFT_DRAWER,
        types.SETTINGS_URL,
        types.SPEC,
        types.APP_PAGE_NAME,
        types.SETTINGS_SEARCH,
        types.VIEW_WIDE
      ])
    },
    methods: {
      ...mapMutations([
        types.VIEW_SET_DARK,
        types.VIEW_SET_VIEW,
        types.VIEW_SET_WIDE,
        types.VIEW_SET_SUMMARY,
        types.VIEW_SET_PATH,
        types.UI_SET_DIALOG,
        types.SETTINGS_SET_SEARCH,
        types.SPEC_SET_FILTER_RESOURCES,
        types.UI_SET_LEFT_DRAWER
      ]),
      ...mapActions([
        types.SPEC_SET_LOAD_URL
      ]),
      nextTick: Vue.nextTick
    }
  }
</script>
