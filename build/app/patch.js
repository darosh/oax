var fse = require('fs-extra')
var path = require('path')
var recursive = require('recursive-readdir')

const name = process.argv[2]

const sourceDir = `config/${name}`
const sourceBackup = `config/${name}_backup`
const targetDir = `node_modules/${name}`

recursive(sourceDir, function (err, files) {
  files.forEach(f => {
    const r = path.relative(sourceDir, f)

    const s = path.join(targetDir, r)
    const t = path.join(sourceBackup, r)

    if (fse.pathExistsSync(s) && !fse.pathExistsSync(t)) {
      console.log(`backup "${s}" to ${t}`)
      fse.copySync(s, t)
    }

    console.log(`patch "${f}" to ${s}`)
    fse.copySync(f, s)
  })
})
