import SlideShell from '../components/SlideShell'
import KPITile from '../components/KPITile'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#1E40AF'
const SITES=[{site:'Site-I',color:'#1E40AF'},{site:'Site-III',color:'#0369A1'},{site:'Site-IV',color:'#334155'},{site:'Site-V',color:'#111827'}]

export default function CustomerComplaintsOverview() {
  return (
    <SlideShell accentColor={C} sectionLabel="Customer Complaints" slideTitle="Complaints Overview" slideNumber="12 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:12, height:'100%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {['Total Complaints','Closed','Open','In Progress']
            .map(label => <KPITile key={label} label={label} value="—" small color={C} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14, flex:1, minHeight:0 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <ChartPlaceholder label="Monthly Complaints Trend (Open vs Closed)" type="area" color={C} height={160} />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
              {SITES.map(({ site, color }) => (
                <div key={site} style={{ border:'1px solid #e5e7eb', borderTop:`3px solid ${color}`,
                  borderRadius:4, padding:'14px 18px' }}>
                  <p style={{ background:color, color:'#fff', fontSize:17, fontWeight:800,
                    display:'inline-block', padding:'2px 6px', borderRadius:2, marginBottom:6 }}>{site}</p>
                  <p style={{ color:'#0F172A', fontWeight:900, fontSize:22 }}>—</p>
                  <p style={{ color:'#9ca3af', fontSize:16 }}>complaints</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <ChartPlaceholder label="By Category" type="pie" color={C} height={150} />
            <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden', flex:1 }}>
              <div style={{ background:'#0F172A', padding:'10px 16px' }}>
                <p style={{ color:'#fff', fontSize:16, fontWeight:800, textTransform:'uppercase' }}>By Category</p>
              </div>
              {['Product Quality','Packaging','Documentation','Delivery','Other'].map(k=>(
                <div key={k} style={{ display:'flex', justifyContent:'space-between',
                  padding:'10px 16px', borderBottom:'1px solid #f3f4f6' }}>
                  <span style={{ color:'#334155', fontSize:15 }}>{k}</span>
                  <span style={{ color:'#0F172A', fontWeight:800 }}>—</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
