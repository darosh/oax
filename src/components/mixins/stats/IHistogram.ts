import {ICounted} from "./ICounted";
import {Bin} from "d3-array";

export interface IHistogram extends Bin<ICounted, number> {
  x: number,
  width: number,
  max: number,
  [property: string]: number | any
}
