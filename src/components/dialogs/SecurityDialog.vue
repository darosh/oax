<template lang="pug">
  v-dialog(v-model="active")
    v-card
      v-card-title
        span.headline Security
      v-card-text
      v-card-actions
        v-spacer
        v-btn(flat @click.native.stop="SET_DIALOG()") Close
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'

  export default {
    computed: {
      ...mapGetters([
        types.DIALOG_IS
      ]),
      active: {
        get () {
          return this.DIALOG_IS('security')
        },
        set (value) {
          if (!value) {
            this.SET_DIALOG()
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG
      ])
    }
  }
</script>
