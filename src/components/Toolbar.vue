<template lang="pug">
  // TODO v-toolbar(fixed scroll-off-screen scroll-target="main")
  v-toolbar(fixed)
    template(v-if="APP_API_PAGE")
      v-btn(v-if="!UI_LEFT_DRAWER" icon, @click.stop="UI_SET_LEFT_DRAWER()", :class="searching ? 'hidden-xs-only' : ''")
        v-icon edit
      v-toolbar-title(:class="searching ? 'hidden-sm-and-down' : ''") API
      v-spacer
      template(v-if="SPEC")
        v-btn(icon @click.native.stop="searchBegin")
          v-icon search
        div(class="searching", :class="{'searching--closed': !searching}")
          v-text-field(spellcheck="false" id="search" append-icon="close", :append-icon-cb="searchEnd" v-model="search", name="search", label="Search", single-line)
        v-btn(:class="searching ? 'hidden-xs-only' : ''" v-if="VIEW_VIEW === 0" icon @click.native.stop="SPEC_SET_RESOURCES(true)" v-tooltip:bottom="{html: 'Expand all groups'}")
          v-icon keyboard_arrow_down
        v-btn(:class="searching ? 'hidden-xs-only' : ''" v-if="VIEW_VIEW === 0" icon @click.native.stop="SPEC_SET_RESOURCES(false)" v-tooltip:bottom="{html: 'Collapse all groups'}")
          v-icon keyboard_arrow_up
        v-menu.hidden-xs-only(bottom left)
          v-btn(icon slot="activator" v-tooltip:bottom="{html: 'Switch view'}")
            v-icon visibility
          app-toolbar-menu(type="a")

      v-btn.hidden-xs-only(v-if="SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length" icon @click.native.stop="UI_SET_DIALOG('security')" v-tooltip:bottom="{html: 'Authorization'}")
        v-icon lock

      v-menu(:class="searching ? 'hidden-xs-only' : ''" bottom left)
        v-btn(icon slot="activator")
          v-icon more_vert
        app-toolbar-menu(type="b")

    template(v-else)
      v-toolbar-title {{APP_PAGE_NAME}}
      v-spacer
      v-toolbar-items
        v-btn(flat href="#/" tag="a") API
        v-btn.hidden-xs-only(flat href="#/methods" tag="a") Methods
        v-btn.hidden-xs-only(flat href="#/statuses" tag="a") Statuses
        v-btn.hidden-xs-only(flat href="#/headers" tag="a") Headers
        v-btn.hidden-xs-only(flat href="#/about" tag="a") About
        v-btn.hidden-xs-only(flat href="https://github.com/darosh/oax" tag="a" target="_blank") GitHub

      v-menu.hidden-sm-and-up(bottom left)
        v-btn(icon slot="activator")
          v-icon more_vert
        app-toolbar-menu(type="c")
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {
      appToolbarMenu: () => import('./ToolbarMenu')
    },
    data: function () {
      return {
        searching: false
      }
    },
    computed: {
      ...mapGetters([
        types.APP_API_PAGE,
        types.VIEW_DARK,
        types.VIEW_SUMMARY,
        types.VIEW_VIEW,
        types.UI_LEFT_DRAWER,
        types.SETTINGS_URL,
        types.SPEC,
        types.APP_PAGE_NAME,
        types.SETTINGS_SEARCH,
        types.VIEW_WIDE
      ]),
      search: {
        get () {
          return this.searching ? this.SETTINGS_SEARCH : null
        },
        set (value) {
          this.SETTINGS_SET_SEARCH(value)
          this.SPEC_SET_FILTER_RESOURCES(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.VIEW_SET_DARK,
        types.VIEW_SET_VIEW,
        types.VIEW_SET_WIDE,
        types.VIEW_SET_SUMMARY,
        types.UI_SET_DIALOG,
        types.SETTINGS_SET_SEARCH,
        types.SPEC_SET_FILTER_RESOURCES,
        types.SPEC_SET_RESOURCES,
        types.UI_SET_LEFT_DRAWER
      ]),
      ...mapActions([
        types.SPEC_SET_LOAD_URL
      ]),
      searchBegin () {
        this.searching = true

        setTimeout(() => {
          document.getElementById('search').focus()

          if (this.SETTINGS_SEARCH) {
            this.SPEC_SET_FILTER_RESOURCES(this.SETTINGS_SEARCH)
          }
        }, 50)
      },
      searchEnd () {
        this.searching = false

        document.getElementById('search').blur()

        if (this.SETTINGS_SEARCH) {
          this.SPEC_SET_FILTER_RESOURCES(null)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .upper
    text-transform uppercase

  @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'

  .searching
    overflow hidden
    width 208px
    padding-left 8px
    transition $primary-transition

  .searching--closed
    padding-left 0
    width 0

  .searching > *
    right 8px

  .searching--closed > *
    display none

  .hidden-searching
    @media $display-breakpoints.sm-and-down
      display: none !important

  .toolbar .input-group
    position relative
    top 12px
</style>
