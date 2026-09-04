export const months = ['July', 'August', 'September', 'October', 'November']

// Line process time comparison data (Before vs After optimization)
export const lineProcessTimeComparison = {
    clearance: {
        before: 45, // minutes average before optimization
        after: 28, // minutes average after optimization
        improvement: 38 // percentage
    },
    closure: {
        before: 52,
        after: 35,
        improvement: 33
    },
    reverification: {
        before: 35,
        after: 22,
        improvement: 37
    },
    verification: {
        before: 40,
        after: 25,
        improvement: 38
    }
}

// Monthly average process times (showing improvement trend)
export const lineProcessTimeTrend = {
    labels: months,
    clearance: [42, 38, 32, 30, 28], // minutes
    closure: [48, 42, 38, 36, 35],
    reverification: [32, 28, 25, 23, 22],
    verification: [38, 34, 29, 27, 25]
}

export const lineClearanceData = {
    approved: [670, 690, 338, 249, 517],
    notApproved: [0, 11, 6, 4, 8]
}

export const lineClosureData = {
    approved: [653, 673, 385, 243, 505],
    notApproved: [0, 8, 6, 5, 10]
}

export const lineReverificationData = {
    approved: [515, 993, 975, 883, 1055],
    notApproved: [0, 12, 6, 7, 9]
}

export const lineVerificationData = {
    approved: [1023, 1201, 1256, 1318, 1392],
    notApproved: [0, 0, 0, 0, 1]
}

export const lineProcessTotals = {
    clearance: 2464,
    closure: 2459,
    reverification: 4421,
    verification: 6190
}

// Calculate approval percentages for control charts
export const lineApprovalRates = {
    clearance: [100, 98.4, 98.3, 98.4, 98.5], // percentage
    closure: [100, 98.8, 98.5, 98.0, 98.1],
    reverification: [100, 98.8, 99.4, 99.2, 99.1],
    verification: [100, 100, 100, 100, 99.9]
}

// Control limits (UCL/LCL) for processes
export const controlLimits = {
    approvalRate: {
        mean: 99.0,
        ucl: 99.8,
        lcl: 98.2
    },
    incidentRate: {
        mean: 0.85, // incidents per 1000 units (%)
        ucl: 1.2,
        lcl: 0.5
    }
}

// KPI improvements
export const kpiImprovements = {
    incidentReduction: 42, // % reduction YoY
    criticalIncidentReduction: 100, // % reduction
    approvalRateImprovement: 1.2, // percentage point improvement
    processComplianceScore: 94 // %
}

export const incidentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    minor: [7, 12, 20, 4, 6, 1, 1, 4, 7, 5, 6],
    major: [0, 3, 1, 0, 1, 0, 0, 0, 2, 0, 0],
    critical: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
}

// Incident closure and investigation cycle times (avg days)
export const incidentDuration = {
    labels: ['Jan–May', 'Jun–Aug', 'Sep', 'Oct', 'Nov'],
    closure: [24.2, 25, 14, 23, 17],
    investigation: [3.6, 25, 7, 1, 4]
}

// Corrective Action (CA) data
export const correctiveActionData = {
    labels: ['Jan-June', 'July-Nov'],
    avgDaysToClosure: [51, 43],
    majorNonCompliance: [10, 34], // MNC
    nonCompliance: [3, 5], // NC
    total: [13, 39]
}

// Preventive Action (PA) data
export const preventiveActionData = {
    labels: ['Jan-June', 'July-Nov'],
    avgDaysToClosure: [64, 60]
}

