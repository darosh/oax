<template lang="pug">
  v-expansion-panel(v-if="item._result" expand :class="IS_DARK ? 'application--dark' : 'application--light'")
    v-expansion-panel-content(v-if="item._result" v-model="exp1", ripple)
      div.subheading(slot="header") Request URL
      v-divider
      v-card.pa-3
        a(:href="item._result.config.url" target="_blank" class="primary--text wrap") {{item._result.config.url}}
    v-expansion-panel-content(v-model="exp2", ripple)
      div.subheading(slot="header") Response status
      v-divider
      v-card.pa-3
        app-response(:code="item._result.status")
        | {{item._result.statusText}}
    v-expansion-panel-content(v-model="exp3", ripple)
      div.subheading(slot="header") Response headers
      v-divider
      v-card.pt-3.pb-3
        div.pl-3.pl-3(v-for="(header, headerName) in item._result.headers", :key="headerName") {{headerName}} {{header}}
    v-expansion-panel-content(v-model="exp4", ripple)
      div.subheading(slot="header") Response body
      v-divider
      v-card.pa-3
        pre {{item._result.data}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    props: ['item'],
    components: {
      appResponse: () => import('./Response')
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
    }
  }
</script>

<style scoped lang="stylus">
  .wrap
    word-break break-all
</style>
