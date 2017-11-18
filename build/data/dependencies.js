const fs = require('fs')

const pkg = require('../../package.json')

const deps = pkg.dependencies

Object.keys(deps).forEach(d => {
  if (d[0] === '@' || (deps[d].startsWith('github:') === 0)) {
    delete deps[d]
  } else {
    deps[d] = deps[d].replace('^', '').replace(/(.*)\.[^.]+/, '$1')
  }
})

fs.writeFileSync('./assets/data/dependencies.json', JSON.stringify(deps, null, 2))
