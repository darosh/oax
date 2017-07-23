<template lang="pug">
  div
    v-toolbar
      v-toolbar-title {{operation.tags[0]}}
    v-layout
      v-flex(pt-4 pl-4 pr-4 pb-2)
        app-operation(:item="operation", :clickable="true")
        .subheading.pt-3.pb-2 {{operation.summary}}
    v-tabs.app--tabs(v-model="tab", :scrollable="false")
      v-tabs-bar.tabs--transparent(slot="activators")
        v-tabs-item(ripple href="tab-info") Info
        v-tabs-item.relative(ripple href="tab-script") Script
        v-tabs-item.relative(ripple href="tab-result") Result
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
        get () { return this.TAB },
        set (value) { this.SET_TAB(value) }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_TAB
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .tabs--transparent
    background-color transparent

  .relative
    position relative
</style>
