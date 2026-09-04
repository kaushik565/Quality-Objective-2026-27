#!/usr/bin/env python3
"""
Comprehensive script to refactor all display sections for site-specific data tables
"""
import re

with open('src/slides/EmptySlide.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

#==============================================================================
# INCIDENTS SECTION - Replace chart/KPI display with site-specific data table
#==============================================================================

incidents_replacement = """      {selectedCategory === 'Incidents' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {selectedSite ? (
            <>
              {/* Header */}
              <div style={{
                backgroundColor: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
              }}>
                <h2 style={{ margin: '0 0 12px 0', fontSize: '1.5em', fontWeight: '700' }}>🏭 {selectedSite} - Incidents</h2>
                <p style={{ margin: '0', fontSize: '0.95em', opacity: 0.95 }}>Monthly incident tracking by severity and response times</p>
              </div>

              {/* Data Table */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#1f2937', fontSize: '0.95em' }}>Period</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', color: '#1f2937', fontSize: '0.95em' }}>Minor</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', color: '#1f2937', fontSize: '0.95em' }}>Major</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', color: '#1f2937', fontSize: '0.95em' }}>Critical</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', color: '#1f2937', fontSize: '0.95em' }}>Closure Days</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', color: '#1f2937', fontSize: '0.95em' }}>Investigation Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedSite === 'SITE-I' ? siteIIncidentsData.monthly : selectedSite === 'SITE-III' ? siteIIIIncidentsData.monthly : siteVIncidentsData.monthly).map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                        <td style={{ padding: '16px', color: '#1f2937', fontWeight: '500' }}>{row.month}</td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#dc2626', fontWeight: '600' }}>{row.minor}</td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#d97706', fontWeight: '600' }}>{row.major}</td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#991b1b', fontWeight: '600' }}>{row.critical}</td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#0284c7', fontWeight: '600' }}>{row.closureDays}</td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#10b981', fontWeight: '600' }}>{row.investigationDays}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div style={{
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <div style={{ fontSize: '3em', marginBottom: '16px' }}>👆</div>
              <div style={{ fontSize: '1.2em', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Click a site card to view Incidents data</div>
              <div style={{ fontSize: '0.95em', color: '#6b7280' }}>Select SITE-I, SITE-III, or SITE-V above</div>
            </div>
          )}
        </div>
      )}"""

# Find and replace the Incidents section
incidents_pattern = r"{selectedCategory === 'Incidents' && \(\s*<div[^}]*?{\/\* Incident Trend Summary \*\/[\s\S]*?<\/div>\s*\)\s*\)\s*}"

# More specific pattern matching the exact structure
incidents_pattern_simple = r"(\{selectedCategory === 'Incidents' && \(\s+<div style=\{\{ marginTop:)"

# Try a safer approach: find the line number and replace from there
if "{selectedCategory === 'Incidents' &&" in content:
    # Split and reconstruct
    parts = content.split("{selectedCategory === 'Change Controls' && (")
    if len(parts) == 2:
        # Replace Incidents section in first part
        first_part = parts[0]
        # Find last Incidents section in first_part
        last_incidents = first_part.rfind("{selectedCategory === 'Incidents' && (")
        if last_incidents != -1:
            # Find the matching closing bracket
            depth = 0
            i = last_incidents
            start = i
            in_string = False
            escape_next = False
            
            while i < len(first_part):
                char = first_part[i]
                
                if escape_next:
                    escape_next = False
                    i += 1
                    continue
                
                if char == '\\':
                    escape_next = True
                    i += 1
                    continue
                    
                if char == '"' and not in_string:
                    in_string = True
                elif char == '"' and in_string:
                    in_string = False
                elif not in_string:
                    if char == '{':
                        depth += 1
                    elif char == '}':
                        depth -= 1
                        if depth == 0:
                            # Found the end
                            end = i + 1
                            old_incidents = first_part[start:end]
                            first_part = first_part[:start] + incidents_replacement + first_part[end:]
                            break
                i += 1
            
            content = first_part + "{selectedCategory === 'Change Controls' && (" + parts[1]

print("✓ Display sections prepared for update")
print("Note: Manual update required for display sections due to complex JSX nesting")
print("Please review the incident_replacement variable in this script")

with open('src/slides/EmptySlide.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

