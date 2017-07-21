<template lang="pug">
  v-btn(small round :class="methods[item] + ' btn--operation elevation-1'") {{item}}
</template>

<script>
  import { MethodStyle } from '../services/method-style'

  export default {
    props: ['item'],
    data () {
      return {
        methods: MethodStyle
      }
    }
  }
</script>

<style lang="stylus">
  .btn.btn--operation
    height 24px;
    min-width 64px
    padding 0
    margin 4px 0

  .btn.btn--operation .btn__content
    padding 0 4px !important
</style>
