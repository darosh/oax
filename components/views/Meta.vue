<template lang="pug">
  v-list.list--single(two-line subheader v-if="!item.stats")
    v-list-tile(avatar :tag="item.link ? 'a' : 'div'", :href="item.link", :target="item.link ? '_blank' : ''", :rel="item.link ? 'noopener' : ''", :ripple="!!(item.link || item.download)", @click.stop="item.dialog ? UI_SET_DIALOG(item.dialog) : null")
      v-list-tile-avatar(:tile="!!item.dialog")
        v-icon.white--text.secondary {{item.icon}}
      v-list-tile-content
        v-list-tile-title {{ item.title }}
        v-list-tile-sub-title
          a(v-if="item.link || item.image || item.download", :href="item.link", :target="item.link ? '_blank' : ''", :rel="item.link ? 'noopener' : ''")
            span(v-if="item.value || item.download") {{item.value || item.download}}
            img(v-if="item.image", :src="item.image", alt)
          span(v-if="item.value && !item.link") {{item.value}}
  v-list.list--single(two-line subheader v-else-if="item.stats.total")
    v-list-tile(avatar)
      v-list-tile-avatar
        app-donut-chart.mt-2(:radius="20", :mini="item.stats.total", :items="stats", prop="value", category="title", :color-class="color")
      v-list-tile-content
        v-list-tile-title {{ item.title }}
        v-list-tile-sub-title {{statsSubtitle}}
</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import appDonutChart from '../elements/misc/DonutChart'
  import { MethodStyle } from '../../assets/scripts/services/method-style'

  export default {
    components: {
      appDonutChart
    },
    props: ['item'],
    computed: {
      stats () {
        if (!this.item.stats) {
          return
        }
        return this.item.stats.chart.map(d => ({title: d[0], value: d[1]}))
      },
      statsSubtitle () {
        if (!this.item.stats) {
          return
        }

        return this.item.stats.chart.map(d => d[0].toUpperCase()).join(', ')
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DIALOG
      ]),
      color (name) {
        return MethodStyle[name]
      }
    }
  }
</script>

<style scoped lang="stylus">
  .list.list--single
    background transparent
    padding 0

  img
    margin-top: 4px

  .avatar--tile .icon
    border-radius: 2px
</style>
