import { motion } from 'framer-motion'

export default function KPITile({ label, value='—', unit='', subtext, color='#0F172A', small }) {
  return (
    <motion.div 
      className="glass-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        borderRadius: 16,
        padding: small ? '16px 20px' : '24px 28px',
        display: 'flex', flexDirection: 'column', gap: 8,
        position: 'relative',
        overflow: 'hidden'
      }}>
      
      {/* Decorative gradient orb behind the text to give it depth */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: 'none'
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ color: '#64748B', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
        <p style={{ 
          color: color,
          fontWeight: 900, fontSize: small ? 36 : 48, lineHeight: 1, letterSpacing: '-0.02em',
          paddingBottom: 4 // prevent clipping of gradient text
        }}>
          {value}
          {unit && <span style={{ fontSize: 18, fontWeight: 500, color: '#94A3B8', marginLeft: 6 }}>{unit}</span>}
        </p>
        {subtext && <p style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>{subtext}</p>}
      </div>
    </motion.div>
  )
}
