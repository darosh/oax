<template lang="pug">
  v-layout.ma-0.toolbar__content(row style="height: 100%")
    //v-btn(v-if="components.edit && !UI_LEFT_DRAWER" icon, @click.stop="UI_SET_LEFT_DRAWER()", :class="searching ? 'hidden-xs-only' : ''")
    v-btn(aria-label="Edit specification" v-if="!UI_LEFT_DRAWER" icon, @click.stop="UI_SET_LEFT_DRAWER()", :class="searching ? 'hidden-xs-only' : ''")
      v-icon edit
    v-menu.menu--api(bottom right :class="searching ? 'hidden-sm-and-down' : ''" style="height: 100%; display: flex")
      v-toolbar-items(slot="activator" style="height: 100%")
        v-btn(flat style="height: 100%; min-width: 0")
          v-toolbar-title(style="margin-left: 0") API
            span.secondary--text(v-if="VIEW_VIEW" style="text-transform: none")
              |  &ndash; {{{1:'Operations', 2: 'Table', 3: 'Schemas', 5: 'Paths'}[VIEW_VIEW]}}
          v-icon arrow_drop_down
      v-list(subheader)
        v-subheader API View

        v-list-tile(@click="VIEW_SET_VIEW(0)")
          v-list-tile-action
            v-icon view_column
          v-list-tile-content
            v-list-tile-title Tags
          v-list-tile-action
            v-icon(v-if="VIEW_VIEW === 0") check

        v-list-tile(@click="VIEW_SET_VIEW(1)")
          v-list-tile-action
            v-icon view_module
          v-list-tile-content
            v-list-tile-title Operations
          v-list-tile-action
            v-icon(v-if="VIEW_VIEW === 1") check

        v-list-tile(@click="VIEW_SET_VIEW(2)")
          v-list-tile-action
            v-icon view_stream
          v-list-tile-content
            v-list-tile-title Table
          v-list-tile-action
            v-icon(v-if="VIEW_VIEW === 2") check

        v-list-tile(@click="VIEW_SET_VIEW(3)")
          v-list-tile-action
            v-icon widgets
          v-list-tile-content
            v-list-tile-title Schemas
          v-list-tile-action
            v-icon(v-if="VIEW_VIEW === 3") check

        v-list-tile(@click="VIEW_SET_VIEW(5)")
          v-list-tile-action
            v-icon file_tree
          v-list-tile-content
            v-list-tile-title Paths
          v-list-tile-action
            v-icon(v-if="VIEW_VIEW === 5") check

    v-spacer(style="flex: 1 0 auto")

    template(v-if="SPEC")
      v-btn(aria-label="Search" icon @click.native.stop="searchBegin")
        v-icon search
      div(class="searching", :class="{'searching--closed': !searching}")
        v-text-field(spellcheck="false" id="search" append-icon="close", :append-icon-cb="searchEnd" v-model="search", name="search", label="Search", single-line)
      v-tooltip(bottom)
        v-btn(aria-label="Expand/Collapse" slot="activator", :class="searching ? 'hidden-xs-only' : ''" v-if="VIEW_VIEW === 0" icon @click.native.stop="SPEC_RUN_RESOURCES(!SPEC_TAG_OPENED)")
          v-icon(v-if="SPEC_TAG_OPENED") keyboard_arrow_up
          v-icon(v-else) keyboard_arrow_down
        span Expand/Collapse
      v-menu.hidden-xs-only(bottom left)
        v-tooltip(bottom slot="activator")
          v-btn(aria-label="Switch view" icon slot="activator")
            v-icon visibility
          span Switch view
        app-toolbar-menu(view)

    v-tooltip(bottom)
      v-btn.hidden-xs-only(aria-label="Authorization" slot="activator" v-if="SPEC && SPEC.securityDefinitions && Object.keys(SPEC.securityDefinitions).length" icon @click.native.stop="UI_SET_DIALOG('security')")
        v-icon lock
      span Authorization

    v-menu(v-if="$vuetify.breakpoint.xsOnly || (components.pageStatuses || components.pageHeaders || components.pageMethods || components.github || components.pageAbout || components.pageStats)", :class="searching ? 'hidden-xs-only' : ''" bottom left)
      v-btn(aria-label="Menu" icon slot="activator")
        v-icon more_vert
      app-toolbar-menu(navigation view tools)
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import { configuration } from '../../assets/scripts/services/configuration'

  export default {
    components: {
      appToolbarMenu: () => import('./ToolbarMenu')
    },
    data: function () {
      return {
        components: configuration.components,
        searching: false
      }
    },
    computed: {
      ...mapGetters([
        types.APP_HOME,
        types.SPEC_TAG_OPENED,
        types.APP_API_PAGE,
        types.VIEW_DARK,
        types.VIEW_SUMMARY,
        types.VIEW_VIEW,
        types.UI_LEFT_DRAWER,
        types.SETTINGS_URL,
        types.SPEC,
        types.VIEW_VIEW,
        types.APP_PAGE_NAME,
        types.SETTINGS_SEARCH,
        types.VIEW_WIDE,
        types.APP_ROUTED
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
        types.UI_SET_LEFT_DRAWER
      ]),
      ...mapActions([
        types.SPEC_SET_LOAD_URL,
        types.SPEC_RUN_RESOURCES
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

  .menu--api >>> .menu__activator .btn__content
    padding 0 2px 0 12px
</style>
