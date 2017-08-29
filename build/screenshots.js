const puppeteer = require('puppeteer')

const screenshots = 'screenshots/'
const W = 888
const W2 = W * 2
const M = W / 8
const M2 = M * 2
const M3 = M * 3
const M4 = M * 4
const M6 = M * 6
const T = 320

let counter = 0

function path (name) {
  return screenshots + '/' + ++counter + '_' + name + '.png'
}

(async () => {
  const browser = await puppeteer.launch()

  let page = await browser.newPage()

  async function test (dark, url) {
    await page.setViewport({width: M4, height: M6})

    // Loading
    await page.goto(url, {waitUntil: 'networkidle'})
    if (dark) {
      page.evaluate(_ => {
        window.OAX.$store.commit('TOGGLE_DARK')
      })
    }
    await page.screenshot({path: path('loading')})

    // Desktop
    await page.waitFor(T)
    await page.setViewport({width: W2, height: M6})
    await page.screenshot({path: path('desktop')})

    // Grouped
    await page.setViewport({width: W2, height: M6})
    await page.waitFor('.expansion-panel')
    page.evaluate(_ => {
      window.document.getElementsByTagName('main')[0].scrollBy(0, 400)
    })
    await page.screenshot({path: path('grouped')})

    // Panel
    let el = await page.$('.operation')
    await el.click()
    await page.waitFor(T)
    await page.screenshot({path: path('panel')})

    // Dialog
    await page.setViewport({width: W, height: M4})
    el = await page.$('.toolbar--scroll .operation')
    await el.click()
    await page.waitFor(T)
    await page.screenshot({
      path: path('method-dialog')
    })

    el = await page.$('button[data-v-5c96e174]:last-child')
    await el.click()

    // Markdown
    page = await browser.newPage()
    await page.setViewport({width: M4, height: 1900})
    await page.goto(
      'http://localhost:8080/#/?url=.%2Fstatic%2Ftest%2Fmarkdown%2Fswagger-gfm.json',
      {waitUntil: 'networkidle'})
    await page.waitFor('.expansion-panel')
    await page.screenshot({
      path: path('markdown'),
      clip: {x: 0, y: 0, width: M4, height: 800}
    })
    await page.screenshot({
      path: path('blocks'),
      clip: {x: 0, y: 1030, width: M4, height: 800}
    })
  }

  await test(true, 'http://localhost:8080/#/?url=https%3A%2F%2Fdarosh.github.io%2Fangular-swagger-ui-material%2Fswagger-drupal.json')
  await test(false, 'http://localhost:8080/')

  browser.close()
})()
