import SlideShell from '../components/SlideShell'
import SiteTag from '../components/SiteTag'

const C = '#111827'

const SITES = ['Site-I','Site-III','Site-IV','Site-V']

const th = (extra={}) => ({
  padding:'10px 14px', fontWeight:800, fontSize:14,
  textTransform:'uppercase', letterSpacing:'0.06em',
  textAlign:'center', border:'1px solid #d1d5db', ...extra
})

const td = (extra={}) => ({
  padding:'10px 14px', fontSize:15, textAlign:'center',
  border:'1px solid #e5e7eb', ...extra
})

export default function ProcessImprovements() {
  return (
    <SlideShell accentColor={C} sectionLabel="Improvements" slideTitle="Process Improvements — All Sites Summary" slideNumber="16 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:14, height:'100%' }}>

        {/* Improvements done table */}
        <div style={{ flex:1, minHeight:0, border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden' }}>
          <div style={{ background:'#0F172A', padding:'8px 16px' }}>
            <p style={{ color:'#fff', fontSize:16, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em' }}>
              Process Improvements Done — Dec 2025 to May 2026
            </p>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
            <thead>
              <tr>
                <th style={th({ background:'#1f2937', color:'#fff', textAlign:'left', width:'28%' })}>Site</th>
                <th style={th({ background:'#334155', color:'#fff', width:'24%' })}>Improvements Done</th>
                <th style={th({ background:'#334155', color:'#fff', width:'24%' })}>In Progress</th>
                <th style={th({ background:'#334155', color:'#fff', width:'24%' })}>Planned</th>
              </tr>
            </thead>
            <tbody>
              {SITES.map((site, i) => (
                <tr key={site} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={td({ textAlign:'left' })}><SiteTag site={site} /></td>
                  <td style={td({ color:'#1E40AF', fontWeight:800, fontSize:20 })}>—</td>
                  <td style={td({ color:'#334155', fontWeight:800, fontSize:20 })}>—</td>
                  <td style={td({ color:'#6b7280', fontWeight:800, fontSize:20 })}>—</td>
                </tr>
              ))}
              {/* Total row */}
              <tr style={{ background:'#f3f4f6', borderTop:'2px solid #d1d5db' }}>
                <td style={td({ textAlign:'left', fontWeight:900, color:'#0F172A', fontSize:15 })}>TOTAL</td>
                <td style={td({ color:'#1E40AF', fontWeight:900, fontSize:22 })}>—</td>
                <td style={td({ color:'#334155', fontWeight:900, fontSize:22 })}>—</td>
                <td style={td({ color:'#6b7280', fontWeight:900, fontSize:22 })}>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Collaborative meetings table */}
        <div style={{ flex:1, minHeight:0, border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden' }}>
          <div style={{ background:'#1E40AF', padding:'8px 16px' }}>
            <p style={{ color:'#fff', fontSize:16, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em' }}>
              Collaborative Meetings Conducted — Dec 2025 to May 2026
            </p>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
            <thead>
              <tr>
                <th style={th({ background:'#1f2937', color:'#fff', textAlign:'left', width:'28%' })}>Site</th>
                <th style={th({ background:'#0369A1', color:'#fff', width:'36%' })}>Regular Activity Meetings</th>
                <th style={th({ background:'#1E40AF', color:'#fff', width:'36%' })}>Improvement Meetings</th>
              </tr>
            </thead>
            <tbody>
              {SITES.map((site, i) => (
                <tr key={site} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={td({ textAlign:'left' })}><SiteTag site={site} /></td>
                  <td style={td({ color:'#0369A1', fontWeight:800, fontSize:20 })}>—</td>
                  <td style={td({ color:'#1E40AF', fontWeight:800, fontSize:20 })}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize:12, color:'#9ca3af', fontStyle:'italic' }}>
          * Detailed department-wise breakdown available in Site-wise slides (17–20)
        </p>
      </div>
    </SlideShell>
  )
}
