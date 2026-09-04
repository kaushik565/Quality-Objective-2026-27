#!/usr/bin/env python3
"""Create complete SITE-III dashboard with Manufacturing AND Cartridge Assembly combined"""

with open('src/slides/IPQAOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find SITE-III section start and end
start_marker = "{/* SITE-III Operational Activity Overview */}"
start_idx = content.find(start_marker)

if start_idx == -1:
    print("ERROR: Cannot find SITE-III marker")
    exit(1)

comp_idx = content.find("// Comparison Bar Component")
if comp_idx == -1:
    print("ERROR: Cannot find Comparison Bar")
    exit(1)

lines_before = content[:comp_idx].rstrip().split('\n')
for i in range(len(lines_before) - 1, -1, -1):
    if lines_before[i].strip() == ')}':
        end_line = i
        break

end_idx = len('\n'.join(lines_before[:end_line + 1]))

# COMPLETE DASHBOARD - Manufacturing + Cartridge in one
DASHBOARD = """        {/* SITE-III Manufacturing & Cartridge Assembly Overview - Modern Dashboard */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* ===== MANUFACTURING SECTION ===== */}
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

            {/* Manufacturing KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '28px'
            }}>
              {[
                {label: 'Rapid Cell Lysis', icon: '🧬', processes: 3, avgClear: '3:10', avgClose: '3:29', avgRev: '3:47', approval: '99.2%', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6'},
                {label: 'Two Bay PCR', icon: '🔬', processes: 9, avgClear: '4:22', avgClose: '4:49', avgRev: '3:41', approval: '99.5%', color: '#8b5cf6', bgColor: '#faf5ff', borderColor: '#8b5cf6'},
                {label: 'Sixteen Bay PCR', icon: '⚡', processes: 3, avgClear: '9:27', avgClose: '10:40', avgRev: '6:42', approval: '98.8%', color: '#ec4899', bgColor: '#fdf2f8', borderColor: '#ec4899'},
                {label: 'Extraction Device', icon: '🔧', processes: 23, avgClear: '5:36', avgClose: '6:16', avgRev: '4:19', approval: '99.1%', color: '#06b6d4', bgColor: '#ecf8fb', borderColor: '#06b6d4'}
              ].map((device, idx) => (
                <div key={idx} style={{background: device.bgColor, border: `2px solid ${device.borderColor}`, borderRadius: '14px', padding: '18px', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = `0 8px 20px ${device.color}20`; e.currentTarget.style.transform = 'translateY(-4px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '10px', borderBottom: `2px solid ${device.borderColor}30`}}>
                    <div style={{fontSize: '1.6em'}}>{device.icon}</div>
                    <div><div style={{fontSize: '0.9em', fontWeight: '800', color: device.color}}>{device.label}</div><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a'}}>{device.processes} processes</div></div>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px'}}>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a', marginBottom: '4px'}}>Clearance</div><div style={{fontSize: '0.9em', fontWeight: '800', color: '#4338ca'}}>{device.avgClear}</div></div>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a', marginBottom: '4px'}}>Closure</div><div style={{fontSize: '0.9em', fontWeight: '800', color: '#0284c7'}}>{device.avgClose}</div></div>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a', marginBottom: '4px'}}>Re-Verification</div><div style={{fontSize: '0.9em', fontWeight: '800', color: '#b45309'}}>{device.avgRev}</div></div>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a', marginBottom: '4px'}}>Approval Rate</div><div style={{fontSize: '0.9em', fontWeight: '800', color: device.color}}>{device.approval}</div></div>
                  </div>
                  <div style={{height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden'}}><div style={{height: '100%', width: device.approval.replace('%', ''), background: `linear-gradient(90deg, ${device.color}, ${device.color}dd)`, borderRadius: '3px', transition: 'width 0.5s ease'}}></div></div>
                </div>
              ))}
            </div>

            {/* Process Time Comparison Charts */}
            <div style={{background: 'linear-gradient(135deg, #f8fafc, #ffffff)', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginBottom: '28px'}}>
              <div style={{fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{width: '4px', height: '20px', background: siteData.color, borderRadius: '2px'}}></div>Process Time Comparison</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
                {[
                  {title: '⏱️ Clearance Times', items: [{name: 'Cell Lysis', time: 3.17, color: '#3b82f6'}, {name: 'PCR 2-Bay', time: 4.37, color: '#8b5cf6'}, {name: 'PCR 16-Bay', time: 9.27, color: '#ec4899'}, {name: 'Extraction', time: 5.60, color: '#06b6d4'}], maxTime: 10},
                  {title: '🔒 Closure Times', items: [{name: 'Cell Lysis', time: 3.50, color: '#3b82f6'}, {name: 'PCR 2-Bay', time: 4.82, color: '#8b5cf6'}, {name: 'PCR 16-Bay', time: 10.67, color: '#ec4899'}, {name: 'Extraction', time: 6.27, color: '#06b6d4'}], maxTime: 12},
                  {title: '✓ Re-Verification Times', items: [{name: 'Cell Lysis', time: 3.48, color: '#3b82f6'}, {name: 'PCR 2-Bay', time: 3.71, color: '#8b5cf6'}, {name: 'PCR 16-Bay', time: 6.42, color: '#ec4899'}, {name: 'Extraction', time: 4.19, color: '#06b6d4'}], maxTime: 8}
                ].map((chart, cidx) => (
                  <div key={cidx} style={{background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                    <div style={{fontSize: '0.85em', fontWeight: '800', color: '#1e293b', marginBottom: '16px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #e2e8f0'}}>{chart.title}</div>
                    <div style={{height: '180px', position: 'relative', paddingBottom: '30px'}}>
                      {chart.items.map((item, i) => {
                        const height = (item.time / chart.maxTime) * 100;
                        return (
                          <div key={i} style={{display: 'inline-block', width: '23%', marginRight: i < 3 ? '2%' : '0', height: '100%', position: 'relative', verticalAlign: 'bottom'}}>
                            <div style={{position: 'absolute', bottom: '30px', left: '5%', right: '5%', height: `${height}%`, background: `linear-gradient(180deg, ${item.color}, ${item.color}dd)`, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '6px', fontSize: '0.7em', fontWeight: '700', color: '#ffffff', boxShadow: `0 4px 8px ${item.color}30`}}>{item.time.toFixed(1)}m</div>
                            <div style={{position: 'absolute', bottom: '5px', left: '0', right: '0', textAlign: 'center', fontSize: '0.65em', fontWeight: '700', color: '#0f172a'}}>{item.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== CARTRIDGE ASSEMBLY SECTION ===== */}
            <div style={{marginTop: '32px', paddingTop: '24px', borderTop: `3px solid ${siteData.color}40`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
                <div style={{background: `linear-gradient(135deg, #10b981, #059669)`, color: 'white', borderRadius: '10px', padding: '8px 12px', fontWeight: '800', fontSize: '0.95em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'}}>
                  📦 CARTRIDGE ASSEMBLY & PACKAGING
                </div>
              </div>

              {/* Assembly Stages */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px'}}>
                {[
                  {stage: 'Component Prep', icon: '🔧', tasks: 8, avgTime: '5:45', status: 'Optimized', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6', approval: '99.4%'},
                  {stage: 'Assembly', icon: '⚙️', tasks: 12, avgTime: '8:20', status: 'On-track', color: '#8b5cf6', bgColor: '#faf5ff', borderColor: '#8b5cf6', approval: '99.2%'},
                  {stage: 'QC & Testing', icon: '✓', tasks: 6, avgTime: '4:30', status: 'Excellent', color: '#10b981', bgColor: '#f0fdf4', borderColor: '#10b981', approval: '99.8%'},
                  {stage: 'Packaging', icon: '📋', tasks: 5, avgTime: '3:15', status: 'Complete', color: '#f59e0b', bgColor: '#fffbeb', borderColor: '#f59e0b', approval: '99.6%'}
                ].map((stage, idx) => (
                  <div key={idx} style={{background: stage.bgColor, border: `2px solid ${stage.borderColor}`, borderRadius: '14px', padding: '18px', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = `0 8px 20px ${stage.color}20`; e.currentTarget.style.transform = 'translateY(-4px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '10px', borderBottom: `2px solid ${stage.borderColor}30`}}>
                      <div style={{fontSize: '1.6em'}}>{stage.icon}</div>
                      <div><div style={{fontSize: '0.9em', fontWeight: '800', color: stage.color}}>{stage.stage}</div><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a'}}>{stage.tasks} tasks</div></div>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px'}}>
                      <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a', marginBottom: '4px'}}>Avg Time</div><div style={{fontSize: '0.9em', fontWeight: '800', color: stage.color}}>{stage.avgTime}</div></div>
                      <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#0f172a', marginBottom: '4px'}}>Approval</div><div style={{fontSize: '0.9em', fontWeight: '800', color: stage.color}}>{stage.approval}</div></div>
                    </div>
                    <div><div style={{display: 'inline-block', background: stage.color, color: 'white', fontSize: '0.65em', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', marginBottom: '8px'}}>{stage.status}</div><div style={{height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', marginTop: '8px'}}><div style={{height: '100%', width: stage.approval.replace('%', ''), background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)`, borderRadius: '3px'}}></div></div></div>
                  </div>
                ))}
              </div>

              {/* Assembly Quality Summary */}
              <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '14px', padding: '16px'}}>
                <div style={{fontSize: '0.9em', fontWeight: '800', color: '#78350f', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>📊 Quality Metrics</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px'}}>
                  {[{metric: 'Defect Rate', value: '0.3%', trend: '↓'}, {metric: 'On-Time Delivery', value: '98.9%', trend: '↑'}, {metric: 'Rework Required', value: '1.2%', trend: '↓'}, {metric: 'Customer Satisfaction', value: '4.8/5', trend: '↑'}].map((item, i) => (
                    <div key={i} style={{background: 'white', borderRadius: '8px', padding: '12px', textAlign: 'center'}}><div style={{fontSize: '0.75em', fontWeight: '600', color: '#78350f', marginBottom: '6px'}}>{item.metric}</div><div style={{fontSize: '1.1em', fontWeight: '800', color: '#b45309', marginBottom: '4px'}}>{item.value}</div><div style={{fontSize: '0.8em', fontWeight: '700', color: item.trend.includes('↑') ? '#10b981' : '#ef4444'}}>{item.trend}</div></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}"""

new_content = content[:start_idx] + DASHBOARD + content[end_idx:]

with open('src/slides/IPQAOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Complete dashboard created successfully!")
print(f"Replaced {end_idx - start_idx} characters with {len(DASHBOARD)} characters")


