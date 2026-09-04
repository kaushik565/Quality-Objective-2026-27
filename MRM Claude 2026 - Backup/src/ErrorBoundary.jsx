import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  render() {
    if (this.state.hasError) {
      return (
        <section style={{ background: '#1e1b4b', color: '#f87171', display: 'flex',
          alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '2rem' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>Slide Error</p>
            <pre style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: 8 }}>
              {this.state.error?.message}
            </pre>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
