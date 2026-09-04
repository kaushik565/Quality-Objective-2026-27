export default function ClosingSlide() {
  return (
    <section className="closing-slide" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
      padding: '40px'
    }}>
      {/* Achievement Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        padding: '16px 32px',
        borderRadius: '12px',
        marginBottom: '32px',
        border: '3px solid #22c55e',
        boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
      }}>
        <div style={{ fontSize: '1.3em', fontWeight: '900', color: '#065f46', marginBottom: '6px' }}>
          🏆 QA Department Excellence Achieved
        </div>
        <div style={{ fontSize: '1em', color: '#047857' }}>
          32-78% Efficiency Gains | 41+ Days Saved | Continuous Improvement Culture
        </div>
      </div>

      {/* Main Thank You Message */}
      <h1 style={{
        fontSize: '4.2em',
        fontWeight: '900',
        marginBottom: '20px',
        color: '#ffffff',
        letterSpacing: '-0.02em',
        textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        Thank You
      </h1>

      {/* Subheading */}
      <h2 style={{
        fontSize: '1.6em',
        fontWeight: '600',
        marginBottom: '36px',
        color: '#d1fae5'
      }}>
        Driving Quality Excellence Through Innovation & Collaboration
      </h2>

      {/* Key Takeaways */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '40px',
        maxWidth: '900px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          padding: '16px',
          borderRadius: '10px',
          border: '2px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{ fontSize: '2.2em', marginBottom: '8px' }}>⚡</div>
          <div style={{ fontSize: '1.1em', fontWeight: '800', color: '#d1fae5', marginBottom: '4px' }}>Faster Closures</div>
          <div style={{ fontSize: '0.85em', color: '#a7f3d0' }}>32-78% reduction</div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          padding: '16px',
          borderRadius: '10px',
          border: '2px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{ fontSize: '2.2em', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '1.1em', fontWeight: '800', color: '#d1fae5', marginBottom: '4px' }}>Data-Driven</div>
          <div style={{ fontSize: '0.85em', color: '#a7f3d0' }}>Process excellence</div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          padding: '16px',
          borderRadius: '10px',
          border: '2px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{ fontSize: '2.2em', marginBottom: '8px' }}>🚀</div>
          <div style={{ fontSize: '1.1em', fontWeight: '800', color: '#d1fae5', marginBottom: '4px' }}>Continuous</div>
          <div style={{ fontSize: '0.85em', color: '#a7f3d0' }}>Improvement</div>
        </div>
      </div>

      {/* Decorative line */}
      <div style={{
        width: '180px',
        height: '4px',
        background: 'linear-gradient(90deg, #22c55e 0%, #10b981 100%)',
        marginBottom: '36px',
        borderRadius: '2px',
        boxShadow: '0 2px 8px rgba(34, 197, 94, 0.5)'
      }}></div>

      {/* Footer text */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        borderRadius: '12px',
        border: '2px solid rgba(255, 255, 255, 0.2)'
      }}>
        <p style={{
          fontSize: '1.2em',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '8px'
        }}>
          Hammed C R
        </p>
        <p style={{
          fontSize: '0.95em',
          color: '#d1fae5',
          lineHeight: '1.6'
        }}>
          Assistant Manager<br/>
          Quality Assurance Site-III<br/>
          <span style={{ fontSize: '0.85em', color: '#a7f3d0' }}>Molbio Diagnostics Limited</span>
        </p>
      </div>
    </section>
  )
}

