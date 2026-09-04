import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { incidentData, incidentsList } from '../data'
import FullScreenChartModal from '../../components/FullScreenChartModal'

Chart.register(...registerables)

export default function IncidentTrend() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [isCriticalExpanded, setIsCriticalExpanded] = useState(false)
  const [chartImage, setChartImage] = useState('')
  const [expandedChart, setExpandedChart] = useState('')

  const sum = (arr) => arr.reduce((a, b) => a + b, 0)
  const totalMinor = sum(incidentData.minor)
  const totalMajor = sum(incidentData.major)
  const totalCritical = sum(incidentData.critical)
  const totalIncidents = totalMinor + totalMajor + totalCritical
  const latestMonthIndex = incidentData.labels.length - 1
  const latestMonthLabel = incidentData.labels[latestMonthIndex]
  const latestMonthTotal = incidentData.minor[latestMonthIndex] + incidentData.major[latestMonthIndex] + incidentData.critical[latestMonthIndex]
  const latestMinor = incidentData.minor[latestMonthIndex]
  const latestMajor = incidentData.major[latestMonthIndex]
  const latestCritical = incidentData.critical[latestMonthIndex]
  const monthlyTotals = incidentData.labels.map((_, idx) => incidentData.minor[idx] + incidentData.major[idx] + incidentData.critical[idx])
  const meanTotal = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length
  const stdTotal = Math.sqrt(monthlyTotals.reduce((acc, val) => acc + Math.pow(val - meanTotal, 2), 0) / monthlyTotals.length)
  const ucl = +(meanTotal + 3 * stdTotal).toFixed(2)
  const lcl = Math.max(0, +(meanTotal - 3 * stdTotal).toFixed(2))
  const controlLine = Array(incidentData.labels.length).fill(+meanTotal.toFixed(2))
  const uclLine = Array(incidentData.labels.length).fill(ucl)
  const lclLine = Array(incidentData.labels.length).fill(lcl)
  const aboveUclMonths = incidentData.labels.filter((_, idx) => monthlyTotals[idx] > ucl)

  const criticalIncidents = incidentsList.filter(incident => incident.severity === 'Critical')

  useEffect(() => {
    // Combined incident control chart with severity breakdown
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: incidentData.labels,
          datasets: [
            {
              label: 'Minor',
              data: incidentData.minor,
              borderColor: '#fbbf24',
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              tension: 0.25,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#f59e0b',
              stack: 'severity'
            },
            {
              label: 'Major',
              data: incidentData.major,
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              tension: 0.25,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#ea580c',
              stack: 'severity'
            },
            {
              label: 'Critical',
              data: incidentData.critical,
              borderColor: '#dc2626',
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              tension: 0.25,
              fill: true,
              pointRadius: 5,
              pointBackgroundColor: '#dc2626',
              stack: 'severity'
            },
            {
              label: 'Total',
              data: monthlyTotals,
              borderColor: '#2563eb',
              backgroundColor: 'transparent',
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: monthlyTotals.map(val => val > ucl ? '#dc2626' : '#2563eb'),
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              tension: 0.25,
              fill: false
            },
            {
              label: 'Center Line',
              data: controlLine,
              borderColor: '#0ea5e9',
              borderDash: [6, 6],
              pointRadius: 0,
              borderWidth: 2,
              fill: false
            },
            {
              label: 'UCL',
              data: uclLine,
              borderColor: '#dc2626',
              borderDash: [4, 6],
              pointRadius: 0,
              borderWidth: 2,
              fill: false
            },
            {
              label: 'LCL',
              data: lclLine,
              borderColor: '#16a34a',
              borderDash: [4, 6],
              pointRadius: 0,
              borderWidth: 2,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: { size: 11 },
                boxWidth: 12,
                padding: 10
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  if (context.dataset.label === 'Center Line' || context.dataset.label === 'UCL' || context.dataset.label === 'LCL') {
                    return context.dataset.label + ': ' + context.parsed.y.toFixed(2)
                  }
                  return context.dataset.label + ': ' + context.parsed.y
                },
                footer: function(tooltipItems) {
                  const dataItem = tooltipItems.find(item => item.dataset.label === 'Total');
                  if (dataItem) {
                    return 'Total: ' + dataItem.parsed.y;
                  }
                  return '';
                }
              }
            }
          },
          layout: { padding: 8 },
          scales: {
            y: {
              stacked: false,
              beginAtZero: true,
              grid: { drawBorder: false, color: '#e5e7eb' },
              ticks: { color: '#475569', font: { size: 11 } }
            },
            x: {
              grid: { drawBorder: false },
              ticks: { color: '#475569', font: { size: 11 } }
            }
          }
        }
      })

      setChartImage(chartInstance.current.toBase64Image())
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [totalMinor, totalMajor, totalCritical])

  const closeCriticalExpanded = () => setIsCriticalExpanded(false)

  return (
    <section className="content-slide" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fee2e2 100%)' }}>
      <h2 style={{ 
        borderBottom: '4px solid #22c55e', 
        paddingBottom: '8px', 
        marginBottom: '16px', 
        color: '#22c55e',
        fontSize: '1.8em'
      }}>
        🎯 Incident Management – 32% Faster Closure Times
      </h2>

      {/* Hero Achievement Badge */}
      <div style={{
        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        padding: '12px',
        borderRadius: '10px',
        marginBottom: '16px',
        border: '2px solid #22c55e',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.1em', fontWeight: '900', color: '#065f46' }}>
          ⚡ Closure Time Reduced: 25 days → 17 days | 8 Days Saved Per Incident
        </div>
        <div style={{ fontSize: '0.85em', color: '#047857', marginTop: '4px' }}>
          Systematic reduction achieved through process optimization & team coordination (Jan-Nov 2025)
        </div>
      </div>

      {/* KPI Cards - Enhanced with Before/After */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <div style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          borderLeft: '5px solid #22c55e',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.12)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '1.8em', fontWeight: '900', color: '#065f46', marginBottom: '4px' }}>↓32%</div>
          <div style={{ fontSize: '0.8em', color: '#047857', fontWeight: '600', letterSpacing: '0.02em' }}>Closure Improvement</div>
          <div style={{ fontSize: '0.7em', color: '#059669', marginTop: '4px' }}>25→17 days avg</div>
        </div>

        <div style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)',
          borderLeft: '5px solid #dc2626',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '1.8em', fontWeight: '900', color: '#b91c1c', marginBottom: '4px' }}>{totalCritical}</div>
          <div style={{ fontSize: '0.8em', color: '#991b1b', fontWeight: '600', letterSpacing: '0.02em' }}>Critical Incidents</div>
          <div style={{ fontSize: '0.7em', color: '#991b1b', marginTop: '4px' }}>Tracked & resolved</div>
        </div>

        <div style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, #fff7ed 0%, #fffbf0 100%)',
          borderLeft: '5px solid #ea580c',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(234, 88, 12, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '1.8em', fontWeight: '900', color: '#ea580c', marginBottom: '4px' }}>{totalMajor}</div>
          <div style={{ fontSize: '0.8em', color: '#c2410c', fontWeight: '600', letterSpacing: '0.02em' }}>Major Incidents</div>
          <div style={{ fontSize: '0.7em', color: '#c2410c', marginTop: '4px' }}>Managed efficiently</div>
        </div>

        <div style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          borderLeft: '5px solid #0f172a',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '1.8em', fontWeight: '900', color: '#0f172a', marginBottom: '4px' }}>{totalIncidents}</div>
          <div style={{ fontSize: '0.8em', color: '#475569', fontWeight: '600', letterSpacing: '0.02em' }}>Total Processed</div>
          <div style={{ fontSize: '0.7em', color: '#0f172a', marginTop: '4px' }}>Jan-Nov 2025</div>
        </div>
      </div>

      {/* Combined Incident Control Chart */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{ 
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)', 
            borderRadius: '14px', 
            padding: '22px 24px', 
            cursor: 'zoom-in', 
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)', 
            border: '1px solid #e5e8ed',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease'
          }}
          onClick={() => setExpandedChart('combined')}
          title="Click to expand"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.1), 0 6px 14px rgba(15, 23, 42, 0.06)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h4 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '1.05em', 
            fontWeight: '700', 
            color: '#0f172a', 
            letterSpacing: '0.005em',
            borderBottom: '2px solid #e5e8ed',
            paddingBottom: '10px'
          }}>Incident Trend with Control Limits</h4>
          <div style={{ height: '360px' }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Insights removed per request */}

      {/* Critical Incidents Modal */}
      {isCriticalExpanded && (
        <div className="modal-overlay" onClick={closeCriticalExpanded}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <h3 className="expanded-table-title">
              Critical Incidents (YTD)
              <button className="modal-close" onClick={closeCriticalExpanded}>×</button>
            </h3>
            <div className="expanded-incident-container">
              {criticalIncidents.length > 0 ? (
                criticalIncidents.map((incident, idx) => (
                  <div key={idx} style={{ marginBottom: '16px', padding: '12px', background: '#fef2f2', borderRadius: '6px', borderLeft: '3px solid #b91c1c' }}>
                    <div style={{ fontSize: '0.9em', fontWeight: '600', color: '#b91c1c', marginBottom: '6px' }}>
                      IR#{incident.irNumber} - {incident.date}
                    </div>
                    <div style={{ fontSize: '0.85em', color: '#374151', lineHeight: '1.5' }}>
                      {incident.description}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#6b7280', fontSize: '0.9em' }}>No critical incidents to display.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <FullScreenChartModal
        open={expandedChart === 'combined'}
        onClose={() => setExpandedChart('')}
        image={chartImage}
        title="Incident Trend with Control Limits"
      />
    </section>
  )
}


