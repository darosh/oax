<template lang="pug">
  v-expansion-panel(v-if="item._result" expand :class="IS_DARK ? 'application--dark' : 'application--light'")
    v-expansion-panel-content(v-model="exp1", ripple, v-if="item._error")
      div.subheading(slot="header") {{item._error.name || 'Error'}}
      v-divider
      v-alert.ma-0(error value="true") {{item._error.message || item._error}}
    v-expansion-panel-content(v-model="exp2", ripple, v-if="item._result.status")
      div.subheading(slot="header") Response status
      v-divider
      v-card.pt-3.pb-3
        .pl-3.pr-3.hover--block(v-ripple="", @click.stop="SET_DIALOG({type: 'status', param: item._result.status.toString()})")
          app-response-block(:code="item._result.status.toString()", :text="item._result.statusText")
    v-expansion-panel-content(v-model="exp3", ripple, v-if="item._result.headers")
      div.subheading(slot="header") Response headers
      v-divider
      v-card.pt-3.pb-3
        div.hover--block.pl-3.pr-3(v-for="(header, headerName) in item._result.headers", :key="headerName" v-ripple="",
          @click.stop="SET_DIALOG({type: 'header', param: headerName})")
          app-header(:item="headerName")
          span.break {{' ' + header}}
    v-expansion-panel-content(v-if="item._result.data", v-model="exp4", ripple)
      div.subheading(slot="header") Response body
      v-divider
      v-card.pa-3
        pre.pa-1 {{item._result.data}}
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'

  import appResponseBlock from '../elements/ResponseBlock'
  import appHeader from '../elements/Header'

  export default {
    props: ['item'],
    components: {
      appResponseBlock,
      appHeader
    },
    data () {
      return {
        exp1: true,
        exp2: true,
        exp3: true,
        exp4: true
      }
    },
    computed: {
      ...mapGetters([
        types.IS_DARK
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .break
    overflow-wrap break-word
</style>
