<template lang="pug">
  div(class="operation")
    app-response(:code="code")
    span.operation--message.pl-1(v-markdown="text")
</template>

<script>
  import appResponse from './Response'

  import markdown from '../../directives/markdown'

  export default {
    directives: {
      markdown
    },
    components: {
      appResponse
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