// Out of Service (OOS) data
export const outOfServiceData = {
    labels: ['Apr-Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    avgDaysToClosure: [27, 47, 12, 9, 11, 6]
}

export const calibrationData = {
    labels: months,
    counts: [28, 6, 48, 5, 19]
}

// Calibration efficiency metrics (Before vs After optimization)
export const calibrationEfficiency = {
    avgTimePerUnit: {
        before: 120, // minutes
        after: 85,
        improvement: 29
    },
    onTimeCompletion: {
        before: 92, // percentage
        after: 98,
        improvement: 6.5
    },
    equipmentReadiness: {
        before: 94, // percentage
        after: 99,
        improvement: 5.3
    }
}

export const actions = [{
        title: 'In-process rejection reduced from 4% to 2.5% (cartridge)',
        status: 'done',
        impact: 'High'
    },
    {
        title: 'Biweekly shop-floor observation reducing repeat NCs by 50%',
        status: 'in-progress',
        impact: 'High'
    },
    {
        title: 'Work instructions & pictorial defect awareness deployed',
        status: 'done',
        impact: 'Medium'
    },
    {
        title: 'Line-wise rework areas & QR segregation to prevent mix-ups',
        status: 'done',
        impact: 'High'
    },
    {
        title: 'Particle count testing & IQC modifications (dust mitigation)',
        status: 'in-progress',
        impact: 'Medium'
    },
    {
        title: 'Stage-level defect-rate targets (cartridge complete, device in progress)',
        status: 'in-progress',
        impact: 'High'
    },
    {
        title: 'Limit sample register & QR scanning software rollout',
        status: 'in-progress',
        impact: 'Medium'
    }
]

export const processImplementations = [{
        title: 'Monthly meeting with MG and MN on rejections/challenges',
        description: 'Reduced in process rejections from existing 4 to 2.5% in cartridge and rework happening for metal enclosures of Duo and Quatro.',
        status: 'done'
    },
    {
        title: 'Observation meeting on shop floor for every 15 days',
        description: 'Reduction of repetitive NC\'s by 50%',
        status: 'done'
    },
    {
        title: 'Work instructions in the production floor',
        description: 'Better and easy understanding of work flow',
        status: 'done'
    },
    {
        title: 'Re-Work area implemented (Line-Wise)',
        description: 'Mix up of cartridges avoided',
        status: 'done'
    },
    {
        title: 'Implementation of Particle count testing',
        description: 'Proactive measure to avoid the dust – IQC modification',
        status: 'done'
    },
    {
        title: 'QR pasting activity segregation',
        description: 'Segregation of tables has been done to prevent cartridge mix-up – Mitigation of repetitive incident.',
        status: 'done'
    },
    {
        title: 'Pictorial representation implemented',
        description: 'For awareness of repetitive defects',
        status: 'done'
    },
    {
        title: 'Change control tracking sheet',
        description: 'For clear understating of activities and planning',
        status: 'done'
    },
    {
        title: 'Defect rate set for each stage',
        description: 'Implemented for Cartridge and in progress for Device',
        status: 'in-progress'
    },
    {
        title: 'Limit sample register',
        description: 'Under progress',
        status: 'in-progress'
    },
    {
        title: 'QR scanning software',
        description: 'To ensure proper line-wise identification and to eliminate cartridge/mould mix-up – Under Progress',
        status: 'in-progress'
    }
]

// Calculated metrics
export const totalIncidents = incidentData.minor.reduce((a, b) => a + b, 0) +
    incidentData.major.reduce((a, b) => a + b, 0) +
    incidentData.critical.reduce((a, b) => a + b, 0)

export const totalCalibrations = calibrationData.counts.reduce((a, b) => a + b, 0)

export const totalCritical = incidentData.critical.reduce((a, b) => a + b, 0)

export const avgApprovalRate = 98.8

export const peakToTroughReduction = 70

export const incidentsList = [{
        date: '20/01/2025',
        irNumber: 'IR25/III/QA/003',
        department: 'Quality Assurance',
        raisedBy: 'K. Varma',
        area: 'MG-CA',
        description: 'During line verification documents we observed incompleted document at 07:46 hours dated on 20/01/2025. Proof attached and later user department updated the documents without person present in shift and forged sign by manufacturing team (K. Ramu) refer Attachment - I',
        severity: 'Minor'
    },
    {
        date: '25/01/2025',
        irNumber: 'IR25/III/MG/005',
        department: 'Manufacturing',
        raisedBy: 'P. Pavan',
        area: 'Manufacturing',
        description: 'While recording the data of the laser welding machine equipment ID - EC/EQID/III-00069 in the equipment logbook (Logbook ID - LOG/EC/III/308-01) is not matching with In process parameters monitoring sheet for cartridge assembly (FM/CA/III/079) Refer Attachment - 01',
        severity: 'Minor'
    },
    {
        date: '31/01/2025',
        irNumber: 'IR25/III/QA/006',
        department: 'Quality Assurance',
        raisedBy: 'P.L.Sai Kaushik',
        area: 'Manufacturing',
        description: 'During the closure process of change control (CC24/MG/III/162), It was observed that equipment (ED/EQID/III-00159) had been moved from its defined location without a prior change control',
        severity: 'Major'
    },
    {
        date: '08/02/2025',
        irNumber: 'IR25/III/QA/007',
        department: 'Quality Assurance',
        raisedBy: 'N. Chakradhar',
        area: 'Manufacturing',
        description: 'During batch file compilation of the batches MV/LR-00120 and MV/LR-00124, it is found that 04 Nos documents are not submitted to QA for the compilation. Refer Annexure - I for details',
        severity: 'Minor'
    },
    {
        date: '13/02/2025',
        irNumber: 'IR25/III/QA/009',
        department: 'Quality Assurance',
        raisedBy: 'G. Naveenkumar',
        area: 'Manufacturing',
        description: 'In change control CC24/MG/III/204, the maintenance plan to be requested by the user, but was not raised by the manufacturing team. Hence PPM plan for the equipment was not created within the specified proposed date of closure',
        severity: 'Minor'
    },
    {
        date: '15/02/2025',
        irNumber: 'IR25/III/MG/012',
        department: 'Manufacturing',
        raisedBy: 'L. Swathi',
        area: 'Manufacturing',
        description: 'During the equipment verification process for validation purpose, it was found that the pysical locations of three equipmentsare do not match the SAP locations.',
        severity: 'Minor'
    },
    {
        date: '25/02/2025',
        irNumber: 'IR25/III/QA/019',
        department: 'Quality Assurance',
        raisedBy: 'L. R. Naidu',
        area: 'Manufacturing',
        description: 'During walkthrough in the Subassembly-02 area, it was observed that the fluorosilicone oil had expired on 10/01/2025 (Refer attachment - 01)',
        severity: 'Minor'
    },
    {
        date: '28/02/2025',
        irNumber: 'IR25/III/QA/020',
        department: 'Quality Assurance',
        raisedBy: 'A.Sai kumar',
        area: 'Manufacturing',
        description: 'During the review the logbooks it was observed that sr no was incorrectly listed in the logbooks LOG/EC/III/394-01 and LOG/EC/III/398-01 page no: 05 and page no :09 it was deviating the SOP/QA/010',
        severity: 'Minor'
    },
    {
        date: '28/02/2025',
        irNumber: 'IR25/III/QA/021',
        department: 'Quality Assurance',
        raisedBy: 'Safety Officer',
        area: 'Manufacturing',
        description: 'At the time of walkthrough on 28/02/2025, it is observed that the material has been kept in front of emergency exit and emergency exit board has been found on floor.',
        severity: 'Critical'
    },
    {
        date: '03/03/2025',
        irNumber: 'IR25/III/QA/023',
        department: 'Quality Assurance',
        raisedBy: 'K. Varma',
        area: 'MG-CA',
        description: 'During walkthrough it was observed that 400nos cartridge arefall down on the production floor for the batch MVDLR00049 from line-D refer attachment-01.',
        severity: 'Major'
    },
    {
        date: '05/03/2025',
        irNumber: 'IR25/III/QA/026',
        department: 'Quality Assurance',
        raisedBy: 'L. R. Naidu',
        area: 'Manufacturing',
        description: 'During a walkthrough in the cartridge production floor it was observed that operator (SK Mabunisha and K chandrakala gowri) were operating the aluminium foil sealing machine , however there was no training on the equipment',
        severity: 'Major'
    },
    {
        date: '07/03/2025',
        irNumber: 'IR25/III/QA/029',
        department: 'Quality Assurance',
        raisedBy: 'L. R. Naidu',
        area: 'Manufacturing and Maintenance',
        description: 'During a walkthrough in the cartridge production floor on 06/03/2025 it was obsereved that equipment breakdowns has occurred however the shift supervisor did not initiate breakdown notifications however maintenance departmrnt personnel were performed the activity.',
        severity: 'Major'
    },
    {
        date: '13/03/2025',
        irNumber: 'IR25/III/QA/033',
        department: 'Quality Assurance',
        raisedBy: 'L. R. Naidu',
        area: 'Manufacturing',
        description: 'while operating the aluminium foil sealing machine the operator finger was cut proper safety precautions were not followed',
        severity: 'Major'
    },
    {
        date: '13/03/2025',
        irNumber: 'IR25/III/QA/036',
        department: 'Quality Assurance',
        raisedBy: 'L. R. Naidu',
        area: 'Manufacturing',
        description: 'The laser welding machines pyrometer was bypassed on the production floor, and cartridges were welded in the laser welding machine without temperature measuring',
        severity: 'Major'
    },
    {
        date: '15/03/2025',
        irNumber: 'IR25/III/QA/038',
        department: 'Quality Assurance',
        raisedBy: 'L. R. Naidu',
        area: 'Manufacturing',
        description: 'During a line verification it was observed that no activity was performed on the alluminium foil sealing machine(Ec/EQID/III-00164) on 14/03/2025. However the respective equipment logbook and records had been updated refer attachment -01.',
        severity: 'Major'
    },
    {
        date: '19/03/2025',
        irNumber: 'IR25/III/QA/042',
        department: 'Quality Assurance',
        raisedBy: 'N. Chakradhar',
        area: 'Manufacturing',
        description: 'During FQC sampling for batch MV/LR-0060(SUb batch No: MVDLR00060) it was observed that the positions of sample filter in the cartridge was improper',
        severity: 'Minor'
    },
    {
        date: '24/05/2025',
        irNumber: 'IR25/III/QA/054',
        department: 'Quality Assurance',
        raisedBy: 'K.Varma',
        area: 'Manufacturing',
        description: 'During line Re-Verification it was observed that the foil sealing machine has been utilized on the line without line clearance being taken. The equipment lnumber is EC/QUID/III-00041 and the data has also been logged in the logbook. Refere attachment-I. Foil sealing machine is used in line-A and line clearance is taken on 21/05/2025',
        severity: 'Minor'
    },
    {
        date: '17/05/2025',
        irNumber: 'IR25/III/QA/055',
        department: 'Quality Assurance',
        raisedBy: 'A. Sai Kumar',
        area: 'Manufacturing',
        description: 'During the review of log books, it was observed that the serial number was incorrectly listed in the logbook LOG/EC/III/367-03, page No. 36 of 50. It was Deviating from the SOP/QA/010. It was found at 16:25 Hrs on 17/05/2025.',
        severity: 'Minor'
    },
    {
        date: '30/06/2025',
        irNumber: 'IR25/III/QA/058',
        department: 'Quality Assurance',
        raisedBy: 'P.L. Sai Kaushik',
        area: 'Manufacturing and maintenence',
        description: 'On 30/06/2025, during B shift at the SMD Rework station in the laser cartridge production area, it was observed that equipment (EC/EQID/III-00635) has been turned ON and left for a long time. Due to this machine was overheated, causing nearby Logbook (LOG/CA/III/341-01) got burned and smoke was detected Refer Attachment-I. The Equipment belongs to line D, but there is no line clearance was taken to use the machine.',
        severity: 'Major'
    },
    {
        date: '08/08/2025',
        irNumber: 'IR25/III/MG/059',
        department: 'Manufacturing',
        raisedBy: 'A. Madhuri',
        area: 'Manufacturing',
        description: 'During Batch Closure for batch MVDL000161 (lot-3), while calculating the left over material for buffer caps we found that leftover quantity was not matched with the line clearance document. Refer Attachment- 01',
        severity: 'Minor'
    },
    {
        date: '16/08/2025',
        irNumber: 'IR25/III/QA/060',
        department: 'Quality Assurance',
        raisedBy: 'L.R. Naidu',
        area: 'Manufacturing',
        description: 'During line verification, it  has been observed that activities were being performed in line-D (Dump insertion to Annealing) without line verification (MVDLR00105).',
        severity: 'Major'
    },
    {
        date: '21/08/2025',
        irNumber: 'IR25/III/QA/061',
        department: 'Quality Assurance',
        raisedBy: 'L.R. Naidu',
        area: 'Manufacturing and Stores',
        description: 'During the walkthrough in the intermediate stores, it was observed that laser  cartridge front and back plate Rib NC materails were received (trays-20Nos) without QC-approved labels on the trays.',
        severity: 'Minor'
    },
    {
        date: '25/08/2025',
        irNumber: 'IR25/III/QA/062',
        department: 'Quality Assurance',
        raisedBy: 'L.R. Naidu',
        area: 'Manufacturing',
        description: 'During the Walkthrough on the Laser Production floor, it was observed that 10Nos cartridges without QR label were found in the dump insertion area. refer to the attachment -01',
        severity: 'Minor'
    },
    {
        date: '09/09/2025',
        irNumber: 'IR25/III/QA/063',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During the line re-verification activity, it was observed that materials related to line-C assembled cartridge (Batch: MVCLR00114) were stored in line -A. As per SOP cross-line material storage is not prmitted',
        severity: 'Minor'
    },
    {
        date: '10/09/2025',
        irNumber: 'IR25/III/QA/064',
        department: 'Quality Assurance',
        raisedBy: 'A.Saikumar',
        area: 'Manufacturing',
        description: 'During the walktrough it was observed that Isopropyl Alcohal was spilled onto the logbook (logbook ID - LOG/CA/III/355-02),Refer annexure-01',
        severity: 'Minor'
    },
    {
        date: '09/09/2025',
        irNumber: 'IR25/III/QA/065',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During log book verification 15+4 days .it was observed that the multiple GDP errors were found in different log books which does not follow good documentation practices (refer attachment -1)',
        severity: 'Minor'
    },
    {
        date: '08/09/2025',
        irNumber: 'IR25/III/QA/066',
        department: 'Quality Assurance',
        raisedBy: 'P.L. Sai Kaushik',
        area: 'Manufacturing',
        description: 'During the compilation of BRC documents for batches MV/LR-0107, MV/NC-0040, MV/LR-0110, MV/L-00169 GDP errors were found. The documets were submitted without proper checking for completness, which does not follow good documentation practices. (Refer Attachment -1)',
        severity: 'Minor'
    },
    {
        date: '15/09/2025',
        irNumber: 'IR25/III/QA/067',
        department: 'Quality Assurance',
        raisedBy: 'P.L. Sai Kaushik',
        area: 'Manufacturing',
        description: 'While giving Re-verification on 15/09/2025 A-Shift for batch MVDL000173 on Line-D in matrix pallet filling to pouch packing, on the shift Reconciliation checklist (FM/CA/III/065BR, page 3 of 8) for smiley and valve fixing, the leftover quantity was recorded as 62nos cartridges. However, during verification, it was found that out of 62nos cartridges,11nos cartridges had already been processed and completed the smiley and valve fixing activity. Despite this, these 11nos cartridges were still recorded as leftover quantity in the workflow (Refer Attachment-1).',
        severity: 'Major'
    },
    {
        date: '19/09/2025',
        irNumber: 'IR25/III/QA/068',
        department: 'Quality Assurance',
        raisedBy: 'P.L. Sai Kaushik',
        area: 'Manufacturing',
        description: 'During the walkthrough on Line-A, cartridges from batch MVAL000170 were found mixed with cartridges from different batches. In addition, cartridges of different moulds were observed with different QR label affixed ( for S13 mould, S14 QR labels affixed). Refer Attachment -I',
        severity: 'Minor'
    },
    {
        date: '16/09/2025',
        irNumber: 'IR25/III/QA/069',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During line re-verification in line D  for batch MVDLR00111, it was observed that a cartridge without a QR label was found on the line , and dump insertion had already been completed . refer attachment -I',
        severity: 'Minor'
    },
    {
        date: '23/09/2025',
        irNumber: 'IR25/III/QC/071',
        department: 'Quality control',
        raisedBy: 'G. Krishna Veni',
        area: 'Manufacturing',
        description: 'During the final quality control inspection of batch MVDLR00111, it was observed that out of a sampling size of 200 cartridges, 13 cartrdiges were belonged to a different batch. The cartridges were identified as from line C. refer attachment-I',
        severity: 'Major'
    },
    {
        date: '14/10/2025',
        irNumber: 'IR25/III/QA/072',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During previous shift rejection verification it was observed that the QR code labels did not match with actual mould number. and it is clearly visible that the  QR labels are removed and re pasted refer attachment-1',
        severity: 'Minor'
    },
    {
        date: '22/10/2025',
        irNumber: 'IR25/III/QA/073',
        department: 'Quality Assurance',
        raisedBy: 'A.Saikumar',
        area: 'Manufacturing',
        description: 'On 21/10/2025 during b shift in line A there were 26 nos  VI-3 rejections,BUT ONLY 6 NOS were updated in the workflow checklist and reflected in the rejection report',
        severity: 'Minor'
    },
    {
        date: '28/10/2025',
        irNumber: 'IR25/III/QA/074',
        department: 'Quality Assurance',
        raisedBy: 'P.L. Sai Kaushik',
        area: 'Manufacturing',
        description: 'At line-A, Cartridges from batch MVANC00051 were found mixed with different QR Labels(For N11 Mould , N13 Mould QR Label was affixed)',
        severity: 'Minor'
    },
    {
        date: '31/10/2025',
        irNumber: 'IR25/III/QA/075',
        department: 'Quality Assurance',
        raisedBy: 'P.L. Sai Kaushik',
        area: 'Manufacturing',
        description: 'During Verification of the IST, it was observed that spme Processed cartridges were found stored in the IST location Refer Attachment-1.',
        severity: 'Minor'
    },
    {
        date: '31/10/2025',
        irNumber: 'IR25/III/QA/076',
        department: 'Quality Assurance',
        raisedBy: 'Naveenkumar G',
        area: 'HR & Administration and Manufacturing',
        description: 'As per Waste management (SOP/HR/III/007-02) SOP, whenever rejected materials are to be kept in the rejection room, the logbook (LOG/HR/III/031-01) has to be filled. Cartridges were found inside the rejection room, but the logbook was not filled. Refer Attachment I for reference.',
        severity: 'Minor'
    },
    {
        date: '07/11/2025',
        irNumber: 'IR25/III/QA/077',
        department: 'Quality Assurance',
        raisedBy: 'A.Saikumar',
        area: 'Manufacturing',
        description: 'During the re-verification activity,it was identified that the PPM due dates for 10Nos Automatic Cartridge Test Jig (Refer Annexure-01) had already been completed . However as per the SOP, the required PPM activities were not performed with in the scheduled time(Refer Attachment-01).',
        severity: 'Minor'
    },
    {
        date: '06/11/2025',
        irNumber: 'IR25/III/QA/078',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During walkthrough in the production floor  in line A it was observed that the NEXUS BOND material shelf life was completed',
        severity: 'Minor'
    },
    {
        date: '17/11/2025',
        irNumber: 'IR25/III/QA/079',
        department: 'Quality Assurance',
        raisedBy: 'S.Raju',
        area: 'Manufacturing',
        description: 'Line Reverification in Line A from matrix pallet filling to pouch packing was issued based on the shift reconciliation checklist. However, after the reverification was completed, all the cartridges were shifted into visual inspection-4 stage without performing an activity (Refer Attachment -1)',
        severity: 'Minor'
    },
    {
        date: '11/11/2025',
        irNumber: 'IR25/III/QA/080',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During line reverification in line c it was observed that 30nos of foil sealing rework quantity were recorded as accepted in the document and there was no SMD rework station in line clearance was available in the line clearance document Refer Attachment-1',
        severity: 'Minor'
    },
    {
        date: '18/11/2025',
        irNumber: 'IR25/III/QA/081',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During routine line verification on Line D, it was observed that the operating parameters of the Laser Welding Machine (Equipment ID: EC/EQID/III-00003) were outside the approved parameter limits specified in the validation report (VR/25/MG/EV/III/201).  (Refer Attachment-1).',
        severity: 'Minor'
    },
    {
        date: '24/11/2025',
        irNumber: 'IR25/III/QA/082',
        department: 'Quality Assurance',
        raisedBy: 'U.Srinivas',
        area: 'Manufacturing',
        description: 'During walk through in Line D and Line E, it was observed that the parameters of the foil sealing machines (EC/EQID/III-00164, EC/EQID/III-00621 and EC/EQID/III-00426) were outside the approved parameter ranges specified in the validation report and SOP. (Refer Attachment-1).',
        severity: 'Minor'
    }
]

// IPQA Cartridge Assembly Department - Process Time Data (Average time in Mins.)
export const cartridgeAssemblyProcesses = {
    labels: [
        'QR CODE GENERATION',
        'QR PASTING',
        'GROMMET FIXING',
        'SMILEY ASSEMBLY',
        'Sample filter washing',
        'Sample filter heating',
        'Dump to annealing',
        'Matrix pallet filling to pouch packing',
        'Rework',
        'Packing verification',
        'LINE-G (Automation line)'
    ]
}

// Clearance times (Mins.) - Jan-Aug, Sep, Oct, Nov
export const cartridgeClearanceTimes = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'QR CODE GENERATION': [6.42, 6.40, 5.10, 5.75],
        'QR PASTING': [6.25, 5.85, 5.55, 5.70],
        'GROMMET FIXING': [6.11, 6.30, 5.14, 5.10],
        'SMILEY ASSEMBLY': [6.20, 6.13, 5.09, 5.85],
        'Sample filter washing': [5.95, 6.43, 5.17, 7.50],
        'Sample filter heating': [6.05, 6.00, 6.00, 5.85],
        'Dump to annealing': [8.59, 8.33, 9.12, 10.35],
        'Matrix pallet filling to pouch packing': [10.28, 10.45, 8.55, 9.55],
        'Rework': [8.09, 5.00, 9.00, 5.15],
        'Packing verification': [null, null, null, null],
        'LINE-G (Automation line)': [null, null, null, 12.20]
    }
}

