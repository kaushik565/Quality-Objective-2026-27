import { motion } from 'framer-motion'

export default function TitleSlide() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const textVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
  }

  const slideRightVars = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', damping: 20 } }
  }

  return (
    <section data-state="title-slide" style={{
      width:'100%', height:'100vh', overflow:'hidden',
      display:'flex', flexDirection:'column',
      fontFamily:"'Outfit', 'Segoe UI', system-ui, sans-serif",
      position: 'relative'
    }}>
      {/* Dynamic Background Elements */}
      <div style={{
        position: 'absolute', top: -200, left: -200, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: -300, right: -100, width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
      }} />

      <div style={{ height: 6, background: 'linear-gradient(90deg, #DC2626, #000000)', flexShrink: 0, zIndex: 10 }} />

      <motion.div 
        variants={containerVars} initial="hidden" animate="show"
        style={{ flex:1, display:'flex', overflow:'hidden', position: 'relative', zIndex: 1 }}>
        
        {/* Left premium dark glass panel */}
        <div style={{
          width:'45%', display:'flex', flexDirection:'column',
          justifyContent:'center', padding:'48px 64px', flexShrink:0,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(30px)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '20px 0 50px -20px rgba(0,0,0,0.5)'
        }}>
          {/* Molbio logo */}
          <motion.img
            variants={textVars}
            src="https://www.molbiodiagnostics.com/wp-content/uploads/2025/01/footer-logo.png"
            alt="Molbio"
            style={{ height:80, marginBottom:44, objectFit:'contain', objectPosition:'left' }}
            onError={e => { e.target.style.display = 'none' }}
          />

          <motion.p variants={textVars} style={{ color:'#DC2626', fontSize:14, fontWeight:800, letterSpacing:'0.3em',
            textTransform:'uppercase', marginBottom:16 }}>
            Management Review Meeting
          </motion.p>

          <motion.h1 variants={textVars} style={{ color:'#ffffff', fontSize:64, fontWeight:900, lineHeight:1.05,
            letterSpacing:'-0.03em', marginBottom:12 }}>
            Quality <span style={{ color:'#DC2626' }}>Review</span>
          </motion.h1>

          <motion.p variants={textVars} style={{ color:'rgba(255,255,255,0.9)', fontSize:42, fontWeight:300, marginBottom:32 }}>
            2026
          </motion.p>

          <motion.div variants={textVars} style={{ width:60, height:4, background:'linear-gradient(90deg, #DC2626, #EF4444)', marginBottom:32, borderRadius: 2 }} />

          <motion.p variants={textVars} style={{ color:'rgba(255,255,255,0.6)', fontSize:16, marginBottom:8, letterSpacing: '0.02em' }}>
            Quality Assurance Department
          </motion.p>

          <motion.p variants={textVars} style={{ color:'rgba(255,255,255,0.4)', fontSize:16, fontWeight:600,
            letterSpacing:'0.05em' }}>
            1st Review Meeting 2026
          </motion.p>
        </div>

        {/* Right floating content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column',
          justifyContent:'center', padding:'48px 80px' }}>
          
          <motion.div variants={textVars} className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
            <p style={{ color:'#64748B', fontSize:14, fontWeight:800, textTransform:'uppercase',
              letterSpacing:'0.2em', marginBottom:32 }}>Sites Covered</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[['Site-I','#F59E0B'],['Site-III','#A855F7'],['Site-IV','#EC4899'],['Site-V','#14B8A6']].map(([site, color], idx) => (
                <motion.div key={site} variants={slideRightVars} style={{
                  display:'flex', alignItems:'center', gap:16,
                  paddingBottom:20, borderBottom: idx === 3 ? 'none' : '1px solid rgba(226,232,240,0.6)'
                }}>
                  <div style={{ width:6, height:40, background:color, borderRadius:3, flexShrink:0, boxShadow: `0 4px 10px ${color}40` }} />
                  <p style={{ color: color, fontWeight:800, fontSize:22 }}>{site}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={textVars} style={{ marginTop:24, padding:'20px 24px', background:'rgba(241,245,249,0.5)',
              borderLeft:'4px solid #DC2626', borderRadius:'0 12px 12px 0' }}>
              <p style={{ color:'#475569', fontSize:16, lineHeight:1.8 }}>
                <strong style={{ color:'#0F172A', fontWeight: 800 }}>Sections:</strong> QMS · IPQA · Lab QA ·
                Customer Complaints · Quality Objectives · Audits · Improvements
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ background:'#0F172A', padding:'12px 56px', display:'flex',
        justifyContent:'space-between', alignItems:'center', flexShrink:0, zIndex: 10 }}>
        <span style={{ color:'rgba(255,255,255,0.4)', fontSize:14, fontWeight: 500, letterSpacing: '0.05em' }}>MOLBIO DIAGNOSTICS LIMITED</span>
        <span style={{ color:'#DC2626', fontSize:14, fontWeight:800, letterSpacing: '0.1em' }}>CONFIDENTIAL</span>
        <span style={{ color:'rgba(255,255,255,0.4)', fontSize:14, fontWeight: 500 }}>2026</span>
      </motion.div>
    </section>
  )
}
