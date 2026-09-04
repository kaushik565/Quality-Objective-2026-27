const SECTIONS = [
  { num:'01', label:'QMS',                 sub:['Change Controls','Incidents','CA · PA','OOS · Deviations'],  color:'#CC0000', slides:'3–4' },
  { num:'02', label:'IPQA',                sub:['Line Clearance','Batch Closure','Calibration'],              color:'#CC0000', slides:'5–9' },
  { num:'03', label:'Lab QA',              sub:['Reports','Logbooks','Equipment','Pass Rate'],                color:'#7F1D1D', slides:'10–11' },
  { num:'04', label:'Customer Complaints', sub:['Total','Category','Open vs Closed'],                        color:'#7F1D1D', slides:'12–13' },
  { num:'05', label:'Quality Objectives',  sub:['KPI Targets vs Actual','Training'],                         color:'#374151', slides:'14' },
  { num:'06', label:'Audits',              sub:['Internal','External','Findings'],                            color:'#374151', slides:'15' },
  { num:'07', label:'Improvements',        sub:['Done','In-progress','Planned','By Site'],                   color:'#111827', slides:'16–20' },
]

const SITES = [
  ['Site-I',   '#CC0000'],
  ['Site-III', '#7F1D1D'],
  ['Site-IV',  '#374151'],
  ['Site-V',   '#111827'],
]

export default function ContentsSlide() {
  return (
    <section style={{
      width:'100%', height:'100vh', overflow:'hidden', background:'#f3f4f6',
      display:'flex', flexDirection:'column', fontFamily:"'Segoe UI',system-ui,sans-serif"
    }}>
      {/* Top red stripe */}
      <div style={{ height:5, background:'linear-gradient(90deg,#CC0000,#111111)', flexShrink:0 }} />

      {/* Header */}
      <div style={{ background:'#111111', padding:'14px 48px',
        display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div>
          <p style={{ color:'#CC0000', fontSize:13, fontWeight:800, letterSpacing:'0.22em',
            textTransform:'uppercase' }}>Management Review Meeting 2026</p>
          <h2 style={{ color:'#ffffff', fontSize:28, fontWeight:900, letterSpacing:'-0.01em', marginTop:2 }}>
            Agenda &amp; Contents
          </h2>
        </div>
        <img src="https://www.molbiodiagnostics.com/wp-content/uploads/2025/01/footer-logo.png"
          alt="Molbio" style={{ height:26 }} onError={e=>e.target.style.display='none'} />
      </div>

      {/* Card grid */}
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'repeat(4,1fr)',
        gridTemplateRows:'1fr 1fr', gap:6, padding:10, minHeight:0 }}>

        {SECTIONS.map((s) => (
          <div key={s.num} style={{
            background:'#fff', borderRadius:4, overflow:'hidden',
            display:'flex', flexDirection:'column',
            boxShadow:'0 1px 4px rgba(0,0,0,0.08)',
            borderTop:`4px solid ${s.color}`,
          }}>
            {/* Colored top band */}
            <div style={{ background:s.color, padding:'10px 16px',
              display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ color:'#fff', fontSize:32, fontWeight:900, lineHeight:1, opacity:0.25 }}>
                {s.num}
              </span>
              <span style={{ color:'rgba(255,255,255,0.7)', fontSize:12, fontWeight:700 }}>
                Slides {s.slides}
              </span>
            </div>

            {/* Label */}
            <div style={{ padding:'12px 16px 6px', flexShrink:0 }}>
              <p style={{ color:'#111111', fontWeight:900, fontSize:20, lineHeight:1.1 }}>{s.label}</p>
            </div>

            {/* Sub-topics */}
            <div style={{ flex:1, padding:'4px 16px 12px', display:'flex',
              flexDirection:'column', justifyContent:'center', gap:5 }}>
              {s.sub.map((item) => (
                <div key={item} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%',
                    background:s.color, flexShrink:0 }} />
                  <span style={{ fontSize:14, color:'#374151', fontWeight:600 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sites card */}
        <div style={{
          background:'#111111', borderRadius:4, overflow:'hidden',
          display:'flex', flexDirection:'column', justifyContent:'center',
          padding:'16px 20px', gap:14,
          boxShadow:'0 1px 4px rgba(0,0,0,0.12)',
        }}>
          <p style={{ color:'#CC0000', fontSize:13, fontWeight:800,
            textTransform:'uppercase', letterSpacing:'0.18em', marginBottom:4 }}>
            Sites Covered
          </p>
          {SITES.map(([site, color]) => (
            <div key={site} style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:4, height:26, background:color, borderRadius:2, flexShrink:0 }} />
              <span style={{ color:'#ffffff', fontSize:20, fontWeight:800 }}>{site}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:'#111111', borderTop:'2px solid #222', padding:'7px 48px',
        display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
        <span style={{ color:'#6b7280', fontSize:13, fontWeight:600 }}>Molbio Diagnostics Limited</span>
        <span style={{ color:'#CC0000', fontSize:13, fontWeight:800, letterSpacing:'0.1em' }}>MRM 2026</span>
        <span style={{ color:'#6b7280', fontSize:13 }}>1st Review Meeting 2026</span>
      </div>
    </section>
  )
}
