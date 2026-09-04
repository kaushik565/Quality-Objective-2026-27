import SlideShell from '../components/SlideShell'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#1E40AF'

export default function ComplaintsAnalysis() {
  return (
    <SlideShell accentColor={C} sectionLabel="Customer Complaints" slideTitle="Complaints Analysis" slideNumber="13 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:12, height:'100%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <ChartPlaceholder label="Root Cause Analysis (Pareto)" type="bar" color={C} height={180} />
          <ChartPlaceholder label="Avg Resolution Time by Category" type="bar" color={C} height={180} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, flex:1, minHeight:0 }}>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden' }}>
            <div style={{ background:'#0F172A', padding:'8px 16px' }}>
              <p style={{ color:'#fff', fontSize:17, fontWeight:800, textTransform:'uppercase' }}>CAPA Linkage</p>
            </div>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#1E40AF' }}>
                  {['#','Description','Category','Root Cause','CAPA Ref','Status'].map(h=>(
                    <th key={h} style={{ color:'#fff',fontSize:16,fontWeight:800,padding:'14px 20px',
                      textAlign:'left',textTransform:'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map(n=>(
                  <tr key={n} style={{ background:n%2===0?'#f9f9f9':'#fff' }}>
                    <td style={{ color:'#1E40AF',fontWeight:800,padding:'14px 20px',fontSize:15,
                      borderTop:'1px solid #f3f4f6' }}>{n}</td>
                    {['Data to be filled','—','—','—','Pending'].map((v,i)=>(
                      <td key={i} style={{ color:'#6b7280',fontSize:15,padding:'14px 20px',
                        borderTop:'1px solid #f3f4f6' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[['Avg Resolution Days','#1E40AF'],['Repeat Complaints','#0369A1'],['CAPA Linked','#334155']].map(([label,color])=>(
              <div key={label} style={{ border:'1px solid #e5e7eb', borderTop:`3px solid ${color}`,
                borderRadius:4, padding:'14px', flex:1 }}>
                <p style={{ color:'#9ca3af', fontSize:16, fontWeight:700 }}>{label}</p>
                <p style={{ color:'#0F172A', fontWeight:900, fontSize:28, marginTop:4 }}>—</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
