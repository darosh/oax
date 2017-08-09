<template lang="pug">
  v-navigation-drawer.pb-0(temporary v-model="menu")
    v-toolbar
      v-btn(icon @click.stop="SET_MENU()")
        v-icon close
      v-toolbar-title Settings
    .pl-3.pr-3.pt-3
      v-text-field(label="Spec URL" v-model="url" prepend-icon="link")
      v-select(:items="APIS" item-text="title" item-value="url" v-model="search" label="Search APIs.guru" autocomplete prepend-icon="search")
      v-text-field(label="Spec" multi-line :rows="1" prepend-icon="code")
      v-text-field(label="Proxy" v-model="proxy" prepend-icon="security")
    v-list
      v-divider
      v-list-tile(@click="reload()")
        v-list-tile-title Version
        span.body-1 {{VERSION}}
      v-divider
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {},
    data () {
      return {
        search: null
      }
    },
    created () {
      this.LOAD_APIS()
    },
    computed: {
      ...mapGetters([
        types.MENU,
        types.URL,
        types.APIS,
        types.PROXY,
        types.IS_DARK,
        types.VERSION
      ]),
      menu: {
        get () { return this.MENU },
        set (value) { this.SET_MENU(value) }
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
      ]),
      reload () {
        location.reload()
      }
    },
    watch: {
      search: function (value) {
        this.url = value
      }
    }
  }
</script>
