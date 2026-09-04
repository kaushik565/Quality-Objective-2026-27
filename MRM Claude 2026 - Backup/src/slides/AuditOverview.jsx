import SlideShell from '../components/SlideShell'

const C = '#374151'

const AUDITS = [
  { label:'1st IQA 2025', type:'Internal', color:'#7F1D1D' },
  { label:'2nd IQA 2025', type:'Internal', color:'#7F1D1D' },
  { label:'External Audit 2026', type:'External', color:'#374151' },
  { label:'1st IQA 2026', type:'Internal', color:'#CC0000' },
]

const th = (extra={}) => ({
  padding:'12px 18px', fontWeight:800, fontSize:15,
  textTransform:'uppercase', letterSpacing:'0.06em',
  border:'1px solid #d1d5db', textAlign:'center', ...extra
})

const td = (extra={}) => ({
  padding:'14px 18px', fontSize:16, textAlign:'center',
  border:'1px solid #e5e7eb', ...extra
})

const badge = (text, color) => (
  <span style={{ background:color, color:'#fff', fontWeight:800,
    fontSize:12, padding:'2px 8px', borderRadius:2, marginLeft:8 }}>
    {text}
  </span>
)

export default function AuditOverview() {
  return (
    <SlideShell accentColor={C} sectionLabel="Audits" slideTitle="Audit Summary — NC / MNC / PI" slideNumber="15 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:14, height:'100%' }}>

        {/* Legend */}
        <div style={{ display:'flex', gap:24, padding:'8px 16px', background:'#f9fafb',
          borderRadius:4, border:'1px solid #e5e7eb' }}>
          {[
            { code:'NC',  desc:'Non-Conformance', color:'#CC0000' },
            { code:'MNC', desc:'Minor Non-Conformance', color:'#7F1D1D' },
            { code:'PI',  desc:'Process Improvement', color:'#374151' },
          ].map(item => (
            <div key={item.code} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:item.color, color:'#fff', fontWeight:800,
                fontSize:13, padding:'3px 10px', borderRadius:2 }}>{item.code}</span>
              <span style={{ fontSize:14, color:'#374151', fontWeight:600 }}>{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Main table */}
        <div style={{ flex:1, minHeight:0, border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
            <thead>
              <tr>
                <th style={th({ background:'#111111', color:'#fff', textAlign:'left', width:'32%' })}>Audit</th>
                <th style={th({ background:'#111111', color:'#fff', width:'16%' })}>Type</th>
                <th style={th({ background:'#CC0000', color:'#fff', width:'17%' })}>NC</th>
                <th style={th({ background:'#7F1D1D', color:'#fff', width:'17%' })}>MNC</th>
                <th style={th({ background:'#374151', color:'#fff', width:'18%' })}>PI</th>
              </tr>
            </thead>
            <tbody>
              {AUDITS.map((audit, i) => (
                <tr key={audit.label} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={td({ textAlign:'left', fontWeight:800, fontSize:17, color:'#111111' })}>
                    <span style={{ display:'inline-block', width:10, height:10, background:audit.color,
                      borderRadius:'50%', marginRight:10, verticalAlign:'middle' }} />
                    {audit.label}
                  </td>
                  <td style={td({ fontWeight:600, color:'#6b7280' })}>{audit.type}</td>
                  <td style={td({ color:'#CC0000', fontWeight:800, fontSize:20 })}>—</td>
                  <td style={td({ color:'#7F1D1D', fontWeight:800, fontSize:20 })}>—</td>
                  <td style={td({ color:'#374151', fontWeight:800, fontSize:20 })}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {[
            { label:'Total NC (All Audits)', color:'#CC0000' },
            { label:'Total MNC (All Audits)', color:'#7F1D1D' },
            { label:'Total PI (All Audits)', color:'#374151' },
          ].map(item => (
            <div key={item.label} style={{ border:`2px solid ${item.color}`, borderRadius:4,
              padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:14, fontWeight:700, color:'#374151' }}>{item.label}</span>
              <span style={{ fontSize:28, fontWeight:900, color:item.color }}>—</span>
            </div>
          ))}
        </div>

      </div>
    </SlideShell>
  )
}
