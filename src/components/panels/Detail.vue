<template lang="pug">
  div(style="height: 100%; overflow: hidden")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="close")
        v-icon close
      v-spacer
      v-btn(icon @click.stop="PREV_OPERATION" v-tooltip:left="{html: 'Previous operation'}")
        v-icon skip_previous
      v-btn(icon @click.stop="NEXT_OPERATION" v-tooltip:left="{html: 'Next operation'}")
        v-icon skip_next
      v-btn(icon v-tooltip:left="{html: 'Operation authorization'}")
        v-icon lock_open
    v-divider
    div(style="height: calc(100% - 64px); overflow: auto")
      div.pt-3.pl-0.pr-0.pb-3
        app-operation.hover--block.pl-3.pr-3(:item="operation", v-ripple="", @click.native.stop="SET_DIALOG({type: 'method', param: operation._method})")
        .body-1.md.pl-3.pr-3.pt-3(v-if="operation.summary" v-html="md(operation, 'summary')")
      //v-divider
      v-tabs.app--tabs(v-model="tab", :scrollable="false")
        v-tabs-bar.tabs--transparent(slot="activators")
          v-tabs-item(ripple href="tab-info") Info
          v-tabs-item.relative(ripple href="tab-script") Script
          v-tabs-item.relative(ripple href="tab-result", :disabled="!operation._result") Result
          v-tabs-slider
        v-tabs-content#tab-info
          app-info(:item="operation")
        v-tabs-content#tab-script
          app-scripts(:item="operation")
        v-tabs-content#tab-result
          app-result(:item="operation")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'

  import { md } from '../../services/md'

  import appOperation from '../elements/MethodBlock'
  import appInfo from './DetailInfo'
  import appScripts from './DetailScripts'
  import appResult from './DetailResult'

  export default {
    props: ['operation'],
    components: {
      appOperation,
      appInfo,
      appScripts,
      appResult
    },
    computed: {
      ...mapGetters([
        types.TAB
      ]),
      tab: {
        get () { return this.operation._result ? this.TAB : 'tab-info' },
        set (value) { this.SET_TAB(value) }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_TAB,
        types.SET_DIALOG,
        types.SET_DRAWER,
        types.PREV_OPERATION,
        types.NEXT_OPERATION
      ]),
      md,
      close () {
        this.SET_DRAWER(false)
      }
    }
  }
</script>

<style scoped lang="stylus">
  * >>> .expansion-panel > li
    border-left none
    border-right none
</style>
