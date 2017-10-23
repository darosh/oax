<template lang="pug">
  div(:class="mini ? '' : 'pa-1 card ma-3'" style="border-radius: 50%", :style="{width: (2*radius + 8)+'px', height: (2*radius + 8)+'px'}")
    svg(:width="2*radius", :height="2*radius" style="display: block")
      g(:transform="'translate('+[radius,radius]+')'")
        path(v-for="d in value(p => p[prop])(items.filter(d => d[prop]))", :d="arc(d)", :fill="color ? color(d.data[category]) : null", :class="colorClass ? colorClass(d.data[category]) : null")
        text.chart-mini-title(text-anchor="middle" dominant-baseline="middle" dy="1px" v-if="mini") {{mini}}
        text.chart-title(text-anchor="middle" dominant-baseline="middle", :dy="(titles.length > 1 ? 9 : 0) -18 + 'px'" v-if="titles.length > 1") {{titles[0]}}
        text.chart-title(text-anchor="middle" dominant-baseline="middle", :dy="(titles.length > 1 ? 9 : 0) +0 + 'px'") {{titles[1] || titles[0]}}
        text.chart-subtitle(text-anchor="middle" dominant-baseline="middle", :dy="(titles.length > 1 ? 9 : 0) +18 + 'px'") {{subtitle}}
</template>

<script>
  import { format, arc, pie } from '../../../plugins/d3'
  import { sumBy, round } from '../../../plugins/lodash'

  export default {
    props: ['radius', 'title', 'items', 'prop', 'category', 'inner', 'color', 'colorClass', 'noSubtitle', 'mini'],
    methods: {
      arc: function (d) {
        return arc()
          .outerRadius(this.radius)
          .innerRadius(this.radius * (this.inner ? this.inner : 0.715))
          .cornerRadius(this.mini ? 0 : 1.5)(d)
      },
      sumBy,
      round
    },
    computed: {
      value () {
        return pie().padAngle((this.mini ? 9 : 2) * Math.PI / 360).sort(null).value
      },
      titles () {
        return (this.title || '').split(' ')
      },
      subtitle () {
        if (this.mini) {
          return ''
        }

        const sum = sumBy(this.items, (this.prop === 'total') ? this.prop : this.prop + 'Total')
        return sum < 1000 ? sum : format('.2s')(sum)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  text.chart-title
  text.subtitle
  text.chart-mini-title
    font-family: Roboto

  text.chart-title
    font-size: 16px
    font-weight: 500

  text.chart-subtitle
    font-size: 13px
    font-weight: 400

  text.chart-mini-title
    font-size: 11px
    font-weight: 400
</style>
