#!/usr/bin/env python3
"""Update Cartridge Assembly with accurate IPQA data"""

with open('src/slides/IPQAOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# New cartridge data based on provided IPQA data
cartridge_data = [
    {'name': 'CAM Sub Assembly', 'clear': '5:12', 'close': '5:30', 'rev': 'N/A'},
    {'name': 'Sliding Block Sub Assembly', 'clear': '3:42', 'close': '5:11', 'rev': 'N/A'},
    {'name': 'POKA-YOKA Plate', 'clear': '4:53', 'close': '4:22', 'rev': 'N/A'},
    {'name': 'Fixed Plate Sub Assembly', 'clear': '6:41', 'close': '4:53', 'rev': 'N/A'},
    {'name': 'Locking Block Sub Assembly', 'clear': '4:20', 'close': '3:42', 'rev': 'N/A'},
    {'name': 'Valve Motor-1 Sub Assembly', 'clear': '3:20', 'close': '5:39', 'rev': 'N/A'},
    {'name': 'Peristaltic Pump Sub Assembly', 'clear': '3:32', 'close': '3:46', 'rev': 'N/A'},
    {'name': 'Filter Sub Assembly', 'clear': '3:43', 'close': '4:00', 'rev': 'N/A'},
    {'name': 'Mechanism Assembly', 'clear': '6:50', 'close': '2:09', 'rev': '3:26'},
    {'name': 'Bottom Cover Assembly', 'clear': '4:46', 'close': '4:03', 'rev': 'N/A'},
    {'name': 'Wiring Assembly', 'clear': '6:30', 'close': '4:54', 'rev': 'N/A'},
    {'name': 'Heater Testing', 'clear': '8:31', 'close': '3:45', 'rev': '3:37'},
    {'name': 'Testing', 'clear': '9:46', 'close': '5:03', 'rev': 'N/A'},
    {'name': 'Vacuum Nozzle Sub Assembly', 'clear': '4:02', 'close': '6:51', 'rev': 'N/A'}
]

# Calculate averages
avg_clear = sum(int(d['clear'].split(':')[0]) * 60 + int(d['clear'].split(':')[1]) 
                for d in cartridge_data if d['clear'] != 'N/A') / len([d for d in cartridge_data if d['clear'] != 'N/A'])
avg_clear_min = int(avg_clear // 60)
avg_clear_sec = int(avg_clear % 60)

avg_close = sum(int(d['close'].split(':')[0]) * 60 + int(d['close'].split(':')[1]) 
                for d in cartridge_data if d['close'] != 'N/A') / len([d for d in cartridge_data if d['close'] != 'N/A'])
avg_close_min = int(avg_close // 60)
avg_close_sec = int(avg_close % 60)

avg_rev_vals = [int(d['rev'].split(':')[0]) * 60 + int(d['rev'].split(':')[1]) 
                for d in cartridge_data if d['rev'] != 'N/A']
avg_rev = sum(avg_rev_vals) / len(avg_rev_vals) if avg_rev_vals else 0
avg_rev_min = int(avg_rev // 60)
avg_rev_sec = int(avg_rev % 60)

# Build cartridge assembly section with all 14 sub-assemblies
NEW_CARTRIDGE_SECTION = f"""              {/* Assembly Stages Grid - All Sub-Assemblies */}
              <div style={{{{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '14px',
                marginBottom: '28px'
              }}}}>
                {{["""

# Add all cartridge data
for i, item in enumerate(cartridge_data):
    color_map = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']
    color = color_map[i % len(color_map)]
    bg_color = '#eff6ff' if '#3b82f6' in color else '#faf5ff' if '#8b5cf6' in color else '#fdf2f8' if '#ec4899' in color else '#ecf8fb' if '#06b6d4' in color else '#f0fdf4' if '#10b981' in color else '#fffbeb'
    border_color = color
    
    NEW_CARTRIDGE_SECTION += f"""
                  {{name: '{item['name']}', clear: '{item['clear']}', close: '{item['close']}', rev: '{item['rev']}', color: '{color}', bgColor: '{bg_color}', borderColor: '{border_color}'}}{',' if i < len(cartridge_data) - 1 else ''}"""

NEW_CARTRIDGE_SECTION += f"""
                ].map((subasm, idx) => (
                  <div key={{idx}} style={{{{
                    background: subasm.bgColor,
                    border: `2px solid ${{subasm.borderColor}}`,
                    borderRadius: '12px',
                    padding: '14px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)'
                  }}}}
                  onMouseEnter={{(e) => {{
                    e.currentTarget.style.boxShadow = `0 6px 16px ${{subasm.color}}20`;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}}}
                  onMouseLeave={{(e) => {{
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}}}>
                    <div style={{{{
                      fontSize: '0.8em',
                      fontWeight: '800',
                      color: subasm.color,
                      marginBottom: '10px',
                      paddingBottom: '8px',
                      borderBottom: `1.5px solid ${{subasm.borderColor}}30`
                    }}}}>
                      {{subasm.name}}
                    </div>
                    <div style={{{{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      fontSize: '0.75em'
                    }}}}>
                      <div>
                        <div style={{{{color: '#0f172a', fontWeight: '600', marginBottom: '3px'}}}}>Clear</div>
                        <div style={{{{fontWeight: '800', color: '#4338ca'}}}}>{{subasm.clear}}</div>
                      </div>
                      <div>
                        <div style={{{{color: '#0f172a', fontWeight: '600', marginBottom: '3px'}}}}>Close</div>
                        <div style={{{{fontWeight: '800', color: '#0284c7'}}}}>{{subasm.close}}</div>
                      </div>
                      <div>
                        <div style={{{{color: '#0f172a', fontWeight: '600', marginBottom: '3px'}}}}>Rev</div>
                        <div style={{{{fontWeight: '800', color: '#b45309'}}}}>{{subasm.rev}}</div>
                      </div>
                    </div>
                  </div>
                ))}}
              </div>

              {/* Cartridge Assembly Summary Stats */}
              <div style={{{{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                border: '2px solid #86efac',
                borderRadius: '12px',
                padding: '16px'
              }}}}>
                <div style={{{{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '12px'
                }}}}>
                  <div style={{{{textAlign: 'center'}}}}>
                    <div style={{{{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}}}>{avg_clear_min}:{avg_clear_sec:02d}</div>
                    <div style={{{{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}}}>Avg Clearance</div>
                  </div>
                  <div style={{{{textAlign: 'center'}}}}>
                    <div style={{{{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}}}>{avg_close_min}:{avg_close_sec:02d}</div>
                    <div style={{{{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}}}>Avg Closure</div>
                  </div>
                  <div style={{{{textAlign: 'center'}}}}>
                    <div style={{{{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}}}>{avg_rev_min}:{avg_rev_sec:02d}</div>
                    <div style={{{{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}}}>Avg Re-Verification</div>
                  </div>
                  <div style={{{{textAlign: 'center'}}}}>
                    <div style={{{{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}}}>14</div>
                    <div style={{{{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}}}>Total Sub-Assemblies</div>
                  </div>
                </div>
              </div>"""

# Find and replace the cartridge assembly section
# Look for the Assembly Stages Grid pattern in the cartridge section
old_pattern_start = "              {/* Assembly Stages */}"
old_pattern_end = "              </div>"

# Find the old assembly stages section
idx = content.find(old_pattern_start)
if idx == -1:
    print("ERROR: Cannot find Assembly Stages section")
    exit(1)

# Find the end of this section (before Quality Metrics)
quality_metrics_idx = content.find("              {/* Assembly Quality Metrics */}", idx)
if quality_metrics_idx == -1:
    print("ERROR: Cannot find Quality Metrics section")
    exit(1)

# Replace the assembly stages and summary section
new_content = content[:idx] + NEW_CARTRIDGE_SECTION + "\n\n              {/* Assembly Quality Metrics" + content[quality_metrics_idx + len("              {/* Assembly Quality Metrics"):]

with open('src/slides/IPQAOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Cartridge Assembly data updated with accurate IPQA information!")
print(f"Updated {len(cartridge_data)} sub-assemblies")
print(f"Average Clearance: {avg_clear_min}:{avg_clear_sec:02d}")
print(f"Average Closure: {avg_close_min}:{avg_close_sec:02d}")
print(f"Average Re-Verification: {avg_rev_min}:{avg_rev_sec:02d}")


