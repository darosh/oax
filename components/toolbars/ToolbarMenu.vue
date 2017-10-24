<template lang="pug">
  v-list(subheader)
    div(:class="{'hidden-sm-and-up': tools}" v-if="tools || view" style="height: 8px")
    v-list-tile.hidden-sm-and-up(v-if="tools && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length", @click="UI_SET_DIALOG('security')")
      v-list-tile-action
        v-icon lock
      v-list-tile-content
        v-list-tile-title(style="min-width: 100px") Authorization

    v-divider.hidden-sm-and-up(v-if="tools && view && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length")

    v-list-tile(v-if="view", :class="{'hidden-sm-and-up': view && tools}", @click="nextNextTick(VIEW_SET_DARK)")
      v-list-tile-action
        v-icon brightness_4
      v-list-tile-content
        v-list-tile-title Dark theme
      v-list-tile-action
        v-icon(v-if="VIEW_DARK") check

    v-divider(v-if="view && (VIEW_VIEW < 2)", :class="{'hidden-sm-and-up': view && tools}")

    v-list-tile(v-if="view && (VIEW_VIEW < 2)", :class="{'hidden-sm-and-up': view && tools}", @click="nextNextTick(VIEW_SET_PATH)")
      v-list-tile-action
        v-icon directions
      v-list-tile-content
        v-list-tile-title Path
      v-list-tile-action
        v-icon(v-if="VIEW_PATH") check

    v-list-tile(v-if="view && (VIEW_VIEW < 2)", :class="{'hidden-sm-and-up': view && tools}", @click="nextNextTick(VIEW_SET_SUMMARY)")
      v-list-tile-action
        v-icon speaker_notes
      v-list-tile-content
        v-list-tile-title Summary
      v-list-tile-action
        v-icon(v-if="VIEW_SUMMARY") check

    v-divider.hidden-xs-only(:class="{'hidden-sm-and-up': view && tools}" v-if="view && (VIEW_VIEW < 2 || VIEW_VIEW === 3)")

    v-list-tile.hidden-xs-only(:class="{'hidden-sm-and-up': view && tools}" v-if="view && (VIEW_VIEW < 2 || VIEW_VIEW === 3)", @click="nextNextTick(VIEW_SET_WIDE)")
      v-list-tile-action
        v-icon settings_ethernet
      v-list-tile-content
        v-list-tile-title Wide
      v-list-tile-action
        v-icon(v-if="VIEW_WIDE") check

    v-divider.hidden-sm-and-up(v-if="view && navigation")

    template(v-if="navigation")
      template(v-for="(i, k) in links")
        v-divider(v-if="!i", :key="k")
        v-subheader(v-else-if="!i.exact && i.header" style="min-width: 180px", :key="k") {{i.header}}
        v-list-tile(v-else-if="!i.exact", :to="i.to", :href="i.href", :target="i.blank ? '_blank' : null", :rel="i.blank ? 'noopener' : null" tag="a", :key="k")
          v-list-tile-action
            v-icon {{i.icon}}
          v-list-tile-title {{i.title}}
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import Vue from 'vue'
  import links from '../../assets/scripts/utils/links'

  export default {
    props: ['navigation', 'view', 'tools'],
    data: function () {
      return {
        links
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
      nextNextTick: (d) => setTimeout(() => Vue.nextTick(d), 50)
    }
  }
</script>
