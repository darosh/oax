<template lang="pug">
  v-container.pa-0-sm.gpu(v-if="top" style="width: 100%; max-width: 100%")
    div.pa-2.pa-0-sm
      div.pa-3.f-l(style="max-width: 100%")
        v-card
          v-layout.mb-4
            v-select.mt-3.mr-3.ml-4(:items="groupings" v-model="grouping" label="Group by" bottom hide-details style="max-width: 180px")
            v-select.mt-3.mr-4.ml-3(:items="topPicks" v-model="pickTop" label="Pick top" bottom hide-details style="max-width: 80px")
          v-divider
          v-data-table(:headers="topHeaders", :items="top", :hide-actions="top.length <= 10", :must-sort="false", :pagination.sync="page" v-model="selection", item-key="title" select-all :rows-per-page-items="[10, 25, { text: 'All', value: -1 }]")
            template(slot="items" slot-scope="props")
              td
                v-checkbox(color="primary" hide-details v-if="props" v-model="props.selected")
              td(style="white-space: nowrap")
                .legend(:style="{'background-color': color(props.item.title)}")
                | {{props.item.title}}
              td.text-xs-right {{props.item.total}}
              td.text-xs-right {{props.item.tags}}
              td.text-xs-right {{props.item.paths}}
              td.text-xs-right {{props.item.methods}}
              td.text-xs-right {{props.item.definitions}}
      app-donut-chart.f-l(title="APIs" prop="total"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Tags" prop="tags"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Paths" prop="paths"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Operations" prop="methods"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Definitions" prop="definitions"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Summaries" prop="summaries"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Descriptions" prop="descriptions"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Summary size" prop="summaryLengths"  category="title", :radius="radius", :items="selected", :color="color")
      app-donut-chart.f-l(title="Description size" prop="descriptionLengths"  category="title", :radius="radius", :items="selected", :color="color")

      div(style="clear: both")

      div.pa-3.f-l(style="max-width: 100%")
        v-card
          v-layout.mb-4
            v-select.mt-3.mr-4.ml-4(:items="groupings" v-model="counting" label="Count by" bottom hide-details style="max-width: 180px")
            v-spacer
            .pt-2.mt-3.mr-2.pr-1
              v-btn.mt-1.mb-0(flat icon @click="switchColsRows")
                v-icon repeat
          v-divider
          v-data-table(:headers="groupedHeaders", :items="counted", :hide-actions="counted.length <= 10", :must-sort="false", :pagination.sync="pageGrouped")
            template(slot="headerCell" slot-scope="props")
              span(:style="{'border-bottom': props.header.color ? '4px solid ' + color(props.header.text) : null}") {{props.header.text}}
            template(slot="items" slot-scope="props")
              td(style="white-space: nowrap") {{props.item.title}}
              td.text-xs-left(style="white-space: nowrap")
                span.text-xs-right.mr-2(style="margin-bottom: -5px; line-height: 19.5px; min-width: 2em; display: inline-block") {{props.item.total}}
                div(v-for="s in selected" v-if="props.item[s.prop]", style="display: inline-block; height: 20px; margin-bottom: -5px", :style="{'background-color': color(s.title),width: barHor.domain([0, maxBy(counted, 'total').total])(props.item[s.prop]) + 'px'}")
              td.text-xs-right(v-for="s in selected") {{props.item[s.prop] || ''}}

      div.pa-3.f-l(v-if="histogram" style="max-width: 100%")
        v-card
          v-layout.mb-4
            v-select.mt-3.mr-4.ml-4(:items="binPicks" v-model="histogramBins" label="Histogram bins" bottom hide-details style="max-width: 180px")
          v-divider
          .table__overflow
            table.pa-3
              tbody
                tr(v-for="(r, j) in histogram")
                  td.pa-0.pr-1.text-xs-center(style="white-space: nowrap; line-height: 13px; font-size: 12px")
                    span(:style="{opacity: r[0] ? 1 : 0.36}")
                      span(v-if="r.x0 !== r.x1 - (j < (histogram.length - 1) ? 1 : 0)") {{r.x0}}&ndash;{{r.x1 - (j < (histogram.length - 1) ? 1 : 0)}}
                      span(v-else) {{r.x0}}
                  td.pa-0.pr-2.text-xs-right(style="line-height: 13px; font-size: 12px") {{r.histMax ? r.histMax : ''}}
                  td.pa-0.pr-1.text-xs-right(style="line-height: 13px; font-size: 12px") {{r.histMax ? round(100 * r.histMax / histogram.histMax) + '%' : ''}}
                  td.pa-0
                    svg(style="display: block", :width="histogramY" height="12" v-if="r[0]")
                      rect(v-for="(h, i) in selected", v-if="r.histSum[selected[i].title]", :fill="color(selected[i].title)", :width="r.histSum[selected[i].title]", height="12", :transform="'translate('+[r.histPos[selected[i].title],0]+')'")

      div.pa-3.f-l(style="max-width: 538px")
        v-card
          v-card-text
            .body-2.mb-2 Group table
            p Shows top picked groups. Smaller groups are combined into <i>other</i> group. Works as filter for other charts and tables. Shows average values (<i>Tags</i>, <i>Paths</i>, &hellip;) per API.
            .body-2.mb-2 Donut charts
            p Charts average values and displays total value.
            .body-2.mb-2 Count table
            p Shows API counts for columns (selected in <i>Group table</i>.)
              =" "
              v-icon repeat
              |  button switches rows and columns.
            .body-2.mb-2 Histogram chart
            p.mb-0 Shows distribution overview of countable title values in <i>Count table</i>.
          v-divider
          v-card-text
            .body-2.mb-2 Examples
            ul.pl-3
              li
                router-link(:to="{path: '/statistics', query: {group: 'protocol', count: 'domain'}}") Protocols / Domains
              li
                router-link(:to="{path: '/statistics', query: {count: 'paths', pick: 5}}") Top 5 Domains / Paths
              li
                router-link(:to="{path: '/statistics', query: {count: 'category', pick: 5}}") Top 5 Domains / Categories
          v-divider
          v-card-text
            .body-2.mb-2 Data source
            div
              a(href="https://apis.guru/openapi-directory/") APIs.guru OpenAPI directory
              |  via precomputed values from
              =" "
              a(href="https://github.com/darosh/openapi-directory-lite") OpenAPI Directory Lite
              |  repository.

      div(style="clear: both")
  .mt-3.text-xs-center(v-else)
    v-progress-circular(class="primary--text" indeterminate)
</template>

<script>
  import {maxBy, round, findIndex} from '../plugins/lodash'
  import { scaleLinear } from '../plugins/d3'
  import { colors } from '../assets/scripts/services/directory/openapi-directory-lite'
  import axios from 'axios'
  import appDonutChart from '../components/elements/misc/DonutChart'
  import stats from '../components/mixins/stats.ts'

  export default {
    mixins: [stats],
    components: {
      appDonutChart
    },
    asyncData () {
      return axios.get('https://darosh.github.io/openapi-directory-lite/stats/index.json').then(res => ({data: res.data}))
    },
    data () {
      axios.get('https://darosh.github.io/openapi-directory-lite/stats/index.json').then(res => (this.data = res.data))

      return {
        barHor: scaleLinear().rangeRound([0, 88 + 88]),
        radius: 70,
        topPicks: [1, 5, 10, 25, {text: 'All', value: Infinity}],
        page: {sortBy: 'total', descending: true, rowsPerPage: 10},
        pageGrouped: {sortBy: 'total', descending: true, rowsPerPage: 10},
        binPicks: [8, 16, 32, 64],
        topHeaders: [
          {text: 'Title', value: 'title', align: 'left'},
          {text: 'APIs', value: 'total'},
          {text: 'Tags', value: 'tags'},
          {text: 'Paths', value: 'paths'},
          {text: 'Operations', value: 'methods'},
          {text: 'Definitions', value: 'definitions'}
        ]
      }
    },
    created () {
      this.update()
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
          ...this.selected.map(d => ({text: d.title, value: d.prop, color: true}))
        ]
      }
    },
    methods: {
      maxBy,
      round,
      switchColsRows () {
        const temp = this.grouping
        this.grouping = this.counting
        this.counting = temp
      },
      bookmark () {
        if (this.bookmarkPending) {
          clearTimeout(this.bookmarkPending)
        }

        this.bookmarkPending = setTimeout(() => {
          this.$router.push({
            path: '/statistics',
            query: {
              group: this.grouping !== this.defaultGrouping ? this.short(this.grouping.text) : undefined,
              count: this.counting !== this.defaultCounting ? this.short(this.counting.text) : undefined,
              pick: this.pickTop !== this.defaultPick ? this.pickTop : undefined
            }
          })
          this.bookmarkPending = false
        }, 0)
      },
      update () {
        if (this.bookmarkPending) {
          return
        }

        this.grouping = this.groupings.find(d => this.short(d.text) === this.$route.query.group) || this.defaultGrouping
        this.counting = this.groupings.find(d => this.short(d.text) === this.$route.query.count) || this.defaultCounting
        this.pickTop = this.topPicks.find(d => d.toString() === (this.$route.query.pick || '').toString()) || this.defaultPick
      },
      short (t) {
        return t.replace(/ /g, '-').toLowerCase()
      }
    },
    watch: {
      grouping () {
        this.bookmark()
      },
      counting () {
        this.bookmark()
      },
      pickTop () {
        this.bookmark()
      },
      $route () { this.update() }
    }
  }
</script>

<style scoped lang="stylus">
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
