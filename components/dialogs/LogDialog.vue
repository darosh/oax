<template lang="pug">
  v-dialog(max-width="300" v-model="value" hide-overlay persistent)
    v-card
      v-toolbar.transparent.elevation-0
        v-toolbar-title Log
        v-spacer
        v-btn(icon flat @click="log = !log")
          v-icon close
      v-divider
      v-card-text(style="padding-right: 26px;")
        app-log(style="margin-bottom: 24px", v-if="UI_LOADING", :items="UI_LOADING", :log="true")
        app-log(style="margin-bottom: 24px", v-else :items="UI_LOG", :log="true")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import appLog from '../elements/misc/Log'

  export default {
    props: ['value'],
    components: {
      appLog
    },
    computed: {
      ...mapGetters([
        types.UI_LOG,
        types.UI_LOADING
      ])
    }
  }
</script>
