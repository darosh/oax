<template>
  <v-btn small round :class="methods[m] + ' btn--operation elevation-1'">{{m}}</v-btn>
</template>

<script>
  import { MethodStyle } from '../services/method-style'

  export default {
    props: ['m'],
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
