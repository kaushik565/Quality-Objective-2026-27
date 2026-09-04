export default function Recommendations() {
  const recommendations = [
    {
      priority: 'HIGH',
      title: 'Stabilize December Performance',
      impact: '↓5%',
      description: 'Lock Q4 targets: incidents ≤5, clearance ≥98%, calibrations ≥20/mo',
      timeline: 'Dec 15-31',
      color: '#b91c1c'
    },
    {
      priority: 'HIGH',
      title: 'Deploy Process Enhancements',
      impact: '↓8%',
      description: 'Roll out dust/IQC modifications, device stage limits, QR scanning',
      timeline: 'Dec 15 - Jan 15',
      color: '#b91c1c'
    },
    {
      priority: 'MEDIUM',
      title: 'Root Cause Analysis Closure',
      impact: '↓3%',
      description: 'Review October clearance dip & March incident spike; update preventive maintenance',
      timeline: 'Jan 1-15',
      color: '#111827'
    },
    {
      priority: 'MEDIUM',
      title: 'Q1 2026 Baseline Targets',
      impact: 'Sustain',
      description: 'Maintain clearance >98%, incidents <10/mo, calibrations 20-25/mo',
      timeline: 'Ongoing',
      color: '#111827'
    }
  ]

  return (
    <section className="content-slide">
      <h2>Key Recommendations & Impact</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
        {recommendations.map((rec, idx) => (
          <div key={idx} style={{
            padding: '16px',
            borderRadius: '8px',
            border: `2px solid ${rec.color}`,
            background: rec.color === '#b91c1c' ? '#fef2f2' : '#f3f4f6'
          }}>
            {/* Header: Priority + Impact */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: '0.75em',
                fontWeight: '700',
                color: rec.color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {rec.priority}
              </span>
              <span style={{
                fontSize: '1.2em',
                fontWeight: '700',
                color: rec.color
              }}>
                {rec.impact}
              </span>
            </div>

            {/* Title */}
            <h4 style={{
              margin: '0 0 8px 0',
              fontSize: '1em',
              color: rec.color,
              fontWeight: '600'
            }}>
              {rec.title}
            </h4>

            {/* Description */}
            <p style={{
              margin: '0 0 12px 0',
              fontSize: '0.85em',
              color: '#6b7280',
              lineHeight: '1.4'
            }}>
              {rec.description}
            </p>

            {/* Timeline */}
            <div style={{
              fontSize: '0.8em',
              color: '#9ca3af',
              fontWeight: '500',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '8px'
            }}>
              📅 {rec.timeline}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: '#fcd34d',
        borderRadius: '8px',
        borderLeft: '4px solid #d97706'
      }}>
        <h4 style={{
          margin: '0 0 8px 0',
          fontSize: '0.95em',
          color: '#92400e',
          fontWeight: '600'
        }}>
          💡 Executive Summary
        </h4>
        <p style={{
          margin: 0,
          fontSize: '0.85em',
          color: '#78350f',
          lineHeight: '1.5'
        }}>
          Combined impact of recommendations: <strong>↓16% incident reduction by Q1 2026</strong>. Execute Q4 close-out actions (Dec 15-31), deploy process improvements in parallel, and establish Q1 baseline by January 15. All items on track for management sign-off.
        </p>
      </div>
      
      <h3 style={{ marginTop: '35px', marginBottom: '20px', fontSize: '1.5em' }}>Executive Approval Needed</h3>
      
      <div className="recommendation-card" style={{ background: '#fef2f2', borderColor: '#ef4444', maxWidth: '100%' }}>
        <h4 style={{ color: '#b91c1c' }}>5. Resource Allocation for Q1 2026</h4>
        <ul style={{ color: '#991b1b' }}>
          <li>Headcount: +1 QA engineer for biweekly observation expansion</li>
          <li>Equipment: Particle counter upgrade (dust mitigation)</li>
          <li>Training: QR scanning software certification for 15 operators</li>
        </ul>
      </div>
    </section>
  )
}

