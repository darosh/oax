<template lang="pug">
  div
    v-divider
    div.mt-3.text-xs-center(v-if="!VALIDATOR")
      v-progress-circular(class="primary--text" indeterminate)
    pre.pa-3(v-else) {{VALIDATOR}}
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'

  export default {
    created () {
      this.update()
    },
    methods: {
      ...mapActions([
        types.VALIDATOR_RUN
      ]),
      update () {
        if (this.SPEC_URL) {
          this.VALIDATOR_RUN({url: this.SPEC_URL})
        }
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC_URL,
        types.VALIDATOR
      ])
    },
    watch: {
      SPEC_URL: function () {
        this.update()
      }
    }
  }
</script>
