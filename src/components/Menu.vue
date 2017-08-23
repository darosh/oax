<template lang="pug">
  app-navigation-drawer.pb-0(style="overflow: hidden" persistent v-model="menu", :mobile-break-point="1200", :enable-resize-watcher="true", :disable-route-watcher="true" :touchless="true")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="SET_MENU(false)")
        v-icon close
      v-toolbar-title Specification
    v-divider
    v-tabs.app--tabs(:scrollable="false")
      v-tabs-bar.tabs--transparent(slot="activators")
        v-tabs-item(ripple href="tab-url") URL
        v-tabs-item.relative(ripple href="tab-json") Edit
        v-tabs-item.relative(ripple href="tab-dir") Directory
        v-tabs-slider
      v-tabs-content#tab-url
        v-divider
        .pl-3.pr-3.pt-3
          v-text-field(label="URL" v-model="url" multi-line auto-grow rows="3")
      v-tabs-content#tab-json
        v-divider
        .pl-3.pr-3.pt-3
          v-text-field(label="JSON" multi-line :rows="7")
      v-tabs-content#tab-dir
        v-divider
        .pl-3.pr-3.pt-3
          v-text-field(label="Search" v-model="filter" hide-details prepend-icon="search")
          <!--v-select(:items="APIS" item-text="title" item-value="url" v-model="search" label="Search APIs.guru" autocomplete prepend-icon="search")-->
        v-divider
        v-list.pa-0(two-line style="overflow-y: auto; height: calc(100vh - 199px)")
          div(v-for="item in APIS", :key="item.key" v-if="!filter ? true : (item.key.indexOf(filter) > -1 || item.title.indexOf(filter) > -1)")
            v-list-tile(@click="url = item.url" tag="div")
              v-list-tile-content
                v-list-tile-title {{item.title}}
                v-list-tile-sub-title {{item.key}}
            v-divider
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as types from '../store/types'
  import appNavigationDrawer from './AppNavigationDrawer'

  export default {
    components: {
      appNavigationDrawer
    },
    data () {
      return {
        search: null,
        filter: null
      }
    },
    created () {
      this.LOAD_APIS()
    },
    computed: {
      ...mapGetters([
        types.MENU,
        types.IS_API,
        types.URL,
        types.APIS,
        types.PROXY,
        types.IS_DARK,
        types.VERSION
      ]),
      menu: {
        get () { return this.MENU && this.IS_API },
        set (value) {
          this.SET_MENU(!!value)
        }
      },
      url: {
        get () {
          return this.URL
        },
        set (value) {
          this.LOAD_URL(value)
        }
      },
      proxy: {
        get () {
          return this.PROXY
        },
        set (value) {
          this.SET_PROXY(value)
        }
      },
      dark: {
        get () {
          return this.IS_DARK
        },
        set (value) {
          if (value !== this.IS_DARK) {
            this.TOGGLE_DARK()
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_MENU,
        types.SET_PROXY,
        types.TOGGLE_DARK
      ]),
      ...mapActions([
        types.LOAD_URL,
        types.LOAD_APIS
      ])
    },
    watch: {
      search: function (value) {
        this.url = value
      }
    }
  }
</script>
