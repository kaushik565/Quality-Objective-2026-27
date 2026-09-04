import { useState } from 'react'
import SlideShell from '../components/SlideShell'

// ─────────────────────────────────────────────────────────────────────────────
// DATA — fill Dec–May 2026 values (curr) when received from sites
// ─────────────────────────────────────────────────────────────────────────────
const SITES_DATA = [
  {
    site: 'Site-I', color: '#CC0000',
    last: {
      avgPct: 30, totalItems: 1161,
      overall: { IR:10, OOS:49, CA:54, CC:13, PA:60, INV:-8, DEV:31 },
      events: [
        { code:'PA',  records:29,  pct:60, desc:'Processing Time Reduced',   fromDays:135, toDays:54 },
        { code:'CA',  records:89,  pct:54, desc:'Avg Days to Close Reduced', fromDays:91,  toDays:42 },
        { code:'OOS', records:259, pct:49, desc:'Improvement',               fromDays:21,  toDays:17 },
        { code:'DEV', records:30,  pct:31, desc:'Avg Closure Days Reduced',  fromDays:87,  toDays:60 },
        { code:'CC',  records:492, pct:13, desc:'Closure Days Reduced',      fromDays:46,  toDays:40 },
        { code:'IR',  records:262, pct:10, desc:'Closure Days Reduced',      fromDays:20,  toDays:18 },
      ],
    },
    curr: {
      avgPct: 0, totalItems: 0,
      overall: { IR:0, OOS:0, CA:0, CC:0, PA:0, INV:0, DEV:0 },
      events: [
        { code:'PA',  records:0, pct:0, desc:'Processing Time Reduced',   fromDays:0, toDays:0 },
        { code:'CA',  records:0, pct:0, desc:'Avg Days to Close Reduced', fromDays:0, toDays:0 },
        { code:'OOS', records:0, pct:0, desc:'Improvement',               fromDays:0, toDays:0 },
        { code:'DEV', records:0, pct:0, desc:'Avg Closure Days Reduced',  fromDays:0, toDays:0 },
        { code:'CC',  records:0, pct:0, desc:'Closure Days Reduced',      fromDays:0, toDays:0 },
        { code:'IR',  records:0, pct:0, desc:'Closure Days Reduced',      fromDays:0, toDays:0 },
      ],
    },
  },
  {
    site: 'Site-III', color: '#7F1D1D',
    last: {
      avgPct: 36, totalItems: 637,
      overall: { IR:36, OOS:49, CA:16, CC:61, PA:6, INV:72, DEV:12 },
      events: [
        { code:'CC',  records:261, pct:61, desc:'Closure Days Reduced',      fromDays:41, toDays:16 },
        { code:'OOS', records:159, pct:49, desc:'Improvement',               fromDays:14, toDays:9  },
        { code:'IR',  records:82,  pct:36, desc:'Closure Days Reduced',      fromDays:25, toDays:16 },
        { code:'CA',  records:52,  pct:16, desc:'Avg Days to Close Reduced', fromDays:56, toDays:47 },
        { code:'DEV', records:17,  pct:12, desc:'Avg Closure Days Reduced',  fromDays:73, toDays:64 },
        { code:'PA',  records:66,  pct:6,  desc:'Processing Time Reduced',   fromDays:36, toDays:34 },
      ],
    },
    curr: {
      avgPct: 0, totalItems: 0,
      overall: { IR:0, OOS:0, CA:0, CC:0, PA:0, INV:0, DEV:0 },
      events: [
        { code:'CC',  records:0, pct:0, desc:'Closure Days Reduced',      fromDays:0, toDays:0 },
        { code:'OOS', records:0, pct:0, desc:'Improvement',               fromDays:0, toDays:0 },
        { code:'IR',  records:0, pct:0, desc:'Closure Days Reduced',      fromDays:0, toDays:0 },
        { code:'CA',  records:0, pct:0, desc:'Avg Days to Close Reduced', fromDays:0, toDays:0 },
        { code:'DEV', records:0, pct:0, desc:'Avg Closure Days Reduced',  fromDays:0, toDays:0 },
        { code:'PA',  records:0, pct:0, desc:'Processing Time Reduced',   fromDays:0, toDays:0 },
      ],
    },
  },
  {
    site: 'Site-IV', color: '#374151',
    last: {
      avgPct: 19, totalItems: 55,
      overall: { IR:26, OOS:0, CA:20, CC:17, PA:0, INV:0, DEV:67 },
      events: [
        { code:'DEV', records:3,  pct:67, desc:'Avg Closure Days Reduced',   fromDays:180, toDays:60 },
        { code:'IR',  records:10, pct:26, desc:'Closure Days Reduced',       fromDays:27,  toDays:20 },
        { code:'CA',  records:10, pct:20, desc:'Avg Days to Close Reduced',  fromDays:95,  toDays:76 },
        { code:'CC',  records:30, pct:17, desc:'Avg Closure Days Reduced',   fromDays:23,  toDays:19 },
        { code:'PA',  records:1,  pct:0,  desc:'Processing Time',            fromDays:0,   toDays:0  },
        { code:'OOS', records:1,  pct:0,  desc:'Avg Closure Days',           fromDays:28,  toDays:0  },
      ],
    },
    curr: {
      avgPct: 0, totalItems: 0,
      overall: { IR:0, OOS:0, CA:0, CC:0, PA:0, INV:0, DEV:0 },
      events: [
        { code:'DEV', records:0, pct:0, desc:'Avg Closure Days Reduced',  fromDays:0, toDays:0 },
        { code:'IR',  records:0, pct:0, desc:'Closure Days Reduced',      fromDays:0, toDays:0 },
        { code:'CA',  records:0, pct:0, desc:'Avg Days to Close Reduced', fromDays:0, toDays:0 },
        { code:'CC',  records:0, pct:0, desc:'Avg Closure Days Reduced',  fromDays:0, toDays:0 },
        { code:'PA',  records:0, pct:0, desc:'Processing Time',           fromDays:0, toDays:0 },
        { code:'OOS', records:0, pct:0, desc:'Avg Closure Days',          fromDays:0, toDays:0 },
      ],
    },
  },
  {
    site: 'Site-V', color: '#111827',
    last: {
      avgPct: 36, totalItems: 582,
      overall: { IR:28, OOS:59, CA:52, CC:23, PA:54, INV:-6, DEV:42 },
      events: [
        { code:'OOS', records:89,  pct:59, desc:'Improvement',               fromDays:12, toDays:7  },
        { code:'PA',  records:37,  pct:54, desc:'Processing Time Reduced',   fromDays:63, toDays:29 },
        { code:'CA',  records:70,  pct:52, desc:'NC Closure Days Reduced',   fromDays:56, toDays:27 },
        { code:'DEV', records:12,  pct:42, desc:'Avg Closure Days Reduced',  fromDays:74, toDays:43 },
        { code:'IR',  records:196, pct:28, desc:'Closure Days Reduced',      fromDays:18, toDays:13 },
        { code:'CC',  records:178, pct:23, desc:'Closure Days Reduced',      fromDays:50, toDays:39 },
      ],
    },
    curr: {
      avgPct: 0, totalItems: 0,
      overall: { IR:0, OOS:0, CA:0, CC:0, PA:0, INV:0, DEV:0 },
      events: [
        { code:'OOS', records:0, pct:0, desc:'Improvement',               fromDays:0, toDays:0 },
        { code:'PA',  records:0, pct:0, desc:'Processing Time Reduced',   fromDays:0, toDays:0 },
        { code:'CA',  records:0, pct:0, desc:'NC Closure Days Reduced',   fromDays:0, toDays:0 },
        { code:'DEV', records:0, pct:0, desc:'Avg Closure Days Reduced',  fromDays:0, toDays:0 },
        { code:'IR',  records:0, pct:0, desc:'Closure Days Reduced',      fromDays:0, toDays:0 },
        { code:'CC',  records:0, pct:0, desc:'Closure Days Reduced',      fromDays:0, toDays:0 },
      ],
    },
  },
]

