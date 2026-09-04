#!/usr/bin/env python3
"""Add Cartridge Assembly section after Manufacturing"""

with open('src/slides/IPQAOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

comparison_marker = "// Comparison Bar Component"
comparison_idx = content.find(comparison_marker)

if comparison_idx == -1:
    print("ERROR: Cannot find Comparison Bar marker")
    exit(1)

lines_before = content[:comparison_idx].rstrip().split('\n')
for i in range(len(lines_before) - 1, -1, -1):
    if lines_before[i].strip() == ')}':
        end_line = i
        break

end_idx = len('\n'.join(lines_before[:end_line + 1]))

CARTRIDGE_SECTION = """
            {/* Cartridge Assembly & Packaging Section */}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: `3px solid ${siteData.color}40`,
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  background: `linear-gradient(135deg, #10b981, #059669)`,
                  color: 'white',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontWeight: '800',
                  fontSize: '0.95em',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  📦 CARTRIDGE ASSEMBLY & PACKAGING
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '28px'
              }}>
                {[
                  {stage: 'Component Preparation', icon: '🔧', tasks: 8, avgTime: '5:45', status: 'Optimized', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6', approval: '99.4%'},
                  {stage: 'Assembly Process', icon: '⚙️', tasks: 12, avgTime: '8:20', status: 'On-track', color: '#8b5cf6', bgColor: '#faf5ff', borderColor: '#8b5cf6', approval: '99.2%'},
                  {stage: 'Quality Verification', icon: '✓', tasks: 6, avgTime: '4:30', status: 'Excellent', color: '#10b981', bgColor: '#f0fdf4', borderColor: '#10b981', approval: '99.8%'},
                  {stage: 'Packaging & Labeling', icon: '📋', tasks: 5, avgTime: '3:15', status: 'Complete', color: '#f59e0b', bgColor: '#fffbeb', borderColor: '#f59e0b', approval: '99.6%'}
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

              <div style={{background: 'linear-gradient(135deg, #f8fafc, #ffffff)', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginBottom: '20px'}}>
                <div style={{fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{width: '4px', height: '20px', background: '#10b981', borderRadius: '2px'}}></div>Assembly Flow & Timeline</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px'}}>
                  {[
                    {title: 'Step 1: Parts Inspection', description: 'Verify all components quality', time: '2:30m', items: ['Dimension Check', 'Material Verification', 'Surface Inspection'], color: '#3b82f6'},
                    {title: 'Step 2: Assembly & Alignment', description: 'Assemble cartridge components', time: '5:45m', items: ['Component Assembly', 'Alignment Verification', 'Torque Testing'], color: '#8b5cf6'},
                    {title: 'Step 3: Function Testing', description: 'Validate all functions', time: '3:20m', items: ['Pressure Test', 'Flow Rate Check', 'Safety Verification'], color: '#10b981'},
                    {title: 'Step 4: Final Packaging', description: 'Prepare for shipment', time: '2:15m', items: ['Protective Wrapping', 'Label Application', 'Box Sealing'], color: '#f59e0b'}
                  ].map((step, idx) => (
                    <div key={idx} style={{background: 'white', border: `2px solid ${step.color}30`, borderRadius: '12px', padding: '16px', position: 'relative'}}>
                      {idx < 3 && (<div style={{position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5em', color: '#cbd5e1'}}>→</div>)}
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                        <div style={{background: step.color, color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9em'}}>{idx + 1}</div>
                        <div><div style={{fontSize: '0.85em', fontWeight: '800', color: '#1e293b'}}>{step.title}</div><div style={{fontSize: '0.7em', color: step.color, fontWeight: '700'}}>{step.time}</div></div>
                      </div>
                      <div style={{fontSize: '0.75em', color: '#0f172a', marginBottom: '10px', paddingBottom: '10px', borderBottom: `1px solid ${step.color}20`}}>{step.description}</div>
                      <div style={{fontSize: '0.75em', color: '#475569'}}>{step.items.map((item, i) => (<div key={i} style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: i < step.items.length - 1 ? '6px' : '0'}}><div style={{width: '4px', height: '4px', borderRadius: '50%', background: step.color}}></div>{item}</div>))}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '14px', padding: '16px'}}>
                <div style={{fontSize: '0.9em', fontWeight: '800', color: '#78350f', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{fontSize: '1.2em'}}>📊</div>Assembly Quality Metrics</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px'}}>
                  {[{metric: 'Defect Rate', value: '0.3%', trend: '↓'}, {metric: 'On-Time Delivery', value: '98.9%', trend: '↑'}, {metric: 'Rework Required', value: '1.2%', trend: '↓'}, {metric: 'Customer Satisfaction', value: '4.8/5', trend: '↑'}].map((item, i) => (
                    <div key={i} style={{background: 'white', borderRadius: '8px', padding: '12px', textAlign: 'center'}}><div style={{fontSize: '0.75em', fontWeight: '600', color: '#78350f', marginBottom: '6px'}}>{item.metric}</div><div style={{fontSize: '1.1em', fontWeight: '800', color: '#b45309', marginBottom: '4px'}}>{item.value}</div><div style={{fontSize: '0.8em', fontWeight: '700', color: item.trend.includes('↑') ? '#10b981' : '#ef4444'}}>{item.trend}</div></div>
                  ))}
                </div>
              </div>
            </div>"""

insert_idx = content.rfind('        )}', 0, end_idx)

if insert_idx == -1:
    print("ERROR: Cannot find insertion point")
    exit(1)

new_content = content[:insert_idx] + CARTRIDGE_SECTION + '\n        ' + content[insert_idx:]

with open('src/slides/IPQAOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Cartridge Assembly section added successfully!")


