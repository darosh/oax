<template lang="pug">
  div.pt-3.pl-0.pr-0.pb-3
    app-operation.hover--block.pl-3.pr-3(:item="operation", v-ripple="true", @click.native.stop="UI_SET_DIALOG({type: 'method', param: operation._method})")
    .pl-3.pr-3.pt-3(v-if="operation._.summary || operation._.description" v-markdown.summary="operation._")
</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../../../store/types'

  import appOperation from '../../elements/api/MethodBlock'

  import markdown from '../../directives/markdown'

  export default {
    props: ['operation'],
    directives: {
      markdown
    },
    components: {
      appOperation
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DIALOG
      ])
    }
  }
</script>
