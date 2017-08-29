const puppeteer = require('puppeteer')

const screenshots = 'screenshots/'
const W = 888
const W2 = W * 2
const M = W / 8
const M2 = M * 2;
const M4 = M * 4;
const T = 320;

(async () => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  await page.setViewport({width: W2, height: W})

  // Loading
  await page.goto('http://localhost:8080/', {waitUntil: 'networkidle'})
  await page.screenshot({path: screenshots + 'loading.png'})
  await page.setViewport({width: W2, height: M4})

  // Grouped
  await page.waitFor('.expansion-panel')
  page.evaluate(_ => {
    window.document.getElementsByTagName('main')[0].scrollBy(0, 400)
  })
  await page.screenshot({path: screenshots + 'grouped.png'})

  // Panel
  let el = await page.$('.operation')
  await el.click()
  await page.waitFor(T)
  await page.screenshot({path: screenshots + 'panel.png'})

  // Dark
  el = await page.$('.toolbar .menu:last-of-type button')
  await el.click()
  page.evaluate(_ => {
    window.OAX.$store.commit('TOGGLE_DARK')
  })
  await page.screenshot({path: screenshots + 'dark.png'})
  page.evaluate(_ => {
    window.OAX.$store.commit('TOGGLE_DARK')
  })

  // Dialog
  el = await page.$('.toolbar--scroll .operation')
  await el.click()
  await page.waitFor(T)
  await page.screenshot({
    path: screenshots + 'method-dialog.png',
    clip: {x: 400, y: 150, width: 400, height: 300}
  })

  el = await page.$('button[data-v-5c96e174]:last-child')
  await el.click()

  // Markdown
  await page.setViewport({width: M4, height: 1900})
  await page.goto(
    'http://localhost:8080/#/?url=.%2Fstatic%2Ftest%2Fmarkdown%2Fswagger-gfm.json',
    {waitUntil: 'networkidle'})
  await page.waitFor('.expansion-panel')
  await page.screenshot({
    path: screenshots + 'markdown.png',
    clip: {x: 0, y: 0, width: M4, height: 800}
  })
  await page.screenshot({
    path: screenshots + 'blocks.png',
    clip: {x: 0, y: 1030, width: M4, height: 800}
  })

  browser.close()
})()
