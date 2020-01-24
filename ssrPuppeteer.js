'use strict'

const puppeteer = require('puppeteer')
const RENDER_CACHE = new Map()

async function ssr(url) {
  if (RENDER_CACHE.has(url)) {
    return { html: RENDER_CACHE.get(url) }
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  try {
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.card-body > h2')
  } catch (e) {
    console.error(e)
  }

  const html = await page.content()
  await browser.close()

  RENDER_CACHE.set(url, html)

  return html
}

module.exports = ssr
