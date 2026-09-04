import PptxGenJS from 'pptxgenjs'
import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import { spawn } from 'child_process'
import http from 'http'

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)

const colors = {
    primary: '#b91c1c',
    dark: '#111827',
    muted: '#6b7280',
    light: '#f5f5f5',
    accent: '#d1d5db',
}

async function startServer() {
    return new Promise((resolve) => {
        const devServer = spawn('npm.cmd', ['run', 'dev'], {
            cwd: join(__dirname, '..'),
            stdio: 'ignore',
            shell: true
        })

        let attempts = 0
        const checkServer = setInterval(() => {
            attempts++
            const req = http.get('http://localhost:3000', () => {
                clearInterval(checkServer)
                console.log('✓ Dev server is ready')
                resolve(devServer)
            }).on('error', () => {
                if (attempts > 30) {
                    clearInterval(checkServer)
                    console.error('Could not connect to dev server')
                    process.exit(1)
                }
            })
            req.end()
        }, 500)
    })
}

async function captureSlideAsImage(page, slideNumber) {
    try {
        // Navigate to the specific slide
        await page.goto(`http://localhost:3000/?slideNumber=${slideNumber}`, {
            waitUntil: 'networkidle',
            timeout: 15000
        })

        // Wait for content to render
        await page.waitForTimeout(2000)

        // Get slide content
        const slideElement = await page.$('.reveal .slides section')
        if (!slideElement) return null

        // Capture as image
        const image = await slideElement.screenshot({ type: 'png' })
        return image
    } catch (error) {
        console.log(`Note: Could not capture slide ${slideNumber}: ${error.message}`)
        return null
    }
}

async function createPresentationWithCharts() {
    console.log('Starting comprehensive PPTX export...')

    const devServer = await startServer()

    try {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        page.setViewportSize({ width: 1920, height: 1080 })

        const prs = new PptxGenJS()
        prs.defineLayout({ name: 'LAYOUT1', width: 10, height: 7.5 })
        prs.layout = 'LAYOUT1'

        // Slide 1: Title Slide
        console.log('Creating slide 1: Title Slide')
        let slide = prs.addSlide()
        slide.background = { color: '#ffffff' }

        try {
            slide.addImage({
                path: 'https://new.molbiodiagnostics.com/mailSignature/png/Molbio_Logo.png',
                x: 4,
                y: 1.5,
                w: 2,
                h: 2
            })
        } catch (e) {}

        slide.addText('Molbio Diagnostics Limited', {
            x: 0,
            y: 3.5,
            w: 10,
            h: 0.4,
            fontSize: 28,
            bold: true,
            color: colors.dark,
            align: 'center',
            fontFace: 'Calibri'
        })
        slide.addText('Management Review Meeting', {
            x: 0,
            y: 4.0,
            w: 10,
            h: 0.5,
            fontSize: 40,
            bold: true,
            color: colors.primary,
            align: 'center',
            fontFace: 'Calibri'
        })
        slide.addText('December 15-16, 2025', {
            x: 0,
            y: 4.6,
            w: 10,
            h: 0.4,
            fontSize: 24,
            color: colors.muted,
            align: 'center',
            fontFace: 'Calibri'
        })
        slide.addText('Presented By: Hammed C R\nAsst. Manager, Quality Assurance Site-III', {
            x: 0,
            y: 5.3,
            w: 10,
            h: 0.6,
            fontSize: 18,
            color: colors.dark,
            align: 'center',
            fontFace: 'Calibri'
        })

        // Slides 2-12: Capture from running presentation
        const slideCount = 13
        const capturedSlides = {}

        console.log('Capturing slides from presentation...')
        for (let i = 1; i < slideCount; i++) {
            try {
                process.stdout.write(`  Capturing slide ${i}/${slideCount - 1}...`)
                const image = await captureSlideAsImage(page, i)
                if (image) {
                    capturedSlides[i] = image
                    console.log(' ✓')
                } else {
                    console.log(' (skipped)')
                }
                await page.waitForTimeout(500)
            } catch (error) {
                console.log(` (error: ${error.message})`)
            }
        }

        // Add captured slides
        Object.entries(capturedSlides).forEach(([slideNum, imageBuffer]) => {
            const slide = prs.addSlide()
            slide.background = { color: '#ffffff' }

            const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`
            slide.addImage({
                data: base64Image,
                x: 0,
                y: 0,
                w: 10,
                h: 7.5
            })
        })

        // Save presentation
        const distDir = join(__dirname, '..', 'dist')
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true })
        }

        const pptxPath = join(distDir, 'presentation.pptx')
        prs.writeFile({ fileName: pptxPath })
        console.log(`✓ PowerPoint presentation created: ${pptxPath}`)
        console.log(`  Total slides: ${Object.keys(capturedSlides).length + 1}`)

        await browser.close()
        devServer.kill()
    } catch (error) {
        console.error('Error during PPTX creation:', error.message)
        devServer.kill()
        process.exit(1)
    }
}

createPresentationWithCharts()
