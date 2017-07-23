<template lang="pug">
  v-expansion-panel(expand :class="IS_DARK ? 'application--dark' : 'application--light'")
    v-expansion-panel-content(v-for="(script, scriptIndex) in scripts", :key="scriptIndex" v-model="script.exp", ripple)
      div.subheading(slot="header") {{script.title}}
      v-divider
      v-card.pa-3
        pre.pa-1 {{script.script}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import axiosScript from '../../models/scripts/axios-script'
  import angularScript from '../../models/scripts/angular-script'
  import jqueryScript from '../../models/scripts/jquery-script'

  export default {
    props: ['item'],
    computed: {
      ...mapGetters([
        types.SPEC,
        types.IS_DARK
      ]),
      scripts () {
        return [
          {exp: true, title: 'Axios', script: axiosScript(this.item, this.SPEC)},
          {exp: true, title: 'Angular', script: angularScript(this.item, this.SPEC)},
          {exp: true, title: 'jQuery', script: jqueryScript(this.item, this.SPEC)}
        ]
      }
    }
  }
</script>
