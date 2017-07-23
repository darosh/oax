<template lang="pug">
  span.btn.btn--header.secondary {{item}}
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style lang="stylus">
  .btn--header
    height 24px;
    min-width 64px
    padding 0 12px
    margin 4px 0
    border-radius 12px
    text-transform none
</style>
