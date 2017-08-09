<template lang="pug">
  v-navigation-drawer.pb-0(temporary v-model="menu")
    v-toolbar
      v-btn(icon @click.stop="SET_MENU()")
        v-icon close
      v-toolbar-title Settings
    div.pa-3
      v-text-field(label="Spec URL" v-model="url" prepend-icon="link")
      v-select(:items="APIS" item-text="title" item-value="url" v-model="search" label="Search APIs.guru" autocomplete prepend-icon="search")
      v-text-field(label="Spec" multi-line :rows="1" prepend-icon="code")
      v-text-field(label="Proxy" v-model="proxy" prepend-icon="security")
    v-list
      <!--v-list-tile(@click.stop="TOGGLE_DARK")-->
        //v-list-tile-action
          v-icon {{IS_DARK ? 'brightness_5' : 'brightness_4'}}
        //v-list-tile-content
        //  v-list-tile-title Dark theme
        //v-list-tile-action
        //  v-switch(v-model="dark" color="primary" @click.stop="TOGGLE_DARK")
      v-divider
      v-list-tile
        v-list-tile-title Version
        v-list-tile-action {{VERSION}}
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
      ])
    },
    watch: {
      search: function (value) {
        this.url = value
      }
    }
  }
</script>

<style scoped lang="stylus">
  >>> .list__tile__action
    min-width 40px
</style>
