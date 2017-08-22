<template lang="pug">
  v-toolbar(fixed)
    template(v-if="IS_API")
      v-btn(icon, @click.stop="SET_MENU()", :class="searching ? 'hidden-xs-only' : ''")
        v-icon menu
      v-toolbar-title.hidden-xs-only(v-if="SPEC && SPEC.info", :class="searching ? 'hidden-sm-and-down' : ''") {{SPEC.info.title}}
      v-toolbar-title.hidden-sm-and-up(:class="searching ? 'hidden-sm-and-down' : ''") API
      v-spacer
      v-btn(v-if="!searching" icon @click.native.stop="searchBegin" v-tooltip:bottom="{html: 'Filter'}")
        v-icon search
      v-toolbar-items(:style="!searching ? 'width: 0' : 'width: 208px'")
        v-text-field(id="search" append-icon="close", :prepend-icon-cb="searchBegin", :append-icon-cb="searchEnd" v-model="search", name="search", label="Search", single-line, :class="searching ? 'searching' : 'searching searching--closed'")
      v-btn(:class="searching ? 'hidden-xs-only' : ''" v-if="IS_GROUPED === 0" icon @click.native.stop="TOGGLE_RESOURCES(true)" v-tooltip:bottom="{html: 'Expand all groups'}")
        v-icon keyboard_arrow_down
      v-btn(:class="searching ? 'hidden-xs-only' : ''" v-if="IS_GROUPED === 0" icon @click.native.stop="TOGGLE_RESOURCES(false)" v-tooltip:bottom="{html: 'Collapse all groups'}")
        v-icon keyboard_arrow_up
      v-btn.hidden-xs-only(v-if="IS_GROUPED < 2" icon @click.native.stop="TOGGLE_DESCRIPTION()" v-tooltip:bottom="{html: IS_DESCRIPTION ? 'Hide summary' : 'Show summary'}")
        v-icon {{IS_DESCRIPTION ? 'speaker_notes_off' : 'speaker_notes'}}
      v-menu.hidden-xs-only(bottom left)
        v-btn(icon slot="activator" v-tooltip:bottom="{html: 'Switch view'}")
          v-icon {{['view_column', 'view_module', 'view_stream'][IS_GROUPED]}}
        v-list(subheader)
          v-subheader View
          v-list-tile(@click.native="TOGGLE_GROUPED(0)")
            v-list-tile-action
              v-icon view_column
            v-list-tile-content
              v-list-tile-title Groups
            v-list-tile-action(v-if="IS_GROUPED === 0")
              v-icon check
          v-list-tile(@click.native="TOGGLE_GROUPED(1)")
            v-list-tile-action
              v-icon view_module
            v-list-tile-content
              v-list-tile-title List
            v-list-tile-action(v-if="IS_GROUPED === 1")
              v-icon check
          v-list-tile(@click.native="TOGGLE_GROUPED(2)")
            v-list-tile-action
              v-icon view_stream
            v-list-tile-content
              v-list-tile-title Table
            v-list-tile-action(v-if="IS_GROUPED === 2")
              v-icon check
      v-btn.hidden-xs-only(v-if="SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length" icon @click.native.stop="SET_DIALOG('security')" v-tooltip:bottom="{html: 'Authorization'}")
        v-icon lock
      v-menu(:class="searching ? 'hidden-xs-only' : ''" bottom left)
        v-btn(icon slot="activator")
          v-icon more_vert
        v-list(subheader)
          v-subheader.hidden-sm-and-up View
          v-list-tile.hidden-sm-and-up(@click.native="TOGGLE_GROUPED(0)")
            v-list-tile-action
              v-icon view_column
            v-list-tile-content
              v-list-tile-title Groups
            v-list-tile-action(v-if="IS_GROUPED === 0")
              v-icon check
          v-list-tile.hidden-sm-and-up(@click.native="TOGGLE_GROUPED(1)")
            v-list-tile-action
              v-icon view_module
            v-list-tile-content
              v-list-tile-title List
            v-list-tile-action(v-if="IS_GROUPED === 1")
              v-icon check
          v-list-tile.hidden-sm-and-up(@click.native="TOGGLE_GROUPED(2)")
            v-list-tile-action
              v-icon view_stream
            v-list-tile-content
              v-list-tile-title Table
            v-list-tile-action(v-if="IS_GROUPED === 2")
              v-icon check
          v-divider.hidden-sm-and-up
          v-list-tile.hidden-sm-and-up(@click.native="TOGGLE_DESCRIPTION()")
            v-list-tile-action
                v-icon {{IS_DESCRIPTION ? 'speaker_notes_off' : 'speaker_notes'}}
            v-list-tile-content
              v-list-tile-title(style="min-width: 100px") {{IS_DESCRIPTION ? 'Hide descriptions' : 'Show descriptions'}}
          v-list-tile.hidden-sm-and-up(v-if="SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length", @click.native="SET_DIALOG('security')")
            v-list-tile-action
                v-icon lock
            v-list-tile-content
              v-list-tile-title(style="min-width: 100px") Authorization
          v-list-tile(@click.native="TOGGLE_DARK()")
            v-list-tile-action
              v-icon {{IS_DARK ? 'brightness_5' : 'brightness_4'}}
            v-list-tile-content
              v-list-tile-title(style="min-width: 135px") {{IS_DARK ? 'Light theme' : 'Dark theme'}}
          v-divider
          v-subheader HTTP Reference
          v-list-tile(to="/http-methods" tag="a")
            v-list-tile-title Methods
          v-list-tile(to="/http-statuses" tag="a")
            v-list-tile-title Statuses
          v-list-tile(to="/http-headers" tag="a")
            v-list-tile-title Headers
          v-divider
          v-list-tile(to="/about" tag="a")
            v-list-tile-action
              v-icon help
            v-list-tile-title About
    template(v-else)
      v-toolbar-title HTTP {{PAGE_NAME}}
      v-spacer
      v-toolbar-items
        v-btn(flat href="#/" tag="a") API
        v-btn.hidden-xs-only(flat href="#/http-methods" tag="a") Methods
        v-btn.hidden-xs-only(flat href="#/http-statuses" tag="a") Statuses
        v-btn.hidden-xs-only(flat href="#/http-headers" tag="a") Headers
      v-menu.hidden-sm-and-up(bottom left)
        v-btn(icon slot="activator")
          v-icon more_vert
        v-list
          v-subheader HTTP Reference
          v-list-tile(to="/http-methods" tag="a")
            v-list-tile-title Methods
          v-list-tile(to="/http-statuses" tag="a")
            v-list-tile-title Statuses
          v-list-tile(to="/http-headers" tag="a")
            v-list-tile-title Headers
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    data: function () {
      return {
        searching: false
      }
    },
    computed: {
      ...mapGetters([
        types.IS_API,
        types.IS_DARK,
        types.IS_DESCRIPTION,
        types.IS_GROUPED,
        types.URL,
        types.SPEC,
        types.PAGE_NAME,
        types.SEARCH
      ]),
      search: {
        get () {
          return this.searching ? this.SEARCH : null
        },
        set (value) {
          this.SET_SEARCH(value)
          this.FILTER_RESOURCES(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.TOGGLE_DARK,
        types.TOGGLE_GROUPED,
        types.TOGGLE_DESCRIPTION,
        types.SET_DIALOG,
        types.SET_SEARCH,
        types.FILTER_RESOURCES,
        types.TOGGLE_RESOURCES,
        types.SET_MENU
      ]),
      ...mapActions([
        types.LOAD_URL
      ]),
      searchBegin () {
        this.searching = true

        document.getElementById('search').focus()

        if (this.SEARCH) {
          this.FILTER_RESOURCES(this.SEARCH)
        }
      },
      searchEnd () {
        this.searching = false

        document.getElementById('search').blur()

        if (this.SEARCH) {
          this.FILTER_RESOURCES(null)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .upper
    text-transform uppercase

  .searching
    width 200px
    margin-right 8px

  @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'

  .searching
  .searching >>> *
  .toolbar__items
    transition $primary-transition

  .searching--closed >>> .input-group__details
    display none

  .searching--closed
    width 0
    margin-right 0

  .searching--closed >>> .input-group__append-icon
  .searching--closed >>> .input-group__prepend-icon
    display none

  .searching--closed >>> input
  .searching--closed >>> label
    width 0

  .hidden-searching
    @media $display-breakpoints.sm-and-down
      display: none !important
</style>
