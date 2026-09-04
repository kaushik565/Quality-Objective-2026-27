export const objectivesData = [
  {
    id: '05',
    title: 'Quality Objective No. 5',
    desc: 'To Reduce the number of In-process and Final product defects through stringent IPQA, Lab QA verification and proactive defect prevention.',
    startDate: '01-06-2026', endDate: '30-03-2027', priority: 'MEDIUM', totalProgress: '30%',
    qis: [
      {
        id: 'QI 1', name: 'Gap Assessment', allotted: '20%',
        events: [
          { id: 1, title: 'Identifying process risk, which can cause more defect through process risk.', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '01/06/26', endProposed: '30/07/26', status: 'IN PROCESS (80%) - With Evidence', remark: 'Its a continous process' },
          { id: 2, title: 'List of Activities prepared based on the identified criticality of the process', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '01/08/26', endProposed: '15/08/26', status: 'IN PROCESS (80%) - With Evidence', remark: 'Target dates and status updated' },
        ],
      },
      {
        id: 'QI 2', name: 'Training and Evaluation', allotted: '30%',
        events: [
          { id: 1, title: 'Training Planner and Training need identification', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '15/08/26', endProposed: '30/08/26', status: 'NOT INITIATED (10%)' },
          { id: 2, title: 'Training of IPQA/LabQA on defects identification', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '01/09/26', endProposed: '15/09/26', status: 'NOT INITIATED (50%)' },
          { id: 3, title: 'Evaluation of competence post training', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '16/09/26', endProposed: '16/10/26', status: 'NOT INITIATED (0%)' },
        ],
      },
      {
        id: 'QI 3', name: 'Implementation', allotted: '30%',
        events: [
          { id: 1, title: 'Verification frequency increased in high- risk processes', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '17/10/26', endProposed: '17/11/26', status: 'IN PROCESS (30%) - With Evidence', remark: 'It was already in progress' },
          { id: 2, title: 'Real time containment and cause analysis before batch processing', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '17/10/26', endProposed: '17/11/26', status: 'IN PROCESS (0%) - With Evidence' },
          { id: 3, title: 'Regular upgradation of new risk identified during the process in the risk file', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '17/10/26', endProposed: '17/11/26', status: 'IN PROCESS (30%) - With Evidence', remark: 'It was already in progress' },
        ],
      },
      {
        id: 'QI 4', name: 'Effectiveness', allotted: '20%',
        events: [
          { id: 1, title: '% Identification and detection of incoming in-process and finished goods defect rate', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '18/11/26', endProposed: '30/12/26', status: 'INITIATION (10%)' },
          { id: 2, title: '% Reduction in rework /reprocessing rate', taskPercent: 10, responsibility: 'IPQA and LabQA team', startDate: '18/11/26', endProposed: '30/12/26', status: 'INITIATION (10%)' },
        ],
      },
    ],
  },
  {
    id: '06',
    title: 'Quality Objective No. 6',
    desc: 'Digitalization of Quality Management system to improve efficiency, data integrity, traceability, real-time monitoring and compliance with regulatory requirements.',
    startDate: '14-01-2026', endDate: '31-12-2026', priority: 'MEDIUM', totalProgress: '20%',
    qis: [
      {
        id: 'QI 1', name: 'Document and Training module', allotted: '17%',
        events: [
          { id: 1, title: 'Discovery and definition', taskPercent: 2, responsibility: 'QA Team', startDate: '14/01/26', endProposed: '18/02/26', status: 'COMPLETED (100%)', remark: 'Virtual training and demonstration' },
          { id: 2, title: 'Configuration and development', taskPercent: 2, responsibility: 'QA Team', startDate: '20/02/26', endProposed: '29/06/26', status: 'IN PROCESS (50%) - With Evidence', remark: 'Sent workbook from molbio to mastercontrol' },
          { id: 3, title: 'Validate', taskPercent: 4, responsibility: 'QA Team', startDate: '01/05/26', endProposed: '13/07/26', status: 'IN PROCESS (50%) - With Evidence', remark: 'Validation done from molbio side and Mastercontrol working on the development of VxT testing.' },
          { id: 4, title: 'Deploy and data migration', taskPercent: 4, responsibility: 'QA Team', startDate: '13/07/26', endProposed: '20/07/26', status: 'IN PROCESS (50%) - With Evidence', remark: 'Sent workbook from molbio to mastercontrol' },
          { id: 5, title: 'SOP finalization and Training', taskPercent: 3, responsibility: 'QA Team', startDate: '08/06/26', endProposed: '20/07/26', status: 'IN PROCESS (33%)', remark: 'Under progress by molbio team' },
          { id: 6, title: 'Go live and Readiness', taskPercent: 2, responsibility: 'QA Team', startDate: '30/07/26', endProposed: '31/07/26', status: 'NOT INITIATED (0%)', remark: 'Yet to start' },
        ],
      },
      {
        id: 'QI 2', name: 'Electronic Batch Manufacturing Records (eBMR)', allotted: '17%',
        events: [
          { id: 1, title: 'Discovery and definition', taskPercent: 2, responsibility: 'QA Team', startDate: '02/03/26', endProposed: '06/05/26', status: 'COMPLETED (100%)', remark: 'Virtual' },
          { id: 2, title: 'Configuration and development', taskPercent: 2, responsibility: 'QA Team', startDate: '06/05/26', endProposed: '16/07/26', status: 'NOT INITIATED (0%)', remark: 'Sent eBRM to mastercontrol team' },
          { id: 3, title: 'Configuration Finalization and UAT', taskPercent: 4, responsibility: 'QA Team', startDate: '21/07/26', endProposed: '24/07/26', status: 'NOT INITIATED (0%)' },
          { id: 4, title: 'Validation', taskPercent: 4, responsibility: 'QA Team', startDate: '28/04/26', endProposed: '30/07/26', status: 'NOT INITIATED (0%)' },
          { id: 5, title: 'Deployment and production release', taskPercent: 3, responsibility: 'QA Team', startDate: '30/07/26', endProposed: '03/08/26', status: 'NOT INITIATED (0%)' },
          { id: 6, title: 'Training and Go live', taskPercent: 2, responsibility: 'QA Team', startDate: '05/08/26', endProposed: '07/08/26', status: 'NOT INITIATED (0%)' },
        ],
      },
      {
        id: 'QI 3', name: 'MX-Project', allotted: '17%',
        events: [
          { id: 1, title: 'Discovery and Requirement definition', taskPercent: 2, responsibility: 'QA Team', startDate: '16/03/26', endProposed: '11/05/26', status: 'COMPLETED (100%)' },
          { id: 2, title: 'Configuration and development', taskPercent: 2, responsibility: 'QA Team', startDate: '11/05/26', endProposed: '18/05/26', status: 'NOT INITIATED (0%)' },
          { id: 3, title: 'Testing and UAT', taskPercent: 4, responsibility: 'QA Team', startDate: '18/05/26', endProposed: '12/06/26', status: 'NOT INITIATED (0%)' },
          { id: 4, title: 'Validation', taskPercent: 4, responsibility: 'QA Team', startDate: '08/06/26', endProposed: '26/06/26', status: 'NOT INITIATED (0%)' },
          { id: 5, title: 'Deployment and production release', taskPercent: 3, responsibility: 'QA Team', startDate: '26/06/26', endProposed: '01/07/26', status: 'NOT INITIATED (0%)' },
          { id: 6, title: 'Training and Go live', taskPercent: 2, responsibility: 'QA Team', startDate: '05/08/26', endProposed: '07/08/26', status: 'NOT INITIATED (0%)' },
        ],
      },
      {
        id: 'QI 4', name: 'AQEM (Advanced Quality Event management)', allotted: '17%',
        events: [
          { id: 1, title: 'Discovery and requirement Definition', taskPercent: 2, responsibility: 'QA Team', startDate: '16/03/26', endProposed: '18/03/26', status: 'COMPLETED (100%)' },
          { id: 2, title: 'Configuration and Development', taskPercent: 2, responsibility: 'QA Team', startDate: '17/03/26', endProposed: '08/07/26', status: 'IN PROCESS (50%) - With Evidence', remark: 'Mastercontrol is doing changes as requested' },
          { id: 3, title: 'Testing and UAT', taskPercent: 4, responsibility: 'QA Team', startDate: '08/07/26', endProposed: '09/07/26', status: 'NOT INITIATED (0%)' },
          { id: 4, title: 'Validation', taskPercent: 4, responsibility: 'QA Team', startDate: '09/07/26', endProposed: '28/07/26', status: 'NOT INITIATED (0%)' },
          { id: 5, title: 'Deployment and production release', taskPercent: 3, responsibility: 'QA Team', startDate: '28/07/26', endProposed: '31/07/26', status: 'NOT INITIATED (0%)' },
          { id: 6, title: 'Training and Go live', taskPercent: 2, responsibility: 'QA Team', startDate: '03/08/26', endProposed: '04/08/26', status: 'NOT INITIATED (0%)' },
        ],
      },
      {
        id: 'QI 5', name: 'E-log book', allotted: '17%',
        events: [
          { id: 1, title: 'Discovery and requirement Definition', taskPercent: 2, responsibility: 'QA Team', startDate: '02/03/26', endProposed: '06/05/26', status: 'COMPLETED (100%)' },
          { id: 2, title: 'Configuration and Development', taskPercent: 2, responsibility: 'QA Team', startDate: '20/05/26', endProposed: '02/07/26', status: 'IN PROCESS (50%)', remark: 'Configration in process by Mastercontrol team' },
          { id: 3, title: 'Testing and UAT', taskPercent: 4, responsibility: 'QA Team', startDate: '09/07/26', endProposed: '22/07/26', status: 'NOT INITIATED (0%)' },
          { id: 4, title: 'Validation', taskPercent: 4, responsibility: 'QA Team', startDate: '29/07/26', endProposed: '31/07/26', status: 'NOT INITIATED (0%)' },
          { id: 5, title: 'Deployment and production release', taskPercent: 3, responsibility: 'QA Team', startDate: '31/07/26', endProposed: '06/08/26', status: 'NOT INITIATED (0%)' },
          { id: 6, title: 'Training and Go live', taskPercent: 2, responsibility: 'QA Team', startDate: '07/08/26', endProposed: '10/08/26', status: 'NOT INITIATED (0%)' },
        ],
      },
      {
        id: 'QI 6', name: 'Audit and Risk assessment', allotted: '15%',
        events: [
          { id: 1, title: 'Discovery and requirement Definition', taskPercent: 2, responsibility: 'QA Team', startDate: '16/03/26', endProposed: '11/05/26', status: 'COMPLETED (100%)' },
          { id: 2, title: 'Configuration and Development', taskPercent: 2, responsibility: 'QA Team', startDate: '11/05/26', endProposed: '18/05/26', status: 'NOT INITIATED (0%)' },
          { id: 3, title: 'Testing and UAT', taskPercent: 3, responsibility: 'QA Team', startDate: '18/05/26', endProposed: '12/06/26', status: 'NOT INITIATED (0%)' },
          { id: 4, title: 'Validation', taskPercent: 3, responsibility: 'QA Team', startDate: '08/06/26', endProposed: '26/06/26', status: 'NOT INITIATED (0%)' },
          { id: 5, title: 'Deployment and production release', taskPercent: 3, responsibility: 'QA Team', startDate: '26/06/26', endProposed: '01/07/26', status: 'NOT INITIATED (0%)' },
          { id: 6, title: 'Training and go live', taskPercent: 2, responsibility: 'QA Team', startDate: '01/07/26', endProposed: '31/12/26', status: 'NOT INITIATED (0%)' },
        ],
      },
    ],
  },
  {
    id: '07',
    title: 'Quality Objective No. 7',
    desc: 'Optimizing QA performance through defined timeline.',
    startDate: '01-01-2027', endDate: '30-03-2027', priority: 'MEDIUM', totalProgress: '10%',
    qis: [
      {
        id: 'QI 1', name: 'Gap Assessment', allotted: '30%',
        events: [
          { id: 1, title: 'Average time taken for closure of QA activities for the FY 2025-2026', taskPercent: 10, responsibility: 'QA', startDate: '01-09-2026', endProposed: '30-09-2026', status: 'IN PROCESS (50%) - With Evidence', remark: 'QE with timelines completed but other QA process is pending' },
          { id: 2, title: 'Process delay identification, root cause analysis', taskPercent: 10, responsibility: 'QA', startDate: '01-09-2026', endProposed: '30-09-2026', status: 'IN PROCESS (50%) - With Evidence', remark: "Identified for QE's" },
          { id: 3, title: 'Baseline assessment plan', taskPercent: 10, responsibility: 'QA', startDate: '01-10-2026', endProposed: '30-10-2026', status: 'NOT INITIATED (0%)', remark: 'Yet to prepare' },
        ],
      },
      {
        id: 'QI 2', name: 'Implementation', allotted: '30%',
        events: [
          { id: 1, title: 'Awareness training on time lines to all stake holders', taskPercent: 15, responsibility: 'QA', startDate: '01-11-2026', endProposed: '30-11-2026', status: 'NOT INITIATED (0%)', remark: 'Yet to communicate with stakeholders' },
          { id: 2, title: 'Revision of the standard operating procedures (As applicable)', taskPercent: 15, responsibility: 'QA', startDate: '01-12-2026', endProposed: '31-12-2026', status: 'NOT INITIATED (0%)', remark: 'May require revision of Incident SOP considering Vendor related delays' },
        ],
      },
      {
        id: 'QI 3', name: 'Verification', allotted: '20%',
        events: [
          { id: 1, title: 'Implementation of weekly checks focused on timelines', taskPercent: 20, responsibility: 'QA', startDate: '01-01-2027', endProposed: '31-01-2027', status: 'NOT INITIATED (0%)' },
        ],
      },
      {
        id: 'QI 4', name: 'Effectiveness', allotted: '20%',
        events: [
          { id: 1, title: '90% activities to be completed within 80% from the specified timeline', taskPercent: 20, responsibility: 'QA', startDate: '01-02-2027', endProposed: '15-02-2027', status: 'NOT INITIATED (0%)' },
        ],
      },
    ],
  },
  {
    id: '08',
    title: 'Quality Objective No. 8',
    desc: 'Creating a vertical compliance team for Internal audit / External audit / Complaints / feedback.',
    startDate: '01-01-2026', endDate: '30-03-2026', priority: 'MEDIUM', totalProgress: '2%',
    qis: [
      {
        id: 'QI 1', name: 'Gap Assessment', allotted: '20%',
        events: [
          { id: 1, title: 'Identification of the activities based on the criticality of the process', taskPercent: 10, responsibility: 'QA', startDate: '01-09-2026', endProposed: '30-09-2026', status: 'INITIATION (20%) - With Evidence', remark: 'NA' },
          { id: 2, title: 'Identification and formation of Compliance team', taskPercent: 10, responsibility: 'QA', startDate: '01-09-2026', endProposed: '30-09-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
        ],
      },
      {
        id: 'QI 2', name: 'Training and Evaluation', allotted: '20%',
        events: [
          { id: 1, title: 'Training Planner', taskPercent: 10, responsibility: 'QA', startDate: '01-10-2026', endProposed: '30-10-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
          { id: 2, title: 'Evaluation post training', taskPercent: 10, responsibility: 'QA', startDate: '01-11-2026', endProposed: '15-11-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
        ],
      },
      {
        id: 'QI 3', name: 'Implementation', allotted: '40%',
        events: [
          { id: 1, title: 'Maintain compliance dashboard and tracker', taskPercent: 15, responsibility: 'QA', startDate: '15-11-2026', endProposed: '30-12-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
          { id: 2, title: 'Co-ordinate cross functional team for Investigation', taskPercent: 15, responsibility: 'QA', startDate: '15-11-2026', endProposed: '30-12-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
          { id: 3, title: 'Drive continuous improvement initiatives', taskPercent: 10, responsibility: 'QA', startDate: '15-11-2026', endProposed: '30-12-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
        ],
      },
      {
        id: 'QI 4', name: 'Effectiveness', allotted: '20%',
        events: [
          { id: 1, title: '% of reduction in the repetitive Audit findings', taskPercent: 10, responsibility: 'QA', startDate: '01-01-2027', endProposed: '15-01-2027', status: 'NOT INITIATED (0%)', remark: 'NA' },
          { id: 2, title: '100% efficiency in the effectiveness check', taskPercent: 10, responsibility: 'QA', startDate: '01-01-2027', endProposed: '15-01-2027', status: 'NOT INITIATED (0%)', remark: 'NA' },
        ],
      },
    ],
  },
  {
    id: '09',
    title: 'Quality Objective No. 9',
    desc: 'Enhance the Competency, autonomy and Engagement of QA Personnel to improve overall quality system performance and compliance.',
    startDate: '01-09-2026', endDate: '31-12-2026', priority: 'MEDIUM', totalProgress: '45%',
    qis: [
      {
        id: 'QI 1', name: 'Gap Assessment', allotted: '20%',
        events: [
          { id: 1, title: 'Training need identification of IPQA, QMS, LabQA and RA', taskPercent: 10, responsibility: 'QA', startDate: '15-06-2026', endProposed: '30-07-2026', status: 'COMPLETED (100%)', remark: 'NA' },
          { id: 2, title: 'Customized training plan / Calendar', taskPercent: 10, responsibility: 'QA', startDate: '30-07-2026', endProposed: '15-08-2026', status: 'COMPLETED (100%)', remark: 'NA' },
        ],
      },
      {
        id: 'QI 2', name: 'Training and Competency Assessment', allotted: '50%',
        events: [
          { id: 1, title: 'Completion of training as per training plan/calendar', taskPercent: 20, responsibility: 'QA', startDate: '15-08-2026', endProposed: '15-09-2026', status: 'IN PROCESS (50%) - With Evidence', remark: 'Second phase training begins on 07/09/2026' },
          { id: 2, title: '100% Evaluation of all training', taskPercent: 10, responsibility: 'QA', startDate: '15-09-2026', endProposed: '30-09-2026', status: 'IN PROCESS (50%) - With Evidence', remark: 'NA' },
          { id: 3, title: 'Completion of retraining and evaluation of staff who scored less than 80% in first evaluation', taskPercent: 20, responsibility: 'QA', startDate: '15-09-2026', endProposed: '30-09-2026', status: 'IN PROCESS (50%) - With Evidence', remark: 'NA' },
        ],
      },
      {
        id: 'QI 3', name: 'Skill Advancement', allotted: '30%',
        events: [
          { id: 1, title: 'Assign independent ownership for the individual activity', taskPercent: 15, responsibility: 'QA', startDate: '01-10-2026', endProposed: '01-11-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
          { id: 2, title: '% Involvement of QA staff in cross functional improvement initiatives', taskPercent: 15, responsibility: 'QA', startDate: '01-10-2026', endProposed: '01-11-2026', status: 'NOT INITIATED (0%)', remark: 'NA' },
        ],
      },
    ],
  },
];

// ─── QO 04 — per-QI Site I / III / V breakdown (drives the custom 3-site panels) ──
export const qo04SiteDetail = {
  'QI 1': {
    type: 'gap',
    sites: [
      { site: 'Site I', color: '#3b82f6', totalEmployees: 191, noTraining: 99, noTrainingPct: 51.8,
        errors: [ { label: 'More than Three cut sign', pct: 24 }, { label: 'Wrong entries', pct: 17 }, { label: 'Contemporaneous data', pct: 13 } ] },
      { site: 'Site III', color: '#10b981', totalEmployees: 103, noTraining: 30, noTrainingPct: 29.1,
        errors: [ { label: 'Not Accurate', pct: 37 }, { label: 'More than Three cut sign', pct: 26 }, { label: 'Not Original', pct: 16 } ] },
      { site: 'Site V', color: '#f59e0b', totalEmployees: 280, noTraining: 73, noTrainingPct: 26.1,
        errors: [ { label: 'More than Three cut sign', pct: 27 }, { label: 'Wrong entries', pct: 18 }, { label: 'Contemporaneous data', pct: 14 } ] },
    ],
  },
  'QI 2': {
    type: 'implementation',
    sites: [
      { site: 'Site I', color: '#3b82f6', trainedLatestSOP: 176, evalAbove80: 134, retraining: 31, eval100: 176, successRate: 100 },
      { site: 'Site III', color: '#10b981', trainedLatestSOP: 103, evalAbove80: 98, retraining: 5, eval100: 103, successRate: 100 },
      { site: 'Site V', color: '#f59e0b', trainedLatestSOP: 271, evalAbove80: 230, retraining: 41, eval100: 271, successRate: 100 },
    ],
  },
  'QI 3': {
    type: 'verification',
    note: 'Biweekly Check — incidents per cycle vs old/new target',
    sites: [
      { site: 'Site I', color: '#3b82f6', oldTarget: 5, newTarget: 3,
        points: [ { date: '11/15', actual: 9 }, { date: '11/29', actual: 4 }, { date: '12/13', actual: 7 }, { date: '12/27', actual: 6 }, { date: '01/10', actual: 5 }, { date: '01/24', actual: 8 }, { date: '02/14', actual: 3 }, { date: '02/28', actual: 5 }, { date: '03/14', actual: 4 }, { date: '03/28', actual: 2 }, { date: '04/11', actual: 1 }, { date: '04/25', actual: 2 } ] },
      { site: 'Site III', color: '#10b981', oldTarget: 2, newTarget: 1,
        points: [ { date: '31/10', actual: 0 }, { date: '19/11', actual: 0 }, { date: '04/11', actual: 0 }, { date: '20/11', actual: 0 }, { date: '06/12', actual: 1 }, { date: '22/12', actual: 0 }, { date: '07/01', actual: 1 }, { date: '23/01', actual: 0 }, { date: '11/02', actual: 0 }, { date: '01/03', actual: 0 }, { date: '16/03', actual: 0 }, { date: '01/04', actual: 1 }, { date: '16/04', actual: 0 }, { date: '30/04', actual: 0 } ] },
      { site: 'Site V', color: '#f59e0b', oldTarget: 4, newTarget: 2,
        points: [ { date: '03/10', actual: 3 }, { date: '19/10', actual: 1 }, { date: '04/11', actual: 5 }, { date: '20/11', actual: 3 }, { date: '06/12', actual: 1 }, { date: '22/12', actual: 2 }, { date: '07/01', actual: 1 }, { date: '23/01', actual: 4 }, { date: '11/02', actual: 2 }, { date: '01/03', actual: 1 }, { date: '16/03', actual: 3 }, { date: '01/04', actual: 1 }, { date: '16/04', actual: 1 }, { date: '30/04', actual: 0 } ] },
    ],
  },
  'QI 4': {
    type: 'effectiveness',
    items: [
      { title: '50% reduction in number of GDP-related incidents reported per month', achieved: 85,
        table: { kind: 'beforeAfter',
          rows: [
            { site: 'I', beforeTotal: 90, beforeAvg: 10, targetSet: 5, afterTotal: 56, afterAchieved: 9, targetPct: 55 },
            { site: 'III', beforeTotal: 19, beforeAvg: 2, targetSet: 1, afterTotal: 3, afterAchieved: 1, targetPct: 100 },
            { site: 'V', beforeTotal: 75, beforeAvg: 8, targetSet: 4, afterTotal: 28, afterAchieved: 4, targetPct: 100 },
          ] } },
      { title: '100% staff trained in GDP', achieved: 100 },
      { title: '0% GDP related audit findings in internal or external audit', achieved: 50,
        bullets: [ 'Identified GDP related audit findings in the 2nd IQA 2026-27.', 'No GDP errors identified during external audit 2026-27.' ] },
      { title: 'Average time taken to correct GDP error should be less than 2 days', achieved: 81,
        table: { kind: 'timeTaken',
          rows: [
            { site: 'I', totalIncidents: 56, avgTime: 4.6, targetPct: 43 },
            { site: 'III', totalIncidents: 3, avgTime: 2, targetPct: 100 },
            { site: 'V', totalIncidents: 33, avgTime: 2, targetPct: 100 },
          ] } },
    ],
  },
};

// ─── QO 9 / QI 3 — QA staff involvement (QMS, IPQA, Lab QA) Before vs After, per site ──
export const QO9_QI3_STAFF_INVOLVEMENT = [
  {
    site: 'Site I', color: '#ea580c',
    beforePct: 21, afterPct: 79, totalEmployees: 19, subDepts: 3,
    rows: [
      { dept: 'QMS / IPQA / Lab QA', beforeMembers: 4, beforePct: 21, afterMembers: 15, afterPct: 79 },
    ],
    totalBefore: '21%', totalAfter: '79%',
  },
  {
    site: 'Site III', color: '#7c3aed',
    beforePct: 55.33, afterPct: 70, totalEmployees: 9, subDepts: 3,
    rows: [
      { dept: 'QMS',    beforeMembers: 4, beforePct: 44,  afterMembers: 6, afterPct: 66 },
      { dept: 'IPQA',   beforeMembers: 9, beforePct: 100, afterMembers: 9, afterPct: 100 },
      { dept: 'Lab QA', beforeMembers: 2, beforePct: 22,  afterMembers: 4, afterPct: 44 },
    ],
    totalBefore: '55.33%', totalAfter: '70%',
  },
  {
    site: 'Site V', color: '#2563eb',
    beforePct: 15, afterPct: 74, totalEmployees: 27, subDepts: 3,
    rows: [
      { dept: 'QMS / IPQA / Lab QA', beforeMembers: 4, beforePct: 15, afterMembers: 20, afterPct: 74 },
    ],
    totalBefore: '15%', totalAfter: '74%',
  },
];
