export default function TitleSlide() {
  return (
    <section data-state="title-slide" style={{
      width:'100%', height:'100vh', overflow:'hidden',
      background:'#ffffff', display:'flex', flexDirection:'column',
      fontFamily:"'Segoe UI',system-ui,sans-serif"
    }}>
      <div style={{ height:6, background:'#CC0000', flexShrink:0 }} />

      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
        {/* Left black panel */}
        <div style={{
          width:'45%', background:'#111111', display:'flex', flexDirection:'column',
          justifyContent:'center', padding:'48px 56px', flexShrink:0
        }}>
          {/* Molbio logo — bigger */}
          <img
            src="https://www.molbiodiagnostics.com/wp-content/uploads/2025/01/footer-logo.png"
            alt="Molbio"
            style={{ height:80, marginBottom:44, objectFit:'contain', objectPosition:'left' }}
            onError={e => { e.target.style.display = 'none' }}
          />

          {/* Line 1: label */}
          <p style={{ color:'#CC0000', fontSize:15, fontWeight:800, letterSpacing:'0.25em',
            textTransform:'uppercase', marginBottom:14 }}>
            Management Review Meeting
          </p>

          {/* Line 2: main heading */}
          <h1 style={{ color:'#ffffff', fontSize:58, fontWeight:900, lineHeight:1.05,
            letterSpacing:'-0.02em', marginBottom:8 }}>
            Quality <span style={{ color:'#CC0000' }}>Review</span>
          </h1>

          {/* Line 3: year */}
          <p style={{ color:'#ffffff', fontSize:36, fontWeight:300, marginBottom:28 }}>2026</p>

          <div style={{ width:48, height:3, background:'#CC0000', marginBottom:28 }} />

          {/* Line 4: dept */}
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, marginBottom:8 }}>
            Quality Assurance Department
          </p>

          {/* Line 5: review number */}
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:16, fontWeight:600,
            letterSpacing:'0.05em' }}>
            1st Review Meeting 2026
          </p>
        </div>

        {/* Right white panel */}
        <div style={{ flex:1, display:'flex', flexDirection:'column',
          justifyContent:'center', padding:'48px 64px', background:'#ffffff' }}>
          <p style={{ color:'#9ca3af', fontSize:15, fontWeight:700, textTransform:'uppercase',
            letterSpacing:'0.2em', marginBottom:32 }}>Sites Covered — 2026</p>

          {[['Site-I','#CC0000'],['Site-III','#7F1D1D'],['Site-IV','#374151'],['Site-V','#111827']].map(([site, color]) => (
            <div key={site} style={{
              display:'flex', alignItems:'center', gap:16, marginBottom:20,
              paddingBottom:20, borderBottom:'1px solid #f3f4f6'
            }}>
              <div style={{ width:4, height:40, background:color, borderRadius:2, flexShrink:0 }} />
              <p style={{ color:color, fontWeight:800, fontSize:20 }}>{site}</p>
            </div>
          ))}

          <div style={{ marginTop:8, padding:'16px 20px', background:'#f8f8f8',
            borderLeft:'3px solid #CC0000', borderRadius:2 }}>
            <p style={{ color:'#6b7280', fontSize:17, lineHeight:1.8 }}>
              <strong style={{ color:'#111111' }}>Sections:</strong> QMS · IPQA · Lab QA ·
              Customer Complaints · Quality Objectives · Audits · Improvements
            </p>
          </div>
        </div>
      </div>

      <div style={{ background:'#111111', padding:'10px 56px', display:'flex',
        justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
        <span style={{ color:'rgba(255,255,255,0.4)', fontSize:17 }}>Molbio Diagnostics Limited</span>
        <span style={{ color:'#CC0000', fontSize:17, fontWeight:700 }}>CONFIDENTIAL</span>
        <span style={{ color:'rgba(255,255,255,0.4)', fontSize:17 }}>2026</span>
      </div>
    </section>
  )
}
