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
    transition-group(:name="transitionName" mode="in-out" tag="div")
      div.translate-fade-item.toolbar--scroll(style="overflow-x: hidden", :style="{width: $panel + 'px'}", :key="operation._id")
        app-detail-header(:operation="operation")
        app-detail-tab(:operation="operation")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import appDetailHeader from './DetailHeader'
  import appDetailTab from './DetailTab'
  import layout from '../../mixins/layout'
  import Vue from 'vue'

  export default {
    mixins: [layout],
    props: ['operation'],
    data () {
      return {
        transition: false,
        invert: false
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
      ]),
      transitionName () {
        return this.transition ? (this.invert ? 'translate-fade-invert' : 'translate-fade') : ''
      }
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
      operation (val, oldVal) {
        this.invert = (!val || !oldVal) ? false : (val._id < oldVal._id)
      },
      UI_RIGHT_DRAWER (value) {
        if (value) {
          Vue.nextTick(() => {
            this.transition = true
          })
        } else {
          this.transition = false
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../assets/style/config/variables.styl"

  .translate-fade-enter-active
  .translate-fade-leave-active
  .translate-fade-invert-enter-active
  .translate-fade-invert-leave-active
    position: absolute
    transition: all 0.3s $transition.swing

  .translate-fade-leave-to
    opacity: 0
    transform: translateX(-100%)

  .translate-fade-invert-leave-to
    opacity: 0
    transform: translateX(100%)

  .translate-fade-enter
    opacity: 0
    transform: translateX(100%)

  .translate-fade-invert-enter
    opacity: 0
    transform: translateX(-100%)
</style>
