<template lang="pug">
  v-container(fluid).pl-4.pr-4.pa-3-sm
    v-layout(row wrap).stretch Not implemented yet.
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'

  import { md } from '../services/md'

  export default {
    components: {
    },
    computed: {
      ...mapGetters([
        types.IS_DESCRIPTION,
        types.OPERATIONS,
        types.OPERATION
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_OPERATION
      ]),
      md
    }
  }
</script>
