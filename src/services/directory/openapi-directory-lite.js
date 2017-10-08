import { indexPath, apiPath } from 'openapi-directory-lite'

export const colors = [
  '#CE93D8',
  '#B39DDB',
  '#9FA8DA',
  '#90CAF9',
  '#81D4FA',
  '#80DEEA',
  '#80CBC4',
  '#A5D6A7',
  '#C5E1A5',
  '#E6EE9C',
  '#FFF59D',
  '#FFE082',
  '#FFCC80',
  '#FFAB91'
]

export default {
  title: 'OpenAPI Directory Lite',
  subTitle: 'Smaller version with full text search',
  home: 'https://github.com/darosh/openapi-directory-lite',
  base: indexPath(),
  keys: true,
  categories: true,
  unclassified: true,
  fullText: true,
  transform (data) {
    const apis = []

    for (let key in data.specs) {
      if (data.specs.hasOwnProperty(key)) {
        let v = data.specs[key]
        apis.push({
          title: v.title,
          key,
          url: apiPath(key, data.specs[key]),
          categories: v.categories
        })
      }
    }

    apis.sort((a, b) => a.key.localeCompare(b.key))

    const categories = colored(data.categories)
    return {apis, categories}
  }
}

export function colored (categories) {
  const sort = []

  for (const c in categories) {
    sort.push({key: c, count: categories[c].count})
  }

  sort.sort((a, b) => a.count - b.count)

  sort.forEach((v, i) => {
    categories[v.key].color = colors[Math.round((i / (sort.length - 1)) * (colors.length - 1))]
  })

  return categories
}
