<template lang="pug">
  v-list(subheader)
    v-list-tile.hidden-sm-and-up(v-if="b && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length", @click="SET_DIALOG('security')")
      v-list-tile-action
        v-icon lock
      v-list-tile-content
        v-list-tile-title(style="min-width: 100px") Authorization

    v-divider.hidden-sm-and-up(v-if="b && SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length")

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_DARK()")
      v-list-tile-action
        v-icon brightness_4
      v-list-tile-content
        v-list-tile-title Dark theme
      v-list-tile-action(v-if="IS_DARK")
        v-icon check

    v-divider(v-if="!c", :class="{'hidden-sm-and-up': b}")

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_PATH()")
      v-list-tile-action
        v-icon directions
      v-list-tile-content
        v-list-tile-title Path
      v-list-tile-action(v-if="IS_PATH")
        v-icon check

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_DESCRIPTION()")
      v-list-tile-action
        v-icon speaker_notes
      v-list-tile-content
        v-list-tile-title Summary
      v-list-tile-action(v-if="IS_DESCRIPTION")
        v-icon check

    v-divider(v-if="!c", :class="{'hidden-sm-and-up': b}")

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_WIDE()")
      v-list-tile-action
        v-icon settings_ethernet
      v-list-tile-content
        v-list-tile-title Wide
      v-list-tile-action(v-if="IS_WIDE")
        v-icon check

    v-divider(v-if="!c", :class="{'hidden-sm-and-up': b}")

    v-subheader(v-if="!c", :class="{'hidden-sm-and-up': b}") View

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_GROUPED(0)")
      v-list-tile-action
        v-icon view_column
      v-list-tile-content
        v-list-tile-title Tags
      v-list-tile-action(v-if="IS_GROUPED === 0")
        v-icon check

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_GROUPED(1)")
      v-list-tile-action
        v-icon view_module
      v-list-tile-content
        v-list-tile-title Operations
      v-list-tile-action(v-if="IS_GROUPED === 1")
        v-icon check

    v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_GROUPED(2)")
      v-list-tile-action
        v-icon view_stream
      v-list-tile-content
        v-list-tile-title Table
      v-list-tile-action(v-if="IS_GROUPED === 2")
        v-icon check


    //v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_GROUPED(3)")
      v-list-tile-action
        v-icon view_quilt
      v-list-tile-content
        v-list-tile-title Documentation
      v-list-tile-action(v-if="IS_GROUPED === 3")
        v-icon check

    //v-list-tile(v-if="!c", :class="{'hidden-sm-and-up': b}", @click="TOGGLE_GROUPED(4)")
      v-list-tile-action
        v-icon widgets
      v-list-tile-content
        v-list-tile-title Definitions
      v-list-tile-action(v-if="IS_GROUPED === 4")
        v-icon check

    v-divider(v-if="b", :class="{'hidden-sm-and-up': b}")

    template(v-if="!a")

      v-subheader(style="min-width: 180px") HTTP Reference

      v-list-tile(to="/http-methods" tag="a")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-title Methods

      v-list-tile(to="/http-statuses" tag="a")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-title Statuses

      v-list-tile(to="/http-headers" tag="a")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-title Headers

      v-divider

      v-list-tile(to="/about" tag="a")
        v-list-tile-action
          v-icon help
        v-list-tile-title About
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../store/types'

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
        types.IS_API,
        types.IS_DARK,
        types.IS_DESCRIPTION,
        types.IS_PATH,
        types.IS_GROUPED,
        types.MENU,
        types.URL,
        types.SPEC,
        types.PAGE_NAME,
        types.SEARCH,
        types.IS_WIDE
      ])
    },
    methods: {
      ...mapMutations([
        types.TOGGLE_DARK,
        types.TOGGLE_GROUPED,
        types.TOGGLE_WIDE,
        types.TOGGLE_DESCRIPTION,
        types.TOGGLE_PATH,
        types.SET_DIALOG,
        types.SET_SEARCH,
        types.FILTER_RESOURCES,
        types.TOGGLE_RESOURCES,
        types.SET_MENU
      ]),
      ...mapActions([
        types.LOAD_URL
      ])
    }
  }
</script>