// Closure times (Mins.) - Jan-Aug, Sep, Oct, Nov
export const cartridgeClosureTimes = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'QR CODE GENERATION': [5.27, 5.48, 5.26, 5.37],
        'QR PASTING': [6.39, 6.05, 4.43, 5.13],
        'GROMMET FIXING': [6.41, 5.42, 5.20, 7.09],
        'SMILEY ASSEMBLY': [6.27, 5.39, 6.39, 5.43],
        'Sample filter washing': [4.30, 4.43, 6.22, 5.20],
        'Sample filter heating': [3.40, 6.00, 5.12, 5.22],
        'Dump to annealing': [8.15, 11.10, 10.22, 13.44],
        'Matrix pallet filling to pouch packing': [9.08, 10.12, 10.38, 11.33],
        'Rework': [9.02, 5.30, 5.00, 5.32],
        'Packing verification': [null, null, null, null],
        'LINE-G (Automation line)': [null, null, null, 12.00]
    }
}

// Re-Verification times (Mins.) - Jan-Aug, Sep, Oct, Nov
export const cartridgeReVerificationTimes = {
        labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
        data: {
            'QR CODE GENERATION': [5.27, 6.12, 4.00, 7.00],
            'QR PASTING': [6.39, 6.55, 5.34, 5.30],
            'GROMMET FIXING': [6.41, 5.00, 5.11, 5.57],
            'SMILEY ASSEMBLY': [6.27, 5.39, 4.37, 5.38],
            'Sample filter washing': [4.30, null, null, null],
            'Sample filter heating': [3.40, 3.00, 6.00, 5.00],
            'Dump to annealing': [8.15, 6.19, 5.52, 6.01],
            'Matrix pallet filling to pouch packing': [9.08, 7.03, 6.32, 6.56],
            'Rework': [9.02, 5.00, 3.00, 6.00],
            'Packing verification': [6.39, 5.45, 5.19, 6.05],
            'LINE-G (Automation line)': [null, null, null, 4.30]
        }
    }
    // IPQA Device Department - Process Time Data (Average time in Mins.)
    // Assembly of Rapid cell Lysis system
