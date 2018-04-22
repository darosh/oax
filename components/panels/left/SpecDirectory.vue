<template lang="pug">
  div
    v-divider
    v-layout(style="z-index: 9").pt-3.pb-3.pl-3.pr-3.ma-0.elevation-2.relative
      v-text-field.mr-2(spellcheck="false" solo label="Search" v-model="filter" hide-details single-line prepend-icon="search", :append-icon="filter ? 'close' : null", :append-icon-cb="() => filter = null" v-focus.wait="UI_LEFT_DRAWER && value")
      v-menu(bottom left)
        v-btn.ml-1.mr-0(aria-label="Select directory" slot="activator" icon)
          v-icon {{'numeric_' + collection + '_box'}}
        v-list(subheader two-line)
          v-subheader API Collection
          v-list-tile(@click="collection = k + 1" ripple avatar v-for="(d, k) in configuration.directory", :key="k")
            v-list-tile-avatar(:tile="collection === (k+1)")
              .icon.white--text(:class="collection !== (k+1) ? 'secondary' : 'primary'") {{k+1}}
            v-list-tile-content
              v-list-tile-title {{directory[d].title}}
              v-list-tile-sub-title {{directory[d].subTitle}}
      v-tooltip(left)
        v-btn.ml-1.mr-0(aria-label="Search in specifications" slot="activator" v-if="APIS_COLLECTION_OBJECT.fullText" icon @click="fullText = !fullText")
          v-icon(:color="fullText ? 'primary' : null") file_find
        span Search in specifications
      v-tooltip(left)
        v-btn.ml-1.mr-0(aria-label="Filter categories" slot="activator" v-if="APIS_COLLECTION_OBJECT.categories" icon @click="showFilter = !showFilter")
          v-icon(:color="showFilter ? 'primary' : null") {{category ? 'filter_list' : 'filter_outline'}}
        span Filter categories
    .pt-3.text-xs-center(v-if="!APIS")
      v-progress-circular(class="primary--text" indeterminate)
    v-tabs-items(v-model="tab")
      v-tab-item#tab-dir-1
        v-toolbar.elevation-0(dense v-if="category && APIS_CATEGORIES")
          v-toolbar-title.subheading(style="margin-top: 2px") {{category === true ? 'Unclassified' : APIS_CATEGORIES[category].title}}
            <!--div.body-1(style="width: 50%") {{APIS_CATEGORIES[category].description}}-->
          v-spacer
          v-btn(icon @click="category = null")
            v-icon cancel
        v-divider(v-if="category")
        <!--v-list.pa-0(two-line v-if="APIS")-->
        virtual-scroller.scroller(v-if="APIS", :class="{filtered: category}", :items="filtered", item-height="73" prerender="24", pool-size="292" buffer="292" key-field="key" content-tag="ul" content-class="pa-0 list list--two-line dividers")
          template(slot-scope="props")
            .pt-2.text-xs-center(v-if="props.itemKey === last", :key="props.itemKey")
              v-progress-circular(class="primary--text" indeterminate )
              .hidden(:dummy="APIS_RUN_LOAD({next: true, searchText: filter})")
            v-list-tile(v-else :key="props.itemKey" ripple avatar @click="clicked(props.item.url)", :to="{path: '/', query: {url: props.item.url}}" exact)
              v-list-tile-avatar
                v-icon(v-if="props.item.categories && icon(props.item)", class="white--text", :style="{'background-color': color(props.item)}") {{icon(props.item)}}
                .icon.white--text(v-else :style="{'background-color': color(props.item)}") {{letter(props.item)}}
              v-list-tile-content
                v-list-tile-title.main--text {{props.item.title}}
                v-list-tile-sub-title {{props.item.key}}
              v-list-tile-action(v-if="cache(props.item.url), cached[props.item.url]")
                v-icon file_download
      v-tab-item#tab-dir-2.scroller(v-if="APIS_COLLECTION_OBJECT.categories")
        v-container.pa-2(fluid grid-list-md v-if="APIS")
          v-layout(row wrap)
            v-flex(:style="{'flex-basis': mini, 'max-width': mini}",  d-flex, @click="setCategory(null)")
              v-card.btn--category(v-ripple="true")
                div.btn--category__background(style="background-color: rgba(128,128,128,.64)")
                div.btn--category__icon.text-xs-center
                div.btn--category__counter.pa-1.pl-2.subheading All
                div.btn--category__text.pa-1.pl-2.subheading.white--text {{APIS.length}}
            v-flex(:style="{'flex-basis': mini, 'max-width': mini}", v-for="(item, key) in APIS_CATEGORIES", :key="key" d-flex, @click="setCategory(key)")
              v-card.btn--category(v-ripple="true")
                div.btn--category__background(:style="{'background-color': item.color}")
                div.btn--category__icon.text-xs-center
                  v-icon(v-if="categories[key]" large) {{categories[key]}}
                div.btn--category__counter.pa-1.pl-2.subheading {{item.title}}
                div.btn--category__text.pa-1.pl-2.subheading.black--text {{item.count}}
            v-flex(v-if="APIS_COLLECTION_OBJECT.unclassified", :style="{'flex-basis': mini, 'max-width': mini}", d-flex, @click="setCategory(true)")
              v-card.btn--category(v-ripple="true")
                div.btn--category__background(style="background-color: rgba(128,128,128,.64)")
                div.btn--category__icon.text-xs-center
                div.btn--category__counter.pa-1.pl-2.subheading Unclassified
                div.btn--category__text.pa-1.pl-2.subheading.white--text {{uncategorized}}
</template>

