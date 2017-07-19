<template lang="pug">
  v-dialog(v-model='active')
    v-card
      v-card-title
        span.headline Proxy
      v-card-text
        v-text-field(label='URL')
      v-card-actions
        v-spacer
        v-btn(flat @click.native='setDialog') Close
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    computed: {
      active: {
        get () {
          return this.$store.state.dialog.name === 'proxy'
        },
        set (value) {
          if (!value) {
            this.setDialog()
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        'setDialog'
      ])
    }
  }
</script>
