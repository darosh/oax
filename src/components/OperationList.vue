<template lang="pug">
  v-container(fluid).pl-4.pr-4.pa-3-sm
    v-layout(row wrap).stretch
      v-flex(xs12 sm6 md4 lg3 v-ripple="" relative v-if="item._display" v-for="(item, key) in OPERATIONS", :key="item._id", @click.stop="SET_OPERATION(item)", :class="{'secondary white--text': OPERATION === OPERATIONS[key]}").hover--block
        v-divider
        .pt-1.pb-1
          app-operation(:item="OPERATIONS[key]")
          div(v-if="IS_DESCRIPTION && item.summary")
            .pt-1.pr-1.body-1.md(style="padding-left: 68px" v-html="md(item, 'summary')")
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'

  import appOperation from './elements/MethodBlock'

  import { md } from '../services/md'

  export default {
    components: {
      appOperation
    },
    computed: {
      ...mapGetters([
        types.IS_DESCRIPTION,
        types.OPERATIONS,
        types.OPERATION
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_OPERATION
      ]),
      md
    }
  }
</script>

<style scoped lang="stylus">
  .stretch
    align-content stretch

  .relative
    position relative
</style>
