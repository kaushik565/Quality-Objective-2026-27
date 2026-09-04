import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell'

const SECTIONS = [
  { label: 'QMS Overview', sub: ['Performance Dashboard', 'Site-Wise Analytics'], color: '#0F172A' },
  { label: 'IPQA', sub: ['In-Process Quality Assurance', 'Batch Records'], color: '#8B5CF6' },
  { label: 'Lab QA', sub: ['Laboratory Metrics', 'OOS/OOT Trends'], color: '#06B6D4' },
  { label: 'Customer Complaints', sub: ['Complaint Analytics', 'Resolution Tracking'], color: '#F59E0B' },
  { label: 'Quality Objectives', sub: ['Annual Goals', 'Progress Tracking'], color: '#10B981' },
  { label: 'Audits', sub: ['Internal Audits', 'External Inspections'], color: '#EC4899' },
  { label: 'Improvements', sub: ['Continuous Improvement', 'CAPA Effectiveness'], color: '#F43F5E' },
]

const SITES = [
  ['Site-I',   '#F59E0B'],
  ['Site-III', '#A855F7'],
  ['Site-IV',  '#EC4899'],
  ['Site-V',   '#14B8A6'],
]

export default function ContentsSlide() {
  const listVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', damping: 20 } }
  }

  return (
    <SlideShell sectionLabel="Agenda" slideTitle="Table of Contents" slideNumber="2 / 21" accentColor="#DC2626">
      
      <div style={{ display: 'flex', gap: 40, height: '100%', padding: '20px 0' }}>
        
        {/* Left Column - Sections */}
        <motion.div variants={listVars} initial="hidden" animate="show" 
          style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 24px', alignContent: 'start' }}>
          
          {SECTIONS.map((s, i) => (
            <motion.div key={s.label} variants={itemVars} className="glass-card" style={{ 
              borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}>
              
              {/* Top Color Bar */}
              <div style={{ height: 4, background: s.color, width: '100%' }} />

              {/* Label */}
              <div style={{ padding: '16px 20px 8px', flexShrink: 0 }}>
                <p style={{ color: s.color, fontWeight: 900, fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{s.label}</p>
              </div>

              {/* Sub-topics */}
              <div style={{ flex: 1, padding: '0 20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                {s.sub.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0, opacity: 0.5 }} />
                    <span style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Column - Sites & Context */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, type: 'spring', damping: 20 }}
          style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          <div className="glass-card" style={{ padding: 32, borderRadius: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ color: '#64748B', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
              Participating Sites
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {SITES.map(([site, color]) => (
                <div key={site} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
                  </div>
                  <p style={{ color: color, fontWeight: 800, fontSize: 20 }}>{site}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #E2E8F0' }}>
              <p style={{ color: '#0F172A', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Review Period</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: 14, fontWeight: 600 }}>Previous:</span>
                <span style={{ color: '#0F172A', fontSize: 14, fontWeight: 700 }}>Jun–Nov 25</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ color: '#64748B', fontSize: 14, fontWeight: 600 }}>Current:</span>
                <span style={{ color: '#DC2626', fontSize: 14, fontWeight: 800 }}>Dec–May 26</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </SlideShell>
  )
}
