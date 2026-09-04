export const SITES_DATA = [
  {
    id: 'SITE-I', name: 'Site I', color: '#f59e0b', bgLight: '#fffbeb', accent: 'text-amber-500', lastMrm: 99.40,
    overview: { score: 94, lastScore: 89, improvement: '+5.2%', ops: 1890, samplings: 6047 },
    operational: [
      { event: 'Line Clearance', p1: { app: 6578, notApp: 7, time: 6.28 }, p2: { app: 4153, notApp: 21, time: 7.54 } },
      { event: 'Line Closure', p1: { app: 6620, notApp: 4, time: 5.8 }, p2: { app: 4634, notApp: 20, time: 6.85 } },
      { event: 'Verification', p1: { app: 10068, notApp: 0, time: 3.12 }, p2: { app: 7289, notApp: 0, time: 4.2 } },
      { event: 'Re Verification', p1: { app: 1878, notApp: 3, time: 6.03 }, p2: { app: 1395, notApp: 20, time: 5.1 } },
    ],
    // Site I sampling: only lots are tracked (no sampled count). time = decimal minutes (for calcs), timeStr = MM:SS (display).
    sampling: [
      { event: 'IQC', p1: { lots: 2126, count: null, time: 10.283, timeStr: '10:17' }, p2: { lots: 3948, count: null, time: 15.717, timeStr: '15:43' } },
      { event: 'IPQC', p1: { lots: 2305, count: null, time: 11.033, timeStr: '11:02' }, p2: { lots: 1827, count: null, time: 16.083, timeStr: '16:05' } },
      { event: 'FQC', p1: { lots: 388, count: null, time: 8.483, timeStr: '8:29' }, p2: { lots: 272, count: null, time: 9.217, timeStr: '9:13' } },
    ],
    calibration: [
      { name: 'Dec', value: 257 },
      { name: 'Jan', value: 126 },
      { name: 'Feb', value: 141 },
      { name: 'Mar', value: 112 },
      { name: 'Apr', value: 141 },
      { name: 'May', value: 118 }
    ]
  },
  {
    id: 'SITE-III', name: 'Site III', color: '#8b5cf6', bgLight: '#f5f3ff', accent: 'text-purple-500', lastMrm: 99.05,
    overview: { score: 91, lastScore: 87, improvement: '+3.8%', ops: 2100, samplings: 1560 },
    operational: [
      { event: 'Line Clearance', p1: { app: 2893, notApp: 29, time: 8.63 }, p2: { app: 1294, notApp: 5, time: 7.28 } },
      { event: 'Line Closure', p1: { app: 2846, notApp: 29, time: 8.77 }, p2: { app: 1288, notApp: 4, time: 7.23 } },
      { event: 'Verification', p1: { app: 9300, notApp: 0, time: 10.0 }, p2: { app: 11896, notApp: 0, time: 7.0 } },
      { event: 'Re Verification', p1: { app: 4650, notApp: 33, time: 6.73 }, p2: { app: 5948, notApp: 14, time: 6.52 } },
    ],
    sampling: [
      { event: 'IQC', p1: { lots: 870, count: 347323, time: 116 }, p2: { lots: 1035, count: 507389, time: 92 } },
      { event: 'IPQC', p1: { lots: 256, count: 67675, time: 18 }, p2: { lots: 280, count: 163000, time: 14 } },
      { event: 'FQC', p1: { lots: 451, count: 74295, time: 16 }, p2: { lots: 480, count: 122685, time: 10 } },
    ],
    calibration: [
      { name: 'Dec', value: 1 },
      { name: 'Jan', value: 36 },
      { name: 'Feb', value: 36 },
      { name: 'Mar', value: 13 },
      { name: 'Apr', value: 71 },
      { name: 'May', value: 28 }
    ]
  },
  {
    id: 'SITE-V', name: 'Site V', color: '#3b82f6', bgLight: '#eff6ff', accent: 'text-blue-500', lastMrm: 98.55,
    overview: { score: 88, lastScore: 86, improvement: '+2.4%', ops: 2450, samplings: 1890 },
    operational: [
      { event: 'Line Clearance', p1: { app: 11295, notApp: 0, time: 5.82 }, p2: { app: 11152, notApp: 5, time: 7.51 } },
      { event: 'Line Closure', p1: { app: 11112, notApp: 0, time: 6.35 }, p2: { app: 9330, notApp: 0, time: 6.44 } },
      { event: 'Verification', p1: { app: 28139, notApp: 0, time: 4.30 }, p2: { app: 28166, notApp: 0, time: 4.63 } },
      { event: 'Re Verification', p1: { app: 6165, notApp: 0, time: 5.00 }, p2: { app: 5048, notApp: 0, time: 4.85 } },
    ],
    sampling: [
      { event: 'IQC', p1: { lots: 3962, count: 0, time: 10.22, timeStr: '10:13' }, p2: { lots: 4401, count: 0, time: 10.80, timeStr: '10:48' } },
      { event: 'IPQC', p1: { lots: 4644, count: 0, time: 7.25, timeStr: '7:15' }, p2: { lots: 3803, count: 0, time: 8.10, timeStr: '8:06' } },
      { event: 'FQC', p1: { lots: 894, count: 0, time: 5.15, timeStr: '5:09' }, p2: { lots: 696, count: 0, time: 5.22, timeStr: '5:13' } },
      { event: 'Control Kit', p1: { lots: 842, count: 0, time: 4.40, timeStr: '4:24' }, p2: { lots: 709, count: 0, time: 4.17, timeStr: '4:10' } },
    ],
    calibration: [
      { name: 'Dec', value: 0 },
      { name: 'Jan', value: 111 },
      { name: 'Feb', value: 125 },
      { name: 'Mar', value: 146 },
      { name: 'Apr', value: 168 },
      { name: 'May', value: 186 }
    ]
  }
];
