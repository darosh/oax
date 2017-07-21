<template lang="pug">
  v-container(fluid).pl-4.pr-4
    v-layout(row wrap).stretch
      v-flex(xs12 sm6 md4 lg3 v-ripple="" relative v-if="item._display" v-for="(item, key) in OPERATIONS" :key="item._id" @click="SET_OPERATION(item)").operation--block
        v-divider
        .pt-1.pb-1
          app-operation(:item="OPERATIONS[key]")
          div(v-if="IS_DESCRIPTION")
            .pt-1.pr-1.body-2(style="padding-left: 68px") {{item.description}}
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {
      appOperation: () => import('./Operation')
    },
    computed: {
      ...mapGetters([
        types.IS_DESCRIPTION,
        types.OPERATIONS
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_OPERATION
      ])
    }
  }
</script>

<style lang="stylus">
  .stretch
    align-content stretch

  .relative
    position relative

  @import "../../node_modules/vuetify/src/stylus/settings/_theme.styl"

  .operation--block:hover
    background: $material-twelve-percent-dark
    cursor pointer
</style>
