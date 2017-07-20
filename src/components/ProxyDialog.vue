<template lang="pug">
  v-dialog(v-model='active')
    v-card
      v-card-title
        span.headline Proxy
      v-card-text
        v-text-field(label='URL' v-model="proxy")
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
      },
      proxy: {
        get () {
          return this.$store.state.proxy
        },
        set (value) {
          this.setProxy(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        'setDialog',
        'setProxy'
      ])
    }
  }
</script>
