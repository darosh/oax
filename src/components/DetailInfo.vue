<template lang="pug">
  div
    v-expansion-panel.application--light(expand)
      v-expansion-panel-content(v-if="item.description" v-model="exp2", ripple)
        div.subheading(slot="header") Description
        v-divider
        v-card.pl-3.pa-3 {{item.description}}
      v-expansion-panel-content(v-model="exp1")
        div.subheading(slot="header") Response class
        v-divider
        v-card
          v-btn-toggle.pt-2(:items="schemaViews" v-model="schemaView")
          .pl-3.pa-3
            app-model(:item="schema" v-if="schemaView === 'model'")
            app-example(:item="schema" v-else-if="schemaView === 'example'")
      v-expansion-panel-content(v-model="exp3")
        div.subheading(slot="header") Response type
        v-divider
        v-card
          v-select.pt-3.pl-3.pr-3.no-hint(:items="item.produces" v-model="item._produces" single-line)
      v-expansion-panel-content(v-model="exp4")
        div.subheading(slot="header") Parameters
        v-divider
        v-card.pt-2.pb-2
          app-parameter.pl-3.pr-3(:item="parameter" v-for="(parameter, parameterIndex) in item.parameters", :key="parameterIndex")
      v-expansion-panel-content(v-model="exp5")
        div.subheading(slot="header") Response messages
        v-divider
        v-card.pt-2.pb-2
          .relative.response.pl-3.pr-3(@click.stop="SET_DIALOG({type: 'status', param: code})", v-ripple="" v-for="(response, code) in item.responses", :key="code")
            v-btn(small :class="responseStyle[code[0]] + ' btn--response'") {{code}}
            span.response--message.pl-2 {{response.description}}

    <!--.subheader(v-if="item.description") Description-->
    <!--.body-1.pl-3.pr-3(v-if="item.description") {{item.description}}-->
    <!--v-layout.ml-0(row v-if="schema")-->
      <!--.subheader.no-wrap Response class-->
      <!--v-btn-toggle.pt-2(:items="schemaViews" v-model="schemaView")-->
    <!--pre.pl-3.pr-3(v-if="schema")-->
      <!--app-model(:item="schema" v-if="schemaView === 'model'")-->
      <!--app-example(:item="schema" v-else-if="schemaView === 'example'")-->
    <!--.subheader Response type-->
    <!--v-select.pl-3.pr-3.no-hint(:items="item.produces" v-model="item._produces" single-line)-->
    <!--.subheader Parameters-->
    <!--app-parameter.pl-3.pr-3(:item="parameter" v-for="(parameter, parameterIndex) in item.parameters", :key="parameterIndex")-->
    <!--.subheader(v-if="item.responses && Object.keys(item.responses).length") Response messages-->
    <!--.pt-2.pb-2-->
      <!--.relative.response.pl-3.pr-3(@click.stop="SET_DIALOG({type: 'status', param: code})", v-ripple="" v-for="(response, code) in item.responses", :key="code")-->
        <!--v-btn(small :class="responseStyle[code[0]] + ' btn&#45;&#45;response'") {{code}}-->
        <!--span.response&#45;&#45;message.pl-2 {{response.description}}-->
</template>

<script>
  import { ResponseStyle } from '../services/response-style'
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'
  import { schema } from '../models/oas/methods/schema'
  import { execute } from '../models/oas/methods/execute'

  export default {
    props: ['item'],
    components: {
      appModel: () => import('./Model'),
      appExample: () => import('./Example'),
      appParameter: () => import('./Parameter')
    },
    created () {
      this.SET_FAB_METHOD(this.execute)
    },
    data () {
      return {
        responseStyle: ResponseStyle,
        schemaViews: [
          {text: 'Example', value: 'example'},
          {text: 'Model', value: 'model'}
        ],
        schemaView: 'model',
        exp1: true,
        exp2: true,
        exp3: true,
        exp4: true,
        exp5: true
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC
      ]),
      schema () {
        return schema(this.item)
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG,
        types.SET_FAB_METHOD,
        types.SET_TAB,
        types.SET_RESULT,
        types.SET_FAB_PENDING
      ]),
      execute () {
        this.SET_FAB_PENDING(true)
        this.SET_RESULT({operation: this.item, error: null, result: null})
        execute(this.item, this.SPEC).then(res => {
          this.SET_FAB_PENDING(false)
          this.SET_RESULT({operation: this.item, error: null, result: res})
          this.SET_TAB('tab-result')
        }).catch(err => {
          this.SET_FAB_PENDING(false)
          this.SET_RESULT({operation: this.item, error: err, result: null})
        })
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

  .no-hint
    margin-top 0
    margin-bottom 0

  .no-wrap
    white-space nowrap

  .expansion-panel
    box-shadow none
</style>
