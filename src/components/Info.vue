<template lang="pug">
  div
    .subheader(v-if='value.responses && Object.keys(value.responses).length') Response messages
    .pt-2.pb-2
      .relative.response.pl-3.pr-3(@click.stop="emitBus('dialog:status', code)", v-ripple='' v-for='(response, code) in value.responses', :key='code')
        v-btn(small :class="responseStyle[code[0]] + ' btn--response'") {{code}}
        span.response--message.pl-2 {{response.description}}
</template>

<script>
  import { ResponseStyle } from '../services/response-style'
  import { bus } from '../services/bus'

  export default {
    props: ['value'],
    data () {
      return {
        responseStyle: ResponseStyle
      }
    },
    methods: {
      emitBus (e, v) {
        bus.$emit(e, v)
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

  .relative
    position relative

  @import "../../node_modules/vuetify/src/stylus/settings/_theme.styl"

  .response:hover
    background: $material-twelve-percent-dark
    cursor pointer

  .response
    display flex
    flex 1

  .response--message
    padding-top 6px
</style>
