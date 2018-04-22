<template lang="pug">
  v-expansion-panel(v-if="item._._result" expand :class="VIEW_DARK ? 'theme--dark' : 'theme--light'")
    v-expansion-panel-content(v-model="exp1", ripple, v-if="item._._error")
      div.subheading(slot="header") {{item._._error.name || 'Error'}}
      v-divider
      v-alert.ma-0(error icon="warning" value="true") {{item._._error.message || item._._error}}
    v-expansion-panel-content(v-model="exp2", ripple, v-if="item._._result.status")
      div.subheading(slot="header") Response status
      v-divider
      v-card.pt-3.pb-3
        .pl-3.pr-3.hover--block(v-ripple="true", @click.stop="UI_SET_DIALOG({type: 'status', param: item._._result.status.toString()})")
          app-response-block(:code="item._._result.status.toString()", :text="item._._result.statusText")
    v-expansion-panel-content(v-model="exp3", ripple, v-if="item._._result.headers")
      div.subheading(slot="header") Response headers
      v-divider
      v-card.pt-3.pb-3
        div.hover--block.pl-3.pr-3(v-for="(header, headerName) in item._._result.headers", :key="headerName" v-ripple="true",
          @click.stop="UI_SET_DIALOG({type: 'header', param: headerName})")
          app-header(:item="headerName")
          span.break {{' ' + header}}
    v-expansion-panel-content(v-if="item._._result.data", v-model="exp4", ripple)
      div.subheading(slot="header") Response body
      v-divider
      v-card.pa-3
        pre.app-pre.pa-1 {{item._._result.data}}
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'

  import appResponseBlock from '../../elements/api/ResponseBlock'
  import appHeader from '../../elements/api/Header'

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
        types.VIEW_DARK
      ])
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DIALOG
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .break
    overflow-wrap break-word
</style>
