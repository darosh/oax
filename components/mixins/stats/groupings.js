import { values, sum } from '../../../plugins/lodash'

export const groupings = [
  {text: 'Top level domain', select: d => d.root},
  {text: 'Domain', select: d => d.key[0]},
  {text: 'Protocol', select: d => d.schema},
  {text: 'Tags', select: d => d.tags, number: true},
  {text: 'Paths', select: d => d.paths, number: true},
  {text: 'Endpoints', select: d => sum(values(d.methods)), number: true},
  {text: 'Definitions', select: d => d.definitions, number: true},
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
  {text: 'Summaries', select: d => d.summaries, number: true},
  {text: 'Descriptions', select: d => d.descriptions, number: true},
  {text: 'Language', select: d => d.language},
  {text: 'Month', select: d => d.month},
  {text: 'Year', select: d => d.year, number: true}
]
