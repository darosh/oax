<template lang="pug">
  div(style="height: 100%; overflow: hidden")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="close")
        v-icon close
      v-toolbar-title Operation
      v-spacer
      v-btn(icon @click.stop="PREV_OPERATION" v-tooltip:left="{html: 'Previous operation'}")
        v-icon skip_previous
      v-btn(icon @click.stop="NEXT_OPERATION" v-tooltip:left="{html: 'Next operation'}")
        v-icon skip_next
      v-btn(icon v-tooltip:left="{html: 'Operation authorization'}")
        v-icon lock_open
    v-divider
    div.toolbar--scroll
      div.pt-3.pl-0.pr-0.pb-3
        app-operation.hover--block.pl-3.pr-3(:item="operation", v-ripple="", @click.native.stop="SET_DIALOG({type: 'method', param: operation._method})")
        .pl-3.pr-3.pt-3(v-if="operation.summary || operation.description" v-markdown.summary="operation")
      //v-divider
      v-tabs.app--tabs(grow v-model="tab", :scrollable="false")
        v-tabs-bar.tabs--transparent
          v-tabs-item(ripple href="tab-info") Info
          v-tabs-item(ripple href="tab-params") Params
          v-tabs-item.relative(ripple href="tab-script") Script
          v-tabs-item.relative(ripple href="tab-result", :disabled="!operation._result") Result
          v-tabs-slider
        v-tabs-items
          v-tabs-content#tab-info
            app-info(:item="operation")
          v-tabs-content#tab-params
            app-params(:item="operation")
          v-tabs-content#tab-script
            app-scripts(:item="operation")
          v-tabs-content#tab-result
            app-result(:item="operation")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'

  import appOperation from '../elements/MethodBlock'
  import appInfo from './DetailInfo'
  import appParams from './DetailParams'
  import appScripts from './DetailScripts'
  import appResult from './DetailResult'

  import markdown from '../../directives/markdown'

  export default {
    props: ['operation'],
    directives: {
      markdown
    },
    components: {
      appOperation,
      appInfo,
      appParams,
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
      close () {
        this.SET_DRAWER(false)
      }
    }
  }
</script>
