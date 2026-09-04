import React from 'react'

/**
 * ErrorBoundary - Catches rendering errors in child components
 * Prevents a single broken component from crashing the entire presentation
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{
          padding: '60px 24px',
          minHeight: '100vh',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            padding: '40px',
            background: '#fef2f2',
            borderRadius: '12px',
            border: '2px solid #fecaca'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '16px'
            }}>
              ⚠️
            </div>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#b91c1c',
              marginBottom: '12px'
            }}>
              Slide Error
            </h2>
            <p style={{
              fontSize: '1.5rem',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              This slide encountered an error while loading. Please navigate to another slide.
            </p>
            <p style={{
              fontSize: '1.3rem',
              color: '#9ca3af',
              fontFamily: 'monospace',
              background: '#fff5f5',
              padding: '12px',
              borderRadius: '6px',
              overflow: 'auto',
              maxHeight: '150px'
            }}>
              {this.state.error?.message || 'Unknown error'}
            </p>
            <p style={{
              fontSize: '1.2rem',
              color: '#0f172a',
              marginTop: '20px'
            }}>
              Use arrow keys to navigate to the next slide
            </p>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}


