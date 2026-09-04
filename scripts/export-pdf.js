import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)

async function exportToPDF() {
    console.log('Starting PDF export...')

    const browser = await chromium.launch()
    const context = await browser.newContext({
        viewport: null // No initial viewport - we'll set it later
    })
    const page = await context.newPage()

    // Allow overriding the target URL/port; default to Vite's 5173
    const port = process.env.PORT || process.env.VITE_PORT || 5173
    const targetUrl = process.env.PRESENTATION_URL || `http://localhost:${port}/`

    try {
        await page.goto(targetUrl, { waitUntil: 'networkidle' })
    } catch (err) {
        console.error(`Failed to reach ${targetUrl}. Ensure the dev server is running (e.g., npm run dev -- --host --port ${port}).`)
        throw err
    }

    // Give React time to mount and Reveal.js to initialize...
    console.log('Waiting for React and Reveal to initialize...')
    await page.waitForTimeout(3000)

    // Force all sections to render as normal block flow (not positioned)
    await page.addStyleTag({
        content: `
            .reveal {
                overflow: visible !important;
                position: relative !important;
                width: 100% !important;
            }
            .reveal .slides {
                position: relative !important;
                overflow: visible !important;
                width: 100% !important;
                height: auto !important;
                display: block !important;
                left: auto !important;
                top: auto !important;
            }
            .reveal .slides section,
            .reveal .slides section.stack {
                position: relative !important;
                width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 52px 32px 52px 96px !important;
                overflow: visible !important;
                display: block !important;
                page-break-after: always !important;
                break-after: page !important;
                min-height: 1080px !important;
            }
        `
    })

    await page.waitForTimeout(500)

    // Wait for selector
    const selectors = ['#root', '.reveal', '.slides', '#reveal']
    let found = false
    let lastError = null
    for (const sel of selectors) {
        try {
            console.log(`Waiting for selector: ${sel}...`)
                // First check if element exists and is not hidden
            await page.waitForFunction(
                (selector) => {
                    const el = document.querySelector(selector)
                    return el && el.offsetParent !== null
                },
                sel, { timeout: 10000 }
            )
            console.log(`✓ Found and visible: ${sel}`)
            found = true
            break
        } catch (err) {
            lastError = err
            console.log(`✗ Not visible: ${sel}`)
        }
    }
    if (!found) {
        try {
            const bodyHtml = await page.content()
            throw new Error(`Slide container not visible. Tried: ${selectors.join(', ')}. Body length: ${bodyHtml.length}`)
        } catch (err2) {
            throw new Error(`Failed to find visible slide container. Selector error: ${lastError?.message}`)
        }
    }

    // Small extra buffer for assets/fonts  
    await page.waitForTimeout(1000)

    // Get the actual full content height AFTER forcing layout
    const fullHeight = await page.evaluate(() => {
        const slides = document.querySelector('.slides')
        return slides ? slides.scrollHeight : document.body.scrollHeight
    })
    console.log(`Full content height after layout: ${fullHeight}px`)

    // Set viewport to full content height
    await page.setViewportSize({ width: 1920, height: fullHeight })
    await page.waitForTimeout(500) // Create dist directory if it doesn't exist
    const distDir = join(__dirname, '..', 'dist')
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true })
    }

    // Export to PDF with content-aware height
    const pdfPath = join(distDir, 'presentation.pdf')
    const heightInInches = (Math.max(fullHeight, 1080) / 96).toFixed(2)
    await page.pdf({
        path: pdfPath,
        width: '20in',
        height: `${heightInInches}in`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
    })

    console.log(`PDF exported successfully to: ${pdfPath}`)

    await browser.close()
}

exportToPDF().catch(console.error)
