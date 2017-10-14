<template lang="pug">
  v-card.pa-1.ma-3(style="border-radius: 50%", :style="{width: (2*radius + 8)+'px', height: (2*radius + 8)+'px'}")
    svg(:width="2*radius", :height="2*radius" style="display: block")
      g(:transform="'translate('+[radius,radius]+')'")
        path(v-for="d in value(p => p[prop])(items.filter(d => d[prop]))", :d="arc(d)", :fill="color(d.data[category])")
        text.chart-title(text-anchor="middle" dominant-baseline="middle", :dy="(titles.length > 1 ? 9 : 0) -18 + 'px'" v-if="titles.length > 1") {{titles[0]}}
        text.chart-title(text-anchor="middle" dominant-baseline="middle", :dy="(titles.length > 1 ? 9 : 0) +0 + 'px'") {{titles[1] || titles[0]}}
        text.chart-subtitle(text-anchor="middle" dominant-baseline="middle", :dy="(titles.length > 1 ? 9 : 0) +18 + 'px'") {{subtitle}}
</template>

<script>
  import { format } from 'd3-format'
  import { arc, pie } from 'd3-shape'
  import { scaleOrdinal } from 'd3-scale'
  import sumBy from 'lodash-es/sumBy'
  import round from 'lodash-es/round'
  import { colors } from '../../services/directory/openapi-directory-lite'

  export default {
    props: ['radius', 'title', 'items', 'prop', 'category', 'inner', 'color'],
    methods: {
      value: pie().padAngle(2 * Math.PI / 360).sort(null).value,
      arc: function (d) {
        return arc().outerRadius(this.radius).innerRadius(this.radius * (this.inner ? this.inner : .715)).cornerRadius(1.5)(d)
      },
      sumBy,
      round
    },
    computed: {
      titles () {
        return this.title.split(' ')
      },
      subtitle () {
        const sum = sumBy(this.items, (this.prop === 'total') ? this.prop : this.prop + 'Total')
        return sum < 1000 ? sum : format('.2s')(sum)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  text.chart-title
  .subtitle
    font-family: Roboto
    font-size: 16px
    font-weight: 500

  text.chart-subtitle
    font-size: 13px
    font-weight: 400
</style>
