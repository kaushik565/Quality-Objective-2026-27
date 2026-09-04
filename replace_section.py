#!/usr/bin/env python3
"""Replace the SITE-III Activity Overview section with manufacturing overview"""

import re

# Read the entire file
with open('src/slides/IPQAOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The old section to replace - COMPLETE from comment through closing
OLD_SECTION_START = """        {/* SITE-III Operational Activity Overview */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>"""

# Find where the section starts
if OLD_SECTION_START not in content:
    print("ERROR: Cannot find the start of SITE-III section")
    exit(1)

# Find where the section ends - look for the closing )}
# We'll find the Comparison Bar function which comes right after
comparison_start = content.find("  // Comparison Bar Component")
if comparison_start == -1:
    print("ERROR: Cannot find Comparison Bar Component marker")
    exit(1)

# Work backwards from Comparison Bar to find the closing )}
# The section should end with )} on its own line
lines_before_comparison = content[:comparison_start].rstrip().split('\n')
# Find the last line that is just ')}' - this closes the SITE-III conditional
for i in range(len(lines_before_comparison) - 1, -1, -1):
    if lines_before_comparison[i].strip() == ')}':
        old_section_end_line = i
        break

# Reconstruct to find exact end position
reconstructed = '\n'.join(lines_before_comparison[:old_section_end_line + 1])
old_section_end = len(reconstructed)

# Extract the actual old section
old_section_start = content.find(OLD_SECTION_START)
if old_section_start == -1:
    print("ERROR: Cannot locate exact section start")
    exit(1)

# Now find where it truly ends - look for the )} that closes this specific conditional
# Start from the section start and count braces
brace_count = 0
in_string = False
escape_next = False
pos = old_section_start

# Simple approach: find the pattern for end of SITE-III section
# It should be followed by comparison bar comment
for i, char in enumerate(content[old_section_start:]):
    if escape_next:
        escape_next = False
        continue
    if char == '\\\\':
        escape_next = True
        continue
    if char == '"' or char == "'":
        in_string = not in_string
        continue
    
    if not in_string:
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            # When we reach the top-level closing, check if next is newline then comment
            if brace_count == 0:
                potential_end = old_section_start + i + 1
                # Check if next content is whitespace then Comparison Bar comment
                remaining = content[potential_end:].lstrip()
                if remaining.startswith("// Comparison Bar Component") or \
                   remaining.startswith("const ComparisonBar"):
                    old_section_end = potential_end
                    break

print(f"OLD SECTION: {old_section_start} to {old_section_end}")
print(f"Old section length: {old_section_end - old_section_start} characters")
print(f"Old section preview (first 200 chars):")
print(content[old_section_start:old_section_start+200])
print("\n...")
print("\nOld section ending (last 200 chars):")
print(content[old_section_end-200:old_section_end])

# NEW SECTION - inline manufacturing overview (not in modal)
NEW_SECTION = """        {/* SITE-III Manufacturing & Cartridge Assembly Overview */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px'
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${siteData.color}, ${siteData.color}dd)`,
                color: 'white',
                borderRadius: '10px',
                padding: '8px 12px',
                fontWeight: '800',
                fontSize: '0.95em',
                letterSpacing: '0.5px',
                boxShadow: `0 4px 12px ${siteData.color}30`
              }}>
                ⚙️ MANUFACTURING & CARTRIDGE ASSEMBLY
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                border: '2px solid #0284c7',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '0.8em', fontWeight: '600', color: '#0c4a6e'}}>Clearances Approved</div>
                <div style={{fontSize: '1.3em', fontWeight: '800', color: '#0284c7', marginTop: '6px'}}>2,464</div>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0369a1', marginTop: '4px'}}>98.84%</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #e7e5ff, #c7d2fe)',
                border: '2px solid #4338ca',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '0.8em', fontWeight: '600', color: '#3730a3'}}>Closures Approved</div>
                <div style={{fontSize: '1.3em', fontWeight: '800', color: '#4338ca', marginTop: '6px'}}>2,491</div>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#4f46e5', marginTop: '4px'}}>99.68%</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                border: '2px solid #b45309',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '0.8em', fontWeight: '600', color: '#78350f'}}>Re-verifications Approved</div>
                <div style={{fontSize: '1.3em', fontWeight: '800', color: '#b45309', marginTop: '6px'}}>1,563</div>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#d97706', marginTop: '4px'}}>99.49%</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                border: '2px solid #15803d',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '0.8em', fontWeight: '600', color: '#153e1d'}}>Line Verifications</div>
                <div style={{fontSize: '1.3em', fontWeight: '800', color: '#15803d', marginTop: '6px'}}>156</div>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#16a34a', marginTop: '4px'}}>99.01%</div>
              </div>
            </div>

            {/* Device Categories */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '20px'
            }}>
              {/* Rapid Cell Lysis */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <div style={{
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75em',
                    fontWeight: '700'
                  }}>1</div>
                  <div style={{
                    fontSize: '0.9em',
                    fontWeight: '700',
                    color: '#1e293b'
                  }}>Rapid Cell Lysis (3 processes)</div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px'
                }}>
                  {[
                    {name: 'Cell lysis', clear: '2:56', close: '3:12', rev: '4:20'},
                    {name: 'Sample preparation', clear: '3:45', close: '2:30', rev: 'N/A'},
                    {name: 'Buffer addition', clear: '2:15', close: '2:08', rev: '3:00'}
                  ].map((proc, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '0.85em'
                    }}>
                      <div style={{fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>{proc.name}</div>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Clear:</span><br/><span style={{fontWeight: '700', color: '#4338ca'}}>{proc.clear}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Close:</span><br/><span style={{fontWeight: '700', color: '#0284c7'}}>{proc.close}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Rev:</span><br/><span style={{fontWeight: '700', color: '#b45309'}}>{proc.rev}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Bay PCR */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <div style={{
                    background: '#8b5cf6',
                    color: 'white',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75em',
                    fontWeight: '700'
                  }}>2</div>
                  <div style={{
                    fontSize: '0.9em',
                    fontWeight: '700',
                    color: '#1e293b'
                  }}>Two Bay PCR (9 processes)</div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px'
                }}>
                  {[
                    {name: 'PCR setup', clear: '5:30', close: '6:15', rev: '4:45'},
                    {name: 'Thermal cycling', clear: '7:20', close: '8:00', rev: '5:30'},
                    {name: 'Result validation', clear: '3:15', close: '4:20', rev: '3:45'},
                    {name: 'Data recording', clear: '2:45', close: '2:30', rev: 'N/A'},
                    {name: 'Sample cleanup', clear: '4:00', close: '3:50', rev: '2:45'},
                    {name: 'Calibration check', clear: '6:30', close: '5:45', rev: '4:30'},
                    {name: 'Equipment reset', clear: '3:20', close: '3:10', rev: '2:20'},
                    {name: 'Log verification', clear: '2:10', close: '2:05', rev: '1:55'},
                    {name: 'Final approval', clear: '2:50', close: '3:05', rev: '2:30'}
                  ].map((proc, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '0.85em'
                    }}>
                      <div style={{fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>{proc.name}</div>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Clear:</span><br/><span style={{fontWeight: '700', color: '#4338ca'}}>{proc.clear}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Close:</span><br/><span style={{fontWeight: '700', color: '#0284c7'}}>{proc.close}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Rev:</span><br/><span style={{fontWeight: '700', color: '#b45309'}}>{proc.rev}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sixteen Bay PCR */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <div style={{
                    background: '#ec4899',
                    color: 'white',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75em',
                    fontWeight: '700'
                  }}>3</div>
                  <div style={{
                    fontSize: '0.9em',
                    fontWeight: '700',
                    color: '#1e293b'
                  }}>Sixteen Bay PCR (3 processes)</div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px'
                }}>
                  {[
                    {name: 'Multi-lane setup', clear: '9:15', close: '10:20', rev: '6:30'},
                    {name: 'Parallel cycling', clear: '11:45', close: '12:30', rev: '7:45'},
                    {name: 'Multi-sample validation', clear: '8:20', close: '9:10', rev: '5:50'}
                  ].map((proc, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '0.85em'
                    }}>
                      <div style={{fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>{proc.name}</div>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Clear:</span><br/><span style={{fontWeight: '700', color: '#4338ca'}}>{proc.clear}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Close:</span><br/><span style={{fontWeight: '700', color: '#0284c7'}}>{proc.close}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Rev:</span><br/><span style={{fontWeight: '700', color: '#b45309'}}>{proc.rev}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extraction Device */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <div style={{
                    background: '#06b6d4',
                    color: 'white',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75em',
                    fontWeight: '700'
                  }}>4</div>
                  <div style={{
                    fontSize: '0.9em',
                    fontWeight: '700',
                    color: '#1e293b'
                  }}>Extraction Device (23 sub-assemblies)</div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px'
                }}>
                  {[
                    {name: 'Rotor assembly', clear: '4:30', close: '5:00', rev: '3:20'},
                    {name: 'Stator winding', clear: '6:45', close: '7:15', rev: '4:50'},
                    {name: 'Bearing installation', clear: '3:20', close: '3:50', rev: '2:45'},
                    {name: 'Shaft alignment', clear: '5:10', close: '5:30', rev: '3:45'},
                    {name: 'Sealing rings', clear: '2:50', close: '3:10', rev: '2:15'},
                    {name: 'Housing assembly', clear: '7:20', close: '8:00', rev: '5:30'},
                    {name: 'Electrical wiring', clear: '8:15', close: '9:00', rev: '6:20'},
                    {name: 'Connection verification', clear: '3:30', close: '3:45', rev: '2:50'},
                    {name: 'Pressure test', clear: '6:00', close: '6:30', rev: '4:15'},
                    {name: 'Vibration check', clear: '5:45', close: '6:15', rev: '4:00'},
                    {name: 'Temperature calibration', clear: '7:30', close: '8:15', rev: '5:45'},
                    {name: 'Speed verification', clear: '4:20', close: '4:50', rev: '3:15'},
                    {name: 'Noise testing', clear: '3:45', close: '4:10', rev: '2:55'},
                    {name: 'Leak detection', clear: '5:30', close: '6:00', rev: '4:10'},
                    {name: 'Surface finish', clear: '4:15', close: '4:45', rev: '3:10'},
                    {name: 'Coating application', clear: '9:00', close: '10:00', rev: '6:45'},
                    {name: 'Curing process', clear: '8:30', close: '9:30', rev: '6:15'},
                    {name: 'Final polishing', clear: '5:00', close: '5:30', rev: '3:45'},
                    {name: 'Dimension check', clear: '4:00', close: '4:20', rev: '2:50'},
                    {name: 'Assembly inspection', clear: '6:20', close: '7:00', rev: '5:00'},
                    {name: 'Documentation', clear: '3:10', close: '3:30', rev: '2:20'},
                    {name: 'Packaging preparation', clear: '4:50', close: '5:20', rev: '3:40'},
                    {name: 'QC final approval', clear: '5:15', close: '5:45', rev: '4:00'}
                  ].map((proc, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '0.85em'
                    }}>
                      <div style={{fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>{proc.name}</div>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Clear:</span><br/><span style={{fontWeight: '700', color: '#4338ca'}}>{proc.clear}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Close:</span><br/><span style={{fontWeight: '700', color: '#0284c7'}}>{proc.close}</span></div>
                        <div><span style={{color: '#0f172a', fontWeight: '600'}}>Rev:</span><br/><span style={{fontWeight: '700', color: '#b45309'}}>{proc.rev}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Improvements */}
            <div style={{marginTop: '24px'}}>
              <div style={{
                fontSize: '0.9em',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '2px solid #e2e8f0'
              }}>
                📈 Process Improvements (6 initiatives)
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                {[
                  {title: 'Automation Integration', status: '45%', color: '#3b82f6'},
                  {title: 'Time Reduction', status: '32%', color: '#8b5cf6'},
                  {title: 'Error Minimization', status: '28%', color: '#ec4899'},
                  {title: 'Quality Enhancement', status: '55%', color: '#06b6d4'},
                  {title: 'Staff Training', status: '71%', color: '#10b981'},
                  {title: 'Documentation', status: '89%', color: '#f59e0b'}
                ].map((init, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '12px'
                  }}>
                    <div style={{
                      fontSize: '0.8em',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '8px'
                    }}>{init.title}</div>
                    <div style={{
                      height: '6px',
                      background: '#f1f5f9',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: init.status,
                        background: init.color,
                        borderRadius: '3px'
                      }}></div>
                    </div>
                    <div style={{
                      marginTop: '6px',
                      fontSize: '0.75em',
                      fontWeight: '700',
                      color: init.color
                    }}>{init.status} Complete</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}"""

# Perform the replacement
new_content = content[:old_section_start] + NEW_SECTION + content[old_section_end:]

# Write back
with open('src/slides/IPQAOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Replacement successful!")
print(f"Old section: {old_section_end - old_section_start} characters")
print(f"New section: {len(NEW_SECTION)} characters")
print(f"Net change: {len(NEW_SECTION) - (old_section_end - old_section_start):+d} characters")


