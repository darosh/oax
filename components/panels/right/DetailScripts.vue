<template lang="pug">
  v-expansion-panel(expand :class="VIEW_DARK ? 'theme--dark' : 'theme--light'")
    v-expansion-panel-content(v-model="exp1", ripple)
      div.subheading(slot="header") Request URL
      v-divider
      v-card.pa-3
        a(:href="url" target="_blank" rel="noopener" class="primary--text wrap") {{url}}
    v-expansion-panel-content(v-for="(script, scriptIndex) in scripts", :key="scriptIndex" v-model="script.exp", ripple)
      div.subheading(slot="header") {{script.title}}
      v-divider
      v-card.pa-3
        pre.app-pre.pa-1 {{script.script}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/types'
  import { configure } from '../../../assets/scripts/specification/methods/execute'
  import axiosScript from '../../../assets/scripts/utils/code-formatters/axios-script'
  import angularScript from '../../../assets/scripts/utils/code-formatters/angular-script'
  // import jqueryScript from '../../models/scripts/jquery-script'
  import url from '../../../assets/scripts/utils/url'

  export default {
    props: ['item'],
    data () {
      return {
        exp1: true
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC,
        types.VIEW_DARK
      ]),
      scripts () {
        return [
          {exp: true, title: 'Axios', script: axiosScript(this.item, this.SPEC)},
          {exp: true, title: 'AngularJS', script: angularScript(this.item, this.SPEC)}
          // {exp: true, title: 'jQuery', script: jqueryScript(this.item, this.SPEC)}
        ]
      },
      config () {
        return configure(this.item, this.SPEC)
      },
      url () {
        return url(this.config)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .wrap
    word-break break-all
</style>
