import SlideShell from '../components/SlideShell'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#111827'
const SITES=[{site:'Site-I',color:'#1E40AF'},{site:'Site-III',color:'#0369A1'},{site:'Site-IV',color:'#334155'},{site:'Site-V',color:'#111827'}]

export default function ImprovementsBySite() {
  return (
    <SlideShell accentColor={C} sectionLabel="Improvements" slideTitle="Improvements by Site" slideNumber="17 / 21">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, height:'100%' }}>
        {SITES.map(({ site, color }) => (
          <div key={site} style={{ border:'1px solid #e5e7eb', borderTop:`3px solid ${color}`,
            borderRadius:4, overflow:'hidden', display:'flex', flexDirection:'column' }}>
            <div style={{ background:'#f8f8f8', padding:'11px 16px', display:'flex',
              alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #e5e7eb' }}>
              <span style={{ background:color,color:'#fff',fontSize:17,fontWeight:800,
                padding:'3px 10px',borderRadius:2 }}>{site}</span>
              <div style={{ display:'flex', gap:8 }}>
                {[['Done','#1E40AF'],['WIP','#334155'],['Planned','#111827']].map(([l,c])=>(
                  <span key={l} style={{ background:c,color:'#fff',fontSize:17,fontWeight:800,
                    padding:'2px 8px',borderRadius:2 }}>{l}: —</span>
                ))}
              </div>
            </div>
            <div style={{ flex:1, padding:'14px 18px' }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8,
                  background:'#f9f9f9', borderRadius:3, padding:'10px 16px',
                  borderLeft:`3px solid ${color}` }}>
                  <span style={{ color:'#0F172A', fontSize:15, fontWeight:600 }}>Improvement {n}</span>
                  <span style={{ marginLeft:'auto', background:'#f3f4f6', color:'#6b7280',
                    fontSize:16, padding:'2px 8px', borderRadius:2 }}>Pending</span>
                </div>
              ))}
            </div>
            <div style={{ padding:'0 12px 10px' }}>
              <ChartPlaceholder label={`${site} — Before vs After`} type="bar" color={color} height={80} />
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}
