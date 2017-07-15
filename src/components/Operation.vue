<template>
  <div :class="{deprecated: o.deprecated, operation: true}"><app-method
    :m="o._method"></app-method> {{o._pathName}}</div>
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

  @import "../../node_modules/vuetify/src/stylus/settings/_theme.styl"

  .operation:hover
    background: $material-twelve-percent-dark
    cursor pointer
</style>
