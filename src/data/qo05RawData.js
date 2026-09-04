export const QO05_RAW_DATA = [
  // ================= SITE I & V =================
  {
    id: 1, site: 'Site I & V', product: 'TRUENAT', processStep: 'Chip Arrangements',
    gap: '1)No IPQA check on chip type\n2)quick rejection is not getting to new worker during sorting of chips',
    implementation: '1)Include IPQA verification to confirm correct chip type.\n2)need to make pictorial representations on workstations of diffrent types of rejection',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 2, site: 'Site I & V', product: 'TRUENAT', processStep: 'Chip washing',
    gap: '1)No IPQA check for chip washing activity',
    implementation: '1)Include IPQA verification',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 3, site: 'Site I & V', product: 'TRUENAT', processStep: 'MG Filling',
    gap: 'NA',
    implementation: '1)Include IPQA verification',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 4, site: 'Site I & V', product: 'TRUENAT', processStep: 'Master Mix Filling',
    gap: 'No IPQA verification',
    implementation: '1)Include IPQA verification',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 5, site: 'Site I & V', product: 'TRUENAT', processStep: 'Tube Sorting',
    gap: 'No IPQA verification',
    implementation: '1)Include IPQA verification',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 6, site: 'Site I & V', product: 'TRUENAT', processStep: 'Polymer Dispensing',
    gap: 'As per SOP/MC/005 chips shall be used for 120 hrs but track for the same is not there.',
    implementation: 'Label introduced',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 7, site: 'Site I & V', product: 'TRUENAT', processStep: 'Master Mix Preparation',
    gap: 'Glasswares used for MM preparation , the measuring cylinder ID doesnot reflect on documents and its cleaning status and calibration status.',
    implementation: 'Included in the related documents',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 8, site: 'Site I & V', product: 'TRUENAT', processStep: 'Tube Sorting/Tube Printing',
    gap: 'Good/Rejected tubes couldnot be differentiated by New workers',
    implementation: 'Introduced pictorial representations on workstations of diffrent types of rejection',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 9, site: 'Site I & V', product: 'TRUENAT', processStep: 'Printing of Pouches and Cartons',
    gap: 'Improper storage identified',
    implementation: 'Investigate and address storage issues',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Under discussion', status: 'Inprogress'
  },
  {
    id: 10, site: 'Site I & V', product: 'TRUENAT', processStep: 'Polymer Dispensing',
    gap: 'As per SOP/MC/005 chips shall be used for 120 hrs but track for the same is not there.',
    implementation: 'Label for the same is be introduced',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 11, site: 'Site I & V', product: 'TRUENAT', processStep: 'Master Mix Preparation',
    gap: 'Retesting of Primer /Probes (incoming Sampling) had no documentation process.',
    implementation: 'Introduced Document',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 12, site: 'Site I & V', product: 'TRUEPREP', processStep: 'Reagent Preparation',
    gap: 'Before approval of buffer labels are sent for vemdor for printing purpose like wash buffers.',
    implementation: 'once buffer preparation is started the orderprocessing of labels are verified by IPQA and only after that it is sent for vendor printing',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 13, site: 'Site I & V', product: 'TRUEPREP', processStep: 'Buffer filling',
    gap: 'No volume verification check during the filling process',
    implementation: 'Volume verification check has been implemented',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 14, site: 'Site I & V', product: 'TRUEPREP', processStep: 'Cartridge Pouching',
    gap: 'No Dye leak testing in Cartidge pouching section',
    implementation: 'It should be implemented as inprocess check to check any leakages in the cartridges',
    trainingPlanner: 'Inprogress', trainingIPQA: 'CC has been initiated   SOP Under draft', status: 'Inprogress'
  },
  {
    id: 15, site: 'Site I & V', product: 'IQC, IQPC, FQC', processStep: 'All Critical Processes',
    gap: 'Preparation of FMEA',
    implementation: 'QA, QC, DI',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },

  // ================= SITE III =================
  // Row 16 - Part 1
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'Introduction and display of machine parameters near machine',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'Introduction of Work instruction at the work place',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'Display of WI at work place',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'Personnel qualification of operators (Welding Inspection)',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'Training to operators',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'SOP updates',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'Training to IPQA on defect identification and root cause analysis',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'Regular update of risk file',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: '1. Cartridge Laser Welding process\n2. Foil Sealing Process',
    gap: '1. Machine parameters not as per validation report\n2. Configuration of unvalidated parameters in equipment\n3. No clear understabding on procedures to operators\n4. Record incorrect machine parameters into line clerances documents',
    implementation: 'SOP updates',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },

  // Row 16 - Part 2
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: 'Visual Inspection-01 & 04',
    gap: '1. Improper visual inspection\n2. Increase in rework processing\n3. No clear understanding on procedures to operators',
    implementation: 'Display of WI at work place',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: 'Visual Inspection-01 & 04',
    gap: '1. Improper visual inspection\n2. Increase in rework processing\n3. No clear understanding on procedures to operators',
    implementation: 'Introduction of Work instruction at the work place',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: 'Visual Inspection-01 & 04',
    gap: '1. Improper visual inspection\n2. Increase in rework processing\n3. No clear understanding on procedures to operators',
    implementation: 'Training to operators',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: 'Visual Inspection-01 & 04',
    gap: '1. Improper visual inspection\n2. Increase in rework processing\n3. No clear understanding on procedures to operators',
    implementation: 'Training to IPQA on defect identification and root cause analysis',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: 'Visual Inspection-01 & 04',
    gap: '1. Improper visual inspection\n2. Increase in rework processing\n3. No clear understanding on procedures to operators',
    implementation: 'Regular update of risk file',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: 'Visual Inspection-01 & 04',
    gap: '1. Improper visual inspection\n2. Increase in rework processing\n3. No clear understanding on procedures to operators',
    implementation: 'SOP updates',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },
  {
    id: 16, site: 'Site III', product: 'Laser Welded Cartridge', processStep: 'Visual Inspection-01 & 04',
    gap: '1. Improper visual inspection\n2. Increase in rework processing\n3. No clear understanding on procedures to operators',
    implementation: 'Develop feedback mechanism between VI-04 and VI-01',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },

  // Row 17
  {
    id: 17, site: 'Site III', product: 'Assembly of Extraction Device', processStep: '1. Manifold assembly\n2. Heater Testing Stage',
    gap: 'Contarct operators can damage/mis assemble the devices/SFG\'s due to improper knowledge',
    implementation: 'Display of WI at work place',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 17, site: 'Site III', product: 'Assembly of Extraction Device', processStep: '1. Manifold assembly\n2. Heater Testing Stage',
    gap: 'All the risks are not identified',
    implementation: 'Identify additonal risk control measures',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 17, site: 'Site III', product: 'Assembly of Extraction Device', processStep: '1. Manifold assembly\n2. Heater Testing Stage',
    gap: 'SOP doesnt include all the risks',
    implementation: 'Update of additional risk control measures in SOP',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },

  // Row 18
  {
    id: 18, site: 'Site III', product: 'True Lab Duo/Quatro', processStep: 'Bottom Cover Assembly',
    gap: 'Contarct operators can damage/mis assemble the devices/SFG\'s due to improper knowledge',
    implementation: 'Display of WI at work place',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 18, site: 'Site III', product: 'True Lab Duo/Quatro', processStep: 'Bottom Cover Assembly',
    gap: 'All the risks are not identified',
    implementation: 'Identify additonal risk control measures',
    trainingPlanner: 'Completed', trainingIPQA: 'Completed', status: 'Completed'
  },
  {
    id: 18, site: 'Site III', product: 'True Lab Duo/Quatro', processStep: 'Bottom Cover Assembly',
    gap: 'SOP doesnt include all the risks',
    implementation: 'Update of additional risk control measures in SOP',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  },

  // Row 19
  {
    id: 19, site: 'Site III', product: 'IQC, IQPC, FQC', processStep: 'All Critical Processes',
    gap: 'QA process risks are identified',
    implementation: 'Preparation of FMEA',
    trainingPlanner: 'Inprogress', trainingIPQA: 'Inprogress', status: 'Inprogress'
  }
];
