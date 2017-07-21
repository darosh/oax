<template lang="pug">
  v-expansion-panel(expand)
    v-expansion-panel-content.relative(v-model='item._opened', ripple)
      .title(slot='header') {{item.name}}
      v-divider
      v-card
        v-card-title(v-if='item.description') {{item.description}}
        v-divider(v-if='item.description')
        v-card-text(v-if='item.externalDocs && item.externalDocs.url')
          a(:href='item.externalDocs.url') {{item.externalDocs.description}}
        v-divider(v-if='item.externalDocs && item.externalDocs.url')
        .pt-2.pb-2
          div(v-if='o._display', v-for='(o, i) in item._operations', :key='o._id')
            .operation--block.relative.pt-1(v-ripple='' @click='SET_OPERATION(o)')
              app-operation.pl-3.pr-3(:item='o')
              div(v-if='IS_DESCRIPTION')
                .pt-1.pr-3.body-2(style='padding-left: 84px') {{o.description}}
                .pl-3.pr-3.pt-1
                  v-divider(v-if='i < (item._operations.length - 1)')
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {
      appOperation: () => import('./Operation')
    },
    props: ['item'],
    computed: {
      ...mapGetters([
        types.IS_DESCRIPTION
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_OPERATION
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .relative
    position relative

  @import "../../node_modules/vuetify/src/stylus/settings/_theme.styl"

  .operation--block:hover
    background: $material-twelve-percent-dark
    cursor pointer
</style>
