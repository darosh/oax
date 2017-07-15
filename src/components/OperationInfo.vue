<template>
  <div :class="{deprecated: o.deprecated, operation: true}">
    <app-method :m="o._method"></app-method> {{o._pathName}}
  </div>
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
