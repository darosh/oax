export default function paths (spec) {
  const nodes = []
  const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
  const links = []
  const root = null
  const ps = []
  const paths = Object.keys(spec.paths)
  let max = Number.MIN_VALUE
  let id = 0

  paths.forEach(function (path) {
    let parts = path.split('/').filter(d => d)

    parts = parts.length ? parts : ['/']

    const p = []
    // let previous = root

    max = Math.max(max, parts.length)

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const n = {
        name: part,
        path: p.map(function (d) {
          return d.name
        }).join('/'),
        param: /\{.+}/.test(part),
        id: id++
      }

      if (i === (parts.length - 1)) {
        n.last = true
        n.end = path

        methods.forEach(function (m) {
          if (spec.paths[path][m]) {
            n.methods = n.methods || []
            n.methods.push(m)
            n.ops = n.ops || []
            n.ops.push(spec.paths[path][m])
          }
        })

        if (!n.methods) {
          console.log(n)
        }
      }

      p.push(n)

      // previous = n
    }

    ps.push(p)
  })

  for (let j = 0; j < max; j++) {
    const middles = {}

    for (let i = 0; i < ps.length; i++) {
      const pj = ps[i][j]

      if (!pj) {
        continue
      }

      middles[pj.path] = middles[pj.path] || {}
      middles[pj.path][pj.name] = middles[pj.path][pj.name] || pj
      middles[pj.path][pj.name].last = middles[pj.path][pj.name].last || pj.last
      middles[pj.path][pj.name].methods = middles[pj.path][pj.name].methods || pj.methods
      middles[pj.path][pj.name].ops = middles[pj.path][pj.name].ops || pj.ops

      ps[i][j] = middles[pj.path][pj.name]
    }
  }

  ps.forEach(function (p, i) {
    // if (!i) {
    //   return
    // }

    let previous
    previous = root

    p.forEach(function (n, j) {
      if (nodes.indexOf(n) === -1) {
        nodes.push(n)
      }

      if (previous) {
        links.push([previous, n])
      }
      previous = n
    })
  })

  return {
    org: root,
    nodes: nodes,
    links: links
  }
}
