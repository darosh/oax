<template lang="pug">
  v-dialog(v-model='active')
    v-card
      v-card-title
        span.headline Proxy
      v-card-text
        v-text-field(label='URL')
      v-card-actions
        v-spacer
        v-btn(flat @click.native='active = false') Close
</template>

<script>
  import { bus } from '../services/bus'

  export default {
    data () {
      return {
        active: false
      }
    },
    methods: {
      show () {
        this.active = true
      }
    },
    created () {
      bus.$on('dialog:proxy', this.show)
    },
    destroyed () {
      bus.$off('dialog:proxy', this.show)
    }
  }
</script>
