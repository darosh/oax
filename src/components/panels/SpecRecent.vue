<template lang="pug">
  div
    v-divider
    v-list.pa-0(two-line)
      virtual-scroller.scroller-recent(:items="RECENT", item-height="73" prerender="20" key-field="url")
        template(scope="props")
          div(:key="props.itemKey")
            v-list-tile(avatar @click="url = props.item.url", :href="'#/?url=' + encodeURIComponent(props.item.url)")
              v-list-tile-avatar
                .icon.white--text(v-if="key(props.item)", :style="'background-color: ' + getColor({shades: ['400', '300'], text: key(props.item).split(':')[0]})") {{(key(props.item).split(':')[1] || key(props.item).split(':')[0])[0].toUpperCase()}}
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
  import { getColor } from 'random-material-color'
  import Vue from 'vue'
  import test from './../../services/test'
  import focus from '../../directives/focus'

  export default {
    directives: {
      focus
    },
    data () {
      return {
        spec: null,
        keys: {},
        apis: false,
        test
      }
    },
    created () {
      this.LOAD_APIS()
    },
    computed: {
      ...mapGetters([
        types.MENU,
        types.SPEC,
        types.IS_API,
        types.URL,
        types.APIS,
        types.PROXY,
        types.IS_DARK,
        types.RECENT,
        types.JSON
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_MENU,
        types.SET_PROXY,
        types.TOGGLE_DARK,
        types.RECENT_REMOVE
      ]),
      ...mapActions([
        types.LOAD_URL,
        types.LOAD_APIS,
        types.EDIT_JSON
      ]),
      encodeURIComponent,
      getColor,
      key (item) {
        if (this.keys[item.url]) {
          return this.keys[item.url]
        } else {
          const val = !this.APIS ? '?' : ((this.APIS.filter(v => v.url === item.url)[0] || {}).key || '')
          Vue.set(this.keys, item.url, val)

          return this.keys[item.url]
        }
      }
    },
    watch: {
      APIS: function () {
        if (this.apis) {
          return
        }

        this.apis = true
        //        const link = document.createElement('a')

        for (const k in this.keys) {
          if (this.keys[k] === '?') {
            this.keys[k] = (this.APIS.filter(v => v.url === k)[0] || {}).key
            /* || (link.setAttribute('href', k), link.hostname) */
          }
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