export const deviceLysisSystemClearance = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Door mechanism assembly': [4.13, null, 3.03, 4.88],
        'Final assembly and labeling': [3.2, null, 3.04, 3.05],
        'Integration testing': [3.93, null, 2.17, 2.07]
    }
}

export const deviceLysisSystemClosure = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Door mechanism assembly': [3.27, null, 4.03, 5.1],
        'Final assembly and labeling': [4.05, null, 3.07, 4.15],
        'Integration testing': [2.13, null, 3.1, 2.2]
    }
}

export const deviceLysisSystemReVerification = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Door mechanism assembly': [4.08, null, 5.05, 4.07],
        'Final assembly and labeling': [4.2, null, null, 3.13],
        'Integration testing': [3.85, null, 2.18, 1.18]
    }
}

// Assembly of Two bay PCR Machine
export const devicePCRMachineClearance = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Final assembly and labelling': [5.18, 3.05, 3.4, 4.2],
        'Bottom cover and top cover': [5.02, 4.45, null, 7.15],
        'AFC TESTING': [8.08, 7.3, null, 6.2],
        'Packing': [6.05, 5.2, null, 3.12],
        'case closing and labelling': [4.38, null, 3.33, null],
        'Dye Testing Duo rework line': [2.93, null, 2.27, null],
        'Mechanism with Optics Assembly': [3.38, null, 2.35, null],
        'Optics sub assembly': [6.02, null, 3.4, null],
        'Top and bottom cover assembly': [8.01, null, 5.27, null]
    }
}

