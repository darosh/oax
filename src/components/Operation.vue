<template lang="pug">
  div(:class='{deprecated: o.deprecated, operation: true}')
    app-method(v-if='!clickable', :m='o._method')
    app-method(v-else @click.native.stop="setDialog({name: 'method', payload: o._method})", :m='o._method')
    span.operation--message.pl-1 {{o._pathName}}
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    components: {
      appMethod: () => import('./Method')
    },
    props: ['o', 'clickable'],
    methods: {
      ...mapMutations([
        'setDialog'
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
