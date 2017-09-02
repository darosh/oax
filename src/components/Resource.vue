<template lang="pug">
  v-expansion-panel.expansion-panel-round(expand)
    v-expansion-panel-content.relative(v-model="opened", ripple)
      .title(slot="header") {{item.name}}
      v-divider
      v-card
        v-card-title(v-if="item.description" v-markdown="item")
        v-divider(v-if="item.description")
        v-card-text(v-if="item.externalDocs && item.externalDocs.url")
          a(:href="item.externalDocs.url") {{item.externalDocs.description}}
        v-divider(v-if="item.externalDocs && item.externalDocs.url")
        .pt-3.pb-3
          div(v-if="o._._display", v-for="(o, i) in item._operations", :key="o._id")
            .hover--block.relative(v-ripple="", @click.stop="SET_OPERATION(o)", :class="{'secondary white--text': OPERATION === o}")
              app-operation.pl-3.pr-3(:item="o" v-if="IS_ENDPOINT")
              div(v-if="IS_DESCRIPTION")
                .pt-1.pr-3.pb-1(v-if="o._.summary || o._.description" style="padding-left: 84px" v-markdown.summary="o")
                .pl-3.pr-3
                  v-divider(v-if="i < (item._operations.length - 1)")
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'

  import appOperation from './elements/MethodBlock'

  import markdown from '../directives/markdown'

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
        types.IS_DESCRIPTION,
        types.IS_ENDPOINT,
        types.OPERATION
      ]),
      opened: {
        get () { return this.item._._opened },
        set (value) { this.SET_RESOURCE({resource: this.item, opened: value}) }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_OPERATION,
        types.SET_RESOURCE
      ])
    }
  }
</script>
