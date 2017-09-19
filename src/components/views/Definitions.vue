<template lang="pug">
  v-container(fluid grid-list-xl v-if="SPEC").pl-4.pr-4.pa-3-sm
    v-layout(row wrap).stretch
      v-flex(xs12 sm6 md4 lg3 xl20p, v-for="(definition, key) in SPEC.definitions", :key="key")
        v-card.primary.clickable(v-ripple="" , @click.stop="UI_SET_DIALOG({type: 'schema', param: key})")
          v-card-title.white--text.mono-title
            b {{key}}
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'

  export default {
    components: {
    },
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
