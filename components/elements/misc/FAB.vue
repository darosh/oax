<template lang="pug">
  v-btn(aria-label="Try operation", @click.native.stop="UI_FAB_METHOD && UI_FAB_METHOD()" fab fixed bottom right color="secondary",
  class="white--text fab--on-top",
  :class="{show: UI_FAB, 'fab--on-top--disabled': (UI_FAB_PENDING || !UI_ONLINE)}")
    v-progress-circular(v-if="UI_FAB_PENDING" indeterminate :width="3")
    v-icon(v-if="!UI_FAB_PENDING && UI_ONLINE" ) play_arrow
    v-icon(v-if="!UI_ONLINE && !UI_FAB_PENDING" ) do_not_disturb_alt
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/types'

  export default {
    computed: {
      ...mapGetters([
        types.UI_FAB,
        types.UI_FAB_METHOD,
        types.UI_FAB_PENDING,
        types.UI_ONLINE
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .fab--on-top
    z-index 7
    position fixed !important
    right -64px
    transition right 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) 0s

  .show
    right 24px
    transition right 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) 0.320s

  .fab--on-top.fab--on-top--disabled
    opacity 0.75
    pointer-events none
    box-shadow none

  .fab--second
    bottom 88px
</style>
