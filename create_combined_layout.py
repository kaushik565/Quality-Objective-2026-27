#!/usr/bin/env python3
"""Create modern combined layout with aggregated device data and charts"""

# Read the entire file
with open('src/slides/IPQAOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the SITE-III section
start_marker = "{/* SITE-III Manufacturing & Cartridge Assembly Overview - Modern Dashboard */}"
start_idx = content.find(start_marker)

if start_idx == -1:
    print("ERROR: Cannot find SITE-III section marker")
    exit(1)

# Find where SITE-III closes (before Comparison Bar)
comparison_marker = "// Comparison Bar Component"
comparison_idx = content.find(comparison_marker)

if comparison_idx == -1:
    print("ERROR: Cannot find Comparison Bar marker")
    exit(1)

# Find the closing )} before Comparison Bar
lines_before = content[:comparison_idx].rstrip().split('\n')
for i in range(len(lines_before) - 1, -1, -1):
    if lines_before[i].strip() == ')}':
        end_line = i
        break

end_idx = len('\n'.join(lines_before[:end_line + 1]))

print(f"SITE-III section: {start_idx} to {end_idx}")

# NEW MODERN COMBINED LAYOUT
NEW_SECTION = """        {/* SITE-III Manufacturing & Cartridge Assembly Overview - Modern Dashboard */}
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
              marginBottom: '24px'
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
                ⚙️ MANUFACTURING OVERVIEW
              </div>
            </div>

            {/* Main KPI Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '28px'
            }}>
              {[
                {
                  label: 'Rapid Cell Lysis',
                  icon: '🧬',
                  processes: 3,
                  avgClear: '3:10',
                  avgClose: '3:29',
                  avgRev: '3:47',
                  approval: '99.2%',
                  color: '#3b82f6',
                  bgColor: '#eff6ff',
                  borderColor: '#3b82f6'
                },
                {
                  label: 'Two Bay PCR',
                  icon: '🔬',
                  processes: 9,
                  avgClear: '4:22',
                  avgClose: '4:49',
                  avgRev: '3:41',
                  approval: '99.5%',
                  color: '#8b5cf6',
                  bgColor: '#faf5ff',
                  borderColor: '#8b5cf6'
                },
                {
                  label: 'Sixteen Bay PCR',
                  icon: '⚡',
                  processes: 3,
                  avgClear: '9:27',
                  avgClose: '10:40',
                  avgRev: '6:42',
                  approval: '98.8%',
                  color: '#ec4899',
                  bgColor: '#fdf2f8',
                  borderColor: '#ec4899'
                },
                {
                  label: 'Extraction Device',
                  icon: '🔧',
                  processes: 23,
                  avgClear: '5:36',
                  avgClose: '6:16',
                  avgRev: '4:19',
                  approval: '99.1%',
                  color: '#06b6d4',
                  bgColor: '#ecf8fb',
                  borderColor: '#06b6d4'
                }
              ].map((device, idx) => (
                <div key={idx} style={{
                  background: device.bgColor,
                  border: `2px solid ${device.borderColor}`,
                  borderRadius: '14px',
                  padding: '18px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 20px ${device.color}20`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                    paddingBottom: '10px',
                    borderBottom: `2px solid ${device.borderColor}30`
                  }}>
                    <div style={{fontSize: '1.6em'}}>{device.icon}</div>
                    <div>
                      <div style={{
                        fontSize: '0.9em',
                        fontWeight: '800',
                        color: device.color
                      }}>{device.label}</div>
                      <div style={{
                        fontSize: '0.7em',
                        fontWeight: '600',
                        color: '#0f172a'
                      }}>{device.processes} processes</div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.5)'
                    }}>
                      <div style={{
                        fontSize: '0.7em',
                        fontWeight: '600',
                        color: '#0f172a',
                        marginBottom: '4px'
                      }}>Clearance</div>
                      <div style={{
                        fontSize: '0.9em',
                        fontWeight: '800',
                        color: '#4338ca'
                      }}>{device.avgClear}</div>
                    </div>
                    <div style={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.5)'
                    }}>
                      <div style={{
                        fontSize: '0.7em',
                        fontWeight: '600',
                        color: '#0f172a',
                        marginBottom: '4px'
                      }}>Closure</div>
                      <div style={{
                        fontSize: '0.9em',
                        fontWeight: '800',
                        color: '#0284c7'
                      }}>{device.avgClose}</div>
                    </div>
                    <div style={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.5)'
                    }}>
                      <div style={{
                        fontSize: '0.7em',
                        fontWeight: '600',
                        color: '#0f172a',
                        marginBottom: '4px'
                      }}>Re-Verification</div>
                      <div style={{
                        fontSize: '0.9em',
                        fontWeight: '800',
                        color: '#b45309'
                      }}>{device.avgRev}</div>
                    </div>
                    <div style={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.5)'
                    }}>
                      <div style={{
                        fontSize: '0.7em',
                        fontWeight: '600',
                        color: '#0f172a',
                        marginBottom: '4px'
                      }}>Approval Rate</div>
                      <div style={{
                        fontSize: '0.9em',
                        fontWeight: '800',
                        color: device.color
                      }}>{device.approval}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    height: '6px',
                    background: '#f1f5f9',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: device.approval.replace('%', ''),
                      background: `linear-gradient(90deg, ${device.color}, ${device.color}dd)`,
                      borderRadius: '3px',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Comparison Charts */}
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
              border: '1.5px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '0.95em',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '4px',
                  height: '20px',
                  background: siteData.color,
                  borderRadius: '2px'
                }}></div>
                Process Time Comparison
              </div>

              {/* Charts Grid - 3 columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {/* Clearance Times Chart */}
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: '0.85em',
                    fontWeight: '800',
                    color: '#4338ca',
                    marginBottom: '16px',
                    textAlign: 'center',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #e0e7ff'
                  }}>
                    ⏱️ Clearance Times
                  </div>
                  <div style={{height: '180px', position: 'relative', paddingBottom: '30px'}}>
                    {[
                      {name: 'Cell Lysis', time: 3.17, color: '#3b82f6'},
                      {name: 'PCR 2-Bay', time: 4.37, color: '#8b5cf6'},
                      {name: 'PCR 16-Bay', time: 9.27, color: '#ec4899'},
                      {name: 'Extraction', time: 5.60, color: '#06b6d4'}
                    ].map((item, i) => {
                      const maxTime = 10;
                      const height = (item.time / maxTime) * 100;
                      return (
                        <div key={i} style={{
                          display: 'inline-block',
                          width: '23%',
                          marginRight: i < 3 ? '2%' : '0',
                          height: '100%',
                          position: 'relative',
                          verticalAlign: 'bottom'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '5%',
                            right: '5%',
                            height: `${height}%`,
                            background: `linear-gradient(180deg, ${item.color}, ${item.color}dd)`,
                            borderRadius: '6px 6px 0 0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingTop: '6px',
                            fontSize: '0.7em',
                            fontWeight: '700',
                            color: '#ffffff',
                            boxShadow: `0 4px 8px ${item.color}30`
                          }}>
                            {item.time.toFixed(1)}m
                          </div>
                          <div style={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '0',
                            right: '0',
                            textAlign: 'center',
                            fontSize: '0.65em',
                            fontWeight: '700',
                            color: '#0f172a'
                          }}>
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Closure Times Chart */}
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: '0.85em',
                    fontWeight: '800',
                    color: '#0284c7',
                    marginBottom: '16px',
                    textAlign: 'center',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #cffafe'
                  }}>
                    🔒 Closure Times
                  </div>
                  <div style={{height: '180px', position: 'relative', paddingBottom: '30px'}}>
                    {[
                      {name: 'Cell Lysis', time: 3.50, color: '#3b82f6'},
                      {name: 'PCR 2-Bay', time: 4.82, color: '#8b5cf6'},
                      {name: 'PCR 16-Bay', time: 10.67, color: '#ec4899'},
                      {name: 'Extraction', time: 6.27, color: '#06b6d4'}
                    ].map((item, i) => {
                      const maxTime = 12;
                      const height = (item.time / maxTime) * 100;
                      return (
                        <div key={i} style={{
                          display: 'inline-block',
                          width: '23%',
                          marginRight: i < 3 ? '2%' : '0',
                          height: '100%',
                          position: 'relative',
                          verticalAlign: 'bottom'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '5%',
                            right: '5%',
                            height: `${height}%`,
                            background: `linear-gradient(180deg, ${item.color}, ${item.color}dd)`,
                            borderRadius: '6px 6px 0 0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingTop: '6px',
                            fontSize: '0.7em',
                            fontWeight: '700',
                            color: '#ffffff',
                            boxShadow: `0 4px 8px ${item.color}30`
                          }}>
                            {item.time.toFixed(1)}m
                          </div>
                          <div style={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '0',
                            right: '0',
                            textAlign: 'center',
                            fontSize: '0.65em',
                            fontWeight: '700',
                            color: '#0f172a'
                          }}>
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Re-Verification Times Chart */}
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: '0.85em',
                    fontWeight: '800',
                    color: '#b45309',
                    marginBottom: '16px',
                    textAlign: 'center',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #fef3c7'
                  }}>
                    ✓ Re-Verification Times
                  </div>
                  <div style={{height: '180px', position: 'relative', paddingBottom: '30px'}}>
                    {[
                      {name: 'Cell Lysis', time: 3.48, color: '#3b82f6'},
                      {name: 'PCR 2-Bay', time: 3.71, color: '#8b5cf6'},
                      {name: 'PCR 16-Bay', time: 6.42, color: '#ec4899'},
                      {name: 'Extraction', time: 4.19, color: '#06b6d4'}
                    ].map((item, i) => {
                      const maxTime = 8;
                      const height = (item.time / maxTime) * 100;
                      return (
                        <div key={i} style={{
                          display: 'inline-block',
                          width: '23%',
                          marginRight: i < 3 ? '2%' : '0',
                          height: '100%',
                          position: 'relative',
                          verticalAlign: 'bottom'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '5%',
                            right: '5%',
                            height: `${height}%`,
                            background: `linear-gradient(180deg, ${item.color}, ${item.color}dd)`,
                            borderRadius: '6px 6px 0 0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingTop: '6px',
                            fontSize: '0.7em',
                            fontWeight: '700',
                            color: '#ffffff',
                            boxShadow: `0 4px 8px ${item.color}30`
                          }}>
                            {item.time.toFixed(1)}m
                          </div>
                          <div style={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '0',
                            right: '0',
                            textAlign: 'center',
                            fontSize: '0.65em',
                            fontWeight: '700',
                            color: '#0f172a'
                          }}>
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              border: '2px solid #86efac',
              borderRadius: '14px',
              padding: '16px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px'
              }}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2em', fontWeight: '800', color: '#15803d'}}>4</div>
                  <div style={{fontSize: '0.8em', fontWeight: '600', color: '#166534'}}>Device Categories</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2em', fontWeight: '800', color: '#15803d'}}>38+</div>
                  <div style={{fontSize: '0.8em', fontWeight: '600', color: '#166534'}}>Total Processes</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2em', fontWeight: '800', color: '#15803d'}}>99.1%</div>
                  <div style={{fontSize: '0.8em', fontWeight: '600', color: '#166534'}}>Avg Approval Rate</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2em', fontWeight: '800', color: '#15803d'}}>5:38m</div>
                  <div style={{fontSize: '0.8em', fontWeight: '600', color: '#166534'}}>Avg Clearance Time</div>
                </div>
              </div>
            </div>
          </div>
        )}"""

# Perform replacement
new_content = content[:start_idx] + NEW_SECTION + content[end_idx:]

# Write back
with open('src/slides/IPQAOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Modern combined layout created successfully!")
print(f"Old section: {end_idx - start_idx} characters")
print(f"New section: {len(NEW_SECTION)} characters")
print(f"Net change: {len(NEW_SECTION) - (end_idx - start_idx):+d} characters")