export const devicePCRMachineClosure = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Final assembly and labelling': [7.25, 4.25, 3.18, 5.17],
        'Bottom cover and top cover': [10.03, 4.23, null, 8.17],
        'AFC TESTING': [8.88, 4.17, null, 3.3],
        'Packing': [4.14, 2.13, null, 5.13],
        'case closing and labelling': [8.7, null, 4.35, null],
        'Dye Testing Duo rework line': [5.03, null, 3.18, null],
        'Mechanism with Optics Assembly': [4.35, null, 2.27, null],
        'Optics sub assembly': [3.19, null, 5.18, null],
        'Top and bottom cover assembly': [4.24, null, 6.22, null]
    }
}

export const devicePCRMachineReVerification = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Final assembly and labelling': [3.42, 2.1, null, 2.08],
        'Bottom cover and top cover': [3.08, 2.1, null, 2.17],
        'AFC TESTING': [9.53, 2.15, null, 1.05],
        'Packing': [2.35, 2.1, 1.28, 3.17],
        'case closing and labelling': [3.2, null, 2.13, null],
        'Dye Testing Duo rework line': [4.33, null, 1.22, null],
        'Mechanism with Optics Assembly': [null, null, 2.13, null],
        'Optics sub assembly': [5.27, null, 1.17, null],
        'Top and bottom cover assembly': [1.93, null, 1.17, null]
    }
}

