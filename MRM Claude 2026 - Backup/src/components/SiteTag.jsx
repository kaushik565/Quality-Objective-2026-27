const SITE_COLORS = {
  'Site-I':'#CC0000','Site-III':'#7F1D1D','Site-IV':'#374151','Site-V':'#111827'
}
export default function SiteTag({ site }) {
  const color = SITE_COLORS[site] || '#CC0000'
  return (
    <span style={{
      background:color, color:'#fff',
      fontSize:12, fontWeight:800, padding:'4px 12px',
      borderRadius:2, letterSpacing:'0.05em', whiteSpace:'nowrap'
    }}>{site}</span>
  )
}
