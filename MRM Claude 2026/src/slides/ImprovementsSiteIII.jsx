import SlideShell from '../components/SlideShell'

const C = '#0369A1'

const DEPTS = [
  'MG - CA',
  'MG - MD',
  'DI',
  'QC',
  'ST',
  'MN',
  'IT',
  'HR',
  'PU',
]

const th = (extra={}) => ({
  padding:'9px 14px', fontWeight:800, fontSize:13,
  textTransform:'uppercase', letterSpacing:'0.06em',
  textAlign:'center', border:'1px solid #d1d5db', ...extra
})

const td = (extra={}) => ({
  padding:'9px 14px', fontSize:14, textAlign:'center',
  border:'1px solid #e5e7eb', ...extra
})

export default function ImprovementsSiteIII() {
  return (
    <SlideShell accentColor={C} sectionLabel="Improvements" slideTitle="Site-III — Improvements & Collaborative Meetings" slideNumber="18 / 21">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, height:'100%' }}>

        {/* Improvements Done */}
        <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ background:'#0F172A', padding:'8px 14px', flexShrink:0 }}>
            <p style={{ color:'#fff', fontSize:15, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.07em' }}>
              Process Improvements Done
            </p>
            <p style={{ color:'#9ca3af', fontSize:12, marginTop:2 }}>Dec 2025 – May 2026 · Department Wise</p>
          </div>
          <div style={{ flex:1, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
              <thead>
                <tr>
                  <th style={th({ background:'#1f2937', color:'#fff', textAlign:'left', width:'60%' })}>Department</th>
                  <th style={th({ background:C, color:'#fff', width:'40%' })}>No. of Improvements</th>
                </tr>
              </thead>
              <tbody>
                {DEPTS.map((dept, i) => (
                  <tr key={dept} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={td({ textAlign:'left', fontWeight:700, color:'#0F172A' })}>{dept}</td>
                    <td style={td({ color:C, fontWeight:800, fontSize:18 })}>—</td>
                  </tr>
                ))}
                <tr style={{ background:'#f3f4f6', borderTop:'2px solid #d1d5db' }}>
                  <td style={td({ textAlign:'left', fontWeight:900, color:'#0F172A' })}>TOTAL</td>
                  <td style={td({ color:'#1E40AF', fontWeight:900, fontSize:20 })}>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Collaborative Meetings */}
        <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ background:'#1E40AF', padding:'8px 14px', flexShrink:0 }}>
            <p style={{ color:'#fff', fontSize:15, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.07em' }}>
              Collaborative Meetings Conducted
            </p>
            <p style={{ color:'rgba(255,255,255,0.75)', fontSize:12, marginTop:2 }}>Dec 2025 – May 2026 · Department Wise</p>
          </div>
          <div style={{ flex:1, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
              <thead>
                <tr>
                  <th style={th({ background:'#1f2937', color:'#fff', textAlign:'left', width:'36%' })}>Department</th>
                  <th style={th({ background:'#0369A1', color:'#fff', width:'32%' })}>Regular Meetings</th>
                  <th style={th({ background:'#1E40AF', color:'#fff', width:'32%' })}>Improvement Meetings</th>
                </tr>
              </thead>
              <tbody>
                {DEPTS.map((dept, i) => (
                  <tr key={dept} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={td({ textAlign:'left', fontWeight:700, color:'#0F172A' })}>{dept}</td>
                    <td style={td({ color:'#0369A1', fontWeight:700, fontSize:16 })}>—</td>
                    <td style={td({ color:'#1E40AF', fontWeight:700, fontSize:16 })}>—</td>
                  </tr>
                ))}
                <tr style={{ background:'#f3f4f6', borderTop:'2px solid #d1d5db' }}>
                  <td style={td({ textAlign:'left', fontWeight:900, color:'#0F172A' })}>TOTAL</td>
                  <td style={td({ color:'#0369A1', fontWeight:900, fontSize:20 })}>—</td>
                  <td style={td({ color:'#1E40AF', fontWeight:900, fontSize:20 })}>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </SlideShell>
  )
}
