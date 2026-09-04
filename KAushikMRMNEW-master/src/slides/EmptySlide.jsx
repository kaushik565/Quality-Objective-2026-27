import { useState, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { incidentData, incidentDuration, correctiveActionData, preventiveActionData, outOfServiceData, changeControlData } from '../data'
import caChartImage from '../../image (6).png'
import paChartImage from '../../image (5).png'

Chart.register(...registerables)

export default function EmptySlide() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const oosChartRef = useRef(null)
  const oosChartInstance = useRef(null)

  const categories = ['Incidents', 'CA', 'PA', 'Out of Specifications', 'Change Controls']

  // Calculate incident metrics
  const sum = (arr) => arr.reduce((a, b) => a + b, 0)
  const totalMinor = sum(incidentData.minor)
  const totalMajor = sum(incidentData.major)
  const totalCritical = sum(incidentData.critical)
  const totalIncidents = totalMinor + totalMajor + totalCritical
  
  const latestIndex = incidentDuration.labels.length - 1
  const latestClosure = incidentDuration.closure[latestIndex]
  const latestInvestigation = incidentDuration.investigation[latestIndex]
  const peakClosure = Math.max(...incidentDuration.closure)
  const peakInvestigation = Math.max(...incidentDuration.investigation)
  const closureDropPct = Math.round(((peakClosure - latestClosure) / peakClosure) * 100)
  const investigationDropPct = Math.round(((peakInvestigation - latestInvestigation) / peakInvestigation) * 100)

  // CA metrics
  const caLatestIndex = correctiveActionData.labels.length - 1
  const caBeforeDays = correctiveActionData.avgDaysToClosure[0] // Jan-June: 51
  const caAfterDays = correctiveActionData.avgDaysToClosure[caLatestIndex] // July-Nov: 43
  const caBeforeTotal = correctiveActionData.total[0] // 13
  const caAfterTotal = correctiveActionData.total[caLatestIndex] // 39
  const caBeforeMNC = correctiveActionData.majorNonCompliance[0] // 10
  const caAfterMNC = correctiveActionData.majorNonCompliance[caLatestIndex] // 34
  const caBeforeNC = correctiveActionData.nonCompliance[0] // 3
  const caAfterNC = correctiveActionData.nonCompliance[caLatestIndex] // 5
  const caClosureImprovement = Math.round(((caBeforeDays - caAfterDays) / caBeforeDays) * 100) // % improvement in closure time
  const caTotalIncrease = Math.round(((caAfterTotal - caBeforeTotal) / caBeforeTotal) * 100) // % increase in total CAs

  // PA metrics
  const paLatestIndex = preventiveActionData.labels.length - 1
  const paBeforeDays = preventiveActionData.avgDaysToClosure[0] // Jan-June: 64
  const paAfterDays = preventiveActionData.avgDaysToClosure[paLatestIndex] // July-Nov: 60
  const paClosureImprovement = Math.round(((paBeforeDays - paAfterDays) / paBeforeDays) * 100) // % improvement in closure time

  // OOS metrics
  const oosMinDays = Math.min(...outOfServiceData.avgDaysToClosure) // Best performance
  const oosMaxDays = Math.max(...outOfServiceData.avgDaysToClosure) // Longest duration
  const oosAvgDays = Math.round(outOfServiceData.avgDaysToClosure.reduce((a, b) => a + b, 0) / outOfServiceData.avgDaysToClosure.length)
  const oosLatestDays = outOfServiceData.avgDaysToClosure[outOfServiceData.avgDaysToClosure.length - 1] // November: 6
  const oosFirstDays = outOfServiceData.avgDaysToClosure[0] // Apr-Jun: 27
  const oosImprovement = Math.round(((oosFirstDays - oosLatestDays) / oosFirstDays) * 100) // % improvement

  // Change Control metrics
  const ccFirstDays = changeControlData.avgDaysClosure.data[0] // January: 53.00
  const ccLatestDays = changeControlData.avgDaysClosure.data[changeControlData.avgDaysClosure.data.length - 1] // November: 15.60
  const ccImprovement = Math.round(((ccFirstDays - ccLatestDays) / ccFirstDays) * 100) // % improvement
  const ccAvgDays = Math.floor(changeControlData.avgDaysClosure.data.reduce((a, b) => a + b, 0) / changeControlData.avgDaysClosure.data.length)
  const ccMinDays = Math.min(...changeControlData.avgDaysClosure.data)
  const ccMaxDays = Math.max(...changeControlData.avgDaysClosure.data)

  // Setup chart for Incidents, CA, and Change Controls
  useEffect(() => {
    if ((selectedCategory === 'Incidents' || selectedCategory === 'CA' || selectedCategory === 'Change Controls') && chartRef.current) {
      // Give DOM time to render
      setTimeout(() => {
        if (!chartRef.current) return
        
        const ctx = chartRef.current.getContext('2d')
        
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        try {
          // Define chart data based on selected category
          let chartData, chartLabels
          
          if (selectedCategory === 'Incidents') {
            chartLabels = incidentDuration.labels
            chartData = [
              {
                label: 'Avg Days to Close',
                data: incidentDuration.closure,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              },
              {
                label: 'Avg Days to Investigate',
                data: incidentDuration.investigation,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              }
            ]
          } else if (selectedCategory === 'CA') {
            chartLabels = correctiveActionData.labels
            chartData = [
              {
                label: 'Avg Days to Closure',
                data: correctiveActionData.avgDaysToClosure,
                borderColor: '#b91c1c',
                backgroundColor: 'rgba(185, 28, 28, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#b91c1c',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              },
              {
                label: 'Total CAs',
                data: correctiveActionData.total,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35,
                yAxisID: 'y1'
              }
            ]
          } else if (selectedCategory === 'Change Controls') {
            chartLabels = changeControlData.avgDaysClosure.labels
            chartData = [
              {
                label: 'Avg Days to Closure',
                data: changeControlData.avgDaysClosure.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: changeControlData.avgDaysClosure.data.map(val => 
                  val < 25 ? '#059669' : val < 40 ? '#3b82f6' : '#ef4444'
                ),
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              }
            ]
          }
          
          chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: chartLabels,
              datasets: chartData
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                duration: 800,
                easing: 'easeInOutQuart'
              },
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: { size: 12 },
                    boxWidth: 15,
                    padding: 15
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: 12,
                  titleFont: { size: 12 },
                  bodyFont: { size: 11 },
                  cornerRadius: 6
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: { size: 11 }
                  },
                  title: {
                    display: true,
                    text: 'Days',
                    font: { size: 12, weight: 'bold' }
                  }
                },
                ...(selectedCategory === 'CA' && {
                  y1: {
                    beginAtZero: true,
                    position: 'right',
                    ticks: {
                      font: { size: 11 }
                    },
                    title: {
                      display: true,
                      text: 'Count',
                      font: { size: 12, weight: 'bold' }
                    },
                    grid: {
                      drawOnChartArea: false
                    }
                  }
                }),
                x: {
                  ticks: {
                    font: { size: 11 }
                  }
                }
              }
            }
          })
        } catch (error) {
          console.error('Chart error:', error)
        }
      }, 100)
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedCategory !== 'Out of Specifications') {
      if (oosChartInstance.current) {
        oosChartInstance.current.destroy()
        oosChartInstance.current = null
      }
      return
    }

    if (!oosChartRef.current) return

    const ctx = oosChartRef.current.getContext('2d')

    if (oosChartInstance.current) {
      oosChartInstance.current.destroy()
    }

    oosChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: outOfServiceData.labels,
        datasets: [
          {
            label: 'Avg Days to Closure',
            data: outOfServiceData.avgDaysToClosure,
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.12)',
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#7c3aed',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            fill: true,
            tension: 0.35
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
              font: { size: 12 },
              boxWidth: 14,
              padding: 14
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            padding: 10,
            titleFont: { size: 12 },
            bodyFont: { size: 11 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { size: 11 }
            },
            title: {
              display: true,
              text: 'Days',
              font: { size: 12, weight: 'bold' }
            }
          },
          x: {
            ticks: {
              font: { size: 11 }
            }
          }
        }
      }
    })

    return () => {
      if (oosChartInstance.current) {
        oosChartInstance.current.destroy()
        oosChartInstance.current = null
      }
    }
  }, [selectedCategory])

  return (
    <section className="content-slide">
      <h2 style={{ borderBottom: '4px solid #b91c1c', paddingBottom: '8px', marginBottom: '30px', color: '#b91c1c', fontSize: '1.8em', fontWeight: '600' }}>
        Overall Trend Analysis
      </h2>

      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '30px'
      }}>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            padding: '14px 28px',
            fontSize: '1.1em',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: !selectedCategory ? '#b91c1c' : '#e5e7eb',
            color: !selectedCategory ? '#ffffff' : '#111827',
            transition: 'all 0.3s ease',
            boxShadow: !selectedCategory ? '0 4px 12px rgba(185, 28, 28, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.08)',
            minWidth: '110px',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== null) {
              e.target.style.backgroundColor = '#d1d5db'
              e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== null) {
              e.target.style.backgroundColor = '#e5e7eb'
              e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.08)'
            }
          }}
        >
          🏠 Home
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '14px 28px',
              fontSize: '1.1em',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: selectedCategory === category ? '#b91c1c' : '#e5e7eb',
              color: selectedCategory === category ? '#ffffff' : '#111827',
              transition: 'all 0.3s ease',
              boxShadow: selectedCategory === category ? '0 4px 12px rgba(185, 28, 28, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.08)',
              minWidth: '110px',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = '#d1d5db'
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = '#e5e7eb'
                e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Overview - Show when no category is selected */}
      {!selectedCategory && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '1.3em', color: '#0f172a', fontWeight: '700', marginBottom: '20px' }}>
            📊 Key Metrics Overview
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {/* Incidents Overview */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)',
              borderLeft: '5px solid #dc2626',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#991b1b', fontWeight: '700', fontSize: '0.95em' }}>Incidents</h4>
              <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#dc2626', marginBottom: '4px' }}>{totalIncidents}</div>
              <div style={{ fontSize: '0.75em', color: '#7f1d1d', fontWeight: '500', marginBottom: '8px' }}>Closure Time</div>
              <div style={{ fontSize: '0.8em', color: '#991b1b', marginBottom: '8px', fontWeight: '600' }}>Before: {peakClosure} days</div>
              <div style={{ fontSize: '0.8em', color: '#991b1b', marginBottom: '4px', fontWeight: '600' }}>After: {latestClosure} days</div>
              <div style={{ fontSize: '0.8em', color: '#b45309', fontWeight: '600' }}>↓ Improved by {closureDropPct}%</div>
            </div>

            {/* CA Overview */}
            <div style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
              borderLeft: '5px solid #8b5cf6',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#6d28d9', fontWeight: '700', fontSize: '0.95em' }}>Corrective Actions</h4>
              <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#8b5cf6', marginBottom: '4px' }}>{caAfterTotal}</div>
              <div style={{ fontSize: '0.75em', color: '#5b21b6', fontWeight: '500', marginBottom: '8px' }}>Total (July-Nov)</div>
              <div style={{ fontSize: '0.8em', color: '#6d28d9', marginBottom: '4px', fontWeight: '600' }}>📉 Closure: {caClosureImprovement}% ↓</div>
              <div style={{ fontSize: '0.8em', color: '#5b21b6', fontWeight: '600' }}>{caAfterDays} days avg</div>
            </div>

            {/* PA Overview */}
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              borderLeft: '5px solid #10b981',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#047857', fontWeight: '700', fontSize: '0.95em' }}>Preventive Actions</h4>
              <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#10b981', marginBottom: '4px' }}>{paClosureImprovement}%</div>
              <div style={{ fontSize: '0.75em', color: '#065f46', fontWeight: '500', marginBottom: '8px' }}>Closure Improved</div>
              <div style={{ fontSize: '0.8em', color: '#047857', marginBottom: '4px', fontWeight: '600' }}>Before: {paBeforeDays} days</div>
              <div style={{ fontSize: '0.8em', color: '#065f46', fontWeight: '600' }}>After: {paAfterDays} days</div>
            </div>

            {/* OOS Overview */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderLeft: '5px solid #f59e0b',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#b45309', fontWeight: '700', fontSize: '0.95em' }}>Out of Specifications</h4>
              <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#d97706', marginBottom: '4px' }}>{oosImprovement}%</div>
              <div style={{ fontSize: '0.75em', color: '#78350f', fontWeight: '500', marginBottom: '8px' }}>Improvement</div>
              <div style={{ fontSize: '0.8em', color: '#b45309', marginBottom: '4px', fontWeight: '600' }}>Avg: {oosAvgDays} days</div>
              <div style={{ fontSize: '0.8em', color: '#78350f', fontWeight: '600' }}>Latest: {oosLatestDays} days</div>
            </div>

            {/* Change Controls Overview */}
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderLeft: '5px solid #3b82f6',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#1e40af', fontWeight: '700', fontSize: '0.95em' }}>Change Controls</h4>
              <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#3b82f6', marginBottom: '4px' }}>{ccImprovement}%</div>
              <div style={{ fontSize: '0.75em', color: '#1e3a8a', fontWeight: '500', marginBottom: '8px' }}>Closure Improved</div>
              <div style={{ fontSize: '0.8em', color: '#1e40af', marginBottom: '4px', fontWeight: '600' }}>From: {ccFirstDays} days</div>
              <div style={{ fontSize: '0.8em', color: '#1e3a8a', fontWeight: '600' }}>To: {ccLatestDays} days</div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: '#f0f9ff', borderRadius: '10px', border: '2px dashed #93c5fd', textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.95em', fontWeight: '500' }}>
              👆 Click on any button above to view detailed analysis and charts for that category
            </p>
          </div>
        </div>
      )}

      {selectedCategory === 'Incidents' && (
          <div style={{ marginTop: '20px', flex: 1 }}>
            {/* Incident Duration Chart */}
            <div style={{
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ padding: '16px', height: '320px' }}>
                <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>

            {/* Chart Legend */}
            <div style={{
              display: 'flex',
              gap: '30px',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '0.9em'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '3px', backgroundColor: '#2563eb' }}></div>
                <span style={{ color: '#6b7280' }}>Avg Days to Close</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '3px', backgroundColor: '#10b981' }}></div>
                <span style={{ color: '#6b7280' }}>Avg Days to Investigate</span>
              </div>
            </div>

            {/* Incident Severity KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #fecaca'
              }}>
                <div style={{ fontSize: '0.85em', color: '#991b1b', marginBottom: '8px' }}>Minor Incidents</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#dc2626' }}>73</div>
              </div>
              <div style={{
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #fde047'
              }}>
                <div style={{ fontSize: '0.85em', color: '#92400e', marginBottom: '8px' }}>Major Incidents</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#d97706' }}>7</div>
              </div>
              <div style={{
                backgroundColor: '#fee2e2',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #fca5a5'
              }}>
                <div style={{ fontSize: '0.85em', color: '#7f1d1d', marginBottom: '8px' }}>Critical Incidents</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#991b1b' }}>1</div>
              </div>
            </div>

            {/* Closure & Investigation Time KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                backgroundColor: '#dbeafe',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #7dd3fc'
              }}>
                <div style={{ fontSize: '0.85em', color: '#0369a1', marginBottom: '8px' }}>Closure Time Improvement</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#0284c7' }}>{closureDropPct}%</div>
                <div style={{ fontSize: '0.75em', color: '#0369a1', marginTop: '4px' }}>{peakClosure}d → {latestClosure}d</div>
              </div>
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #86efac'
              }}>
                <div style={{ fontSize: '0.85em', color: '#166534', marginBottom: '8px' }}>Investigation Time Improvement</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#16a34a' }}>{investigationDropPct}%</div>
                <div style={{ fontSize: '0.75em', color: '#166534', marginTop: '4px' }}>{peakInvestigation}d → {latestInvestigation}d</div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '1.1em', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Monthly Incident Summary</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px'
              }}>
                {incidentData.labels.slice(0, 6).map((month, idx) => (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '0.8em', color: '#6b7280', marginBottom: '8px', fontWeight: '500' }}>{month}</div>
                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#dc2626' }}>{incidentData.minor[idx]}</div>
                    <div style={{ fontSize: '0.7em', color: '#9ca3af', marginTop: '2px' }}>Minor</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Trend Summary */}
            <div style={{
              backgroundColor: '#dbeafe',
              borderLeft: '4px solid #0284c7',
              padding: '16px',
              borderRadius: '6px',
              marginTop: '20px'
            }}>
              <p style={{ margin: '0', color: '#0c4a6e', fontSize: '0.95em', fontWeight: '500' }}>
                📊 <strong>Key Findings:</strong> Total incidents decreased by 42% YoY. Critical incidents reduced to 1 (100% improvement). Closure time improved {closureDropPct}% and investigation time improved {investigationDropPct}%.
              </p>
            </div>
          </div>
      )}

      {selectedCategory === 'Change Controls' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* Chart Container */}
          <div style={{
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ padding: '16px', height: '320px' }}>
              <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          
          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            marginBottom: '20px',
            fontSize: '0.9em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '3px', backgroundColor: '#2563eb' }}></div>
              <span style={{ color: '#6b7280' }}>Avg Days to Close</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              backgroundColor: '#dbeafe',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #7dd3fc'
            }}>
              <div style={{ fontSize: '0.85em', color: '#0369a1', marginBottom: '8px' }}>Latest (Nov)</div>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#0284c7' }}>{ccLatestDays.toFixed(1)}</div>
              <div style={{ fontSize: '0.75em', color: '#0369a1', marginTop: '4px' }}>Days</div>
            </div>
            <div style={{
              backgroundColor: '#dcfce7',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #86efac'
            }}>
              <div style={{ fontSize: '0.85em', color: '#166534', marginBottom: '8px' }}>Best (Min)</div>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#16a34a' }}>{ccMinDays.toFixed(1)}</div>
              <div style={{ fontSize: '0.75em', color: '#166534', marginTop: '4px' }}>Days</div>
            </div>
            <div style={{
              backgroundColor: '#fef08a',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #fde047'
            }}>
              <div style={{ fontSize: '0.85em', color: '#854d0e', marginBottom: '8px' }}>Worst (Max)</div>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#d97706' }}>{ccMaxDays.toFixed(1)}</div>
              <div style={{ fontSize: '0.75em', color: '#854d0e', marginTop: '4px' }}>Days</div>
            </div>
            <div style={{
              backgroundColor: '#f3e8ff',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #ddd6fe'
            }}>
              <div style={{ fontSize: '0.85em', color: '#6d28d9', marginBottom: '8px' }}>Improvement</div>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#7c3aed' }}>{ccImprovement}%</div>
              <div style={{ fontSize: '0.75em', color: '#6d28d9', marginTop: '4px' }}>vs Jan</div>
            </div>
          </div>

          {/* Monthly Trend Table */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '1.1em', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Monthly Closure Time Trend</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '12px'
            }}>
              {changeControlData.avgDaysClosure.labels.map((month, idx) => {
                const value = changeControlData.avgDaysClosure.data[idx]
                const isImprovement = idx > 0 && value < changeControlData.avgDaysClosure.data[idx - 1]
                return (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: isImprovement ? '#dcfce7' : '#f9fafb',
                    borderRadius: '6px',
                    border: isImprovement ? '1px solid #86efac' : '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '0.75em', color: '#6b7280', marginBottom: '6px', fontWeight: '500' }}>{month}</div>
                    <div style={{ fontSize: '1.3em', fontWeight: 'bold', color: isImprovement ? '#16a34a' : '#2563eb' }}>{value.toFixed(1)}</div>
                    <div style={{ fontSize: '0.7em', color: '#9ca3af', marginTop: '2px' }}>days</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Trend Summary */}
          <div style={{
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '6px'
          }}>
            <p style={{ margin: '0', color: '#92400e', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>Key Insight:</strong> Change Control closure time improved {ccImprovement}% from {ccFirstDays.toFixed(1)} days (January) to {ccLatestDays.toFixed(1)} days (November). Average: {ccAvgDays} days. Consistent downward trend indicates effective process optimization.
            </p>
          </div>
        </div>
      )}

      {selectedCategory === 'CA' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* Total CAs Section - Moved to Top */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.2em',
                color: '#111827',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#f59e0b' }}>📋</span> Total Corrective Actions
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px'
            }}>
              {/* Jan-June Total */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#92400e',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>Jan-June</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#d97706',
                  lineHeight: '1'
                }}>{caBeforeTotal}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#92400e',
                  marginTop: '4px'
                }}>MNC: {caBeforeMNC} | NC: {caBeforeNC}</div>
              </div>

              {/* July-Nov Total */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#1e40af',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>July-Nov</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#2563eb',
                  lineHeight: '1'
                }}>{caAfterTotal}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#1e40af',
                  marginTop: '4px'
                }}>MNC: {caAfterMNC} | NC: {caAfterNC}</div>
              </div>

              {/* MNC Increase */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#7f1d1d',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>MNC Change</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#dc2626',
                  lineHeight: '1'
                }}>+{caAfterMNC - caBeforeMNC}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#7f1d1d',
                  marginTop: '4px'
                }}>{caBeforeMNC} → {caAfterMNC}</div>
              </div>

              {/* NC Increase */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#92400e',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>NC Change</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#d97706',
                  lineHeight: '1'
                }}>+{caAfterNC - caBeforeNC}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#92400e',
                  marginTop: '4px'
                }}>{caBeforeNC} → {caAfterNC}</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div style={{
            position: 'relative',
            height: '320px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#fafbfc',
            marginBottom: '16px'
          }}>
            <canvas ref={chartRef} style={{ display: 'block', width: '100%', height: '100%' }} />
          </div>
          
          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            marginBottom: '20px',
            fontSize: '0.9em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '3px', backgroundColor: '#b91c1c' }}></div>
              <span style={{ color: '#6b7280' }}>Avg Days to Closure</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '3px', backgroundColor: '#f59e0b' }}></div>
              <span style={{ color: '#6b7280' }}>Total CAs (Right Axis)</span>
            </div>
          </div>

          {/* CA KPI Cards - Redesigned with Visual Flow */}
          <div style={{ marginBottom: '20px' }}>
            {/* Closure Time Section */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '16px',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.2em',
                  color: '#111827',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#b91c1c' }}>⏱️</span> Avg Days to Closure
                </h3>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                justifyContent: 'space-around'
              }}>
                {/* Before */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    fontSize: '0.85em',
                    color: '#6b7280',
                    fontWeight: '600',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Jan-June</div>
                  <div style={{
                    fontSize: '3em',
                    fontWeight: '800',
                    color: '#dc2626',
                    lineHeight: '1'
                  }}>{caBeforeDays}d</div>
                  <div style={{
                    fontSize: '0.8em',
                    color: '#991b1b',
                    marginTop: '6px',
                    fontWeight: '500'
                  }}>Baseline</div>
                </div>

                {/* Arrow */}
                <div style={{
                  fontSize: '2.5em',
                  color: '#10b981',
                  fontWeight: 'bold'
                }}>→</div>

                {/* Now */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    fontSize: '0.85em',
                    color: '#6b7280',
                    fontWeight: '600',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>July-Nov</div>
                  <div style={{
                    fontSize: '3em',
                    fontWeight: '800',
                    color: '#2563eb',
                    lineHeight: '1'
                  }}>{caAfterDays}d</div>
                  <div style={{
                    fontSize: '0.8em',
                    color: '#1e40af',
                    marginTop: '6px',
                    fontWeight: '500'
                  }}>Current</div>
                </div>

                {/* Improvement Badge */}
                <div style={{
                  backgroundColor: '#dcfce7',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  border: '2px solid #86efac',
                  flex: 1,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '2.2em',
                    fontWeight: '800',
                    color: '#059669',
                    lineHeight: '1',
                    marginBottom: '4px'
                  }}>↓{caClosureImprovement}%</div>
                  <div style={{
                    fontSize: '0.8em',
                    color: '#065f46',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Faster</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional CA Analysis Chart */}
          <div style={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <img 
              src={caChartImage}
              alt="CA Analysis Chart" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Trend Summary Message */}
          <div style={{
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '20px'
          }}>
            <p style={{ margin: '0', color: '#92400e', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>CA Trend Summary:</strong> Closure time improved by {caClosureImprovement}% (51d → 43d). Total CAs increased by {caTotalIncrease}% ({caBeforeTotal} → {caAfterTotal}), with MNC rising from {caBeforeMNC} to {caAfterMNC}.
            </p>
          </div>
        </div>
      )}

      {selectedCategory === 'PA' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* PA KPI Cards - Closure Time Comparison */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.2em',
                color: '#111827',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#7c3aed' }}>⏱️</span> Avg Days to Closure
              </h3>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              justifyContent: 'space-around'
            }}>
              {/* Before */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontSize: '0.85em',
                  color: '#6b7280',
                  fontWeight: '600',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Jan-June</div>
                <div style={{
                  fontSize: '3em',
                  fontWeight: '800',
                  color: '#dc2626',
                  lineHeight: '1'
                }}>{paBeforeDays}d</div>
                <div style={{
                  fontSize: '0.8em',
                  color: '#991b1b',
                  marginTop: '6px',
                  fontWeight: '500'
                }}>Baseline</div>
              </div>

              {/* Arrow */}
              <div style={{
                fontSize: '2.5em',
                color: '#10b981',
                fontWeight: 'bold'
              }}>→</div>

              {/* Now */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontSize: '0.85em',
                  color: '#6b7280',
                  fontWeight: '600',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>July-Nov</div>
                <div style={{
                  fontSize: '3em',
                  fontWeight: '800',
                  color: '#2563eb',
                  lineHeight: '1'
                }}>{paAfterDays}d</div>
                <div style={{
                  fontSize: '0.8em',
                  color: '#1e40af',
                  marginTop: '6px',
                  fontWeight: '500'
                }}>Current</div>
              </div>

              {/* Improvement Badge */}
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '12px',
                padding: '16px 24px',
                border: '2px solid #86efac',
                flex: 1,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#059669',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>↓{paClosureImprovement}%</div>
                <div style={{
                  fontSize: '0.8em',
                  color: '#065f46',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Faster</div>
              </div>
            </div>
          </div>

          {/* PA Analysis Chart */}
          <div style={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <img 
              src={paChartImage}
              alt="PA Analysis Chart" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* PA Trend Summary */}
          <div style={{
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '20px'
          }}>
            <p style={{ margin: '0', color: '#92400e', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>PA Trend Summary:</strong> Closure time improved by {paClosureImprovement}% (64d → 60d). Preventive actions are being closed faster over time.
            </p>
          </div>
        </div>
      )}

      {selectedCategory === 'Out of Specifications' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* OOS KPI Cards */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.2em',
                color: '#111827',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#7c3aed' }}>⏱️</span> Average Days to Closure
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              {/* Best Performance */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#dcfce7', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#065f46',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>Best Performance</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#059669',
                  lineHeight: '1'
                }}>{oosMinDays}d</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#065f46',
                  marginTop: '4px'
                }}>November</div>
              </div>

              {/* Average */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#1e40af',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>Average</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#2563eb',
                  lineHeight: '1'
                }}>{oosAvgDays}d</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#1e40af',
                  marginTop: '4px'
                }}>Overall</div>
              </div>

              {/* Longest Duration */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#7f1d1d',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>Longest Duration</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#dc2626',
                  lineHeight: '1'
                }}>{oosMaxDays}d</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#7f1d1d',
                  marginTop: '4px'
                }}>July</div>
              </div>
            </div>
          </div>

          {/* Detailed Monthly Data */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            marginBottom: '20px'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '1.1em',
              color: '#111827',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📅 Monthly Closure Times
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px'
            }}>
              {outOfServiceData.labels.map((label, idx) => (
                <div key={idx} style={{
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    fontSize: '0.7em',
                    color: '#6b7280',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>{label}</div>
                  <div style={{
                    fontSize: '1.8em',
                    fontWeight: '800',
                    color: '#7c3aed'
                  }}>{outOfServiceData.avgDaysToClosure[idx]}d</div>
                </div>
              ))}
            </div>
          </div>

          {/* OOS Analysis Chart */}
          <div style={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ padding: '16px', height: '320px' }}>
              <canvas ref={oosChartRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>

          {/* OOS Trend Summary */}
          <div style={{
            backgroundColor: '#f3e8ff',
            borderLeft: '4px solid #7c3aed',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '20px'
          }}>
            <p style={{ margin: '0', color: '#6b21a8', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>OOS Trend Summary:</strong> Closure time improved by {oosImprovement}% ({oosFirstDays}d → {oosLatestDays}d). Best performance achieved in November at {oosMinDays} days. Average closure time: {oosAvgDays} days.
            </p>
          </div>
        </div>
      )}

      {selectedCategory && selectedCategory !== 'Incidents' && selectedCategory !== 'CA' && selectedCategory !== 'PA' && selectedCategory !== 'Out of Specifications' && selectedCategory !== 'Change Controls' && (
        <div style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          borderLeft: '4px solid #b91c1c',
          textAlign: 'center',
          fontSize: '1.1em',
          color: '#4b5563'
        }}>
          <strong style={{ color: '#b91c1c' }}>{selectedCategory}</strong> data will be displayed here
        </div>
      )}

      {selectedCategory === 'Change Controls' && (
        <div style={{ marginTop: '20px' }}>
          {/* KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              borderLeft: '5px solid #059669',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669' }}>{ccImprovement}%</div>
              <div style={{ fontSize: '0.85em', color: '#15803d', fontWeight: '500' }}>Improvement</div>
            </div>

            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderLeft: '5px solid #3b82f6',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#3b82f6' }}>{ccLatestDays}d</div>
              <div style={{ fontSize: '0.85em', color: '#1e40af', fontWeight: '500' }}>Latest (Nov)</div>
            </div>

            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderLeft: '5px solid #f59e0b',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706' }}>{ccAvgDays}d</div>
              <div style={{ fontSize: '0.85em', color: '#92400e', fontWeight: '500' }}>Average</div>
            </div>

            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              borderLeft: '5px solid #ef4444',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#dc2626' }}>{ccFirstDays}d</div>
              <div style={{ fontSize: '0.85em', color: '#991b1b', fontWeight: '500' }}>Initial (Jan)</div>
            </div>
          </div>

          {/* Average Days for Closure Chart */}
          <div style={{
            marginBottom: '24px',
            padding: '20px',
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ fontSize: '1.1em', marginBottom: '16px', color: '#1f2937', fontWeight: '600' }}>
              Average Days Taken for Closure of Change Control
            </h3>
            <div style={{ height: '280px' }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          {/* Trend Analysis Summary */}
          <div style={{
            backgroundColor: '#eff6ff',
            borderLeft: '4px solid #3b82f6',
            padding: '16px',
            borderRadius: '6px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0', color: '#1e40af', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>Change Control Trend:</strong> Closure time improved by {ccImprovement}% from {ccFirstDays} days (January) to {ccLatestDays} days (November). Best performance: {ccMinDays} days. Average closure time: {ccAvgDays} days.
            </p>
          </div>

          {/* Percentage Closed in Same Month */}
          <div style={{
            marginBottom: '24px',
            padding: '24px',
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)',
            borderRadius: '14px',
            border: '1px solid #e5e8ed',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)'
          }}>
            <h3 style={{ 
              fontSize: '1.05em', 
              marginBottom: '20px', 
              color: '#0f172a', 
              fontWeight: '700',
              letterSpacing: '0.005em'
            }}>
              Percentage of Change Controls Closed in the Same Month
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
              gap: '14px',
              marginTop: '16px'
            }}>
              {changeControlData.closurePercentage.labels.map((month, idx) => {
                const percentage = changeControlData.closurePercentage.data[idx]
                const getColor = (val) => {
                  if (val >= 30) return { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '#059669', text: '#059669' }
                  if (val >= 20) return { bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '#3b82f6', text: '#3b82f6' }
                  return { bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '#ef4444', text: '#ef4444' }
                }
                const colors = getColor(percentage)
                
                return (
                  <div key={month} style={{
                    textAlign: 'center',
                    padding: '14px 10px',
                    background: colors.bg,
                    borderRadius: '10px',
                    borderLeft: `4px solid ${colors.border}`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                  >
                    <div style={{ 
                      fontSize: '0.75em', 
                      color: '#0f172a', 
                      marginBottom: '6px', 
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>{month}</div>
                    <div style={{ 
                      fontSize: '2em', 
                      fontWeight: '800', 
                      color: colors.text,
                      marginBottom: '2px'
                    }}>
                      {percentage}%
                    </div>
                    <div style={{
                      fontSize: '0.65em',
                      color: '#94a3b8',
                      fontWeight: '500'
                    }}>
                      {percentage >= 30 ? 'Excellent' : percentage >= 20 ? 'Good' : 'Low'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '24px',
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px', fontWeight: '500' }}>Average</div>
                <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#0f172a' }}>
                  {Math.round(changeControlData.closurePercentage.data.reduce((a, b) => a + b, 0) / changeControlData.closurePercentage.data.length)}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px', fontWeight: '500' }}>Best</div>
                <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#059669' }}>
                  {Math.max(...changeControlData.closurePercentage.data)}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px', fontWeight: '500' }}>Lowest</div>
                <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#ef4444' }}>
                  {Math.min(...changeControlData.closurePercentage.data)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


