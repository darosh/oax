<template lang="pug">
  span(:class="methods[item] + ' method--badge white--text'") {{item}}
</template>

<script>
  import { MethodStyle } from '../../../assets/scripts/services/method-style'

  export default {
    props: ['item'],
    data () {
      return {
        methods: MethodStyle
      }
    }
  }
</script>

<style scoped lang="stylus">
  .method--badge
    align-items center
    display inline-flex
    flex 0 1 auto
    font-weight 500
    justify-content center
    text-transform uppercase
    text-decoration none
    position relative
    vertical-align middle
    height 24px
    min-width 64px
    padding 0
    margin 4px 0
    font-size: 13px
    border-radius: 4px
</style>
