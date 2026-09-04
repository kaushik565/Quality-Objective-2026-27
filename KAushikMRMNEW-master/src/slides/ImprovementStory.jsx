export default function ImprovementStory() {
  const achievements = [
    {
      phase: 'Q1-Q2 2025',
      title: 'Baseline Assessment',
      metrics: [
        'Incident closure: 24-25 days avg',
        'CA closure: 51 days avg',
        'OOS resolution: 27 days avg',
        'Process bottlenecks identified'
      ],
      icon: '📊',
      color: '#94a3b8'
    },
    {
      phase: 'Q3 2025',
      title: 'Process Optimization',
      metrics: [
        'Implemented streamlined workflows',
        'Enhanced cross-functional coordination',
        'Digital documentation systems',
        'Training & skill development'
      ],
      icon: '🔧',
      color: '#3b82f6'
    },
    {
      phase: 'Q4 2025',
      title: 'Results Achieved',
      metrics: [
        'Incident closure: 17 days (32% faster)',
        'CA closure: 43 days (16% faster)',
        'OOS resolution: 6 days (78% faster)',
        'All targets exceeded'
      ],
      icon: '🎯',
      color: '#22c55e'
    }
  ]

  const keyDrivers = [
    {
      title: 'Process Standardization',
      description: 'Unified SOPs and checklists across all quality processes',
      impact: 'Reduced variation & improved consistency',
      icon: '📋'
    },
    {
      title: 'Team Collaboration',
      description: 'Enhanced cross-departmental communication protocols',
      impact: 'Faster approvals & decision-making',
      icon: '🤝'
    },
    {
      title: 'Digital Transformation',
      description: 'Electronic QMS with automated workflows',
      impact: 'Eliminated manual delays & paper-based bottlenecks',
      icon: '💻'
    },
    {
      title: 'Continuous Training',
      description: 'Regular skill updates & regulatory training',
      impact: 'Improved first-time quality & reduced rework',
      icon: '📚'
    },
    {
      title: 'Risk-Based Approach',
      description: 'Prioritized high-impact activities & critical path focus',
      impact: 'Optimized resource allocation',
      icon: '⚡'
    }
  ]

  return (
    <section className="content-slide" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)' }}>
      <h2 style={{ 
        borderBottom: '4px solid #3b82f6', 
        paddingBottom: '8px', 
        marginBottom: '20px', 
        color: '#3b82f6',
        fontSize: '1.8em'
      }}>
        🚀 Our Improvement Journey – From Baseline to Excellence
      </h2>

      {/* Timeline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {achievements.map((item, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '18px',
            border: `3px solid ${item.color}`,
            boxShadow: `0 6px 18px ${item.color}33`,
            position: 'relative'
          }}>
            {/* Phase Badge */}
            <div style={{
              background: item.color,
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.7em',
              fontWeight: '700',
              display: 'inline-block',
              marginBottom: '10px'
            }}>
              {item.phase}
            </div>

            {/* Icon */}
            <div style={{
              fontSize: '3em',
              textAlign: 'center',
              marginBottom: '10px'
            }}>
              {item.icon}
            </div>

            {/* Title */}
            <div style={{
              fontSize: '1.1em',
              fontWeight: '800',
              color: '#111827',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              {item.title}
            </div>

            {/* Metrics */}
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '0.8em',
              color: '#4b5563',
              lineHeight: '1.6'
            }}>
              {item.metrics.map((metric, midx) => (
                <li key={midx} style={{ marginBottom: '4px' }}>{metric}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Key Success Drivers */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '18px',
        border: '2px solid #e5e7eb',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{
          fontSize: '1.1em',
          fontWeight: '800',
          color: '#111827',
          marginBottom: '14px',
          borderBottom: '2px solid #3b82f6',
          paddingBottom: '8px'
        }}>
          🔑 Key Success Drivers – What Made This Possible
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px'
        }}>
          {keyDrivers.map((driver, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '8px',
              padding: '12px',
              borderLeft: '3px solid #3b82f6',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{
                fontSize: '2em',
                textAlign: 'center',
                marginBottom: '8px'
              }}>
                {driver.icon}
              </div>
              <div style={{
                fontSize: '0.85em',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '6px',
                textAlign: 'center'
              }}>
                {driver.title}
              </div>
              <div style={{
                fontSize: '0.7em',
                color: '#6b7280',
                lineHeight: '1.3',
                marginBottom: '6px'
              }}>
                {driver.description}
              </div>
              <div style={{
                background: '#dbeafe',
                color: '#1e40af',
                padding: '4px 6px',
                borderRadius: '4px',
                fontSize: '0.65em',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {driver.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        marginTop: '16px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
        padding: '14px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
      }}>
        <div style={{ fontSize: '1.3em', fontWeight: '900', marginBottom: '4px' }}>
          Continuous Improvement Culture = Sustained Excellence
        </div>
        <div style={{ fontSize: '0.9em', opacity: 0.95 }}>
          These improvements represent our commitment to operational excellence and patient safety
        </div>
      </div>
    </section>
  )
}

