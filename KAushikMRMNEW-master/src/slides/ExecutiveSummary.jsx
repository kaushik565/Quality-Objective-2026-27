import { 
  incidentData, incidentDuration, correctiveActionData, preventiveActionData, 
  outOfServiceData, changeControlData, lineApprovalRates, calibrationData 
} from '../data'

export default function ExecutiveSummary() {
  // Calculate all metrics
  const sum = (arr) => arr.reduce((a, b) => a + b, 0)
  
  // Incidents
  const totalIncidents = sum(incidentData.minor) + sum(incidentData.major) + sum(incidentData.critical)
  const latestIndex = incidentDuration.labels.length - 1
  const latestClosure = Math.floor(incidentDuration.closure[latestIndex])
  const peakClosure = Math.floor(Math.max(...incidentDuration.closure))
  const closureDropPct = Math.round(((peakClosure - latestClosure) / peakClosure) * 100)
  
  // Line Clearance
  const avgLineApproval = Math.round(lineApprovalRates.clearance.reduce((a, b) => a + b, 0) / lineApprovalRates.clearance.length * 10) / 10
  
  // Corrective Actions
  const caClosureImprovement = Math.round(((correctiveActionData.avgDaysToClosure[0] - correctiveActionData.avgDaysToClosure[1]) / correctiveActionData.avgDaysToClosure[0]) * 100)
  const caTotal = sum(correctiveActionData.total)
  
  // Preventive Actions
  const paClosureImprovement = Math.round(((preventiveActionData.avgDaysToClosure[0] - preventiveActionData.avgDaysToClosure[1]) / preventiveActionData.avgDaysToClosure[0]) * 100)
  
  // Out of Service
  const oosImprovement = Math.round(((outOfServiceData.avgDaysToClosure[0] - outOfServiceData.avgDaysToClosure[5]) / outOfServiceData.avgDaysToClosure[0]) * 100)
  
  // Change Controls
  const ccImprovement = Math.round(((changeControlData.avgDaysClosure.data[0] - changeControlData.avgDaysClosure.data[10]) / changeControlData.avgDaysClosure.data[0]) * 100)
  
  // Calibrations
  const totalCalibrations = sum(calibrationData.counts)
  
  // Before/After metrics for detailed comparison
  const metrics = {
    incidentClosure: {
      before: peakClosure,
      after: latestClosure,
      improvement: closureDropPct
    },
    ca: {
      before: correctiveActionData.avgDaysToClosure[0],
      after: correctiveActionData.avgDaysToClosure[1],
      improvement: caClosureImprovement
    },
    pa: {
      before: preventiveActionData.avgDaysToClosure[0],
      after: preventiveActionData.avgDaysToClosure[1],
      improvement: paClosureImprovement
    },
    oos: {
      before: outOfServiceData.avgDaysToClosure[0],
      after: Math.floor(outOfServiceData.avgDaysToClosure[5]),
      improvement: oosImprovement
    },
    cc: {
      before: Math.floor(changeControlData.avgDaysClosure.data[0]),
      after: Math.floor(changeControlData.avgDaysClosure.data[10]),
      improvement: ccImprovement
    }
  }

  const MetricCard = ({ value, label, metric, color }) => (
    <div style={{
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderLeft: `5px solid ${color}`,
      borderRadius: '4px'
    }}>
      <div style={{ fontSize: '0.8em', fontWeight: '600', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ fontSize: '2.2em', fontWeight: '800', color: color, marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
        {metric}
      </div>
    </div>
  )

  return (
    <section className="content-slide" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)' }}>
      <h2 style={{ 
        borderBottom: '4px solid #f59e0b', 
        paddingBottom: '8px', 
        marginBottom: '16px', 
        color: '#f59e0b',
        fontSize: '1.8em'
      }}>
        📈 Executive Summary – QA Department Efficiency Revolution
      </h2>

      {/* Hero Message */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde047 100%)',
        padding: '16px',
        borderRadius: '10px',
        marginBottom: '16px',
        border: '2px solid #f59e0b',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.3em', fontWeight: '900', color: '#92400e', marginBottom: '6px' }}>
          ⚡ 32-78% Time Reduction Achieved Across All Quality Processes
        </div>
        <div style={{ fontSize: '0.95em', color: '#78350f' }}>
          Through process optimization, team collaboration, and digital transformation | July-November 2025
        </div>
      </div>

      {/* Top Row - Main Performance Metrics with Improvement Focus */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '14px',
        marginBottom: '16px'
      }}>
        <MetricCard
          value={`↓${closureDropPct}%`}
          label="Incidents Faster"
          metric={`${peakClosure}→${latestClosure} days (8 days saved)`}
          color="#22c55e"
        />
        <MetricCard
          value={`↓${caClosureImprovement}%`}
          label="CA Efficiency"
          metric={`51→43 days (8 days saved)`}
          color="#8b5cf6"
        />
        <MetricCard
          value={`↓${oosImprovement}%`}
          label="OOS Resolution"
          metric={`27→6 days (21 days saved!)`}
          color="#f97316"
        />
        <MetricCard
          value={`↓${paClosureImprovement}%`}
          label="PA Improvement"
          metric={`64→60 days (4 days saved)`}
          color="#3b82f6"
        />
      </div>

      {/* Process Performance Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        marginBottom: '16px'
      }}>
        <MetricCard
          value={`${avgLineApproval}%`}
          label="Line Approval Rate"
          metric="Consistently high quality"
          color="#22c55e"
        />
        <MetricCard
          value={`↓${ccImprovement}%`}
          label="Change Controls"
          metric={`${Math.floor(changeControlData.avgDaysClosure.data[0])}→${Math.floor(changeControlData.avgDaysClosure.data[10])} days`}
          color="#06b6d4"
        />
        <MetricCard
          value={totalCalibrations}
          label="Calibrations Done"
          metric="Equipment readiness 98%+"
          color="#ec4899"
        />
      </div>

        {/* Key Achievements Highlight */}
        <div style={{ 
          background: 'white', 
          borderRadius: '10px', 
          padding: '14px',
          border: '2px solid #e5e7eb',
          marginBottom: '12px'
        }}>
          <div style={{ 
            fontSize: '1em', 
            fontWeight: '800', 
            color: '#111827', 
            marginBottom: '10px',
            borderBottom: '2px solid #f59e0b',
            paddingBottom: '6px'
          }}>
            🏆 Major Achievements & Time Savings
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              padding: '10px',
              borderRadius: '6px',
              borderLeft: '4px solid #22c55e'
            }}>
              <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#065f46', marginBottom: '4px' }}>
                🎯 FASTEST IMPROVEMENT
              </div>
              <div style={{ fontSize: '1.5em', fontWeight: '900', color: '#059669', marginBottom: '2px' }}>
                78% Faster
              </div>
              <div style={{ fontSize: '0.8em', color: '#065f46' }}>
                OOS Resolution (27→6 days) - Record-breaking efficiency
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '10px',
              borderRadius: '6px',
              borderLeft: '4px solid #3b82f6'
            }}>
              <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#1e3a8a', marginBottom: '4px' }}>
                ⏱️ TOTAL TIME SAVED
              </div>
              <div style={{ fontSize: '1.5em', fontWeight: '900', color: '#2563eb', marginBottom: '2px' }}>
                41+ Days
              </div>
              <div style={{ fontSize: '0.8em', color: '#1e3a8a' }}>
                Per process cycle - Cumulative efficiency across all QA activities
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Improvements Grid */}
        <div style={{ marginTop: '0px', marginBottom: '0px' }}>
          <h3 style={{ fontSize: '0.9em', fontWeight: '700', color: '#111827', marginBottom: '10px', marginTop: '0px' }}>
            📊 Before vs After Comparison – Process-by-Process Breakdown
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px'
          }}>
            {[
              { title: 'Incidents', subtitle: 'Resolution time', ...metrics.incidentClosure },
              { title: 'Corrective Actions', subtitle: 'Closure efficiency', ...metrics.ca },
              { title: 'Preventive Actions', subtitle: 'Implementation time', ...metrics.pa },
              { title: 'Out of Spec', subtitle: 'Investigation speed', ...metrics.oos },
              { title: 'Change Control', subtitle: 'Approval time', ...metrics.cc }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#ffffff',
                padding: '10px',
                borderRadius: '6px',
                border: '2px solid #e5e7eb',
                textAlign: 'center',
                fontSize: '0.8em'
              }}>
                <div style={{ fontWeight: '800', color: '#111827', marginBottom: '2px', fontSize: '0.95em' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.7em', color: '#6b7280', marginBottom: '6px' }}>
                  {item.subtitle}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '6px', fontSize: '0.75em' }}>
                  <div>
                    <span style={{ color: '#6b7280', fontSize: '0.85em' }}>Before</span>
                    <div style={{ fontWeight: '900', color: '#dc2626', fontSize: '1.3em' }}>{item.before}</div>
                  </div>
                  <div style={{ fontSize: '1.5em', color: '#f59e0b', fontWeight: '900' }}>→</div>
                  <div>
                    <span style={{ color: '#6b7280', fontSize: '0.85em' }}>After</span>
                    <div style={{ fontWeight: '900', color: '#22c55e', fontSize: '1.3em' }}>{item.after}</div>
                  </div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)',
                  padding: '5px',
                  borderRadius: '4px',
                  fontSize: '0.85em',
                  fontWeight: '900',
                  color: '#1e40af'
                }}>
                  ↓ {item.improvement}% FASTER
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

