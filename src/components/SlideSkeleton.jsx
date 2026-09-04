/**
 * Loading component shown while slide components are being loaded via code splitting
 */
import React from 'react';

export default function SlideSkeleton() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc',
        padding: '40px'
      }}
    >
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        {/* Loading Animation */}
        <div
          style={{
            display: 'inline-block',
            width: '50px',
            height: '50px',
            marginBottom: '30px'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '4px solid #e5e7eb',
              borderTopColor: '#b91c1c',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>

        {/* Loading Text */}
        <h2
          style={{
            fontSize: '1.5em',
            fontWeight: '600',
            color: '#0f172a',
            margin: '0 0 16px 0'
          }}
        >
          Loading Slide...
        </h2>

        <p
          style={{
            fontSize: '1em',
            color: '#0f172a',
            margin: 0,
            lineHeight: '1.6'
          }}
        >
          Please wait while we prepare this slide for you.
        </p>

        {/* Loading Skeleton Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '40px'
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: '100px',
                backgroundColor: '#e2e8f0',
                borderRadius: '8px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}

