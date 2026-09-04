// Customer Complaints - Site III (structured from raw complaint log).
// Two levels: complaintCases[] -> findings[] (device-level).
// cause = normalized 4M-style category: 'Material' | 'Method' | 'Man' | 'Not Found' | 'Unresolved'.
// resolved = whether the unit's complaint has a corrective action closed.
// NOTE: source columns were inconsistent; cause/component normalized on a best-effort basis - please sanity check.

export const complaintCases = [
  {
    "id": "CU/III/25/009",
    "period": "Jun-Nov 25",
    "date": "2025-06-30",
    "product": "Assembled cartridge (laser welded)",
    "findings": [
      {
        "serial": "OOS/V/QC/M091",
        "issue": "Valve leakage at left valve cap area",
        "rootCause": "Not identified",
        "cause": "Material",
        "component": "Valve cap",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "OOS/V/QC/M084",
        "issue": "Valve leakage at left valve cap area",
        "rootCause": "Not identified",
        "cause": "Material",
        "component": "Valve cap",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "OOS/V/QC/M085",
        "issue": "Valve leakage at left valve cap area",
        "rootCause": "Not identified",
        "cause": "Material",
        "component": "Valve cap",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "OOS/V/QC/M089",
        "issue": "Valve leakage at left valve cap area",
        "rootCause": "Not identified",
        "cause": "Material",
        "component": "Valve cap",
        "correction": "",
        "stage": "",
        "resolved": false
      }
    ]
  },
  {
    "id": "CU/III/25/010",
    "period": "Jun-Nov 25",
    "date": "2025-09-16",
    "product": "Two & Four Bay PCR machine",
    "findings": [
      {
        "serial": "TLQU6707",
        "issue": "Wrong screw (M3x20 SHCS) for top cover fixing",
        "rootCause": "Bottom cover bush was damaged",
        "cause": "Material",
        "component": "Top/Bottom cover",
        "correction": "Replaced with new top and bottom cover",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7288",
        "issue": "AFC test fail",
        "rootCause": "Issue not found",
        "cause": "Not Found",
        "component": "",
        "correction": "No nonconformity found",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7442",
        "issue": "B-2 chip carrier body jerking",
        "rootCause": "Chip carrier body misalignment",
        "cause": "Man",
        "component": "Chip carrier",
        "correction": "Re-alignment of the chip carrier body",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7620",
        "issue": "Bay 1 blue LED not increasing",
        "rootCause": "Blue LED PCB not working",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7578",
        "issue": "Bay 1 red LED not increasing",
        "rootCause": "Issue in Lock-in PCB",
        "cause": "Material",
        "component": "Lock-in PCB",
        "correction": "Replaced with new Lock-in PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7574",
        "issue": "Bay 2 blue LED not increasing while tuning",
        "rootCause": "Blue LED PCB not working",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7448",
        "issue": "Bay 2 blue optics tuning value out of range",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "No nonconformity found",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7297",
        "issue": "Bay 2 blue optics showing ND",
        "rootCause": "Blue LED PCB damaged",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7502",
        "issue": "Blue optics value not increasing",
        "rootCause": "Variable resistor damaged",
        "cause": "Material",
        "component": "Variable resistor",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7524",
        "issue": "Device turns ON only when charger connected",
        "rootCause": "Battery cable over-pressed",
        "cause": "Man",
        "component": "Battery cable",
        "correction": "Battery cable re-positioning",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7522",
        "issue": "Device turns ON only when charger connected",
        "rootCause": "Battery cable over-pressed",
        "cause": "Man",
        "component": "Battery cable",
        "correction": "Battery cable re-positioning",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7070",
        "issue": "Gap between top plate and bottom cover",
        "rootCause": "Gap between top plate and bottom cover",
        "cause": "Material",
        "component": "Top/Bottom cover",
        "correction": "Replaced with new top and bottom cover",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLQU6702",
        "issue": "IMEI number not matching software",
        "rootCause": "Barcode label mismatched",
        "cause": "Man",
        "component": "Barcode label",
        "correction": "Replaced with new barcode label",
        "stage": "Final assembly & labelling",
        "resolved": true
      },
      {
        "serial": "TLDU7436",
        "issue": "Not able to insert SIM card",
        "rootCause": "4G GSM board not assembled properly",
        "cause": "Man",
        "component": "4G GSM board",
        "correction": "Re-aligned the 4G GSM board",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7425",
        "issue": "Not able to remove screw",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7302",
        "issue": "Not able to remove screw",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7434",
        "issue": "Not able to remove screw for optics tuning",
        "rootCause": "Issue not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7283",
        "issue": "Not connected to network",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7377",
        "issue": "Paint peel off and screw issue of top cover",
        "rootCause": "Paint peel off",
        "cause": "Material",
        "component": "Top cover",
        "correction": "Replaced with new top and bottom cover",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7431",
        "issue": "Two USB ports not working",
        "rootCause": "USB ports not working",
        "cause": "Material",
        "component": "Power management PCB 1.2",
        "correction": "Replaced with new power management PCB 1.2",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7497",
        "issue": "Blue LED flickering while tuning",
        "rootCause": "Blue LED PCB damaged",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/25/011",
    "period": "Jun-Nov 25",
    "date": "2025-09-19",
    "product": "Extraction device",
    "findings": [
      {
        "serial": "TPV25180B",
        "issue": "Cartridge not getting sensed",
        "rootCause": "Limit switch PCB misaligned due to play",
        "cause": "Man",
        "component": "Limit switch PCB",
        "correction": "Re-aligned the limit switch PCB",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TPV25175B",
        "issue": "Cartridge not getting sensed",
        "rootCause": "Limit switch PCB misaligned due to play",
        "cause": "Man",
        "component": "Limit switch PCB",
        "correction": "Re-aligned the limit switch PCB",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TPV25106B",
        "issue": "Cartridge valve error",
        "rootCause": "Valve motor 2 was faulty",
        "cause": "Material",
        "component": "Valve motor",
        "correction": "Replaced with new valve motor",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TPV26410B",
        "issue": "Dark spot on display sticker",
        "rootCause": "Spot on the front panel sticker surface",
        "cause": "Material",
        "component": "Front panel sticker",
        "correction": "Replaced with new front panel sticker",
        "stage": "Top cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV26365B",
        "issue": "Device door not locking",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TPV26248B",
        "issue": "Device door not locking",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TPV26348B",
        "issue": "Device door not locking",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TPV26288B",
        "issue": "Device door not locking",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TPV26322B",
        "issue": "Device door not locking",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TPV25119B",
        "issue": "Device turning OFF during extraction",
        "rootCause": "Faulty hybrid batteries",
        "cause": "Material",
        "component": "Battery",
        "correction": "Replaced with ultra-life battery",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV26428B",
        "issue": "Door not locking and switch sensitive",
        "rootCause": "Embossing issue on front panel sticker",
        "cause": "Material",
        "component": "Front panel sticker",
        "correction": "Replaced with new front panel sticker",
        "stage": "Top cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV25339B",
        "issue": "No return during dispense test",
        "rootCause": "Air lock - improper liquid flow",
        "cause": "Material",
        "component": "Manifold",
        "correction": "Air lock cleared",
        "stage": "Manifold testing",
        "resolved": true
      },
      {
        "serial": "TPV25113B",
        "issue": "Lines on display when device ON",
        "rootCause": "Display faulty",
        "cause": "Material",
        "component": "Display",
        "correction": "Replaced with new display",
        "stage": "Top cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV25150B",
        "issue": "Not dispensing any liquid",
        "rootCause": "Air lock - improper liquid flow",
        "cause": "Material",
        "component": "Manifold",
        "correction": "Air lock cleared",
        "stage": "Manifold testing",
        "resolved": true
      },
      {
        "serial": "TPV25115B",
        "issue": "Not dispensing any liquid",
        "rootCause": "L6 component damaged in ASED controller PCB 2.1",
        "cause": "Material",
        "component": "ASED controller PCB 2.1",
        "correction": "Replaced with new ASED controller PCB 2.1",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV25166B",
        "issue": "Not dispensing any liquid",
        "rootCause": "L6 component damaged in ASED controller PCB 2.1",
        "cause": "Material",
        "component": "ASED controller PCB 2.1",
        "correction": "Replaced with new ASED controller PCB 2.1",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV25468B",
        "issue": "Play and eject buttons sensitive",
        "rootCause": "Embossing issue",
        "cause": "Material",
        "component": "Front panel sticker",
        "correction": "Replaced with new front panel sticker",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TPV25454B",
        "issue": "Play and eject buttons sensitive",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TPV25168B",
        "issue": "RTD-E error",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TPV26443B",
        "issue": "SBC not responding",
        "rootCause": "SBC not responding",
        "cause": "Method",
        "component": "SBC / SD card",
        "correction": "Re-loaded the OS to the SD card",
        "stage": "IQC (firmware loading)",
        "resolved": true
      },
      {
        "serial": "TPV26435B",
        "issue": "Switches sensitive",
        "rootCause": "Embossing issue",
        "cause": "Material",
        "component": "Front panel sticker",
        "correction": "Replaced with new front panel sticker",
        "stage": "Top cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV25109B",
        "issue": "Vacuum test fail at right nozzle",
        "rootCause": "Vacuum leak at right filter",
        "cause": "Material",
        "component": "Filter",
        "correction": "Replaced with new filter",
        "stage": "Bottom cover assembly",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/25/012",
    "period": "Jun-Nov 25",
    "date": "2025-11-06",
    "product": "Two Bay PCR machine",
    "findings": [
      {
        "serial": "TLDU7615",
        "issue": "Bay 1 blue LED not increasing",
        "rootCause": "Blue LED PCB not working",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7545",
        "issue": "Bay out of calibration",
        "rootCause": "Faulty optics controller PCB 2.2B",
        "cause": "Material",
        "component": "Optics controller PCB 2.2B",
        "correction": "Replaced with new controller PCB 2.2B",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7594",
        "issue": "Bay 1 & 2 noise in temperature graph",
        "rootCause": "Faulty power manager PCB 2.1",
        "cause": "Material",
        "component": "Power manager PCB 2.1",
        "correction": "Replaced with new power manager PCB 2.1",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7598",
        "issue": "Both Bay 1 and Bay 2 hanging issue",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7589",
        "issue": "Bay 2 blue LED not increasing",
        "rootCause": "Blue LED PCB not working",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7607",
        "issue": "Bay 1 & 2 blue LED not increasing",
        "rootCause": "Blue LED PCB not working",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7597",
        "issue": "Bay 2 out of calibration (4.97)",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7618",
        "issue": "WiFi not connecting",
        "rootCause": "Blue LED PCB not working",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7420",
        "issue": "Cannot fix bottom cover after AFC test",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7569",
        "issue": "Bay 1 blue LED flickering",
        "rootCause": "Blue LED PCB not working",
        "cause": "Material",
        "component": "Blue LED PCB",
        "correction": "Replaced with new blue LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7664",
        "issue": "Bay 1 all optics ND",
        "rootCause": "Nonconformity not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7643",
        "issue": "SIM card not detected",
        "rootCause": "Faulty 4G GSM board",
        "cause": "Material",
        "component": "4G GSM board",
        "correction": "Replaced with new 4G GSM board",
        "stage": "Bottom cover assembly",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/26/001",
    "period": "Dec-May 26",
    "date": "2026-01-19",
    "product": "Two Bay PCR machine",
    "findings": [
      {
        "serial": "TLDU7693",
        "issue": "Bay 2 all optics showing ND",
        "rootCause": "Issue not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7726",
        "issue": "Brightness variation issue",
        "rootCause": "SBC had functional issue",
        "cause": "Material",
        "component": "SBC",
        "correction": "Replaced with new SBC",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7865",
        "issue": "Bay 2 blue optics showing ND",
        "rootCause": "LED PCB had a dust particle",
        "cause": "Method",
        "component": "LED PCB",
        "correction": "Cleaned the LED PCB",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7885",
        "issue": "Blue ink mark on top cover",
        "rootCause": "Issue not found",
        "cause": "Not Found",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": true
      },
      {
        "serial": "TLDU7569",
        "issue": "Bay 1 blue optics showing ND",
        "rootCause": "Blue LED had functional issue",
        "cause": "Material",
        "component": "Blue LED",
        "correction": "Replaced with new blue LED",
        "stage": "Optics sub assembly",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/26/002",
    "period": "Dec-May 26",
    "date": "2026-01-13",
    "product": "Rapid Cell Lysis System",
    "findings": [
      {
        "serial": "TLUS0065",
        "issue": "Temperature is less than 80 C",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TLUS0091",
        "issue": "Temperature is less than 95 C",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TLUS0096",
        "issue": "Temperature is more than 95 C",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TLUS0114",
        "issue": "5 times beep error",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TLUS0116",
        "issue": "5 times beep error",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      }
    ]
  },
  {
    "id": "CU/III/26/003",
    "period": "Dec-May 26",
    "date": "2026-01-19",
    "product": "ASED Controller PCB 2.1",
    "findings": [
      {
        "serial": "2324157 / 701-1-01673_A0",
        "issue": "Firmware not loading",
        "rootCause": "Inefficiencies in checking the PCBs for ASED controller",
        "cause": "Method",
        "component": "ASED controller PCB",
        "correction": "Destruction through DAF, issuance of new ASED controller, revision of checklist",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "C14225B01144",
        "issue": "Eject motor issue",
        "rootCause": "Inefficiencies in checking the PCBs for ASED controller",
        "cause": "Method",
        "component": "ASED controller PCB",
        "correction": "Destruction through DAF, issuance of new ASED controller, revision of checklist",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "C14225B00305",
        "issue": "RTD-E error",
        "rootCause": "Inefficiencies in checking the PCBs for ASED controller",
        "cause": "Method",
        "component": "ASED controller PCB",
        "correction": "Destruction through DAF, issuance of new ASED controller, revision of checklist",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "C14225C01753",
        "issue": "Dispense test fail",
        "rootCause": "Inefficiencies in checking the PCBs for ASED controller",
        "cause": "Method",
        "component": "ASED controller PCB",
        "correction": "Destruction through DAF, issuance of new ASED controller, revision of checklist",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "46245672 / 701-1-01673_A0",
        "issue": "RTD-E error",
        "rootCause": "Inefficiencies in checking the PCBs for ASED controller",
        "cause": "Method",
        "component": "ASED controller PCB",
        "correction": "Destruction through DAF, issuance of new ASED controller, revision of checklist",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "46245093 / 701-1-01673_A0",
        "issue": "RTD-E error",
        "rootCause": "Inefficiencies in checking the PCBs for ASED controller",
        "cause": "Method",
        "component": "ASED controller PCB",
        "correction": "Destruction through DAF, issuance of new ASED controller, revision of checklist",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "46244833 / 701-1-01673_A0",
        "issue": "Auto heating elution heater",
        "rootCause": "Inefficiencies in checking the PCBs for ASED controller",
        "cause": "Method",
        "component": "ASED controller PCB",
        "correction": "Destruction through DAF, issuance of new ASED controller, revision of checklist",
        "stage": "Bottom cover assembly",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/26/004",
    "period": "Dec-May 26",
    "date": "2026-02-03",
    "product": "Extraction device",
    "findings": [
      {
        "serial": "TPV25468B",
        "issue": "Sensitive switch",
        "rootCause": "Design issue with switch mechanism",
        "cause": "Material",
        "component": "Switch",
        "correction": "Introduction of new buttons",
        "stage": "Top cover assembly",
        "resolved": true
      },
      {
        "serial": "TPV26348B",
        "issue": "Door not locking",
        "rootCause": "Limit switch PCB misalignment",
        "cause": "Method",
        "component": "Limit switch PCB",
        "correction": "Revising FM/MD/III/027",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TPV25180B",
        "issue": "Device turns off during extraction",
        "rootCause": "Not identified",
        "cause": "Not Found",
        "component": "",
        "correction": "Re-FQC and case closing",
        "stage": "All stages",
        "resolved": true
      },
      {
        "serial": "TPV26365B",
        "issue": "Door not locking",
        "rootCause": "Operator did not assemble the CAM properly",
        "cause": "Man",
        "component": "CAM",
        "correction": "SOP/MD/III/002 revision",
        "stage": "Mechanical assembly & mechanism",
        "resolved": true
      },
      {
        "serial": "TPV26322B",
        "issue": "Door not locking",
        "rootCause": "Operator did not assemble the CAM properly",
        "cause": "Man",
        "component": "CAM",
        "correction": "SOP/MD/III/002 revision",
        "stage": "Mechanical assembly & mechanism",
        "resolved": true
      },
      {
        "serial": "TPV26410B",
        "issue": "Door not locking",
        "rootCause": "Operator did not assemble the CAM properly",
        "cause": "Man",
        "component": "CAM",
        "correction": "SOP/MD/III/002 revision",
        "stage": "Mechanical assembly & mechanism",
        "resolved": true
      },
      {
        "serial": "TPV25106B",
        "issue": "Switches are sensitive",
        "rootCause": "Design issue with switch mechanism",
        "cause": "Material",
        "component": "Switch",
        "correction": "Introduction of new buttons",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TPV26435B",
        "issue": "Switches are sensitive",
        "rootCause": "Design issue with switch mechanism",
        "cause": "Material",
        "component": "Switch",
        "correction": "Introduction of new buttons",
        "stage": "Mechanism assembly",
        "resolved": true
      },
      {
        "serial": "TPV25113B",
        "issue": "Vacuum test fail",
        "rootCause": "Inefficient assembly by operator",
        "cause": "Man",
        "component": "",
        "correction": "Pictorial representation",
        "stage": "Bottom assembly",
        "resolved": true
      },
      {
        "serial": "TPV25168B",
        "issue": "Sensitive switch",
        "rootCause": "Design issue with switch mechanism",
        "cause": "Material",
        "component": "Switch",
        "correction": "Introduction of new buttons",
        "stage": "Top cover assembly",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/26/005",
    "period": "Dec-May 26",
    "date": "2026-05-13",
    "product": "Two Bay PCR machine",
    "findings": [
      {
        "serial": "TLDU7989",
        "issue": "Bay 2 blue optics graph sigmoidal",
        "rootCause": "Detachment of cable from chip connector PCB",
        "cause": "Method",
        "component": "Chip connector PCB cable",
        "correction": "Handling during transportation / shipment",
        "stage": "Mechanical assembly",
        "resolved": true
      },
      {
        "serial": "TLDU7978",
        "issue": "Bay 1 calibration out of range",
        "rootCause": "Inadequate mix-up of elute / dispensing inefficiency",
        "cause": "Method",
        "component": "",
        "correction": "AFC testing",
        "stage": "AFC testing",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/26/006",
    "period": "Dec-May 26",
    "date": "2026-05-13",
    "product": "Four Bay PCR machine",
    "findings": [
      {
        "serial": "TLQU4544",
        "issue": "All bays invisible",
        "rootCause": "Issue with SBC",
        "cause": "Material",
        "component": "SBC",
        "correction": "No SBC available to resolve further",
        "stage": "Bottom cover assembly",
        "resolved": false
      },
      {
        "serial": "TLQU7227",
        "issue": "Unable to login",
        "rootCause": "Issue with ASUS Tinker board",
        "cause": "Material",
        "component": "Tinker board",
        "correction": "Tinker board flashing by QC",
        "stage": "Bottom cover assembly",
        "resolved": true
      },
      {
        "serial": "TLQU7228",
        "issue": "Blue optics not proper (Bay 2)",
        "rootCause": "Issue with optics controller board",
        "cause": "Material",
        "component": "Optics controller board",
        "correction": "Material change, firmware loading",
        "stage": "Optics sub assembly",
        "resolved": true
      },
      {
        "serial": "TLQU7233",
        "issue": "Bay 3 all optics showing ND",
        "rootCause": "Issue during sample mixing or loading",
        "cause": "Method",
        "component": "",
        "correction": "Chip replacement, re-doing",
        "stage": "AFC testing",
        "resolved": true
      }
    ]
  },
  {
    "id": "CU/III/26/007",
    "period": "Dec-May 26",
    "date": "2026-05-13",
    "product": "Extraction device",
    "findings": [
      {
        "serial": "TPV25306B",
        "issue": "Reset card read error",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV25331B",
        "issue": "RTD-L error",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV25310B",
        "issue": "No elute",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV25404B",
        "issue": "No elute",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV25382B",
        "issue": "Not charging",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV25391B",
        "issue": "Charging issue",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV25433B",
        "issue": "No elute",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV25784B",
        "issue": "Device not aspirating any liquid",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26177B",
        "issue": "Device not aspirating any liquid",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26179B",
        "issue": "Device not aspirating any liquid",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26190B",
        "issue": "Device not aspirating any liquid",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26206B",
        "issue": "Device not switching ON",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26500B",
        "issue": "Door not closing",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26584B",
        "issue": "Cartridge sensor not sensing",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26599B",
        "issue": "Charging point loosened",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26692B",
        "issue": "Device not aspirating any liquid",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      },
      {
        "serial": "TPV26636B",
        "issue": "Reset card read error",
        "rootCause": "Not yet resolved",
        "cause": "Unresolved",
        "component": "",
        "correction": "",
        "stage": "",
        "resolved": false
      }
    ]
  }
];

export const complaintsSummary = {
  "totalCases": 11,
  "totalUnits": 109,
  "resolvedUnits": 82,
  "openUnits": 27,
  "resolutionRate": 75,
  "byPeriod": {
    "Jun-Nov 25": {
      "cases": 4,
      "units": 59
    },
    "Dec-May 26": {
      "cases": 7,
      "units": 50
    }
  },
  "byCause": {
    "Material": 43,
    "Not Found": 20,
    "Man": 11,
    "Method": 13,
    "Unresolved": 22
  },
  "byStage": {
    "Unassigned": 45,
    "Bottom cover assembly": 22,
    "Optics sub assembly": 14,
    "Mechanism assembly": 10,
    "Top cover assembly": 6,
    "Mechanical assembly & mechanism": 3,
    "Manifold testing": 2,
    "AFC testing": 2,
    "Final assembly & labelling": 1,
    "IQC (firmware loading)": 1,
    "All stages": 1,
    "Bottom assembly": 1,
    "Mechanical assembly": 1
  },
  "byProduct": {
    "Extraction device": 49,
    "Two & Four Bay PCR machine": 21,
    "Two Bay PCR machine": 19,
    "ASED Controller PCB 2.1": 7,
    "Rapid Cell Lysis System": 5,
    "Assembled cartridge (laser welded)": 4,
    "Four Bay PCR machine": 4
  },
  "issueThemes": {
    "Optics / LED / calibration": 22,
    "Other": 14,
    "No elute / dispensing": 13,
    "Door not locking/closing": 11,
    "Mechanical / cosmetic": 9,
    "Sensitive switches/buttons": 8,
    "Temperature / heater": 7,
    "Power / charging": 6,
    "Connectivity": 5,
    "RTD error": 5,
    "Firmware / board": 5,
    "Cartridge sensing/valve": 4
  }
};
