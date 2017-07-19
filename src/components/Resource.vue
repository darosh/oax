<template lang="pug">
  v-expansion-panel(expand)
    v-expansion-panel-content.relative(v-model='value._opened', ripple)
      .title(slot='header') {{value.name}}
      v-divider
      v-card
        v-card-title(v-if='value.description') {{value.description}}
        v-divider(v-if='value.description')
        v-card-text(v-if='value.externalDocs && value.externalDocs.url')
          a(:href='value.externalDocs.url') {{value.externalDocs.description}}
        v-divider(v-if='value.externalDocs && value.externalDocs.url')
        .pt-2.pb-2
          div(v-if='o._display', v-for='(o, i) in value._operations', :key='o._id')
            .operation--block.relative.pt-1(v-ripple='' @click='setOperation(o)')
              app-operation.pl-3.pr-3(:o='o')
              div(v-if='$store.state.view.description')
                .pt-1.pr-3.body-2(style='padding-left: 84px') {{o.description}}
                .pl-3.pr-3.pt-1
                  v-divider(v-if='i < (value._operations.length - 1)')
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    components: {
      appOperation: () => import('./Operation')
    },
    props: ['value'],
    methods: {
      ...mapMutations([
        'setOperation'
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
