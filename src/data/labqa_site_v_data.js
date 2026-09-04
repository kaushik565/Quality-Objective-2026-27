export const SITE5_LABQA_DATA = {
  arVerification: [
    { name: 'Incoming Pkg', approved: 1289, rejected: 11 },
    { name: 'Stability Rep', approved: 917, rejected: 0 },
    { name: 'Versafill', approved: 246, rejected: 0 },
    { name: 'Biodot', approved: 270, rejected: 0 },
    { name: 'Raw Material', approved: 49, rejected: 0 },
    { name: 'Primers/Probes', approved: 2664, rejected: 41 },
    { name: 'Inc Cartridge', approved: 566, rejected: 0 },
    { name: 'Blank Chip', approved: 486, rejected: 2 },
    { name: 'Truenat Inproc', approved: 911, rejected: 11 },
    { name: 'Truenat Finish', approved: 448, rejected: 0 },
    { name: 'Trueprep Inproc', approved: 356, rejected: 0 },
    { name: 'Trueprep Finish', approved: 455, rejected: 0 },
    { name: 'Logbooks', approved: 420, rejected: 0 }
  ],
  calibration: [
    { name: 'QA Tech RGP', value: 1 },
    { name: 'Simplisol RGP', value: 1 },
    { name: 'QA Tech Onsite', value: 29 },
    { name: 'Simplisol Onsite', value: 18 },
    { name: 'Eppendorf', value: 22 }
  ],
  oosClosure: [
    { month: 'Jan', incoming: 15, overall: 22.7 },
    { month: 'Feb', incoming: 7.5, overall: 17.3 },
    { month: 'Mar', incoming: 7.4, overall: 16.0 },
    { month: 'Apr', incoming: 2.0, overall: 9.4 },
    { month: 'May', incoming: 10.3, overall: 15.6 }
  ],
  // Documents validated by Lab QA (Dec 2025 - May 2026)
  documentsReviewed: {
    period: 'Dec 2025 - May 2026',
    reviewedBy: 'Lab QA',
    items: [
      { key: 'SOP', label: 'SOPs', value: 19, color: '#6366f1' },
      { key: 'STP', label: 'STPs', value: 61, color: '#a855f7' },
      { key: 'SPEC', label: 'Specs', value: 337, color: '#0ea5e9' },
      { key: 'FM', label: 'Formats (FM)', value: 79, color: '#f59e0b' },
      { key: 'MVP', label: 'MVPs', value: 9, color: '#10b981' }
    ]
  },
  vendorRejections: [
    { vendor: 'Biosearch Tech', count: 40 },
    { vendor: 'IDT', count: 2 },
    { vendor: 'Thermofisher', count: 1 },
    { vendor: 'Sri Ram Rubber', count: 6 },
    { vendor: 'Global Enterprises', count: 6 },
    { vendor: 'Antariksha', count: 2 },
    { vendor: 'Theme Park Design', count: 2 }
  ].sort((a, b) => b.count - a.count),
  
  // A.R Verification data Jan - June 2026
  reportsData: {
    total: 9143,
    approved: 9077,
    rejected: 66,
    items: [
      { label: 'Incoming Packaging', approved: 1289, rejected: 11 },
      { label: 'Stability Report', approved: 917, rejected: 0 },
      { label: 'Versafill', approved: 246, rejected: 0 },
      { label: 'Biodot dispensing', approved: 270, rejected: 0 },
      { label: 'Raw Material', approved: 49, rejected: 0 },
      { label: 'Primers/Probes', approved: 2664, rejected: 42 },
      { label: 'Incoming Cartridge', approved: 566, rejected: 0 },
      { label: 'Truenat Blank Chip', approved: 486, rejected: 2 },
      { label: 'Truenat Inprocess', approved: 911, rejected: 11 },
      { label: 'Truenat Finished kit', approved: 448, rejected: 0 },
      { label: 'Trueprep Inprocess', approved: 356, rejected: 0 },
      { label: 'Trueprep Finished kit', approved: 455, rejected: 0 },
      { label: 'Logbooks', approved: 420, rejected: 0 }
    ]
  },

  // Collaboration Meetings (Jan - May 2026)
  meetings: [
    {
      dept: 'QC-QA',
      date: '10/02/2026',
      count: 1,
      improvement: 'Regarding Packaging Material OOS: previously the material was rejected in SAP after the QA conclusion. Post discussion, it was suggested that once the OOS number is allotted, the material can be rejected in SAP without waiting until the QA conclusion.'
    },
    {
      dept: 'QA-MG',
      date: '24/03/2026',
      count: 1,
      improvement: 'Regarding allotment of Finished Kit Lot number - henceforth the lot number shall be allotted by QA.'
    },
    {
      dept: 'QC-QA',
      date: '15/05/2026',
      count: 1,
      improvement: 'Regarding usage of one chip-lot type for Incoming Cartridge, Trueprep in-process and FK for the performance testing parameter: as the std curve values of different chip lots may vary, the Ct value and Log values may be affected.'
    }
  ],
  // QC Observations - Site V 2026 (Jan-May)
  observationMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  observationsList: [
    {
        "month": "Jan",
        "text": "RRD and RNA Results were mix documented",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Jan",
        "text": "Wrong Inspection number was written",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Jan",
        "text": "The log value typed as NA",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Jan",
        "text": "Received by was not done on sampling",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Jan",
        "text": "Batch size mention wrong in AR report",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Jan",
        "text": "Elute ID were documented wrongly",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Jan",
        "text": "Chip lot no , dye leak test date and result were documented wrong .",
        "category": "Process",
        "type": "major"
    },
    {
        "month": "Jan",
        "text": "Mfg was written wrong",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Jan",
        "text": "dye leak test date was not written .",
        "category": "Process",
        "type": "major"
    },
    {
        "month": "Feb",
        "text": "All the equipment IDs were faded and Tm values were wrongly typed in the document",
        "category": "Calibration",
        "type": "major"
    },
    {
        "month": "Feb",
        "text": "Calibration due dates were typed wrong , Pipette ID was typed as 618 which does not exist in the QC already discontinued",
        "category": "Calibration",
        "type": "major"
    },
    {
        "month": "Feb",
        "text": "Temperature was found to be out of range for 50 mins and was approved as per SOP/QI/070",
        "category": "Temp",
        "type": "major"
    },
    {
        "month": "Feb",
        "text": "Thermal prints had elute ID which was wrongly typed for sputum sample, plasma ID was typed",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Feb",
        "text": "Thermal prints had incorrect lot number for as 339UAC-159UA as M was missing",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Feb",
        "text": "Truelab device calibration was writen wrong and operator name were not change as shift changes",
        "category": "Calibration",
        "type": "major"
    },
    {
        "month": "Feb",
        "text": "Thermal prints had CB lot number was mentioned incorrect as B136 instead of B136TB",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Mar",
        "text": "For positive HCV plasma sample the IC values were wrongly documented, Elute ID was wrongly typed in the thermal print",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Mar",
        "text": "Tube lot number was typed wrong in the A.R.",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Mar",
        "text": "CE mark was writen as present",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Mar",
        "text": "For Domestic lot MRP typed as NA",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Mar",
        "text": "mix-up of thermal prints of PL 2481 in PL 2480 document",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Mar",
        "text": "The 32 Nos are leak performed but in document metioned as 50 Nos",
        "category": "Process",
        "type": "major"
    },
    {
        "month": "Mar",
        "text": "Dispense test data was not documented in the A.R",
        "category": "Process",
        "type": "major"
    },
    {
        "month": "Apr",
        "text": "HPLC had incorrect label",
        "category": "Calibration",
        "type": "major"
    },
    {
        "month": "Apr",
        "text": "some of Trueprep device had incorrect calibration label",
        "category": "Calibration",
        "type": "major"
    },
    {
        "month": "Apr",
        "text": "During control kit verification for DAF process 03 lots were not physically present and the same was kept on hold...",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "Apr",
        "text": "Defrosting of deep freezer was missed",
        "category": "Temp",
        "type": "major"
    },
    {
        "month": "May",
        "text": "Date was wrong also in the logbook it was mentioned wrong and so many GDP errors were found in AR",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "It was observed that the sample type was wrong for shigella instead of stool ,it was sputum",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "It was observed that release was wrong for post lyo also one of thermal print was wrong for sample ID VDN -1945 it was High INH resistance detected. also the sample panel was not updated.",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "It was observed that the expiry date was wrong on the thermal prints",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "PCR efficiency calculation was wrong",
        "category": "Process",
        "type": "major"
    },
    {
        "month": "May",
        "text": "On sampling advice manufacturing and expiry date was wrongly entered of chip lot no. 213HDLW as 2024-04 and 2028-03 instead of 2024-03 and 2028-02",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "In Negative Sputum ,Name was typed as CB B002TB 2386 whereas it should be CB B002TP 2386 on 03 devices",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "A.R inspection lot number was wrong in all the thermal prints it was 40000033428 instead of 40000034428",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "Document had incorrect date as 21/05/2023 instead of 21/05/2025",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "On Checklist and Calculation sheet of Incoming Material of Blank chip , Sampled material and Sampling Advice recived by Name/Sign/Date was not done",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "Test date was wrong on the thermal prints it was of 22 May 2025 while the sampling was received on 23/05/2025 due to device rectum.",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "for the NTC sample VDN-1874 one chip detects the control",
        "category": "Process",
        "type": "major"
    },
    {
        "month": "May",
        "text": "Received by sign and date was pending on Sampling Advice",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "Sample type was incorrectly recorded on the thermal printout as Sputum instead of Throat Swab",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "ID was incorrectly recorded on thermal print as VDN-1916 instead of VDN-1961",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "Temperature od Elute storage room was out of range which should be 18-30 due to malfunction of AC",
        "category": "Temp",
        "type": "major"
    },
    {
        "month": "May",
        "text": "The desiccator of the Microprocessor Dye Leak Apparatus was observed with an incorrect date label for Methylene Blue Solution (Label No. LB QA 094-00). Upon further investigation, it was found that two labels were affixed on the desiccator. As per the procedure, the label is required to be changed weekly after cleaning the desiccator and filling it with freshly prepared Methylene Blue Solution.",
        "category": "Calibration",
        "type": "major"
    },
    {
        "month": "May",
        "text": "Some of Trueprep and Truenat COAs are not having address stamp",
        "category": "Documentation",
        "type": "minor"
    },
    {
        "month": "May",
        "text": "Biodot testing was carried at 595nm instead of 492nm for MG coat dispensing",
        "category": "Process",
        "type": "major"
    }
],
logbooks: [
    { month: 'Dec', verified: 420, errors: 12 },
    { month: 'Jan', verified: 480, errors: 8 },
    { month: 'Feb', verified: 510, errors: 15 },
    { month: 'Mar', verified: 490, errors: 6 },
    { month: 'Apr', verified: 530, errors: 11 },
    { month: 'May', verified: 610, errors: 5 }
]
};