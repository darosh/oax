<template>
  <span :class="{deprecated: o.deprecated}">{{o._method}} {{o._pathName}}</span>
</template>

<script>
  export default {
    props: ['o']
  }
</script>

<style scoped lang="stylus">
  .deprecated
    text-decoration line-through
</style>
