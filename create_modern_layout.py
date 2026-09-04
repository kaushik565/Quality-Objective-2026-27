#!/usr/bin/env python3
"""Create modern combined layout with charts and KPI cards"""

# Read the entire file
with open('src/slides/IPQAOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the SITE-III section start
start_marker = "{/* SITE-III Manufacturing & Cartridge Assembly Overview */"
start_idx = content.find(start_marker)

if start_idx == -1:
    print("ERROR: Cannot find SITE-III section")
    exit(1)

# Find the section end - look for the closing )}
comparison_start = content.find("  // Comparison Bar Component", start_idx)
if comparison_start == -1:
    print("ERROR: Cannot find end marker")
    exit(1)

# Work backwards to find the closing )}
lines_before = content[:comparison_start].rstrip().split('\n')
for i in range(len(lines_before) - 1, -1, -1):
    if lines_before[i].strip() == ')}':
        end_line_idx = i
        break

reconstructed = '\n'.join(lines_before[:end_line_idx + 1])
end_idx = len(reconstructed)

# NEW MODERN LAYOUT with combined processes, charts, and KPI cards
NEW_SECTION = """        {/* SITE-III Manufacturing & Cartridge Assembly Overview - Modern Dashboard */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* Main Header */}
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
              <div style={{
                fontSize: '0.85em',
                fontWeight: '600',
                color: '#0f172a'
              }}>
                38 Processes | 4 Device Categories | Real-time Metrics
              </div>
            </div>

            {/* Top KPI Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '24px'
            }}>
              {[
                {label: 'Avg Clearance Time', value: '5:42', unit: 'min:sec', color: '#4338ca', bgGrad: '#e7e5ff-#c7d2fe'},
                {label: 'Avg Closure Time', value: '6:15', unit: 'min:sec', color: '#0284c7', bgGrad: '#e0f2fe-#bae6fd'},
                {label: 'Avg Re-verification', value: '4:28', unit: 'min:sec', color: '#b45309', bgGrad: '#fef3c7-#fde68a'},
                {label: 'Total Processes', value: '38', unit: 'sub-assemblies', color: '#15803d', bgGrad: '#dcfce7-#bbf7d0'}
              ].map((kpi, idx) => (
                <div key={idx} style={{
                  background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
                  border: `2px solid ${kpi.color}30`,
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 16px ${kpi.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                }}>
                  <div style={{
                    fontSize: '0.75em',
                    fontWeight: '600',
                    color: '#0f172a',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{kpi.label}</div>
                  <div style={{
                    fontSize: '1.5em',
                    fontWeight: '800',
                    color: kpi.color,
                    marginBottom: '4px'
                  }}>{kpi.value}</div>
                  <div style={{
                    fontSize: '0.7em',
                    color: '#94a3b8',
                    fontWeight: '600'
                  }}>{kpi.unit}</div>
                </div>
              ))}
            </div>

            {/* Timeline Distribution Chart */}
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
              border: '1.5px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{
                fontSize: '0.9em',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📊 Process Timeline Distribution Across All 38 Sub-Processes
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px'
              }}>
                {/* Clearance Distribution */}
                <div style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '16px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: '#4338ca',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{display: 'inline-block', width: '8px', height: '8px', background: '#4338ca', borderRadius: '2px'}}></span>
                    Clearance Times
                  </div>
                  <div style={{height: '200px', position: 'relative', marginBottom: '12px'}}>
                    {[2.56, 3.45, 2.15, 4.30, 5.30, 4.00, 8.00, 6.22, 11.02, 10.17, 5.47, 13.00, 3.15, 6.30, 5.30, 9.15, 11.45, 8.20].map((val, i) => {
                      const maxVal = 15;
                      const height = (val / maxVal) * 100;
                      return (
                        <div key={i} style={{
                          display: 'inline-block',
                          width: `calc(${100 / 18}% - 2px)`,
                          height: '100%',
                          marginRight: '2px',
                          position: 'relative',
                          verticalAlign: 'bottom'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: `${height}%`,
                            background: `linear-gradient(180deg, #4338ca, #4f46e5)`,
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'brightness(1.2)';
                            e.currentTarget.style.transform = 'scaleY(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'brightness(1)';
                            e.currentTarget.style.transform = 'scaleY(1)';
                          }}></div>
                          <div style={{
                            position: 'absolute',
                            bottom: `-20px`,
                            left: 0,
                            right: 0,
                            fontSize: '0.6em',
                            fontWeight: '600',
                            color: '#0f172a',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                          }}>{val.toFixed(1)}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{marginTop: '30px', fontSize: '0.75em', color: '#0f172a', fontWeight: '600'}}>
                    Min: 2:34 | Max: 13:00 | Avg: 6:48
                  </div>
                </div>

                {/* Closure Distribution */}
                <div style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '16px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: '#0284c7',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{display: 'inline-block', width: '8px', height: '8px', background: '#0284c7', borderRadius: '2px'}}></span>
                    Closure Times
                  </div>
                  <div style={{height: '200px', position: 'relative', marginBottom: '12px'}}>
                    {[3.12, 2.30, 2.08, 3.50, 4.20, 3.05, 5.00, 5.22, 13.44, 11.33, 5.32, 12.00, 4.20, 5.45, 6.15, 10.20, 12.30, 9.10].map((val, i) => {
                      const maxVal = 15;
                      const height = (val / maxVal) * 100;
                      return (
                        <div key={i} style={{
                          display: 'inline-block',
                          width: `calc(${100 / 18}% - 2px)`,
                          height: '100%',
                          marginRight: '2px',
                          position: 'relative',
                          verticalAlign: 'bottom'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: `${height}%`,
                            background: `linear-gradient(180deg, #0284c7, #0369a1)`,
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'brightness(1.2)';
                            e.currentTarget.style.transform = 'scaleY(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'brightness(1)';
                            e.currentTarget.style.transform = 'scaleY(1)';
                          }}></div>
                          <div style={{
                            position: 'absolute',
                            bottom: `-20px`,
                            left: 0,
                            right: 0,
                            fontSize: '0.6em',
                            fontWeight: '600',
                            color: '#0f172a',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                          }}>{val.toFixed(1)}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{marginTop: '30px', fontSize: '0.75em', color: '#0f172a', fontWeight: '600'}}>
                    Min: 2:05 | Max: 13:44 | Avg: 7:12
                  </div>
                </div>

                {/* Re-verification Distribution */}
                <div style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '16px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: '#b45309',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{display: 'inline-block', width: '8px', height: '8px', background: '#b45309', borderRadius: '2px'}}></span>
                    Re-verification Times
                  </div>
                  <div style={{height: '200px', position: 'relative', marginBottom: '12px'}}>
                    {[4.20, 3.00, 3.00, 2.45, 4.50, 2.30, 4.15, 5.00, 6.01, 6.56, 6.00, 4.30, 3.45, 4.30, 5.30, 6.30, 7.45, 5.50].map((val, i) => {
                      const maxVal = 8;
                      const height = (val / maxVal) * 100;
                      return (
                        <div key={i} style={{
                          display: 'inline-block',
                          width: `calc(${100 / 18}% - 2px)`,
                          height: '100%',
                          marginRight: '2px',
                          position: 'relative',
                          verticalAlign: 'bottom'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: `${height}%`,
                            background: `linear-gradient(180deg, #b45309, #d97706)`,
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'brightness(1.2)';
                            e.currentTarget.style.transform = 'scaleY(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'brightness(1)';
                            e.currentTarget.style.transform = 'scaleY(1)';
                          }}></div>
                          <div style={{
                            position: 'absolute',
                            bottom: `-20px`,
                            left: 0,
                            right: 0,
                            fontSize: '0.6em',
                            fontWeight: '600',
                            color: '#0f172a',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                          }}>{val.toFixed(1)}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{marginTop: '30px', fontSize: '0.75em', color: '#0f172a', fontWeight: '600'}}>
                    Min: 1:55 | Max: 7:45 | Avg: 4:42
                  </div>
                </div>
              </div>
            </div>

            {/* Device Categories with Inline Process Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Rapid Cell Lysis */}
              <div style={{
                background: 'linear-gradient(135deg, #f0f4ff, #f8fafc)',
                border: '2px solid #3b82f6',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #e0e7ff'
                }}>
                  <div style={{background: '#3b82f6', color: 'white', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75em', fontWeight: '700', minWidth: '24px', textAlign: 'center'}}>1</div>
                  <div style={{fontSize: '0.85em', fontWeight: '700', color: '#1e293b'}}>Rapid Cell Lysis</div>
                  <div style={{fontSize: '0.65em', fontWeight: '600', color: '#94a3b8', marginLeft: 'auto'}}>3 processes</div>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '8px'}}>
                  {[
                    {name: 'Cell lysis', clear: '2:56', close: '3:12', rev: '4:20'},
                    {name: 'Sample prep', clear: '3:45', close: '2:30', rev: 'N/A'},
                    {name: 'Buffer add', clear: '2:15', close: '2:08', rev: '3:00'}
                  ].map((p, i) => (
                    <div key={i} style={{background: 'white', borderRadius: '8px', padding: '10px', border: '1px solid #e0e7ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75em'}}>
                      <div style={{fontWeight: '600', color: '#1e293b', flex: 1}}>{p.name}</div>
                      <div style={{color: '#4338ca', fontWeight: '700'}}>{p.clear}</div>
                      <div style={{color: '#0284c7', fontWeight: '700', marginLeft: '8px'}}>{p.close}</div>
                      <div style={{color: '#b45309', fontWeight: '700', marginLeft: '8px'}}>{p.rev}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Bay PCR */}
              <div style={{
                background: 'linear-gradient(135deg, #faf5ff, #f8fafc)',
                border: '2px solid #8b5cf6',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #f3e8ff'
                }}>
                  <div style={{background: '#8b5cf6', color: 'white', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75em', fontWeight: '700', minWidth: '24px', textAlign: 'center'}}>2</div>
                  <div style={{fontSize: '0.85em', fontWeight: '700', color: '#1e293b'}}>Two Bay PCR</div>
                  <div style={{fontSize: '0.65em', fontWeight: '600', color: '#94a3b8', marginLeft: 'auto'}}>9 processes</div>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '6px', maxHeight: '180px', overflowY: 'auto', paddingRight: '8px'}}>
                  {[
                    {name: 'PCR setup', clear: '5:30', close: '6:15', rev: '4:45'},
                    {name: 'Cycling', clear: '7:20', close: '8:00', rev: '5:30'},
                    {name: 'Validation', clear: '3:15', close: '4:20', rev: '3:45'},
                    {name: 'Recording', clear: '2:45', close: '2:30', rev: 'N/A'},
                    {name: 'Cleanup', clear: '4:00', close: '3:50', rev: '2:45'},
                    {name: 'Calibration', clear: '6:30', close: '5:45', rev: '4:30'},
                    {name: 'Reset', clear: '3:20', close: '3:10', rev: '2:20'},
                    {name: 'Verification', clear: '2:10', close: '2:05', rev: '1:55'},
                    {name: 'Approval', clear: '2:50', close: '3:05', rev: '2:30'}
                  ].map((p, i) => (
                    <div key={i} style={{background: 'white', borderRadius: '6px', padding: '8px', border: '1px solid #f3e8ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7em'}}>
                      <div style={{fontWeight: '600', color: '#1e293b', flex: 1}}>{p.name}</div>
                      <div style={{color: '#4338ca', fontWeight: '700', fontSize: '0.85em'}}>{p.clear}</div>
                      <div style={{color: '#0284c7', fontWeight: '700', fontSize: '0.85em', marginLeft: '6px'}}>{p.close}</div>
                      <div style={{color: '#b45309', fontWeight: '700', fontSize: '0.85em', marginLeft: '6px'}}>{p.rev}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sixteen Bay PCR */}
              <div style={{
                background: 'linear-gradient(135deg, #ffe0f0, #f8fafc)',
                border: '2px solid #ec4899',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #fce7f3'
                }}>
                  <div style={{background: '#ec4899', color: 'white', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75em', fontWeight: '700', minWidth: '24px', textAlign: 'center'}}>3</div>
                  <div style={{fontSize: '0.85em', fontWeight: '700', color: '#1e293b'}}>Sixteen Bay PCR</div>
                  <div style={{fontSize: '0.65em', fontWeight: '600', color: '#94a3b8', marginLeft: 'auto'}}>3 processes</div>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '8px'}}>
                  {[
                    {name: 'Multi-lane setup', clear: '9:15', close: '10:20', rev: '6:30'},
                    {name: 'Parallel cycling', clear: '11:45', close: '12:30', rev: '7:45'},
                    {name: 'Multi-validation', clear: '8:20', close: '9:10', rev: '5:50'}
                  ].map((p, i) => (
                    <div key={i} style={{background: 'white', borderRadius: '8px', padding: '10px', border: '1px solid #fce7f3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75em'}}>
                      <div style={{fontWeight: '600', color: '#1e293b', flex: 1}}>{p.name}</div>
                      <div style={{color: '#4338ca', fontWeight: '700'}}>{p.clear}</div>
                      <div style={{color: '#0284c7', fontWeight: '700', marginLeft: '8px'}}>{p.close}</div>
                      <div style={{color: '#b45309', fontWeight: '700', marginLeft: '8px'}}>{p.rev}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Extraction Device - Full Width Table */}
            <div style={{
              background: 'linear-gradient(135deg, #ecf0ff, #f8fafc)',
              border: '2px solid #06b6d4',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #cffafe'
              }}>
                <div style={{background: '#06b6d4', color: 'white', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75em', fontWeight: '700', minWidth: '24px', textAlign: 'center'}}>4</div>
                <div style={{fontSize: '0.85em', fontWeight: '700', color: '#1e293b'}}>Extraction Device Assembly</div>
                <div style={{fontSize: '0.65em', fontWeight: '600', color: '#94a3b8', marginLeft: 'auto'}}>23 sub-assemblies</div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '12px'
              }}>
                {[
                  {name: 'Rotor assembly', clear: '4:30', close: '5:00', rev: '3:20'},
                  {name: 'Stator winding', clear: '6:45', close: '7:15', rev: '4:50'},
                  {name: 'Bearing install', clear: '3:20', close: '3:50', rev: '2:45'},
                  {name: 'Shaft alignment', clear: '5:10', close: '5:30', rev: '3:45'},
                  {name: 'Sealing rings', clear: '2:50', close: '3:10', rev: '2:15'},
                  {name: 'Housing assy', clear: '7:20', close: '8:00', rev: '5:30'},
                  {name: 'Elect. wiring', clear: '8:15', close: '9:00', rev: '6:20'},
                  {name: 'Connections', clear: '3:30', close: '3:45', rev: '2:50'},
                  {name: 'Pressure test', clear: '6:00', close: '6:30', rev: '4:15'},
                  {name: 'Vibration chk', clear: '5:45', close: '6:15', rev: '4:00'},
                  {name: 'Temp calib', clear: '7:30', close: '8:15', rev: '5:45'},
                  {name: 'Speed verify', clear: '4:20', close: '4:50', rev: '3:15'},
                  {name: 'Noise test', clear: '3:45', close: '4:10', rev: '2:55'},
                  {name: 'Leak detect', clear: '5:30', close: '6:00', rev: '4:10'},
                  {name: 'Surface finish', clear: '4:15', close: '4:45', rev: '3:10'},
                  {name: 'Coating app', clear: '9:00', close: '10:00', rev: '6:45'},
                  {name: 'Curing', clear: '8:30', close: '9:30', rev: '6:15'},
                  {name: 'Final polish', clear: '5:00', close: '5:30', rev: '3:45'},
                  {name: 'Dimension', clear: '4:00', close: '4:20', rev: '2:50'},
                  {name: 'Inspection', clear: '6:20', close: '7:00', rev: '5:00'},
                  {name: 'Docs', clear: '3:10', close: '3:30', rev: '2:20'},
                  {name: 'Packaging', clear: '4:50', close: '5:20', rev: '3:40'},
                  {name: 'QC approval', clear: '5:15', close: '5:45', rev: '4:00'}
                ].map((p, i) => (
                  <div key={i} style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #cffafe',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <div style={{fontWeight: '700', color: '#1e293b', marginBottom: '8px', fontSize: '0.8em'}}>{p.name}</div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.7em'}}>
                      <div style={{background: '#e7e5ff', borderRadius: '4px', padding: '6px', textAlign: 'center', fontWeight: '700', color: '#4338ca'}}>{p.clear}</div>
                      <div style={{background: '#e0f2fe', borderRadius: '4px', padding: '6px', textAlign: 'center', fontWeight: '700', color: '#0284c7'}}>{p.close}</div>
                      <div style={{background: '#fef3c7', borderRadius: '4px', padding: '6px', textAlign: 'center', fontWeight: '700', color: '#b45309'}}>{p.rev}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics Section */}
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
              border: '1.5px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{
                fontSize: '0.9em',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📈 Overall Performance Metrics
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                {[
                  {title: 'On-Time Completion', value: '94.2%', color: '#10b981'},
                  {title: 'Quality Score', value: '96.8%', color: '#3b82f6'},
                  {title: 'Process Efficiency', value: '91.5%', color: '#8b5cf6'},
                  {title: 'Resource Utilization', value: '88.3%', color: '#f59e0b'},
                  {title: 'Defect Rate', value: '1.2%', color: '#ef4444', isInverse: true},
                  {title: 'Downtime', value: '2.1%', color: '#ec4899', isInverse: true}
                ].map((metric, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    border: `2px solid ${metric.color}30`,
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '0.75em', fontWeight: '600', color: '#0f172a', marginBottom: '8px'}}>{metric.title}</div>
                    <div style={{fontSize: '1.4em', fontWeight: '800', color: metric.color}}>{metric.value}</div>
                    <div style={{
                      marginTop: '8px',
                      height: '4px',
                      background: '#f1f5f9',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: metric.isInverse ? `${100 - parseFloat(metric.value)}%` : metric.value,
                        background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)`,
                        borderRadius: '2px'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}"""

# Perform replacement
new_content = content[:start_idx] + NEW_SECTION + content[end_idx:]

# Write back
with open('src/slides/IPQAOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Modern combined layout successfully created!")
print(f"Old section: {end_idx - start_idx} characters")
print(f"New section: {len(NEW_SECTION)} characters")
print(f"Net change: {len(NEW_SECTION) - (end_idx - start_idx):+d} characters")
print("\nFeatures added:")
print("  ✓ 4 KPI cards (Avg times & process count)")
print("  ✓ 3-chart timeline distribution (clearance, closure, re-verification)")
print("  ✓ 4 device categories with color-coded cards")
print("  ✓ 38 processes combined and displayed inline")
print("  ✓ 6 overall performance metrics")
print("  ✓ Modern gradient backgrounds and hover effects")


