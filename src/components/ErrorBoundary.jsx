import React from 'react';

/**
 * Error Boundary component that catches errors in child components
 * Prevents a single component error from crashing the entire presentation
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Slide Error:', error);
    console.error('Error Info:', errorInfo);

    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Optional: Send error to monitoring service (Sentry, LogRocket, etc.)
    if (window.errorReporting) {
      window.errorReporting.captureException(error, {
        contexts: { react: errorInfo }
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Try to navigate to next slide
    if (window.Reveal) {
      window.Reveal.next();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section
          className="error-slide"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#fff5f5',
            padding: '40px',
            textAlign: 'center',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            {/* Error Icon */}
            <div
              style={{
                fontSize: '4em',
                marginBottom: '20px',
                opacity: 0.8
              }}
            >
              ⚠️
            </div>

            {/* Error Title */}
            <h1
              style={{
                fontSize: '2em',
                fontWeight: '700',
                color: '#dc2626',
                marginBottom: '16px',
                marginTop: 0
              }}
            >
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p
              style={{
                fontSize: '1.1em',
                color: '#475569',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}
            >
              This slide encountered an unexpected error and couldn't be loaded.
              The presentation is still working, and you can navigate to another
              slide.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details
                style={{
                  backgroundColor: '#f1f5f9',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  textAlign: 'left',
                  border: '1px solid #cbd5e1'
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: '#0f172a',
                    marginBottom: '8px'
                  }}
                >
                  Error Details (Development Only)
                </summary>
                <pre
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '0.85em',
                    color: '#475569',
                    overflow: 'auto',
                    maxHeight: '200px',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}
                >
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            {/* Error Count Info */}
            {this.state.errorCount > 1 && (
              <p
                style={{
                  fontSize: '0.9em',
                  color: '#ef4444',
                  marginBottom: '24px',
                  fontWeight: '500'
                }}
              >
                ⚠️ This error has occurred {this.state.errorCount} times. If this
                persists, please reload the presentation.
              </p>
            )}

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={this.handleReset}
                aria-label="Skip to next slide"
                style={{
                  padding: '12px 24px',
                  fontSize: '1em',
                  fontWeight: '600',
                  backgroundColor: '#b91c1c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '200px'
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#991b1b')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#b91c1c')
                }
              >
                Skip to Next Slide
              </button>

              <button
                onClick={this.handleReload}
                aria-label="Reload presentation"
                style={{
                  padding: '12px 24px',
                  fontSize: '1em',
                  fontWeight: '600',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '200px'
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#475569')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#0f172a')
                }
              >
                Reload Presentation
              </button>
            </div>

            {/* Help Text */}
            <p
              style={{
                fontSize: '0.85em',
                color: '#94a3b8',
                marginTop: '24px',
                marginBottom: 0
              }}
            >
              Use arrow keys to navigate • Press 'H' for help
            </p>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


