export default function ClosingSlide() {
  return (
    <section style={{
      width:'100%', height:'100vh', overflow:'hidden', background:'#0F172A',
      display:'flex', flexDirection:'column', fontFamily:"'Segoe UI',system-ui,sans-serif"
    }}>
      <div style={{ height:6, background:'#1E40AF', flexShrink:0 }} />
      <div style={{ flex:1, display:'flex' }}>
        {/* Left panel */}
        <div style={{ width:'40%', background:'#1E40AF', display:'flex', flexDirection:'column',
          justifyContent:'center', padding:'48px 56px', flexShrink:0 }}>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:15, fontWeight:700,
            letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:24 }}>
            Management Review Meeting 2026
          </p>
          <h2 style={{ color:'#ffffff', fontSize:64, fontWeight:900, lineHeight:1,
            letterSpacing:'-0.02em', marginBottom:24 }}>
            Thank<br/>You
          </h2>
          <div style={{ width:40, height:3, background:'rgba(255,255,255,0.5)', marginBottom:24 }} />
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:18 }}>Questions &amp; Discussion</p>
        </div>

        {/* Right panel */}
        <div style={{ flex:1, display:'flex', flexDirection:'column',
          justifyContent:'center', padding:'48px 64px' }}>
          <img src="https://www.molbiodiagnostics.com/wp-content/uploads/2025/01/footer-logo.png"
            alt="Molbio" style={{ height:80, marginBottom:48, objectFit:'contain', objectPosition:'left' }}
            onError={e=>e.target.style.display='none'} />

          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, marginBottom:32, lineHeight:1.7 }}>
            Molbio Diagnostics Limited<br/>
            Quality Assurance Department
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
            {[['Site-I','#1E40AF'],['Site-III','#0369A1'],['Site-IV','#334155'],['Site-V','#111827']].map(([s,c])=>(
              <div key={s} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:3, height:24, background:c, borderRadius:1 }} />
                <span style={{ color:'#ffffff', fontSize:16, fontWeight:700 }}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{ color:'rgba(255,255,255,0.2)', fontSize:17, letterSpacing:'0.1em' }}>
            1st Review Meeting 2026 · Confidential
          </p>
        </div>
      </div>
    </section>
  )
}
