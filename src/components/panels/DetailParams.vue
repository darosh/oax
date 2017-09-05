<template lang="pug">
  v-expansion-panel(expand :class="IS_DARK ? 'application--dark' : 'application--light'")
    v-expansion-panel-content(v-model="exp1", ripple)
      div.subheading(slot="header") Settings
      v-divider
      v-card.pt-2.pb-2
        .pl-3.pr-3
          v-select.no-details(:items="SPEC.schemes" v-model="SPEC._._scheme", :disabled="SPEC.schemes.length === 1" label="Scheme")
        .pl-3.pr-3
          v-select.no-details(:items="item.produces" v-model="item._._produces", :disabled="item.produces.length === 1"  label="Response type")
    v-expansion-panel-content(v-model="exp2", ripple)
      div.subheading(slot="header") Parameters
      v-divider
      v-card.pt-2.pb-2
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
  import appParameter from '../Parameter'
  import appResponseBlock from '../elements/ResponseBlock'

  export default {
    props: ['item'],
    components: {
      appModel,
      appExample,
      appParameter,
      appResponseBlock
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
        exp2: true
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
        types.SET_DRAWER,
        types.SET_OPERATION
      ]),
      execute () {
        const item = this.item
        this.SET_FAB_PENDING(true)
        this.SET_RESULT({operation: item, error: null, result: null})
        execute(this.item, this.SPEC).then(res => {
          this.SET_FAB_PENDING(false)
          this.SET_RESULT({operation: item, error: null, result: res})
          this.SET_OPERATION(item)
          this.open()
          this.SET_TAB('tab-result')
        }).catch(err => {
          this.SET_FAB_PENDING(false)
          this.SET_RESULT({operation: item, error: err, result: err.response || err})
          this.SET_OPERATION(item)
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

  .toggle-round
    margin-bottom -19px

  .toggle-round >>> button
    font-size 13px !important
    height 19px !important
    padding 0 4px
    font-family Roboto, sans-serif

  /*
  .toggle-round >>> button:first-child
      border-bottom-left-radius: 14px
      border-top-left-radius: 14px

  .toggle-round >>> button:last-child
      border-bottom-right-radius: 14px
      border-top-right-radius: 14px
  */
</style>