// Assembly of Sixteen Bay PCR Machine
export const deviceSixteenBayPCRClearance = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        '4x4 packing': [null, 3.15, 4.15, 5.15],
        '4x4 top and bottom cover assembly': [null, 4.13, 6.2, 5.13],
        'AFC Testing 4x4': [null, 3.13, 4.22, 5.13]
    }
}

export const deviceSixteenBayPCRClosure = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        '4x4 packing': [null, 4.18, 3.03, 5.18],
        '4x4 top and bottom cover assembly': [null, 6.18, 7.17, 6.18],
        'AFC Testing 4x4': [null, 5.22, 4.27, 3.18]
    }
}

export const deviceSixteenBayPCRReVerification = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        '4x4 packing': [null, null, null, null],
        '4x4 top and bottom cover assembly': [null, 2.07, 3.03, 2.07],
        'AFC Testing 4x4': [null, 3.27, 2.2, 4.27]
    }
}

// Assembly of extraction Device
export const deviceExtractionClearance = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Top cover Assembly': [4.38, null, null, 6.12],
        'Mechanism assembly': [4.18, null, null, 3.1],
        'Wiring - Main Assembly area': [7.03, null, null, 5.72],
        'Bottom cover': [6.73, null, null, 6.37],
        'Testing': [4.45, null, null, 7.0],
        'Packing room 1': [3.02, null, null, 6.37],
        'Eject Motor Sub Assembly': [4.37, null, 2.08, null],
        'Valve Rotating Sub Assembly ASED': [5.43, 3.18, null, null],
        'Fluid Nozzle Sub Assembly': [5.93, 4.08, null, null]
    }
}

