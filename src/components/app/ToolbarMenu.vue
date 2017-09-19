<template lang="pug">
  v-list(subheader)
    v-list-tile.hidden-sm-and-up(v-if="b && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length", @click="UI_SET_DIALOG('security')")
      v-list-tile-action
        v-icon lock
      v-list-tile-content
        v-list-tile-title(style="min-width: 100px") Authorization

    v-divider.hidden-sm-and-up(v-if="b && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length")

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_DARK()")
      v-list-tile-action
        v-icon brightness_4
      v-list-tile-content
        v-list-tile-title Dark theme
      v-list-tile-action(v-if="VIEW_DARK")
        v-icon check

    v-divider(v-if="!c", :class="{'hidden-sm-and-up': b}")

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_PATH()")
      v-list-tile-action
        v-icon directions
      v-list-tile-content
        v-list-tile-title Path
      v-list-tile-action(v-if="VIEW_PATH")
        v-icon check

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_SUMMARY()")
      v-list-tile-action
        v-icon speaker_notes
      v-list-tile-content
        v-list-tile-title Summary
      v-list-tile-action(v-if="VIEW_SUMMARY")
        v-icon check

    v-divider(v-if="!c", :class="{'hidden-sm-and-up': b}")

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_WIDE()")
      v-list-tile-action
        v-icon settings_ethernet
      v-list-tile-content
        v-list-tile-title Wide
      v-list-tile-action(v-if="VIEW_WIDE")
        v-icon check

    v-divider(v-if="!c", :class="{'hidden-sm-and-up': b}")

    v-subheader(v-if="!c", :class="{'hidden-sm-and-up': b}") View

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_VIEW(0)")
      v-list-tile-action
        v-icon view_column
      v-list-tile-content
        v-list-tile-title Tags
      v-list-tile-action(v-if="VIEW_VIEW === 0")
        v-icon check

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_VIEW(1)")
      v-list-tile-action
        v-icon view_module
      v-list-tile-content
        v-list-tile-title Operations
      v-list-tile-action(v-if="VIEW_VIEW === 1")
        v-icon check

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_VIEW(2)")
      v-list-tile-action
        v-icon view_stream
      v-list-tile-content
        v-list-tile-title Table
      v-list-tile-action(v-if="VIEW_VIEW === 2")
        v-icon check

    //v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_VIEW(3)")
      v-list-tile-action
        v-icon view_quilt
      v-list-tile-content
        v-list-tile-title Documentation
      v-list-tile-action(v-if="VIEW_VIEW === 3")
        v-icon check

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="VIEW_SET_VIEW(3)")
      v-list-tile-action
        v-icon widgets
      v-list-tile-content
        v-list-tile-title Schemas
      v-list-tile-action(v-if="VIEW_VIEW === 3")
        v-icon check

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
        types.SPEC_SET_RESOURCES,
        types.UI_SET_LEFT_DRAWER
      ]),
      ...mapActions([
        types.SPEC_SET_LOAD_URL
      ])
    }
  }
</script>
