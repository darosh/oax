import flatten from 'lodash-es/flatten'
import groupBy from 'lodash-es/groupBy'
import map from 'lodash-es/map'
import orderBy from 'lodash-es/orderBy'
import round from 'lodash-es/round'
import sum from 'lodash-es/sum'
import sumBy from 'lodash-es/sumBy'
import values from 'lodash-es/values'

export default {
  data () {
    const groupings = [
      {text: 'Top level domain', select: d => d.root},
      {text: 'Domain', select: d => d.key[0]},
      {text: 'Protocol', select: d => d.schema},
      {text: 'Tags', select: d => d.tags},
      {text: 'Paths', select: d => d.paths},
      {text: 'Endpoints', select: d => sum(values(d.methods))},
      {text: 'Definitions', select: d => d.definitions},
      {
        text: 'Category',
        select: d => d.category,
        expand: d => (d.categories || ['undefined']).map(category => {
          return Object.assign({category}, d)
        })
      },
      {
        text: 'Method',
        select: d => d.method,
        expand: d => Object.keys(d.methods).map(method => {
          return Object.assign({method}, d)
        })
      },
      {text: 'API', select: d => d.key.join(':')},
      {text: 'Summaries', select: d => d.summaries},
      {text: 'Descriptions', select: d => d.descriptions}
    ]

    return {
      data: null,
      selectionData: null,
      pickTop: 10,
      groupings,
      grouping: groupings[1],
      counting: groupings[2]
    }
  },
  computed: {
    grouped () {
      if (!this.data) {
        return null
      }

      const data = !this.grouping.expand ? this.data : flatten(this.data.map(this.grouping.expand))
      const records = map(groupBy(data, this.grouping.select), (records, title) => ({title, records}))
      return orderBy(records, [(d) => d.records.length, 'title'], ['desc', 'asc'])
    },
    top () {
      if (!this.grouped) {
        return null
      }

      let top

      if (this.grouped.length <= this.pickTop) {
        top = this.grouped
      } else {
        const pick = Math.max(0, Math.min(this.grouped.length - 1, this.pickTop - 1))
        const min = this.grouped[pick].records.length
        top = this.grouped.filter(d => d.records.length > min)

        const records = [].concat.apply([], this.grouped.filter(d => d.records.length <= min).map(d => d.records))
        top.push({title: 'other', records, min})
      }

      top.forEach(this.aggregate)

      return orderBy(top, ['total', 'title'], ['desc', 'asc'])
    },
    total () {
      return !this.data ? null : this.data.length
    },
    selection: {
      get () { return this.selectionData ? this.selectionData : [] },
      set (value) { this.selectionData = value }
    },
    selected () {
      return this.top ? this.selection.length ? this.selection : this.top : null
    },
    filtered () {
      return this.selected ? [].concat.apply([], this.selected.map(d => {
        d.records.forEach(r => {
          r.column = d.title
        })
        return d.records
      })) : null
    },
    counted () {
      if (!this.filtered) {
        return null
      }

      const data = !this.counting.expand ? this.filtered : flatten(this.filtered.map(this.counting.expand))
      const records = map(groupBy(data, this.counting.select),
        (records, title) => ({title, prop: this.nodots(title), records, total: records.length}))

      this.selected.forEach(s => {
        records.forEach(record => {
          record[this.nodots(s.title)] = record.records.filter(d => d.column === s.title).length
        })
      })

      return orderBy(records, ['total', 'title'], ['desc', 'asc'])
    }
  },
  methods: {
    aggregate (t) {
      t.total = t.records.length

      t.pathsTotal = sumBy(t.records, 'paths')
      t.paths = round(t.pathsTotal / t.total, 1)

      t.tagsTotal = sumBy(t.records, 'tags')
      t.tags = round(t.tagsTotal / t.total, 1)

      t.definitionsTotal = sumBy(t.records, 'definitions')
      t.definitions = round(t.definitionsTotal / t.total, 1)

      t.methodsTotal = sumBy(t.records, u => sum(values(u.methods)))
      t.methods = round(t.methodsTotal / t.total, 1)

      t.summariesTotal = sumBy(t.records, 'summaries')
      t.summaries = round(t.summariesTotal / t.total, 1)

      t.descriptionsTotal = sumBy(t.records, 'descriptions')
      t.descriptions = round(t.descriptionsTotal / t.total, 1)

      t.descriptionLengthsTotal = sumBy(t.records, 'descriptionsLength')
      t.descriptionLengths = round(t.descriptionLengthsTotal / t.descriptionsTotal, 1)

      t.summaryLengthsTotal = sumBy(t.records, 'summariesLength')
      t.summaryLengths = round(t.summaryLengthsTotal / t.summariesTotal, 1)
    },
    nodots (t) {
      return t.replace(/\./g, '_')
    }
  },
  watch: {
    grouping: function () {
      this.selectionData = null
    },
    pickTop: function () {
      this.selectionData = null
    }
  }
}
