// QA-department CAPA data, per site and audit phase. The combined per-phase rows
// (QA_CAPA_DATA) and grand totals (QA_CAPA_TOTALS) are derived from this, so the
// QA KPI cards, the combined QA table and the per-site tables all stay in sync.
export const QA_SITES_DATA = [
  {
    id: 'SITE-I', name: 'Site I',
    audits: [
      { name: "1st IQA '25",    ca: 7, pa: 7, closed: 14, open: 0, remarks: "NA" },
      { name: "2nd IQA '25",    ca: 5, pa: 3, closed: 8,  open: 0, remarks: "NA" },
      { name: "Ext. Audit '26", na: true, remarks: "NA" },
    ],
  },
  {
    id: 'SITE-III', name: 'Site III',
    audits: [
      { name: "1st IQA '25",    ca: 3, pa: 4, closed: 7, open: 0, remarks: "NA" },
      { name: "2nd IQA '25",    ca: 2, pa: 1, closed: 3, open: 0, remarks: "NA" },
      { name: "Ext. Audit '26", ca: 2, pa: 0, closed: 2, open: 0, remarks: "NA" },
    ],
  },
  {
    id: 'SITE-V', name: 'Site V',
    audits: [
      { name: "1st IQA '25",    ca: 1, pa: 2, closed: 2, open: 1, remarks: "PA25/V/QA/018 (1st IQA: SOP/MA/002, Risk management SOP is under draft)" },
      { name: "2nd IQA '25",    ca: 5, pa: 1, closed: 6, open: 0, remarks: "NA" },
      { name: "Ext. Audit '26", ca: 0, pa: 0, closed: 0, open: 0, remarks: "NA" },
    ],
  },
];

const QA_PHASES = ["1st IQA '25", "2nd IQA '25", "Ext. Audit '26"];

export const QA_CAPA_DATA = QA_PHASES.map((phase) => {
  let ca = 0, pa = 0, closed = 0, open = 0, remarks = 'NA';
  QA_SITES_DATA.forEach((s) => {
    const a = s.audits.find((x) => x.name === phase);
    if (a && !a.na) {
      ca += a.ca; pa += a.pa; closed += a.closed; open += a.open;
      if (remarks === 'NA' && a.remarks && a.remarks !== 'NA') remarks = a.remarks;
    }
  });
  return { name: phase, ca, pa, closed, open, remarks };
});

export const QA_CAPA_TOTALS = QA_CAPA_DATA.reduce(
  (t, d) => ({ ca: t.ca + d.ca, pa: t.pa + d.pa, closed: t.closed + d.closed, open: t.open + d.open }),
  { ca: 0, pa: 0, closed: 0, open: 0 }
);

export const COMBINED_CAPA_DATA = [
  { name: "1st IQA '25", ca: 87, pa: 76, closed: 162, open: 1, remarks: "PA25/V/QA/018 (1st IQA: SOP/MA/002, Risk management SOP is under draft)" },
  { name: "2nd IQA '25", ca: 101, pa: 53, closed: 150, open: 4, remarks: "1. CA25/V/IT/079 (2nd IQA) : Open as the Quality objective of IT is not yet prepared\n2. CA26/I/MN/001-As per PA cylinder needs to be issued from ST personnel. Upon follow up with MN it was notified that the activity is carried out however evidence is yet to be received\n3. PA26/I/MG/003 - Under incident new target date yet to be given by user\n4. PA25/I/IN/051 - Discussion with site III ongoing" },
  { name: "Ext. Audit '26", ca: 16, pa: 0, closed: 16, open: 0, remarks: "-" }
];

export const SITES_DATA = [
  {
    id: 'SITE-I', name: 'Site I', color: 'from-amber-400 to-orange-500', accent: 'text-amber-600',
    audits: [
      { name: "1st IQA '25", nc: 0, mnc: 7, pi: 7, ca: 33, pa: 24, statusRem: 'Closed' },
      { name: "2nd IQA '25", nc: 2, mnc: 3, pi: 3, ca: 59, pa: 26, statusRem: 'Closed' },
      { name: "Ext. Audit '26", status: 'NA', label: 'N / A', ca: 4, pa: 0, statusRem: 'Closed' },
      { name: "1st IQA '26", status: 'PENDING', label: 'Report Not Released' }
    ]
  },
  {
    id: 'SITE-III', name: 'Site III', color: 'from-purple-500 to-indigo-500', accent: 'text-purple-600',
    audits: [
      { name: "1st IQA '25", nc: 0, mnc: 1, pi: 4, ca: 35, pa: 26, statusRem: 'Closed' },
      { name: "2nd IQA '25", nc: 0, mnc: 2, pi: 1, ca: 20, pa: 13, statusRem: 'Closed' },
      { name: "Ext. Audit '26", nc: 2, mnc: 0, pi: 0, ca: 10, pa: 0, statusRem: 'Closed' },
      { name: "1st IQA '26", status: 'PENDING', label: 'Report Not Released' }
    ]
  },
  {
    id: 'SITE-V', name: 'Site V', color: 'from-sky-400 to-blue-500', accent: 'text-sky-600',
    audits: [
      { name: "1st IQA '25", nc: 1, mnc: 0, pi: 1, ca: 19, pa: 26, statusRem: 'PA25/V/QA/018 (1st IQA: SOP/MA/002, Risk management SOP is under draft)' },
      { name: "2nd IQA '25", nc: 0, mnc: 5, pi: 1, ca: 22, pa: 14, statusRem: 'CA25/V/IT/079 (2nd IQA) : Open as the Quality objective of IT is not yet prepared' },
      { name: "Ext. Audit '26", nc: 0, mnc: 0, pi: 0, ca: 2, pa: 0, statusRem: 'Closed' },
      { name: "1st IQA '26", status: 'PENDING', label: 'Report Not Released' }
    ]
  }
];