// ── Overall event bars data ───────────────────────────────────────────────
const OVERALL_EVENTS = [
  { code:'OOS', lastPct:39, currPct:0 },
  { code:'DEV', lastPct:38, currPct:0 },
  { code:'CA',  lastPct:36, currPct:0 },
  { code:'PA',  lastPct:30, currPct:0 },
  { code:'CC',  lastPct:29, currPct:0 },
  { code:'IR',  lastPct:25, currPct:0 },
  { code:'INV', lastPct:15, currPct:0 },
]

// ─────────────────────────────────────────────────────────────────────────────
const ratingColor = (pct) => {
  if (pct === null || pct === undefined) return '#9ca3af'
  if (pct >= 51) return '#15803d'
  if (pct >= 26) return '#1d4ed8'
  if (pct >= 11) return '#d97706'
  if (pct >= 0)  return '#6b7280'
  return '#CC0000'
}

const EVENT_KEYS = ['IR','OOS','CA','CC','PA','INV','DEV']

// ── Period label pill ─────────────────────────────────────────────────────
function PeriodPill({ label, bg, text }) {
  return (
    <span style={{ background:bg, color:text, fontSize:10, fontWeight:800,
      padding:'2px 7px', borderRadius:2, letterSpacing:'0.04em' }}>{label}</span>
  )
}

