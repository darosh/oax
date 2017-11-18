<template lang="pug">
  v-container(fluid).pl-4.pr-4.pa-3-sm
    .hidden-sm-and-up.mt-2
    //v-divider.hidden-sm-and-up
    v-layout(row wrap :class="{'dividers-bottom': VIEW_SUMMARY && VIEW_PATH}").stretch
      .flex(:style="{'flex-basis': $innerMin(SPEC_OPERATIONS.length), 'max-width': $innerMin(SPEC_OPERATIONS.length)}" v-if="item._._display" v-for="(item, key) in SPEC_OPERATIONS", :key="item._id")
        .hover--block(v-ripple="true" relative, :class="{'secondary white--text': SPEC_OPERATION === SPEC_OPERATIONS[key]}", @click.stop="SPEC_SET_OPERATION(item)")
          //v-divider.hidden-xs-only
          .pt-1.pb-1.plr-3-sm
            app-operation(:sum="!VIEW_PATH", :item="SPEC_OPERATIONS[key]")
            div(v-if="VIEW_SUMMARY && VIEW_PATH && (item._.summary || item._.description)")
              .pt-1.pr-1(style="padding-left: 68px" v-markdown.summary="item._")
          //v-divider.hidden-sm-and-up
    .hidden-sm-and-up.mt-2
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import layout from '../mixins/layout'

  import appOperation from '../elements/api/MethodBlock'

  import markdown from '../../components/directives/markdown'

  export default {
    mixins: [layout],
    directives: {
      markdown
    },
    components: {
      appOperation
    },
    computed: {
      ...mapGetters([
        types.VIEW_SUMMARY,
        types.VIEW_PATH,
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
