import { useState } from 'react'
import { processImplementations } from '../data'

export default function ProcessImprovements() {
  const doneImprovements = processImplementations.filter(p => p.status === 'done')
  const inProgressImprovements = processImplementations.filter(p => p.status === 'in-progress')
  const [expandedDone, setExpandedDone] = useState(null)
  const [expandedProgress, setExpandedProgress] = useState(null)

  const completionRate = Math.round((doneImprovements.length / processImplementations.length) * 100)

  return (
    <section className="content-slide" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)' }}>
      <h2 style={{ 
        borderBottom: '4px solid #3b82f6', 
        paddingBottom: '8px', 
        marginBottom: '16px', 
        color: '#3b82f6',
        fontSize: '1.8em'
      }}>
        🚀 Process Excellence – Site III Transformation Achievements
      </h2>

      {/* Achievement Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        padding: '14px',
        borderRadius: '10px',
        marginBottom: '18px',
        border: '2px solid #3b82f6',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', fontWeight: '900', color: '#1e40af' }}>{doneImprovements.length}</div>
          <div style={{ fontSize: '0.85em', color: '#1e3a8a', fontWeight: '600' }}>Implementations Completed</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', fontWeight: '900', color: '#7c3aed' }}>{completionRate}%</div>
          <div style={{ fontSize: '0.85em', color: '#5b21b6', fontWeight: '600' }}>Success Rate</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', fontWeight: '900', color: '#059669' }}>{inProgressImprovements.length}</div>
          <div style={{ fontSize: '0.85em', color: '#047857', fontWeight: '600' }}>Ongoing Projects</div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '18px', marginTop: '16px' }}>
        <div>
          <h3 style={{ 
            color: '#059669', 
            marginBottom: '12px', 
            fontSize: '1.15em',
            borderLeft: '5px solid #22c55e',
            paddingLeft: '10px',
            fontWeight: '800'
          }}>
            ✅ Completed Achievements ({doneImprovements.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {doneImprovements.map((impl, idx) => (
              <div 
                key={idx} 
                className="improvement-card done"
                onMouseEnter={() => setExpandedDone(idx)}
                onMouseLeave={() => setExpandedDone(null)}
                style={{
                  background: expandedDone === idx 
                    ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' 
                    : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderLeft: '4px solid #22c55e',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: expandedDone === idx ? '0 6px 16px rgba(34, 197, 94, 0.15)' : '0 2px 6px rgba(34, 197, 94, 0.08)'
                }}
              >
                <div style={{ fontSize: '0.92em', fontWeight: '700', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2em' }}>✓</span> {impl.title}
                </div>
                {expandedDone === idx && (
                  <div style={{ fontSize: '0.8em', color: '#047857', lineHeight: '1.5', marginTop: '8px', paddingLeft: '24px' }}>
                    {impl.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 style={{ 
            color: '#ea580c', 
            marginBottom: '12px', 
            fontSize: '1.15em',
            borderLeft: '5px solid #f97316',
            paddingLeft: '10px',
            fontWeight: '800'
          }}>
            ⏳ In Progress ({inProgressImprovements.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {inProgressImprovements.map((impl, idx) => (
              <div 
                key={idx} 
                className="improvement-card in-progress"
                onMouseEnter={() => setExpandedProgress(idx)}
                onMouseLeave={() => setExpandedProgress(null)}
                style={{
                  background: expandedProgress === idx 
                    ? 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)' 
                    : 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                  borderLeft: '4px solid #f97316',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: expandedProgress === idx ? '0 6px 16px rgba(249, 115, 22, 0.15)' : '0 2px 6px rgba(249, 115, 22, 0.08)'
                }}
              >
                <div style={{ fontSize: '0.92em', fontWeight: '700', color: '#9a3412', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2em' }}>→</span> {impl.title}
                </div>
                {expandedProgress === idx && (
                  <div style={{ fontSize: '0.8em', color: '#c2410c', lineHeight: '1.5', marginTop: '8px', paddingLeft: '24px' }}>
                    {impl.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '12px',
        borderRadius: '8px',
        marginTop: '16px',
        border: '2px solid #22c55e',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.95em', fontWeight: '700', color: '#065f46' }}>
          💡 {doneImprovements.length} major process improvements successfully deployed across Site III operations
        </div>
      </div>
    </section>
  )
}

