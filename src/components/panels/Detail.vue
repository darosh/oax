<template lang="pug">
  div(style="height: 100%; overflow: hidden")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-toolbar-title {{operation.tags[0]}}
      v-spacer
      v-btn(icon @click.stop="close")
        v-icon lock_open
      v-btn(icon @click.stop="close")
        v-icon close
    v-divider
    div(style="height: calc(100% - 64px); overflow: auto")
      div.pt-3.pl-0.pr-0.pb-3
        app-operation.hover--block.pl-3.pr-3(:item="operation", v-ripple="", @click.native.stop="SET_DIALOG({type: 'method', param: operation._method})")
        .body-1.md.pl-3.pr-3.pt-3(v-if="operation.summary" v-html="md(operation, 'summary')")
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

  export default {
    props: ['operation'],
    components: {
      appOperation: () => import('../elements/MethodBlock'),
      appInfo: () => import('./DetailInfo'),
      appScripts: () => import('./DetailScripts'),
      appResult: () => import('./DetailResult')
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
        types.SET_DRAWER
      ]),
      md,
      close () {
        this.SET_DRAWER(false)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .tabs--transparent
    background-color transparent

  .app--tabs >>> .tabs__items
    border-width 0 !important

  * >>> pre
    font-family "Roboto Mono", monospace
    font-size 12px

  * >>> .expansion-panel > li
    border-left none
    border-right none
</style>
