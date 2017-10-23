<template lang="pug">
  v-container(fluid grid-list-xl v-if="SPEC").pa-0-sm
    .hidden-sm-and-up.mt-2
    v-layout(row wrap)
      .flex(:style="{'flex-basis': $inner, 'max-width': $inner}", v-for="(definition, key) in SPEC.definitions", :key="key")
        v-card.clickable(v-ripple="true")
          v-card-title(@click.stop="UI_SET_DIALOG({type: 'schema', param: key})").primary--text.mono-title
            b {{key}}
    .hidden-sm-and-up.mt-2
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import layout from '../mixins/layout'

  export default {
    mixins: [layout],
    computed: {
      ...mapGetters([
        types.VIEW_SUMMARY,
        types.SPEC_OPERATIONS,
        types.SPEC_OPERATION,
        types.SPEC
      ])
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_OPERATION,
        types.UI_SET_DIALOG
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .clickable:hover
    cursor pointer
  .mono-title
    font-family "Roboto Mono", monospace
    width 100%
    overflow hidden
    display block
    text-overflow ellipsis
</style>
