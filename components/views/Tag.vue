<template lang="pug">
  v-expansion-panel.expansion-panel-round(expand :class="{'fast-expansion': SPEC_EXPANDING_ITEMS > 10}")
    v-expansion-panel-content.relative(v-model="opened", ripple)
      .title(slot="header") {{item.name}}
      v-divider
      v-card
        v-card-title(v-if="item._.description" v-markdown="item._")
        v-divider(v-if="item._.description")
        v-card-text(v-if="item.externalDocs && item.externalDocs.url")
          a(:href="item.externalDocs.url" target="_blank" rel="noopener") {{item.externalDocs.description || item.externalDocs.url}}
        v-divider(v-if="item.externalDocs && item.externalDocs.url")
        .pt-3.pb-3
          div(v-if="o._._display", v-for="(o, i) in item._operations", :key="o._id")
            .hover--block.relative(v-ripple="true", @click.stop="SPEC_SET_OPERATION(o)", :class="{'secondary white--text': SPEC_OPERATION === o}")
              app-operation.pl-3.pr-3(:sum="!VIEW_PATH", :item="o")
              div(v-if="VIEW_SUMMARY && VIEW_PATH")
                .pt-1.pr-3.pb-1(v-if="o._.summary || o._.description" style="padding-left: 84px" v-markdown.summary="o._")
                .pl-3.pr-3
                  v-divider(v-if="i < (item._operations.length - 1)")
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'

  import appOperation from '../elements/api/MethodBlock'

  import markdown from '../../components/directives/markdown'

  export default {
    directives: {
      markdown
    },
    components: {
      appOperation
    },
    props: ['item'],
    computed: {
      ...mapGetters([
        types.VIEW_SUMMARY,
        types.VIEW_PATH,
        types.SPEC_OPERATION,
        types.SPEC_EXPANDING_ITEMS
      ]),
      opened: {
        get () { return this.item._._opened },
        set (value) { this.SPEC_SET_RESOURCE({resource: this.item, opened: value}) }
      }
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_OPERATION,
        types.SPEC_SET_RESOURCE
      ])
    }
  }
</script>

<style lang="stylus">
  .fast-expansion
    .expansion-panel__body
      transition none
</style>