export const deviceExtractionClosure = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Top cover Assembly': [5.93, null, null, 4.67],
        'Mechanism assembly': [4.37, null, null, 4.25],
        'Wiring - Main Assembly area': [8.05, null, null, 8.13],
        'Bottom cover': [7.07, null, null, 4.03],
        'Testing': [5.03, null, null, 5.4],
        'Packing room 1': [3.43, null, null, 0.67],
        'Eject Motor Sub Assembly': [3.03, null, 3.78, null],
        'Valve Rotating Sub Assembly ASED': [4.93, 4.18, null, null],
        'Fluid Nozzle Sub Assembly': [6.23, 4.28, null, null]
    }
}

export const deviceExtractionReVerification = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'Top cover Assembly': [null, null, null, null],
        'Mechanism assembly': [3.03, null, null, null],
        'Wiring - Main Assembly area': [null, null, null, null],
        'Bottom cover': [null, null, null, null],
        'Testing': [null, null, null, null],
        'Packing room 1': [null, null, null, null],
        'Eject Motor Sub Assembly': [null, null, null, null],
        'Valve Rotating Sub Assembly ASED': [null, null, null, null],
        'Fluid Nozzle Sub Assembly': [null, null, null, null]
    }
}

// Sub-assemblies extraction Device (CAM, Sliding Block, etc.)
export const deviceSubAssemblyExtractionClearance = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'CAM Sub Assembly': [5.2, 3.1, null, null],
        'Sliding Block Sub Assembly': [3.7, 2.1, null, null],
        'POKA-YOKA Plate SUB ASSEMBLY': [4.93, 3.1, null, null],
        'Fixed Plate Sub Assembly': [6.68, 3.13, null, null],
        'Locking Block Sub Assembly': [4.33, 3.17, null, null],
        'Valve Motor -1 Sub Assembly': [3.28, 3.4, null, null],
        'Peristaltic pump sub assembly': [3.38, 2.15, null, null],
        'filter sub assembly': [3.73, 2.1, null, null],
        'mechanism assembly': [6.88, 3.22, null, null],
        'Bottom cover assembly': [4.73, 4.35, null, null],
        'Wiring Assembly': [6.33, 3.15, null, null],
        'Heater testing': [8.4, 3.2, null, null],
        'Testing': [9.73, 5.33, null, null],
        'vacuum nozzle sub assembly': [4.03, null, null, null]
    }
}

