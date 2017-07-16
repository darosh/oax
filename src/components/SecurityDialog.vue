<template lang="pug">
  v-dialog(v-model='active')
    v-card
      v-card-title
        span.headline Security
      v-card-text
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
      bus.$on('dialog:security', this.show)
    },
    destroyed () {
      bus.$off('dialog:security', this.show)
    }
  }
</script>
