export const siteData = [
    {
      id: "SITE-I",
      color: "from-amber-400 to-orange-500",
      accent: "text-amber-600",
      bgSoft: "bg-amber-50",
      avg: "21%",
      lastScore: "56",
      nowScore: "44",
      calcData: { volImprovement: "+45.3%", speedImprovement: "+21.0%" },
      metrics: [
        { label: "CC", value: "11%", isNegative: false, calcData: { target: 60, prevVolTotal: 250, nowVolTotal: 192, prevDays: "63.89", nowDays: "56.62", speedImprovement: "11%", prevAdherence: "NA", nowAdherence: "NA", result: "11%" } },
        { label: "OOS", value: "16%", isNegative: false, calcData: { target: 30, prevVolTotal: 119, nowVolTotal: 120, prevDays: "22.3", nowDays: "18.84", speedImprovement: "16%", prevAdherence: "NA", nowAdherence: "NA", result: "16%" } },
        { label: "CA", value: "45%", isNegative: false, calcData: { target: "NA", prevVolTotal: 53, nowVolTotal: 59, prevDays: "85.08", nowDays: "47.19", speedImprovement: "45%", prevAdherence: "NA", nowAdherence: "NA", result: "45%" } },
        { label: "PA", value: "51%", isNegative: false, calcData: { target: "NA", prevVolTotal: 24, nowVolTotal: 22, prevDays: "123.07", nowDays: "60.33", speedImprovement: "51%", prevAdherence: "NA", nowAdherence: "NA", result: "51%" } },
        { label: "IR", value: "29%", isNegative: false, calcData: { target: 30, prevVolTotal: 132, nowVolTotal: 127, prevDays: "30.6", nowDays: "21.66", speedImprovement: "29%", prevAdherence: "NA", nowAdherence: "NA", result: "29%" } },
        { label: "INV", value: "7%", isNegative: false, calcData: { target: 7, prevVolTotal: 132, nowVolTotal: 127, prevDays: "5.13", nowDays: "4.75", speedImprovement: "7%", prevAdherence: "NA", nowAdherence: "NA", result: "7%" } },
        { label: "DEV", value: "-42%", isNegative: true, calcData: { target: 60, prevVolTotal: 14, nowVolTotal: 12, prevDays: "52.29", nowDays: "74.38", speedImprovement: "-42%", prevAdherence: "NA", nowAdherence: "NA", result: "-42%" } },
        { label: "EXT", value: "-5%", isNegative: true, calcData: { target: "NA", prevVolTotal: 88, nowVolTotal: 102, prevDays: "57.86", nowDays: "60.95", speedImprovement: "-5%", prevAdherence: "NA", nowAdherence: "NA", result: "-5%" } },
        { label: "MAST", value: "124%", isNegative: false, calcData: { target: "NA", prevVolTotal: 258, nowVolTotal: 577, prevDays: "NA", nowDays: "NA", speedImprovement: "124%", prevAdherence: "NA", nowAdherence: "NA", result: "124%" } }
      ],
      qualityEvents: {
        deviations: { open: 14, closed: 112, pending: 5, overdue: 2 },
        capa: { open: 8, closed: 45, pending: 3, overdue: 0 },
        changeControls: { open: 21, closed: 88, pending: 7, overdue: 4 },
        oos: { open: 4, closed: 29, pending: 1, overdue: 1 }
      },
      mastering: {
        artworks: { total: 342, approved: 310, inReview: 25, rejected: 7, avgTime: "4.2 days" },
        documents: { total: 1205, approved: 1150, inReview: 45, rejected: 10, avgTime: "2.1 days" }
      },
      masterData: {
        validationReportsVerified: 140,
        validationReports: { completed: 140, ongoing: 50 },
        documentsLastTotal: 258,
        documents: [
          { dept: "MG", SOP: 91, STP: 0, FM: 88, LT: 6, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "PK", SOP: 15, STP: 0, FM: 8, LT: 2, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "QC", SOP: 9, STP: 7, FM: 53, LT: 6, SPEC: 68, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "ST", SOP: 1, STP: 0, FM: 14, LT: 0, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "IT", SOP: 2, STP: 0, FM: 13, LT: 1, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "MN", SOP: 5, STP: 0, FM: 2, LT: 0, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 1, ARTWORK: 0 },
          { dept: "DI", SOP: 0, STP: 0, FM: 0, LT: 0, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "PU", SOP: 2, STP: 0, FM: 5, LT: 0, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "BD", SOP: 11, STP: 0, FM: 37, LT: 0, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "HR", SOP: 6, STP: 0, FM: 9, LT: 3, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "DP", SOP: 9, STP: 0, FM: 2, LT: 1, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "QA", SOP: 6, STP: 0, FM: 8, LT: 0, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "MA", SOP: 0, STP: 0, FM: 0, LT: 0, SPEC: 0, MVP: 0, QM: 1, SMF: 1, OSEP: 0, ARTWORK: 0 },
          { dept: "IS", SOP: 2, STP: 0, FM: 3, LT: 0, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "IN", SOP: 6, STP: 7, FM: 28, LT: 38, SPEC: 0, MVP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 }
        ]
      },
      extensionsAnalysis: {
        presentPeriod: [
          { event: "CC", total: 84, depts: { QC: 12, QA: 3, PU: 1, PK: 1, MN: 6, MG: 25, IT: 3, IS: 1, HR: 10, DP: 2, DI: 3, BD: 15, ST: 2 } },
          { event: "Deviation", total: 8, depts: { QC: 1, PU: 1, PK: 4, MG: 1, IS: 1 } },
          { event: "OOS", total: 9, depts: { QA: 9 } },
          { event: "Complaint", total: 1, depts: { QA: 1 } }
        ],
        lastPeriod: [
          { event: "CC", total: 70, depts: { ST: 2, QC: 11, QA: 5, PU: 3, PK: 1, MN: 1, IS: 2, HR: 13, DP: 2, DI: 1, BD: 5, MG: 24 } },
          { event: "Deviation", total: 6, depts: { ST: 1, PK: 1, IS: 1, MG: 3 } },
          { event: "OOS", total: 9, depts: { QC: 9 } },
          { event: "Complaint", total: 3, depts: { QA: 3 } }
        ]
      }
    },
    {
      id: "SITE-III",
      color: "from-purple-500 to-indigo-500",
      accent: "text-purple-600",
      bgSoft: "bg-purple-50",
      avg: "23%",
      lastScore: "23",
      nowScore: "38",
      calcData: { 
        prevVolEq: "139 + 37 + 40 + 29 + 30 + 30 + 7 + 42", prevVolTotal: "354",
        nowVolEq: "94 + 25 + 31 + 18 + 35 + 35 + 9 + 35", nowVolTotal: "282", volImprovement: "+20.3%",
        prevEquation: "CC (35.07) + OOS (12.83) + CA (54.12) + PA (63.03) + IR (19.93) + INV (6.5) + DEV (89.57) + EXT (56.42)", prevTotal: "337.47", prevDivisor: 8, prevDays: "42.18",
        nowEquation: "CC (41.94) + OOS (22.77) + CA (35.77) + PA (38.7) + IR (26.48) + INV (4.65) + DEV (29) + EXT (23.88)", nowTotal: "223.19", nowDivisor: 8, nowDays: "27.90", speedImprovement: "+33.8%",
        result: "+27%" 
      },
      metrics: [
        { label: "CC", value: "30%", isNegative: true, calcData: { target: 60, prevExt: 14, prevVolTotal: 139, prevExtRate: "10%", nowExt: 23, nowVolTotal: 94, nowExtRate: "25%", extImprovement: "-14%", prevEquation: "Average Closure Rate", prevDays: "35.07", nowEquation: "Average Closure Rate", nowDays: "41.94", speedImprovement: "-20%", prevAdherence: "42%", nowAdherence: "30%", result: "30%" } },
        { label: "OOS", value: "62%", isNegative: true, calcData: { target: 60, prevExt: 1, prevVolTotal: 37, prevExtRate: "3%", nowExt: 0, nowVolTotal: 25, nowExtRate: "0%", extImprovement: "3%", prevEquation: "Average Closure Rate", prevDays: "12.83", nowEquation: "Average Closure Rate", nowDays: "22.77", speedImprovement: "-77%", prevAdherence: "79%", nowAdherence: "62%", result: "62%" } },
        { label: "CA", value: "34%", isNegative: false, calcData: { target: "NA", prevExt: 0, prevVolTotal: 40, prevExtRate: "0%", nowExt: 0, nowVolTotal: 31, nowExtRate: "0%", extImprovement: "0%", prevEquation: "Average Closure Rate", prevDays: "54.12", nowEquation: "Average Closure Rate", nowDays: "35.77", speedImprovement: "34%", prevAdherence: "NA", nowAdherence: "NA", result: "34%" } },
        { label: "PA", value: "39%", isNegative: false, calcData: { target: "NA", prevExt: 0, prevVolTotal: 29, prevExtRate: "0%", nowExt: 0, nowVolTotal: 18, nowExtRate: "0%", extImprovement: "0%", prevEquation: "Average Closure Rate", prevDays: "63.03", nowEquation: "Average Closure Rate", nowDays: "38.7", speedImprovement: "39%", prevAdherence: "NA", nowAdherence: "NA", result: "39%" } },
        { label: "IR", value: "12%", isNegative: true, calcData: { target: 30, prevExt: 0, prevVolTotal: 30, prevExtRate: "0%", nowExt: 0, nowVolTotal: 35, nowExtRate: "0%", extImprovement: "0%", prevEquation: "Average Closure Rate", prevDays: "19.93", nowEquation: "Average Closure Rate", nowDays: "26.48", speedImprovement: "-33%", prevAdherence: "34%", nowAdherence: "12%", result: "12%" } },
        { label: "INV", value: "34%", isNegative: false, calcData: { target: 7, prevExt: 0, prevVolTotal: 30, prevExtRate: "0%", nowExt: 0, nowVolTotal: 35, nowExtRate: "0%", extImprovement: "0%", prevEquation: "Average Closure Rate", prevDays: "6.5", nowEquation: "Average Closure Rate", nowDays: "4.65", speedImprovement: "28%", prevAdherence: "7%", nowAdherence: "34%", result: "34%" } },
        { label: "DEV", value: "52%", isNegative: false, calcData: { target: 60, prevExt: 16, prevVolTotal: 7, prevExtRate: "100%", nowExt: 2, nowVolTotal: 9, nowExtRate: "22%", extImprovement: "78%", prevEquation: "Average Closure Rate", prevDays: "89.57", nowEquation: "Average Closure Rate", nowDays: "29", speedImprovement: "68%", prevAdherence: "-49%", nowAdherence: "52%", result: "52%" } },
        { label: "EXT", value: "58%", isNegative: false, calcData: { target: "NA", prevExt: "NA", prevVolTotal: 42, prevExtRate: "NA", nowExt: "NA", nowVolTotal: 35, nowExtRate: "NA", extImprovement: "NA", prevEquation: "Average Closure Rate", prevDays: "56.42", nowEquation: "Average Closure Rate", nowDays: "23.88", speedImprovement: "58%", prevAdherence: "NA", nowAdherence: "NA", result: "58%" } },
        { label: "MAST", value: "42%", isNegative: false, calcData: { target: "NA", prevVolTotal: 227, nowVolTotal: 323, prevDays: "NA", nowDays: "NA", speedImprovement: "42%", prevAdherence: "NA", nowAdherence: "NA", result: "42%" } }
      ],
      qualityEvents: {
        deviations: { open: 24, closed: 180, pending: 12, overdue: 5 },
        capa: { open: 15, closed: 72, pending: 8, overdue: 2 },
        changeControls: { open: 45, closed: 156, pending: 18, overdue: 7 },
        oos: { open: 7, closed: 41, pending: 2, overdue: 1 }
      },
      mastering: {
        artworks: { total: 512, approved: 480, inReview: 28, rejected: 4, avgTime: "3.5 days" },
        documents: { total: 2450, approved: 2310, inReview: 120, rejected: 20, avgTime: "2.4 days" }
      },
      masterData: {
        validationReportsVerified: 218,
        validationReportsBreakdown: [
          { type: 'EV', value: 197 },
          { type: 'RM', value: 16 },
          { type: 'PR', value: 4 },
          { type: 'FQ', value: 1 }
        ],
        documentsLastTotal: 227,
        documents: [
          { dept: "MG - CA", SOP: 24, FM: 31, STP: 0, SPEC: 0, MVP: 0 },
          { dept: "MG - MD", SOP: 19, FM: 46, STP: 3, SPEC: 0, MVP: 0 },
          { dept: "DI", SOP: 0, FM: 57, STP: 0, SPEC: 0, MVP: 34 },
          { dept: "QC", SOP: 8, FM: 15, STP: 11, SPEC: 33, MVP: 0 },
          { dept: "QA", SOP: 7, FM: 14, STP: 0, SPEC: 0, MVP: 0 },
          { dept: "ST", SOP: 1, FM: 0, STP: 0, SPEC: 0, MVP: 0 },
          { dept: "MN", SOP: 2, FM: 9, STP: 0, SPEC: 0, MVP: 0 },
          { dept: "IT", SOP: 0, FM: 0, STP: 0, SPEC: 0, MVP: 0 },
          { dept: "HR", SOP: 4, FM: 5, STP: 0, SPEC: 0, MVP: 0 },
          { dept: "PU", SOP: 0, FM: 0, STP: 0, SPEC: 0, MVP: 0 },
          { dept: "Logistics", SOP: 0, FM: 0, STP: 0, SPEC: 0, MVP: 0 }
        ]
      },
      extensionsAnalysis: {
        presentPeriod: [
          { event: "CC", total: 23, depts: { QC: 2, QA: 10, "MG(MD)": 5, PU: 5, LG: 1 } },
          { event: "DAF", total: 1, depts: { "MG(MD)": 1 } },
          { event: "FD", total: 3, depts: { QC: 3 } },
          { event: "VR", total: 4, depts: { DI: 4 } },
          { event: "Deviation", total: 2, depts: { PU: 1, MD: 1 } },
          { event: "OOS", total: 0, depts: {} },
          { event: "DI", total: 0, depts: {} }
        ],
        lastPeriod: [
          { event: "CC", total: 14, depts: { MG: 3, ST: 2, PU: 5, QA: 1, QC: 1, DI: 1, MN: 1 } },
          { event: "DAF", total: 1, depts: { MG: 1 } },
          { event: "FD", total: 8, depts: { QC: 8 } },
          { event: "VR", total: 0, depts: {} },
          { event: "Deviation", total: 16, depts: { MG: 4, PU: 6, QC: 4, ST: 2 } },
          { event: "OOS", total: 1, depts: { QC: 1 } },
          { event: "DI", total: 2, depts: { DI: 2 } }
        ]
      }
    },
    {
      id: "SITE-V",
      color: "from-sky-400 to-blue-500",
      accent: "text-sky-600",
      bgSoft: "bg-sky-50",
      avg: "4%",
      lastScore: "38",
      nowScore: "36",
      calcData: { 
        volImprovement: "+5.0%",
        speedImprovement: "+2.0%",
      },
      metrics: [
        { label: "CC", value: "23%", isNegative: false, calcData: { target: 60, prevVolTotal: 178, nowVolTotal: 256, prevDays: "55.70", nowDays: "46.13", prevAdherence: "7%", nowAdherence: "23%" } },
        { label: "OOS", value: "29%", isNegative: false, calcData: { target: 30, prevVolTotal: 109, nowVolTotal: 57, prevDays: "24.3", nowDays: "21.3", prevAdherence: "19%", nowAdherence: "29%" } },
        { label: "CA", value: "21%", isNegative: false, calcData: { target: "NA", prevVolTotal: 33, nowVolTotal: 27, prevDays: "73", nowDays: "55", prevAdherence: "NA", nowAdherence: "NA" } },
        { label: "PA", value: "26%", isNegative: false, calcData: { target: "NA", prevVolTotal: 28, nowVolTotal: 14, prevDays: "49.81", nowDays: "48.86", prevAdherence: "NA", nowAdherence: "NA" } },
        { label: "IR", value: "38%", isNegative: false, calcData: { target: 30, prevVolTotal: 96, nowVolTotal: 68, prevDays: "19", nowDays: "18.69", prevAdherence: "37%", nowAdherence: "38%" } },
        { label: "INV", value: "50%", isNegative: true, calcData: { target: 7, prevVolTotal: 96, nowVolTotal: 68, prevDays: "2.77", nowDays: "3.51", prevAdherence: "60%", nowAdherence: "50%" } },
        { label: "DEV", value: "5%", isNegative: true, calcData: { target: 60, prevVolTotal: 6, nowVolTotal: 5, prevDays: "43.6", nowDays: "57.25", prevAdherence: "27%", nowAdherence: "5%" } },
        { label: "EXT", value: "30%", isNegative: false, calcData: { target: "NA", prevVolTotal: 65, nowVolTotal: 69, prevDays: "65.6", nowDays: "46", prevAdherence: "NA", nowAdherence: "NA" } },
        { label: "MAST", value: "224%", isNegative: false, calcData: { target: "NA", prevVolTotal: 340, nowVolTotal: 1100, prevDays: "NA", nowDays: "NA", speedImprovement: "224%", prevAdherence: "NA", nowAdherence: "NA", result: "224%" } }
      ],
      qualityEvents: {
        deviations: { open: 32, closed: 210, pending: 15, overdue: 8 },
        capa: { open: 18, closed: 85, pending: 6, overdue: 3 },
        changeControls: { open: 56, closed: 212, pending: 22, overdue: 9 },
        oos: { open: 11, closed: 62, pending: 4, overdue: 2 }
      },
      mastering: {
        artworks: { total: 620, approved: 580, inReview: 32, rejected: 8, avgTime: "4.8 days" },
        documents: { total: 3100, approved: 2950, inReview: 110, rejected: 40, avgTime: "3.2 days" }
      },
      masterData: {
        validationReportsVerified: 203,
        validationReports: { completed: 203, ongoing: 65 },
        documentsLastTotal: 340,
        documents: [
          { dept: "MG", SOP: 49, FM: 250, STP: 0, SPEC: 0, MVP: 0, LT: 4, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "PK", SOP: 2, FM: 19, STP: 0, SPEC: 0, MVP: 0, LT: 0, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "QC", SOP: 19, FM: 79, STP: 61, SPEC: 337, MVP: 0, LT: 12, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "ST", SOP: 1, FM: 0, STP: 0, SPEC: 0, MVP: 0, LT: 0, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "IT", SOP: 6, FM: 3, STP: 0, SPEC: 0, MVP: 0, LT: 0, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "MN", SOP: 4, FM: 2, STP: 0, SPEC: 0, MVP: 0, LT: 2, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "DI", SOP: 5, FM: 139, STP: 0, SPEC: 0, MVP: 60, LT: 1, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "PU", SOP: 2, FM: 2, STP: 0, SPEC: 0, MVP: 0, LT: 3, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "BD", SOP: 0, FM: 0, STP: 0, SPEC: 0, MVP: 0, LT: 0, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "HR", SOP: 0, FM: 0, STP: 0, SPEC: 0, MVP: 0, LT: 0, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "DP", SOP: 0, FM: 0, STP: 0, SPEC: 0, MVP: 0, LT: 0, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "QA", SOP: 12, FM: 23, STP: 0, SPEC: 0, MVP: 0, LT: 3, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 },
          { dept: "MA", SOP: 0, FM: 0, STP: 0, SPEC: 0, MVP: 0, LT: 0, VMP: 0, QM: 0, SMF: 0, OSEP: 0, ARTWORK: 0 }
        ],
      },
      extensionsAnalysis: {
        // Present = Dec 25 - May 26 ; Last = Jun 25 - Nov 25 (real department-wise data)
        presentPeriod: [
          { event: "CC", total: 66, depts: { ST: 1, QC: 7, QA: 8, MN: 5, MG: 13, IT: 3, HR: 1, DI: 28 } },
          { event: "COMPLAINT", total: 1, depts: { QA: 1 } },
          { event: "OOS", total: 0, depts: {} },
          { event: "Dev", total: 0, depts: {} },
          { event: "VR", total: 1, depts: { DI: 1 } }
        ],
        lastPeriod: [
          { event: "CC", total: 54, depts: { ST: 2, QC: 6, QA: 9, PK: 1, MN: 3, IT: 1, HR: 1, DP: 2, DI: 15, MG: 14 } },
          { event: "COMPLAINT", total: 1, depts: { QA: 1 } },
          { event: "OOS", total: 6, depts: { QA: 2, MG: 4 } },
          { event: "Dev", total: 1, depts: { PK: 1 } },
          { event: "VR", total: 3, depts: { DI: 3 } }
        ]
      }
    }
  ];
