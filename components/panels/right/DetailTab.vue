<template lang="pug">
  div
    v-tabs(grow v-model="tab", :scrollable="false")
      v-tab(ripple href="#tab-info") Response
      v-tab(ripple href="#tab-params") Request
      v-tab.relative(ripple href="#tab-script") Code
      v-tab.relative(ripple href="#tab-result", :disabled="!operation._._result") Result
    v-divider
    v-tabs-items(v-model="tab")
      v-tab-item#tab-info
        app-info(:item="operation")
      v-tab-item#tab-params
        app-params(:item="operation")
      v-tab-item#tab-script
        app-scripts(:item="operation")
      v-tab-item#tab-result
        app-result(:item="operation")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'

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
        types.UI_SET_DIALOG
      ])
    }
  }
</script>
