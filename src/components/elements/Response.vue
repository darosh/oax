<template lang="pug">
  v-btn(small :class="responseStyle[code[0]] + ' btn--response'") {{code}}
</template>

<script>
  import { ResponseStyle } from '../../services/response-style'

  export default {
    props: ['code'],
    data () {
      return {
        responseStyle: ResponseStyle
      }
    }
  }
</script>

<style lang="stylus">
  .btn--response
    font-family "Roboto Mono", monospace
    height 24px;
    min-width 48px
    padding 0
    margin 4px 0

  .btn.btn--response .btn__content
    padding 0 4px !important
</style>