export const deviceSubAssemblyExtractionClosure = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'CAM Sub Assembly': [5.4, null, 2.3, null],
        'Sliding Block Sub Assembly': [5.17, null, 3.03, null],
        'POKA-YOKA Plate SUB ASSEMBLY': [4.37, null, 2.15, null],
        'Fixed Plate Sub Assembly': [4.93, null, 2.08, null],
        'Locking Block Sub Assembly': [3.7, null, 2.08, null],
        'Valve Motor -1 Sub Assembly': [5.38, null, 2.07, null],
        'Peristaltic pump sub assembly': [3.73, null, 3.12, null],
        'filter sub assembly': [4.03, null, 3.15, null],
        'mechanism assembly': [2.15, null, 7.15, null],
        'Bottom cover assembly': [4.07, null, 6.22, null],
        'Wiring Assembly': [4.93, null, 5.13, null],
        'Heater testing': [3.73, null, 4.12, null],
        'Testing': [5.07, null, 4.15, null],
        'vacuum nozzle sub assembly': [6.88, null, null, null]
    }
}

export const deviceSubAssemblyExtractionReVerification = {
    labels: ['Jan-Aug', 'Sep', 'Oct', 'Nov'],
    data: {
        'CAM Sub Assembly': [null, null, null, null],
        'Sliding Block Sub Assembly': [null, null, null, null],
        'POKA-YOKA Plate SUB ASSEMBLY': [null, null, null, null],
        'Fixed Plate Sub Assembly': [null, null, null, null],
        'Locking Block Sub Assembly': [null, null, null, null],
        'Valve Motor -1 Sub Assembly': [null, null, null, null],
        'Peristaltic pump sub assembly': [null, null, null, null],
        'filter sub assembly': [null, null, null, null],
        'mechanism assembly': [3.43, null, null, null],
        'Bottom cover assembly': [null, null, null, null],
        'Wiring Assembly': [null, null, null, null],
        'Heater testing': [3.37, null, null, null],
        'Testing': [null, null, null, null],
        'vacuum nozzle sub assembly': [null, null, null, null]
    }
}

// Change Control Data
export const changeControlData = {
    // Average days taken for closure
    avgDaysClosure: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
        data: [53, 52, 40, 41, 30, 28, 38, 32, 27, 19, 15]
    },

    // July month trend (individual change controls 120-140)
    julyTrend: {
        labels: Array.from({ length: 21 }, (_, i) => 120 + i),
        data: [40, 22, 19, 44, 44, 16, 9, 0, 51, 0, 70, 45, 43, 45, 49, 78, 16, 49, 39, 6, 90],
        trendLine: [50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10]
    },

    // August month trend (individual change controls 145-167)
    augustTrend: {
        labels: Array.from({ length: 23 }, (_, i) => 145 + i),
        data: [56, 32, 39, 38, 19, 44, 50, 33, 28, 12, 31, 38, 35, 30, 26, 96, 30, 60, 26, 28, 24, 27, 18, 12],
        trendLine: [50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6]
    },

    // September month trend (individual change controls 170-192)
    septemberTrend: {
        labels: Array.from({ length: 23 }, (_, i) => 170 + i),
        data: [15, 35, 13, 77, 42, 60, 25, 16, 10, 30, 5, 0, 60, 46, 28, 20, 38, 9, 11],
        trendLine: [35, 34, 33, 32, 31, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4]
    },

    // October month trend (individual change controls 195-220)
    octoberTrend: {
        labels: Array.from({ length: 26 }, (_, i) => 195 + i),
        data: [0, 45, 18, 42, 12, 26, 28, 0, 9, 0, 19, 33, 0, 13, 13, 10, 27, 19],
        trendLine: [45, 43, 41, 39, 37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 13, 11]
    },

    // Percentage closed in same month
    closurePercentage: {
        labels: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
        data: [0, 11, 29, 25, 33, 27, 11, 29, 29, 33]
    }
}
