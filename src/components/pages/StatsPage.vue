<template lang="pug">
  v-container.gpu(style="width: 100%; max-width: 100%")
    v-layout.ma-3-md
      v-flex
        h5 Top domains
        p
          i Average values per API specification.
        div
          div.mb-4(style="float: left")
            v-data-table.elevation-1(:headers="topDomainsHeaders", :items="topDomains" hide-actions, :must-sort="false", :pagination.sync="page")
              template(slot="items" scope="props")
                td(style="white-space: nowrap")
                  .legend(:style="{'background-color': color(props.item[0])}")
                  | {{props.item[0]}}
                td.text-xs-right {{props.item[3]}}
                td.text-xs-right {{props.item[6]}}
                td.text-xs-right {{props.item[4]}}
                td.text-xs-right {{props.item[5]}}
                //td.text-xs-right {{props.item[7]}}
                //td.text-xs-right {{props.item[8]}}
                td.text-xs-right {{props.item[9]}}
          v-container.pa-0(v-if="topDomains" style="max-width: none")
            v-layout.pl-3(row wrap)
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="APIs" prop="3"  category="0", :radius="radius", :items="topDomains", :inner=".43", :subtitle="data.length")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="Tags" prop="6"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="Paths" prop="4"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="Endpoints" prop="5"  category="0", :radius="radius", :items="topDomains")
              <!--v-flex(style="flex-grow: 0")-->
                <!--app-donut-chart(title="Summaries" prop="7"  category="0", :radius="radius", :items="topDomains")-->
              <!--v-flex(style="flex-grow: 0")-->
                <!--app-donut-chart(title="Descriptions" prop="8"  category="0", :radius="radius", :items="topDomains")-->
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="Definitions" prop="9"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
        div(style="clear: both")
        h5.mt-3(style="clear: both") Protocols
        div
          div.mb-4(style="float: left")
            v-data-table.elevation-1(:headers="topDomainsSchemesHeaders", :items="topDomains" hide-actions, :must-sort="false", :pagination.sync="page" select-all v-model="topDomainsSelected", item-key="0")
              template(slot="items" scope="props")
                td
                  v-checkbox(color="primary" hide-details v-model="props.selected")
                td(style="white-space: nowrap")
                  .legend(:style="{'background-color': color(props.item[0])}")
                  | {{props.item[0]}}
                td.text-xs-right {{props.item[10]}}{{props.item[10] ? '%' : ''}}
                td.text-xs-right {{props.item[11]}}{{props.item[11] ? '%' : ''}}
                td.text-xs-right {{props.item[12]}}{{props.item[12] ? '%' : ''}}

            table.mt-3.datatable.table.elevation-1
              thead
                tr
                  th HTTPS
                  th HTTPS+HTTP
                  th HTTP
                tr
                  th(v-for="i in sumSelectionSchemes") {{prc(i, sumSelectionSchemes)}} {{i ? `(${i})` : ''}}
              tbody
                tr
                  td.text-xs-center(v-for="i in sumSelectionSchemes" style="vertical-align: bottom; padding: 0")
                    div(v-if="i" style="width: 16px; display: block; margin: 8px auto",
                    :style="{'background-color': '#888', height: bar.domain([0, max(sumSelectionSchemes)])(i) + 'px'}")

          v-container.pa-0(v-if="topDomains" style="max-width: none")
            v-layout.pl-3(row wrap)
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="HTTPS" prop="10"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="HTTPS+HTTP" prop="11"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="HTTP" prop="12"  category="0", :radius="radius", :items="topDomains")
        div(style="clear: both")
        h5.mt-3 Methods
        p
          i Average values per API specification.
        div
          div.mb-4(style="float: left")
            v-data-table.elevation-1(:headers="topDomainsHttpHeaders", :items="topDomains" hide-actions, :must-sort="false", :pagination.sync="page" select-all v-model="topDomainsSelected", item-key="0")
              template(slot="items" scope="props")
                td
                  v-checkbox(color="primary" hide-details v-model="props.selected")
                td(style="white-space: nowrap")
                  .legend(:style="{'background-color': color(props.item[0])}")
                  | {{props.item[0]}}
                td.text-xs-right {{props.item[13] ? round(props.item[13] / props.item[3], 1): null}}
                td.text-xs-right {{props.item[14] ? round(props.item[14] / props.item[3], 1): null}}
                td.text-xs-right {{props.item[15] ? round(props.item[15] / props.item[3], 1): null}}
                td.text-xs-right {{props.item[16] ? round(props.item[16] / props.item[3], 1): null}}
                td.text-xs-right {{props.item[17] ? round(props.item[17] / props.item[3], 1): null}}
                td.text-xs-right {{props.item[18] ? round(props.item[18] / props.item[3], 1): null}}
                td.text-xs-right {{props.item[19] ? round(props.item[19] / props.item[3], 1): null}}

            table.mt-3.datatable.table.elevation-1
              thead
                tr
                  th GET
                  th POST
                  th PUT
                  th PATCH
                  th DELETE
                  th HEAD
                  th OPTIONS
                tr
                  th(v-for="i in sumSelectionMethods") {{prc(i, sumSelectionMethods)}} {{i ? `(${i})` : ''}}
              tbody
                tr
                  td.text-xs-center(v-for="i in sumSelectionMethods" style="vertical-align: bottom; padding: 0")
                    div(v-if="i" style="width: 16px; display: block; margin: 8px auto",
                    :style="{'background-color': '#888', height: bar.domain([0, max(sumSelectionMethods)])(i) + 'px'}")

          v-container.pa-0(v-if="topDomains" style="max-width: none")
            v-layout.pl-3(row wrap)
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="GET" prop="13"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="POST" prop="14"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="PUT" prop="15"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="PATCH" prop="16"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="DELETE" prop="17"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="HEAD" prop="18"  category="0", :radius="radius", :items="topDomains")
              v-flex(style="flex-grow: 0")
                app-donut-chart(title="OPTIONS" prop="19"  category="0", :radius="radius", :items="topDomains")

        div(style="clear: both")

        h5 Categories
        p
          i Values filtered in Top domains section.
        div
          div.mb-4(style="float: left")
            v-data-table.elevation-1(:headers="categoriesHeaders", :items="categories", :must-sort="false", :pagination.sync="pageCategories")
              template(slot="items" scope="props")
                td.text-xs-left {{props.item[0]}}
                td.text-xs-right
                  div(v-if="props.item[1]" style="height: 16px; display: inline-block; margin: -4px 8px",
                  :style="{'background-color': '#888', width: barHor.domain([0, maxBy(categories, 1)[1]])(props.item[1]) + 'px'}")
                  span(style="min-width: 2em; display: inline-block") {{props.item[1]}}

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
  import { scaleOrdinal, scaleLinear } from 'd3-scale'
  import { colors } from '../../services/directory/openapi-directory-lite'
  import axios from 'axios'
  import appDonutChart from '../parts/DonutChart'

  export default {
    components: {
      appDonutChart
    },
    data () {
      axios.get('https://darosh.github.io/openapi-directory-lite/stats/index.json').then(res => this.data = res.data)

      return {
        bar: scaleLinear().rangeRound([0, 88 + 44]),
        barHor: scaleLinear().rangeRound([0, 88 + 88]),
        selected: null,
        radius: 88,
        page: {sortBy: '1', descending: true, rowsPerPage: 100},
        pageCategories: {sortBy: '1', descending: true, rowsPerPage: 10},
        data: null,
        categoriesHeaders: [
          {text: 'Category', value: '0', align: 'left'},
          {text: 'APIs', value: '1'}
        ],
        topDomainsHeaders: [
          {text: 'Domain', value: '0', align: 'left'},
          {text: 'APIs', value: '3'},
          {text: 'Tags', value: '6'},
          {text: 'Paths', value: '4'},
          {text: 'Endpoints', value: '5'},
          // {text: 'Summaries', value: '7'},
          // {text: 'Descriptions', value: '8'},
          {text: 'Definitions', value: '9'}
        ],
        topDomainsSchemesHeaders: [
          {text: 'Domain', value: '0', align: 'left'},
          {text: 'HTTPS', value: '10'},
          {text: 'HTTPS+HTTP', value: '11'},
          {text: 'HTTP', value: '12'}
        ],
        topDomainsHttpHeaders: [
          {text: 'Domain', value: '0', align: 'left'},
          {text: 'GET', value: '13'},
          {text: 'POST', value: '14'},
          {text: 'PUT', value: '15'},
          {text: 'PATCH', value: '16'},
          {text: 'DELETE', value: '17'},
          {text: 'HEAD', value: '18'},
          {text: 'OPTIONS', value: '19'}
        ]
      }
    },
    computed: {
      domains () {
        return !this.data ? null : orderBy(map(groupBy(this.data, d => d.key[0]), (a, b) => [b, a]),
          [(d) => d[1].length, 0],
          ['desc', 'asc'])
      },
      total () {
        return !this.data ? null : this.data.length
      },
      topDomains () {
        if (!this.domains) {
          return
        }

        const pick = Math.min(this.domains.length, 6)
        const min = this.domains[pick][1].length
        const top = this.domains.filter(d => d[1].length > min)
        const grouped = [].concat.apply([], this.domains.filter(d => d[1].length <= min).map(d => d[1]))

        top.push(['other', grouped, min])

        top.forEach(t => {
          t[3] = t[1].length
          t[4] = round(sumBy(t[1], 'paths') / t[3], 1)
          t[6] = round(sumBy(t[1], 'tags') / t[3], 1)
          t[7] = round(sumBy(t[1], 'summaries') / t[3], 1)
          t[8] = round(sumBy(t[1], 'descriptions') / t[3], 1)
          t[9] = round(sumBy(t[1], 'definitions') / t[3], 1)
          t[5] = round(sumBy(t[1], u => sum(values(u.methods))) / t[3], 1)

          const s = countBy(t[1], 'schema')
          t[10] = s.https ? round(s.https * 100 / t[3], 1) : ''
          t[11] = s.both ? round(s.both * 100 / t[3], 1) : ''
          t[12] = s.http ? round(s.http * 100 / t[3], 1) : ''

          t[13] = sumBy(t[1], d => d.methods.get)
          t[14] = sumBy(t[1], d => d.methods.post)
          t[15] = sumBy(t[1], d => d.methods.put)
          t[16] = sumBy(t[1], d => d.methods.patch)
          t[17] = sumBy(t[1], d => d.methods.delete)
          t[18] = sumBy(t[1], d => d.methods.head)
          t[19] = sumBy(t[1], d => d.methods.options)
        })

        return orderBy(top, [1, 0], ['desc', 'asc'])
      },
      topDomainsSelected: {
        get () { return this.selected ? this.selected : [] },
        set (value) { this.selected = value}
      },
      topDomainsSelections () {
        return this.topDomains ? [].concat.apply([],
          (this.topDomainsSelected.length ? this.topDomainsSelected : this.topDomains).map(d => d[1])) : null
      },
      sumSelectionMethods () {
        const t = []
        t[0] = sumBy(this.topDomainsSelections, d => d.methods.get)
        t[1] = sumBy(this.topDomainsSelections, d => d.methods.post)
        t[2] = sumBy(this.topDomainsSelections, d => d.methods.put)
        t[3] = sumBy(this.topDomainsSelections, d => d.methods.patch)
        t[4] = sumBy(this.topDomainsSelections, d => d.methods.delete)
        t[5] = sumBy(this.topDomainsSelections, d => d.methods.head)
        t[6] = sumBy(this.topDomainsSelections, d => d.methods.options)
        return t
      },
      sumSelectionSchemes () {
        const s = countBy(this.topDomainsSelections, 'schema')
        const t = []
        t[0] = s.https
        t[1] = s.both
        t[2] = s.http
        return t
      },
      categories () {
        return orderBy(
          map(countBy(flatten(map(this.topDomainsSelections, 'categories'))), (a, b) => [b.replace(/_/g, ' '), a]),
          [1, 0], ['desc', 'asc']
        )
      }
    },
    methods: {
      color: scaleOrdinal().range(colors.filter((d, i) => i % 2).reverse()),
      round,
      max,
      maxBy,
      prc (part, parts) {
        return part ? round(100 * part / sum(parts)) + '%' : ''
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
</style>
