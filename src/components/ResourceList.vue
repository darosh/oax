<template lang="pug">
  v-container.pa-0-sm(fluid grid-list-xl)
    v-layout(row wrap)
      v-flex(xs12 sm6 md4 lg3 xl20p v-if="r._._display", v-for="(r, k) in SPEC_RESOURCES", :key="r.name")
        app-resource(:item="SPEC_RESOURCES[k]")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'

  import appResource from './Resource'

  export default {
    components: {
      appResource
    },
    computed: {
      ...mapGetters([
        types.SPEC_RESOURCES
      ])
    }
  }
</script>
