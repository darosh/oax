<template lang="pug">
  v-container.pa-0-sm(fluid grid-list-xl)
    v-layout(row wrap)
      v-flex(xs12 sm6 md4 lg3 v-if="r._display", v-for="(r, k) in RESOURCES", :key="r.name")
        app-resource(:item="RESOURCES[k]")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {
      appResource: () => import('./Resource')
    },
    computed: {
      ...mapGetters([
        types.RESOURCES
      ])
    }
  }
</script>
