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
    div.toolbar--scroll
      transition(name="translate-fade" mode="out-in")
        app-detail-header(:key="operation._id", :operation="operation")
      app-detail-tab(:operation="operation")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import appDetailHeader from './DetailHeader'
  import appDetailTab from './DetailTab'

  export default {
    props: ['operation'],
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
    }
  }
</script>

<style lang="stylus">
  @import "../../../assets/style/_variables.styl"

  .translate-fade-enter-active
    transition: all 0.3s $transition.swing

  .translate-fade-leave-active
    transition: all 0.2s $transition.ease-in-out

  .translate-fade-enter
    opacity: 0

  .translate-fade-leave-active
    opacity: 0

  .translate-fade-enter
    transform: translateX(50%)

  .translate-fade-leave-active
    transform: translateX(-20%)
</style>
