export interface ICounted {
  title: string;
  records: any[];
  prop: string;
  total: number;
  value: number;
  [property: string]: number | string | any[];
}
