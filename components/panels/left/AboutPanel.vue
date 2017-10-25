<template lang="pug">
  div
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="UI_SET_LEFT_DRAWER(false)")
        v-icon close
      v-toolbar-title Contents
    v-list
      v-list-tile(ripple tag="a", :to="{path:'about', hash:i[0]}" v-for="(i, k) in keys", :key="k")
        v-list-tile-action
          v-icon keyboard
        v-list-tile-title {{i[1]}}
      v-list-tile(ripple tag="a", :to="{path:'about', hash:'acknowledgement'}")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-title Acknowledgement

</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../../../store/types'

  export default {
    data () {
      return {
        keys: [
          ['shortcuts', 'Keyboard shortcuts'],
          ['application-shortcuts', 'Application shortcuts'],
          ['editor-shortcuts', 'Editor shortcuts']
        ]
      }
    },
    created () {
      this.UI_SET_LEFT_DRAWER_HALF(false)
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER,
        types.UI_SET_LEFT_DRAWER_HALF
      ])
    }
  }
</script>
