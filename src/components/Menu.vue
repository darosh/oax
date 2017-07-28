<template lang="pug">
  v-navigation-drawer.pb-0(temporary v-model="menu")
    v-toolbar
      v-btn(icon @click.stop="SET_MENU()")
        v-icon close
      v-toolbar-title Settings
    div.pa-3
      v-text-field(label="Spec URL" v-model="url")
      v-select(:items="APIS" item-text="title" item-value="url" v-model="search" label="Search APIs.guru" autocomplete)
      v-text-field(label="Spec" multi-line)
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
        types.APIS
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
      }
    },
    methods: {
      ...mapMutations([
        types.SET_MENU
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
</style>
