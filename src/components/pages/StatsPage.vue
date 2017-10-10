<template lang="pug">
  v-container.gpu(v-if="top" style="width: 100%; max-width: 100%")
    div.pa-3
      div.mr-3.mb-3.f-l(style="max-width: 100%")
        v-card
          v-layout.mb-4
            v-select.mt-3.mr-3.ml-4(:items="groupings" v-model="grouping" label="Group by" bottom hide-details style="max-width: 180px")
            v-select.mt-3.mr-4.ml-3(:items="topPicks" v-model="pickTop" label="Pick top" bottom hide-details style="max-width: 80px")
          v-divider
          v-data-table(:headers="topHeaders", :items="top", :hide-actions="top.length <= 10", :must-sort="false", :pagination.sync="page" v-model="selection", item-key="title" select-all :rows-per-page-items="[10, 25, { text: 'All', value: -1 }]")
            template(slot="items" scope="props")
              td
                v-checkbox(color="primary" hide-details v-model="props.selected")
              td(style="white-space: nowrap")
                .legend(:style="{'background-color': color(props.item.title)}")
                | {{props.item.title}}
              td.text-xs-right {{props.item.total}}
              td.text-xs-right {{props.item.tags}}
              td.text-xs-right {{props.item.paths}}
              td.text-xs-right {{props.item.methods}}
              td.text-xs-right {{props.item.definitions}}
        <!--p.mt-2-->
          <!--i Average values per API specification.-->
      app-donut-chart.f-l(title="APIs" prop="total"  category="title", :radius="radius", :items="selected", :subtitle="sumBy(selected, 'total')", :color="color")
      app-donut-chart.f-l(title="Tags" prop="tags"  category="title", :radius="radius", :items="selected", :color="color", :subtitle="sumBy(selected, 'tagsTotal')")
      app-donut-chart.f-l(title="Paths" prop="paths"  category="title", :radius="radius", :items="selected", :color="color", :subtitle="sumBy(selected, 'pathsTotal')")
      app-donut-chart.f-l(title="Endpoints" prop="methods"  category="title", :radius="radius", :items="selected", :color="color", :subtitle="sumBy(selected, 'methodsTotal')")
      app-donut-chart.f-l(title="Definitions" prop="definitions"  category="title", :radius="radius", :items="selected", :color="color", :subtitle="sumBy(selected, 'definitionsTotal')")

      div(style="clear: both")

      div.f-l(style="max-width: 100%")
        v-card
          v-layout.mb-4
            v-select.mt-3.mr-4.ml-4(:items="groupings" v-model="counting" label="Count by" bottom hide-details style="max-width: 180px")
            v-spacer
            .pt-2.mt-3.mr-2.pr-1
              v-btn(flat icon @click="switchColsRows")
                v-icon repeat
          v-divider
          v-data-table.elevation-1(:headers="groupedHeaders", :items="counted", :hide-actions="counted.length <= 10", :must-sort="false", :pagination.sync="pageGrouped")
            template(slot="headerCell" scope="props")
              span(:style="{'border-bottom': props.header.color ? '4px solid ' + color(props.header.text) : null}") {{props.header.text}}
            template(slot="items" scope="props")
              td(style="white-space: nowrap") {{props.item.title}}
              td.text-xs-left(style="white-space: nowrap")
                span.text-xs-right.mr-2(style="margin-bottom: -5px; line-height: 19.5px; min-width: 2em; display: inline-block") {{props.item.total}}
                div(v-for="s in selected" v-if="props.item[nodots(s.title)]", style="display: inline-block; height: 20px; margin-bottom: -5px", :style="{'background-color': color(s.title),width: barHor.domain([0, maxBy(counted, 'total').total])(props.item[nodots(s.title)]) + 'px'}")
              td.text-xs-right(v-for="s in selected") {{props.item[nodots(s.title)] || ''}}

      div(style="clear: both")
</template>

<script>
  import countBy from 'lodash-es/countBy'
  import groupBy from 'lodash-es/groupBy'
  import map from 'lodash-es/map'
  import orderBy from 'lodash-es/orderBy'
  import round from 'lodash-es/round'
  import sum from 'lodash-es/sum'
  import max from 'lodash-es/max'
  import maxBy from 'lodash-es/maxBy'
  import sumBy from 'lodash-es/sumBy'
  import values from 'lodash-es/values'
  import flatten from 'lodash-es/flatten'
  import findIndex from 'lodash-es/findIndex'

  import { scaleLinear } from 'd3-scale'
  import { colors } from '../../services/directory/openapi-directory-lite'
  import axios from 'axios'
  import appDonutChart from '../parts/DonutChart'
  import stats from '../mixins/stats'

  export default {
    mixins: [stats],
    components: {
      appDonutChart
    },
    data () {
      axios.get('https://darosh.github.io/openapi-directory-lite/stats/index.json').then(res => this.data = res.data)

      return {
        barHor: scaleLinear().rangeRound([0, 88 + 88]),
        radius: 92,
        topPicks: [1, 5, 10, 25, {text: 'All', value: Infinity}],
        page: {sortBy: 'total', descending: true, rowsPerPage: 10},
        pageGrouped: {sortBy: 'total', descending: true, rowsPerPage: 10},
        topHeaders: [
          {text: 'Title', value: 'title', align: 'left'},
          {text: 'APIs', value: 'total'},
          {text: 'Tags', value: 'tags'},
          {text: 'Paths', value: 'paths'},
          {text: 'Endpoints', value: 'methods'},
          {text: 'Definitions', value: 'definitions'}
        ]
      }
    },
    computed: {
      color () {
        if (!this.top) {
          return null
        }

        const c = this.top.length <= 3
          ? colors.filter((d, i) => i % 3 % 2)
          : this.top.length <= 7
            ? colors.filter((d, i) => i % 2)
            : colors.slice()

        c.reverse()

        return (name) => {
          const ind = findIndex(this.top, d => d.title === name)
          return ind < colors.length ? c[ind] : '#888'
        }
      },
      groupedHeaders () {
        return [
          {text: 'Title', value: 'title', align: 'left'},
          {text: 'Count', value: 'total', align: 'left'},
          ...this.selected.map(d => ({text: d.title, value: d.title.replace(/\./g, '_'), color: true}))
        ]
      }
    },
    methods: {
      round,
      roundedRatio (val, tot, r) {
        return val ? round(val / tot, r) : null
      },
      max,
      sum,
      values,
      sumBy,
      maxBy,
      prc (part, parts) {
        return part ? round(100 * part / parts) + '%' : ''
      },
      switchColsRows() {
        const temp = this.grouping
        this.grouping = this.counting
        this.counting = temp
      }
    }
  }
</script>

<style lang="stylus">
  .legend
    display inline-block
    width 24px
    height 24px
    line-height 19.5px
    margin-top -4px
    margin-bottom -8px
    margin-right 8px
    border-radius 50%

  .f-l
    float: left
</style>
