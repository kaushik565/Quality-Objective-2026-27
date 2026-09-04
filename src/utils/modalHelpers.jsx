/**
 * Common utilities for modal behavior and accessibility
 */
import React from 'react'

/**
 * Hook to handle keyboard events in modals
 * Closes modal on ESC key
 */
export function useModalKeyboardHandler(onClose) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
}

/**
 * Modal backdrop overlay component with blur and accessibility support
 */
export function ModalBackdrop({ onClick, children, role = 'presentation' }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '20px'
      }}
      role={role}
    >
      {children}
    </div>
  );
}

/**
 * Modal content wrapper with accessibility attributes
 */
export function ModalContent({
  onClose,
  title,
  titleId,
  descriptionId,
  children,
  borderColor,
  onContentClick
}) {
  return (
    <div
      onClick={onContentClick || ((e) => e.stopPropagation())}
      style={{
        background: 'linear-gradient(135deg, #ffffff, #f9fafb)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '85vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        border: borderColor ? `3px solid ${borderColor}` : '1px solid #e5e7eb',
        position: 'relative'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          fontSize: '1.2em',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#dc2626';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#ef4444';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={`Close ${title} dialog`}
      >
        ×
      </button>

      {children}
    </div>
  );
}

/**
 * Fullscreen shell for page-style experiences (replaces modal overlays)
 */
export function FullscreenShell({
  onClose,
  title,
  subtitle,
  accentColor = '#0f172a',
  children,
  headerExtras
}) {
  return (
    <div style={{position: 'fixed', inset: 0, zIndex: 99999, background: '#ffffff', overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>
      <div style={{position: 'sticky', top: 0, zIndex: 100000, background: '#0f172a', color: '#ffffff', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: '32px', height: '32px', borderRadius: '10px', background: '#ffffff22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, fontWeight: '900'}}>✨</div>
          <div>
            <div style={{fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', opacity: 0.85}}>Full View</div>
            <div style={{fontSize: '1em', fontWeight: '800'}}>{title}</div>
            {subtitle && <div style={{fontSize: '0.85em', opacity: 0.8}}>{subtitle}</div>}
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          {headerExtras}
          <button
            onClick={onClose}
            style={{
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 6px 16px rgba(239,68,68,0.35)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(239,68,68,0.45)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(239,68,68,0.35)'; }}
          >
            Close
          </button>
        </div>
      </div>

      <div style={{flex: 1}}>
        {children}
      </div>
    </div>
  );
}

/**
 * Modal header with title and decorative line
 */
export function ModalHeader({ title, color, subtitles = [] }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3
        style={{
          fontSize: '1.5em',
          fontWeight: '800',
          color: color || '#0f172a',
          marginBottom: '8px',
          marginTop: 0
        }}
      >
        {title}
      </h3>
      <div
        style={{
          height: '3px',
          background: `linear-gradient(90deg, ${color || '#0f172a'}, ${color || '#0f172a'}dd)`,
          width: '100px',
          borderRadius: '2px',
          marginBottom: subtitles.length > 0 ? '12px' : 0
        }}
      />
      {subtitles.map((subtitle, idx) => (
        <p
          key={idx}
          style={{
            fontSize: '0.9em',
            color: '#0f172a',
            marginTop: idx === 0 ? '12px' : '8px',
            fontStyle: 'italic',
            marginBottom: 0
          }}
        >
          {subtitle}
        </p>
      ))}
    </div>
  );
}

/**
 * Modal metric stat card
 */
export function ModalStat({ label, value, color, subtext }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        background: `${color}10`,
        borderRadius: '12px',
        border: `2px solid ${color}`,
        marginBottom: '24px'
      }}
    >
      <div
        style={{
          fontSize: '0.8em',
          fontWeight: '700',
          color: '#334155',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '3em',
          fontWeight: '900',
          color: color
        }}
      >
        {value}
      </div>
      {subtext && (
        <div
          style={{
            fontSize: '0.75em',
            color: '#0f172a',
            marginTop: '4px'
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}


