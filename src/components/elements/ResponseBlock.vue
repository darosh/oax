<template lang="pug">
  div(class="operation")
    app-response(:code="code")
    span.operation--message.pl-1 {{text}}
</template>

<script>
  export default {
    components: {
      appResponse: () => import('./Response')
    },
    props: ['code', 'text']
  }
</script>

<style scoped lang="stylus">
  .operation
    display flex
    flex 1

  .operation--message
    padding-top 4px
    word-break break-all
</style>
