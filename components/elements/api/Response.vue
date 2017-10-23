<template lang="pug">
  span(:class="'response--badge white--text ' + responseStyle[code[0]]") {{code}}
</template>

<script>
  import { ResponseStyle } from '../../../assets/scripts/services/response-style'

  export default {
    props: ['code'],
    data () {
      return {
        responseStyle: ResponseStyle
      }
    }
  }
</script>

<style scoped lang="stylus">
  .response--badge
    align-items center
    display inline-flex
    flex 0 1 auto
    font-weight 500
    font-family "Roboto Mono", monospace
    justify-content center
    text-decoration none
    position relative
    vertical-align middle
    height 20px
    min-width 42px
    padding 0 6px
    margin 4px 0
    font-size: 13px
    border-radius: 10px
</style>
