const fs = require('fs')

fs.createReadStream(process.argv[2]).pipe(fs.createWriteStream(process.argv[3]))
