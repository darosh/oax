import {
  flatten,
  groupBy,
  map,
  maxBy,
  orderBy,
  round,
  sum,
  sumBy,
  values
} from '../../plugins/lodash';

import {Bin} from 'd3-array/index';
import {extent, histogram, scaleLinear} from '../../plugins/d3';

import {groupings} from './stats/groupings';
import {ICounted} from './stats/ICounted';
import {IGrouped} from './stats/IGrouped';
import {IHistogram} from './stats/IHistogram';

const DECS = 'desc';
const ASC = 'asc';
const TITLE = 'title';
const OTHER = 'other';
const TOTAL = 'total';

const defaultGrouping = groupings[1];
const defaultCounting = groupings[2];
const defaultPick = 10;

export default {

  data(): any {
    return {
      counting: defaultCounting,
      data: null,
      defaultCounting,
      defaultGrouping,
      defaultPick,
      grouping: defaultGrouping,
      groupings,
      histogramBins: 32,
      histogramY: 320,
      pickTop: defaultPick,
      selectionData: null
    };
  },
  computed: {
    grouped(): IGrouped[] {
      if (!this.data) {
        return null;
      }

      const data = !this.grouping.expand ? this.data : flatten(this.data.map(this.grouping.expand));
      const mappedRecords = map(groupBy(data, this.grouping.select), (records: any[], title: string) => ({
        prop: this.propName(title),
        records,
        title
      }));
      return orderBy(mappedRecords, [(d: any) => d.records.length, TITLE], [DECS, ASC]);
    },
    top(): IGrouped[] {
      if (!this.grouped) {
        return null;
      }

      let top;

      if (this.grouped.length <= this.pickTop) {
        top = this.grouped;
      } else {
        const pick = Math.max(0, Math.min(this.grouped.length - 1, this.pickTop - 1));
        const min = this.grouped[pick].records.length;
        top = (this.grouped as IGrouped[]).filter((d) => d.records.length > min);

        const records = [].concat.apply([], (this.grouped as IGrouped[])
          .filter((d) => d.records.length <= min).map((d) => d.records));
        top.push({title: OTHER, records, prop: this.propName(OTHER), min});
      }

      top.forEach(this.aggregate);

      return orderBy(top, [TOTAL, TITLE], [DECS, ASC]);
    },
    total(): number {
      return !this.data ? null : this.data.length;
    },
    selection: {
      get(): IGrouped[] {
        return this.selectionData ? this.selectionData : [];
      },
      set(value: IGrouped[]) {
        this.selectionData = value;
      }
    },
    selected(): IGrouped[] {
      return this.top ? this.selection.length ? this.selection : this.top : null;
    },
    filtered() {
      return this.selected ? [].concat.apply([], (this.selected as IGrouped[]).map((d) => {
        d.records.forEach((r) => {
          r.column = d.title;
        });
        return d.records;
      })) : null;
    },
    counted(): ICounted[] {
      if (!this.filtered) {
        return null;
      }

      const data = !this.counting.expand ? this.filtered : flatten(this.filtered.map(this.counting.expand));

      const mappedRecords: ICounted[] = map(groupBy(data, this.counting.select),
        (records: any[], title: string) => ({
          prop: this.propName(title),
          records,
          title: this.counting.number ? parseInt(title, 10) : title,
          total: records.length,
          value: this.counting.number ? parseInt(title, 10) : undefined
        })) as ICounted[];

      (this.selected as IGrouped[]).forEach((s) => {
        mappedRecords.forEach((record) => {
          record[this.propName(s.title)] = record.records.filter((d) => d.column === s.title).length;
        });
      });

      return orderBy(mappedRecords, [TOTAL, TITLE], [DECS, ASC]);
    },
    histogram() {
      if (!this.counting.number) {
        return null;
      }

      const e: number[] = extent/*<number>*/(this.counted, (d: any) => (d as any).value) as number[];
      const x = scaleLinear()
        .domain(e);

      const hist: Array<Bin<ICounted, number>> = (histogram/*<ICounted, number>*/()
        .value((d: any) => d.value) as any)
        .domain(x.domain() as [number, number])
        .thresholds(x.ticks(Math.min(e[1] - e[0], this.histogramBins)))(this.counted);

      (hist as IHistogram[]).forEach((h) => {
        h.x = x(h.x0);
        h.width = x(h.x1 - h.x0);

        this.histogramSums(h);
      });

      const max: number = (maxBy((hist as IHistogram[]), 'histMax') || {histMax: 1}).histMax;
      (hist as any).histMax = sumBy((hist as IHistogram[]), 'histMax');
      (hist as IHistogram[]).forEach((c) => this.histogramScale(c, max));

      return hist;
    }
  },
  methods: {
    aggregate(t: IGrouped) {
      t.total = t.records.length;

      t.pathsTotal = sumBy(t.records, 'paths');
      t.paths = round(t.pathsTotal / t.total, 1);

      t.tagsTotal = sumBy(t.records, 'tags');
      t.tags = round(t.tagsTotal / t.total, 1);

      t.definitionsTotal = sumBy(t.records, 'definitions');
      t.definitions = round(t.definitionsTotal / t.total, 1);

      t.methodsTotal = sumBy(t.records, (u: any) => sum(values(u.methods)));
      t.methods = round(t.methodsTotal / t.total, 1);

      t.summariesTotal = sumBy(t.records, 'summaries');
      t.summaries = t.summariesTotal / t.total;

      t.descriptionsTotal = sumBy(t.records, 'descriptions');
      t.descriptions = t.descriptionsTotal / t.total;

      t.descriptionLengthsTotal = sumBy(t.records, 'descriptionsLength');
      t.descriptionLengths = t.descriptionLengthsTotal / t.descriptionsTotal;

      t.summaryLengthsTotal = sumBy(t.records, 'summariesLength');
      t.summaryLengths = t.summaryLengthsTotal / t.summariesTotal;
    },
    propName(t: string): string {
      return '$' + t.replace(/\./g, '_');
    },
    histogramSums(h: IHistogram): void {
      for (const hi of h) {
        if (hi) {
          (this.selected as IGrouped[]).forEach((s) => {
            h.histSum = h.histSum || {};
            h.histSum[s.title] = h.histSum[s.title] || 0;
            (h.histSum[s.title] as any) += hi[this.propName(s.title)] > 0 ? hi[this.propName(s.title)] : 0;
          });
        }
      }

      let prev = 0;

      (this.selected as IGrouped[]).forEach((s) => {
        h.histPos = h.histPos || {};
        h.histPos[s.title] = prev;
        prev += (h.histSum && (h.histSum[s.title] > 0)) ? h.histSum[s.title] : 0;
      });

      h.histMax = prev;
    },
    histogramScale(h: IHistogram, max: number): void {
      if (h.histPos || h.histSum) {
        (this.selected as IGrouped[]).forEach((s) => {
          if (h.histPos && h.histPos[s.title]) {
            h.histPos[s.title] /= max;
            h.histPos[s.title] *= this.histogramY;
          }

          if (h.histSum && h.histSum[s.title]) {
            h.histSum[s.title] /= max;
            h.histSum[s.title] *= this.histogramY;
          }
        });
      }
    }
  },
  watch: {
    grouping() {
      this.selectionData = null;
    },
    pickTop() {
      this.selectionData = null;
    }
  }
};
