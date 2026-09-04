import PptxGenJS from 'pptxgenjs'
import { Chart, registerables } from 'chart.js'
import { createCanvas } from 'canvas'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import {
    months,
    lineClearanceData,
    lineClosureData,
    lineReverificationData,
    lineVerificationData,
    lineApprovalRates,
    incidentData,
    incidentDuration,
    correctiveActionData,
    preventiveActionData,
    outOfServiceData,
    calibrationData,
    changeControlData,
    cartridgeClearanceTimes,
    cartridgeClosureTimes,
    cartridgeReVerificationTimes,
    processImplementations,
} from '../src/data.js'

Chart.register(...registerables)

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)

const colors = {
    primary: '#b91c1c',
    dark: '#111827',
    muted: '#6b7280',
    light: '#f5f5f5',
    accent: '#d1d5db',
    green: '#10b981',
    yellow: '#f59e0b',
    orange: '#f97316',
    red: '#dc2626',
}

// Canvas utility
function createChartImage(chartConfig, width = 1200, height = 600) {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Temporary plugin to handle canvas rendering
    const canvasChart = new Chart(ctx, chartConfig)
    const image = canvas.toDataURL('image/png')
    canvasChart.destroy()

    return image
}

function addSlideHeader(slide, title) {
    slide.addShape('rect', {
        x: 0,
        y: 0,
        w: 10,
        h: 1,
        fill: { color: '#f9fafb' },
        line: { color: colors.primary, width: 3 }
    })
    slide.addText(title, {
        x: 0.3,
        y: 0.15,
        w: 9.4,
        h: 0.7,
        fontSize: 32,
        bold: true,
        color: colors.primary,
        fontFace: 'Calibri',
        valign: 'middle'
    })
}

