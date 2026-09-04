import { useEffect, useRef, useState, useCallback } from 'react'
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

  // Custom red dot cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorVisible, setCursorVisible] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      setCursorVisible(true)
    }
    const onLeave = () => setCursorVisible(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

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

  return (
    <>
      {/* Custom red dot cursor */}
      <div style={{
        position: 'fixed',
        left: cursorPos.x,
        top: cursorPos.y,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: '#CC0000',
        boxShadow: '0 0 0 3px rgba(204,0,0,0.25), 0 0 12px 4px rgba(204,0,0,0.45)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: cursorVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }} />

      {/* Slide counter — fades out after 2s */}
      <div style={{
        position: 'fixed', bottom: 12, right: 16, zIndex: 9999,
        background: '#CC0000', color: '#fff', fontSize: 11, fontWeight: 800,
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
