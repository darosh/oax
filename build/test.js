const fs = require('fs')
const tools = require('../config/tools.json')
const tests = require('../src/assets/test.json')

const template = require('lodash.template')
const tmpl = fs.readFileSync('config/test.md', 'utf8')
const targetPath = 'RESEARCH.md'
const target = fs.readFileSync(targetPath, 'utf8')

const compiled = template(tmpl)

fs.writeFileSync('___' + targetPath, compiled({tools, tests}))