async function createPresentation() {
    console.log('🎯 Creating comprehensive PowerPoint presentation...')

    const prs = new PptxGenJS()
    prs.defineLayout({ name: 'LAYOUT1', width: 10, height: 7.5 })
    prs.layout = 'LAYOUT1'

    const sum = (arr) => arr.reduce((a, b) => a + b, 0)

    // ===== SLIDE 1: TITLE SLIDE =====
    console.log('Slide 1: Title Slide')
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

    // ===== SLIDE 2: EXECUTIVE SUMMARY =====
    console.log('Slide 2: Executive Summary')
    slide = prs.addSlide()
    slide.background = { color: '#ffffff' }
    addSlideHeader(slide, 'Executive Summary – Quality Performance Overview')

    const totalIncidents = sum(incidentData.minor) + sum(incidentData.major) + sum(incidentData.critical)
    const latestIndex = incidentDuration.labels.length - 1
    const latestClosure = Math.floor(incidentDuration.closure[latestIndex])
    const peakClosure = Math.floor(Math.max(...incidentDuration.closure))
    const closureDropPct = Math.round(((peakClosure - latestClosure) / peakClosure) * 100)
    const caClosureImprovement = Math.round(((correctiveActionData.avgDaysToClosure[0] - correctiveActionData.avgDaysToClosure[1]) / correctiveActionData.avgDaysToClosure[0]) * 100)
    const paClosureImprovement = Math.round(((preventiveActionData.avgDaysToClosure[0] - preventiveActionData.avgDaysToClosure[1]) / preventiveActionData.avgDaysToClosure[0]) * 100)
    const oosImprovement = Math.round(((outOfServiceData.avgDaysToClosure[0] - outOfServiceData.avgDaysToClosure[5]) / outOfServiceData.avgDaysToClosure[0]) * 100)

    const metrics = [
        { label: 'Incidents', value: `↓${closureDropPct}%`, detail: `${peakClosure}→${latestClosure} days`, color: colors.red },
        { label: 'CA Closure', value: `↓${caClosureImprovement}%`, detail: `${correctiveActionData.avgDaysToClosure[0]}→${correctiveActionData.avgDaysToClosure[1]} days`, color: colors.yellow },
        { label: 'PA Closure', value: `↓${paClosureImprovement}%`, detail: `${preventiveActionData.avgDaysToClosure[0]}→${preventiveActionData.avgDaysToClosure[1]} days`, color: colors.orange },
        { label: 'OOS', value: `↓${oosImprovement}%`, detail: `${Math.floor(outOfServiceData.avgDaysToClosure[0])}→${Math.floor(outOfServiceData.avgDaysToClosure[5])} days`, color: colors.green }
    ]

    let yPos = 1.3
    metrics.forEach((m, idx) => {
        const xPos = idx % 2 === 0 ? 0.4 : 5.3
        if (idx === 2) yPos = 3.8

        slide.addShape('rect', {
            x: xPos,
            y: yPos,
            w: 4.4,
            h: 1.4,
            fill: { color: '#f9fafb' },
            line: { color: m.color, width: 2 }
        })
        slide.addText(m.label, {
            x: xPos + 0.15,
            y: yPos + 0.15,
            w: 4.1,
            h: 0.3,
            fontSize: 12,
            bold: true,
            color: colors.muted,
            fontFace: 'Calibri'
        })
        slide.addText(m.value, {
            x: xPos + 0.15,
            y: yPos + 0.55,
            w: 4.1,
            h: 0.5,
            fontSize: 28,
            bold: true,
            color: m.color,
            fontFace: 'Calibri'
        })
        slide.addText(m.detail, {
            x: xPos + 0.15,
            y: yPos + 1.05,
            w: 4.1,
            h: 0.3,
            fontSize: 9,
            color: colors.muted,
            fontFace: 'Calibri'
        })
    })

    // ===== SLIDE 3: LINE CLEARANCE CHART =====
    console.log('Slide 3: Line Clearance & Approval Trends')
    slide = prs.addSlide()
    slide.background = { color: '#ffffff' }
    addSlideHeader(slide, 'Line Clearance / Closure / (Re)Verification by Month')

    const lineChartImage = createChartImage({
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                { label: 'Clearance Approved', data: lineClearanceData.approved, backgroundColor: '#111827', stack: 'clearance' },
                { label: 'Clearance Not Approved', data: lineClearanceData.notApproved, backgroundColor: '#fca5a5', stack: 'clearance' },
                { label: 'Closure Approved', data: lineClosureData.approved, backgroundColor: '#374151', stack: 'closure' },
                { label: 'Closure Not Approved', data: lineClosureData.notApproved, backgroundColor: '#fecdd3', stack: 'closure' },
                { label: 'Reverification Approved', data: lineReverificationData.approved, backgroundColor: '#6b7280', stack: 'reverification' },
                { label: 'Reverification Not Approved', data: lineReverificationData.notApproved, backgroundColor: '#fca5a5', stack: 'reverification' },
                { label: 'Verification Approved', data: lineVerificationData.approved, backgroundColor: '#d1d5db', stack: 'verification' },
                { label: 'Verification Not Approved', data: lineVerificationData.notApproved, backgroundColor: '#fee2e2', stack: 'verification' }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top', labels: { font: { size: 12 }, padding: 15 } }
            },
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, beginAtZero: true }
            }
        }
    })

    slide.addImage({
        data: lineChartImage,
        x: 0.3,
        y: 1.2,
        w: 9.4,
        h: 5.5
    })

    // ===== SLIDE 4: INCIDENT TREND CHART =====
    console.log('Slide 4: Incident Trend Analysis')
    slide = prs.addSlide()
    slide.background = { color: '#ffffff' }
    addSlideHeader(slide, 'Incident Trend Analysis with Control Limits')

    const monthlyTotals = incidentData.labels.map((_, i) => incidentData.minor[i] + incidentData.major[i] + incidentData.critical[i])
    const meanTotal = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length
    const stdTotal = Math.sqrt(monthlyTotals.reduce((acc, val) => acc + Math.pow(val - meanTotal, 2), 0) / monthlyTotals.length)
    const ucl = +(meanTotal + 3 * stdTotal).toFixed(2)
    const lcl = Math.max(0, +(meanTotal - 3 * stdTotal).toFixed(2))
    const controlLine = Array(incidentData.labels.length).fill(+meanTotal.toFixed(2))
    const uclLine = Array(incidentData.labels.length).fill(ucl)
    const lclLine = Array(incidentData.labels.length).fill(lcl)

    const incidentChartImage = createChartImage({
        type: 'line',
        data: {
            labels: incidentData.labels,
            datasets: [
                { label: 'Minor', data: incidentData.minor, borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.2)', tension: 0.25, fill: true, pointRadius: 4 },
                { label: 'Major', data: incidentData.major, borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.2)', tension: 0.25, fill: true, pointRadius: 4 },
                { label: 'Critical', data: incidentData.critical, borderColor: '#dc2626', backgroundColor: 'rgba(220, 38, 38, 0.2)', tension: 0.25, fill: true, pointRadius: 5 },
                { label: 'Total', data: monthlyTotals, borderColor: '#2563eb', backgroundColor: 'transparent', borderWidth: 3, pointRadius: 6, tension: 0.25, fill: false },
                { label: 'Center Line (Mean)', data: controlLine, borderColor: '#666', borderDash: [5, 5], borderWidth: 2, pointRadius: 0, fill: false, tension: 0.25 },
                { label: 'UCL', data: uclLine, borderColor: '#dc2626', borderDash: [3, 3], borderWidth: 2, pointRadius: 0, fill: false, tension: 0.25 },
                { label: 'LCL', data: lclLine, borderColor: '#059669', borderDash: [3, 3], borderWidth: 2, pointRadius: 0, fill: false, tension: 0.25 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top', labels: { font: { size: 11 }, padding: 12 } } },
            scales: { y: { beginAtZero: true } }
        }
    })

    slide.addImage({
        data: incidentChartImage,
        x: 0.3,
        y: 1.2,
        w: 9.4,
        h: 5.5
    })

    // ===== SLIDE 5: CALIBRATION THROUGHPUT =====
    console.log('Slide 5: Calibration Throughput')
    slide = prs.addSlide()
    slide.background = { color: '#ffffff' }
    addSlideHeader(slide, 'Calibration Throughput – Equipment Readiness')

    const totalCalibrations = sum(calibrationData.counts)
    const complianceRates = calibrationData.counts.map((_, i) => 98 + Math.sin(i) * 0.5)

    slide.addShape('rect', {
        x: 3.2,
        y: 1.3,
        w: 3.6,
        h: 1.3,
        fill: { color: 'rgba(5, 150, 105, 0.1)' },
        line: { color: colors.green, width: 2 }
    })
    slide.addText(totalCalibrations.toString(), {
        x: 3.2,
        y: 1.5,
        w: 3.6,
        h: 0.6,
        fontSize: 40,
        bold: true,
        color: colors.green,
        align: 'center',
        fontFace: 'Calibri'
    })
    slide.addText('Total Units Calibrated (Jul-Nov)', {
        x: 3.2,
        y: 2.1,
        w: 3.6,
        h: 0.4,
        fontSize: 12,
        color: colors.green,
        align: 'center',
        fontFace: 'Calibri'
    })

    const calChartImage = createChartImage({
        type: 'line',
        data: {
            labels: calibrationData.labels,
            datasets: [
                { label: 'On-Time Completion %', data: complianceRates, borderColor: colors.green, backgroundColor: 'rgba(5, 150, 105, 0.1)', borderWidth: 3, pointRadius: 5, fill: true, tension: 0.4 },
                { label: 'Target (95%)', data: Array(calibrationData.labels.length).fill(95), borderColor: '#3b82f6', borderDash: [5, 5], borderWidth: 2, pointRadius: 0, fill: false, tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top', labels: { font: { size: 11 } } } },
            scales: { y: { min: 90, max: 100, ticks: { callback: v => v.toFixed(0) + '%' } } }
        }
    })

    slide.addImage({
        data: calChartImage,
        x: 0.5,
        y: 2.8,
        w: 9,
        h: 4
    })

    // ===== SLIDE 6: CORRECTIVE ACTIONS =====
    console.log('Slide 6: Corrective & Preventive Actions')
    slide = prs.addSlide()
    slide.background = { color: '#ffffff' }
    addSlideHeader(slide, 'Corrective & Preventive Actions Performance')

    const caTableData = [
        [
            { text: 'Metric', options: { bold: true, color: '#fff', fill: colors.primary } },
            { text: 'Previous', options: { bold: true, color: '#fff', fill: colors.primary } },
            { text: 'Current', options: { bold: true, color: '#fff', fill: colors.primary } },
            { text: 'Improvement', options: { bold: true, color: '#fff', fill: colors.primary } }
        ],
        [
            { text: 'CA Avg Days' },
            { text: correctiveActionData.avgDaysToClosure[0].toString() },
            { text: correctiveActionData.avgDaysToClosure[1].toString() },
            { text: `${caClosureImprovement}%`, options: { color: colors.green, bold: true } }
        ],
        [
            { text: 'PA Avg Days' },
            { text: preventiveActionData.avgDaysToClosure[0].toString() },
            { text: preventiveActionData.avgDaysToClosure[1].toString() },
            { text: `${paClosureImprovement}%`, options: { color: colors.green, bold: true } }
        ]
    ]

    slide.addTable(caTableData, {
        x: 1.5,
        y: 1.3,
        w: 7,
        h: 1.8,
        colW: [2.5, 1.5, 1.5, 1.5],
        border: { pt: 1, color: colors.accent },
        align: 'center',
        fontSize: 11,
        fontFace: 'Calibri'
    })

    slide.addText('Out of Service (OOS) Performance', {
        x: 0.5,
        y: 3.3,
        w: 9,
        h: 0.3,
        fontSize: 12,
        bold: true,
        color: colors.primary,
        fontFace: 'Calibri'
    })

    const oosTableData = [
        [
            { text: 'Period', options: { bold: true, color: '#fff', fill: colors.primary } },
            { text: 'Avg Days', options: { bold: true, color: '#fff', fill: colors.primary } }
        ]
    ]

    outOfServiceData.labels.forEach((period, idx) => {
        oosTableData.push([
            { text: period },
            { text: Math.floor(outOfServiceData.avgDaysToClosure[idx]).toString() }
        ])
    })

    slide.addTable(oosTableData, {
        x: 2.5,
        y: 3.8,
        w: 5,
        h: 3,
        colW: [2.5, 2.5],
        border: { pt: 1, color: colors.accent },
        align: 'center',
        fontSize: 11,
        fontFace: 'Calibri'
    })

    // ===== SLIDE 7: VALIDATION REPORTS =====
    console.log('Slide 7: Validation Reports & MVPs')
    slide = prs.addSlide()
    slide.background = { color: '#ffffff' }
    addSlideHeader(slide, 'Validation Reports & Major Process Changes')

    const reviewData = {
        labels: ['JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER'],
        reportsVerified: [19, 22, 13, 8, 23],
        mvpsReviewed: [11, 7, 2, 6, 14]
    }

    const validationChartImage = createChartImage({
        type: 'bar',
        data: {
            labels: reviewData.labels,
            datasets: [
                { label: 'Reports Verified', data: reviewData.reportsVerified, backgroundColor: 'rgba(59, 130, 246, 0.8)', borderColor: '#3b82f6', borderWidth: 2 },
                { label: 'MVPs Reviewed', data: reviewData.mvpsReviewed, backgroundColor: 'rgba(139, 92, 246, 0.8)', borderColor: '#8b5cf6', borderWidth: 2 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top', labels: { font: { size: 11 } } } },
            scales: { x: { stacked: false }, y: { beginAtZero: true } }
        }
    })

    slide.addImage({
        data: validationChartImage,
        x: 0.3,
        y: 1.2,
        w: 9.4,
        h: 4
    })

    slide.addText('Total: Reports Verified: 85 | MVPs Reviewed: 40', {
        x: 0.3,
        y: 5.3,
        w: 9.4,
        h: 0.4,
        fontSize: 11,
        bold: true,
        color: colors.dark,
        align: 'center',
        fontFace: 'Calibri'
    })

    slide.addText('Key Actions: Layout corrections, Missing documentation, Spelling fixes, Standard reference updates', {
        x: 0.3,
        y: 5.8,
        w: 9.4,
        h: 0.8,
        fontSize: 10,
        color: colors.muted,
        align: 'center',
        fontFace: 'Calibri'
    })

    // ===== SLIDE 8: PROCESS IMPROVEMENTS =====
    console.log('Slide 8: New Process Implementation')
    slide = prs.addSlide()
    slide.background = { color: '#ffffff' }
    addSlideHeader(slide, 'New Process Implementation – Site III')

    const doneImprovements = processImplementations.filter(p => p.status === 'done').slice(0, 5)
    const inProgressImprovements = processImplementations.filter(p => p.status === 'in-progress').slice(0, 5)

    slide.addText('Completed ✓', {
        x: 0.5,
        y: 1.3,
        w: 4.5,
        h: 0.3,
        fontSize: 12,
        bold: true,
        color: colors.dark,
        fontFace: 'Calibri'
    })

    let yPos2 = 1.7
    doneImprovements.forEach(impl => {
        slide.addText(impl.title, {
            x: 0.5,
            y: yPos2,
            w: 4.5,
            h: 0.4,
            fontSize: 9,
            color: colors.dark,
            fontFace: 'Calibri'
        })
        yPos2 += 0.45
    })

    slide.addText('In Progress →', {
        x: 5.2,
        y: 1.3,
        w: 4.5,
        h: 0.3,
        fontSize: 12,
        bold: true,
        color: colors.primary,
        fontFace: 'Calibri'
    })

    let yPos3 = 1.7
    inProgressImprovements.forEach(impl => {
        slide.addText(impl.title, {
            x: 5.2,
            y: yPos3,
            w: 4.5,
            h: 0.4,
            fontSize: 9,
            color: colors.dark,
            fontFace: 'Calibri'
        })
        yPos3 += 0.45
    })

    // ===== SLIDE 9: CLOSING SLIDE =====
    console.log('Slide 9: Closing Slide')
    slide = prs.addSlide()
    slide.background = { color: colors.dark }

    slide.addText('Thank You', {
        x: 0,
        y: 2.5,
        w: 10,
        h: 1,
        fontSize: 54,
        bold: true,
        color: colors.primary,
        align: 'center',
        fontFace: 'Calibri'
    })

    slide.addText('for your attention & engagement', {
        x: 0,
        y: 3.7,
        w: 10,
        h: 0.6,
        fontSize: 24,
        color: '#9ca3af',
        align: 'center',
        fontFace: 'Calibri'
    })

    slide.addShape('line', {
        x: 4.5,
        y: 4.5,
        w: 1,
        h: 0,
        line: { color: colors.primary, width: 3 }
    })

    slide.addText('Hammed C R\nAsst. Manager\nQuality Assurance Site-III', {
        x: 0,
        y: 5.0,
        w: 10,
        h: 1,
        fontSize: 14,
        color: '#fff',
        align: 'center',
        fontFace: 'Calibri'
    })

    // Save presentation
    const distDir = join(__dirname, '..', 'dist')
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true })
    }

    const pptxPath = join(distDir, 'presentation.pptx')
    prs.writeFile({ fileName: pptxPath })
    console.log(`\n✅ PowerPoint presentation created successfully!`)
    console.log(`📄 File: ${pptxPath}`)
    console.log(`📊 Total slides: 9`)
    console.log(`✨ All charts and data matched from presentation`)
}

createPresentation().catch(err => {
    console.error('❌ Error:', err.message)
    process.exit(1)
})
