<template lang="pug">
  // TODO v-toolbar(fixed scroll-off-screen scroll-target="main")
  v-toolbar.gpu(fixed app v-if="APP_ROUTED")
    app-explorer-toolbar(v-if="$route.name === 'index'")
    app-about-toolbar(v-else)
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import { configuration } from '../../assets/scripts/services/configuration'

  export default {
    components: {
      appToolbarMenu: () => import('./ToolbarMenu'),
      appAboutToolbar: () => import('./AboutToolbar'),
      appExplorerToolbar: () => import('./ExplorerToolbar')
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
