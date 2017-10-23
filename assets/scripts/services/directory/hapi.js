export default {
  title: 'Hub of APIs',
  subTitle: 'Specifications derived from Mashape marketplace',
  home: 'https://github.com/SOM-Research/hapi',
  base: 'https://api.github.com/repos/SOM-Research/hapi/git/trees/8176cf7977ca59cab643136fd70632a65aee900b',
  transform (data) {
    data.tree.sort((a, b) => {
      return a.path.toLowerCase().localeCompare(b.path.toLowerCase())
    })

    const apis = []

    for (let i = 0; i < data.tree.length; i++) {
      apis.push({
        url: `https://raw.githubusercontent.com/SOM-Research/hapi/master/APIs/generated/mashape/${encodeURIComponent(data.tree[i].path)}`,
        key: '#' + (i + 1),
        title: data.tree[i].path.replace(/\.json$/, '')
      })
    }

    return {apis}
  }
}
