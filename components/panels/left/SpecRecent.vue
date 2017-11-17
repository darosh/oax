<template lang="pug">
  div
    v-divider
    //v-list.pa-0(two-line)
    virtual-scroller.scroller-recent(v-if="RECENT", :items="RECENT", item-height="73" prerender="24", pool-size="292" buffer="292" key-field="url" content-tag="ul" content-class="pa-0 list list--two-line dividers")
      template(slot-scope="props")
        v-list-tile(:key="props.itemKey", ripple avatar @click="clicked(props.item.url)", :to="{path: '/', query: {url: props.item.url}}" exact)
          v-list-tile-avatar
            .icon.white--text(v-if="key(props.item)", :style="{'background-color': color(props.item)}") {{letter(props.item)}}
            v-icon(v-else class="secondary white--text") link
          v-list-tile-content
            v-list-tile-title {{props.item.title}}
            v-list-tile-sub-title {{key(props.item)}}
          v-list-tile-action
            v-btn(icon ripple @click.capture.stop.prevent="RECENT_SET_REMOVE(props.item)")
              v-icon close
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as types from '../../../store/types'
  import keys from '../../mixins/keys'
  import layout from '../../mixins/layout'
  // import VirtualScroller from 'vue-virtual-scroller/src/components/VirtualScroller'
  // import VirtualScroller from 'vue-virtual-scroller'

  export default {
    mixins: [keys, layout],
    // components: {
    //   VirtualScroller
    // },
    computed: {
      ...mapGetters([
        types.RECENT
      ])
    },
    methods: {
      ...mapMutations([
        types.RECENT_SET_REMOVE,
        types.UI_SET_LEFT_DRAWER
      ]),
      ...mapActions([
        types.SPEC_SET_LOAD_URL,
        types.SPEC_SET_EDIT_JSON
      ]),
      clicked (url) {
        this.url = url

        if (this.$vuetify.breakpoint.width < this.$mobile) {
          this.UI_SET_LEFT_DRAWER(false)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../assets/style/config/variables.styl'

  $margin-scroll := 48px

  .scroller-recent
    height 'calc(100vh - %s)' % ($margin-scroll + 64px)

    @media $mobile-portrait
      height 'calc(100vh - %s)' % ($margin-scroll + 56px)

    @media $mobile-landscape
      height 'calc(100vh - %s)' % ($margin-scroll + 48px)
</style>
