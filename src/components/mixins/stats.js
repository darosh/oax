import countBy from 'lodash-es/countBy'
import groupBy from 'lodash-es/groupBy'
import map from 'lodash-es/map'
import orderBy from 'lodash-es/orderBy'
import round from 'lodash-es/round'
import sum from 'lodash-es/sum'
// import max from 'lodash-es/max'
// import maxBy from 'lodash-es/maxBy'
import sumBy from 'lodash-es/sumBy'
import values from 'lodash-es/values'
import flatten from 'lodash-es/flatten'

export default {
  data () {
    return {
      data: null,
      selected: null,
      pickTop: 6
    }
  },
  computed: {
    domains () {
      return !this.data
        ? null
        : orderBy(map(groupBy(this.data, d => d.key[0]), (records, domain) => ({domain, records})),
          [(d) => d.records.length, 'domain'],
          ['desc', 'asc'])
    },
    total () {
      return !this.data ? null : this.data.length
    },
    topDomains () {
      if (!this.domains) {
        return
      }

      const pick = Math.min(this.domains.length, this.pickTop)
      const min = this.domains[pick].records.length
      const top = this.domains.filter(d => d.records.length > min)
      const records = [].concat.apply([], this.domains.filter(d => d.records.length <= min).map(d => d.records))

      top.push({domain: 'other', records, min})

      top.forEach(t => {
        t.total = t.records.length
        t.paths = round(sumBy(t.records, 'paths') / t.total, 1)
        t.tags = round(sumBy(t.records, 'tags') / t.total, 1)
        t.summaries = round(sumBy(t.records, 'summaries') / t.total, 1)
        t.descriptions = round(sumBy(t.records, 'descriptions') / t.total, 1)
        t.definitions = round(sumBy(t.records, 'definitions') / t.total, 1)
        t.methods = round(sumBy(t.records, u => sum(values(u.methods))) / t.total, 1)

        const s = countBy(t.records, 'schema')
        t.https = s.https ? round(s.https * 100 / t.total, 1) : ''
        t.both = s.both ? round(s.both * 100 / t.total, 1) : ''
        t.http = s.http ? round(s.http * 100 / t.total, 1) : ''

        this.sumMethods(t.records, t)
      })

      return orderBy(top, ['total', 'domain'], ['desc', 'asc'])
    },
    topDomainsSelected: {
      get () { return this.selected ? this.selected : [] },
      set (value) { this.selected = value }
    },
    topDomainsSelections () {
      return this.topDomains ? [].concat.apply([],
        (this.topDomainsSelected.length ? this.topDomainsSelected : this.topDomains).map(d => d.records)) : null
    },
    sumSelectionMethods () {
      return this.sumMethods(this.topDomainsSelections, {})
    },
    sumSelectionSchemes () {
      return countBy(this.topDomainsSelections, 'schema')
    },
    categories () {
      return orderBy(
        map(countBy(flatten(map(this.topDomainsSelections, 'categories'))),
          (count, category) => ({category: category.replace(/_/g, ' '), count})),
        ['count', 'category'], ['desc', 'asc']
      )
    }
  },
  methods: {
    sumMethods (records, target) {
      target.get = sumBy(records, d => d.methods.get)
      target.post = sumBy(records, d => d.methods.post)
      target.put = sumBy(records, d => d.methods.put)
      target.patch = sumBy(records, d => d.methods.patch)
      target.delete = sumBy(records, d => d.methods.delete)
      target.head = sumBy(records, d => d.methods.head)
      target.options = sumBy(records, d => d.methods.options)
      return target
    }
  }
}
