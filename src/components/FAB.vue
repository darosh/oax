<template lang="pug">
  v-btn(v-if="FAB", @click.native.stop="FAB_METHOD && FAB_METHOD()" fab fixed bottom right secondary :class="'white--text fab--on-top' + (FAB_PENDING ? ' fab--on-top--disabled' : '')")
    v-progress-circular(v-if="FAB_PENDING" indeterminate :width="3")
    v-icon(v-if="!FAB_PENDING" ) play_arrow
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    computed: {
      ...mapGetters([
        types.FAB,
        types.FAB_METHOD,
        types.FAB_PENDING
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .fab--on-top
    z-index 1000
    position fixed !important

  .fab--on-top.fab--on-top--disabled
    opacity 0.75
    pointer-events none
    box-shadow none
</style>
