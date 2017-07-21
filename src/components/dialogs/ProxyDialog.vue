<template lang="pug">
  v-dialog(v-model="active")
    v-card
      v-card-title
        span.headline Proxy
      v-card-text
        v-text-field(label="URL" v-model="proxy")
      v-card-actions
        v-spacer
        v-btn(flat @click.native="SET_DIALOG") Close
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'

  export default {
    computed: {
      ...mapGetters([
        types.DIALOG_IS,
        types.PROXY
      ]),
      active: {
        get () {
          return this.DIALOG_IS('proxy')
        },
        set (value) {
          if (!value) {
            this.SET_DIALOG()
          }
        }
      },
      proxy: {
        get () {
          return this.PROXY
        },
        set (value) {
          this.SET_PROXY(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG,
        types.SET_PROXY
      ])
    }
  }
</script>
