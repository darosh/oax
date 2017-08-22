<template lang="pug">
  v-container
    h2.pa-3.ma-0 OpenAPI Specification Explorer
    v-divider
    v-layout.ma-3
      .subheading.pt-2 Version {{VERSION}}
      v-spacer
      v-btn.ma-0(flat @click="reload") Reload
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'

  export default {
    computed: {
      ...mapGetters([
        types.VERSION
      ])
    },
    methods: {
      reload () {
        location.reload()
      }
    }
  }
</script>
