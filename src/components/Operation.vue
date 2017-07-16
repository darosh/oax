<template>
  <div :class="{deprecated: o.deprecated, operation: true}">
    <app-method v-if="!clickable" :m="o._method"></app-method>
    <app-method v-else @click.native.stop="emitBus('dialog:method', o._method)" :m="o._method"></app-method>
    <span class="operation--message pl-1">{{o._pathName}}</span>
  </div>
</template>

<script>
  import { bus } from '../services/bus'

  export default {
    components: {
      appMethod: () => import('./Method')
    },
    props: ['o', 'clickable'],
    methods: {
      emitBus (e, v) {
        bus.$emit(e, v)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .deprecated
    text-decoration line-through

  .operation
    display flex
    flex 1

  .operation--message
    padding-top 6px
    word-break break-all
</style>
