<template lang="pug">
  // TODO v-toolbar(fixed scroll-off-screen scroll-target="main")
  v-toolbar(fixed)
    template(v-if="IS_API")
      v-btn(v-if="!MENU" icon, @click.stop="SET_MENU()", :class="searching ? 'hidden-xs-only' : ''")
        v-icon edit
      v-toolbar-title(:class="searching ? 'hidden-sm-and-down' : ''") API
      v-spacer
      template(v-if="SPEC")
        v-btn(icon @click.native.stop="searchBegin")
          v-icon search
        div(class="searching", :class="{'searching--closed': !searching}")
          v-text-field(spellcheck="false" id="search" append-icon="close", :append-icon-cb="searchEnd" v-model="search", name="search", label="Search", single-line)
        v-btn(:class="searching ? 'hidden-xs-only' : ''" v-if="IS_GROUPED === 0" icon @click.native.stop="TOGGLE_RESOURCES(true)" v-tooltip:bottom="{html: 'Expand all groups'}")
          v-icon keyboard_arrow_down
        v-btn(:class="searching ? 'hidden-xs-only' : ''" v-if="IS_GROUPED === 0" icon @click.native.stop="TOGGLE_RESOURCES(false)" v-tooltip:bottom="{html: 'Collapse all groups'}")
          v-icon keyboard_arrow_up
        v-menu.hidden-xs-only(bottom left)
          v-btn(icon slot="activator" v-tooltip:bottom="{html: 'Switch view'}")
            v-icon visibility
          app-toolbar-menu(type="a")

      v-btn.hidden-xs-only(v-if="SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length" icon @click.native.stop="SET_DIALOG('security')" v-tooltip:bottom="{html: 'Authorization'}")
        v-icon lock

      v-menu(:class="searching ? 'hidden-xs-only' : ''" bottom left)
        v-btn(icon slot="activator")
          v-icon more_vert
        app-toolbar-menu(type="b")

    template(v-else)
      v-toolbar-title {{PAGE_NAME}}
      v-spacer
      v-toolbar-items
        v-btn(flat href="#/" tag="a") API
        v-btn.hidden-xs-only(flat href="#/http-methods" tag="a") Methods
        v-btn.hidden-xs-only(flat href="#/http-statuses" tag="a") Statuses
        v-btn.hidden-xs-only(flat href="#/http-headers" tag="a") Headers
        v-btn.hidden-xs-only(flat href="#/about" tag="a") About

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
        types.IS_API,
        types.IS_DARK,
        types.IS_DESCRIPTION,
        types.IS_GROUPED,
        types.MENU,
        types.URL,
        types.SPEC,
        types.PAGE_NAME,
        types.SEARCH,
        types.IS_WIDE
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
        types.TOGGLE_WIDE,
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

        setTimeout(() => {
          document.getElementById('search').focus()

          if (this.SEARCH) {
            this.FILTER_RESOURCES(this.SEARCH)
          }
        }, 50)
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
    top 3px
</style>
