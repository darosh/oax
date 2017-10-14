import {ICounted} from "./ICounted";
import {Bin} from "d3-array";

export interface IHistogram extends Bin<ICounted, number> {
  x: number,
  width: number,
  histMax: number,
  histPos: {[index: string]: number},
  histSum: {[index: string]: number}
  // [property: string]: number | any
}
