import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createPortal } from 'react-dom'
import Presentation from './Presentation'
import './styles.css'

// Suppress React DevTools async message errors in development
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0]?.toString?.().includes('A listener indicated an asynchronous response') ||
      args[0]?.toString?.().includes('message channel closed')
    ) {
      return;
    }
    originalError(...args);
  };
}

const isComplaintsPage = typeof window !== 'undefined' && (
  window.location.hash === '#complaints-page' ||
  window.location.search.includes('complaints-page=true')
)

function requestFullscreen() {
  const el = document.documentElement
  if (el.requestFullscreen) el.requestFullscreen()
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  else if (el.mozRequestFullScreen) el.mozRequestFullScreen()
  else if (el.msRequestFullscreen) el.msRequestFullscreen()
}

function LaunchScreen({ onEnter }) {
  const [hovering, setHovering] = useState(false)

  const handleEnter = () => {
    requestFullscreen()
    onEnter()
  }

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#f8fafc',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      {/* Radial glows */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(254,202,202,0.6) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(186,230,253,0.5) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #e8192c, #ff3347, #e8192c)' }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.9)',
        borderRadius: 28,
        padding: '60px 72px',
        maxWidth: 680,
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 24px 80px -12px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}>
        {/* Top red stripe inside card */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #e8192c, #ff3347, #e8192c)' }} />

        {/* Company */}
        <div style={{ color: '#e8192c', fontWeight: 800, letterSpacing: '0.2em', fontSize: 13, textTransform: 'uppercase', marginBottom: 24 }}>
          Molbio Diagnostics Limited
        </div>

        {/* Title */}
        <div style={{ fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Quality Objective
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: 32, letterSpacing: '-0.02em' }}>
          Presentation <span style={{ color: '#e8192c' }}>2026</span>
        </div>

        {/* Divider */}
        <div style={{ width: 64, height: 3, background: '#e2e8f0', borderRadius: 99, margin: '0 auto 32px' }} />

        {/* Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          {['Quality Assurance', 'Quality Objective', '2026'].map(label => (
            <span key={label} style={{
              background: '#f1f5f9', border: '1px solid #e2e8f0',
              color: '#475569', fontWeight: 600, fontSize: 13,
              padding: '8px 20px', borderRadius: 99,
            }}>{label}</span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleEnter}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: hovering ? '#c8001f' : '#e8192c',
            color: '#fff', border: 'none', borderRadius: 99,
            padding: '18px 48px', fontSize: 17, fontWeight: 800,
            letterSpacing: '0.04em', cursor: 'pointer',
            boxShadow: hovering ? '0 12px 40px rgba(232,25,44,0.5)' : '0 6px 24px rgba(232,25,44,0.35)',
            transform: hovering ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'all 0.2s ease',
            marginBottom: 20,
          }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Start the Presentation
        </button>

        {/* Hint text */}
        <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, marginBottom: 16, letterSpacing: '0.03em' }}>
          👆 Click here to start the presentation
        </div>

        {/* Skip link */}
        <div>
          <button onClick={onEnter} style={{
            background: 'none', border: 'none', color: '#cbd5e1',
            fontSize: 12, fontWeight: 500, cursor: 'pointer',
            textDecoration: 'underline', letterSpacing: '0.05em',
          }}>
            Skip fullscreen &amp; continue in window
          </button>
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #e8192c, #ff3347, #e8192c)' }} />
    </div>,
    document.body
  )
}

// ── Access password gate (client-side deterrent — change the password below) ──
const ACCESS_PASSWORD = 'Molbio@qa'   // ← CHANGE THIS to your desired password
const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 30

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [shakeId, setShakeId] = useState(0)
  const [lockUntil, setLockUntil] = useState(0)
  const [now, setNow] = useState(Date.now())

  const locked = now < lockUntil
  const remaining = Math.max(0, Math.ceil((lockUntil - now) / 1000))

  React.useEffect(() => {
    if (lockUntil === 0) return
    const t = setInterval(() => {
      setNow(Date.now())
      if (Date.now() >= lockUntil) clearInterval(t)
    }, 250)
    return () => clearInterval(t)
  }, [lockUntil])

  const submit = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (locked) return
    if (value === ACCESS_PASSWORD) {
      try { sessionStorage.setItem('mrm_auth', 'ok') } catch (_) {}
      onUnlock()
      return
    }
    const next = attempts + 1
    setValue('')
    setShakeId((s) => s + 1)
    if (next >= MAX_ATTEMPTS) {
      setLockUntil(Date.now() + LOCKOUT_SECONDS * 1000)
      setNow(Date.now())
      setAttempts(0)
      setError('Too many attempts. Please wait before trying again.')
    } else {
      setAttempts(next)
      setError('Incorrect password. ' + (MAX_ATTEMPTS - next) + ' attempt' + (MAX_ATTEMPTS - next === 1 ? '' : 's') + ' left.')
    }
  }

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      <style>{`@keyframes pwshake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(254,202,202,0.6) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(186,230,253,0.5) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #e8192c, #ff3347, #e8192c)' }} />

      <form onSubmit={submit} style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: 28, padding: '52px 56px', maxWidth: 480, width: '90%', textAlign: 'center', boxShadow: '0 24px 80px -12px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #e8192c, #ff3347, #e8192c)' }} />
        <div style={{ color: '#e8192c', fontWeight: 800, letterSpacing: '0.2em', fontSize: 12, textTransform: 'uppercase', marginBottom: 20 }}>Molbio Diagnostics Limited</div>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#e8192c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div style={{ fontSize: 30, fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: 8, letterSpacing: '-0.02em' }}>Protected Presentation</div>
        <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 28 }}>Enter the password to access the Quality Objective presentation.</div>

        <div key={shakeId} style={{ animation: shakeId ? 'pwshake 0.4s' : 'none', display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid ' + (error ? '#fca5a5' : '#e2e8f0'), borderRadius: 14, padding: '4px 6px 4px 16px', marginBottom: 14 }}>
          <input
            autoFocus
            type={show ? 'text' : 'password'}
            value={value}
            disabled={locked}
            onChange={(e) => { setValue(e.target.value); if (error) setError('') }}
            placeholder={locked ? 'Locked…' : 'Password'}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 17, fontWeight: 600, color: '#0f172a', background: 'transparent', padding: '12px 0' }}
          />
          <button type="button" onClick={() => setShow((v) => !v)} aria-label="Toggle password visibility" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 8, display: 'flex' }}>
            {show
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/><path d="M9.5 9.5a3 3 0 0 0 4.24 4.24"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
          </button>
        </div>

        {error && <div style={{ color: '#dc2626', fontSize: 13.5, fontWeight: 600, marginBottom: 14 }}>{error}</div>}

        <button type="submit" disabled={locked} style={{ width: '100%', background: locked ? '#cbd5e1' : '#e8192c', color: '#fff', border: 'none', borderRadius: 14, padding: '15px', fontSize: 16, fontWeight: 800, letterSpacing: '0.03em', cursor: locked ? 'not-allowed' : 'pointer', boxShadow: locked ? 'none' : '0 8px 24px rgba(232,25,44,0.35)', transition: 'all 0.2s' }}>
          {locked ? ('Locked — wait ' + remaining + 's') : 'Unlock'}
        </button>
      </form>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #e8192c, #ff3347, #e8192c)' }} />
    </div>,
    document.body
  )
}

function App() {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem('mrm_auth') === 'ok' } catch (_) { return false }
  })
  const [launched, setLaunched] = useState(false)

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />

  return (
    <>
      {launched ? <Presentation /> : <LaunchScreen onEnter={() => setLaunched(true)} />}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
