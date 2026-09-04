import { motion } from 'framer-motion'

export default function SlideShell({ sectionLabel='Section', slideTitle='Slide', slideNumber, accentColor='#DC2626', children }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  return (
    <section style={{
      width: '100%', height: '100vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      /* The ambient animated gradient is handled in styles.css */
      fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif"
    }}>
      
      {/* Floating Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
        style={{
          margin: '16px 24px 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px', borderRadius: '100px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 1)',
          boxShadow: '0 8px 32px -8px rgba(15, 23, 42, 0.08)',
          flexShrink: 0,
          zIndex: 10
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #0F172A 100%)`, 
            color: '#fff', fontSize: 13, fontWeight: 800,
            padding: '6px 20px', borderRadius: '100px', 
            letterSpacing: '0.15em', textTransform: 'uppercase',
            boxShadow: `0 4px 12px -2px ${accentColor}40`
          }}>{sectionLabel}</span>
          <h2 style={{ color: '#0F172A', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>{slideTitle}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {slideNumber && <span style={{ color: '#64748B', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}>{slideNumber}</span>}
          <div style={{ width: 1, height: 24, background: '#E2E8F0' }} />
          <img src="/molbio-black-logo.png"
            alt="Molbio" style={{ height: 32 }} onError={e=>e.target.style.display='none'} />
        </div>
      </motion.div>

      {/* Main Glass Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="glass-panel"
        style={{ 
          flex: 1, overflow: 'hidden', 
          margin: '0 24px 16px', borderRadius: 24,
          display: 'flex', flexDirection: 'column',
          position: 'relative'
        }}>
        
        <div style={{ flex: 1, overflow: 'hidden', padding: '32px 40px', minHeight: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Wrap children in animated divs if they are arrays, else just animate the wrapper */}
          {Array.isArray(children) ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants} style={{ flexShrink: 0 }}>
              {child}
            </motion.div>
          )) : (
            <motion.div variants={itemVariants} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {children}
            </motion.div>
          )}
        </div>

        {/* Integrated Footer inside the glass panel */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 40px', background: 'rgba(241, 245, 249, 0.5)', 
          borderTop: '1px solid rgba(226, 232, 240, 0.8)', flexShrink: 0
        }}>
          <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Molbio Diagnostics Limited</span>
          <span style={{ color: accentColor, fontSize: 13, fontWeight: 800 }}>MRM 2026</span>
          <span style={{ color: '#64748B', fontSize: 13, fontWeight: 500 }}>Quality Assurance · Sites: I · III · IV · V</span>
        </div>
      </motion.div>
    </section>
  )
}
