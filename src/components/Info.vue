<template lang="pug">
  div
    .subheader(v-if="item.description") Description
    .body-1.pl-3.pr-3(v-if="item.description") {{item.description}}
    v-layout.ml-0(row)
      .subheader.no-wrap Response class
      v-btn-toggle.pt-2(v-bind:items="schemaSwitch" v-model="item._schema")
    .subheader Response type
    v-select.pl-3.pr-3.no-hint(v-bind:items="item.produces" v-model="item._produces" single-line)
    .subheader Parameters
    .subheader(v-if="item.responses && Object.keys(item.responses).length") Response messages
    .pt-2.pb-2
      .relative.response.pl-3.pr-3(@click.stop="SET_DIALOG({type: 'status', param: code})", v-ripple="" v-for="(response, code) in item.responses", :key="code")
        v-btn(small :class="responseStyle[code[0]] + ' btn--response'") {{code}}
        span.response--message.pl-2 {{response.description}}
</template>

<script>
  import { ResponseStyle } from '../services/response-style'
  import { mapMutations } from 'vuex'
  import * as types from '../store/types'

  export default {
    props: ['item'],
    data () {
      return {
        responseStyle: ResponseStyle,
        schemaSwitch: [
          {text: 'Example', value: 'example'},
          {text: 'Model', value: 'model'}
        ]
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG
      ])
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

  .no-hint
    margin-top 0
    margin-bottom 0

  .no-wrap
    white-space nowrap
</style>
