import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { cartridgeClearanceTimes, cartridgeClosureTimes, cartridgeReVerificationTimes } from '../data'
import FullScreenChartModal from '../../components/FullScreenChartModal'

Chart.register(...registerables)

export default function CartridgeAssembly() {
  const clearanceChartRef = useRef(null)
  const clearanceChartInstance = useRef(null)
  const closureChartRef = useRef(null)
  const closureChartInstance = useRef(null)
  const reverificationChartRef = useRef(null)
  const reverificationChartInstance = useRef(null)
  const [chartImages, setChartImages] = useState({ clearance: '', closure: '', reverification: '' })
  const [activeChartKey, setActiveChartKey] = useState('')

  // Calculate before (Jan-Aug) and after (Sep-Nov) averages
  const getBeforeAfterAverages = (dataObj) => {
    if (!dataObj || !dataObj.data) return { before: '0.00', after: '0.00', improvement: '0.00' }
    
    const beforeValues = []
    const afterValues = []
    
    Object.values(dataObj.data).forEach(times => {
      if (Array.isArray(times)) {
        // Jan-Aug is index 0
        if (times[0] !== null && times[0] !== undefined) beforeValues.push(times[0])
        // Sep, Oct, Nov are indices 1, 2, 3
        for (let i = 1; i <= 3; i++) {
          if (times[i] !== null && times[i] !== undefined) afterValues.push(times[i])
        }
      }
    })
    
    const before = beforeValues.length > 0 
      ? Math.floor(beforeValues.reduce((a, b) => a + b, 0) / beforeValues.length).toString()
      : '0'
    const after = afterValues.length > 0 
      ? Math.floor(afterValues.reduce((a, b) => a + b, 0) / afterValues.length).toString()
      : '0'
    const improvement = ((parseFloat(before) - parseFloat(after)) / parseFloat(before) * 100).toFixed(1)
    
    return { before, after, improvement }
  }

  // Create control chart showing average time across all processes
  const createControlChart = (dataObj, containerRef, chartInstance, key, title) => {
    if (!containerRef.current || !dataObj || !dataObj.data) return
    
    const ctx = containerRef.current.getContext('2d')
    if (!ctx) return
    
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Calculate average time for each time period (Jan-Aug, Sep, Oct, Nov)
    const averagesByPeriod = dataObj.labels.map((_, timeIdx) => {
      const values = []
      Object.values(dataObj.data).forEach(times => {
        if (times[timeIdx] !== null && times[timeIdx] !== undefined) {
          values.push(times[timeIdx])
        }
      })
      return values.length > 0 
        ? values.reduce((a, b) => a + b, 0) / values.length 
        : null
    })

    // Calculate baseline (Jan-Aug, index 0) for comparison
    const baseline = averagesByPeriod[0] || 0

    // Calculate overall mean and control limits
    const validAverages = averagesByPeriod.filter(v => v !== null)
    const mean = validAverages.length > 0 
      ? validAverages.reduce((a, b) => a + b, 0) / validAverages.length 
      : 0
    const stdDev = validAverages.length > 0
      ? Math.sqrt(validAverages.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validAverages.length)
      : 0
    const ucl = mean + (2 * stdDev)
    const lcl = Math.max(0, mean - (2 * stdDev))

    // Determine point colors based on whether time is reduced compared to baseline (Jan-Aug)
    const pointColors = averagesByPeriod.map((val, idx) => {
      if (val === null) return '#94a3b8'
      if (idx === 0) return '#3b82f6' // Baseline is blue
      return val < baseline ? '#059669' : '#b91c1c' // Green if reduced, red if increased
    })
    
    const datasets = [{
      label: 'Average Time (All Processes)',
      data: averagesByPeriod,
      borderColor: '#0f172a',
      backgroundColor: pointColors,
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      tension: 0.3,
      spanGaps: true
    }]

    // Add control limit lines
    datasets.push({
      label: 'UCL (Upper Control Limit)',
      data: Array(dataObj.labels.length).fill(ucl),
      borderColor: '#dc2626',
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false
    })
    
    datasets.push({
      label: 'Mean',
      data: Array(dataObj.labels.length).fill(mean),
      borderColor: '#3b82f6',
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false
    })
    
    datasets.push({
      label: 'LCL (Lower Control Limit)',
      data: Array(dataObj.labels.length).fill(lcl),
      borderColor: '#059669',
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false
    })

    try {
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dataObj.labels,
          datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { 
                font: { size: 10 }, 
                padding: 8,
                boxWidth: 12
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || ''
                  const value = context.parsed.y
                  if (value !== null && label.includes('Average')) {
                    const diff = value - baseline
                    const diffPercent = ((diff / baseline) * 100).toFixed(1)
                    let status = ''
                    if (context.dataIndex === 0) {
                      status = '(Baseline)'
                    } else if (diff < 0) {
                      status = `(Reduced by ${Math.abs(parseFloat(diffPercent))}% ✓)`
                    } else if (diff > 0) {
                      status = `(Increased by ${diffPercent}%)`
                    } else {
                      status = '(No change)'
                    }
                    return `${label}: ${Math.floor(value)} mins ${status}`
                  }
                  return `${label}: ${value !== null ? Math.floor(value) : 'N/A'}`
                },
                footer: (items) => {
                  return `Baseline (Jan-Aug): ${Math.floor(baseline)} | Mean: ${Math.floor(mean)} | UCL: ${Math.floor(ucl)} | LCL: ${Math.floor(lcl)}`
                }
              }
            }
          },
          scales: {
            y: {
              title: { display: true, text: 'Time (Minutes)', font: { size: 11 } },
              beginAtZero: false,
              grid: { color: '#e5e7eb' },
              ticks: { font: { size: 10 } }
            },
            x: {
              ticks: { font: { size: 10 } },
              grid: { color: '#e5e7eb' }
            }
          }
        }
      })

      chartInstance.current = newChart
      setTimeout(() => {
        if (chartInstance.current && chartInstance.current.canvas) {
          try {
            const base64 = chartInstance.current.toBase64Image()
            if (base64) {
              setChartImages(prev => ({ ...prev, [key]: base64 }))
            }
          } catch (err) {
            console.error('Error converting chart to base64:', err)
          }
        }
      }, 200)
    } catch (error) {
      console.error('Error creating chart:', error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      createControlChart(cartridgeClearanceTimes, clearanceChartRef, clearanceChartInstance, 'clearance', 'Line Clearance')
      createControlChart(cartridgeClosureTimes, closureChartRef, closureChartInstance, 'closure', 'Line Closure')
      createControlChart(cartridgeReVerificationTimes, reverificationChartRef, reverificationChartInstance, 'reverification', 'Re-Verification')
    }, 50)
    
    return () => clearTimeout(timer)
  }, [])

  const clearanceMetrics = getBeforeAfterAverages(cartridgeClearanceTimes)
  const closureMetrics = getBeforeAfterAverages(cartridgeClosureTimes)
  const reverificationMetrics = getBeforeAfterAverages(cartridgeReVerificationTimes)

  return (
    <section className="content-slide">
      <h2 style={{ marginBottom: '24px' }}>
        IPQA Cartridge Assembly Department - Process Performance
      </h2>
      
      {/* Before/After Comparison Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {/* Line Clearance */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          borderLeft: '5px solid #059669',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.08)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        >
          <div style={{ 
            fontSize: '0.88em', 
            fontWeight: '500', 
            color: '#0f172a', 
            marginBottom: '12px', 
            textAlign: 'center',
            letterSpacing: '0.02em'
          }}>
            Line Clearance
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px' }}>Before</div>
              <div style={{ fontSize: '0.65em', color: '#94a3b8', marginBottom: '4px' }}>(Jan-Aug)</div>
              <div style={{ 
                fontSize: '1.5em', 
                fontWeight: '700', 
                color: '#b91c1c'
              }}>{clearanceMetrics.before}</div>
              <div style={{ fontSize: '0.7em', color: '#94a3b8' }}>mins avg</div>
            </div>
            <div style={{ 
              fontSize: '1.5em', 
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center'
            }}>→</div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px' }}>After</div>
              <div style={{ fontSize: '0.65em', color: '#94a3b8', marginBottom: '4px' }}>(Sep-Nov)</div>
              <div style={{ 
                fontSize: '1.5em', 
                fontWeight: '700', 
                color: '#059669'
              }}>{clearanceMetrics.after}</div>
              <div style={{ fontSize: '0.7em', color: '#94a3b8' }}>mins avg</div>
            </div>
          </div>
          <div style={{
            padding: '6px 12px',
            background: parseFloat(clearanceMetrics.improvement) > 0 ? '#f0fdf4' : '#fef2f2',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '0.8em',
            fontWeight: '600',
            color: parseFloat(clearanceMetrics.improvement) > 0 ? '#059669' : '#b91c1c'
          }}>
            {parseFloat(clearanceMetrics.improvement) > 0 ? '↓' : '↑'} {Math.abs(parseFloat(clearanceMetrics.improvement))}% change
          </div>
        </div>

        {/* Line Closure */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          borderLeft: '5px solid #ea580c',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(234, 88, 12, 0.08)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        >
          <div style={{ 
            fontSize: '0.88em', 
            fontWeight: '500', 
            color: '#0f172a', 
            marginBottom: '12px', 
            textAlign: 'center',
            letterSpacing: '0.02em'
          }}>
            Line Closure
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px' }}>Before</div>
              <div style={{ fontSize: '0.65em', color: '#94a3b8', marginBottom: '4px' }}>(Jan-Aug)</div>
              <div style={{ 
                fontSize: '1.5em', 
                fontWeight: '700', 
                color: '#b91c1c'
              }}>{closureMetrics.before}</div>
              <div style={{ fontSize: '0.7em', color: '#94a3b8' }}>mins avg</div>
            </div>
            <div style={{ 
              fontSize: '1.5em', 
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center'
            }}>→</div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px' }}>After</div>
              <div style={{ fontSize: '0.65em', color: '#94a3b8', marginBottom: '4px' }}>(Sep-Nov)</div>
              <div style={{ 
                fontSize: '1.5em', 
                fontWeight: '700', 
                color: '#059669'
              }}>{closureMetrics.after}</div>
              <div style={{ fontSize: '0.7em', color: '#94a3b8' }}>mins avg</div>
            </div>
          </div>
          <div style={{
            padding: '6px 12px',
            background: parseFloat(closureMetrics.improvement) > 0 ? '#f0fdf4' : '#fef2f2',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '0.8em',
            fontWeight: '600',
            color: parseFloat(closureMetrics.improvement) > 0 ? '#059669' : '#b91c1c'
          }}>
            {parseFloat(closureMetrics.improvement) > 0 ? '↓' : '↑'} {Math.abs(parseFloat(closureMetrics.improvement))}% change
          </div>
        </div>

        {/* Re-Verification */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          borderLeft: '5px solid #3b82f6',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        >
          <div style={{ 
            fontSize: '0.88em', 
            fontWeight: '500', 
            color: '#0f172a', 
            marginBottom: '12px', 
            textAlign: 'center',
            letterSpacing: '0.02em'
          }}>
            Re-Verification
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px' }}>Before</div>
              <div style={{ fontSize: '0.65em', color: '#94a3b8', marginBottom: '4px' }}>(Jan-Aug)</div>
              <div style={{ 
                fontSize: '1.5em', 
                fontWeight: '700', 
                color: '#b91c1c'
              }}>{reverificationMetrics.before}</div>
              <div style={{ fontSize: '0.7em', color: '#94a3b8' }}>mins avg</div>
            </div>
            <div style={{ 
              fontSize: '1.5em', 
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center'
            }}>→</div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.75em', color: '#0f172a', marginBottom: '4px' }}>After</div>
              <div style={{ fontSize: '0.65em', color: '#94a3b8', marginBottom: '4px' }}>(Sep-Nov)</div>
              <div style={{ 
                fontSize: '1.5em', 
                fontWeight: '700', 
                color: '#059669'
              }}>{reverificationMetrics.after}</div>
              <div style={{ fontSize: '0.7em', color: '#94a3b8' }}>mins avg</div>
            </div>
          </div>
          <div style={{
            padding: '6px 12px',
            background: parseFloat(reverificationMetrics.improvement) > 0 ? '#f0fdf4' : '#fef2f2',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '0.8em',
            fontWeight: '600',
            color: parseFloat(reverificationMetrics.improvement) > 0 ? '#059669' : '#b91c1c'
          }}>
            {parseFloat(reverificationMetrics.improvement) > 0 ? '↓' : '↑'} {Math.abs(parseFloat(reverificationMetrics.improvement))}% change
          </div>
        </div>
      </div>

      {/* Control Charts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Line Clearance Chart */}
        <div style={{ 
          background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)', 
          padding: '20px 24px', 
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)',
          border: '1px solid #e5e8ed',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          cursor: 'zoom-in'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.1), 0 6px 14px rgba(15, 23, 42, 0.06)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        onClick={() => handleChartClick(clearanceMetrics.chartData, 'Line Clearance Time Trend')}
        title="Click to expand"
        >
          <h4 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '0.95em', 
            color: '#0f172a', 
            fontWeight: '700',
            letterSpacing: '0.005em'
          }}>
            Line Clearance - Control Chart (Average All Processes)
          </h4>
          <div style={{ height: '240px' }}>
            <canvas ref={clearanceChartRef}></canvas>
          </div>
        </div>

        {/* Line Closure Chart */}
        <div style={{ 
          background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)', 
          padding: '20px 24px', 
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)',
          border: '1px solid #e5e8ed',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          cursor: 'zoom-in'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.1), 0 6px 14px rgba(15, 23, 42, 0.06)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        onClick={() => handleChartClick(closureMetrics.chartData, 'Line Closure Time Trend')}
        title="Click to expand"
        >
          <h4 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '0.95em', 
            color: '#0f172a', 
            fontWeight: '700',
            letterSpacing: '0.005em'
          }}>
            Line Closure - Control Chart (Average All Processes)
          </h4>
          <div style={{ height: '240px' }}>
            <canvas ref={closureChartRef}></canvas>
          </div>
        </div>

        {/* Re-Verification Chart */}
        <div style={{ 
          background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)', 
          padding: '20px 24px', 
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)',
          border: '1px solid #e5e8ed',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          cursor: 'zoom-in'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.1), 0 6px 14px rgba(15, 23, 42, 0.06)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        onClick={() => handleChartClick(reverificationMetrics.chartData, 'Re-Verification Time Trend')}
        title="Click to expand"
        >
          <h4 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '0.95em', 
            color: '#0f172a', 
            fontWeight: '700',
            letterSpacing: '0.005em'
          }}>
            Re-Verification - Control Chart (Average All Processes)
          </h4>
          <div style={{ height: '240px' }}>
            <canvas ref={reverificationChartRef}></canvas>
          </div>
        </div>
      </div>

      <FullScreenChartModal
        open={!!activeChartKey}
        onClose={() => setActiveChartKey('')}
        image={activeChartKey ? chartImages[activeChartKey] : ''}
        title={activeChartKey === 'clearance' ? 'Line Clearance - Control Chart'
          : activeChartKey === 'closure' ? 'Line Closure - Control Chart'
          : activeChartKey === 'reverification' ? 'Re-Verification - Control Chart'
          : ''}
      />
    </section>
  )
}


