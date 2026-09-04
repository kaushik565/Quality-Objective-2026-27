export const COMPLAINTS_DATA = {
  summary: {
    totalComplaints: 11,
    totalDevices: 109,
    unresolved: 22,
    resolved: 87,
    topRootCause: 'Material Failure',
    topStage: 'Bottom Cover Assembly'
  },
  
  rootCauseAnalysis: [
    { name: 'Material Issue', value: 41, color: '#f43f5e' },
    { name: 'Unresolved', value: 22, color: '#f59e0b' },
    { name: 'Method/Process', value: 13, color: '#3b82f6' },
    { name: 'Mankind/Operator', value: 11, color: '#8b5cf6' },
    { name: 'No Issue Found', value: 22, color: '#10b981' }
  ],
  
  processStages: [
    { stage: 'Bottom Cover Assy', count: 24 },
    { stage: 'Other / N/A', count: 22 },
    { stage: 'Optics Sub Assy', count: 15 },
    { stage: 'Mechanism Assy', count: 15 },
    { stage: 'Top Cover Assy', count: 5 },
    { stage: 'Manifold Testing', count: 2 },
    { stage: 'AFC Testing', count: 2 },
    { stage: 'IQC & Final Assy', count: 4 }
  ],

  componentsAffected: [
    { name: 'Motherboard / PCB', count: 28 },
    { name: 'Optics Module', count: 22 },
    { name: 'Thermal Block', count: 18 },
    { name: 'Cartridge Sensor', count: 15 },
    { name: 'Power Supply Unit', count: 12 },
    { name: 'Motor / Actuator', count: 10 },
    { name: 'Other', count: 4 }
  ],

  productTypes: [
    { name: 'Extraction Device', value: 49 },
    { name: 'Two Bay PCR', value: 34 },
    { name: 'Four Bay PCR', value: 10 },
    { name: 'ASED Controller PCB', value: 7 },
    { name: 'Rapid Cell Lysis', value: 5 },
    { name: 'Assembled Cartridge', value: 4 }
  ],
  
  timeline: [
    { month: 'Jun-25', count: 4 },
    { month: 'Sep-25', count: 21 },
    { month: 'Nov-25', count: 12 },
    { month: 'Jan-26', count: 17 },
    { month: 'Feb-26', count: 10 },
    { month: 'May-26', count: 45 }
  ],
  
  unresolvedFeed: [
    { id: 'CU/III/26/007', serial: 'TPV25306B', product: 'Extraction Device', issue: 'Reset card read error' },
    { id: 'CU/III/26/007', serial: 'TPV25331B', product: 'Extraction Device', issue: 'RTD L-error' },
    { id: 'CU/III/26/007', serial: 'TPV25310B', product: 'Extraction Device', issue: 'No elute' },
    { id: 'CU/III/26/007', serial: 'TPV25404B', product: 'Extraction Device', issue: 'No elute' },
    { id: 'CU/III/26/007', serial: 'TPV25382B', product: 'Extraction Device', issue: 'Not charging' },
    { id: 'CU/III/26/007', serial: 'TPV25391B', product: 'Extraction Device', issue: 'Charging issue' },
    { id: 'CU/III/26/007', serial: 'TPV25433B', product: 'Extraction Device', issue: 'No elute' },
    { id: 'CU/III/26/007', serial: 'TPV25784B', product: 'Extraction Device', issue: 'Device not aspiring any liquid' },
    { id: 'CU/III/26/007', serial: 'TPV26177B', product: 'Extraction Device', issue: 'Device not aspiring any liquid' },
    { id: 'CU/III/26/007', serial: 'TPV26179B', product: 'Extraction Device', issue: 'Device not aspiring any liquid' },
    { id: 'CU/III/26/007', serial: 'TPV26190B', product: 'Extraction Device', issue: 'Device not aspiring any liquid' },
    { id: 'CU/III/26/007', serial: 'TPV26206B', product: 'Extraction Device', issue: 'Device is not switching ON' },
    { id: 'CU/III/26/007', serial: 'TPV26500B', product: 'Extraction Device', issue: 'Door not closing' },
    { id: 'CU/III/26/007', serial: 'TPV26584B', product: 'Extraction Device', issue: 'Cartridge sensor not sensing' },
    { id: 'CU/III/26/007', serial: 'TPV26599B', product: 'Extraction Device', issue: 'Charging point loosen' },
    { id: 'CU/III/26/007', serial: 'TPV26692B', product: 'Extraction Device', issue: 'Device not aspiring any liquid' },
    { id: 'CU/III/26/007', serial: 'TPV26636B', product: 'Extraction Device', issue: 'Reset card read error' },
    { id: 'CU/III/26/002', serial: 'TLUS0065', product: 'Rapid Cell Lysis', issue: 'Temperature is less than 80 C' },
    { id: 'CU/III/26/002', serial: 'TLUS0091', product: 'Rapid Cell Lysis', issue: 'Temperature is less than 95 C' },
    { id: 'CU/III/26/002', serial: 'TLUS0096', product: 'Rapid Cell Lysis', issue: 'Temperature is more than 95 C' },
    { id: 'CU/III/26/002', serial: 'TLUS0114', product: 'Rapid Cell Lysis', issue: '5 times beep error' },
    { id: 'CU/III/26/002', serial: 'TLUS0116', product: 'Rapid Cell Lysis', issue: '5 times beep error' }
  ]
};
