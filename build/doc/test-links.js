const fs = require('fs')
const tools = require('../../config/doc/tools.json')
const tests = require('openapi-samples')

const template = require('lodash.template')
const tmpl = fs.readFileSync('config/doc/test-links.md', 'utf8')
const targetPath = 'doc/RESEARCH.md'
// const target = fs.readFileSync(targetPath, 'utf8')

const compiled = template(tmpl)

fs.writeFileSync(targetPath + '.temp', compiled({tools, tests}))
