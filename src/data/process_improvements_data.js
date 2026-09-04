export const sitesData = [
  {
    id: 'SITE-I',
    name: 'Site I',
    color: 'from-amber-400 to-orange-500',
    colorSolid: '#d97706',
    accent: 'text-amber-600',
    bgLight: 'bg-amber-50/50',
    collaborativeMeetings: [
      { dept: 'MG-Trueprep', regular: 0, improvement: 0, notes: '' },
      { dept: 'MG-Truenat', regular: 1, improvement: 1, notes: '' },
      { dept: 'DI', regular: 0, improvement: 0, notes: '' },
      { dept: 'QC', regular: 0, improvement: 0, notes: '' },
      { dept: 'ST', regular: 2, improvement: 2, notes: '' },
      { dept: 'MN', regular: 1, improvement: 0, notes: '' },
      { dept: 'IT', regular: 1, improvement: 0, notes: '' },
      { dept: 'HR', regular: 2, improvement: 1, notes: '' },
      { dept: 'PU', regular: 0, improvement: 0, notes: '' },
      { dept: 'BD', regular: 5, improvement: 1, notes: 'Meeting conducted every month wrt PSUR updations wherein inputs from cross functional depts. are discussed' },
      { dept: 'DD', regular: 5, improvement: 0, notes: '' },
      { dept: 'DP', regular: 1, improvement: 1, notes: '' },
    ],
    processImprovements: [
      { dept: 'MG-Truenat', count: 1, desc: 'Line clearance SOP (SOP/QA/013) was revised so as to ensure all relevant SAP transactions are verfied.' },
      { dept: 'ST', count: 2, desc: 'Repetetive incidents were observed wrt breakdowns of the data logger system present in stores. Upon discussion, PO has been raised for procurement of new data logger system.' },
      { dept: 'HR', count: 1, desc: 'As a part of a corrective action, training identification form was introduced.' },
      { dept: 'BD', count: 1, desc: 'Artworks are now mastered and controlled by QA.' },
      { dept: 'DP', count: 1, desc: 'An incident was reported wrt bulk vehicle details wherein the transporter mistakenly entered a quantity of 200 boxes instead of 800. As per SOP/DP/012-01, a defined procedure exists for Part A of E-way bill, however Part B was not under department control. As a correction, SOP was revised and Part B is now updated by logistics personnel.' }
    ],
    incidents: [
      { period: 'Jun-Nov 25', process: 36, gdp: 47, qa: 6 },
      { period: 'Dec-May 26', process: 30, gdp: 32, qa: 8 }
    ]
  },
  {
    id: 'SITE-III',
    name: 'Site III',
    color: 'from-purple-500 to-indigo-500',
    colorSolid: '#9333ea',
    accent: 'text-purple-600',
    bgLight: 'bg-purple-50/50',
    // The same 12 "Pending Entry Log" meetings were attended jointly by every
    // department, so each department's improvement/count below already includes
    // these 12. Totals de-duplicate them so the shared meetings are counted once.
    sharedEntryLogMeetings: 12,
    collaborativeMeetings: [
      { dept: 'MG-CA', regular: 25, improvement: 16, notes: '' },
      { dept: 'MG-MD', regular: 11, improvement: 18, notes: '' },
      { dept: 'DI', regular: 0, improvement: 15, notes: '' },
      { dept: 'QC', regular: 0, improvement: 14, notes: '' },
      { dept: 'MN', regular: 0, improvement: 13, notes: '' },
      { dept: 'HR', regular: 0, improvement: 12, notes: '' },
      { dept: 'PU', regular: 0, improvement: 12, notes: '' },
      { dept: 'DP', regular: 0, improvement: 12, notes: '' },
      { dept: 'ST', regular: 0, improvement: 12, notes: '' },
      { dept: 'IT', regular: 0, improvement: 12, notes: '' }
    ],
    processImprovements: [
      { dept: 'MG-CA', count: 16, desc: 'One point lesson at Cartridge production floor, Packing area, and Material transfer location. Development of dashboard that expedites QA process activities and data presentation. Pending ENtry Log meetings conducted.' },
      { dept: 'MG-MD', count: 18, desc: 'Clubbing of process stages to expedite the Mfg. process and QA verification. Root cause analysis over DAF materials. Improvization of Re-work practices. Work instructions and one-point lessons at Device floor areas. Display of Quality events on Activity boards for timely closure. RMA percentage reduction by 1%. Pending ENtry Log meetings conducted.' },
      { dept: 'DI', count: 15, desc: 'Cross functional dept FMEA trainings leading to design documents approval. Design drawings knowledge update to QA personnel. IQA trainings for cross functional audits. Pending ENtry Log meetings conducted.' },
      { dept: 'QC', count: 14, desc: 'Cross functional collaboration for comparison over SOP/STP/SPEC Vs practices followed. Collaboration on identification of critical activities in process and mitigation steps for identified risks. Pending ENtry Log meetings conducted.' },
      { dept: 'MN', count: 13, desc: 'Introduction of Shift hand over logs and monitoring via Logbook verification. Pending ENtry Log meetings conducted.' },
      { dept: 'HR', count: 12, desc: 'Pending ENtry Log meetings conducted.' },
      { dept: 'PU', count: 12, desc: 'Pending ENtry Log meetings conducted.' },
      { dept: 'DP', count: 12, desc: 'Pending ENtry Log meetings conducted.' },
      { dept: 'ST', count: 12, desc: 'Pending ENtry Log meetings conducted.' },
      { dept: 'IT', count: 12, desc: 'Pending ENtry Log meetings conducted.' }
    ],
    incidents: [
      { period: 'Jun-Nov 25', process: 11, gdp: 19, qa: 0 },
      { period: 'Dec-May 26', process: 31, gdp: 4, qa: 8 }
    ]
  },
  {
    id: 'SITE-V',
    name: 'Site V',
    color: 'from-sky-400 to-blue-500',
    colorSolid: '#0284c7',
    accent: 'text-sky-600',
    bgLight: 'bg-sky-50/50',
    collaborativeMeetings: [
      { dept: 'MG-TruePrep', regular: 1, improvement: 1, notes: '' },
      { dept: 'MG-Truenat', regular: 1, improvement: 0, notes: '' },
      { dept: 'DI', regular: 4, improvement: 0, notes: '' },
      { dept: 'QC', regular: 1, improvement: 0, notes: '' },
      { dept: 'DD', regular: 3, improvement: 0, notes: '' },
      { dept: 'ST', regular: 0, improvement: 1, notes: '' },
      { dept: 'MN', regular: 0, improvement: 3, notes: '' },
      { dept: 'QA', regular: 0, improvement: 2, notes: '' }
    ],
    processImprovements: [
      { dept: 'MG-TruePrep', count: 1, desc: 'As a part of correction for incident IR26/V/MG/013, layout format for subcomponent lot numbering was revised by addition of manufacturing and expiry date at the start of the activity to be updated by QA after giving line clearance, and SOP for labelling process was revised with addition of the process that label printing activity shall be carried out only after taking line clearance of buffer preparation.' },
      { dept: 'ST', count: 1, desc: 'To introduce pictorial representation to observe and carry out the activity in different process in Stores department was suggested (eg: FM/ST/039).' },
      { dept: 'MN', count: 3, desc: 'Mock drill frequency was changed from +/- 7 to +/- 15 to reduce the deviations initiated for mock drills. Suggested maintenance department for updating procedure in General maintenance SOP regarding Plant shutdown approval to be taken from impacting departments HODs observing the impact, and FM/MN/098 was introduced. Incase of shutdown in specific areas when there is no possibility to move the material portable ACs are introduced in maintenance department to compensate the required temperature (CA26/V/MN/003).' },
      { dept: 'QA', count: 2, desc: 'Issuance of authorised copies is controlled through log, to have a proper tracking of the documents issued and utilized. Corrective action SOP is revised by adding the impact assessment of the nonconformance observed and timelines for implementation of CA are made stringent as per MDSAP and ENISO 13485:2016.' }
    ],
    incidents: [
      { period: 'Jun-Nov 25', process: 18, gdp: 39, qa: 9 },
      { period: 'Dec-May 26', process: 22, gdp: 21, qa: 10 }
    ]
  }
];

