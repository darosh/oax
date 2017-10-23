import {Bin} from 'd3-array/index';
import {ICounted} from './ICounted';

export interface IHistogram extends Bin<ICounted, number> {
  x: number;
  width: number;
  histMax: number;
  histPos: {[index: string]: number};
  histSum: {[index: string]: number};
  // [property: string]: number | any
}
