const ICONS = { bar:'▦', line:'∿', pie:'◕', donut:'◎', area:'◬', table:'☰' }

export default function ChartPlaceholder({ label='Chart', type='bar', color='#1E40AF', height=160 }) {
  return (
    <div style={{
      height, background:'#f9f9f9', border:`2px dashed ${color}55`,
      borderRadius:4, display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:8
    }}>
      <span style={{ fontSize:32, color:`${color}55` }}>{ICONS[type]||'▦'}</span>
      <p style={{ color:'#6b7280', fontSize:14, fontWeight:700 }}>{label}</p>
      <p style={{ color:'#d1d5db', fontSize:12 }}>Data will be added</p>
    </div>
  )
}
