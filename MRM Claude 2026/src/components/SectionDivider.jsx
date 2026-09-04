export default function SectionDivider({ label, color='#1E40AF' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
      <div style={{ width:3, height:14, background:color, borderRadius:1 }} />
      <p style={{ color, fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em' }}>{label}</p>
      <div style={{ flex:1, height:1, background:'#e5e7eb' }} />
    </div>
  )
}
