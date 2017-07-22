<template lang="pug">
  div
    div(v-for="script in scripts")
      pre.pl-3.pr-3.pt-3 {{script}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'
  import axiosScript from '../models/scripts/axios-script'

  export default {
    props: ['item'],
    computed: {
      ...mapGetters([
        types.SPEC
      ]),
      scripts () {
        return [
          axiosScript(this.item, this.SPEC)
        ]
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
