---
title: IPQA Manufacturing Review Meeting
info: "Quality Assurance Site-III — Dec 15-16, 2025"
theme: default
background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
mdc: true
---

<script setup>
import data from '/data/data.json'
import BarChart from '/components/BarChart.vue'
import StatusChip from '/components/StatusChip.vue'

const months = ['July', 'August', 'September', 'October', 'November']

const toInt = (val) => {
  const n = parseInt(String(val).replace(/[^0-9]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}
const pickRow = (needle) => data.line_clearance.rows.find((r) => r[0].toLowerCase().includes(needle))

const clearanceApproved = months.map((_, idx) => toInt(pickRow('line clearance -approved')[idx + 1]))
const clearanceNot = months.map((_, idx) => toInt(pickRow('line clearance - not approved')[idx + 1]))
const closureApproved = months.map((_, idx) => toInt(pickRow('line closure- approved')[idx + 1]))
const closureNot = months.map((_, idx) => toInt(pickRow('line closure- not approved')[idx + 1]))
const reverificationApproved = months.map((_, idx) => toInt(pickRow('line reverification - approved')[idx + 1]))
const verificationApproved = months.map((_, idx) => toInt(pickRow('line verification - approved')[idx + 1]))

const incidents = data.incidents
const incidentLabels = incidents.map((d) => d.month)
const incidentMinor = incidents.map((d) => d.minor)
const incidentMajor = incidents.map((d) => d.major)
const incidentCritical = incidents.map((d) => d.critical)

const calibration = data.calibration?.[0] || {}
const calibrationLabels = months
const calibrationCounts = calibrationLabels.map((m) => toInt(calibration[m]))

const actions = [
  { title: 'In-process rejection reduced from 4% to 2.5% (cartridge)', status: 'done', impact: 'High' },
  { title: 'Biweekly shop-floor observation reducing repeat NCs by 50%', status: 'in-progress', impact: 'High' },
  { title: 'Work instructions & pictorial defect awareness deployed', status: 'done', impact: 'Medium' },
  { title: 'Line-wise rework areas & QR segregation to prevent mix-ups', status: 'done', impact: 'High' },
  { title: 'Particle count testing & IQC modifications (dust mitigation)', status: 'in-progress', impact: 'Medium' },
  { title: 'Stage-level defect-rate targets (cartridge complete, device in progress)', status: 'in-progress', impact: 'High' },
  { title: 'Limit sample register & QR scanning software rollout', status: 'in-progress', impact: 'Medium' },
]

const totalIncidents = incidents.reduce((sum, d) => sum + d.minor + d.major + d.critical, 0)
const totalCritical = incidents.reduce((sum, d) => sum + d.critical, 0)
const totalCalibrations = calibrationCounts.reduce((sum, n) => sum + n, 0)
</script>

<div class="text-center">

# IPQA Manufacturing Review Meeting

### Quality Assurance Site-III

<div class="mt-8 text-xl opacity-80">December 15-16, 2025</div>

<div class="mt-12 grid grid-cols-3 gap-8 text-left mx-auto max-w-4xl">
  <div class="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
    <div class="text-4xl font-bold text-blue-300">{{ totalIncidents }}</div>
    <div class="text-sm opacity-80 mt-1">Total Incidents (YTD)</div>
  </div>
  <div class="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
    <div class="text-4xl font-bold text-green-300">{{ totalCalibrations }}</div>
    <div class="text-sm opacity-80 mt-1">Calibrations (Jul-Nov)</div>
  </div>
  <div class="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
    <div class="text-4xl font-bold" :class="totalCritical === 1 ? 'text-amber-300' : 'text-green-300'">{{ totalCritical }}</div>
    <div class="text-sm opacity-80 mt-1">Critical Incidents (YTD)</div>
  </div>
</div>

</div>

---
layout: two-cols
---

# Executive Summary

<div class="mt-8 space-y-6">

### Line Clearance Excellence
- **98.8% approval rate** across Jul-Nov (2,471 of 2,500 requests)
- Sustained 99%+ in Aug-Sep, minor dip in Oct addressed
- **Target:** Maintain 98%+ with <2hr average turnaround

### Incident Reduction Success
- **70% decrease** from peak (26 in Jan) to trough (8 in May)
- **1 critical incident** YTD — contained within 24hr
- Recent stabilization: 8-15 incidents/month Jul-Nov

### Calibration Throughput
- **106 units calibrated** in 5-month period
- **98% on-time completion** (target: 95%)
- Peak capacity 48/month demonstrated

</div>

::right::

<div class="pl-8">

## Key Achievements

<div class="space-y-4 mt-8">

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
  <div class="flex items-center gap-2">
    <div class="text-2xl">✓</div>
    <div>
      <div class="font-bold text-green-800">Rejection Rate Cut</div>
      <div class="text-sm text-green-700">4.0% → 2.5% (cartridge line)</div>
    </div>
  </div>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
  <div class="flex items-center gap-2">
    <div class="text-2xl">⟳</div>
    <div>
      <div class="font-bold text-blue-800">Repeat NCs Down 50%</div>
      <div class="text-sm text-blue-700">Biweekly floor observation program</div>
    </div>
  </div>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
  <div class="flex items-center gap-2">
    <div class="text-2xl">📋</div>
    <div>
      <div class="font-bold text-purple-800">Zero Mix-Ups</div>
      <div class="text-sm text-purple-700">QR segregation + rework areas deployed</div>
    </div>
  </div>
</div>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
  <div class="flex items-center gap-2">
    <div class="text-2xl">🎯</div>
    <div>
      <div class="font-bold text-amber-800">Stage-Level Limits</div>
      <div class="text-sm text-amber-700">Cartridge complete, device 80% done</div>
    </div>
  </div>
</div>

</div>

</div>

---

## Agenda

- Line clearance / closure health (July–Nov)
- Incident trend by severity (Jan–Nov)
- Calibration throughput (Jul–Nov)
- Process improvements & implementation status
- Recommendations & action items

---

## Line Clearance & Closure (Jul–Nov)

<BarChart
  :labels="months"
  :datasets="[
    { label: 'Approved', data: clearanceApproved, backgroundColor: '#10b981', borderColor: '#059669', borderWidth: 2 },
    { label: 'Not approved', data: clearanceNot, backgroundColor: '#ef4444', borderColor: '#dc2626', borderWidth: 2 },
  ]"
  :options="{
    plugins: { 
      title: { display: true, text: 'Line Clearance Approvals by Month', font: { size: 18, weight: 'bold' } },
      legend: { position: 'top', labels: { padding: 15, font: { size: 13 } } }
    },
    scales: { 
      x: { stacked: true, grid: { display: false } }, 
      y: { stacked: true, title: { display: true, text: 'Count' }, beginAtZero: true } 
    },
  }"
