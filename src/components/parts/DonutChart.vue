<template lang="pug">
  v-card.pa-1.mt-0.mb-2.ml-2.mr-2(style="border-radius: 50%", :style="{width: (2*radius + 8)+'px', height: (2*radius + 8)+'px'}")
    svg(:width="2*radius", :height="2*radius" style="display: block")
      g(:transform="'translate('+[radius,radius]+')'")
        text.chart-title(text-anchor="middle" dominant-baseline="middle") {{title}}
        text.chart-subtitle(text-anchor="middle" dominant-baseline="middle" dy="18px") {{subtitle}}
        path(v-for="d in value(p => p[prop])(items.filter(d => d[prop]))", :d="arc(d)", :fill="color(d.data[category])")
</template>

<script>
  import { arc, pie } from 'd3-shape'
  import { scaleOrdinal } from 'd3-scale'
  import sumBy from 'lodash-es/sumBy'
  import round from 'lodash-es/round'
  import { colors } from '../../services/directory/openapi-directory-lite'

  export default {
    props: ['radius', 'title', 'subtitle', 'items', 'prop', 'category', 'inner'],
    methods: {
      value: pie().padAngle(2 * Math.PI / 360).sort(null).value,
      arc: function (d) {
        return arc().outerRadius(this.radius).innerRadius(this.radius * (this.inner ? this.inner : .715)).cornerRadius(1.5)(d)
      },
      color: scaleOrdinal().range(colors.filter((d, i) => i % 2).reverse()),
      sumBy,
      round
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
