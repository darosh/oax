const fse = require('fs-extra')
const path = require('path')
const recursive = require('recursive-readdir')

const name = process.argv[2]

const sourceDir = `build/${name}`
const sourceBackup = `build/${name}_backup`
const targetDir = `node_modules/${name}`

recursive(sourceDir, function (err, files) {
  if (err) {
    throw err
  }

  files.forEach(f => {
    const r = path.relative(sourceDir, f)

    const s = path.join(targetDir, r)
    const t = path.join(sourceBackup, r)

    if (fse.pathExistsSync(s) && !fse.pathExistsSync(t)) {
      console.log(`backup "${s}" -> ${t}`)
      fse.copySync(s, t)
    }

    console.log(`patch "${f}" -> ${s}`)
    fse.copySync(f, s)
  })
})
