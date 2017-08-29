const fs = require('fs')

const path = './static/test/markdown/swagger-gfm.json'
let json = JSON.parse(fs.readFileSync(path, 'utf8'))
let md = fs.readFileSync('./static/test/markdown/README.md', 'utf8')
json.info.description = md
fs.writeFileSync(path, JSON.stringify(json, null, 2))
