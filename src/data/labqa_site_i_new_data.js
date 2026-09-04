export const SITE1_LABQA_NEW_DATA = {
  reportsVerification: {
    stability: {
      trueprep: { jan: 42, feb: 12, mar: 19, apr: 31, may: 12, total: 116 },
      truenat: { jan: 91, feb: 116, mar: 67, apr: 90, may: 96, total: 460 },
    },
    truenat: {
      inprocess: { jan: 90, feb: 63, mar: 103, apr: 95, may: 81, total: 432 },
      finishedKit: { jan: 49, feb: 21, mar: 44, apr: 47, may: 48, total: 209 },
      oos: {
        inprocess: { jan: 2, feb: 8, mar: 11, apr: 6, may: 9, total: 36 },
        finishedKit: { jan: 1, feb: 5, mar: 3, apr: 0, may: 0, total: 9 },
      }
    },
    trueprep: {
      inprocess: { jan: 31, feb: 13, mar: 19, apr: 26, may: 18, total: 107 },
      finishedKit: { jan: 15, feb: 9, mar: 8, apr: 12, may: 9, total: 53 },
      oos: {
        inprocess: { jan: 0, feb: 1, mar: 1, apr: 0, may: 0, total: 2 },
        finishedKit: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
      }
    },
    incomingMaterials: {
      packagingMaterial: { jan: 111, feb: 110, mar: 117, apr: 110, may: 101, total: 549 },
      rawMaterialPrimer: { jan: 220, feb: 143, mar: 219, apr: 160, may: 106, total: 848 },
      rawMaterialChemicals: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
      blankChip: { jan: 84, feb: 21, mar: 97, apr: 61, may: 80, total: 343 },
      incomingCartridge: { jan: 7, feb: 9, mar: 13, apr: 8, may: 7, total: 44 },
      versafill: { jan: 25, feb: 27, mar: 25, apr: 22, may: 30, total: 129 },
      waterTesting: { jan: 25, feb: 27, mar: 30, apr: 27, may: 28, total: 137 },
      sampleTestPanels: { jan: 42, feb: 223, mar: 201, apr: 215, may: 148, total: 829 },
      oos: {
        packagingMaterial: { jan: 1, feb: 4, mar: 2, apr: 0, may: 1, total: 8 },
        rawMaterialPrimer: { jan: 46, feb: 75, mar: 67, apr: 56, may: 17, total: 261 },
        rawMaterialChemicals: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
        blankChip: { jan: 0, feb: 1, mar: 1, apr: 0, may: 0, total: 2 },
        incomingCartridge: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
        versafill: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
        waterTesting: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
        sampleTestPanels: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
      }
    },
    positiveControlPanel: {
      pcI: {
        inprocess: { jan: 0, feb: 2, mar: 3, apr: 1, may: 1, total: 7 },
        finishedKit: { jan: 1, feb: 2, mar: 3, apr: 1, may: 1, total: 8 },
      },
      pcII: {
        inprocess: { jan: 0, feb: 0, mar: 0, apr: 0, may: 1, total: 1 },
        finishedKit: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
      },
      pcIII: {
        inprocess: { jan: 0, feb: 0, mar: 0, apr: 0, may: 1, total: 1 },
        finishedKit: { jan: 0, feb: 0, mar: 0, apr: 0, may: 1, total: 1 },
      },
      pcIV: {
        inprocess: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
        finishedKit: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, total: 0 },
      },
      pcV: {
        inprocess: { jan: 0, feb: 0, mar: 0, apr: 1, may: 0, total: 1 },
        finishedKit: { jan: 0, feb: 0, mar: 0, apr: 1, may: 0, total: 1 },
      }
    }
  },
  oosClosure: [
    { month: 'Jan', avgDays: 5.0 },
    { month: 'Feb', avgDays: 3.8 },
    { month: 'Mar', avgDays: 4.7 },
    { month: 'Apr', avgDays: 0 },
    { month: 'May', avgDays: 3.0 },
    { month: 'Jun', avgDays: 2.0 },
  ],
  // Include dummy documents and observations for UI compatibility if needed
  documents: {
    incoming: { total: 0 },
    truenat: { total: 0 },
    trueprep: { total: 0 },
    controls: { total: 0 }
  },
  observations: []
};
