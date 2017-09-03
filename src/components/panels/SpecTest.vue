<template lang="pug">
  div
    v-divider
    v-list.pa-0(two-line)
      virtual-scroller.scroller-recent(:items="test", item-height="73" prerender="20" key-field="url")
        template(scope="props")
          div(:key="props.itemKey")
            v-list-tile(avatar @click="url = props.item.url", :href="'#/?url=' + encodeURIComponent(props.item.url)")
              v-list-tile-avatar(v-if="key(props.item)")
                .icon.white--text(:style="'background-color: ' + getColor({shades: ['400', '300'], text: key(props.item).split(':')[0]})") {{(key(props.item).split(':')[1] || key(props.item).split(':')[0])[0].toUpperCase()}}
              v-list-tile-avatar(v-else)
                v-icon(class="secondary white--text") link
              v-list-tile-content
                v-list-tile-title {{props.item.note}}
                v-list-tile-sub-title {{props.item.title}}
            v-divider
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'
  import { getColor } from 'random-material-color'
  import { key, keys, initKeys } from '../../services/keys'
  import test from './../../services/test'

  export default {
    data () {
      return {
        keys,
        test
      }
    },
    created () {
      this.LOAD_APIS()
    },
    computed: {
      ...mapGetters([
        types.APIS
      ])
    },
    methods: {
      ...mapActions([
        types.LOAD_APIS
      ]),
      encodeURIComponent,
      getColor,
      key
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
