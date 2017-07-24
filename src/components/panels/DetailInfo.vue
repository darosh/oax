<template lang="pug">
  v-expansion-panel(expand :class="IS_DARK ? 'application--dark' : 'application--light'")
    v-expansion-panel-content(v-if="item.description" v-model="exp1", ripple)
      div.subheading(slot="header") Description
      v-divider
      v-card.pa-3 {{item.description}}
    v-expansion-panel-content(v-model="exp2", ripple)
      div.subheading(slot="header") Responses
      v-divider
      v-card.pb-3
        div.pt-3(v-for="(response, code) in item.responses", :key="code")
          .relative.response.hover--block.pl-3.pr-3(@click.stop="SET_DIALOG({type: 'status', param: code})", v-ripple="")
            app-response-block(:code="code", :text="response.description")
          div(v-if="response.schema")
            v-layout.ma-0
              v-spacer
              v-btn-toggle.pt-1(:items="schemaViews" v-model="schemaView")
            pre.ml-3.mr-3.pa-1.mt-1
              app-model(:item="response.schema" v-if="schemaView === 2")
              app-example(:item="response.schema" v-else)
    v-expansion-panel-content(v-model="exp3", ripple)
      div.subheading(slot="header") Parameters
      v-divider
      v-card.pt-2.pb-2
        .pl-3.pr-3
          v-select.no-details(:items="item.produces" v-model="item._produces" label="Response type")
        app-parameter.pl-3.pr-3(:item="parameter" v-for="(parameter, parameterIndex) in item.parameters", :key="parameterIndex")
</template>

<script>
  import { ResponseStyle } from '../../services/response-style'
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import { schema } from '../../models/oas/methods/schema'
  import { execute } from '../../models/oas/methods/execute'

  import appModel from '../Model'
  import appExample from '../Example'

  export default {
    props: ['item'],
    components: {
      appModel,
      appExample,
      appParameter: () => import('../Parameter'),
      appResponseBlock: () => import('../elements/ResponseBlock')
    },
    created () {
      this.SET_FAB_METHOD(this.execute)
    },
    data () {
      return {
        responseStyle: ResponseStyle,
        schemaViews: [
          {text: 'Example', value: 1},
          {text: 'Model', value: 2}
        ],
        schemaViewInternal: 1,
        exp1: true,
        exp2: true,
        exp3: true
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC,
        types.IS_DARK
      ]),
      schema () {
        return schema(this.item)
      },
      schemaView: {
        get () { return this.schemaViewInternal },
        set (value) { this.schemaViewInternal = value || this.schemaViewInternal }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG,
        types.SET_FAB_METHOD,
        types.SET_TAB,
        types.SET_RESULT,
        types.SET_FAB_PENDING,
        types.SET_DRAWER
      ]),
      execute () {
        this.SET_FAB_PENDING(true)
        this.SET_RESULT({operation: this.item, error: null, result: null})
        execute(this.item, this.SPEC).then(res => {
          this.SET_FAB_PENDING(false)
          this.SET_RESULT({operation: this.item, error: null, result: res})
          this.open()
          this.SET_TAB('tab-result')
        }).catch(err => {
          this.SET_FAB_PENDING(false)
          this.SET_RESULT({operation: this.item, error: true, result: err.response})
          this.open()
          this.SET_TAB('tab-result')
        })
      },
      open () {
        this.SET_DRAWER(true)
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
    white-space nowrap

  .no-details >>> .input-group__details
    display none
</style>
