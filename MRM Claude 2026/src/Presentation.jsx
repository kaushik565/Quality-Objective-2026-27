import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import ErrorBoundary from './ErrorBoundary'

import TitleSlide from './slides/TitleSlide'
import ContentsSlide from './slides/ContentsSlide'
import QMSSummary from './slides/QMSSummary'
import QMSSiteDrillDown from './slides/QMSSiteDrillDown'
import IPQAOverview from './slides/IPQAOverview'
import IPQASiteI from './slides/IPQASiteI'
import IPQASiteIII from './slides/IPQASiteIII'
import IPQASiteIV from './slides/IPQASiteIV'
import IPQASiteV from './slides/IPQASiteV'
import LabQAOverview from './slides/LabQAOverview'
import LabQASiteDetail from './slides/LabQASiteDetail'
import CustomerComplaintsOverview from './slides/CustomerComplaintsOverview'
import ComplaintsAnalysis from './slides/ComplaintsAnalysis'
import QualityObjectives from './slides/QualityObjectives'
import AuditOverview from './slides/AuditOverview'
import ProcessImprovements from './slides/ProcessImprovements'
import ImprovementsSiteI from './slides/ImprovementsSiteI'
import ImprovementsSiteIII from './slides/ImprovementsSiteIII'
import ImprovementsSiteIV from './slides/ImprovementsSiteIV'
import ImprovementsSiteV from './slides/ImprovementsSiteV'
import ClosingSlide from './slides/ClosingSlide'

const SLIDES = [
  TitleSlide, ContentsSlide, QMSSummary, QMSSiteDrillDown,
  IPQAOverview, IPQASiteI, IPQASiteIII, IPQASiteIV, IPQASiteV,
  LabQAOverview, LabQASiteDetail, CustomerComplaintsOverview,
  ComplaintsAnalysis, QualityObjectives, AuditOverview,
  ProcessImprovements, ImprovementsSiteI, ImprovementsSiteIII,
  ImprovementsSiteIV, ImprovementsSiteV, ClosingSlide,
]

export default function Presentation() {
  const containerRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [showCounter, setShowCounter] = useState(false)
  const counterTimer = useRef(null)
  const total = SLIDES.length

  // Premium Framer Motion Physics Cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Outer ring (fluid trailing effect)
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.5 })
  
  // Inner dot (snappy tracking)
  const dotSpringX = useSpring(cursorX, { stiffness: 800, damping: 35 })
  const dotSpringY = useSpring(cursorY, { stiffness: 800, damping: 35 })
  
  const [cursorVisible, setCursorVisible] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setCursorVisible(true)
    }
    const onLeave = () => setCursorVisible(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [cursorX, cursorY])

  const goTo = (index) => {
    if (index < 0 || index >= total) return
    const container = containerRef.current
    if (!container) return
    container.children[index]?.scrollIntoView({ behavior: 'smooth' })
    setCurrent(index)
    setShowCounter(true)
    if (counterTimer.current) clearTimeout(counterTimer.current)
    counterTimer.current = setTimeout(() => setShowCounter(false), 2000)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault(); goTo(current + 1)
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault(); goTo(current - 1)
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
        else document.exitFullscreen?.()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [current])

  // Update current index on scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight)
      setCurrent(idx)
      setShowCounter(true)
      if (counterTimer.current) clearTimeout(counterTimer.current)
      counterTimer.current = setTimeout(() => setShowCounter(false), 2000)
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-adjust scroll alignment on window resize / fullscreen toggle
  useEffect(() => {
    let timeoutId
    const handleResize = () => {
      // Use debounce to prevent layout thrashing while actively resizing
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const container = containerRef.current
        if (!container) return
        container.children[current]?.scrollIntoView({ behavior: 'instant' })
      }, 50)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [current])

  return (
    <>
      {/* Premium Physics Cursor - Outer Ring */}
      <motion.div style={{
        position: 'fixed', left: 0, top: 0,
        x: springX, y: springY,
        translateX: '-50%', translateY: '-50%',
        width: 36, height: 36,
        borderRadius: '50%',
        border: '2px solid rgba(220,38,38,0.4)',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: cursorVisible ? 1 : 0,
      }} />

      {/* Premium Physics Cursor - Inner Dot */}
      <motion.div style={{
        position: 'fixed', left: 0, top: 0,
        x: dotSpringX, y: dotSpringY,
        translateX: '-50%', translateY: '-50%',
        width: 10, height: 10,
        borderRadius: '50%',
        background: '#DC2626',
        boxShadow: '0 0 12px 2px rgba(220,38,38,0.5)',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: cursorVisible ? 1 : 0,
      }} />

      {/* Slide counter — fades out after 2s */}
      <div style={{
        position: 'fixed', bottom: 12, right: 16, zIndex: 9999,
        background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 800,
        padding: '4px 10px', borderRadius: 2, letterSpacing: '0.05em',
        pointerEvents: 'none',
        opacity: showCounter ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        {current + 1} / {total}
      </div>

      <div ref={containerRef} className="slides-container">
        {SLIDES.map((Slide, i) => (
          <div key={i} className="slide-wrapper">
            <ErrorBoundary><Slide /></ErrorBoundary>
          </div>
        ))}
      </div>
    </>
  )
}
