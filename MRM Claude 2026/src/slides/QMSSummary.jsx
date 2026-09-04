import React, { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts'
import SlideShell from '../components/SlideShell'

// Flag to track if the slide has already completed its initial animation
let slideHasAnimated = false

// ── Animated Number Component ─────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }) {
  const nodeRef = useRef(null)
  
  React.useLayoutEffect(() => {
    const node = nodeRef.current
    if (!node) return

    // If already animated for this slide visit, display static instantly
    if (slideHasAnimated) {
      node.textContent = `${Math.round(value)}${suffix}`
      return
    }

    // Set initial 0 value immediately
    node.textContent = `0${suffix}`

    const controls = animate(0, value, {
      duration: 1.5,
      delay: 0.3, // Wait for layout transitions to finish before mutating DOM
      ease: [0.22, 1, 0.36, 1],
      onUpdate(val) {
        node.textContent = `${Math.round(val)}${suffix}`
      }
    })
    return () => controls.stop()
  }, [value, suffix])

  // CRITICAL: Return an empty span! If React puts a text node here, our manual 
  // textContent updates will destroy it, causing React to crash on unmount.
  return <span ref={nodeRef} />
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const METRIC_COLORS = {
  'CC': '#10B981', // Green
  'OOS': '#3B82F6', // Blue
  'IR': '#0EA5E9', // Light Blue
  'CA': '#F97316', // Orange
  'DEV': '#EAB308', // Yellow/Amber
  'PA': '#EF4444', // Red
  'INV': '#8B5CF6' // Purple
}

const SITES_DATA = [
  {
    site: 'SITE-III', color: '#A855F7',
    last: { avgPct: 36, totalItems: 637 },
    curr: { avgPct: 36, totalItems: 637 },
    events: [
      { code: 'CC', pct: 61, desc: 'CLOSURE DAYS REDUCED', fromDays: 41, toDays: 16 },
      { code: 'OOS', pct: 49, desc: 'IMPROVEMENT', fromDays: 14, toDays: 9 },
      { code: 'IR', pct: 36, desc: 'CLOSURE DAYS REDUCED', fromDays: 25, toDays: 16 },
      { code: 'CA', pct: 16, desc: 'AVG DAYS TO CLOSE REDUCED', fromDays: 56, toDays: 47 },
      { code: 'DEV', pct: 12, desc: 'AVG CLOSURE DAYS REDUCED', fromDays: 73, toDays: 64 },
      { code: 'PA', pct: 6, desc: 'PROCESSING TIME REDUCED', fromDays: 36, toDays: 34 },
      { code: 'INV', pct: 72, desc: 'INVESTIGATIONS REDUCED', fromDays: 40, toDays: 11 }
    ]
  },
  {
    site: 'SITE-V', color: '#14B8A6',
    last: { avgPct: 36, totalItems: 582 },
    curr: { avgPct: 36, totalItems: 582 },
    events: [
      { code: 'CC', pct: 23 }, { code: 'OOS', pct: 59 }, { code: 'IR', pct: 28 }, 
      { code: 'CA', pct: 52 }, { code: 'DEV', pct: 42 }, { code: 'PA', pct: 54 }, 
      { code: 'INV', pct: -6 }
    ]
  },
  {
    site: 'SITE-I', color: '#F59E0B',
    last: { avgPct: 30, totalItems: 1161 },
    curr: { avgPct: 30, totalItems: 1161 },
    events: [
      { code: 'CC', pct: 13 }, { code: 'OOS', pct: 49 }, { code: 'IR', pct: 10 }, 
      { code: 'CA', pct: 54 }, { code: 'DEV', pct: 31 }, { code: 'PA', pct: 60 }, 
      { code: 'INV', pct: -8 }
    ]
  },
  {
    site: 'SITE-IV', color: '#EC4899',
    last: { avgPct: 19, totalItems: 55 },
    curr: { avgPct: 19, totalItems: 55 },
    events: [
      { code: 'CC', pct: 17 }, { code: 'OOS', pct: 0 }, { code: 'IR', pct: 26 }, 
      { code: 'CA', pct: 20 }, { code: 'DEV', pct: 67 }, { code: 'PA', pct: 0 }, 
      { code: 'INV', pct: 0 }
    ]
  }
]

const CHART_DATA = [
  { name: 'OOS', last: 39, curr: 39 },
  { name: 'Deviation', last: 38, curr: 38 },
  { name: 'CA',  last: 36, curr: 36 },
  { name: 'PA',  last: 30, curr: 30 },
  { name: 'CC',  last: 29, curr: 29 },
  { name: 'Incidents', last: 25, curr: 25 },
  { name: 'Investigation', last: 15, curr: 15 },
]

const getPerformanceColor = (val) => {
  if (val >= 76) return { bg: '#D1FAE5', fg: '#047857' } // Outstanding
  if (val >= 51) return { bg: '#A7F3D0', fg: '#10B981' } // Excellent
  if (val >= 26) return { bg: '#DBEAFE', fg: '#3B82F6' } // Very Good
  if (val >= 11) return { bg: '#FFEDD5', fg: '#F97316' } // Good
  return { bg: '#FEE2E2', fg: '#EF4444' } // Above Average
}

const PREMIUM_SPRING = { type: "spring", damping: 26, stiffness: 220, mass: 0.8 }

// ── Overview Site Card (Full Size) ────────────────────────────────────────
function SiteCard({ data, onClick }) {
  const { site, color, curr, events } = data
  return (
    <motion.div 
      layoutId={`card-${site}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ layout: PREMIUM_SPRING, scale: { duration: 0.2 } }}
      style={{
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        border: `2px solid ${color}`,
        boxShadow: `0 8px 24px -8px ${color}40`,
        background: '#fff',
        height: '100%',
        width: '100%'
      }}>
      
      {/* Header section with site name */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${color}30` }}>
        <span style={{ color: color, fontWeight: 900, fontSize: 20, letterSpacing: '0.02em' }}>{site}</span>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: color, fontSize: 12, fontWeight: 900 }}>i</span>
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 48, fontWeight: 900, color: color, lineHeight: 1 }}>
            <AnimatedNumber value={curr.avgPct} suffix="%" />
          </span>
          <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Avg Improvement</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 36, fontWeight: 900, color: '#0F172A', lineHeight: 1, marginTop: 10 }}>
            <AnimatedNumber value={curr.totalItems} />
          </span>
          <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Total Items</span>
        </div>
      </div>

      {/* Grid of stats - wrap in fade so it disappears smoothly when morphed */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ padding: '0 20px 16px', display: 'flex', gap: 12, flex: 1 }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['IR', 'CA', 'PA', 'DEV'].map(code => {
            const ev = events.find(e => e.code === code)
            if (!ev) return null
            return (
              <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#64748B', fontSize: 13 }}>✓</span>
                <span style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>{code}:</span>
                <span style={{ color: ev.pct < 0 ? '#EF4444' : '#475569', fontSize: 13, fontWeight: 800 }}>{ev.pct}%</span>
              </div>
            )
          })}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['OOS', 'CC', 'INV'].map(code => {
            const ev = events.find(e => e.code === code)
            if (!ev) return null
            return (
              <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#64748B', fontSize: 13 }}>✓</span>
                <span style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>{code}:</span>
                <span style={{ color: ev.pct < 0 ? '#EF4444' : '#475569', fontSize: 13, fontWeight: 800 }}>{ev.pct}%</span>
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: color, padding: '12px', textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.05em' }}>
        ✨ Key Improvements
      </motion.div>
    </motion.div>
  )
}

// ── Master List Button (Compact Sidebar Size) ─────────────────────────────
function SiteListButton({ data, isSelected, onClick }) {
  const { site, color, curr } = data
  return (
    <motion.button 
      layout
      layoutId={`card-${site}`} // Matches SiteCard for smooth morph!
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ layout: PREMIUM_SPRING, scale: { duration: 0.2 } }}
      style={{
        width: '100%',
        borderRadius: 12, cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        border: `2px solid ${color}`,
        background: isSelected ? color : '#fff',
        boxShadow: isSelected ? `0 8px 24px -8px ${color}80` : `0 4px 12px -8px ${color}40`,
        color: isSelected ? '#fff' : '#0F172A',
        overflow: 'hidden',
        transition: 'all 0.2s',
        flexShrink: 0
      }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', width: '100%', borderBottom: isSelected ? '1px solid rgba(255,255,255,0.2)' : `1px solid ${color}30` }}>
        <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: '0.02em', color: isSelected ? '#fff' : color }}>{site}</span>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: isSelected ? 'rgba(255,255,255,0.2)' : `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 900, color: isSelected ? '#fff' : color }}>i</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ textAlign: 'left' }}>
          <span style={{ display: 'block', fontSize: 24, fontWeight: 900, lineHeight: 1 }}>
            <AnimatedNumber value={curr.avgPct} suffix="%" />
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: isSelected ? 'rgba(255,255,255,0.8)' : '#64748B' }}>Avg Improvement</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ display: 'block', fontSize: 20, fontWeight: 900, lineHeight: 1 }}>
            <AnimatedNumber value={curr.totalItems} />
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: isSelected ? 'rgba(255,255,255,0.8)' : '#64748B' }}>Total Items</span>
        </div>
      </div>
    </motion.button>
  )
}

// ── Drill-down Metric Column ──────────────────────────────────────────────
function MetricColumn({ ev }) {
  const c = METRIC_COLORS[ev.code] || '#94A3B8'
  const totalRecs = useRef(Math.floor(Math.random() * 200) + 10).current
  
  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    show: { opacity: 1, scale: 1, y: 0, transition: PREMIUM_SPRING }
  }

  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      style={{
        borderRadius: 16, background: '#fff',
        border: `2px solid ${c}30`,
        display: 'flex', flexDirection: 'column',
        padding: '20px 16px', position: 'relative',
        boxShadow: `0 4px 20px -10px ${c}30`,
        height: '100%'
      }}>
      
      <div style={{ position: 'absolute', top: 12, right: 12, width: 12, height: 12, borderRadius: '50%', background: `${c}20` }} />
      
      <h3 style={{ color: c, fontSize: 20, fontWeight: 900 }}>{ev.code}</h3>
      
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase' }}>Total Records</p>
        <p style={{ fontSize: 32, fontWeight: 900, color: c }}>
          <AnimatedNumber value={totalRecs} />
        </p>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ color: c, fontSize: 24, fontWeight: 900 }}>↑</span>
          <span style={{ color: c, fontSize: 42, fontWeight: 900, lineHeight: 1 }}>
            <AnimatedNumber value={ev.pct} /><span style={{ fontSize: 18 }}>%</span>
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#0F172A', fontWeight: 800, textTransform: 'uppercase', marginTop: 8 }}>{ev.desc || 'IMPROVEMENT'}</p>
      </div>

      <div style={{ marginTop: 24, padding: '12px 16px', background: `${c}10`, borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#0F172A', fontWeight: 800 }}>FROM:</span>
          <span style={{ fontSize: 14, color: '#EF4444', fontWeight: 900 }}>{ev.fromDays || 40} d</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#0F172A', fontWeight: 800 }}>TO:</span>
          <span style={{ fontSize: 14, color: '#10B981', fontWeight: 900 }}>{ev.toDays || 15} d</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Memoized Top Chart Section to prevent Recharts from lagging transitions ─
const TopChartSection = memo(({ isExpanded }) => {
  return (
    <motion.div 
      layout
      transition={PREMIUM_SPRING}
      className="glass-card" 
      style={{ 
        flex: isExpanded ? '0 0 34%' : '0 0 18%', 
        borderRadius: 16, 
        padding: isExpanded ? '24px 32px' : '12px 32px', 
        display: 'flex', flexDirection: 'column', border: '2px solid #E2E8F0' 
      }}>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: isExpanded ? 16 : 8, display: 'flex', alignItems: 'center', gap: 12 }}>
        📊 Overall Performance (Average Improvement Across All Sites)
      </h3>
      
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CHART_DATA} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
            <YAxis hide domain={[0, 100]} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#0F172A', fontSize: 14, fontWeight: 800 }} />
            <Bar dataKey="curr" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {CHART_DATA.map((entry, index) => {
                const colors = getPerformanceColor(entry.curr)
                return <Cell key={`cell-${index}`} fill={colors.bg} />
              })}
              <LabelList dataKey="curr" position="top" fill="#fff" fontSize={16} fontWeight={900} formatter={(v) => `${v}%`} 
                content={(props) => {
                  const { x, y, width, value } = props
                  const colors = getPerformanceColor(value)
                  return (
                    <g>
                      <rect x={x} y={y - 30} width={width} height={24} fill={colors.fg} rx={4} />
                      <text x={x + width / 2} y={y - 14} fill="#fff" textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight="900">
                        {value}%
                      </text>
                    </g>
                  )
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Legend */}
      <AnimatePresence mode="popLayout">
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: isExpanded ? 16 : 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              background: '#fff', padding: '12px 24px', borderRadius: 12, 
              border: '1px solid #E2E8F0'
            }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#0F172A' }}>Note:</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ background: '#047857', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 800 }}>Outstanding</span>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>76 - 100%</span>
              </div>
              <div style={{ width: 1, height: 16, background: '#E2E8F0' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ background: '#10B981', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 800 }}>Excellent</span>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>51 - 75%</span>
              </div>
              <div style={{ width: 1, height: 16, background: '#E2E8F0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ background: '#3B82F6', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 800 }}>Very Good</span>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>26 - 50%</span>
              </div>
              <div style={{ width: 1, height: 16, background: '#E2E8F0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ background: '#F97316', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 800 }}>Good</span>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>11 - 25%</span>
              </div>
              <div style={{ width: 1, height: 16, background: '#E2E8F0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ background: '#EF4444', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 800 }}>Above Average</span>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>0 - 10%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

// ── Main Slide Component ──────────────────────────────────────────────────
export default function QMSSummary() {
  const [selected, setSelected] = useState(null)
  const [order, setOrder] = useState([0, 1, 2, 3])
  
  // Reset state when component is remounted (slide switch)
  useEffect(() => {
    slideHasAnimated = false // Reset animation flag on slide enter
    setSelected(null)
    setOrder([0, 1, 2, 3])

    // Mark animation as completed after 2 seconds
    const timer = setTimeout(() => {
      slideHasAnimated = true
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSelect = (clickedIndex) => {
    // If clicking the currently selected item, close the drill-down
    if (selected === clickedIndex) {
      setSelected(null)
      return
    }

    // First time clicking a card from the Overview layout
    if (selected === null) {
      setSelected(clickedIndex)
      setOrder(prev => {
        const remaining = prev.filter(i => i !== clickedIndex)
        return [clickedIndex, ...remaining]
      })
      return
    }
    
    // Switching sites while already in the Split layout
    setSelected(clickedIndex)
    setOrder(prev => {
      const prevSelected = selected
      const remaining = prev.filter(i => i !== clickedIndex && i !== prevSelected)
      return [clickedIndex, ...remaining, prevSelected]
    })
  }

  return (
    <SlideShell accentColor="#DC2626" sectionLabel="QMS" slideTitle="Monitoring and Process - QMS" slideNumber="3 / 21">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
        
        {/* Top Chart Section - Always visible */}
        <TopChartSection isExpanded={selected === null} />

        {/* Bottom Interactive Area */}
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {/* STATE 1: Overview Grid (4 Full Cards in a row) */}
            {selected === null && (
              <motion.div 
                key="overview-grid"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, height: '100%', minHeight: 0 }}
              >
              {SITES_DATA.map((data, i) => (
                <SiteCard 
                  key={data.site} 
                  data={data} 
                  onClick={() => handleSelect(i)} 
                />
              ))}
            </motion.div>
          )}

            {/* STATE 2: Split Master-Detail Layout */}
            {selected !== null && (
              <motion.div 
                key="split-layout"
                style={{ display: 'flex', gap: 24, height: '100%', minHeight: 0 }}
              >
                {/* LEFT SIDEBAR: Vertical list of collapsed Site Buttons */}
                <div style={{ width: '22%', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', paddingRight: 8 }}>
                  {order.map((idx) => {
                    const data = SITES_DATA[idx]
                    return (
                      <SiteListButton 
                        key={data.site} 
                        data={data} 
                        isSelected={selected === idx} 
                        onClick={() => handleSelect(idx)} 
                      />
                    )
                  })}
                </div>

                {/* RIGHT DETAILS: The 7 Metric Columns in a single row */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
                  }}
                  initial="hidden"
                  animate="show"
                  style={{ 
                    flex: 1, 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', 
                    gap: 12,
                    overflowY: 'auto',
                    paddingRight: 8,
                    alignContent: 'center'
                  }}
                >
                  {SITES_DATA[selected].events.map((ev) => (
                    <MetricColumn key={`${SITES_DATA[selected].site}-${ev.code}`} ev={ev} />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  )
}
