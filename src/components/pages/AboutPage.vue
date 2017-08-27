<template lang="pug">
  v-container.pb-3
    h2.pa-3.ma-0 OpenAPI Specification Explorer
    v-divider
    v-layout.ma-3
      .subheading.pt-2 Version {{VERSION}}
      v-spacer
      v-btn.ma-0(flat @click="reload") Reload
    v-divider
    v-layout
      v-flex.pa-3(style="max-width: 260px")
        app-log(v-if="LOADING", :items="LOADING", :log="true")
        app-log(v-else :items="LOG", :log="true")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import appLog from '../Log'

  export default {
    components: {
      appLog
    },
    computed: {
      ...mapGetters([
        types.VERSION,
        types.LOG,
        types.LOADING
      ])
    },
    methods: {
      reload () {
        location.reload()
      }
    }
  }
</script>
