<template lang="pug">
  div(:class='{deprecated: item.deprecated, operation: true}')
    app-method(v-if='!clickable', :m='item._method')
    app-method(v-else @click.native.stop="SET_DIALOG({type: 'method', param: item._method})", :m='item._method')
    span.operation--message.pl-1 {{item._pathName}}
</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {
      appMethod: () => import('./Method')
    },
    props: ['item', 'clickable'],
    methods: {
      ...mapMutations([
        types.SET_DIALOG
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .deprecated
    text-decoration line-through

  .operation
    display flex
    flex 1

  .operation--message
    padding-top 6px
    word-break break-all
</style>
