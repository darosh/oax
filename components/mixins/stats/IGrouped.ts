export interface IGrouped {
  title: string;
  records: any[];

  total?: number;
  pathsTotal?: number;
  paths?: number;
  tagsTotal?: number;
  tags?: number;
  definitionsTotal?: number;
  definitions?: number;
  methodsTotal?: number;
  methods?: number;
  summariesTotal?: number;
  summaries?: number;
  descriptionsTotal?: number;
  descriptions?: number;
  descriptionLengthsTotal?: number;
  descriptionLengths?: number;
  summaryLengthsTotal?: number;
  summaryLengths?: number;

  [property: string]: number | string | any[];
}
