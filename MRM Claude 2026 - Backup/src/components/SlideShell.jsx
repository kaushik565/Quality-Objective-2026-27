export default function SlideShell({ sectionLabel='Section', slideTitle='Slide', slideNumber, accentColor='#CC0000', children }) {
  return (
    <section style={{
      width:'100%', height:'100vh', overflow:'hidden',
      display:'flex', flexDirection:'column', background:'#ffffff',
      fontFamily:"'Segoe UI',system-ui,sans-serif"
    }}>
      <div style={{ height:5, background:`linear-gradient(90deg,${accentColor} 0%,#111111 100%)`, flexShrink:0 }} />

      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'12px 48px', flexShrink:0, background:'#111111',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <span style={{
            background:accentColor, color:'#fff', fontSize:12, fontWeight:800,
            padding:'5px 16px', borderRadius:2, letterSpacing:'0.15em', textTransform:'uppercase'
          }}>{sectionLabel}</span>
          <h2 style={{ color:'#ffffff', fontSize:22, fontWeight:700, letterSpacing:'-0.01em' }}>{slideTitle}</h2>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <img src="https://www.molbiodiagnostics.com/wp-content/uploads/2025/01/footer-logo.png"
            alt="Molbio" style={{ height:26, opacity:0.9 }} onError={e=>e.target.style.display='none'} />
          {slideNumber && <span style={{ color:'rgba(255,255,255,0.35)', fontSize:13, fontFamily:'monospace' }}>{slideNumber}</span>}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflow:'hidden', padding:'16px 48px 12px', minHeight:0 }}>
        {children}
      </div>

      {/* Footer */}
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'7px 48px', background:'#f3f4f6', borderTop:'2px solid #e5e7eb', flexShrink:0
      }}>
        <span style={{ color:'#6b7280', fontSize:12, fontWeight:600 }}>Molbio Diagnostics Limited</span>
        <span style={{ color:accentColor, fontSize:12, fontWeight:700 }}>MRM 2026</span>
        <span style={{ color:'#6b7280', fontSize:12 }}>1st Review Meeting 2026 · Sites: I · III · IV · V</span>
      </div>
    </section>
  )
}
