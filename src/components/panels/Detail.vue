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
      div.pt-3.pl-0.pr-0.pb-3
        app-operation.hover--block.pl-3.pr-3(:item="operation", v-ripple="", @click.native.stop="UI_SET_DIALOG({type: 'method', param: operation._method})")
        .pl-3.pr-3.pt-3(v-if="operation._.summary || operation._.description" v-markdown.summary="operation._")
      //v-divider
      v-tabs.app--tabs(grow v-model="tab", :scrollable="false")
        v-tabs-bar.transparent
          v-tabs-item(ripple href="tab-info") Response
          v-tabs-item(ripple href="tab-params") Request
          v-tabs-item.relative(ripple href="tab-script") Code
          v-tabs-item.relative(ripple href="tab-result", :disabled="!operation._._result") Result
          v-tabs-slider
        v-divider
        v-tabs-items(touchless)
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
        types.UI_TAB
      ]),
      tab: {
        // TODO get () { return this.operation._._result ? this.UI_TAB : 'tab-info' },
        get () { return ((this.UI_TAB === 'tab-result') && !this.operation._._result) ? 'tab-info' : this.UI_TAB },
        set (value) { this.UI_SET_TAB(value) }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_TAB,
        types.UI_SET_DIALOG,
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
