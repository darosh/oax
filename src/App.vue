<template lang="pug">
  v-app(:dark="IS_DARK")
    div(style="font-size: 4px; position: absolute; top: 0; font-family: 'Roboto Mono'; font-weight: bold;") :-)
    app-menu
    app-drawer
    app-toolbar
    main
      <!--v-bottom-nav.white(:value="true")-->
        <!--v-btn(flat class="teal&#45;&#45;text")-->
          //span  Description
          //v-icon description
        <!--v-btn(flat class="teal&#45;&#45;text")-->
          //span  Info
          //v-icon info
        <!--v-btn(flat class="teal&#45;&#45;text")-->
          //span  Operations
          //v-icon list
      router-view
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from './store/types'
  import { throttle } from './services/events'

  export default {
    components: {
      appDrawer: () => import('./components/panels/DrawerRight'),
      appMenu: () => import('./components/panels/DrawerLeft'),
      appToolbar: () => import('./components/Toolbar')
    },
    created () {
      throttle('resize', 'resize.lazy', 200)
      window.addEventListener('resize.lazy', this.resized)
      this.resized()
    },
    destroyed () {
      removeEventListener('resize.lazy', this.resized)
    },
    computed: {
      ...mapGetters([
        types.IS_DARK,
        types.MENU
      ]),
      menu: {
        get () { return this.MENU },
        set (value) { this.SET_MENU(value) }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_WIDTH,
        types.SET_MENU
      ]),
      resized () {
        this.SET_WIDTH(window.innerWidth)
      }
    }
  }
</script>

<style lang="css" src="../vendor/vuetify/dist/vuetify.min.css"></style>

<style lang="stylus">
  @import './stylus/index'
</style>
