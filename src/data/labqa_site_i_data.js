export const SITE1_LABQA_DATA = {
  logbooks: [
    { month: 'Jan', pcr: 230, extraction: 134, instrumentation: 144, stability: 22 },
    { month: 'Feb', pcr: 230, extraction: 134, instrumentation: 144, stability: 22 },
    { month: 'Mar', pcr: 230, extraction: 134, instrumentation: 144, stability: 22 },
    { month: 'Apr', pcr: 230, extraction: 134, instrumentation: 144, stability: 22 },
    { month: 'May', pcr: 230, extraction: 134, instrumentation: 144, stability: 22 },
  ],
  calibration: [
    { month: 'Jan', internal: 18, external: 28 },
    { month: 'Feb', internal: 61, external: 18 },
    { month: 'Mar', internal: 24, external: 17 },
    { month: 'Apr', internal: 9, external: 18 },
    { month: 'May', internal: 23, external: 15 },
  ],
  oosClosure: [
    { month: 'Jan', avgDays: 5.0 },
    { month: 'Feb', avgDays: 3.8 },
    { month: 'Mar', avgDays: 4.7 },
    { month: 'Apr', avgDays: 0 },
    { month: 'May', avgDays: 3.0 },
    { month: 'Jun', avgDays: 2.0 },
  ],
  documents: {
    incoming: { total: 2879, oos: 271 },
    trueprep: { total: 160, oos: 2 },
    truenat: { total: 641, oos: 45 },
    controls: { total: 20, oos: 0 }
  },
  // STP/SOP vs Observation review (Site I)
  stpReview: { total: 75, reviewed: 4, complies: 2, notComplies: 2 },
  // Vendor rejection data (incoming material). Some vendors only have consignment counts so far.
  vendorRejections: [
    { vendor: 'LGC Biosearch Technologies', short: 'LGC Biosearch', consignments: 13, inspected: 3012, approved: 848, rejected: 261, ongoing: 1990, sampleSize: '100% / 50uL', rejectionPct: 8.66, reason: 'Double / light bands during PAGE run; concentration < 70%' },
    { vendor: 'IDT Integrated DNA Technologies', short: 'IDT', consignments: 14, inspected: null, approved: null, rejected: null, ongoing: null, sampleSize: null, rejectionPct: null, reason: null },
    { vendor: 'Thermofisher', short: 'Thermofisher', consignments: 5, inspected: 5, approved: 0, rejected: 2, ongoing: 3, sampleSize: '100% / 8uL', rejectionPct: 40, reason: 'Not in acceptance range of 1.66 Ct vs sample test panel' },
    { vendor: 'Global Enterprises', short: 'Global Ent.', consignments: 269, inspected: 946, approved: 936, rejected: 10, ongoing: null, sampleSize: '100%, GII reduced, S4 Normal Inspection', rejectionPct: 1.05, reason: 'Physical / cosmetic defects' },
    { vendor: 'Antariksha', short: 'Antariksha', consignments: 31, inspected: null, approved: null, rejected: null, ongoing: null, sampleSize: null, rejectionPct: null, reason: null },
    { vendor: 'Sri Ram Rubbers', short: 'Sri Ram', consignments: 59, inspected: null, approved: null, rejected: null, ongoing: null, sampleSize: null, rejectionPct: null, reason: null },
    { vendor: 'Goa Industrial Packaging', short: 'Goa Ind. Pkg', consignments: 89, inspected: null, approved: null, rejected: null, ongoing: null, sampleSize: null, rejectionPct: null, reason: null },
    { vendor: 'Danlaw', short: 'Danlaw', consignments: 138, inspected: null, approved: null, rejected: null, ongoing: null, sampleSize: null, rejectionPct: null, reason: null },
  ],
  observations: [
    {
      id: "OBS-01",
      area: "FM/QT/203-03 is not in compliance with specification",
      criticality: "Major",
      details: "During verification, it was observed that the format (FM/QT/203-03) was not in compliance with the specification. The comparison of the negative sample against the sample test panel shall be less than equal to 1.66ct.",
      incident: "Yes",
      status: "Open",
      remarks: "Change Control has been initiated CC26/V/QC/224. Still Under Draft."
    },
    {
      id: "OBS-02",
      area: "Weighing balance SOP dictates weighing balance shall be kept on 5 min before use",
      criticality: "Minor",
      details: "A weighing balance should typically remain powered 1 hour before use. This allows the internal electrical components to reach thermal equilibrium, helping to prevent measurement drift and ensure stable, consistent readings.",
      incident: "No",
      status: "Closed",
      remarks: "QC personnel are asked to not switch off the weighing balance. During next revision the time shall be changed."
    },
    {
      id: "OBS-03",
      area: "MVP26/PR/007 Final Truenat MTB Ultima MVP review",
      criticality: "Minor",
      details: "MVP included format FM/QT/206 which is for duplex target assay but MTB ultima has duplex control and not target and QC doesnt have format for duplex control.",
      incident: "No",
      status: "Closed",
      remarks: "Validation team shall introduce a new format to record the data."
    },
    {
      id: "OBS-04",
      area: "Temperature was not reported during 13:00 hrs to 13:30 hrs",
      criticality: "Minor",
      details: "Responsible person missed to log entries at the mentioned time lot.",
      incident: "Yes",
      status: "Closed",
      remarks: "Training provided."
    },
    {
      id: "OBS-05",
      area: "Trueprep COA MSPT318 had wrong date and wrong ID",
      criticality: "Minor",
      details: "The COA was typed with date of analysis and not of release date and ID had number of MSPT317.",
      incident: "No",
      status: "Closed",
      remarks: "Yes."
    }
  ]
};
