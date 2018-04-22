<template lang="pug">
  v-expansion-panel(expand :class="VIEW_DARK ? 'theme--dark' : 'theme--light'")
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
  import { ResponseStyle } from '../../../assets/scripts/services/response-style'
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../../store/types'
  import { schema } from '../../../assets/scripts/specification/methods/schema'
  import { execute } from '../../../assets/scripts/specification/methods/execute'

  import appModel from '../../elements/api/Model'
  import appExample from '../../elements/api/Example'
  import appParameter from '../../elements/api/Parameter'
  import appResponseBlock from '../../elements/api/ResponseBlock'

  export default {
    props: ['item'],
    components: {
      appModel,
      appExample,
      appParameter,
      appResponseBlock
    },
    created () {
      this.UI_SET_FAB_METHOD(this.execute)
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
        types.VIEW_DARK
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
