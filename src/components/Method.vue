<template>
  <v-btn small :class="methods[m]">{{m}}</v-btn>
</template>

<script>
  import { Methods } from '../services/Methods'

  export default {
    props: ['m'],
    data () {
      return {
        methods: Methods
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
