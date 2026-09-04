import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import {
  months,
  lineClearanceData,
  lineClosureData,
  lineReverificationData,
  lineVerificationData,
  lineProcessTotals,
  lineProcessTimeComparison,
  lineProcessTimeTrend
} from '../data'

Chart.register(...registerables)

export default function LineClearance() {
  const timeComparisonRef = useRef(null)
  const timeComparisonInstance = useRef(null)
  const timeTrendRef = useRef(null)
  const timeTrendInstance = useRef(null)
  const approvalChartRef = useRef(null)
  const approvalChartInstance = useRef(null)

  const sum = (arr) => arr.reduce((a, b) => a + b, 0)

  const totalNotApprovedClearance = sum(lineClearanceData.notApproved)
  const totalNotApprovedClosure = sum(lineClosureData.notApproved)
  const totalNotApprovedReverification = sum(lineReverificationData.notApproved)
  const totalNotApprovedVerification = sum(lineVerificationData.notApproved)

  const overallApproved =
    sum(lineClearanceData.approved) +
    sum(lineClosureData.approved) +
    sum(lineReverificationData.approved) +
    sum(lineVerificationData.approved)
  const overallNotApproved =
    totalNotApprovedClearance +
    totalNotApprovedClosure +
    totalNotApprovedReverification +
    totalNotApprovedVerification

  const avgApprovalRate = ((overallApproved / (overallApproved + overallNotApproved)) * 100).toFixed(1)

  // Average time savings calculation
  const avgTimeSavings = Math.round(
    (lineProcessTimeComparison.clearance.improvement +
    lineProcessTimeComparison.closure.improvement +
    lineProcessTimeComparison.reverification.improvement +
    lineProcessTimeComparison.verification.improvement) / 4
  )

  useEffect(() => {
    // Before/After Time Comparison Chart
    if (timeComparisonRef.current) {
      const ctx = timeComparisonRef.current.getContext('2d')
      if (timeComparisonInstance.current) timeComparisonInstance.current.destroy()

      timeComparisonInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Clearance', 'Closure', 'Reverification', 'Verification'],
          datasets: [
            {
              label: 'Before Optimization (min)',
              data: [
                lineProcessTimeComparison.clearance.before,
                lineProcessTimeComparison.closure.before,
                lineProcessTimeComparison.reverification.before,
                lineProcessTimeComparison.verification.before
              ],
              backgroundColor: '#ef4444',
              borderColor: '#dc2626',
              borderWidth: 2
            },
            {
              label: 'After Optimization (min)',
              data: [
                lineProcessTimeComparison.clearance.after,
                lineProcessTimeComparison.closure.after,
                lineProcessTimeComparison.reverification.after,
                lineProcessTimeComparison.verification.after
              ],
              backgroundColor: '#22c55e',
              borderColor: '#16a34a',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Process Time: Before vs After Optimization',
              font: { size: 14, weight: '700' },
              color: '#111827'
            },
            legend: {
              position: 'top',
              labels: { font: { size: 11 }, padding: 8 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Time (minutes)' },
              grid: { color: '#e5e7eb' }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      })
    }

    // Time Trend Chart
    if (timeTrendRef.current) {
      const ctx = timeTrendRef.current.getContext('2d')
      if (timeTrendInstance.current) timeTrendInstance.current.destroy()

      timeTrendInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Clearance',
              data: lineProcessTimeTrend.clearance,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#3b82f6',
              borderWidth: 2
            },
            {
              label: 'Closure',
              data: lineProcessTimeTrend.closure,
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#8b5cf6',
              borderWidth: 2
            },
            {
              label: 'Reverification',
              data: lineProcessTimeTrend.reverification,
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#f59e0b',
              borderWidth: 2
            },
            {
              label: 'Verification',
              data: lineProcessTimeTrend.verification,
              borderColor: '#06b6d4',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#06b6d4',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Time Reduction Trend (July - November)',
              font: { size: 14, weight: '700' },
              color: '#111827'
            },
            legend: {
              position: 'top',
              labels: { font: { size: 10 }, padding: 6 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Minutes' },
              grid: { color: '#e5e7eb' }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      })
    }

    // Approval Rate Chart
    if (approvalChartRef.current) {
      const ctx = approvalChartRef.current.getContext('2d')
      if (approvalChartInstance.current) approvalChartInstance.current.destroy()

      approvalChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Not Approved'],
          datasets: [{
            data: [overallApproved, overallNotApproved],
            backgroundColor: ['#22c55e', '#ef4444'],
            borderColor: ['#16a34a', '#dc2626'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Overall Approval Rate',
              font: { size: 14, weight: '700' },
              color: '#111827'
            },
            legend: {
              position: 'bottom',
              labels: { font: { size: 11 }, padding: 8 }
            }
          }
        }
      })
    }

    return () => {
      if (timeComparisonInstance.current) timeComparisonInstance.current.destroy()
      if (timeTrendInstance.current) timeTrendInstance.current.destroy()
      if (approvalChartInstance.current) approvalChartInstance.current.destroy()
    }
  }, [])

  return (
    <section className="content-slide" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)' }}>
      <h2 style={{ 
        borderBottom: '4px solid #3b82f6', 
        paddingBottom: '8px', 
        marginBottom: '16px', 
        color: '#3b82f6',
        fontSize: '1.8em'
      }}>
        ⚡ Line Process Efficiency – {avgTimeSavings}% Average Time Reduction
      </h2>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        padding: '12px',
        borderRadius: '10px',
        marginBottom: '14px',
        border: '2px solid #3b82f6',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1em', fontWeight: '900', color: '#1e40af' }}>
          🎯 Process Times Reduced: Clearance 45→28min | Closure 52→35min | Reverification 35→22min | Verification 40→25min
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          borderLeft: '5px solid #22c55e',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(34, 197, 94, 0.1)'
        }}>
          <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#065f46' }}>{avgApprovalRate}%</div>
          <div style={{ fontSize: '0.75em', color: '#047857', fontWeight: '600' }}>Approval Rate</div>
        </div>

        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          borderLeft: '5px solid #3b82f6',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#1e40af' }}>↓{avgTimeSavings}%</div>
          <div style={{ fontSize: '0.75em', color: '#1e3a8a', fontWeight: '600' }}>Avg Time Saved</div>
        </div>

        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde047 100%)',
          borderLeft: '5px solid #f59e0b',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.1)'
        }}>
          <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#92400e' }}>{overallApproved + overallNotApproved}</div>
          <div style={{ fontSize: '0.75em', color: '#78350f', fontWeight: '600' }}>Total Processed</div>
        </div>

        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          borderLeft: '5px solid #ef4444',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)'
        }}>
          <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#991b1b' }}>{overallNotApproved}</div>
          <div style={{ fontSize: '0.75em', color: '#7f1d1d', fontWeight: '600' }}>Not Approved</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px', marginBottom: '14px' }}>
        {/* Before/After Comparison */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '14px',
          border: '2px solid #e5e7eb',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ height: '220px' }}>
            <canvas ref={timeComparisonRef}></canvas>
          </div>
        </div>

        {/* Approval Rate */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '14px',
          border: '2px solid #e5e7eb',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ height: '220px' }}>
            <canvas ref={approvalChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Time Trend Chart - Full Width */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '14px',
        border: '2px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        marginBottom: '14px'
      }}>
        <div style={{ height: '200px' }}>
          <canvas ref={timeTrendRef}></canvas>
        </div>
      </div>

      {/* Process Breakdown Table */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '12px',
        border: '2px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '0.95em', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
          📊 Time Reduction & Approval Summary
        </h3>
        <table style={{ width: '100%', fontSize: '0.75em', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: '8px', textAlign: 'left', fontWeight: '700' }}>Process</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>Before</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>After</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>Improvement</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>Approved</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>Not Approved</th>
            </tr>
          </thead>
          <tbody>
            {[
              { 
                name: 'Line Clearance', 
                time: lineProcessTimeComparison.clearance,
                approved: sum(lineClearanceData.approved),
                notApproved: totalNotApprovedClearance
              },
              { 
                name: 'Line Closure', 
                time: lineProcessTimeComparison.closure,
                approved: sum(lineClosureData.approved),
                notApproved: totalNotApprovedClosure
              },
              { 
                name: 'Reverification', 
                time: lineProcessTimeComparison.reverification,
                approved: sum(lineReverificationData.approved),
                notApproved: totalNotApprovedReverification
              },
              { 
                name: 'Verification', 
                time: lineProcessTimeComparison.verification,
                approved: sum(lineVerificationData.approved),
                notApproved: totalNotApprovedVerification
              }
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px', fontWeight: '600' }}>{row.name}</td>
                <td style={{ padding: '8px', textAlign: 'center', color: '#dc2626', fontWeight: '700' }}>
                  {row.time.before}m
                </td>
                <td style={{ padding: '8px', textAlign: 'center', color: '#22c55e', fontWeight: '700' }}>
                  {row.time.after}m
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: '800',
                    color: '#065f46',
                    fontSize: '0.9em'
                  }}>
                    ↓{row.time.improvement}%
                  </span>
                </td>
                <td style={{ padding: '8px', textAlign: 'center', fontWeight: '600', color: '#059669' }}>{row.approved}</td>
                <td style={{ padding: '8px', textAlign: 'center', fontWeight: '600', color: '#dc2626' }}>{row.notApproved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

