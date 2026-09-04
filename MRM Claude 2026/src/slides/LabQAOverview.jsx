import SlideShell from '../components/SlideShell'
import KPITile from '../components/KPITile'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#0369A1'
const SITES=[{site:'Site-I',color:'#1E40AF'},{site:'Site-III',color:'#0369A1'},{site:'Site-IV',color:'#334155'},{site:'Site-V',color:'#111827'}]

export default function LabQAOverview() {
  return (
    <SlideShell accentColor={C} sectionLabel="Lab QA" slideTitle="Lab QA Overview — All Sites" slideNumber="10 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:12, height:'100%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {['Reports Verified','Logbooks Reviewed','Equipment Calibrated','Avg Pass Rate']
            .map(label => <KPITile key={label} label={label} value="—" small color={C} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {SITES.map(({ site, color }) => (
            <div key={site} style={{ border:'1px solid #e5e7eb', borderTop:`3px solid ${color}`,
              borderRadius:4, padding:'12px 14px' }}>
              <p style={{ background:color, color:'#fff', fontSize:16, fontWeight:800,
                display:'inline-block', padding:'2px 8px', borderRadius:2, marginBottom:10 }}>{site}</p>
              {['Reports Verified','Logbooks','Pass Rate','Equipment OK'].map(k=>(
                <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ color:'#6b7280', fontSize:17 }}>{k}</span>
                  <span style={{ color:'#0F172A', fontWeight:800, fontSize:16 }}>—</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, flex:1, minHeight:0 }}>
          <ChartPlaceholder label="Monthly Reports Verified Trend" type="bar" color={C} height="100%" />
          <ChartPlaceholder label="Pass / Fail Rate by Test Type" type="donut" color={C} height="100%" />
        </div>
      </div>
    </SlideShell>
  )
}
