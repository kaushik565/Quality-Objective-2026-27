import { chromium } from 'playwright'
import fs from 'fs'

async function debugHTML() {
    const browser = await chromium.launch()
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
    const page = await context.newPage()

    await page.goto('http://localhost:5173/?print-pdf', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)

    const html = await page.content()
    fs.writeFileSync('D:\\MRMNEW-master\\KAushikMRMNEW-master\\debug-output.html', html)
    console.log('HTML saved to debug-output.html')

    const revealPrint = await page.evaluate(() => {
        const reveal = document.querySelector('.reveal')
        if (!reveal) return 'REVEAL_NOT_FOUND'
        const css = window.getComputedStyle(reveal)
        return {
            display: css.display,
            visibility: css.visibility,
            position: css.position,
            width: css.width,
            height: css.height,
            pageBreak: css.pageBreakInside,
            columnCount: css.columnCount
        }
    })
    console.log('Reveal print styles:', revealPrint)

    await browser.close()
}

debugHTML().catch(console.error)