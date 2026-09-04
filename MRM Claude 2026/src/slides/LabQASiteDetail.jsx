import SlideShell from '../components/SlideShell'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#0369A1'
const SITES=[{site:'Site-I',color:'#1E40AF'},{site:'Site-III',color:'#0369A1'},{site:'Site-IV',color:'#334155'},{site:'Site-V',color:'#111827'}]

export default function LabQASiteDetail() {
  return (
    <SlideShell accentColor={C} sectionLabel="Lab QA" slideTitle="Lab QA Site Detail" slideNumber="11 / 21">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, height:'100%' }}>
        {SITES.map(({ site, color }) => (
          <div key={site} style={{ border:'1px solid #e5e7eb', borderTop:`3px solid ${color}`,
            borderRadius:4, overflow:'hidden', display:'flex', flexDirection:'column' }}>
            <div style={{ background:'#f8f8f8', padding:'11px 16px', borderBottom:'1px solid #e5e7eb' }}>
              <span style={{ background:color, color:'#fff', fontSize:17, fontWeight:800,
                padding:'3px 10px', borderRadius:2 }}>{site}</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
              {['Pass Rate','Fail Rate','Reports Verified','Equipment Status'].map((k,i)=>(
                <div key={k} style={{ padding:'14px 20px', borderRight:i%2===0?'1px solid #f3f4f6':'none',
                  borderBottom:'1px solid #f3f4f6' }}>
                  <p style={{ color:'#9ca3af', fontSize:16, fontWeight:700 }}>{k}</p>
                  <p style={{ color:'#0F172A', fontWeight:900, fontSize:20 }}>—</p>
                </div>
              ))}
            </div>
            <div style={{ flex:1, padding:'14px 18px' }}>
              <ChartPlaceholder label={`${site} — Monthly Pass/Fail`} type="line" color={color} height={100} />
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}