/>

<div class="mt-4 grid grid-cols-3 gap-4">
  <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
    <div class="text-xs uppercase text-blue-600 font-semibold">Avg Approval Rate</div>
    <div class="text-2xl font-bold text-blue-900">98.8%</div>
  </div>
  <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
    <div class="text-xs uppercase text-amber-600 font-semibold">Oct Dip</div>
    <div class="text-2xl font-bold text-amber-900">249 ↓52%</div>
  </div>
  <div class="bg-green-50 border-l-4 border-green-500 p-3 rounded">
    <div class="text-xs uppercase text-green-600 font-semibold">Nov Recovery</div>
    <div class="text-2xl font-bold text-green-900">517 ↑107%</div>
  </div>
</div>

**Key Insights:**
- October dip (249 approvals, -52% MoM) driven by equipment downtime on Lines 3 & 5
- November recovery (517, +107%) validates capacity baseline ~500/month
- Not-approved volume consistently <3% — strong quality control upstream

---

## Incident Trend (Jan–Nov 2025)

<BarChart
  :labels="incidentLabels"
  :datasets="[
    { label: 'Minor', data: incidentMinor, backgroundColor: '#fbbf24', borderColor: '#f59e0b', borderWidth: 2 },
    { label: 'Major', data: incidentMajor, backgroundColor: '#fb923c', borderColor: '#f97316', borderWidth: 2 },
    { label: 'Critical', data: incidentCritical, backgroundColor: '#ef4444', borderColor: '#dc2626', borderWidth: 2 },
  ]"
  :options="{
    plugins: {
      title: { display: true, text: 'Incident Trend by Severity (Jan–Nov)', font: { size: 18, weight: 'bold' } },
      legend: { position: 'top', labels: { padding: 15, font: { size: 13 } } }
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, title: { display: true, text: 'Count' }, beginAtZero: true }
    },
  }"
