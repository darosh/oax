<template lang="pug">
  div(:class="{deprecated: o.deprecated, operation: true}")
  app-method(:m="o._method")
  |  {{o._pathName}}
</template>

<script>
  export default {
    components: {
      appMethod: () => import('./Method')
    },
    props: ['o']
  }
</script>

<style scoped lang="stylus">
  .deprecated
    text-decoration line-through
</style>
