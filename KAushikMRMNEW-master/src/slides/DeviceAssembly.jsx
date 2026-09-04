import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import {
  deviceLysisSystemClearance,
  deviceLysisSystemClosure,
  deviceLysisSystemReVerification,
  devicePCRMachineClearance,
  devicePCRMachineClosure,
  devicePCRMachineReVerification,
  deviceSixteenBayPCRClearance,
  deviceSixteenBayPCRClosure,
  deviceSixteenBayPCRReVerification,
  deviceExtractionClearance,
  deviceExtractionClosure,
  deviceExtractionReVerification,
  deviceSubAssemblyExtractionClearance,
  deviceSubAssemblyExtractionClosure,
  deviceSubAssemblyExtractionReVerification
} from '../data'
import FullScreenChartModal from '../../components/FullScreenChartModal'

Chart.register(...registerables)

export default function DeviceAssembly() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [chartImage, setChartImage] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)

  const months = deviceLysisSystemClearance.labels

  const groupByPhase = {
    clearance: [
      deviceLysisSystemClearance,
      devicePCRMachineClearance,
      deviceSixteenBayPCRClearance,
      deviceExtractionClearance,
      deviceSubAssemblyExtractionClearance
    ],
    closure: [
      deviceLysisSystemClosure,
      devicePCRMachineClosure,
      deviceSixteenBayPCRClosure,
      deviceExtractionClosure,
      deviceSubAssemblyExtractionClosure
    ],
    reverification: [
      deviceLysisSystemReVerification,
      devicePCRMachineReVerification,
      deviceSixteenBayPCRReVerification,
      deviceExtractionReVerification,
      deviceSubAssemblyExtractionReVerification
    ]
  }

  const averageByGroup = phases => months.map((_, i) => {
    let sum = 0
    let count = 0
    phases.forEach(phase => {
      Object.values(phase.data).forEach(arr => {
        const value = arr[i]
        if (value !== null && value !== undefined) {
          sum += value
          count++
        }
      })
    })
    return count ? sum / count : null
  })

  const clearanceAvg = averageByGroup(groupByPhase.clearance)
  const closureAvg = averageByGroup(groupByPhase.closure)
  const reverificationAvg = averageByGroup(groupByPhase.reverification)

  const startClearance = clearanceAvg[0]
  const endClearance = clearanceAvg[clearanceAvg.length - 1]
  const startClosure = closureAvg[0]
  const endClosure = closureAvg[closureAvg.length - 1]
  const startReverify = reverificationAvg[0]
  const endReverify = reverificationAvg[reverificationAvg.length - 1]

  const avgTail = (arr, from) => {
    let sum = 0
    let count = 0
    for (let i = from; i < arr.length; i++) {
      const v = arr[i]
      if (v !== null && v !== undefined) {
        sum += v
        count++
      }
    }
    return count ? sum / count : null
  }

  const recentClearance = avgTail(clearanceAvg, 1)
  const recentClosure = avgTail(closureAvg, 1)
  const recentReverify = avgTail(reverificationAvg, 1)

  const pctDrop = (start, end) => (start !== null && start !== undefined && end !== null && end !== undefined)
    ? (((start - end) / start) * 100).toFixed(1)
    : '-'

  const chips = [
    {
      label: 'Clearance time',
      color: '#4338ca',
      bg: '#eef2ff',
      border: '#e0e7ff',
      start: startClearance,
      end: endClearance,
      recent: recentClearance,
      change: pctDrop(startClearance, endClearance)
    },
    {
      label: 'Closure time',
      color: '#0284c7',
      bg: '#ecfeff',
      border: '#cffafe',
      start: startClosure,
      end: endClosure,
      recent: recentClosure,
      change: pctDrop(startClosure, endClosure)
    },
    {
      label: 'Re-verification time',
      color: '#b45309',
      bg: '#fef3c7',
      border: '#fde68a',
      start: startReverify,
      end: endReverify,
      recent: recentReverify,
      change: pctDrop(startReverify, endReverify)
    }
  ]

  useEffect(() => {
    if (!chartRef.current) return
    if (chartInstance.current) chartInstance.current.destroy()
    chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Clearance',
            data: clearanceAvg,
            borderColor: '#4338ca',
            backgroundColor: 'rgba(67,56,202,0.10)',
            borderWidth: 3,
            pointRadius: 4,
            tension: 0.3,
            fill: true
          },
          {
            label: 'Closure',
            data: closureAvg,
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2,132,199,0.10)',
            borderWidth: 3,
            pointRadius: 4,
            tension: 0.3,
            fill: true
          },
          {
            label: 'Re-verification',
            data: reverificationAvg,
            borderColor: '#b45309',
            backgroundColor: 'rgba(180,83,9,0.10)',
            borderWidth: 3,
            pointRadius: 4,
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'bottom' },
          tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.formattedValue} min` } }
        },
        scales: {
          y: {
            title: { display: true, text: 'Minutes' },
            beginAtZero: true,
            grid: { color: '#e5e7eb' },
            ticks: { font: { size: 12 } }
          },
          x: {
            ticks: { font: { size: 12 } },
            grid: { color: '#f3f4f6' }
          }
        }
      }
    })

    setChartImage(chartInstance.current.toBase64Image())
    return () => { chartInstance.current?.destroy() }
  }, [months, clearanceAvg, closureAvg, reverificationAvg])

  return (
    <section className="content-slide" style={{ padding: '32px 28px' }}>
      <h2>Device Department Process Improvement</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '18px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', minHeight: '360px' }}>
          <div style={{ fontWeight: '600', color: '#111827', marginBottom: '10px' }}>Cycle Time by Phase (Jan–Aug vs Sep–Nov)</div>
          <div style={{ height: '320px', cursor: 'zoom-in' }} onClick={() => setIsFullScreen(true)} title="Click to expand">
            <canvas ref={chartRef} height="280" style={{ width: '100%', height: '100%' }}></canvas>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {chips.map(chip => (
            <div key={chip.label} style={{ background: chip.bg, border: `1px solid ${chip.border}`, borderRadius: '8px', padding: '14px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.05em', fontWeight: '700', color: chip.color, marginBottom: '6px' }}>{chip.label}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: '6px', columnGap: '10px', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85em', color: '#4b5563', fontWeight: '600' }}>Jan-Aug</div>
                <div style={{ fontSize: '1.05em', fontWeight: '700', color: '#111827' }}>{chip.start !== null && chip.start !== undefined ? `${Math.floor(chip.start)} min` : '-'}</div>
                <div style={{ fontSize: '0.85em', color: '#4b5563', fontWeight: '600' }}>Sep-Nov</div>
                <div style={{ fontSize: '1.05em', fontWeight: '700', color: '#059669' }}>{chip.recent !== null && chip.recent !== undefined ? `${Math.floor(chip.recent)} min` : '-'}</div>
                <div style={{ fontSize: '0.85em', color: '#4b5563', fontWeight: '600' }}>Latest</div>
                <div style={{ fontSize: '1.05em', fontWeight: '700', color: '#059669' }}>{chip.end !== null && chip.end !== undefined ? `${Math.floor(chip.end)} min` : '-'}</div>
                <div style={{ fontSize: '0.85em', color: '#4b5563', fontWeight: '600' }}>Drop</div>
                <div style={{ fontSize: '1.05em', fontWeight: '700', color: chip.color }}>{chip.change !== '-' ? `${chip.change}%` : '-'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '14px 16px', background: '#f3f4f6', borderRadius: '8px', borderLeft: '4px solid #059669', color: '#111827', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <span style={{ fontWeight: '600', color: '#111827' }}>Jan-Aug baseline vs Sep-Nov average and latest month.</span>
      </div>

      <FullScreenChartModal
        open={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        image={chartImage}
        title="Device Department Process Improvement"
      />
    </section>
  )
}