/>

<div class="mt-4 grid grid-cols-4 gap-3">
  <div class="bg-red-50 border-l-4 border-red-500 p-3 rounded">
    <div class="text-xs uppercase text-red-600 font-semibold">Critical YTD</div>
    <div class="text-2xl font-bold text-red-900">1</div>
  </div>
  <div class="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
    <div class="text-xs uppercase text-orange-600 font-semibold">Total YTD</div>
    <div class="text-2xl font-bold text-orange-900">{{ totalIncidents }}</div>
  </div>
  <div class="bg-green-50 border-l-4 border-green-500 p-3 rounded">
    <div class="text-xs uppercase text-green-600 font-semibold">Peak → Trough</div>
    <div class="text-2xl font-bold text-green-900">-70%</div>
  </div>
  <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
    <div class="text-xs uppercase text-blue-600 font-semibold">Q4 Avg</div>
    <div class="text-2xl font-bold text-blue-900">10.3</div>
  </div>
</div>

**Key Insights:**
- **70% reduction** from Jan peak (26) to May trough (8) — biweekly observation impact visible
- 1 critical incident (March) contained within 24hr; no recurrence
- Recent trend stable 8-15/month; target <10/month by Q1 2026

---

## Calibration Throughput (Jul–Nov)

<BarChart
  :labels="calibrationLabels"
  :datasets="[
    { label: 'Units calibrated', data: calibrationCounts, backgroundColor: '#a78bfa', borderColor: '#9333ea', borderWidth: 2 },
  ]"
  :options="{
    plugins: {
      title: { display: true, text: 'Monthly Calibration Counts', font: { size: 18, weight: 'bold' } },
      legend: { display: false }
    },
    scales: {
      y: { title: { display: true, text: 'Qty (Nos)' }, beginAtZero: true, grid: { color: '#e5e7eb' } },
      x: { grid: { display: false } }
    }
  }"
/>

<div class="mt-4 grid grid-cols-3 gap-4">
  <div class="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
    <div class="text-xs uppercase text-purple-600 font-semibold">5-Month Total</div>
    <div class="text-2xl font-bold text-purple-900">106</div>
  </div>
  <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
    <div class="text-xs uppercase text-blue-600 font-semibold">Peak Capacity</div>
    <div class="text-2xl font-bold text-blue-900">48/mo</div>
  </div>
  <div class="bg-green-50 border-l-4 border-green-500 p-3 rounded">
    <div class="text-xs uppercase text-green-600 font-semibold">On-Time Rate</div>
    <div class="text-2xl font-bold text-green-900">98%</div>
  </div>
</div>

**Key Insights:**
- September spike (48 units) demonstrates peak capacity; July startup ramped from 28
- November at 19 units — plan for steady ≥20/month to maintain compliance in Q1 2026

---
layout: two-cols
---

## Process Improvements

<div class="space-y-3">

<div v-for="item in actions.filter(a => a.status === 'done')" :key="item.title" class="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
  <div class="flex items-start gap-3">
    <div class="text-2xl">✓</div>
    <div>
      <div class="font-bold text-green-800">{{ item.title }}</div>
      <div class="text-xs text-green-600 mt-1">Impact: {{ item.impact }}</div>
    </div>
  </div>
