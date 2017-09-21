<template lang="pug">
  div
    v-divider
    v-list.pa-0(two-line)
      virtual-scroller.scroller-recent(:items="test", item-height="73" prerender="20" key-field="url")
        template(scope="props")
          div(:key="props.itemKey")
            v-list-tile(ripple avatar @click="clicked(props.item.url)", :to="{path: '/', query: {url: props.item.url}}" exact)
              v-list-tile-avatar(v-if="key(props.item)")
                .icon.white--text(:style="{'background-color': color(props.item)}") {{letter(props.item)}}
              v-list-tile-avatar(v-else)
                v-icon(class="secondary white--text") link
              v-list-tile-content
                v-list-tile-title {{props.item.title}}
                v-list-tile-sub-title {{props.item.note}}
              v-list-tile-action(v-if="cache(props.item.url)")
                v-icon file_download
            v-divider
</template>

<script>
  import keys from '../../mixins/keys'
  import test from 'openapi-samples'

  export default {
    mixins: [keys],
    data () {
      return {
        test
      }
    },
    methods: {
      clicked (url) {
        this.url = url

        if (this.UI_WIDTH < 1200) {
          this.UI_SET_LEFT_DRAWER(false)
        }
      }
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
