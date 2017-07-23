<template lang="pug">
  div.operation(:class="{deprecated: item.deprecated}")
    app-method(:item="item._method")
    span.operation--message.pl-1 {{item._pathName}}
</template>

<script>
  export default {
    components: {
      appMethod: () => import('./Method')
    },
    props: ['item']
  }
</script>

<style scoped lang="stylus">
  .deprecated
    opacity 0.5

  .deprecated > span:last-child
    text-decoration line-through

  .operation
    display flex
    flex 1

  .operation--message
    padding-top 6px
    word-break break-all
</style>
