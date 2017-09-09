const rimraf = require('rimraf')
const puppeteer = require('puppeteer')
const cfg = require('../config/screenshots.json')
const base = 'http://localhost:8080/#'

rimraf.sync('screenshots/images/**/*.png')

function path (theme, screen, shot, index) {
  console.log(theme, screen, shot, index)
  return `screenshots/images/${theme}_${screen}_${index < 10
    ? '0' + index
    : index}_${shot}.png`
}

(async () => {
  const browser = await puppeteer.launch()

  let page = await browser.newPage()

  for (const screen in cfg.screens) {

    await page.setViewport(
      {width: cfg.screens[screen][0], height: cfg.screens[screen][1]})

    let index = 0

    for (const shot in cfg.shots) {
      const s = cfg.shots[shot]

      if (s.url) {
        await page.goto(base + s.url, {waitUntil: 'networkidle'})

        if (cfg.before) {
          await page.evaluate(new Function(cfg.before))
        }
      }

      if (s.wait) {
        await page.waitFor(s.wait)
      }

      if (s.skip) {
        continue
      }

      index++

      for (const theme in cfg.themes) {
        await page.evaluate(new Function(cfg.themes[theme].eval))
        await page.screenshot({path: path(theme, screen, s.title, index)})
      }

      await page.goto('about:blank')
    }
  }

  browser.close()
})()
