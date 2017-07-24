<template lang="pug">
  div
    v-toolbar
      v-toolbar-title {{operation.tags[0]}}
      v-spacer
      v-btn(icon @click.stop="close")
        v-icon close
    v-layout
      v-flex(pt-3 pl-0 pr-0 pb-3)
        app-operation.hover--block.pl-3.pr-3(:item="operation", v-ripple="", @click.native.stop="SET_DIALOG({type: 'method', param: operation._method})")
        .body-1.pl-3.pr-3.pt-3(v-if="operation.summary") {{operation.summary}}
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
    border-width 1px 0 0 0 !important
</style>
