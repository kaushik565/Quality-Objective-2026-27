#!/usr/bin/env python3
"""Add Cartridge Assembly inside SITE-III section correctly"""

with open('src/slides/IPQAOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the performance summary closing which is the last section before the closing )}
# We need to insert BEFORE the closing )} but AFTER performance summary

# The pattern is: Performance Summary section ends with </div>, then there's another closing </div>, then )}
# We want to insert our cartridge section between the performance summary </div> and the final )}

# Find "Performance Summary" section
perf_summary = "background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',"

idx = content.find(perf_summary)
if idx == -1:
    print("ERROR: Cannot find Performance Summary")
    exit(1)

# From this point, find the closing </div> that closes the performance summary
# Then find the next closing </div> that closes the main section
# We insert before the final )}

# Find the Comparison Bar comment
comp_idx = content.find("// Comparison Bar Component")
if comp_idx == -1:
    print("ERROR: Cannot find Comparison Bar")
    exit(1)

# Work backwards from Comparison Bar to find the )} that closes SITE-III
lines_before = content[:comp_idx].rstrip().split('\n')
close_line_idx = -1
for i in range(len(lines_before) - 1, -1, -1):
    if lines_before[i].strip() == ')}':
        close_line_idx = i
        break

if close_line_idx == -1:
    print("ERROR: Cannot find closing )} ")
    exit(1)

# Position right before that )}
end_content = '\n'.join(lines_before[:close_line_idx])
insert_idx = len(end_content)

CARTRIDGE = """

            {/* Cartridge Assembly & Packaging Section */}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: `3px solid ${siteData.color}40`
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
                <div style={{background: `linear-gradient(135deg, #10b981, #059669)`, color: 'white', borderRadius: '10px', padding: '8px 12px', fontWeight: '800', fontSize: '0.95em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'}}>
                  📦 CARTRIDGE ASSEMBLY & PACKAGING
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px'}}>
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

              <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '14px', padding: '16px'}}>
                <div style={{fontSize: '0.9em', fontWeight: '800', color: '#78350f', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}><div>📊 Assembly Quality Metrics</div></div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px'}}>
                  {[{metric: 'Defect Rate', value: '0.3%', trend: '↓'}, {metric: 'On-Time Delivery', value: '98.9%', trend: '↑'}, {metric: 'Rework Required', value: '1.2%', trend: '↓'}, {metric: 'Customer Satisfaction', value: '4.8/5', trend: '↑'}].map((item, i) => (
                    <div key={i} style={{background: 'white', borderRadius: '8px', padding: '12px', textAlign: 'center'}}><div style={{fontSize: '0.75em', fontWeight: '600', color: '#78350f', marginBottom: '6px'}}>{item.metric}</div><div style={{fontSize: '1.1em', fontWeight: '800', color: '#b45309', marginBottom: '4px'}}>{item.value}</div><div style={{fontSize: '0.8em', fontWeight: '700', color: item.trend.includes('↑') ? '#10b981' : '#ef4444'}}>{item.trend}</div></div>
                  ))}
                </div>
              </div>
            </div>"""

new_content = content[:insert_idx] + CARTRIDGE + '\n        ' + content[insert_idx:]

with open('src/slides/IPQAOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Cartridge section added successfully!")
print(f"Inserted at position: {insert_idx}")


