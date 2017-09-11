const rimraf = require('rimraf')
const fs = require('fs')
const template = require('lodash.template')
const cfg = require('../../config/doc/screenshots.json')

if (process.argv[2]) {
  const pick = process.argv[2].split(',')

  Object.keys(cfg.screens).map(k => {
    if (pick.indexOf(k) === -1) {
      delete cfg.screens[k]
    }
  })
}

rimraf.sync('doc/screenshots/**/*.md')

const tmpl = fs.readFileSync('config/doc/screenshots.md', 'utf8')
const tmplIndex = fs.readFileSync('config/doc/screenshots_index.md', 'utf8')
const tmplShot = fs.readFileSync('config/doc/screenshot.md', 'utf8')
const compiled = template(tmpl)
const compiledIndex = template(tmplIndex)
const compiledShot = template(tmplShot)
const files = []

function path (theme, screen, shot, index) {
  return `./images/${theme}_${screen}_${index < 10
    ? '0' + index
    : index}_${shot}.png`
}

for (const theme in cfg.themes) {
  for (const screen in cfg.screens) {
    const size = cfg.screens[screen]
    let index = 0

    const screens = []

    for (const shot in cfg.shots) {
      const s = cfg.shots[shot]

      if (s.skip) {
        continue
      }

      index++

      screens.push({
        title: s.title,
        path: path(theme, screen, s.title, index)
      })
    }

    fs.writeFileSync(`doc/screenshots/${theme}-${screen}.md`, compiled({
      screen,
      size,
      theme,
      screens
    }))

    files[theme] = files[theme] || []
    files[theme][screen] = `${theme}-${screen}.md`
  }
}

const shots = cfg.shots.filter(v => !v.skip)

shots.forEach((shot, index) => {
  fs.writeFileSync(
    `doc/screenshots/${(index + 1) < 10 ? '0' + (index + 1) : (index +
      1)}_${shot.title}.md`, compiledShot({
      index,
      shot,
      shots,
      screens: cfg.screens,
      themes: cfg.themes
    }))
})

fs.writeFileSync(`doc/screenshots/README.md`, compiledIndex({
  files,
  themes: cfg.themes,
  screens: cfg.screens,
  shots: shots.map(v => v.title)
}))
