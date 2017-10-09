<template lang="pug">
  v-container.gpu(v-if="topDomains" style="width: 100%; max-width: 100%")
    div.pa-3
      h4 Overview
      p
        i Average values per API specification.
      div.mr-2.mb-2.f-l(style="max-width: 100%")
        v-data-table.elevation-1(:headers="topDomainsHeaders", :items="topDomains" hide-actions, :must-sort="false", :pagination.sync="page")
          template(slot="items" scope="props")
            td(style="white-space: nowrap")
              .legend(:style="{'background-color': color(props.item.domain)}")
              | {{props.item.domain}}
            td.text-xs-right {{props.item.total}}
            td.text-xs-right {{props.item.tags}}
            td.text-xs-right {{props.item.paths}}
            td.text-xs-right {{props.item.methods}}
            td.text-xs-right {{props.item.definitions}}
      app-donut-chart.f-l(title="APIs" prop="total"  category="domain", :radius="radius", :items="topDomains", :inner=".43", :subtitle="data.length")
      app-donut-chart.f-l(title="Tags" prop="tags"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="Paths" prop="paths"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="Endpoints" prop="methods"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="Definitions" prop="definitions"  category="domain", :radius="radius", :items="topDomains")
      div(style="clear: both")

      h4.mt-3 Protocols
      div.mr-2.mb-2.f-l(style="max-width: 100%")
        v-data-table.elevation-1(:headers="topDomainsSchemesHeaders", :items="topDomains" hide-actions, :must-sort="false", :pagination.sync="page" select-all v-model="topDomainsSelected", item-key="domain")
          template(slot="items" scope="props")
            td
              v-checkbox(color="primary" hide-details v-model="props.selected")
            td(style="white-space: nowrap")
              .legend(:style="{'background-color': color(props.item.domain)}")
              | {{props.item.domain}}
            td.text-xs-right {{props.item.https}}{{props.item.https ? '%' : ''}}
            td.text-xs-right {{props.item.both}}{{props.item.both ? '%' : ''}}
            td.text-xs-right {{props.item.http}}{{props.item.http ? '%' : ''}}

        table.mt-3.datatable.table.elevation-1
          thead
            tr
              th(v-for="(i, k) in sumSelectionSchemes") {{k === 'both' ? 'HTTPS+HTTP' : k.toUpperCase()}}
            tr
              th(v-for="i in sumSelectionSchemes") {{prc(i, sum(values(sumSelectionSchemes)))}} {{i ? `(${i})` : ''}}
          tbody
            tr
              td.text-xs-center(v-for="i in sumSelectionSchemes" style="vertical-align: bottom; padding: 0")
                div(v-if="i" style="width: 16px; display: block; margin: 8px auto",
                :style="{'background-color': '#888', height: bar.domain([0, max(values(sumSelectionSchemes))])(i) + 'px'}")

      app-donut-chart.f-l(title="HTTPS" prop="https"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="HTTPS+HTTP" prop="both"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="HTTP" prop="http"  category="domain", :radius="radius", :items="topDomains")
      div(style="clear: both")

      h4.mt-3 Methods
      p
        i Average values per API specification.
      div.mr-2.mb-2.f-l(style="max-width: 100%")
        v-data-table.elevation-1(:headers="topDomainsHttpHeaders", :items="topDomains" hide-actions, :must-sort="false", :pagination.sync="page" select-all v-model="topDomainsSelected", item-key="domain")
          template(slot="items" scope="props")
            td
              v-checkbox(color="primary" hide-details v-model="props.selected")
            td(style="white-space: nowrap")
              .legend(:style="{'background-color': color(props.item.domain)}")
              | {{props.item.domain}}
            td.text-xs-right {{roundedRatio(props.item.get, props.item.total, 1)}}
            td.text-xs-right {{roundedRatio(props.item.post, props.item.total, 1)}}
            td.text-xs-right {{roundedRatio(props.item.put, props.item.total, 1)}}
            td.text-xs-right {{roundedRatio(props.item.patch, props.item.total, 1)}}
            td.text-xs-right {{roundedRatio(props.item.delete, props.item.total, 1)}}
            td.text-xs-right {{roundedRatio(props.item.head, props.item.total, 1)}}
            td.text-xs-right {{roundedRatio(props.item.options, props.item.total, 1)}}

        table.mt-3.datatable.table.elevation-1
          thead
            tr
              th(v-if="i" v-for="(i, k) in sumSelectionMethods") {{k.toUpperCase()}}
            tr
              th(v-if="i" v-for="i in sumSelectionMethods") {{prc(i, sum(values(sumSelectionMethods)))}} {{i ? `(${i})` : ''}}
          tbody
            tr
              td.text-xs-center(v-for="i in sumSelectionMethods" style="vertical-align: bottom; padding: 0")
                div(v-if="i" style="width: 16px; display: block; margin: 8px auto",
                :style="{'background-color': '#888', height: bar.domain([0, max(values(sumSelectionMethods))])(i) + 'px'}")

      app-donut-chart.f-l(title="GET" prop="get"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="POST" prop="post"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="PUT" prop="put"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="PATCH" prop="patch"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="DELETE" prop="delete"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="HEAD" prop="head"  category="domain", :radius="radius", :items="topDomains")
      app-donut-chart.f-l(title="OPTIONS" prop="options"  category="domain", :radius="radius", :items="topDomains")
      div(style="clear: both")

      h4.mt-3 Categories
      p
        i Values filtered in sections above.
      div(style="max-width: 100%")
        v-data-table.elevation-1(:headers="categoriesHeaders", :items="categories", :must-sort="false", :pagination.sync="pageCategories" style="max-width: 420px")
          template(slot="items" scope="props")
            td.text-xs-left {{props.item.category}}
            td.text-xs-right
              div(v-if="props.item.count" style="height: 16px; display: inline-block; margin: -4px 8px",
              :style="{'background-color': '#888', width: barHor.domain([0, maxBy(categories, 'count').count])(props.item.count) + 'px'}")
              span(style="min-width: 2em; display: inline-block") {{props.item.count}}

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
  import stats from '../mixins/stats'

  export default {
    mixins: [stats],
    components: {
      appDonutChart
    },
    data () {
      axios.get('https://darosh.github.io/openapi-directory-lite/stats/index.json').then(res => this.data = res.data)

      return {
        bar: scaleLinear().rangeRound([0, 88 + 44]),
        barHor: scaleLinear().rangeRound([0, 88 + 88]),
        radius: 92,
        page: {sortBy: 'total', descending: true, rowsPerPage: 100},
        pageCategories: {sortBy: 'count', descending: true, rowsPerPage: 10},
        categoriesHeaders: [
          {text: 'Category', value: 'category', align: 'left'},
          {text: 'APIs', value: 'count'}
        ],
        topDomainsHeaders: [
          {text: 'Domain', value: 'domain', align: 'left'},
          {text: 'APIs', value: 'total'},
          {text: 'Tags', value: 'tags'},
          {text: 'Paths', value: 'paths'},
          {text: 'Endpoints', value: 'methods'},
          {text: 'Definitions', value: 'definitions'}
        ],
        topDomainsSchemesHeaders: [
          {text: 'Domain', value: 'domain', align: 'left'},
          {text: 'HTTPS', value: 'https'},
          {text: 'HTTPS+HTTP', value: 'both'},
          {text: 'HTTP', value: 'http'}
        ],
        topDomainsHttpHeaders: [
          {text: 'Domain', value: 'domain', align: 'left'},
          {text: 'GET', value: 'get'},
          {text: 'POST', value: 'post'},
          {text: 'PUT', value: 'put'},
          {text: 'PATCH', value: 'patch'},
          {text: 'DELETE', value: 'delete'},
          {text: 'HEAD', value: 'head'},
          {text: 'OPTIONS', value: 'options'}
        ]
      }
    },
    computed: {},
    methods: {
      color: scaleOrdinal().range(colors.filter((d, i) => i % 2).reverse()),
      round,
      roundedRatio (val, tot, r) {
        return val ? round(val / tot, r) : null
      },
      max,
      sum,
      values,
      maxBy,
      prc (part, parts) {
        return part ? round(100 * part / parts) + '%' : ''
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
