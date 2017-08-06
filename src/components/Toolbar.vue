<template lang="pug">
  v-toolbar(fixed)
    template(v-if="IS_API")
      v-btn(icon, @click.stop="SET_MENU()")
        v-icon menu
      v-toolbar-title(v-if="SPEC && SPEC.info") {{SPEC.info.title}}
      v-spacer
      v-toolbar-items
        v-text-field(prepend-icon="search", append-icon="close", :prepend-icon-cb="searchBegin", :append-icon-cb="searchEnd" v-model="search", name="search", label="Search", single-line, :class="searching ? 'searching' : 'searching searching--closed'")
      v-btn(v-if="IS_GROUPED" icon @click.native.stop="TOGGLE_RESOURCES(true)" v-tooltip:bottom="{html: 'Expand all groups'}")
        v-icon keyboard_arrow_down
      v-btn(v-if="IS_GROUPED" icon @click.native.stop="TOGGLE_RESOURCES(false)" v-tooltip:bottom="{html: 'Collapse all groups'}")
        v-icon keyboard_arrow_up
      v-btn(icon @click.native.stop="TOGGLE_GROUPED()" v-tooltip:bottom="{html: IS_GROUPED ? 'View list' : 'View groups'}")
        v-icon {{IS_GROUPED ? 'view_column' : 'view_comfy'}}
      v-btn(icon @click.native.stop="TOGGLE_DESCRIPTION()" v-tooltip:bottom="{html: IS_DESCRIPTION ? 'Hide descriptions' : 'Show descriptions'}")
        v-icon {{IS_DESCRIPTION ? 'speaker_notes_off' : 'speaker_notes'}}
      v-btn(icon @click.native.stop="SET_DIALOG('proxy')")
        v-icon security
      v-btn(icon @click.native.stop="SET_DIALOG('security')")
        v-icon vpn_key
      v-btn(icon @click.native.stop="TOGGLE_DARK()" v-tooltip:bottom="{html: IS_DARK ? 'Light theme' : 'Dark theme'}")
        v-icon {{IS_DARK ? 'brightness_5' : 'brightness_4'}}
      v-menu(bottom left)
        v-btn(icon slot="activator")
          v-icon more_vert
        v-list
          v-list-tile(to="/http-methods" tag="a")
            v-list-tile-title.upper Methods
          v-list-tile(to="/http-statuses" tag="a")
            v-list-tile-title.upper Statuses
          v-list-tile(to="/http-headers" tag="a")
            v-list-tile-title.upper Headers
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
          v-list-tile(to="/http-methods" tag="a")
            v-list-tile-title.upper Methods
          v-list-tile(to="/http-statuses" tag="a")
            v-list-tile-title.upper Statuses
          v-list-tile(to="/http-headers" tag="a")
            v-list-tile-title.upper Headers
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
        this.FILTER_RESOURCES(this.SEARCH)
      },
      searchEnd () {
        this.searching = false
        this.FILTER_RESOURCES(null)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .upper
    text-transform uppercase

  .searching
    width 200px

  @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'

  .searching
  .searching >>> *
    transition $primary-transition

  .searching--closed
    width 36px

  .searching--closed >>> .input-group__append-icon
    display none

  .searching--closed >>> input
  .searching--closed >>> label
    width 0
</style>
