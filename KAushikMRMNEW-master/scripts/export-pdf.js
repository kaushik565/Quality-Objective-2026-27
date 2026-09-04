import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import http from 'http'
import { spawn } from 'child_process'

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)

async function startServer() {
    console.log('Starting dev server...')
    return new Promise((resolve) => {
        const devServer = spawn('npm.cmd', ['run', 'dev'], {
            cwd: join(__dirname, '..'),
            stdio: 'ignore',
            shell: true
        })

        // Wait for server to be ready
        let attempts = 0
        const checkServer = setInterval(() => {
            attempts++
            const req = http.get('http://localhost:3000', () => {
                clearInterval(checkServer)
                console.log('Dev server is ready!')
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

async function exportToPDF() {
    console.log('Starting PDF export process...')

    const devServer = await startServer()

    try {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        console.log('Navigating to presentation...')
            // Navigate to the presentation
        await page.goto('http://localhost:3000/?print-pdf', {
            waitUntil: 'networkidle',
            timeout: 60000
        })

        console.log('Waiting for Reveal.js to render...')
            // Wait for Reveal.js to be ready
        await page.waitForTimeout(3000)

        // Create dist directory if it doesn't exist
        const distDir = join(__dirname, '..', 'dist')
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true })
        }

        // Export to PDF
        const pdfPath = join(distDir, 'presentation.pdf')
        console.log('Exporting to PDF...')
        await page.pdf({
            path: pdfPath,
            width: '1920px',
            height: '1080px',
            printBackground: true,
            pageRanges: '1-9'
        })

        console.log(`✓ PDF exported successfully to: ${pdfPath}`)

        await browser.close()
        devServer.kill()
    } catch (error) {
        console.error('Error during PDF export:', error.message)
        devServer.kill()
        process.exit(1)
    }
}

exportToPDF()
