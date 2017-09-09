const rimraf = require('rimraf')
const fs = require('fs')
const template = require('lodash.template')
const cfg = require('../config/screenshots.json')

rimraf.sync('screenshots/**/*.md')

const tmpl = fs.readFileSync('config/screenshots.md', 'utf8')
const tmplIndex = fs.readFileSync('config/screenshots_index.md', 'utf8')
const compiled = template(tmpl)
const compiledIndex = template(tmplIndex)
const files = []

function path (theme, screen, shot, index) {
  console.log(theme, screen, shot, index)
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

    fs.writeFileSync(`screenshots/${theme}-${screen}.md`, compiled({
      screen,
      size,
      theme,
      screens
    }))

    files[theme] = files[theme] || []
    files[theme][screen] = `${theme}-${screen}.md`
  }
}

fs.writeFileSync(`screenshots/README.md`, compiledIndex({
  files,
  themes: cfg.themes,
  screens: cfg.screens
}))
