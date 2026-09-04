import { useMemo, useRef, useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const siteData = {
  'SITE-I': {
    totals: { Incidents: 262, CA: 89, PA: 29, OOS: 259, CC: 492 },
    improvements: { Incidents: 22, CA: 54, PA: 60, OOS: 19, CC: 13 },
    note: 'Largest volume; steady gains across PA and OOS'
  },
  'SITE-III': {
    totals: { Incidents: 82, CA: 52, PA: 66, OOS: 159, CC: 261 },
    improvements: { Incidents: 42, CA: 16, PA: 6, OOS: 36, CC: 61 },
    note: 'Strongest change control improvement and OOS gains'
  },
  'SITE-V': {
    totals: { Incidents: 196, CA: 70, PA: 37, OOS: 89, CC: 178 },
    improvements: { Incidents: 59, CA: 52, PA: 54, OOS: 42, CC: 23 },
    note: 'Best incident reduction; strong CA (NC) and PA improvements'
  }
}

const categoryMeta = [
  { key: 'Incidents', label: 'Incidents' },
  { key: 'CA', label: 'Corrective Actions' },
  { key: 'PA', label: 'Preventive Actions' },
  { key: 'OOS', label: 'Out of Specs' },
  { key: 'CC', label: 'Change Controls' }
]

// Comprehensive closure days data by category and site
// Ordered to show Change Controls first, then Incidents
const allClosureDaysData = {
  'Change Controls': {
    'SITE-I': { before: 46, after: 40, improvement: 13, color: '#3b82f6' },
    'SITE-III': { before: 41, after: 16, improvement: 61, color: '#3b82f6' },
    'SITE-V': { before: 50, after: 39, improvement: 22, color: '#3b82f6' }
  },
  'Incidents': {
    'SITE-I': { before: 19.9, after: 15.6, improvement: 22, color: '#3b82f6' },
    'SITE-III': { before: 24.3, after: 16.4, improvement: 33, color: '#3b82f6' },
    'SITE-V': { before: 17, after: 7, improvement: 59, color: '#3b82f6' }
  },
  'Corrective Actions': {
    'SITE-I': { before: 91, after: 42, improvement: 54, color: '#3b82f6' },
    'SITE-III': { before: 56, after: 47, improvement: 16, color: '#3b82f6' },
    'SITE-V': { before: 56, after: 27, improvement: 52, color: '#3b82f6' }
  },
  'Preventive Actions': {
    'SITE-I': { before: 135, after: 54, improvement: 60, color: '#3b82f6' },
    'SITE-III': { before: 36, after: 34, improvement: 6, color: '#3b82f6' },
    'SITE-V': { before: 63, after: 29, improvement: 54, color: '#3b82f6' }
  },
  'Out of Specs': {
    'SITE-I': { before: 21, after: 17, improvement: 19, color: '#3b82f6' },
    'SITE-III': { before: 14, after: 9, improvement: 36, color: '#3b82f6' },
    'SITE-V': { before: 12, after: 7, improvement: 42, color: '#3b82f6' }
  }
}

  const investigationDaysData = {
    'SITE-I': { janAug: 5.65, sepNov: 6.1, improvement: -8, total: 262 },
    'SITE-III': { janAug: 14.3, sepNov: 4.0, improvement: 72, total: 82 },
    'SITE-V': { janAug: 3.5, sepNov: 3.7, improvement: -6, total: 196 }
  }// Helper component for before/after comparison chart
function BeforeAfterChart({ title, data, unit, color }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    
    const ctx = canvasRef.current.getContext('2d')
    
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const sites = Object.keys(data)
    const janAugValues = sites.map(site => Math.round(data[site].janAug))
    const sepNovValues = sites.map(site => Math.round(data[site].sepNov))

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sites,
        datasets: [
          {
            label: 'Jan-Aug 2025',
            data: janAugValues,
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            borderColor: '#ef4444',
            borderWidth: 2
          },
          {
            label: 'Sep-Nov 2025',
            data: sepNovValues,
            backgroundColor: color || 'rgba(34, 197, 94, 0.7)',
            borderColor: color?.replace('0.7', '1') || '#22c55e',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { 
              font: { size: 11, weight: '700' },
              padding: 10,
              usePointStyle: true
            }
          },
          title: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y} ${unit}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}${unit}`,
              font: { size: 10, weight: '600' }
            },
            grid: { color: '#f1f5f9' }
          },
          x: {
            ticks: { font: { size: 11, weight: '700' } },
            grid: { display: false }
          }
        }
      }
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, unit, color])

  return <canvas ref={canvasRef} />
}

function RadarComparison({ data }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { size: 11, weight: '700' } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${Math.round(ctx.raw)}%`
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            suggestedMax: 70,
            ticks: { backdropColor: 'transparent', display: true, stepSize: 10, font: { size: 10, weight: '700' } },
            grid: { color: '#e2e8f0' },
            angleLines: { color: '#e2e8f0' },
            pointLabels: { font: { size: 11, weight: '800' }, color: '#0f172a' }
          }
        }
      }
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [data])

  return <canvas ref={canvasRef} />
}

