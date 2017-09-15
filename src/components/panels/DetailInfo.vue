<template lang="pug">
  v-expansion-panel(expand :class="VIEW_DARK ? 'application--dark' : 'application--light'")
    v-expansion-panel-content(v-if="item._.description" v-model="exp1", ripple)
      div.subheading(slot="header") Description
      v-divider
      v-card.pa-3(v-markdown="item._")
    v-expansion-panel-content(v-model="exp2", ripple)
      div.subheading(slot="header") Responses
      v-divider
      v-card.pb-3
        div.pt-3(v-for="(response, code) in item.responses", :key="code")
          .relative.response.hover--block.pl-3.pr-3(@click.stop="UI_SET_DIALOG({type: 'status', param: code})", v-ripple="")
            app-response-block(:code="code", :text="response._")
          div(v-if="response.headers")
            .hover--block.pl-3.pr-3(v-for="(header, headerName) in response.headers", :key="headerName" v-ripple="", @click.stop="UI_SET_DIALOG({type: 'header', param: headerName})")
              div.pl-3
                app-header(:item="headerName")
                code(v-text="header.format || header.type")
              .markdown.pl-3(v-markdown="header")
          div(v-if="response.schema")
            pre.app-example.app-pre.ml-3.mr-3.pa-1.mt-1
              v-layout.ma-0
                v-spacer
                v-btn-toggle.transparent.pt-0.elevation-0.pr-0.toggle-round(v-model="schemaView" mandatory)
                  v-btn.transparent.elevation-0(v-for="i in schemaViews", :key="i") {{i}}
              app-model(:item="response.schema" v-if="schemaView === 1")
              app-example(:item="response.schema" v-else)
</template>

<script>
  import { ResponseStyle } from '../../services/response-style'
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import { schema } from '../../models/oas/methods/schema'
  import { execute } from '../../models/oas/methods/execute'

  import appModel from '../Model'
  import appExample from '../Example'
  import appResponseBlock from '../elements/ResponseBlock'

  import markdown from '../../directives/markdown'
  import appHeader from '../elements/Header'

  export default {
    props: ['item'],
    directives: {
      markdown
    },
    components: {
      appModel,
      appExample,
      appResponseBlock,
      appHeader
    },
    created () {
      this.UI_SET_FAB_METHOD(this.execute)
    },
    data () {
      return {
        responseStyle: ResponseStyle,
        schemaViews: ['Example', 'Schema'],
        schemaView: 0,
        exp1: true,
        exp2: true
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC,
        types.VIEW_DARK
      ]),
      schema () {
        return schema(this.item)
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DIALOG,
        types.UI_SET_FAB_METHOD,
        types.UI_SET_TAB,
        types.SPEC_SET_RESULT,
        types.UI_SET_FAB_PENDING,
        types.UI_SET_DRAWER,
        types.SPEC_SET_OPERATION
      ]),
      execute () {
        const item = this.item
        this.UI_SET_FAB_PENDING(true)
        this.SPEC_SET_RESULT({operation: item, error: null, result: null})
        execute(this.item, this.SPEC).then(res => {
          this.UI_SET_FAB_PENDING(false)
          this.SPEC_SET_RESULT({operation: item, error: null, result: res})
          this.SPEC_SET_OPERATION(item)
          this.open()
          this.UI_SET_TAB('tab-result')
        }).catch(err => {
          this.UI_SET_FAB_PENDING(false)
          this.SPEC_SET_RESULT({operation: item, error: err, result: err.response || err})
          this.SPEC_SET_OPERATION(item)
          this.open()
          this.UI_SET_TAB('tab-result')
        })
      },
      open () {
        this.UI_SET_DRAWER(true)
      }
    }
  }
</script>

<style scoped lang="stylus">
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

  .response
    display flex
    flex 1

  .response--message
    padding-top 6px

  .no-hint
    margin-top 0
    margin-bottom 0

  .no-wrap
    white-space: nowrap

  .no-details >>> .input-group__details
    display none

  .toggle-round
    margin-bottom -19px
    border-radius: 14px

  .toggle-round >>> button
    font-size 13px !important
    font-weight 500
    height 19px !important
    padding 0 4px
    //box-shadow none
    font-family: Roboto, sans-serif


  .toggle-round >>> button:first-child
    border-bottom-left-radius: 14px
    border-top-left-radius: 14px

  .toggle-round >>> button:last-child
    border-bottom-right-radius: 14px
    border-top-right-radius: 14px

  .app-example >>> .click
    cursor: pointer
    opacity: .64
  .app-example >>> ul
    padding: 0 0 0 16px
  .app-example >>> ul li
    list-style none
</style>
