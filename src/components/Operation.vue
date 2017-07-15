<template>
  <span :class="{deprecated: o.deprecated}"><app-method :m="o._method"></app-method> {{o._pathName}}</span>
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
