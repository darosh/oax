<template lang="pug">
  v-container
    h2.pt-3.pb-3.ma-0 OpenAPI Specification Explorer
    v-divider
    v-layout.mt-3.mb-3
      v-flex
        .subheading.pt-2 Version {{APP_VERSION}}
      v-spacer
      v-btn.ma-0(flat @click="reload") Reload
    v-divider.mb-3
    h4 Keyboard shotcuts
    h5 Application
    p
      kbd Esc
      |  Log
    h5 API
    p
      kbd Alt
      |  +
      kbd q
      |   Edit
    v-divider.mb-3
    h4 Dependencies
    p This app wouldn be posssible without following packages
    ul.mb-3
      li(v-for="(i, k) in dependencies" v-if="k[0] !== '@'")
        a(:href="'https://www.npmjs.com/package/' + k" target="_blank") {{k}}
    v-divider.mb-3
    h4 Log
    v-layout.pb-3
      v-flex.pt-3.pb-3(style="max-width: 260px")
        app-log(v-if="LOADING", :items="LOADING", :log="true")
        app-log(v-else :items="UI_LOG", :log="true")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import appLog from '../Log'
  import { dependencies } from '../../../package.json'

  export default {
    components: {
      appLog
    },
    data () {
      return {
        dependencies
      }
    },
    computed: {
      ...mapGetters([
        types.APP_VERSION,
        types.UI_LOG,
        types.UI_LOADING
      ])
    },
    methods: {
      reload () {
        location.reload()
      }
    }
  }
</script>
