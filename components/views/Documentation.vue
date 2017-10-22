<template lang="pug">
  v-container(fluid).pl-4.pr-4.pa-3-sm
    v-layout(row wrap).stretch Not implemented yet.
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'

  export default {
    components: {
    },
    computed: {
      ...mapGetters([
        types.VIEW_SUMMARY,
        types.SPEC_OPERATIONS,
        types.SPEC_OPERATION,
        types.SPEC
      ])
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_OPERATION
      ])
    }
  }
</script>
