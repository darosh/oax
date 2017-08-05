<template lang="pug">
  div.operation(:class="{deprecated: item.deprecated}")
    app-method(:item="item._method")
    .operation--message.pl-1(v-html="params(item._pathName)")
</template>

<script>
  export default {
    components: {
      appMethod: () => import('./Method')
    },
    props: ['item'],
    methods: {
      params (value) {
        return value.replace(/\//g, '/\u200b').replace(/{/g, '<span class="param text-success">').replace(/}/g, '</span>')
      }
    }
  }
</script>

<style lang="stylus">
  .secondary .param
    border-color rgba(255, 255, 255, 0.5) !important
</style>

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
    width calc(100% - 64px)

  >>> .param
    opacity 0.87
    background-color rgba(128, 128, 128, 0.5)
    border-radius 4px
    padding 0 2px
    margin 0 1px
    border 1px solid rgba(160, 160, 160, 0.5)
</style>
