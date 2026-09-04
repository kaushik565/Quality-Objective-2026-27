import SlideShell from '../components/SlideShell'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#334155'
const OBJECTIVES = [
  'Reduce customer complaints',
  'IPQA line clearance compliance',
  'Calibration on-time rate',
  'CAPA closure rate',
  'Training completion rate',
  'OOS investigations closed on time',
]

export default function QualityObjectives() {
  return (
    <SlideShell accentColor={C} sectionLabel="Quality Objectives" slideTitle="Quality Objectives 2026" slideNumber="14 / 21">
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14, height:'100%' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden', flex:1 }}>
            <div style={{ background:'#0F172A', padding:'8px 16px' }}>
              <p style={{ color:'#fff', fontSize:17, fontWeight:800, textTransform:'uppercase' }}>KPI Targets vs Actual</p>
            </div>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#334155' }}>
                  {['#','Quality Objective','Target','Actual 2026','Status'].map(h=>(
                    <th key={h} style={{ color:'#fff',fontSize:16,fontWeight:800,padding:'11px 16px',
                      textAlign:'left',textTransform:'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OBJECTIVES.map((obj,i)=>(
                  <tr key={i} style={{ background:i%2===0?'#fff':'#f9f9f9' }}>
                    <td style={{ color:'#1E40AF',fontWeight:900,padding:'11px 16px',
                      fontSize:16,borderTop:'1px solid #f3f4f6' }}>{i+1}</td>
                    <td style={{ color:'#0F172A',fontSize:15,padding:'11px 16px',borderTop:'1px solid #f3f4f6' }}>{obj}</td>
                    <td style={{ color:'#334155',fontWeight:800,fontSize:15,padding:'11px 16px',borderTop:'1px solid #f3f4f6' }}>—%</td>
                    <td style={{ color:'#6b7280',fontSize:15,padding:'11px 16px',borderTop:'1px solid #f3f4f6' }}>—</td>
                    <td style={{ padding:'11px 16px',borderTop:'1px solid #f3f4f6' }}>
                      <span style={{ background:'#f3f4f6',color:'#6b7280',fontSize:16,
                        padding:'2px 10px',borderRadius:2,fontWeight:700 }}>Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ChartPlaceholder label="Target vs Actual Achievement (All Objectives)" type="bar" color={C} height={120} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <ChartPlaceholder label="Training Completion Rate" type="donut" color={C} height={160} />
          <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden', flex:1 }}>
            <div style={{ background:'#0F172A', padding:'11px 16px' }}>
              <p style={{ color:'#fff', fontSize:16, fontWeight:800, textTransform:'uppercase' }}>Training Summary</p>
            </div>
            {['Total Employees','Trained','Pending','Overdue'].map(k=>(
              <div key={k} style={{ display:'flex', justifyContent:'space-between',
                padding:'14px 20px', borderBottom:'1px solid #f3f4f6' }}>
                <span style={{ color:'#334155', fontSize:15 }}>{k}</span>
                <span style={{ color:'#0F172A', fontWeight:900, fontSize:15 }}>—</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
