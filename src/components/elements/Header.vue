<template lang="pug">
  span.header--badge.secondary.white--text {{item}}
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style scoped lang="stylus">
  .header--badge
    align-items center
    display inline-flex
    flex 0 1 auto
    font-weight 400
    justify-content flex-start
    text-transform none
    text-decoration none
    position relative
    vertical-align middle
    height 18px
    min-width 32px
    padding 0 9px
    margin 4px 0
    font-size: 13px
    line-height: 12px
    border-radius: 9px
</style>
