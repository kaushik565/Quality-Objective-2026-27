const SITE_COLORS = {
  'Site-I':'#1E40AF','Site-III':'#0369A1','Site-IV':'#334155','Site-V':'#111827'
}
export default function SiteTag({ site }) {
  const color = SITE_COLORS[site] || '#1E40AF'
  return (
    <span style={{
      background:color, color:'#fff',
      fontSize:12, fontWeight:800, padding:'4px 12px',
      borderRadius:2, letterSpacing:'0.05em', whiteSpace:'nowrap'
    }}>{site}</span>
  )
}
