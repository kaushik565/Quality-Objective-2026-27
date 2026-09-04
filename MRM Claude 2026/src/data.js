// MRM 2026 — Molbio Diagnostics | Single source of truth
// All values are placeholders — fill in actual 2026 data here.

export const MRM_PERIOD = '1st Review Meeting 2026'
export const SITES = ['Site-I', 'Site-III', 'Site-IV', 'Site-V']
export const SITE_COLORS = {
  'Site-I':   '#ef4444',
  'Site-III': '#8b5cf6',
  'Site-IV':  '#f59e0b',
  'Site-V':   '#0ea5e9',
}
export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// ── QMS ──────────────────────────────────────────────────────────────────────
export const qmsSummary = {
  'Site-I':   { changeControls: 0, incidents: 0, ca: 0, pa: 0, oos: 0 },
  'Site-III': { changeControls: 0, incidents: 0, ca: 0, pa: 0, oos: 0 },
  'Site-IV':  { changeControls: 0, incidents: 0, ca: 0, pa: 0, oos: 0 },
  'Site-V':   { changeControls: 0, incidents: 0, ca: 0, pa: 0, oos: 0 },
}

export const changeControlMonthly = {
  'Site-I':   new Array(12).fill(0),
  'Site-III': new Array(12).fill(0),
  'Site-IV':  new Array(12).fill(0),
  'Site-V':   new Array(12).fill(0),
}

// ── IPQA ─────────────────────────────────────────────────────────────────────
export const ipqaKPIs = {
  'Site-I':   { lineClearance: 0, lineClosure: 0, lineVerification: 0, incidents: 0 },
  'Site-III': { lineClearance: 0, lineClosure: 0, lineVerification: 0, incidents: 0 },
  'Site-IV':  { lineClearance: 0, lineClosure: 0, lineVerification: 0, incidents: 0 },
  'Site-V':   { lineClearance: 0, lineClosure: 0, lineVerification: 0, incidents: 0 },
}

export const ipqaMonthly = {
  'Site-I':   { clearance: new Array(12).fill(0), closure: new Array(12).fill(0) },
  'Site-III': { clearance: new Array(12).fill(0), closure: new Array(12).fill(0) },
  'Site-IV':  { clearance: new Array(12).fill(0), closure: new Array(12).fill(0) },
  'Site-V':   { clearance: new Array(12).fill(0), closure: new Array(12).fill(0) },
}

export const calibrationData = {
  'Site-I':   { total: 0, calibrated: 0, overdue: 0 },
  'Site-III': { total: 0, calibrated: 0, overdue: 0 },
  'Site-IV':  { total: 0, calibrated: 0, overdue: 0 },
  'Site-V':   { total: 0, calibrated: 0, overdue: 0 },
}

// ── Lab QA ────────────────────────────────────────────────────────────────────
export const labQAData = {
  'Site-I':   { reportsVerified: 0, logbooks: 0, passRate: 0, equipmentOk: 0 },
  'Site-III': { reportsVerified: 0, logbooks: 0, passRate: 0, equipmentOk: 0 },
  'Site-IV':  { reportsVerified: 0, logbooks: 0, passRate: 0, equipmentOk: 0 },
  'Site-V':   { reportsVerified: 0, logbooks: 0, passRate: 0, equipmentOk: 0 },
}

// ── Customer Complaints ───────────────────────────────────────────────────────
export const customerComplaintsData = {
  total: 0, open: 0, closed: 0, inProgress: 0,
  bySite: {
    'Site-I': 0, 'Site-III': 0, 'Site-IV': 0, 'Site-V': 0,
  },
  byCategory: {
    'Product Quality': 0, 'Packaging': 0, 'Documentation': 0, 'Delivery': 0, 'Other': 0,
  },
  monthly: new Array(12).fill(0),
}

// ── Quality Objectives ────────────────────────────────────────────────────────
export const qualityObjectives = [
  { id: 1, objective: 'Reduce customer complaints', target: 0, actual: 0, unit: '%', status: 'pending' },
  { id: 2, objective: 'IPQA line clearance compliance', target: 0, actual: 0, unit: '%', status: 'pending' },
  { id: 3, objective: 'Calibration on-time rate', target: 0, actual: 0, unit: '%', status: 'pending' },
  { id: 4, objective: 'CAPA closure rate', target: 0, actual: 0, unit: '%', status: 'pending' },
  { id: 5, objective: 'Training completion rate', target: 0, actual: 0, unit: '%', status: 'pending' },
  { id: 6, objective: 'OOS investigations closed on time', target: 0, actual: 0, unit: '%', status: 'pending' },
]

// ── Audits ────────────────────────────────────────────────────────────────────
export const auditData = {
  internal: { total: 0, findings: 0, closed: 0, open: 0 },
  external: { total: 0, findings: 0, closed: 0, open: 0 },
  regulatory: { total: 0, findings: 0, closed: 0, open: 0 },
  audits: [],  // { date, type, auditor, findings, status }
}

// ── Improvements ─────────────────────────────────────────────────────────────
export const improvements = {
  summary: { done: 0, inProgress: 0, planned: 0 },
  bySite: {
    'Site-I':   [],
    'Site-III': [],
    'Site-IV':  [],
    'Site-V':   [],
  },
}
