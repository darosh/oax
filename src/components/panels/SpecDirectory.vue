<template lang="pug">
  div
    v-divider
    v-layout(style="z-index: 9").pt-3.pb-3.pl-3.pr-0.ma-0.elevation-2.relative
      v-text-field(spellcheck="false" v-hotkey="{'':''}" solo label="Search" v-model="filter" hide-details single-line prepend-icon="search" v-focus.wait="UI_LEFT_DRAWER && value")
      v-btn(icon @click="showFilter = !showFilter")
        v-icon(:primary="showFilter") filter_list
    v-tabs(v-model="tab")
      v-tabs-items
        v-tabs-content#tab-dir-1
          v-toolbar.elevation-0(dense v-if="category && APIS_CATEGORIES")
            v-toolbar-title.subheading(style="margin-top: 2px") {{category === true ? 'Uncategorized' : APIS_CATEGORIES[category].title}}
              <!--div.body-1(style="width: 50%") {{APIS_CATEGORIES[category].description}}-->
            v-spacer
            v-btn(icon @click="category = null")
              v-icon cancel
          v-divider(v-if="category")
          v-list.pa-0(two-line v-if="APIS")
            virtual-scroller.scroller(:class="{filtered: category}", :items="filtered()", item-height="73" prerender="20", key-field="key")
              template(scope="props")
                div(:key="props.itemKey")
                  v-list-tile(ripple avatar @click="clicked(props.item.url)", :href="'#/?url=' + encodeURIComponent(props.item.url)")
                    v-list-tile-avatar
                      .icon.white--text(:style="{'background-color': color(props.item)}") {{letter(props.item)}}
                    v-list-tile-content
                      v-list-tile-title {{props.item.title}}
                      v-list-tile-sub-title {{props.item.key}}
                    v-list-tile-action(v-if="cache(props.item.url), cached[props.item.url]")
                      v-icon file_download
                  v-divider
        v-tabs-content#tab-dir-2.scroller
          v-container(fluid grid-list-sm v-if="APIS")
            v-layout(row wrap)
              v-flex(xs4 d-flex, @click="setCategory(null)")
                div.btn--category(v-ripple="")
                  v-layout.btn--category__layout(column)
                    div.btn--category__background(style="background-color: rgba(128,128,128,.64)")
                    div.btn--category__icon.text-xs-center
                    div.btn--category__counter.pa-1.pl-2.subheading All
                    div.btn--category__text.pa-1.pl-2.subheading.black--text {{APIS.length}}
              v-flex(xs4 v-for="(item, key) in APIS_CATEGORIES", :key="key" d-flex, @click="setCategory(key)")
                div.btn--category(v-ripple="")
                  v-layout.btn--category__layout(column)
                    div.btn--category__background(:style="{'background-color': item.color}")
                    div.btn--category__icon.text-xs-center
                      v-icon(large) {{categories[key]}}
                    div.btn--category__counter.pa-1.pl-2.subheading {{item.title}}
                    div.btn--category__text.pa-1.pl-2.subheading.black--text {{item.count}}
              v-flex(xs4 d-flex, @click="setCategory(true)")
                div.btn--category(v-ripple="")
                  v-layout.btn--category__layout(column)
                    div.btn--category__background(style="background-color: rgba(128,128,128,.64)")
                    div.btn--category__icon.text-xs-center
                    div.btn--category__counter.pa-1.pl-2.subheading Uncategorized
                    div.btn--category__text.pa-1.pl-2.subheading.black--text {{uncategorized}}
</template>

<script>
  import keys from '../../mixins/keys'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import focus from '../../directives/focus'
  import VListTileAction from 'vuetify/src/components/VList/VListTileAction'
  import VIcon from '../../../node_modules/vuetify/src/components/VIcon/VIcon.vue'
  import categories from '../../assets/categories.json'
  import VBtn from '../../../node_modules/vuetify/src/components/VBtn/VBtn.vue'

  export default {
    components: {
      VBtn,
      VIcon,
      VListTileAction
    },
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
        spec: null,
        showFilter: false,
        categories,
        category: null
      }
    },
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER,
        types.UI_WIDTH,
        types.APIS_CATEGORIES
      ]),
      active () {
        return this.UI_LEFT_DRAWER && this.value
      },
      tab: {
        get () {
          return this.showFilter ? 'tab-dir-2' : 'tab-dir-1'
        },
        set () {
        }
      },
      uncategorized () {
        if (this.APIS) {
          return this.APIS.filter(d => !d.categories).length
        }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER
      ]),
      encodeURIComponent,
      filtered () {
        if (!this.filter && !this.category) {
          return this.APIS
        } else {
          return this.APIS.filter(item => {
            if (this.category) {
              if (this.category === true) {
                if (item.categories) {
                  return false
                }
              } else if ((item.categories || []).indexOf(this.category) === -1) {
                return false
              }
            }

            if (this.filter) {
              const f = this.filter.toLowerCase()
              return item.key.toLowerCase().indexOf(f) > -1 || item.title.toLowerCase().indexOf(f) > -1
            }

            return true
          })
        }
      },
      clicked (url) {
        this.url = url

        if (this.UI_WIDTH < 1200) {
          this.UI_SET_LEFT_DRAWER(false)
        }
      },
      setCategory (c) {
        this.category = c
        this.showFilter = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../stylus/_variables'

  $margin-scroll := 127px

  .scroller
    overflow: auto
    height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-height)
    &.filtered
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-height + 50px)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: portrait)
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-portrait-height)
      &.filtered
        height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-portrait-height + 50px)

    @media all and (max-width: $grid-breakpoints.sm) and (orientation: landscape)
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-landscape-height)
      &.filtered
        height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-mobile-landscape-height + 50px)

  .btn--category
    cursor pointer
    border-radius: 2px

  .btn--category__layout
    position: relative
    border-radius: 2px

  .btn--category__background
    height: 72px
    border-radius: 2px

  .btn--category__icon
    display: inline-block
    padding: 8px
    position: absolute
    top: 0

  .btn--category__icon .icon
    color: rgba(255, 255, 255, .96)

  .btn--category__counter
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    line-height: 1.2
    background-color: rgba(255, 255, 255, .42)

  .btn--category__text
    position: absolute
    top: 0
    right: 0
    line-height: 1.2

  .application--dark
    .btn--category__counter
      background-color: rgba(64, 64, 64, .64)
    .btn--category__background
      opacity: .87
    .btn--category__icon .icon
      color: rgba(0, 0, 0, .64)
</style>
