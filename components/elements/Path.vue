<template lang="pug">
  span.operation--message(v-html="params")
</template>

<script>
  export default {
    props: ['name'],
    computed: {
      params () {
        return this.name.replace(/\//g, '/\u200b').replace(/{/g, '<span class="param text-success">').replace(/}/g, '</span>')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .operation--message
    padding-top 6px
    padding-bottom 4px
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
