import SlideShell from '../components/SlideShell'
import KPITile from '../components/KPITile'
import ChartPlaceholder from '../components/ChartPlaceholder'

const C = '#1E40AF'

export default function IPQASiteI() {
  return (
    <SlideShell accentColor={C} sectionLabel="IPQA" slideTitle={`IPQA — Site-I`} slideNumber="6 / 21">
      <div style={{ display:'flex', flexDirection:'column', gap:12, height:'100%' }}>
        
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12 }}>
          {['Line Clearances','Line Closures','Verifications','Re-verifications','Incidents']
            .map(label => <KPITile key={label} label={label} value="—" small color={C} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, flex:1, minHeight:0 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <ChartPlaceholder label="Monthly Line Clearance & Closure" type="bar" color={C} height={180} />
            <ChartPlaceholder label="Incidents Trend (Monthly)" type="line" color={C} height={120} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <ChartPlaceholder label="Calibration Status" type="donut" color={C} height={150} />
            <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden', flex:1 }}>
              <div style={{ background:'#0F172A', padding:'10px 16px' }}>
                <p style={{ color:'#fff', fontSize:16, fontWeight:800, textTransform:'uppercase' }}>Calibration Summary</p>
              </div>
              {['Total Instruments','Calibrated','Overdue','Due This Month'].map(k=>(
                <div key={k} style={{ display:'flex', justifyContent:'space-between',
                  padding:'11px 16px', borderBottom:'1px solid #f3f4f6' }}>
                  <span style={{ color:'#6b7280', fontSize:15 }}>{k}</span>
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