// ── Site card (overview) ──────────────────────────────────────────────────
function SiteCard({ data, onClick }) {
  const { site, color, last, curr } = data
  return (
    <div onClick={onClick} style={{
      border:`2px solid ${color}`, borderRadius:6, overflow:'hidden',
      display:'flex', flexDirection:'column', cursor:'pointer',
      transition:'transform 0.15s, box-shadow 0.15s', background:'#fff',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${color}44` }}
    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
    >
      {/* Header */}
      <div style={{ background:color, padding:'7px 12px',
        display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
        <span style={{ color:'#fff', fontWeight:900, fontSize:17 }}>{site}</span>
        <span style={{ color:'rgba(255,255,255,0.55)', fontSize:10, fontWeight:700 }}>click to expand →</span>
      </div>

      {/* Avg Improvement + Total Items — two periods side by side */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
        borderBottom:'2px solid #f3f4f6', flexShrink:0 }}>
        {/* Avg Improvement */}
        <div style={{ padding:'8px 12px', borderRight:'1px solid #f3f4f6' }}>
          <p style={{ fontSize:10, color:'#9ca3af', fontWeight:700,
            textTransform:'uppercase', marginBottom:4 }}>Avg Improvement</p>
          <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <span style={{ fontSize:28, fontWeight:900, color:'#6b7280' }}>{last.avgPct}%</span>
            <PeriodPill label="Jun–Nov 25" bg="#f3f4f6" text="#6b7280" />
          </div>
          <div style={{ display:'flex', alignItems:'baseline', gap:8, marginTop:3 }}>
            <span style={{ fontSize:28, fontWeight:900, color: ratingColor(curr.avgPct) }}>{curr.avgPct}%</span>
            <PeriodPill label="Dec–May 26" bg={color} text="#fff" />
          </div>
        </div>
        {/* Total Items */}
        <div style={{ padding:'8px 12px' }}>
          <p style={{ fontSize:10, color:'#9ca3af', fontWeight:700,
            textTransform:'uppercase', marginBottom:4 }}>Total Items</p>
          <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <span style={{ fontSize:28, fontWeight:900, color:'#9ca3af' }}>{last.totalItems.toLocaleString()}</span>
            <PeriodPill label="Jun–Nov 25" bg="#f3f4f6" text="#6b7280" />
          </div>
          <div style={{ display:'flex', alignItems:'baseline', gap:8, marginTop:3 }}>
            <span style={{ fontSize:28, fontWeight:900, color:'#111111' }}>{curr.totalItems.toLocaleString()}</span>
            <PeriodPill label="Dec–May 26" bg={color} text="#fff" />
          </div>
        </div>
      </div>

      {/* Event rows — both periods */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:0 }}>
        {EVENT_KEYS.map((key, ki) => {
          const lv = last.overall[key] ?? 0
          const cv = curr.overall[key] ?? 0
          return (
            <div key={key} style={{
              flex:1, display:'grid', gridTemplateColumns:'40px 1fr 44px 44px',
              alignItems:'center', gap:6, padding:'0 10px',
              borderBottom: ki < EVENT_KEYS.length-1 ? '1px solid #f9f9f9' : 'none',
              background: ki % 2 === 0 ? '#fff' : '#fafafa',
            }}>
              <span style={{ background:color, color:'#fff', fontWeight:900, fontSize:13,
                padding:'3px 0', borderRadius:2, textAlign:'center' }}>{key}</span>
              <div style={{ position:'relative', height:14, background:'#f3f4f6', borderRadius:3 }}>
                {/* last MRM bar — grey */}
                <div style={{ position:'absolute', left:0, top:0,
                  width:`${Math.max(0,lv)}%`, height:'100%', background:'#d1d5db', borderRadius:3 }} />
                {/* current bar — colored */}
                <div style={{ position:'absolute', left:0, top:0,
                  width:`${Math.max(0,cv)}%`, height:'100%', background:color,
                  opacity:0.7, borderRadius:3 }} />
              </div>
              <span style={{ fontSize:13, fontWeight:700, color:'#9ca3af', textAlign:'right' }}>{lv}%</span>
              <span style={{ fontSize:20, fontWeight:900, color:ratingColor(cv), textAlign:'right' }}>{cv}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── From→To bar ───────────────────────────────────────────────────────────
function FromToBar({ fromDays, toDays, color }) {
  const maxDays = Math.max(fromDays, 1)
  const toW = fromDays > 0 ? Math.round((toDays / maxDays) * 100) : 0
  return (
    <div style={{ width:'100%' }}>
      <div style={{ position:'relative', height:14, background:'#e5e7eb', borderRadius:5, marginBottom:5 }}>
        <div style={{ position:'absolute', left:0, top:0, width:'100%', height:'100%', background:'#d1d5db', borderRadius:5 }} />
        <div style={{ position:'absolute', left:0, top:0, width:`${toW}%`, height:'100%', background:color, borderRadius:5 }} />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontSize:13, color:'#6b7280' }}>From: <strong style={{ color:'#374151' }}>{fromDays}d</strong></span>
        <span style={{ fontSize:13, color:color, fontWeight:700 }}>To: <strong>{toDays}d</strong></span>
      </div>
    </div>
  )
}

// ── Event metric card (drill-down) ────────────────────────────────────────
function EventCard({ lastEv, currEv, color }) {
  return (
    <div style={{
      border:`1px solid #e5e7eb`, borderTop:`4px solid ${color}`, borderRadius:4,
      background:'#fff', display:'flex', flexDirection:'column', padding:'12px 16px',
      height:'100%', width:'100%', boxSizing:'border-box', gap:8, justifyContent:'space-between',
    }}>
      {/* Code + improvement comparison */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ background:color, color:'#fff', fontWeight:900, fontSize:15,
          padding:'4px 12px', borderRadius:3 }}>{lastEv.code}</span>
        <div style={{ textAlign:'right' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <PeriodPill label="Jun–Nov 25" bg="#f3f4f6" text="#6b7280" />
            <span style={{ fontSize:20, fontWeight:900, color:'#9ca3af' }}>↑{lastEv.pct}%</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:3 }}>
            <PeriodPill label="Dec–May 26" bg={color} text="#fff" />
            <span style={{ fontSize:28, fontWeight:900, color:ratingColor(currEv.pct) }}>↑{currEv.pct}%</span>
          </div>
        </div>
      </div>

      {/* Records comparison */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        <div style={{ background:'#f9f9f9', borderRadius:3, padding:'6px 10px' }}>
          <p style={{ fontSize:10, color:'#9ca3af', fontWeight:700, textTransform:'uppercase' }}>Records (Jun–Nov 25)</p>
          <p style={{ fontSize:32, fontWeight:900, color:'#9ca3af', lineHeight:1.1 }}>{lastEv.records}</p>
        </div>
        <div style={{ background:`${color}11`, border:`1px solid ${color}33`, borderRadius:3, padding:'6px 10px' }}>
          <p style={{ fontSize:10, color:color, fontWeight:700, textTransform:'uppercase' }}>Records (Dec–May 26)</p>
          <p style={{ fontSize:32, fontWeight:900, color:'#111111', lineHeight:1.1 }}>{currEv.records}</p>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize:13, color:'#6b7280', fontWeight:600 }}>{lastEv.desc}</p>

      {/* From→To: last MRM */}
      <div>
        <p style={{ fontSize:10, color:'#9ca3af', fontWeight:700, textTransform:'uppercase', marginBottom:4 }}>
          Jun–Nov 25 Closure Days
        </p>
        <FromToBar fromDays={lastEv.fromDays} toDays={lastEv.toDays} color="#9ca3af" />
      </div>
      {/* From→To: current */}
      <div>
        <p style={{ fontSize:10, color:color, fontWeight:700, textTransform:'uppercase', marginBottom:4 }}>
          Dec–May 26 Closure Days
        </p>
        <FromToBar fromDays={currEv.fromDays} toDays={currEv.toDays} color={color} />
      </div>
    </div>
  )
}