<script>
  import keys from '../../mixins/keys'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import focus from '../../directives/focus'
  import categories from '../../../assets/data/categories.json'
  import worker from '../../../assets/worker'
  import { configuration } from '../../../assets/scripts/services/configuration'
  import * as directory from '../../../assets/scripts/services/directory'
  import layout from '../../mixins/layout'
  // import VirtualScroller from 'vue-virtual-scroller/src/components/VirtualScroller'
  // import VirtualScroller from 'vue-virtual-scroller'

  export default {
    mixins: [keys, layout],
    directives: {
      focus
    },
    // components: {
    //   VirtualScroller
    // },
    props: ['value'],
    data () {
      return {
        configuration,
        directory,
        filter: '',
        formats: [{text: 'JSON', value: 1}, {text: 'YAML', value: 2}],
        format: 1,
        spec: null,
        showFilter: false,
        fullText: false,
        fullTextInitialized: false,
        fullTextResult: null,
        categories,
        category: null,
        last: null
      }
    },
    computed: {
      ...mapGetters([
        types.UI_LEFT_DRAWER,
        types.APIS_CATEGORIES,
        types.APIS_COLLECTION,
        types.APIS_COLLECTION_OBJECT
      ]),
      mini () {
        return (100 / Math.round(Math.max(3, (this.$panelLeft / 150)))) + '%'
      },
      active () {
        return this.UI_LEFT_DRAWER && this.value
      },
      tab: {
        get () {
          return (this.showFilter && this.APIS_COLLECTION_OBJECT.categories) ? 'tab-dir-2' : 'tab-dir-1'
        },
        set () {
        }
      },
      uncategorized () {
        if (this.APIS) {
          return this.APIS.filter(d => !d.categories).length
        }
      },
      collection: {
        get () {
          return this.APIS_COLLECTION
        },
        set (value) {
          return this.APIS_SET_COLLECTION(value)
        }
      },
      filtered () {
        if (!this.category &&
          (!this.filter || (this.fullTextResult && (this.fullTextResult.length === this.APIS.length)))) {
          this.last = this.APIS_COLLECTION_OBJECT.next ? this.APIS[this.APIS.length - 1].key : null
          return this.APIS
        } else {
          if (this.fullTextResult && this.APIS_COLLECTION_OBJECT.fullText) {
            const items = this.fullTextResult.map(d => this.APIS[d])

            return !this.category ? items : items.filter(item => {
              if (this.category === true) {
                if (item.categories) {
                  return false
                }
              } else if ((item.categories || []).indexOf(this.category) === -1) {
                return false
              }

              return true
            })
          } else {
            if (this.APIS_COLLECTION_OBJECT.search) {
              this.last = this.APIS_COLLECTION_OBJECT.next ? this.APIS[this.APIS.length - 1].key : null
              return this.APIS
            }

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
        }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER,
        types.APIS_SET_COLLECTION
      ]),
      icon (item) {
        return categories[(item.categories.length > 1 && item.categories[0] === 'cloud') ? item.categories[1] : item.categories[0]]
      },
      clicked (url) {
        this.url = url

        if (this.$vuetify.breakpoint.width < this.$mobile) {
          this.UI_SET_LEFT_DRAWER(false)
        }
      },
      setCategory (c) {
        this.category = c
        this.showFilter = false
        this.fullTextResult = null
      }
    },
    watch: {
      fullText (value) {
        if (value && !this.fullTextInitialized && !this.filter) {
          worker({searchSpecs: ''}).then(() => {
            this.fullTextInitialized = true
          })
        } else if (!value) {
          this.fullTextResult = null
        } else if (this.filter) {
          worker({searchSpecs: this.filter}).then(res => (this.fullTextResult = Object.freeze(res.found)))
        }
      },
      filter (value) {
        if (this.fullText && this.APIS_COLLECTION_OBJECT.fullText) {
          worker({searchSpecs: value}).then(res => (this.fullTextResult = Object.freeze(res.found)))
        } else if (this.APIS_COLLECTION_OBJECT.search) {
          this.APIS_RUN_LOAD({searchText: this.filter})
        }
        // TODO: this is markdown print for OAD categorization
        // console.log(this.filtered.map(f => `[${f.title}](https://darosh.github.io/oax/#/?url=${encodeURIComponent(f.url)})|${f.key.split(':')[0]}|${f.key.split(':')[1] || ' '}| | `).join('\n'))
      },
      collection () {
        this.category = null
        this.APIS_RUN_LOAD({searchText: this.filter})
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../assets/style/config/variables.styl'

  $margin-scroll := (80 + 48) px

  .scroller
    overflow: auto
    height 'calc(100vh - %s)' % ($margin-scroll + 64px)
    &.filtered
      height 'calc(100vh - %s)' % ($margin-scroll + $toolbar-height + 50px)

    @media $mobile-portrait
      height 'calc(100vh - %s)' % ($margin-scroll + 56px)
      &.filtered
        height 'calc(100vh - %s)' % ($margin-scroll + 56px + 50px)

    @media $mobile-landscape
      height 'calc(100vh - %s)' % ($margin-scroll + 48px)
      &.filtered
        height 'calc(100vh - %s)' % ($margin-scroll + 48px + 50px)

  .btn--category
    cursor pointer
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
    fill: rgba(255, 255, 255, .96)

  .btn--category__counter
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    line-height: 1.2
    background-color: rgba(255, 255, 255, .42)
    border-bottom-left-radius: 2px
    border-bottom-right-radius: 2px

  .btn--category__text
    position: absolute
    top: 0
    right: 0
    line-height: 1.2

  .theme--dark
    .btn--category__counter
      background-color: rgba(64, 64, 64, .64)
    .btn--category__icon .icon
      color: rgba(0, 0, 0, .64)
      fill: rgba(0, 0, 0, .64)

  /*.btn--category__background*/
  /*opacity: .87*/
</style>
