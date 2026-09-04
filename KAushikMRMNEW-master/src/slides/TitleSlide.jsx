const logoUrl = 'https://new.molbiodiagnostics.com/mailSignature/png/Molbio_Logo.png'

export default function TitleSlide() {
  return (
    <section className="title-slide" data-state="title-slide">
      <img src={logoUrl} alt="Molbio Diagnostics Limited logo" className="title-logo" />
      <div className="title-company">Molbio Diagnostics Limited</div>
      
      <h1 style={{ fontSize: '2.8em', marginBottom: '10px' }}>
        Quality Assurance Performance Review
      </h1>
      
      <div style={{ 
        fontSize: '1.6em', 
        color: '#22c55e', 
        fontWeight: '800', 
        marginBottom: '20px',
        textShadow: '0 2px 10px rgba(34, 197, 94, 0.3)'
      }}>
        🎯 Driving Efficiency, Reducing Cycle Times
      </div>
      
      <div style={{ 
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        color: 'white',
        padding: '16px 32px',
        borderRadius: '40px',
        fontSize: '1.3em',
        fontWeight: '700',
        marginBottom: '30px',
        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4)'
      }}>
        Measurable Improvements Across All QA Processes
      </div>
      
      <div className="date">December 15-16, 2025</div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        border: '2px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '1.2em', color: '#111827', fontWeight: '600' }}>
          Presented By: Hammed C R
        </div>
        <div style={{ fontSize: '1em', color: '#6b7280', marginTop: '6px' }}>
          Assistant Manager, Quality Assurance Site-III
        </div>
      </div>
    </section>
  )
}

