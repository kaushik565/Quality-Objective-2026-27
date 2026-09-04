export default function KPITile({ label, value='—', unit='', subtext, color='#CC0000', small }) {
  return (
    <div style={{
      background:'#f8f8f8', border:'1px solid #e5e7eb',
      borderTop:`4px solid ${color}`, borderRadius:4,
      padding: small ? '14px 18px' : '18px 22px',
      display:'flex', flexDirection:'column', gap:6
    }}>
      <p style={{ color:'#6b7280', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>{label}</p>
      <p style={{ color:'#111111', fontWeight:900, fontSize: small ? 32 : 42, lineHeight:1, letterSpacing:'-0.02em' }}>
        {value}
        {unit && <span style={{ fontSize:16, fontWeight:400, color:'#9ca3af', marginLeft:4 }}>{unit}</span>}
      </p>
      {subtext && <p style={{ color:'#9ca3af', fontSize:12 }}>{subtext}</p>}
    </div>
  )
}
