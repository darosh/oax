import flatten from 'lodash-es/flatten'
import groupBy from 'lodash-es/groupBy'
import map from 'lodash-es/map'
import maxBy from 'lodash-es/maxBy'
import orderBy from 'lodash-es/orderBy'
import round from 'lodash-es/round'
import sum from 'lodash-es/sum'
import sumBy from 'lodash-es/sumBy'
import values from 'lodash-es/values'

import {histogram, extent, Bin} from 'd3-array'
import {scaleLinear} from 'd3-scale'

import {groupings} from './stats/groupings'
import {IGrouped} from './stats/IGrouped';
import {ICounted} from "./stats/ICounted";
import {IHistogram} from "./stats/IHistogram";

const DECS = 'desc'
const ASC = 'asc'
const TITLE = 'title'
const OTHER = 'other'
const TOTAL = 'total'

const defaultGrouping = groupings[1]
const defaultCounting = groupings[2]
const defaultPick = 10

export default {

  data(): any {
    return {
      data: null,
      selectionData: null,
      pickTop: defaultPick,
      groupings,
      grouping: defaultGrouping,
      counting: defaultCounting,
      histogramBins: 32,
      histogramY: 320,
      defaultGrouping,
      defaultCounting,
      defaultPick
    }
  },
  computed: {
    grouped(): IGrouped[] {
      if (!this.data) {
        return null
      }

      const data = !this.grouping.expand ? this.data : flatten(this.data.map(this.grouping.expand))
      const records = map(groupBy(data, this.grouping.select), (records, title) => ({
        title,
        records,
        prop: this.propName(title)
      }))
      return orderBy(records, [(d) => d.records.length, TITLE], [DECS, ASC])
    },
    top(): IGrouped[] {
      if (!this.grouped) {
        return null
      }

      let top

      if (this.grouped.length <= this.pickTop) {
        top = this.grouped
      } else {
        const pick = Math.max(0, Math.min(this.grouped.length - 1, this.pickTop - 1))
        const min = this.grouped[pick].records.length
        top = (this.grouped as IGrouped[]).filter(d => d.records.length > min)

        const records = [].concat.apply([], (this.grouped as IGrouped[]).filter(d => d.records.length <= min).map(d => d.records))
        top.push({title: OTHER, records, prop: this.propName(OTHER), min})
      }

      top.forEach(this.aggregate)

      return orderBy(top, [TOTAL, TITLE], [DECS, ASC])
    },
    total(): number {
      return !this.data ? null : this.data.length
    },
    selection: {
      get(): IGrouped[] {
        return this.selectionData ? this.selectionData : []
      },
      set(value: IGrouped[]) {
        this.selectionData = value
      }
    },
    selected(): IGrouped[] {
      return this.top ? this.selection.length ? this.selection : this.top : null
    },
    filtered() {
      return this.selected ? [].concat.apply([], (this.selected as IGrouped[]).map(d => {
        d.records.forEach(r => {
          r.column = d.title
        })
        return d.records
      })) : null
    },
    counted(): ICounted[] {
      if (!this.filtered) {
        return null
      }

      const data = !this.counting.expand ? this.filtered : flatten(this.filtered.map(this.counting.expand))

      const records: ICounted[] = map(groupBy(data, this.counting.select),
        (records, title) => ({
          title: this.counting.number ? parseInt(title) : title,
          prop: this.propName(title),
          records,
          total: records.length,
          value: this.counting.number ? parseInt(title) : undefined
        })) as ICounted[];

      (this.selected as IGrouped[]).forEach(s => {
        records.forEach(record => {
          record[this.propName(s.title)] = record.records.filter(d => d.column === s.title).length
        })
      })

      return orderBy(records, [TOTAL, TITLE], [DECS, ASC])
    },
    histogram() {
      if (!this.counting.number) {
        return null
      }

      const e: number[] = extent<number>(this.counted, d => (d as any).value) as number[]
      const x = scaleLinear()
        .domain(e)

      const hist: Array<Bin<ICounted, number>> = histogram<ICounted, number>()
        .value(d => (d as any).value)
        .domain(x.domain() as [number, number])
        .thresholds(x.ticks(Math.min(e[1] - e[0], this.histogramBins)))(this.counted);

      (hist as IHistogram[]).forEach(h => {
        h.x = x(h.x0)
        h.width = x(h.x1 - h.x0)

        this.histogramSums(h)
      })

      const max: number = (maxBy((hist as IHistogram[]), 'histMax') || {histMax: 1}).histMax;
      (hist as any).histMax = sumBy((hist as IHistogram[]), 'histMax');
      (hist as IHistogram[]).forEach(c => this.histogramScale(c, max))

      return hist
    }
  },
  methods: {
    aggregate(t: IGrouped) {
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
      t.summaries = t.summariesTotal / t.total

      t.descriptionsTotal = sumBy(t.records, 'descriptions')
      t.descriptions = t.descriptionsTotal / t.total

      t.descriptionLengthsTotal = sumBy(t.records, 'descriptionsLength')
      t.descriptionLengths = t.descriptionLengthsTotal / t.descriptionsTotal

      t.summaryLengthsTotal = sumBy(t.records, 'summariesLength')
      t.summaryLengths = t.summaryLengthsTotal / t.summariesTotal
    },
    propName(t: string): string {
      return '$' + t.replace(/\./g, '_')
    },
    histogramSums(h: IHistogram): void {
      for (let i = 0; i < h.length; i++) {
        if (h[i]) {
          (this.selected as IGrouped[]).forEach(s => {
            h.histSum = h.histSum || {}
            h.histSum[s.title] = h.histSum[s.title] || 0;
            (h.histSum[s.title] as any) += h[i][this.propName(s.title)] > 0 ? h[i][this.propName(s.title)] : 0
          })
        }
      }

      let prev = 0;

      (this.selected as IGrouped[]).forEach(s => {
        h.histPos = h.histPos || {}
        h.histPos[s.title] = prev
        prev += (h.histSum && (h.histSum[s.title] > 0)) ? h.histSum[s.title] : 0
      })

      h.histMax = prev
    },
    histogramScale(h: IHistogram, max: number): void {
      if (h.histPos || h.histSum) {
        (this.selected as IGrouped[]).forEach(s => {
          if (h.histPos && h.histPos[s.title]) {
            h.histPos[s.title] /= max
            h.histPos[s.title] *= this.histogramY
          }

          if (h.histSum && h.histSum[s.title]) {
            h.histSum[s.title] /= max
            h.histSum[s.title] *= this.histogramY
          }
        })
      }
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