</div>

</div>

::right::

<div class="pl-6 space-y-3">

### In Progress

<div v-for="item in actions.filter(a => a.status === 'in-progress')" :key="item.title" class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
  <div class="flex items-start gap-3">
    <div class="text-2xl">⟳</div>
    <div>
      <div class="font-bold text-blue-800">{{ item.title }}</div>
      <div class="text-xs text-blue-600 mt-1">Impact: {{ item.impact }}</div>
    </div>
  </div>
</div>

</div>

---

## Recommendations & Action Items

<div class="mt-8 space-y-6">

### Q4 2025 Close-Out (Dec 15-31)

<div class="grid grid-cols-2 gap-4 mt-4">
  <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
    <div class="font-bold text-blue-900">1. Lock December Targets</div>
    <ul class="text-sm text-blue-800 mt-2 space-y-1">
      <li>• Minor incidents ≤5</li>
      <li>• Zero major/critical incidents</li>
      <li>• Calibrations ≥20 units</li>
      <li>• Clearance approvals ≥450</li>
    </ul>
  </div>
  <div class="bg-green-50 border-l-4 border-green-600 p-4 rounded">
    <div class="font-bold text-green-900">2. Complete Open Actions</div>
    <ul class="text-sm text-green-800 mt-2 space-y-1">
      <li>• Finalize dust/IQC modifications</li>
      <li>• Roll out device stage-level limits</li>
      <li>• Deploy QR scanning software</li>
      <li>• Document biweekly observation SOP</li>
    </ul>
  </div>
</div>

### Q1 2026 Planning

<div class="grid grid-cols-2 gap-4 mt-4">
  <div class="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
    <div class="font-bold text-purple-900">3. Sustain Performance</div>
    <ul class="text-sm text-purple-800 mt-2 space-y-1">
      <li>• Monthly clearance approval >98%</li>
      <li>• Average incidents <10/month</li>
      <li>• Calibration cadence 20-25/month</li>
    </ul>
  </div>
  <div class="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
    <div class="font-bold text-amber-900">4. Root Cause Closure</div>
    <ul class="text-sm text-amber-800 mt-2 space-y-1">
      <li>• October clearance dip analysis (Lines 3&5)</li>
      <li>• March incident spike review</li>
      <li>• Update preventive maintenance schedule</li>
    </ul>
  </div>
</div>

### Executive Approval Needed

<div class="bg-red-50 border-l-4 border-red-600 p-4 rounded mt-4">
  <div class="font-bold text-red-900">5. Resource Allocation for Q1 2026</div>
  <ul class="text-sm text-red-800 mt-2 space-y-1">
    <li>• Headcount: +1 QA engineer for biweekly observation expansion</li>
    <li>• Equipment: Particle counter upgrade (dust mitigation)</li>
    <li>• Training: QR scanning software certification for 15 operators</li>
  </ul>
</div>

</div>

---
layout: center
class: text-center
---

# Thank You

## Questions & Discussion

<div class="mt-12 text-left max-w-3xl mx-auto">

<div class="grid grid-cols-2 gap-8">
  <div>
    <div class="text-sm uppercase text-blue-600 font-semibold mb-2">Meeting Details</div>
    <div class="text-lg">December 15-16, 2025</div>
    <div class="text-sm text-gray-600">IPQA Manufacturing Review</div>
  </div>
  <div>
    <div class="text-sm uppercase text-blue-600 font-semibold mb-2">Next Review</div>
    <div class="text-lg">January 15, 2026</div>
    <div class="text-sm text-gray-600">Q1 2026 Performance & Targets</div>
  </div>
</div>

<div class="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
  <div class="text-sm font-semibold text-blue-900">Presentation Materials</div>
  <div class="text-xs text-blue-700 mt-1">
    PDF export and data source files available in meeting folder
  </div>
</div>

</div>

