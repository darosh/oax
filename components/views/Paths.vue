<template lang="pug">
  app-path-chart.ma-3(v-if="SPEC")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'

  import appPathChart from '../elements/api/PathChart'

  export default {
    components: {
      appPathChart
    },
    computed: {
      ...mapGetters([
        types.SPEC
      ])
    }
  }
</script>