export default function QMSOverview() {
  const [isRadarOpen, setRadarOpen] = useState(false)
  const radarPanelRef = useRef(null)
  const { overallTotals, siteTotals, bestSite, bestCategory, biggestVolumeSite } = useMemo(() => {
    const siteTotalsCalc = Object.entries(siteData).map(([name, data]) => {
      const total = Object.values(data.totals).reduce((sum, v) => sum + v, 0)
      const avgImprovement = Math.round(
        Object.values(data.improvements).reduce((sum, v) => sum + v, 0) / categoryMeta.length
      )
      return { name, total, avgImprovement }
    })

    const overallTotalsCalc = categoryMeta.reduce((acc, cat) => {
      acc[cat.key] = Object.values(siteData)
        .map(site => site.totals[cat.key])
        .reduce((sum, v) => sum + v, 0)
      return acc
    }, {})

    const bestSiteCalc = siteTotalsCalc.reduce((best, current) => (
      current.avgImprovement > best.avgImprovement ? current : best
    ), siteTotalsCalc[0])

    const bestCategoryCalc = categoryMeta
      .map(cat => {
        const sumImprovement = Object.values(siteData)
          .map(site => site.improvements[cat.key] ?? 0)
          .reduce((sum, v) => sum + v, 0)
        const avgImprovement = Math.round(sumImprovement / Object.keys(siteData).length)
        return { key: cat.key, label: cat.label, avgImprovement }
      })
      .sort((a, b) => b.avgImprovement - a.avgImprovement)[0]

    return {
      overallTotals: overallTotalsCalc,
      siteTotals: siteTotalsCalc,
      bestSite: bestSiteCalc,
        bestCategory: bestCategoryCalc,
        biggestVolumeSite: siteTotalsCalc.reduce((biggest, current) => (
          current.total > biggest.total ? current : biggest
        ), siteTotalsCalc[0])
    }
  }, [])

  useEffect(() => {
    if (isRadarOpen && radarPanelRef.current) {
      radarPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isRadarOpen])

  const radarData = useMemo(() => {
    const labels = Object.keys(allClosureDaysData)
    const siteNames = Object.keys(siteData)
    const palette = ['#0ea5e9', '#8b5cf6', '#22c55e']

    return {
      labels,
      datasets: siteNames.map((site, idx) => {
        const color = palette[idx % palette.length]
        return {
          label: site,
          data: labels.map(cat => allClosureDaysData[cat]?.[site]?.improvement ?? 0),
          backgroundColor: `${color}33`,
          borderColor: color,
          borderWidth: 2,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }
      })
    }
  }, [])

  const maxSiteTotal = Math.max(...siteTotals.map(s => s.total))
  const maxCategoryTotal = Math.max(...Object.values(overallTotals))

  return (
    <section className="content-slide qms-overview" data-state="qms-overview">
      <div className="qms-header">
        <div>
          <p className="eyebrow">=��� QMS Performance | All Sites & Categories</p>
          <h2>=�Ļ Closure Days Reduction - Complete Overview</h2>
          <p className="muted">This analysis compares average closure times (days from initiation to final closure) for all QMS categories across three sites. Red bars represent baseline performance (Jan-Jun 2025), while colored bars show improved performance (Jul-Nov 2025). Green indicates reduction, red indicates increase.</p>
        </div>
        <div className="tag-pill">
          <span className="pill-before">Jan-Jun</span>
          <span className="pill-arrow">G��</span>
          <span className="pill-after">Jul-Nov</span>
          <span className="pill-year">2025</span>
        </div>
      </div>



      {/* All Categories Closure Days Breakdown */}
      <div className="closure-categories-grid">
        {Object.entries(allClosureDaysData).map(([category, sites]) => {
          const totalBefore = Object.values(sites).reduce((sum, s) => sum + s.before, 0) / Object.keys(sites).length
          const totalAfter = Object.values(sites).reduce((sum, s) => sum + s.after, 0) / Object.keys(sites).length
          const color = Object.values(sites)[0].color
          
          // Find top performer (highest improvement)
          const topPerformer = Object.entries(sites).reduce((best, [site, data]) => 
            data.improvement > best.improvement ? { site, ...data } : best
          , { site: '', improvement: -999 })
                    // Generate explanation for top performer
                    const getTopPerformerReason = () => {
                      const reduction = Math.round(topPerformer.before - topPerformer.after)
                      if (topPerformer.improvement >= 50) {
                        return `Achieved exceptional ${Math.abs(reduction)}d reduction (${Math.round(topPerformer.before)}d G�� ${Math.round(topPerformer.after)}d)`
                      } else if (topPerformer.improvement >= 30) {
                        return `Strong performance with ${Math.abs(reduction)}d reduction`
                      } else if (topPerformer.improvement >= 15) {
                        return `Consistent improvement with ${Math.abs(reduction)}d reduction`
                      } else {
                        return `Moderate gains with ${Math.abs(reduction)}d reduction`
                      }
                    }
          
          
          return (
            <div key={category} className="category-closure-panel">
              <div className="panel-header" style={{ borderLeftColor: color }}>
                <div className="category-title">{category}</div>
              </div>
              
              <div className="closure-comparison-wrapper">
                <div className="before-after-labels">
                  <span className="period-label before">Jan-Jun 2025</span>
                  <span className="period-label after">Jul-Nov 2025</span>
                </div>
                
                {Object.entries(sites).map(([site, data]) => {
                  const maxVal = Math.max(data.before, data.after)
                  const beforeWidth = (data.before / maxVal) * 100
                  const afterWidth = (data.after / maxVal) * 100
                  const isImprovement = data.improvement > 0
                  const beforeDisplay = Math.round(data.before)
                  const afterDisplay = Math.round(data.after)
                  
                  return (
                    <div key={site} className="site-closure-row">
                      <div className="site-name-cell">{site}</div>
                      <div className="bars-cell">
                        <div className="dual-bars">
                          <div className="before-bar" style={{ width: `${beforeWidth}%` }}>
                            <span>{beforeDisplay}d</span>
                          </div>
                          <div 
                            className={`after-bar ${isImprovement ? 'improved' : 'degraded'}`} 
                            style={{ width: `${afterWidth}%`, background: color }}
                          >
                            <span>{afterDisplay}d</span>
                          </div>
                        </div>
                      </div>
                      <div className={`improvement-cell ${isImprovement ? 'positive' : 'negative'}`}>
                        {isImprovement ? 'G��' : 'G��'} {Math.abs(data.improvement)}%
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="category-footer">
                <div>
                  <div style={{ fontWeight: 900, marginBottom: '4px' }}>
                    =��� Top Performer: {topPerformer.site} ({topPerformer.improvement > 0 ? 'G��' : 'G��'} {Math.abs(topPerformer.improvement)}%)
                  </div>
                  <div style={{ fontSize: '0.85em', color: '#0f172a', fontStyle: 'italic' }}>
                    {getTopPerformerReason()}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Site Radar Comparison */}
      <div className={`radar-panel ${isRadarOpen ? 'is-open' : ''}`} ref={radarPanelRef}>
        <div className="panel-head">
          <h3 style={{ margin: 0 }}>=��� Site Comparison</h3>
          <span className="muted">Percent improvement by category (higher is better; negatives indicate regression)</span>
          <button className="radar-full-btn" onClick={() => setRadarOpen(true)}>Fullscreen</button>
        </div>
        <div className="radar-wrap clickable" onClick={() => setRadarOpen(true)}>
          <RadarComparison data={radarData} />
        </div>
        <p className="muted" style={{ marginTop: 12 }}>
          Click to expand. Each axis is a category; colored lines show site performance. Larger area = better overall improvement.
        </p>

        {isRadarOpen && (
          <div className="radar-overlay" onClick={() => setRadarOpen(false)}>
            <div className="radar-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>=��� Site Comparison G�� Fullscreen</h3>
                <button className="close-btn" onClick={() => setRadarOpen(false)}>G��</button>
              </div>
              <div className="radar-wrap large">
                <RadarComparison data={radarData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


