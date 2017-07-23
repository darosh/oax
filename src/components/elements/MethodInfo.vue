<!--TODO: Unused?-->

<template lang="pug">
  div(:class="{deprecated: item.deprecated, operation: true}")
  app-method(:item="item._method")
  |  {{item._pathName}}
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
    text-decoration line-through
</style>
