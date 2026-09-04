import SlideShell from '../components/SlideShell'
import KPITile from '../components/KPITile'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#1E40AF'
const SITES = [
  { site:'Site-I', color:'#1E40AF' }, { site:'Site-III', color:'#0369A1' },
  { site:'Site-IV', color:'#334155' }, { site:'Site-V', color:'#111827' },
]

export default function IPQAOverview() {
  return (
    <SlideShell accentColor={C} sectionLabel="IPQA" slideTitle="IPQA Overview — All Sites" slideNumber="5 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:14, height:'100%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {['Total Line Clearances','Total Line Closures','IPQA Incidents','Calibrations Pending']
            .map(label => <KPITile key={label} label={label} value="—" small color={C} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, flex:1, minHeight:0 }}>
          <ChartPlaceholder label="Line Clearance by Site" type="bar" color={C} height="100%" />
          <ChartPlaceholder label="Line Closure by Site" type="bar" color={C} height="100%" />
          <ChartPlaceholder label="Monthly IPQA Trend" type="line" color={C} height="100%" />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {SITES.map(({ site, color }) => (
            <div key={site} style={{ border:'1px solid #e5e7eb', borderTop:`3px solid ${color}`,
              borderRadius:4, padding:'12px 14px' }}>
              <p style={{ background:color, color:'#fff', fontSize:16, fontWeight:800,
                display:'inline-block', padding:'2px 8px', borderRadius:2, marginBottom:10 }}>{site}</p>
              {['Clearance','Closure','Incidents'].map(k=>(
                <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ color:'#6b7280', fontSize:17 }}>{k}</span>
                  <span style={{ color:'#0F172A', fontWeight:800, fontSize:16 }}>—</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
