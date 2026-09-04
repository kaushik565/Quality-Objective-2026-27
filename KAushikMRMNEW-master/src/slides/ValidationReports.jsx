import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import FullScreenChartModal from '../../components/FullScreenChartModal'

Chart.register(...registerables)

export default function ValidationReports() {
  const reportsChartRef = useRef(null)
  const reportsChartInstance = useRef(null)
  const mvpChartRef = useRef(null)
  const mvpChartInstance = useRef(null)
  const [chartImages, setChartImages] = useState({ reports: '', mvp: '' })
  const [activeChart, setActiveChart] = useState('')

  const reviewData = {
    labels: ['JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER'],
    reportsVerified: [19, 22, 13, 8, 23],
    mvpsReviewed: [11, 7, 2, 6, 14]
  }

  const majorChanges = [
    {
      id: 'MVP24/RM/III/012',
      description: 'Suggested to remove corrosion test for fasteners.'
    },
    {
      id: 'VR/25/MG/EV/III/185',
      description: 'Suggested to add the hold time and pressure parameters used in the laser welding machine.'
    },
    {
      id: 'VR/25/MG/EV/III/032',
      description: 'Performance qualification procedure section addition and modification of points.'
    },
    {
      id: 'MVP25/PR/III/004',
      description: 'Sentence, formation, Type of validation, testing procedure for other sites, future actions, etc..'
    },
    {
      id: 'VR/25/MG/EV/III/192, VR/25/MG/EV/III/193',
      description: 'Removed points from Performance qualification section because no evidence for the point.'
    },
    {
      id: 'VR/25/MG/RM/III/085',
      description: 'Verified that the visual inspection remarks are not matching with the summary mentioned in the report. Layout changes and incomplete documentation.'
    },
    {
      id: 'MVP24/EV/III/003',
      description: 'Suggested to change the image used to describe the principle.'
    },
    {
      id: 'MVP24/PM/III/001',
      description: 'Asked to add standard reference in the protocol.'
    }
  ]

  const regularSuggestions = [
    'Conclusion/summary statements',
    'Spelling mistakes',
    'Units not mentioned',
    'GDP related corrections'
  ]

  // Calculate totals
  const totalReports = reviewData.reportsVerified.reduce((a, b) => a + b, 0)
  const totalMVPs = reviewData.mvpsReviewed.reduce((a, b) => a + b, 0)
  const avgReports = (totalReports / reviewData.labels.length).toFixed(1)
  const avgMVPs = (totalMVPs / reviewData.labels.length).toFixed(1)

  useEffect(() => {
    // Reports Verified Chart
    if (reportsChartRef.current) {
      const ctx = reportsChartRef.current.getContext('2d')
      
      if (reportsChartInstance.current) {
        reportsChartInstance.current.destroy()
      }

      reportsChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: reviewData.labels,
          datasets: [{
            label: 'Reports Verified',
            data: reviewData.reportsVerified,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 2,
            borderRadius: 6,
            barThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              padding: 12,
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#3b82f6',
              borderWidth: 1,
              displayColors: false,
              callbacks: {
                title: (items) => items[0].label,
                label: (item) => `Verified: ${item.parsed.y} reports`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { drawBorder: false, color: '#e5e7eb' },
              ticks: { color: '#475569', font: { size: 11 } }
            },
            x: {
              grid: { display: false, drawBorder: false },
              ticks: { color: '#475569', font: { size: 11 } }
            }
          }
        }
      })

      setChartImages(prev => ({ ...prev, reports: reportsChartInstance.current.toBase64Image() }))
    }

    // MVPs Reviewed Chart
    if (mvpChartRef.current) {
      const ctx = mvpChartRef.current.getContext('2d')
      
      if (mvpChartInstance.current) {
        mvpChartInstance.current.destroy()
      }

      mvpChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: reviewData.labels,
          datasets: [{
            label: "MVP's Reviewed",
            data: reviewData.mvpsReviewed,
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: '#10b981',
            borderWidth: 2,
            borderRadius: 6,
            barThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              padding: 12,
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#10b981',
              borderWidth: 1,
              displayColors: false,
              callbacks: {
                title: (items) => items[0].label,
                label: (item) => `Reviewed: ${item.parsed.y} MVPs`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { drawBorder: false, color: '#e5e7eb' },
              ticks: { color: '#475569', font: { size: 11 } }
            },
            x: {
              grid: { display: false, drawBorder: false },
              ticks: { color: '#475569', font: { size: 11 } }
            }
          }
        }
      })

      setChartImages(prev => ({ ...prev, mvp: mvpChartInstance.current.toBase64Image() }))
    }

    return () => {
      if (reportsChartInstance.current) reportsChartInstance.current.destroy()
      if (mvpChartInstance.current) mvpChartInstance.current.destroy()
    }
  }, [])

  return (
    <section className="content-slide">
      <h2 style={{ marginBottom: '28px' }}>Validation Reports and Protocols</h2>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderLeft: '5px solid #3b82f6',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#1e40af', marginBottom: '4px' }}>{totalReports}</div>
          <div style={{ fontSize: '0.88em', color: '#1e40af', fontWeight: '500', letterSpacing: '0.02em' }}>Total Reports Verified</div>
        </div>

        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          borderLeft: '5px solid #10b981',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669', marginBottom: '4px' }}>{totalMVPs}</div>
          <div style={{ fontSize: '0.88em', color: '#047857', fontWeight: '500', letterSpacing: '0.02em' }}>Total MVPs Reviewed</div>
        </div>

        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)',
          borderLeft: '5px solid #f59e0b',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706', marginBottom: '4px' }}>22 min</div>
          <div style={{ fontSize: '0.88em', color: '#b45309', fontWeight: '500', letterSpacing: '0.02em' }}>Avg. Verification Time</div>
        </div>

        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)',
          borderLeft: '5px solid #f59e0b',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706', marginBottom: '4px' }}>25 min</div>
          <div style={{ fontSize: '0.88em', color: '#b45309', fontWeight: '500', letterSpacing: '0.02em' }}>Avg. Review Time</div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Reports Verified Chart */}
        <div
          style={{ 
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)', 
            borderRadius: '14px', 
            padding: '20px 24px',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)',
            border: '1px solid #e5e8ed',
            cursor: 'zoom-in',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={() => setActiveChart('reports')}
          title="Click to expand"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.1), 0 6px 14px rgba(15, 23, 42, 0.06)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <h3 style={{ 
            fontSize: '1.05em', 
            marginBottom: '12px', 
            color: '#0f172a',
            fontWeight: '700',
            margin: '0 0 12px 0'
          }}>Reports Verified</h3>
          <div style={{ position: 'relative', flex: 1, minHeight: '240px' }}>
            <canvas ref={reportsChartRef}></canvas>
          </div>
        </div>

        {/* MVPs Reviewed Chart */}
        <div
          style={{ 
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)', 
            borderRadius: '14px', 
            padding: '20px 24px',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)',
            border: '1px solid #e5e8ed',
            cursor: 'zoom-in',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={() => setActiveChart('mvp')}
          title="Click to expand"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.1), 0 6px 14px rgba(15, 23, 42, 0.06)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <h3 style={{ 
            fontSize: '1.05em', 
            marginBottom: '12px', 
            color: '#0f172a',
            fontWeight: '700',
            margin: '0 0 12px 0'
          }}>MVP's Reviewed</h3>
          <div style={{ position: 'relative', flex: 1, minHeight: '240px' }}>
            <canvas ref={mvpChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Bottom Section: Major Changes and Regular Suggestions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        {/* Major Changes */}
        <div style={{
          background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)',
          borderRadius: '14px',
          padding: '20px 24px',
          border: '1px solid #e5e8ed',
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)',
          maxHeight: '340px',
          overflowY: 'auto'
        }}>
          <h3 style={{ 
            fontSize: '1.05em', 
            marginBottom: '16px', 
            color: '#0f172a',
            fontWeight: '700',
            position: 'sticky',
            top: '0',
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)',
            paddingBottom: '8px',
            zIndex: 1
          }}>
            Major changes/suggestions made in MVPs/Validation reports
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {majorChanges.map((change, idx) => (
              <div key={idx} style={{
                padding: '12px 14px',
                background: '#f8fafc',
                borderRadius: '8px',
                borderLeft: '3px solid #3b82f6',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                <div style={{ 
                  fontSize: '0.75em', 
                  color: '#3b82f6', 
                  fontWeight: '700',
                  marginBottom: '4px',
                  fontFamily: 'monospace'
                }}>
                  {change.id}
                </div>
                <div style={{ 
                  fontSize: '0.85em', 
                  color: '#475569',
                  lineHeight: '1.4',
                  fontWeight: '500'
                }}>
                  {change.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Suggestions */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderRadius: '14px',
          padding: '20px 24px',
          border: '1px solid #fbbf24',
          boxShadow: '0 10px 25px rgba(251, 191, 36, 0.12), 0 4px 10px rgba(251, 191, 36, 0.06)'
        }}>
          <h3 style={{ 
            fontSize: '1.05em', 
            marginBottom: '14px', 
            color: '#78350f',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              display: 'inline-block',
              width: '28px',
              height: '28px',
              background: '#f59e0b',
              borderRadius: '50%',
              textAlign: 'center',
              lineHeight: '28px',
              color: '#ffffff',
              fontSize: '0.85em'
            }}>!</span>
            REGULAR SUGGESTIONS
          </h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {regularSuggestions.map((suggestion, idx) => (
              <li key={idx} style={{
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                color: '#78350f',
                fontWeight: '600',
                fontSize: '0.88em',
                borderLeft: '3px solid #f59e0b',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
              >
                <span style={{ fontSize: '1.2em', color: '#f59e0b' }}>•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Screen Chart Modal */}
      {activeChart && (
        <FullScreenChartModal
          imageUrl={chartImages[activeChart]}
          onClose={() => setActiveChart('')}
        />
      )}
    </section>
  )
}

