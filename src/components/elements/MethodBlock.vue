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

<style scoped lang="stylus">
  .deprecated
    opacity 0.5

  .deprecated > span:last-child
    text-decoration line-through

  .operation
    display flex
    flex 1
    width 100%

  .operation--message
    padding-top 6px
    width calc(100% - 64px)

  >>> .param
    opacity 0.87
    background-color rgba(224, 224, 224, 0.75)
    border-radius 4px
    padding 2px 4px
    margin 0 1px 1px 1px
    line-height 22px
    color #000 !important
</style>
