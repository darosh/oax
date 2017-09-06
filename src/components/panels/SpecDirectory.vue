<template lang="pug">
  div
    v-divider
    v-layout.pt-3.pb-3.pl-3.pr-3.ma-0.elevation-2.relative
      v-text-field(spellcheck="false" v-hotkey="{'':''}" solo label="Search" v-model="filter" hide-details single-line prepend-icon="search" v-focus.wait="UI_LEFT_DRAWER && value")
    v-list.pa-0(two-line v-if="APIS")
      virtual-scroller.scroller(:items="filtered()", item-height="73" prerender="20", key-field="key")
        template(scope="props")
          div(:key="props.itemKey")
            v-list-tile(ripple avatar @click="url = props.item.url", :href="'#/?url=' + encodeURIComponent(props.item.url)")
              v-list-tile-avatar
                .icon.white--text(:style="{'background-color': color(props.item)}") {{letter(props.item)}}
              v-list-tile-content
                v-list-tile-title {{props.item.title}}
                v-list-tile-sub-title {{props.item.key}}
              v-list-tile-action(v-if="cache(props.item.url), cached[props.item.url]")
                v-icon file_download
            v-divider
</template>

<script>
  import keys from '../../mixins/keys'
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import focus from '../../directives/focus'
  import VListTileAction from 'vuetify/src/components/VList/VListTileAction'
  import VIcon from '../../../node_modules/vuetify/src/components/VIcon/VIcon.vue'

  export default {
    components: {
      VIcon,
      VListTileAction},
    mixins: [keys],
    directives: {
      focus
    },
    props: ['value'],
    data () {
      return {
        filter: null,
        formats: [{text: 'JSON', value: 1}, {text: 'YAML', value: 2}],
        format: 1,
        spec: null
      }
    },
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER
      ]),
      active () {
        return this.UI_LEFT_DRAWER && this.value
      }
    },
    methods: {
      encodeURIComponent,
      filtered () {
        if (!this.filter) {
          return this.APIS
        } else {
          const f = this.filter.toLowerCase()
          return this.APIS.filter(item => {
            return item.key.toLowerCase().indexOf(f) > -1 || item.title.toLowerCase().indexOf(f) > -1
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../stylus/_variables'

  $margin-scroll := 127px

  .scroller
    height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-portrait-height)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-landscape-height)
</style>
