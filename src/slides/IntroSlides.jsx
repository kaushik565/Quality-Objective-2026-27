import React from 'react';
import { Target, Activity, ShieldCheck, GraduationCap, Laptop, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function IntroSlides() {
  return (
    <>
      {/* Slide 1: Title & Vision */}
      <section data-background-color="#0f172a" data-logo="dark" style={{ width: '100%', height: '100%', padding: '60px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '80%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '80%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        
        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '10px 24px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: 20, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 40 }}>
            Management Review
          </div>
          <h1 style={{ fontSize: 96, fontWeight: 900, color: '#f8fafc', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, margin: 0 }}>
            Quality Objectives<br />
            <span style={{ background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2026 - 2027</span>
          </h1>
          <p style={{ fontSize: 32, color: '#cbd5e1', maxWidth: 1000, margin: '0 auto', lineHeight: 1.5, fontWeight: 400 }}>
            Driving excellence through proactive defect prevention, digital transformation, compliance, and continuous team empowerment.
          </p>
        </div>
      </section>

      {/* Slide 2: The 5 Pillars Infographic */}
      <section data-background-color="#f8fafc" data-logo="light" style={{ width: '100%', height: '100%', padding: '80px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 60, textAlign: 'center' }}>
          <h2 style={{ fontSize: 56, fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Our 5 Core Pillars</h2>
          <p style={{ fontSize: 24, color: '#64748b', marginTop: 12 }}>The strategic framework guiding our quality initiatives this year.</p>
        </div>
        
        <div style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {[
            { id: '05', title: 'Defect Prevention', icon: <ShieldCheck size={48} />, color: '#10b981', desc: 'Preventive QA to reduce in-process defects and complaints.' },
            { id: '06', title: 'Digitalization', icon: <Laptop size={48} />, color: '#3b82f6', desc: 'Transitioning to eBMR, e-Logbooks, and AQEM.' },
            { id: '07', title: 'QA Performance', icon: <Activity size={48} />, color: '#8b5cf6', desc: 'Streamlining review timelines and product release.' },
            { id: '08', title: 'Compliance', icon: <CheckCircle2 size={48} />, color: '#f59e0b', desc: 'Vertical compliance team for readiness across all shifts.' },
            { id: '09', title: 'Competency', icon: <GraduationCap size={48} />, color: '#e11d48', desc: 'Advanced training and continuous learning programs.' },
          ].map((item, idx) => (
            <div key={item.id} style={{ flex: 1, background: '#ffffff', borderRadius: 24, padding: 32, border: `2px solid ${item.color}20`, borderTop: `6px solid ${item.color}`, boxShadow: '0 12px 32px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 80, fontWeight: 900, color: `${item.color}15`, lineHeight: 1 }}>{item.id}</div>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: `${item.color}15`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>{item.title}</h3>
              <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Slide 3: Current Status Timeline */}
      <section data-background-color="#0f172a" data-logo="dark" style={{ width: '100%', height: '100%', padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: 80, textAlign: 'center' }}>
          <h2 style={{ fontSize: 56, fontWeight: 900, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>Where Are We Now?</h2>
          <p style={{ fontSize: 24, color: '#94a3b8', marginTop: 12 }}>Overall project lifecycle status and current momentum.</p>
        </div>

        <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          {/* Timeline track */}
          <div style={{ position: 'absolute', top: 40, left: 100, right: 100, height: 4, background: '#334155', borderRadius: 4 }} />
          <div style={{ position: 'absolute', top: 40, left: 100, width: '40%', height: 4, background: '#10b981', borderRadius: 4, boxShadow: '0 0 12px #10b981' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {[
              { phase: 'Initiation', desc: 'Objectives defined & teams formed', status: 'done', color: '#10b981' },
              { phase: 'Planning', desc: 'Metrics & tasks scheduled', status: 'done', color: '#10b981' },
              { phase: 'Execution', desc: 'Currently driving improvements', status: 'active', color: '#3b82f6' },
              { phase: 'Review', desc: 'Measuring impact & adjusting', status: 'pending', color: '#334155' },
              { phase: 'Closure', desc: 'Target achievement', status: 'pending', color: '#334155' }
            ].map((step, i) => (
              <div key={i} style={{ width: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  width: 80, height: 80, borderRadius: '50%', background: step.status === 'done' ? step.color : step.status === 'active' ? '#1e293b' : '#0f172a',
                  border: `4px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
                  boxShadow: step.status === 'active' ? `0 0 0 8px ${step.color}30` : 'none',
                  zIndex: 2
                }}>
                  {step.status === 'done' ? <CheckCircle2 size={40} color="#fff" /> : 
                   step.status === 'active' ? <Activity size={40} color={step.color} /> : 
                   <div style={{ width: 16, height: 16, borderRadius: '50%', background: step.color }} />}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: step.status === 'pending' ? '#64748b' : '#f8fafc', marginBottom: 8 }}>{step.phase}</div>
                <div style={{ fontSize: 16, color: step.status === 'pending' ? '#475569' : '#94a3b8', lineHeight: 1.4 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}