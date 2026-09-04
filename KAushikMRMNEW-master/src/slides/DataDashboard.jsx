import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { incidentData, incidentDuration, correctiveActionData, preventiveActionData, outOfServiceData, changeControlData, calibrationData, lineApprovalRates } from '../data'

Chart.register(...registerables)

export default function DataDashboard() {
  const comparisonChartRef = useRef(null)
  const comparisonChartInstance = useRef(null)
  const improvementChartRef = useRef(null)
  const improvementChartInstance = useRef(null)

  const sum = (arr) => arr.reduce((a, b) => a + b, 0)

  // Calculate all metrics
  const metrics = {
    incidentClosure: {
      before: Math.floor(Math.max(...incidentDuration.closure)),
      after: Math.floor(incidentDuration.closure[incidentDuration.closure.length - 1]),
      improvement: Math.round(((Math.max(...incidentDuration.closure) - incidentDuration.closure[incidentDuration.closure.length - 1]) / Math.max(...incidentDuration.closure)) * 100)
    },
    ca: {
      before: correctiveActionData.avgDaysToClosure[0],
      after: correctiveActionData.avgDaysToClosure[1],
      improvement: Math.round(((correctiveActionData.avgDaysToClosure[0] - correctiveActionData.avgDaysToClosure[1]) / correctiveActionData.avgDaysToClosure[0]) * 100)
    },
    pa: {
      before: preventiveActionData.avgDaysToClosure[0],
      after: preventiveActionData.avgDaysToClosure[1],
      improvement: Math.round(((preventiveActionData.avgDaysToClosure[0] - preventiveActionData.avgDaysToClosure[1]) / preventiveActionData.avgDaysToClosure[0]) * 100)
    },
    oos: {
      before: outOfServiceData.avgDaysToClosure[0],
      after: Math.floor(outOfServiceData.avgDaysToClosure[5]),
      improvement: Math.round(((outOfServiceData.avgDaysToClosure[0] - outOfServiceData.avgDaysToClosure[5]) / outOfServiceData.avgDaysToClosure[0]) * 100)
    },
    cc: {
      before: Math.floor(changeControlData.avgDaysClosure.data[0]),
      after: Math.floor(changeControlData.avgDaysClosure.data[10]),
      improvement: Math.round(((changeControlData.avgDaysClosure.data[0] - changeControlData.avgDaysClosure.data[10]) / changeControlData.avgDaysClosure.data[0]) * 100)
    }
  }

  // Total incidents
  const totalIncidents = sum(incidentData.minor) + sum(incidentData.major) + sum(incidentData.critical)
  const totalCalibrations = sum(calibrationData.counts)
  const avgLineApproval = Math.round(lineApprovalRates.clearance.reduce((a, b) => a + b, 0) / lineApprovalRates.clearance.length * 10) / 10

  useEffect(() => {
    // Before/After Comparison Chart
    if (comparisonChartRef.current) {
      const ctx = comparisonChartRef.current.getContext('2d')
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy()
      }

      comparisonChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Incidents', 'Corrective\nActions', 'Preventive\nActions', 'Out of Spec', 'Change\nControls'],
          datasets: [
            {
              label: 'Before (Peak/Initial)',
              data: [metrics.incidentClosure.before, metrics.ca.before, metrics.pa.before, metrics.oos.before, metrics.cc.before],
              backgroundColor: '#fee2e2',
              borderColor: '#fca5a5',
              borderWidth: 2,
              borderRadius: 6
            },
            {
              label: 'After (Latest)',
              data: [metrics.incidentClosure.after, metrics.ca.after, metrics.pa.after, metrics.oos.after, metrics.cc.after],
              backgroundColor: '#dcfce7',
              borderColor: '#86efac',
              borderWidth: 2,
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'x',
          plugins: {
            legend: {
              position: 'top',
              labels: { font: { size: 12, weight: 'bold' }, padding: 16 }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              padding: 12,
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y} days`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (value) => value + ' days' },
              grid: { drawBorder: false }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      })
    }

    // Improvement Percentage Chart
    if (improvementChartRef.current) {
      const ctx = improvementChartRef.current.getContext('2d')
      if (improvementChartInstance.current) {
        improvementChartInstance.current.destroy()
      }

      improvementChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Incidents', 'CA', 'PA', 'OOS', 'CC'],
          datasets: [{
            data: [metrics.incidentClosure.improvement, metrics.ca.improvement, metrics.pa.improvement, metrics.oos.improvement, metrics.cc.improvement],
            backgroundColor: ['#dc2626', '#8b5cf6', '#f59e0b', '#f97316', '#3b82f6'],
            borderColor: '#ffffff',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { size: 11, weight: 'bold' }, padding: 12 }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              padding: 12,
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed}% improvement`
              }
            }
          }
        }
      })
    }
  }, [])

  return (
    <section className="content-slide">
      <h2 style={{ borderBottom: '4px solid #b91c1c', paddingBottom: '8px', marginBottom: '16px', color: '#b91c1c' }}>
        Integrated Performance Dashboard
      </h2>

      {/* Key Metrics Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {[
          { label: 'Total Incidents', value: totalIncidents, color: '#dc2626', icon: '📊' },
          { label: 'Calibrations', value: totalCalibrations, color: '#06b6d4', icon: '✓' },
          { label: 'Line Approval', value: `${avgLineApproval}%`, color: '#22c55e', icon: '📋' },
          { label: 'CA Processed', value: sum(correctiveActionData.total), color: '#8b5cf6', icon: '⚙️' },
          { label: 'Avg Improvement', value: `${Math.round((metrics.incidentClosure.improvement + metrics.ca.improvement + metrics.pa.improvement + metrics.oos.improvement + metrics.cc.improvement) / 5)}%`, color: '#f59e0b', icon: '📈' }
        ].map((metric, idx) => (
          <div key={idx} style={{
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderLeft: `4px solid ${metric.color}`,
            borderRadius: '4px'
          }}>
            <div style={{ fontSize: '1.8em', marginBottom: '4px' }}>{metric.icon}</div>
            <div style={{ fontSize: '1.6em', fontWeight: '800', color: metric.color, marginBottom: '2px' }}>
              {metric.value}
            </div>
            <div style={{ fontSize: '0.75em', color: '#6b7280', fontWeight: '600' }}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '16px',
        marginBottom: '16px'
      }}>
        {/* Before/After Comparison */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '16px',
          borderRadius: '4px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95em', fontWeight: '700', color: '#111827' }}>
            Before → After Closure Time Comparison
          </h3>
          <div style={{ height: '220px', position: 'relative' }}>
            <canvas ref={comparisonChartRef}></canvas>
          </div>
        </div>

        {/* Improvement % Distribution */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '16px',
          borderRadius: '4px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95em', fontWeight: '700', color: '#111827' }}>
            Performance Improvement %
          </h3>
          <div style={{ height: '220px', position: 'relative' }}>
            <canvas ref={improvementChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        {[
          { title: 'Incidents Closed', subtitle: `${metrics.incidentClosure.before} → ${metrics.incidentClosure.after} days`, ...metrics.incidentClosure },
          { title: 'CA Improvement', subtitle: 'Closure efficiency', ...metrics.ca },
          { title: 'PA Closure', subtitle: 'Preventive actions', ...metrics.pa },
          { title: 'Out of Spec', subtitle: 'OOS resolution', ...metrics.oos },
          { title: 'Change Control', subtitle: 'CC time reduction', ...metrics.cc }
        ].map((item, idx) => (
          <div key={idx} style={{
            backgroundColor: '#ffffff',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#111827', marginBottom: '2px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '0.65em', color: '#6b7280', marginBottom: '8px', fontWeight: '500' }}>
              {item.subtitle}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '6px', fontSize: '0.8em' }}>
              <div>
                <span style={{ color: '#6b7280' }}>Before:</span>
                <div style={{ fontWeight: '700', color: '#dc2626' }}>{item.before}</div>
              </div>
              <div>
                <span style={{ color: '#6b7280' }}>After:</span>
                <div style={{ fontWeight: '700', color: '#22c55e' }}>{item.after}</div>
              </div>
            </div>
            <div style={{
              backgroundColor: '#eff6ff',
              padding: '6px',
              borderRadius: '3px',
              fontSize: '0.9em',
              fontWeight: '800',
              color: '#3b82f6'
            }}>
              ↓ {item.improvement}%
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

