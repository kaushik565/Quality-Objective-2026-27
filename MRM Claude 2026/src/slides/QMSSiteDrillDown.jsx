import SlideShell from '../components/SlideShell'

const th = (extra={}) => ({
  padding:'10px 16px', fontWeight:800, fontSize:14,
  textTransform:'uppercase', letterSpacing:'0.06em',
  textAlign:'center', border:'1px solid #d1d5db', ...extra
})

const td = (extra={}) => ({
  padding:'10px 16px', fontSize:15, textAlign:'center',
  border:'1px solid #e5e7eb', ...extra
})

const INCIDENT_ROWS = [
  'Process Incidents',
  'GDP Incidents',
]

export default function QMSSiteDrillDown() {
  return (
    <SlideShell accentColor="#1E40AF" sectionLabel="QMS" slideTitle="Incidents & Deviations — Period Comparison" slideNumber="4 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:16, height:'100%' }}>

        {/* Process & GDP Incidents */}
        <div style={{ flex:1, minHeight:0, border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden' }}>
          <div style={{ background:'#0F172A', padding:'8px 16px' }}>
            <p style={{ color:'#fff', fontSize:16, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em' }}>
              Process &amp; GDP Incidents
            </p>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
            <thead>
              <tr>
                <th style={th({ background:'#1f2937', color:'#fff', textAlign:'left', width:'35%' })}>Incident Type</th>
                <th style={th({ background:'#0369A1', color:'#fff', width:'32%' })}>Jun 2025 – Nov 2025</th>
                <th style={th({ background:'#1E40AF', color:'#fff', width:'33%' })}>Dec 2025 – May 2026</th>
              </tr>
            </thead>
            <tbody>
              {INCIDENT_ROWS.map((row, i) => (
                <tr key={row} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={td({ textAlign:'left', fontWeight:700, color:'#0F172A' })}>{row}</td>
                  <td style={td({ color:'#0369A1', fontWeight:700, fontSize:18 })}>—</td>
                  <td style={td({ color:'#1E40AF', fontWeight:700, fontSize:18 })}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Incidents on QA */}
        <div style={{ flex:1, minHeight:0, border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden' }}>
          <div style={{ background:'#1E40AF', padding:'8px 16px' }}>
            <p style={{ color:'#fff', fontSize:16, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em' }}>
              Incidents on QA (Quality Assurance)
            </p>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
            <thead>
              <tr>
                <th style={th({ background:'#1f2937', color:'#fff', textAlign:'left', width:'35%' })}>Site</th>
                <th style={th({ background:'#0369A1', color:'#fff', width:'32%' })}>Jun 2025 – Nov 2025</th>
                <th style={th({ background:'#1E40AF', color:'#fff', width:'33%' })}>Dec 2025 – May 2026</th>
              </tr>
            </thead>
            <tbody>
              {['Site-I','Site-III','Site-IV','Site-V'].map((site, i) => (
                <tr key={site} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={td({ textAlign:'left', fontWeight:700, color:'#0F172A' })}>{site}</td>
                  <td style={td({ color:'#0369A1', fontWeight:700, fontSize:18 })}>—</td>
                  <td style={td({ color:'#1E40AF', fontWeight:700, fontSize:18 })}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize:12, color:'#9ca3af', fontStyle:'italic' }}>
          * All numbers reflect total count raised across all sites in the respective period
        </p>
      </div>
    </SlideShell>
  )
}
