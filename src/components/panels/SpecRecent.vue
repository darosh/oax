<template lang="pug">
  div
    v-divider
    v-list.pa-0(two-line)
      virtual-scroller.scroller-recent(:items="RECENT", item-height="73" prerender="20" key-field="url")
        template(scope="props")
          div(:key="props.itemKey")
            v-list-tile(avatar @click="url = props.item.url", :href="'#/?url=' + encodeURIComponent(props.item.url)")
              v-list-tile-avatar
                .icon.white--text(v-if="key(props.item)", :style="{'background-color': color(props.item)}") {{letter(props.item)}}
                v-icon(v-else class="secondary white--text") link
              v-list-tile-content
                v-list-tile-title {{props.item.title}}
                v-list-tile-sub-title {{key(props.item)}}
              v-list-tile-action
                v-btn(icon ripple @click.capture.stop.prevent="RECENT_REMOVE(props.item)")
                  v-icon close
            v-divider
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as types from '../../store/types'
  import { key, keys, initKeys, color, letter } from '../../services/keys'

  export default {
    data () {
      return {
        keys
      }
    },
    created () {
      this.LOAD_APIS()
    },
    computed: {
      ...mapGetters([
        types.APIS,
        types.RECENT
      ])
    },
    methods: {
      ...mapMutations([
        types.RECENT_REMOVE
      ]),
      ...mapActions([
        types.LOAD_URL,
        types.LOAD_APIS,
        types.EDIT_JSON
      ]),
      encodeURIComponent,
      color,
      key,
      letter
    },
    watch: {
      APIS: initKeys
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../stylus/_variables'

  $margin-recent := 49px

  >>> .scroller-recent
    height 'calc(100vh - %s)' % ($margin-recent + $toolbar-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
      height 'calc(100vh - %s)' % ($margin-recent + $toolbar-mobile-portrait-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
      height 'calc(100vh - %s)' % ($margin-recent + $toolbar-mobile-landscape-height)
</style>
