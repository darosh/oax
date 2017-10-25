<template lang="pug">
  div(style="height: 100%; overflow: hidden")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="close")
        v-icon close
      v-toolbar-title Operation
      v-spacer
      v-tooltip(left)
        v-btn(slot="activator" icon @click.stop="SPEC_SET_PREV_OPERATION")
          v-icon skip_previous
        span Previous operation
      v-tooltip(left)
        v-btn(slot="activator" icon @click.stop="SPEC_SET_NEXT_OPERATION")
          v-icon skip_next
        span Next operation
      v-tooltip(left)
        v-btn(slot="activator" icon)
          v-icon lock_open
        span Operation authorization
    v-divider
    div.toolbar--scroll(style="overflow-x: hidden")
      transition(:name="transition" mode="out-in")
        div(:key="operation._id")
          app-detail-header(:operation="operation")
          app-detail-tab(:operation="operation")
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import appDetailHeader from './DetailHeader'
  import appDetailTab from './DetailTab'

  export default {
    props: ['operation'],
    data () {
      return {
        transition: ''
      }
    },
    components: {
      appDetailHeader,
      appDetailTab
    },
    computed: {
      ...mapGetters([
        types.SPEC_OPERATIONS,
        types.UI_RIGHT_DRAWER
      ])
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DRAWER,
        types.SPEC_SET_PREV_OPERATION,
        types.SPEC_SET_NEXT_OPERATION
      ]),
      close () {
        this.UI_SET_DRAWER(false)
      }
    },
    watch: {
      UI_RIGHT_DRAWER (value) {
        Vue.nextTick(() => {
          this.transition = value ? 'translate-fade' : ''
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../assets/style/_variables.styl"

  .translate-fade-enter-active
    transition: all 0.15s $transition.swing

  .translate-fade-leave-active
    transition: all 0.05s $transition.ease-in-out

  .translate-fade-enter,
  .translate-fade-leave-active
    opacity: 0

  .translate-fade-enter
    transform: translateX(48px)

  .translate-fade-leave-active
    transform: translateX(-96px)
</style>
