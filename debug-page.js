import { chromium } from 'playwright'

async function debugPage() {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:5173/?print-pdf', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const title = await page.title()
    console.log('Page title:', title)

    const revealVisible = await page.evaluate(() => {
        const reveal = document.querySelector('.reveal')
        if (!reveal) return 'NOT_FOUND'
        const style = window.getComputedStyle(reveal)
        return {
            display: style.display,
            visibility: style.visibility,
            offsetHeight: reveal.offsetHeight,
            offsetWidth: reveal.offsetWidth,
            children: reveal.children.length
        }
    })
    console.log('Reveal element:', revealVisible)

    const slides = await page.evaluate(() => {
        const slidesEl = document.querySelector('.slides')
        if (!slidesEl) return 'NOT_FOUND'
        return {
            children: slidesEl.children.length,
            offsetHeight: slidesEl.offsetHeight,
            offsetWidth: slidesEl.offsetWidth
        }
    })
    console.log('Slides element:', slides)

    const sections = await page.evaluate(() => {
        return document.querySelectorAll('section').length
    })
    console.log('Section count:', sections)

    await browser.close()
}

debugPage().catch(console.error)