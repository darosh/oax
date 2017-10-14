export interface IGrouping {
  text: string,
  select: () => any
  expand?: () => any[],
  number?: true
}
