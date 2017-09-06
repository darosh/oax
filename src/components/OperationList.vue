<template lang="pug">
  v-container(fluid).pl-4.pr-4.pa-3-sm
    v-layout(row wrap).stretch
      v-flex(xs12 sm6 md4 lg3 xl20p v-ripple="" relative v-if="item._._display" v-for="(item, key) in SPEC_OPERATIONS", :key="item._id", @click.stop="SPEC_SET_OPERATION(item)", :class="{'secondary white--text': SPEC_OPERATION === SPEC_OPERATIONS[key]}").hover--block
        v-divider.hidden-xs-only
        .pt-1.pb-1.plr-3-sm
          app-operation(:item="SPEC_OPERATIONS[key]")
          div(v-if="VIEW_SUMMARY && (item._.summary || item._.description)")
            .pt-1.pr-1(style="padding-left: 68px" v-markdown.summary="item._")
        v-divider.hidden-sm-and-up
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
    computed: {
      ...mapGetters([
        types.VIEW_SUMMARY,
        types.SPEC_OPERATIONS,
        types.SPEC_OPERATION
      ])
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_OPERATION
      ])
    }
  }
</script>