// ── Drill-down panel ──────────────────────────────────────────────────────
function DrillDown({ data, onBack }) {
  const { site, color, last, curr } = data
  return (
    <div style={{ display:'flex', gap:10, height:'100%', minHeight:0 }}>

      {/* LEFT: site summary */}
      <div style={{ width:190, flexShrink:0, display:'flex', flexDirection:'column', gap:8 }}>
        <button onClick={onBack} style={{
          background:'#f3f4f6', border:'1px solid #e5e7eb', borderRadius:4,
          padding:'7px 12px', cursor:'pointer', fontSize:13, fontWeight:700,
          color:'#374151', transition:'background 0.15s', flexShrink:0,
        }}
        onMouseEnter={e=>e.currentTarget.style.background='#e5e7eb'}
        onMouseLeave={e=>e.currentTarget.style.background='#f3f4f6'}
        >← Back</button>

        <div style={{ border:`2px solid ${color}`, borderRadius:6, overflow:'hidden',
          flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ background:color, padding:'10px 14px', flexShrink:0 }}>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:10, fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.1em' }}>Selected Site</p>
            <p style={{ color:'#fff', fontSize:24, fontWeight:900, marginTop:2 }}>{site}</p>
          </div>

          <div style={{ padding:'12px 14px', flex:1, display:'flex', flexDirection:'column', gap:12 }}>
            <div>
              <p style={{ fontSize:10, color:'#9ca3af', fontWeight:700, textTransform:'uppercase', marginBottom:4 }}>
                Avg Improvement
              </p>
              <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:4 }}>
                <span style={{ fontSize:13, color:'#9ca3af' }}>Jun–Nov 25</span>
                <span style={{ fontSize:32, fontWeight:900, color:'#9ca3af' }}>{last.avgPct}%</span>
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                <span style={{ fontSize:13, color:color, fontWeight:700 }}>Dec–May 26</span>
                <span style={{ fontSize:40, fontWeight:900, color:'#111111', lineHeight:1 }}>{curr.avgPct}%</span>
              </div>
            </div>

            <div>
              <p style={{ fontSize:10, color:'#9ca3af', fontWeight:700, textTransform:'uppercase', marginBottom:4 }}>
                Total Items
              </p>
              <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:4 }}>
                <span style={{ fontSize:13, color:'#9ca3af' }}>Jun–Nov 25</span>
                <span style={{ fontSize:26, fontWeight:900, color:'#9ca3af' }}>{last.totalItems.toLocaleString()}</span>
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                <span style={{ fontSize:13, color:color, fontWeight:700 }}>Dec–May 26</span>
                <span style={{ fontSize:32, fontWeight:900, color:'#111111' }}>{curr.totalItems.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: event cards 3×2 */}
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'repeat(3,1fr)',
        gridTemplateRows:'1fr 1fr', gap:8, minHeight:0 }}>
        {last.events.map((lastEv, i) => (
          <div key={lastEv.code} style={{ minHeight:0 }}>
            <EventCard lastEv={lastEv} currEv={curr.events[i]} color={color} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main slide ─────────────────────────────────────────────────────────────
export default function QMSSummary() {
  const [selected, setSelected] = useState(null)
  const selectedData = selected !== null ? SITES_DATA[selected] : null

  return (
    <SlideShell accentColor="#CC0000" sectionLabel="QMS" slideTitle="QMS Overview — Performance & Improvement" slideNumber="3 / 21">
      <div style={{ height:'100%', position:'relative', overflow:'hidden' }}>

        {/* ── OVERVIEW VIEW ── */}
        <div style={{
          position:'absolute', inset:0,
          opacity: selected === null ? 1 : 0,
          pointerEvents: selected === null ? 'auto' : 'none',
          transition:'opacity 0.3s ease',
          display:'flex', flexDirection:'column', gap:8,
        }}>
          {/* Overall performance bars */}
          <div style={{ border:'1px solid #e5e7eb', borderRadius:4, overflow:'hidden', flexShrink:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
              background:'#111111', padding:'5px 14px' }}>
              <span style={{ color:'#9ca3af', fontSize:11, fontWeight:700, letterSpacing:'0.06em' }}>
                OVERALL PERFORMANCE — AVERAGE IMPROVEMENT ACROSS ALL SITES
              </span>
              <div style={{ display:'flex', gap:14 }}>
                <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#9ca3af' }}>
                  <span style={{ width:18, height:5, background:'#6b7280', borderRadius:2, display:'inline-block' }} />Jun–Nov 25
                </span>
                <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#fff' }}>
                  <span style={{ width:18, height:5, background:'#CC0000', borderRadius:2, display:'inline-block' }} />Dec–May 26
                </span>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)' }}>
              {OVERALL_EVENTS.map((ev, i) => (
                <div key={ev.code} style={{ padding:'7px 10px',
                  borderRight: i < 6 ? '1px solid #f3f4f6' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <span style={{ background:'#CC0000', color:'#fff', fontSize:11,
                    fontWeight:800, padding:'1px 6px', borderRadius:2 }}>{ev.code}</span>
                  <div style={{ background:'#e5e7eb', borderRadius:2, height:5, margin:'4px 0 2px' }}>
                    <div style={{ width:`${ev.lastPct}%`, height:'100%', background:'#9ca3af', borderRadius:2 }} />
                  </div>
                  <span style={{ fontSize:11, color:'#9ca3af' }}>{ev.lastPct}% last</span>
                  <div style={{ background:'#e5e7eb', borderRadius:2, height:5, margin:'4px 0 2px' }}>
                    <div style={{ width:`${ev.currPct}%`, height:'100%', background:'#CC0000', borderRadius:2 }} />
                  </div>
                  <span style={{ fontSize:13, fontWeight:900, color: ratingColor(ev.currPct) }}>{ev.currPct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Period legend */}
          <div style={{ display:'flex', gap:16, justifyContent:'flex-end', flexShrink:0 }}>
            <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#6b7280', fontWeight:700 }}>
              <span style={{ width:20, height:6, background:'#d1d5db', borderRadius:2, display:'inline-block' }} />
              Jun–Nov 2025 (Last MRM)
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#111111', fontWeight:700 }}>
              <span style={{ width:20, height:6, background:'#CC0000', borderRadius:2, display:'inline-block' }} />
              Dec–May 2026 (Current)
            </span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, flex:1, minHeight:0 }}>
            {SITES_DATA.map((data, i) => (
              <SiteCard key={data.site} data={data} onClick={() => setSelected(i)} />
            ))}
          </div>

          <p style={{ fontSize:11, color:'#9ca3af', fontStyle:'italic', flexShrink:0 }}>
            Click any site card to view detailed event metrics &nbsp;|&nbsp; Grey = Jun–Nov 25 · Coloured = Dec–May 26
          </p>
        </div>

        {/* ── DRILL-DOWN VIEW ── */}
        <div style={{
          position:'absolute', inset:0,
          opacity: selected !== null ? 1 : 0,
          pointerEvents: selected !== null ? 'auto' : 'none',
          transition:'opacity 0.3s ease',
        }}>
          {selectedData && <DrillDown data={selectedData} onBack={() => setSelected(null)} />}
        </div>

      </div>
    </SlideShell>
  )
}
