<template lang="pug">
  div.pt-3.pl-0.pr-0.pb-3
    app-operation.hover--block.pl-3.pr-3(:item="operation", v-ripple="", @click.native.stop="UI_SET_DIALOG({type: 'method', param: operation._method})")
    .pl-3.pr-3.pt-3(v-if="operation._.summary || operation._.description" v-markdown.summary="operation._")
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
        types.UI_SET_DIALOG
      ])
    }
  }
</script>
