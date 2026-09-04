import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Target, LayoutList, CheckCircle2, Activity, ChevronRight, Layers, ArrowRight, Calendar, Flag, ClipboardList, GraduationCap, BookOpen, FileText, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine, LabelList, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip } from 'recharts';
import { objectivesData, qo04SiteDetail, QO9_QI3_STAFF_INVOLVEMENT } from '../data/quality_objectives_data';
import { QO05_RAW_DATA } from '../data/qo05RawData';

// ─── Data ────────────────────────────────────────────────────────────────────


// ─── Theme ────────────────────────────────────────────────────────────────────
const QO_THEME = {
  '05': { hex: '#10b981', rgb: '16,185,129' },
  '06': { hex: '#3b82f6', rgb: '59,130,246' },
  '07': { hex: '#8b5cf6', rgb: '139,92,246' },
  '08': { hex: '#f59e0b', rgb: '245,158,11' },
  '09': { hex: '#e11d48', rgb: '225,29,72' },
};
const QI_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#e11d48', '#8b5cf6', '#06b6d4'];

// ─── FIX #1: Correct progress calculation ─────────────────────────────────────
// COMPLETED = full weight, IN PROCESS / INITIATION = 50% of weight, NOT INITIATED = 0
const statusWeight = (status) => {
  const s = (status || '').toUpperCase();
  const percentMatch = s.match(/\((\d+)%\)/);
  if (percentMatch) return parseInt(percentMatch[1], 10) / 100;
  if (s.includes('COMPLET')) return 1.0;
  if (s.includes('PROCESS') || s.includes('PROGRESS')) return 0.5;
  if (s.includes('INITIAT') && !s.includes('NOT')) return 0.25;
  return 0;
};

const getQIProgress = (qi) => {
  let totalW = 0, earnedW = 0;
  qi.events.forEach(e => {
    totalW  += e.taskPercent || 0;
    earnedW += (e.taskPercent || 0) * statusWeight(e.status);
  });
  return totalW > 0 ? Math.round((earnedW / totalW) * 100) : 0;
};

const getObjProgress = (obj) => {
  const allEvents = obj.qis.flatMap(q => q.events);
  let totalW = 0, earnedW = 0;
  allEvents.forEach(e => {
    totalW  += e.taskPercent || 0;
    earnedW += (e.taskPercent || 0) * statusWeight(e.status);
  });
  return totalW > 0 ? Math.round((earnedW / totalW) * 100) : 0;
};

const getStatusMeta = (status) => {
  const s = (status || '').toUpperCase();

  if (s.includes('COMPLET'))                           return { dot: '#10b981', label: 'COMPLETED',     bg: 'rgba(16,185,129,0.12)',  text: '#059669' };
  if (s.includes('PROCESS') || s.includes('PROGRESS')) return { dot: '#f59e0b', label: 'IN PROCESS',    bg: 'rgba(245,158,11,0.12)',  text: '#d97706' };
  if (s.includes('INITIAT') && !s.includes('NOT'))     return { dot: '#3b82f6', label: 'INITIATED',    bg: 'rgba(59,130,246,0.12)',  text: '#2563eb' };
  return                                                      { dot: '#94a3b8', label: 'NOT INITIATED', bg: 'rgba(148,163,184,0.12)', text: '#64748b' };
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
function useCounter(target, duration = 900) {
  const [val, setVal] = React.useState(0);
  useEffect(() => {
    if (target === 0) { setVal(0); return; }
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [target]);
  return val;
}

// ─── KPI Card (white bg, projector-safe) ──────────────────────────────────────
function KpiCard({ value, label, color, Icon }) {
  const n = useCounter(value);
  return (
    <div style={{
      background: '#fff', border: `2px solid ${color}25`,
      borderRadius: 16, padding: '18px 20px',
      boxShadow: `0 4px 24px ${color}15`,
      display: 'flex', flexDirection: 'column', gap: 8
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b' }}>{label}</span>
        <Icon size={18} style={{ color }} />
      </div>
      <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, color }}>{n}</div>
    </div>
  );
}


// ─── Overview Panel ───────────────────────────────────────────────────────────
function OverviewPanel({ obj, accent, onSelectQI }) {
  const allEvents  = obj.qis.flatMap(q => q.events);
  const totalTasks = allEvents.length;
  const completed  = allEvents.filter(e => getStatusMeta(e.status).label.startsWith('COMPLETED')).length;
  const inProcess  = allEvents.filter(e => { const l = getStatusMeta(e.status).label; return l === 'IN PROCESS' || l === 'INITIATED'; }).length;
  const overallPct = getObjProgress(obj);

  return (
    <motion.div key="overview"
      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 28px', overflowY: 'auto', background: '#f8fafc' }}
    >
      {/* Overall progress banner */}
      <div style={{
        background: `linear-gradient(135deg, ${accent.hex}18, ${accent.hex}08)`,
        border: `1.5px solid ${accent.hex}30`,
        borderRadius: 16, padding: '16px 22px',
        display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: 8 }}>
            Overall Progress
          </div>
          <div style={{ height: 10, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${overallPct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${accent.hex}90, ${accent.hex})` }} />
          </div>
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: accent.hex, lineHeight: 1, flexShrink: 0 }}>{overallPct}%</div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, flexShrink: 0 }}>
        <KpiCard value={obj.qis.length} label="Total QIs"   color={accent.hex} Icon={Target} />
        <KpiCard value={totalTasks}     label="Total Tasks" color="#64748b"     Icon={LayoutList} />
        <KpiCard value={completed}      label="Completed"   color="#10b981"     Icon={CheckCircle2} />
        <KpiCard value={inProcess}      label="Active"      color="#f59e0b"     Icon={Activity} />
      </div>

      {/* QI summary grid */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: obj.qis.length > 4 ? 'repeat(3,1fr)' : 'repeat(2,1fr)',
        gap: 14, minHeight: 0
      }}>
        {obj.qis.map((qi, idx) => {
          const color  = QI_COLORS[idx % QI_COLORS.length];
          const prog   = getQIProgress(qi);
          const done   = qi.events.filter(e => getStatusMeta(e.status).label.startsWith('COMPLETED')).length;
          const active = qi.events.filter(e => { const l = getStatusMeta(e.status).label; return l === 'IN PROCESS' || l === 'INITIATED'; }).length;

          return (
            <motion.button key={qi.id}
              onClick={() => onSelectQI(qi.id)}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ scale: 1.02 }}
              style={{
                textAlign: 'left', borderRadius: 16, padding: '18px 20px',
                background: '#fff', border: `1.5px solid ${color}25`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                display: 'flex', flexDirection: 'column', gap: 12,
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.2s'
              }}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${color}, ${color}50)`, borderRadius: '16px 16px 0 0' }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 6 }}>
                <div>
                  <span style={{ fontSize: 22, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', background: `${color}18`, color, border: `1px solid ${color}30`, padding: '4px 12px', borderRadius: 6, display: 'inline-block', marginBottom: 6 }}>
                    {qi.id}
                  </span>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#1e293b', lineHeight: 1.3 }}>{qi.name}</div>
                </div>
                {qi.allotted && qi.allotted !== 'NA' && (
                  <span style={{ fontSize: 24, fontWeight: 900, color, flexShrink: 0, marginLeft: 8 }}>{qi.allotted}</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: 14, fontSize: 22, fontWeight: 700 }}>
                <span style={{ color: '#10b981' }}>✓ {done} done</span>
                {active > 0 && <span style={{ color: '#f59e0b' }}>● {active} active</span>}
                <span style={{ color: '#94a3b8' }}>{qi.events.length} tasks</span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#94a3b8' }}>Progress</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color }}>{prog}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${prog}%` }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${color}80, ${color})` }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 22, fontWeight: 900, color, opacity: 0.7 }}>
                View Tasks <ChevronRight size={14} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── QO 04 - custom 3-site detail panels ──────────────────────────────────────
function SiteChip({ site, color }) {
  return (
    <span style={{ fontSize: 18, fontWeight: 900, color: '#fff', background: color, padding: '6px 16px', borderRadius: 8, letterSpacing: '0.04em', display: 'inline-block', boxShadow: `0 2px 8px ${color}55` }}>{site}</span>
  );
}

function GapPanel({ sites }) {
  return (
    <div style={{ flex: 1, display: 'flex', gap: 18, padding: '18px 28px 22px', minHeight: 0 }}>
      {sites.map((s) => (
        <div key={s.site} style={{ flex: 1, background: '#fff', border: `2px solid ${s.color}30`, borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, boxShadow: `0 4px 20px ${s.color}12` }}>
          <SiteChip site={s.site} color={s.color} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 16px' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#475569' }}>Total Employees</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.totalEmployees}</span>
          </div>
          <div style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 12, padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#e11d48' }}>No Training</span>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#e11d48' }}>{s.noTraining} <span style={{ fontSize: 16, color: '#fb7185' }}>({s.noTrainingPct}%)</span></span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'rgba(244,63,94,0.15)', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${s.noTrainingPct}%` }} transition={{ duration: 1, ease: 'easeOut' }} style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#fb7185,#e11d48)' }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 10 }}>Top 3 Errors</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {s.errors.map((e, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 17, fontWeight: 600, color: '#334155' }}>{e.label}</span>
                    <span style={{ fontSize: 17, fontWeight: 900, color: s.color }}>{e.pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${e.pct}%` }} transition={{ duration: 0.9, delay: i * 0.08 }} style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg,${s.color}80,${s.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ImplementationPanel({ sites }) {
  return (
    <div style={{ flex: 1, display: 'flex', gap: 18, padding: '18px 28px 22px', minHeight: 0 }}>
      {sites.map((s) => {
        const base = s.trainedLatestSOP || 1;
        const steps = [
          { n: 1, label: 'Trained on Latest SOP', sub: 'Awareness on latest revision', value: s.trainedLatestSOP, color: '#3b82f6', pct: 100 },
          { n: 2, label: 'Passed Evaluation (>80%)', sub: 'Qualified on 1st evaluation', value: s.evalAbove80, color: '#10b981', pct: Math.round((s.evalAbove80 / base) * 100) },
          { n: 3, label: 'Retraining Provided', sub: 'To staff who did not qualify', value: s.retraining, color: '#f59e0b', pct: Math.round((s.retraining / base) * 100) },
          { n: 4, label: '100% Passed (Final)', sub: 'All staff qualified after retraining', value: s.eval100, color: '#059669', pct: 100 },
        ];
        return (
          <div key={s.site} style={{ flex: 1, background: '#fff', border: `2px solid ${s.color}30`, borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, boxShadow: `0 4px 20px ${s.color}12` }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><SiteChip site={s.site} color={s.color} /></div>

            {/* Process flow / funnel */}
            <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2px 0' }}>
              {/* connector line behind the step circles */}
              <div style={{ position: 'absolute', left: 18, top: 24, bottom: 24, width: 2, background: '#e2e8f0', zIndex: 0 }} />
              {steps.map((st) => (
                <div key={st.n} style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: st.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, flexShrink: 0, boxShadow: `0 3px 10px ${st.color}55`, border: '2px solid #fff' }}>{st.n}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: '#334155' }}>{st.label}</span>
                      <span style={{ fontSize: 27, fontWeight: 900, color: st.color, lineHeight: 1 }}>{st.value}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 5 }}>{st.sub}</div>
                    <div style={{ height: 9, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${st.pct}%` }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${st.color}80, ${st.color})` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg,#10b981,#059669)', borderRadius: 14, padding: '14px 16px', textAlign: 'center', boxShadow: '0 4px 16px rgba(16,185,129,0.4)' }}>
              <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>Implementation Success Rate</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{s.successRate}%</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VerificationPanel({ sites }) {
  const barColor = (v, s) => (v <= s.newTarget ? '#10b981' : v <= s.oldTarget ? '#f59e0b' : '#e11d48');
  const StatPill = ({ label, value, color }) => (
    <div style={{ flex: 1, background: `${color}10`, border: `1px solid ${color}28`, borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
      <div style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ flex: 1, display: 'flex', gap: 16, padding: '16px 24px 18px', minHeight: 0 }}>
      {sites.map((s) => {
        const vals = vals2(s.points);
        const total = vals.reduce((a, b) => a + b, 0);
        const peak = Math.max(...vals);
        const withinNew = vals.filter((v) => v <= s.newTarget).length;
        return (
          <div key={s.site} style={{ flex: 1, background: '#fff', border: `2px solid ${s.color}30`, borderRadius: 18, padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: `0 4px 20px ${s.color}12`, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><SiteChip site={s.site} color={s.color} /></div>

            {/* Stats strip */}
            <div style={{ display: 'flex', gap: 8 }}>
              <StatPill label="Total Found" value={total} color={s.color} />
              <StatPill label="Peak / cycle" value={peak} color="#e11d48" />
              <StatPill label="Within New Tgt" value={`${withinNew}/${vals.length}`} color="#10b981" />
            </div>

            {/* Bars */}
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={s.points} margin={{ top: 18, right: 8, left: -22, bottom: 4 }} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} interval={0} angle={-45} textAnchor="end" height={46} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <RTooltip cursor={{ fill: `${s.color}0c` }} formatter={(v) => [`${v} incident(s)`, 'Found']} />
                  <ReferenceLine y={s.oldTarget} stroke="#94a3b8" strokeWidth={2} strokeDasharray="6 4" ifOverflow="extendDomain" />
                  <ReferenceLine y={s.newTarget} stroke="#2563eb" strokeWidth={2} strokeDasharray="6 4" ifOverflow="extendDomain" />
                  <Bar dataKey="actual" radius={[6, 6, 0, 0]} maxBarSize={26}>
                    {s.points.map((p, i) => <Cell key={i} fill={barColor(p.actual, s)} />)}
                    <LabelList dataKey="actual" position="top" style={{ fontSize: 11, fontWeight: 800, fill: '#475569' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 14px', fontSize: 12, fontWeight: 700 }}>
              <LegendDot color="#10b981" label={`Within New Tgt (${s.newTarget})`} />
              <LegendDot color="#f59e0b" label={`Within Old Tgt (${s.oldTarget})`} />
              <LegendDot color="#e11d48" label="Above Old" />
              <LegendDash color="#2563eb" label="New Target" />
              <LegendDash color="#94a3b8" label="Old Target" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
const vals2 = (points) => points.map((p) => p.actual);
const LegendDot = ({ color, label }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#64748b' }}>
    <span style={{ width: 11, height: 11, borderRadius: 3, background: color }} />{label}
  </span>
);
const LegendDash = ({ color, label }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#64748b' }}>
    <span style={{ width: 16, height: 0, borderTop: `2px dashed ${color}` }} />{label}
  </span>
);

const Ring = ({ pct, color, size = 56, stroke = 7, fontSize, bgStroke = '#eef2f7' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const count = useCounter(pct, 1200);
  const off = c * (1 - Math.min(count, 100) / 100);
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bgStroke} strokeWidth={stroke} />
      <circle 
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} 
        strokeWidth={stroke} strokeLinecap="round" 
        strokeDasharray={c} strokeDashoffset={off} 
        transform={`rotate(-90 ${size / 2} ${size / 2})`} 
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={fontSize || size * 0.28} fontWeight="900" fill={color}>{count}%</text>
    </svg>
  );
};
const effAch = (a) => (a >= 80 ? '#059669' : a >= 50 ? '#d97706' : '#e11d48');

function EffectivenessPanel({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const avg = Math.round(items.reduce((a, it) => a + it.achieved, 0) / items.length);
  const animAvg = useCounter(avg, 1200);
  const short = ['Incident Drop', 'Staff Trained', 'Audit Findings', 'Correction Time'];
  const [i1, i2, i3, i4] = items;
  const cardStyle = { background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0 };

  const ItemHead = ({ n, title, achieved }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexShrink: 0 }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: effAch(achieved), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, flexShrink: 0 }}>{n}</div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 800, color: '#1e293b', lineHeight: 1.25 }}>{title}</div>
      <Ring pct={achieved} color={effAch(achieved)} size={44} stroke={6} fontSize={13} />
    </div>
  );

  const getCard1 = (large) => (
    <>
      <ItemHead n={1} title={i1.title} achieved={i1.achieved} />
      <div style={{ flex: 1, minHeight: 0, marginTop: large ? 16 : 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={i1.table.rows.map((r) => ({ site: `Site ${r.site}`, Before: r.beforeTotal, After: r.afterTotal }))} margin={{ top: 16, right: 10, left: -20, bottom: 0 }} barGap={large ? 6 : 4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="site" tick={{ fontSize: large ? 14 : 12, fontWeight: 700, fill: '#475569' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: large ? 13 : 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <RTooltip />
            <Bar dataKey="Before" fill="#fb7185" radius={[5, 5, 0, 0]} maxBarSize={large ? 45 : 34}><LabelList dataKey="Before" position="top" style={{ fontSize: large ? 14 : 12, fontWeight: 800, fill: '#e11d48' }} /></Bar>
            <Bar dataKey="After" fill="#10b981" radius={[5, 5, 0, 0]} maxBarSize={large ? 45 : 34}><LabelList dataKey="After" position="top" style={{ fontSize: large ? 14 : 12, fontWeight: 800, fill: '#059669' }} /></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: large ? 24 : 18, marginTop: large ? 12 : 2, fontSize: large ? 15 : 12, fontWeight: 700 }}>
        <LegendDot color="#fb7185" label="Before (Jan-Sep 25)" />
        <LegendDot color="#10b981" label="After (Oct 25-Apr 26)" />
      </div>
    </>
  );

  const getCard2 = (large) => (
    <>
      <ItemHead n={2} title={i2.title} achieved={i2.achieved} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: large ? 20 : 12 }}>
        <Ring pct={i2.achieved} color="#059669" size={large ? 240 : 124} stroke={large ? 20 : 14} fontSize={large ? 64 : 38} />
        <div style={{ display: 'flex', alignItems: 'center', gap: large ? 12 : 8, color: '#059669', fontWeight: 800, fontSize: large ? 24 : 17, marginTop: large ? 24 : 0 }}>
          <CheckCircle2 size={large ? 32 : 22} /> All staff trained in GDP
        </div>
      </div>
    </>
  );

  const getCard3 = (large) => (
    <>
      <ItemHead n={3} title={i3.title} achieved={i3.achieved} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: large ? 24 : 12, justifyContent: 'center', padding: large ? '0 40px' : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: large ? 20 : 12, background: 'rgba(245,158,11,0.10)', border: large ? '2px solid rgba(245,158,11,0.3)' : '1px solid rgba(245,158,11,0.3)', borderRadius: large ? 16 : 12, padding: large ? '24px 32px' : '12px 16px' }}>
          <div style={{ width: large ? 48 : 32, height: large ? 48 : 32, borderRadius: '50%', background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: large ? 28 : 19, fontWeight: 900, flexShrink: 0 }}>!</div>
          <div><div style={{ fontSize: large ? 20 : 15, fontWeight: 800, color: '#b45309', marginBottom: large ? 4 : 0 }}>Internal Audit - 2nd IQA 2026-27</div><div style={{ fontSize: large ? 18 : 13, fontWeight: 600, color: '#92400e' }}>GDP-related audit findings identified</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: large ? 20 : 12, background: 'rgba(16,185,129,0.10)', border: large ? '2px solid rgba(16,185,129,0.3)' : '1px solid rgba(16,185,129,0.3)', borderRadius: large ? 16 : 12, padding: large ? '24px 32px' : '12px 16px' }}>
          <CheckCircle2 size={large ? 48 : 32} style={{ color: '#059669', flexShrink: 0 }} />
          <div><div style={{ fontSize: large ? 20 : 15, fontWeight: 800, color: '#047857', marginBottom: large ? 4 : 0 }}>External Audit 2026-27</div><div style={{ fontSize: large ? 18 : 13, fontWeight: 600, color: '#065f46' }}>0 GDP errors identified</div></div>
        </div>
      </div>
    </>
  );

  const getCard4 = (large) => (
    <>
      <ItemHead n={4} title={i4.title} achieved={i4.achieved} />
      <div style={{ flex: 1, minHeight: 0, marginTop: large ? 16 : 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={i4.table.rows.map((r) => ({ site: `Site ${r.site}`, days: r.avgTime }))} margin={{ top: 14, right: 34, left: 6, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: large ? 14 : 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="site" tick={{ fontSize: large ? 16 : 12, fontWeight: 700, fill: '#475569' }} axisLine={false} tickLine={false} width={large ? 80 : 56} />
            <RTooltip formatter={(v) => [`${v} days`, 'Avg time']} />
            <ReferenceLine x={2} stroke="#2563eb" strokeWidth={large ? 3 : 2} strokeDasharray={large ? "6 5" : "5 4"} label={{ value: 'Target < 2d', position: 'top', fontSize: large ? 14 : 11, fill: '#2563eb', fontWeight: 700 }} />
            <Bar dataKey="days" radius={[0, large ? 6 : 5, large ? 6 : 5, 0]} maxBarSize={large ? 40 : 26}>
              {i4.table.rows.map((r, idx) => <Cell key={idx} fill={r.avgTime <= 2 ? '#10b981' : '#e11d48'} />)}
              <LabelList dataKey="days" position="right" style={{ fontSize: large ? 15 : 12, fontWeight: 800, fill: '#475569' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ textAlign: 'center', fontSize: large ? 15 : 12, fontWeight: 700, color: '#94a3b8', marginTop: large ? 16 : 2 }}>Target: correct GDP errors in &lt; 2 days (48 hrs)</div>
    </>
  );

  const renderCard = (index) => {
    if (index === 0) return <div style={{ ...cardStyle, width: '80vw', height: '70vh', maxWidth: 1000, padding: '24px 32px' }}>{getCard1(true)}</div>;
    if (index === 1) return <div style={{ ...cardStyle, width: '80vw', height: '70vh', maxWidth: 1000, padding: '24px 32px' }}>{getCard2(true)}</div>;
    if (index === 2) return <div style={{ ...cardStyle, width: '80vw', height: '70vh', maxWidth: 1000, padding: '24px 32px' }}>{getCard3(true)}</div>;
    if (index === 3) return <div style={{ ...cardStyle, width: '80vw', height: '70vh', maxWidth: 1000, padding: '24px 32px' }}>{getCard4(true)}</div>;
    if (index === 'all') return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16, width: '90vw', height: '85vh', maxWidth: 1400 }}>
          <div style={{ ...cardStyle, padding: '14px 16px' }}>{getCard1(false)}</div>
          <div style={{ ...cardStyle, padding: '14px 16px' }}>{getCard2(false)}</div>
          <div style={{ ...cardStyle, padding: '14px 16px' }}>{getCard3(false)}</div>
          <div style={{ ...cardStyle, padding: '14px 16px' }}>{getCard4(false)}</div>
        </div>
    );
    return null;
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
      
      {/* Centered Main View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
        
        {/* Overall Effectiveness Card */}
        <motion.div 
          onClick={() => setSelectedItem('all')}
          whileHover={{ scale: 1.02 }}
          style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)', 
            border: '1.5px solid #cffafe',
            borderRadius: 40, padding: '60px 100px 140px 100px',
            boxShadow: '0 20px 40px rgba(6, 182, 212, 0.05)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            cursor: 'pointer', width: '85%', maxWidth: 1200,
            position: 'relative', overflow: 'hidden'
          }}
        >
          {/* Background Icon */}
          <Target strokeWidth={1.5} style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)', width: 450, height: 450, color: '#a5f3fc', opacity: 0.4, pointerEvents: 'none' }} />

          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#0891b2', zIndex: 1 }}>Overall Effectiveness</span>
          <span style={{ fontSize: 160, fontWeight: 900, color: '#164e63', lineHeight: 1, marginTop: 16, zIndex: 1 }}>{animAvg}%</span>
        </motion.div>

        {/* 4 Rings Cards */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, width: '90%', maxWidth: 1400, flexWrap: 'wrap', marginTop: -100, zIndex: 10 }}>
          {items.map((it, i) => (
            <motion.div 
              key={i} 
              onClick={() => setSelectedItem(i)}
              whileHover={{ scale: 1.05, y: -8 }}
              style={{ 
                flex: '1 1 200px',
                background: 'rgba(255, 255, 255, 0.90)', backdropFilter: 'blur(16px)',
                border: '1.5px solid #ffffff',
                borderRadius: 32, padding: '40px 20px', 
                boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, 
                cursor: 'pointer'
              }}
            >
              <Ring pct={it.achieved} color={effAch(it.achieved)} size={140} stroke={14} fontSize={32} bgStroke="#f1f5f9" />
              <span style={{ fontSize: 22, fontWeight: 800, color: '#334155', textAlign: 'center' }}>{short[i]}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 9999
            }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative' }}
            >
              {renderCard(selectedItem)}
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                style={{
                  position: 'absolute', top: -16, right: -16,
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#e11d48', color: '#fff',
                  border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  fontSize: 24, fontWeight: 'bold', lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

const thStyle = (bg) => ({ background: bg, color: '#fff', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '8px 10px', border: '1px solid #fff', textAlign: 'center' });
const thSub = { background: '#f1f5f9', color: '#475569', fontWeight: 800, fontSize: 13, padding: '6px 10px', border: '1px solid #e2e8f0', textAlign: 'center' };
const tdStyle = (o = {}) => ({ padding: '8px 10px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: o.bold ? 900 : 600, color: o.color || '#334155', background: o.bg || '#fff' });

function QO04Detail({ detail, color }) {
  if (!detail) return null;
  if (detail.type === 'gap')            return <GapPanel sites={detail.sites} />;
  if (detail.type === 'implementation') return <ImplementationPanel sites={detail.sites} />;
  if (detail.type === 'verification')   return <VerificationPanel sites={detail.sites} />;
  if (detail.type === 'effectiveness')  return <EffectivenessPanel items={detail.items} color={color} />;
  return null;
}

function RawDataModal({ onClose }) {
  const total = QO05_RAW_DATA.length;
  const done = QO05_RAW_DATA.filter(r => r.status === 'Completed').length;
  const inProg = QO05_RAW_DATA.filter(r => r.status === 'Inprogress').length;

  const StatusBadge = ({ value }) => {
    const ok = value === 'Completed';
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, background: ok ? '#dcfce7' : '#fef9c3', color: ok ? '#166534' : '#854d0e', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: ok ? '#22c55e' : '#eab308' }} />
        {value}
      </span>
    );
  };

  const th = { padding: '14px 16px', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 800, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em', textAlign: 'left', whiteSpace: 'nowrap' };
  const td = { padding: '14px 16px', fontSize: 14, color: '#334155', verticalAlign: 'top', lineHeight: 1.5 };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        style={{ width: '100%', maxWidth: 1600, height: '100%', background: '#fff', borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}
      >
        {/* Header */}
        <div style={{ padding: '22px 32px', background: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>Gap Assessment &amp; Training — Raw Data</div>
            <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>Phase 1 · Complete task-by-task record</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1', background: 'rgba(255,255,255,0.08)', padding: '8px 14px', borderRadius: 99 }}>{total} tasks</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#bbf7d0', background: 'rgba(34,197,94,0.15)', padding: '8px 14px', borderRadius: 99 }}>{done} completed</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fde68a', background: 'rgba(234,179,8,0.15)', padding: '8px 14px', borderRadius: 99 }}>{inProg} in progress</span>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: 22, color: '#fff', fontWeight: 'bold', lineHeight: 1 }}>×</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1200 }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 10 }}>
              <tr>
                <th style={{ ...th, width: 56, textAlign: 'center' }}>#</th>
                <th style={th}>Site</th>
                <th style={th}>Product</th>
                <th style={th}>Process Step</th>
                <th style={{ ...th, minWidth: 280 }}>Current Gap / Risk</th>
                <th style={{ ...th, minWidth: 280 }}>Implementation</th>
                <th style={th}>Planner</th>
                <th style={th}>IPQA</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {QO05_RAW_DATA.map((row, i) => {
                const ok = row.status === 'Completed';
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                    <td style={{ ...td, textAlign: 'center', fontWeight: 800, color: '#94a3b8', borderLeft: `4px solid ${ok ? '#22c55e' : '#eab308'}` }}>{row.id}</td>
                    <td style={{ ...td, fontWeight: 700, whiteSpace: 'nowrap', color: row.site === 'Site III' ? '#7c3aed' : '#2563eb' }}>{row.site}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{row.product}</td>
                    <td style={{ ...td, fontWeight: 600, whiteSpace: 'pre-line' }}>{row.processStep}</td>
                    <td style={{ ...td, color: '#b91c1c', whiteSpace: 'pre-line' }}>{row.gap}</td>
                    <td style={{ ...td, color: '#047857', whiteSpace: 'pre-line' }}>{row.implementation}</td>
                    <td style={td}><StatusBadge value={row.trainingPlanner} /></td>
                    <td style={td}><StatusBadge value={row.trainingIPQA} /></td>
                    <td style={td}><StatusBadge value={row.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Combined QI Detail Panel for QO 05 Phase 1
function CombinedQIDetailPanel({ qis, color }) {
  const [showRaw, setShowRaw] = useState(false);
  
  try {
    // Analytics
    const validGaps = QO05_RAW_DATA.filter(r => r.gap !== 'NA' && r.gap !== '-');
    const totalIdentifiedGapsCount = validGaps.reduce((acc, r) => {
      const matches = r.gap.match(/\d+[\.\)]/g);
      return acc + (matches ? matches.length : 1);
    }, 0);
    const totalItems = QO05_RAW_DATA.length;
    const completed = QO05_RAW_DATA.filter(r => r.status === 'Completed').length;
    const inProgress = QO05_RAW_DATA.filter(r => r.status === 'Inprogress').length;
    const trainingDone = QO05_RAW_DATA.filter(r => r.trainingIPQA === 'Completed').length;
    
    const plannerDone = QO05_RAW_DATA.filter(r => r.trainingPlanner === 'Completed').length;

    const siteStats = (siteName) => {
      const rows = QO05_RAW_DATA.filter(r => r.site === siteName);
      const t = rows.length;
      const d = rows.filter(r => r.status === 'Completed').length;
      const ip = rows.filter(r => r.status === 'Inprogress').length;
      return { t, d, ip, pct: t > 0 ? Math.round((d / t) * 100) : 0 };
    };
    const site15 = siteStats('Site I & V');
    const site3  = siteStats('Site III');

    const progress = totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0;
    const trainingProgress = totalItems > 0 ? Math.round((trainingDone / totalItems) * 100) : 0;
    const plannerProgress = totalItems > 0 ? Math.round((plannerDone / totalItems) * 100) : 0;

    return (
      <>
        <AnimatePresence>
          {showRaw && <RawDataModal onClose={() => setShowRaw(false)} />}
        </AnimatePresence>

        <motion.div key="combined-detail"
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}
          style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f1f5f9', overflow: 'hidden' }}
        >
          <div style={{ flexShrink: 0, padding: '28px 36px', background: '#fff', borderBottom: '1.5px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <span style={{
                fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
                background: `${color}15`, color, border: `1px solid ${color}30`,
                padding: '6px 14px', borderRadius: 7, display: 'inline-block', marginBottom: 16
              }}>
                Phase 1 Analytics
              </span>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Gap Assessment & Training
              </div>
            </div>
            
            <button onClick={() => setShowRaw(true)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#0f172a', color: '#fff',
              border: 'none', borderRadius: 12, padding: '14px 24px',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(15,23,42,0.15)'
            }}>
              <LayoutList size={20} />
              View Full Raw Data
            </button>
          </div>
        </div>

        <div style={{ flex: 1, padding: '32px 36px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* ── HERO: one clear sentence + honest segmented bar ── */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '26px 32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: 36 }}>
            <div style={{ display: 'flex', gap: 32, flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{totalItems}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#64748b', marginTop: 6 }}>Tasks reviewed</div>
              </div>
              <div style={{ width: 1, background: '#e2e8f0' }} />
              <div>
                <div style={{ fontSize: 48, fontWeight: 900, color, lineHeight: 1 }}>{totalIdentifiedGapsCount}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#64748b', marginTop: 6 }}>Specific gaps found</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#475569' }}>{completed} fixed &middot; {inProgress} in progress</span>
                <span style={{ fontSize: 30, fontWeight: 900, color: '#16a34a' }}>{progress}%</span>
              </div>
              <div style={{ display: 'flex', height: 18, borderRadius: 99, overflow: 'hidden', background: '#f1f5f9' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.1, ease: 'easeOut' }} style={{ background: '#22c55e' }} />
                <motion.div initial={{ width: 0 }} animate={{ width: `${100 - progress}%` }} transition={{ duration: 1.1, ease: 'easeOut' }} style={{ background: '#eab308' }} />
              </div>
              <div style={{ display: 'flex', gap: 20, marginTop: 12, fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                <span><span style={{ display: 'inline-block', width: 11, height: 11, borderRadius: 3, background: '#22c55e', marginRight: 7, verticalAlign: 'middle' }} />Completed ({completed})</span>
                <span><span style={{ display: 'inline-block', width: 11, height: 11, borderRadius: 3, background: '#eab308', marginRight: 7, verticalAlign: 'middle' }} />In progress ({inProgress})</span>
              </div>
            </div>
          </div>

          {/* ── SITE CARDS: honest per-site progress ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { name: 'Site I & V', s: site15, c: '#2563eb', bg: '#eff6ff' },
              { name: 'Site III',   s: site3,  c: '#7c3aed', bg: '#f5f3ff' },
            ].map((x) => (
              <div key={x.name} style={{ background: '#fff', borderRadius: 20, padding: '24px 28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', background: x.c, padding: '7px 16px', borderRadius: 8 }}>{x.name}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b' }}>{x.s.t} tasks</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#475569' }}>{x.s.d} done &middot; {x.s.ip} in progress</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: x.c }}>{x.s.pct}%</span>
                </div>
                <div style={{ height: 12, borderRadius: 99, background: x.bg, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${x.s.pct}%` }} transition={{ duration: 1, ease: 'easeOut' }} style={{ height: '100%', background: x.c, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── TRAINING: slim single row, no competing donuts ── */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '22px 32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#e0e7ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={24} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>Training status</span>
            </div>
            <div style={{ flex: 1, display: 'flex', gap: 40 }}>
              {[
                { label: 'IPQA trained', done: trainingDone, pct: trainingProgress },
                { label: 'Planner trained', done: plannerDone, pct: plannerProgress },
              ].map((tr) => (
                <div key={tr.label} style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b' }}>{tr.label}</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#4f46e5' }}>{tr.done} / {totalItems}</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 99, background: '#eef2ff', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${tr.pct}%` }} transition={{ duration: 1, ease: 'easeOut' }} style={{ height: '100%', background: '#6366f1', borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </>
    );
  } catch(err) {
    return (
      <div style={{ padding: 40, color: 'red', fontSize: 24 }}>
        <h1>Error in CombinedQIDetailPanel:</h1>
        <pre>{err.message}</pre>
        <pre>{err.stack}</pre>
      </div>
    );
  }
}

// ─── QI Detail Panel ──────────────────────────────────────────────────────────
function QIDetailPanel({ qi, color, detail, objId }) {
  const progress = getQIProgress(qi);
  const [activePdf, setActivePdf] = useState(null); // { src, title } | null — shared evidence viewer
  useEffect(() => {
    if (!activePdf) return;
    const onKey = (e) => { if (e.key === 'Escape') setActivePdf(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePdf]);
  const [showStaff, setShowStaff] = useState(false);
  const [expandedSite, setExpandedSite] = useState(null);
  useEffect(() => {
    if (!showStaff) return;
    const onKey = (e) => { if (e.key === 'Escape') setShowStaff(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showStaff]);
  const staffEvent = qi.events.find((e) => e.title.includes('Involvement of QA staff'));
  const staffTaskPct = staffEvent ? Math.round(statusWeight(staffEvent.status) * 100) : 0;
  return (
    <motion.div key={`detail-${qi.id}`}
      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}
    >
      {/* FIX #3: Description shown prominently in header, not truncated */}
      <div style={{ flexShrink: 0, padding: '22px 28px 18px', background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, paddingRight: 60 }}>
          {/* Title + badge */}
          <div style={{ flex: 1 }}>
            <span style={{
              fontSize: 21, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
              background: `${color}15`, color, border: `1px solid ${color}30`,
              padding: '6px 14px', borderRadius: 7, display: 'inline-block', marginBottom: 12
            }}>
              {qi.id} · Task Breakdown
            </span>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1e293b', lineHeight: 1.2 }}>{qi.name}</div>
            {qi.allotted && qi.allotted !== 'NA' && (
              <div style={{ fontSize: 22, fontWeight: 700, color: '#64748b', marginTop: 6 }}>
                QI Weight: <span style={{ color }}>{qi.allotted}</span>
              </div>
            )}
          </div>

          {/* Completion - slightly left of far-right edge */}
          <div style={{ textAlign: 'left', flexShrink: 0, paddingTop: 4 }}>
            <div style={{ fontSize: 21, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 4 }}>Completion</div>
            <div style={{ fontSize: 68, fontWeight: 900, color, lineHeight: 1 }}>{progress}%</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 16, height: 10, borderRadius: 99, background: '#e2e8f0', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${color}70, ${color})` }} />
        </div>
      </div>

      {/* Body - custom 3-site panel for QO 04, else generic task list */}
      {detail ? <QO04Detail detail={detail} color={color} /> : (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Column headers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px 12px', borderBottom: '1.5px solid #f1f5f9' }}>
          <div style={{ width: 18, flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#94a3b8' }}>Task Description</div>
          <div style={{ width: 185, flexShrink: 0, textAlign: 'center', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#94a3b8' }}>Timeline</div>
          <div style={{ width: 195, flexShrink: 0, textAlign: 'center', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#94a3b8' }}>Status</div>
          <div style={{ width: 80, flexShrink: 0, textAlign: 'right', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#94a3b8' }}>Wt.</div>
        </div>

        {qi.events.map((event, i) => {
          const meta = getStatusMeta(event.status);
          const clickable = objId === '09' && qi.id === 'QI 3' && event.title.includes('Involvement of QA staff');
          const pctMatch = (event.status || '').match(/\((\d+)%\)/);
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.22 }}
              onClick={clickable ? () => setShowStaff(true) : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                borderRadius: 12, padding: '18px 18px',
                background: clickable ? `${color}0c` : '#fafafa',
                border: `1.5px solid ${clickable ? color + '40' : '#f1f5f9'}`,
                cursor: clickable ? 'pointer' : 'default',
                transition: 'border-color 0.15s'
              }}
              whileHover={{ borderColor: `${color}40`, background: '#f8fafc' }}
            >
              {/* Status dot */}
              <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, backgroundColor: meta.dot, boxShadow: `0 0 6px ${meta.dot}60` }} />

              {/* Title */}
              <span style={{ flex: 1, fontSize: 23, fontWeight: 600, color: '#334155', lineHeight: 1.4 }}>
                {event.title}
                {clickable && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 12, padding: '4px 12px', borderRadius: 8, background: color, color: '#fff', fontSize: 14, fontWeight: 800, verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                    View site breakdown <ChevronRight size={15} />
                  </span>
                )}
              </span>

              {/* Timeline */}
              <div style={{ width: 165, flexShrink: 0, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#475569' }}>{event.startDate || '-'}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#94a3b8' }}>→ {event.endProposed || '-'}</div>
              </div>

              {/* Status pill */}
              <div style={{ width: 175, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                <span style={{
                  fontSize: 19, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '8px 16px', borderRadius: 9, whiteSpace: 'nowrap',
                  background: meta.bg, color: meta.text, border: `1px solid ${meta.dot}25`
                }}>
                  {meta.label}{pctMatch ? ` (${pctMatch[1]}%)` : ''}
                </span>
              </div>

              {/* Weight */}
              <span style={{ width: 80, flexShrink: 0, textAlign: 'right', fontSize: 23, fontWeight: 900, color }}>{event.taskPercent}%</span>
            </motion.div>
          );
        })}
        {objId === '09' && qi.id === 'QI 1' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
            <button
              onClick={() => setActivePdf({ src: '/Training session for QA.pdf', title: 'Training session for QA.pdf' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: color, color: '#fff', fontSize: 18, fontWeight: 800,
                padding: '12px 28px', borderRadius: 12, cursor: 'pointer',
                border: 'none', boxShadow: `0 8px 20px ${color}50`,
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 24px ${color}60`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 20px ${color}50`; }}
            >
              <FileText size={22} /> View Evidence
            </button>
            <button
              onClick={() => setActivePdf({ src: '/Training planner 2026 (QO 09).pdf', title: 'Training planner 2026 (QO 09).pdf' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#7c3aed', color: '#fff', fontSize: 18, fontWeight: 800,
                padding: '12px 28px', borderRadius: 12, cursor: 'pointer',
                border: 'none', boxShadow: '0 8px 20px rgba(124,58,237,0.31)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(124,58,237,0.38)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(124,58,237,0.31)'; }}
            >
              <FileText size={22} /> SITE III Evidence
            </button>
          </div>
        )}
      </div>
      )}

      {/* PDF Evidence Viewer — polished window-style modal (shared by both buttons) */}
      {activePdf && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setActivePdf(null); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column'
          }}
        >
          {/* Window title bar (sits above the browser's native PDF toolbar) */}
          <div style={{
            flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 22px', background: '#1e293b', borderBottom: `2px solid ${color}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 16, fontWeight: 700 }}>
              <FileText size={20} /> {activePdf.title}
            </div>
            <button
              onClick={() => setActivePdf(null)}
              aria-label="Close PDF"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#ef4444', color: '#fff', fontSize: 15, fontWeight: 800,
                padding: '8px 18px', borderRadius: 8, cursor: 'pointer', border: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ef4444'; }}
            >
              ✕ Close
            </button>
          </div>

          {/* Native browser PDF viewer fills the rest, edge-to-edge */}
          <iframe
            title={activePdf.title}
            src={activePdf.src}
            style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }}
          />
        </div>
      )}

      {/* QA Staff Involvement modal — QO 9 / QI 3 (per-site Before vs After) */}
      {showStaff && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowStaff(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ flexShrink: 0, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', background: '#1e293b' }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>QA Staff Involvement — QMS · IPQA · Lab QA (Before vs After)</div>
            <button onClick={() => setShowStaff(false)} aria-label="Close"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, background: '#ef4444', color: '#fff', fontSize: 22, fontWeight: 800, borderRadius: 10, cursor: 'pointer', border: 'none' }}>
              ✕
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '30px 34px', background: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Overall task completion */}
            <div style={{ background: '#fff', borderRadius: 18, border: `2px solid ${color}`, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginRight: 220 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Overall Task Completion</div>
                <div style={{ fontSize: 22, fontWeight: 600, color: '#94a3b8', marginTop: 8 }}>% Involvement of QA staff in cross-functional improvement initiatives</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 92, fontWeight: 900, color: '#059669', lineHeight: 1 }}>{staffTaskPct}</span>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#059669' }}>%</span>
              </div>
            </div>

            {QO9_QI3_STAFF_INVOLVEMENT.map((s) => {
              const stats = [
                { label: 'Before %', value: `${s.beforePct}%`, grad: 'linear-gradient(135deg, #ef4444 0%, #fca5a5 100%)' },
                { label: 'After %', value: `${s.afterPct}%`, grad: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)' },
                { label: 'Total Employees', value: s.totalEmployees, grad: 'linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)' },
                { label: 'QA Sub-Departments', value: s.subDepts, grad: 'linear-gradient(135deg, #8b5cf6 0%, #c4b5fd 100%)' },
              ];
              return (
                <div key={s.site}>
                  <div 
                    onClick={() => setExpandedSite(expandedSite === s.site ? null : s.site)}
                    style={{ cursor: 'pointer', background: '#fff', padding: '24px', borderRadius: 20, border: expandedSite === s.site ? `2px solid ${s.color || '#3b82f6'}` : '2px solid transparent', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.2s', position: 'relative' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                      <h2 style={{ fontSize: 30, fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>{s.site} QA Staff Involved in QMS, IPQA, Lab QA</h2>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronRight size={24} style={{ color: '#64748b', transform: expandedSite === s.site ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
                      {stats.map((t) => (
                        <div key={t.label} style={{ background: t.grad, borderRadius: 16, padding: '16px 24px', boxShadow: '0 8px 20px rgba(0,0,0,0.10)' }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: '#1e293b' }}>{t.label}</div>
                          <div style={{ fontSize: 42, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginTop: 6 }}>{t.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedSite === s.site && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: 16 }}>
                          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                    <thead>
                      <tr style={{ background: '#0f172a' }}>
                        <th style={{ textAlign: 'left', padding: '15px 22px', fontSize: 17, fontWeight: 800, color: '#fff', borderRadius: '10px 0 0 10px' }}>Department</th>
                        <th style={{ textAlign: 'center', padding: '15px 12px', fontSize: 17, fontWeight: 800, color: '#fff' }}>Before (Members)</th>
                        <th style={{ textAlign: 'center', padding: '15px 12px', fontSize: 17, fontWeight: 800, color: '#fff' }}>Before (%)</th>
                        <th style={{ textAlign: 'center', padding: '15px 12px', fontSize: 17, fontWeight: 800, color: '#fff' }}>After (Members)</th>
                        <th style={{ textAlign: 'center', padding: '15px 12px', fontSize: 17, fontWeight: 800, color: '#fff', borderRadius: '0 10px 10px 0' }}>After (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.rows.map((r, ri) => (
                        <tr key={ri} style={{ background: '#fff', boxShadow: '0 1px 5px rgba(0,0,0,0.06)' }}>
                          <td style={{ padding: '15px 22px', fontSize: 18, fontWeight: 800, color: '#1e293b', borderRadius: '10px 0 0 10px' }}>{r.dept}</td>
                          <td style={{ textAlign: 'center', padding: '15px 12px', fontSize: 18, fontWeight: 700, color: '#334155' }}>{r.beforeMembers}</td>
                          <td style={{ textAlign: 'center', padding: '15px 12px', fontSize: 18, fontWeight: 900, color: '#ef4444' }}>{r.beforePct}%</td>
                          <td style={{ textAlign: 'center', padding: '15px 12px', fontSize: 18, fontWeight: 700, color: '#334155' }}>{r.afterMembers}</td>
                          <td style={{ textAlign: 'center', padding: '15px 12px', fontSize: 18, fontWeight: 900, color: '#10b981', borderRadius: '0 10px 10px 0' }}>{r.afterPct}%</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#e2e8f0' }}>
                        <td style={{ padding: '15px 22px', fontSize: 18, fontWeight: 900, color: '#1e293b', borderRadius: '10px 0 0 10px' }}>Totals</td>
                        <td style={{ background: '#e2e8f0' }}></td>
                        <td style={{ textAlign: 'center', padding: '15px 12px', fontSize: 18, fontWeight: 900, color: '#ef4444' }}>Before: {s.totalBefore}</td>
                        <td style={{ background: '#e2e8f0' }}></td>
                        <td style={{ textAlign: 'center', padding: '15px 12px', fontSize: 18, fontWeight: 900, color: '#10b981', borderRadius: '0 10px 10px 0' }}>After: {s.totalAfter}</td>
                      </tr>
                    </tbody>
                  </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── All QO Overview Panel ─────────────────────────────────────────────────────
function AllQOOverviewPanel({ onSelectObj }) {
  const totalAllTasks = objectivesData.flatMap(o => o.qis.flatMap(q => q.events)).length;
  const completedAll  = objectivesData.flatMap(o => o.qis.flatMap(q => q.events)).filter(e => getStatusMeta(e.status).label.startsWith('COMPLETED')).length;
  const overallPct    = totalAllTasks > 0 ? Math.round((completedAll / totalAllTasks) * 100) : 0;

  return (
    <motion.div key="all-overview"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden', position: 'relative' }}
    >
      {/* Animated Aurora Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '10%', left: '15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0) 70%)', borderRadius: '50%', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ x: [0, -150, 100, 0], y: [0, 150, -50, 0], scale: [1, 0.8, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', bottom: '5%', right: '10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)', borderRadius: '50%', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ x: [0, 80, -120, 0], y: [0, 80, 120, 0], scale: [1, 1.3, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '40%', left: '50%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Header with logo top-right */}
      <div style={{ position: 'relative', zIndex: 10, flexShrink: 0, padding: '20px 32px 16px', background: '#fff', borderBottom: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#64748b', marginBottom: 6 }}>Quality Objectives</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>Overall Completion - All 5 Objectives</div>
        </div>
        <img
          src="https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/public/logo.png"
          alt="MolBio Diagnostics"
          style={{ height: 52, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
        />
      </div>

      {/* Cards grid */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, overflowY: 'auto', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Big overall % banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 28,
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          border: '1.5px solid #e0f2fe',
          boxShadow: '0 12px 32px rgba(14, 165, 233, 0.05)',
          borderRadius: 32, padding: '32px 48px 80px 48px', flexShrink: 0,
          width: '100%', maxWidth: 1600
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0369a1', marginBottom: 16 }}>Total Programme Progress</div>
            <div style={{ height: 16, borderRadius: 99, background: 'rgba(14, 165, 233, 0.1)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${overallPct}%` }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)' }} />
            </div>
          </div>
          <div style={{ fontSize: 100, fontWeight: 900, lineHeight: 1, color: '#0c4a6e', flexShrink: 0 }}>{overallPct}%</div>
        </div>

        {/* QO Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, width: '96%', maxWidth: 1550, marginTop: -60, zIndex: 10 }}>
          {objectivesData.map((o, i) => {
            const th      = QO_THEME[o.id] || { hex: '#64748b' };
            const allEvts = o.qis.flatMap(q => q.events);
            const pct     = getObjProgress(o);
            const done    = allEvts.filter(e => getStatusMeta(e.status).label.startsWith('COMPLETED')).length;
            const active  = allEvts.filter(e => { const l = getStatusMeta(e.status).label; return l === 'IN PROCESS' || l === 'INITIATED'; }).length;

            return (
              <motion.div key={o.id}
                onClick={() => onSelectObj && onSelectObj(o.id)}
                whileHover={{ scale: 1.03, y: -4 }}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: `linear-gradient(160deg, #ffffff 40%, ${th.hex}18 100%)`,
                  border: `2px solid ${th.hex}50`,
                  borderTop: `6px solid ${th.hex}`,
                  borderRadius: 24,
                  display: 'flex', flexDirection: 'column',
                  position: 'relative', cursor: 'pointer',
                  boxShadow: `0 16px 40px ${th.hex}15`
                }}
              >
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                  {/* QO label */}
                  <div style={{ fontSize: 25, fontWeight: 900, color: th.hex, letterSpacing: '0.08em' }}>QO {o.id}</div>

                  {/* Huge % */}
                  <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1, color: th.hex, letterSpacing: '-0.03em' }}>{pct}%</div>

                  {/* Full description */}
                  <div style={{ fontSize: 23, fontWeight: 600, color: '#334155', lineHeight: 1.5, flex: 1 }}>
                    {o.desc}
                  </div>

                  {/* Stats (Pill Badges) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: 12, fontSize: 17, fontWeight: 800 }}>✓ {done} done</span>
                      {active > 0 && <span style={{ background: '#fef3c7', color: '#b45309', padding: '6px 12px', borderRadius: 12, fontSize: 17, fontWeight: 800 }}>● {active} active</span>}
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: 12, fontSize: 17, fontWeight: 800 }}>{allEvts.length} tasks</span>
                    </div>

                    {/* Progress bar */}
                    <div style={{ height: 12, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${th.hex}80, ${th.hex})` }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Intro Splash Screen ─────────────────────────────────────────────────────
function IntroScreen({ onComplete }) {
  // Stays until user clicks anywhere - no auto-advance

  const shortDesc = {
    '05': 'Reduce In-process & Final Product Defects',
    '06': 'Digitalization of Quality Management System',
    '07': 'Optimizing QA Performance via Defined Timeline',
    '08': 'Creating Vertical Compliance Team',
    '09': 'Enhance Competency & Engagement of QA Personnel',
  };

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ exit: { duration: 0.7 } }}
      onClick={onComplete}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'linear-gradient(135deg, #030912 0%, #0a1628 50%, #030912 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', overflow: 'hidden', userSelect: 'none'
      }}
    >
      {/* ── Ambient glow rings ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Horizontal sweep line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)', transformOrigin: 'left' }}
      />

      {/* ── Main content ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative' }}>


        {/* Label chip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 24, border: '1px solid rgba(59,130,246,0.35)', padding: '8px 24px', borderRadius: 99, background: 'rgba(59,130,246,0.08)' }}
        >
          MolBio Diagnostics · FY 2026–2027
        </motion.div>

        {/* QUALITY */}
        <div style={{ overflow: 'hidden', lineHeight: 1 }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{ fontSize: 96, fontWeight: 900, letterSpacing: '-0.02em', color: '#f8fafc', lineHeight: 1 }}
          >
            QUALITY
          </motion.div>
        </div>

        {/* OBJECTIVES */}
        <div style={{ overflow: 'hidden', lineHeight: 1 }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{ fontSize: 96, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            OBJECTIVES
          </motion.div>
        </div>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          style={{ height: 4, borderRadius: 99, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #e11d48)', marginTop: 16, width: '100%', transformOrigin: 'left' }}
        />

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ fontSize: 18, fontWeight: 600, color: '#64748b', marginTop: 20, letterSpacing: '0.04em' }}
        >
          5 Objectives – Monitoring Quality System Performance
        </motion.div>
      </div>

      {/* ── QO Cards staggered ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 52, position: 'relative', width: '100%' }}>
        {objectivesData.map((o, i) => {
          const th = QO_THEME[o.id] || { hex: '#64748b' };
          return (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 1.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: `${th.hex}12`,
                border: `2px solid ${th.hex}45`,
                borderRadius: 20, padding: '26px 28px', width: 270,
                display: 'flex', flexDirection: 'column', gap: 14,
                boxShadow: `0 0 32px ${th.hex}25`
              }}
            >
              {/* QO Number - big & bold */}
              <div style={{ fontSize: 34, fontWeight: 900, color: th.hex, letterSpacing: '-0.01em', lineHeight: 1 }}>QO {o.id}</div>
              {/* Description - large, bright, projector-readable */}
              <div style={{ fontSize: 24, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.5 }}>{shortDesc[o.id]}</div>
              {/* Bottom accent bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.12 }}
                style={{ height: 4, borderRadius: 99, background: `linear-gradient(90deg, ${th.hex}, ${th.hex}60)`, transformOrigin: 'left', marginTop: 4 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Click to explore prompt ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ duration: 1.2, delay: 2.8, repeat: Infinity, repeatDelay: 1 }}
        style={{
          marginTop: 52, display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 18, fontWeight: 700, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase'
        }}
      >
        Click anywhere to explore <ArrowRight size={16} />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const QualityObjectivesSlide = () => {
  const [activeQO, setActiveQO] = useState('ALL');
  const [activeQI, setActiveQI] = useState('OVERVIEW');
  const [showIntro, setShowIntro]  = useState(true);

  const obj    = objectivesData.find(o => o.id === activeQO) || objectivesData[0];
  const accent = QO_THEME[activeQO] || { hex: '#3b82f6', rgb: '59,130,246' };
  const qi     = obj.qis.find(q => q.id === activeQI);

  const slideRef = useRef(null);
  const isInView = useInView(slideRef, { once: false, amount: 0.1 });

  // Reset QI to overview when switching QO
  useEffect(() => setActiveQI('OVERVIEW'), [activeQO]);

  // Hide persistent corner logo when ALL overview is active
  useEffect(() => {
    document.body.classList.toggle('hide-corner-logo', activeQO === 'ALL');
    return () => document.body.classList.remove('hide-corner-logo');
  }, [activeQO]);

  // Reset intro every time this slide becomes active again
  useEffect(() => {
    if (isInView) {
      setShowIntro(true);
    } else {
      setShowIntro(false);
      setActiveQO('ALL'); // Optionally reset state when leaving
    }
  }, [isInView]);

  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  // Dynamic sidebar item height based on QI count
  const sidebarCompact = obj.qis.length >= 6;

  return (
    <section ref={slideRef} data-background-color="#060d1a" data-logo="dark" data-state="quality-objectives" style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', padding: 0, margin: 0 }}>
      {/* ── Intro splash ── */}
      <AnimatePresence>
        {showIntro && <IntroScreen key="intro" onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <div style={{
        width: '100%', height: '100%',
        display: 'flex', overflow: 'hidden',
        background: 'linear-gradient(135deg, #060d1a 0%, #0d1a2e 60%, #060d1a 100%)',
        position: 'relative'
      }}>
        {/* Ambient glows */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', top: -100, right: 0, background: `${accent.hex}12`, filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', bottom: -60, left: 80, background: `${accent.hex}08`, filter: 'blur(90px)' }} />
        </div>

        {/* ══ COLUMN 1: QO Selector - wider to fit labels ══ */}
        <div style={{
          width: 150, flexShrink: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'space-evenly',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(0,0,0,0.30)',
          position: 'relative', zIndex: 10
        }}>
          {/* ALL Overview button at top */}
          <button onClick={() => setActiveQO('ALL')}
            style={{
              position: 'relative', width: 130, borderRadius: 16,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 5, padding: '12px 8px',
              cursor: 'pointer', border: 'none', outline: 'none',
              background: activeQO === 'ALL' ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.04)',
              boxShadow: activeQO === 'ALL' ? 'inset 0 0 0 1.5px rgba(255,255,255,0.4)' : 'inset 0 0 0 1px rgba(255,255,255,0.07)',
              transition: 'all 0.25s'
            }}>
            <span style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: activeQO === 'ALL' ? '#f8fafc' : '#475569' }}>ALL</span>
            <span style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: activeQO === 'ALL' ? '#cbd5e1' : '#334155' }}>Overview</span>
            {activeQO === 'ALL' && (
              <motion.div layoutId="qoActiveBar"
                style={{ position: 'absolute', right: -1, top: '50%', transform: 'translateY(-50%)', width: 4, height: 30, borderRadius: '4px 0 0 4px', background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.6)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
          </button>

          {/* Divider */}
          <div style={{ width: 100, height: 1, background: 'rgba(255,255,255,0.07)' }} />

          {objectivesData.map(o => {
            const isAct = o.id === activeQO;
            const th    = QO_THEME[o.id] || { hex: '#64748b' };
            const shortLabels = { '05': 'Defect', '06': 'Digital', '07': 'QA Perf', '08': 'Compliance', '09': 'Training' };
            return (
              <button key={o.id} onClick={() => setActiveQO(o.id)}
                style={{
                  position: 'relative', width: 130, borderRadius: 16,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 6, padding: '14px 8px',
                  cursor: 'pointer', border: 'none', outline: 'none',
                  background: isAct ? `${th.hex}22` : 'rgba(255,255,255,0.04)',
                  boxShadow: isAct ? `0 0 22px ${th.hex}40, inset 0 0 0 1.5px ${th.hex}60` : 'inset 0 0 0 1px rgba(255,255,255,0.07)',
                  transition: 'all 0.25s'
                }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: isAct ? th.hex : '#64748b', lineHeight: 1 }}>{o.id}</span>
                <span style={{
                  fontSize: 18, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.06em', lineHeight: 1.3, textAlign: 'center',
                  color: isAct ? `${th.hex}cc` : '#334155'
                }}>{shortLabels[o.id]}</span>
                {isAct && (
                  <motion.div layoutId="qoActiveBar"
                    style={{ position: 'absolute', right: -1, top: '50%', transform: 'translateY(-50%)', width: 4, height: 36, borderRadius: '4px 0 0 4px', background: th.hex, boxShadow: `0 0 10px ${th.hex}` }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
              </button>
            );
          })}
        </div>

        {/* ══ COLUMN 2+3: All QO Overview OR normal sidebar+content ══ */}
        <AnimatePresence mode="wait">
          {activeQO === 'ALL' ? (
            <motion.div key="all" style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <AllQOOverviewPanel onSelectObj={setActiveQO} />
            </motion.div>
          ) : (
            <motion.div key={activeQO} style={{ flex: 1, minWidth: 0, display: 'flex', overflow: 'hidden' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

              {/* QI Sidebar */}
              <div style={{
                width: 320, flexShrink: 0,
                display: 'flex', flexDirection: 'column',
                borderRight: `3px solid ${accent.hex}40`,
                background: 'rgba(0,0,0,0.18)',
                position: 'relative', zIndex: 10, overflow: 'hidden'
              }}>
                <div style={{ padding: '24px 22px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em', color: accent.hex, marginBottom: 6 }}>QO {activeQO}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8', lineHeight: 1.3 }}>{obj.qis.length} Quality Indicators</div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: sidebarCompact ? 4 : 6 }}>

                  <button onClick={() => setActiveQI('OVERVIEW')}
                    style={{
                      textAlign: 'left', padding: sidebarCompact ? '10px 16px' : '14px 16px',
                      borderRadius: 12, cursor: 'pointer', border: 'none', outline: 'none',
                      background: activeQI === 'OVERVIEW' ? 'rgba(255,255,255,0.09)' : 'transparent',
                      boxShadow: activeQI === 'OVERVIEW' ? 'inset 0 0 0 1px rgba(255,255,255,0.12)' : 'none',
                      display: 'flex', alignItems: 'center', gap: 12, position: 'relative', transition: 'all 0.2s'
                    }}>
                    {activeQI === 'OVERVIEW' && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 32, borderRadius: '0 4px 4px 0', background: accent.hex }} />}
                    <Layers size={22} style={{ color: activeQI === 'OVERVIEW' ? accent.hex : '#475569', flexShrink: 0 }} />
                    <span style={{ fontSize: 20, fontWeight: 700, color: activeQI === 'OVERVIEW' ? '#f8fafc' : '#64748b' }}>Overview</span>
                  </button>
                  <div style={{ margin: '4px 10px', height: 1, background: 'rgba(255,255,255,0.06)' }} />
                  {activeQO === '05' ? (
                    <>
                        <button onClick={() => setActiveQI('COMBINED_QI_1_2')}
                          style={{
                            textAlign: 'left', padding: sidebarCompact ? '10px 16px' : '14px 16px',
                            borderRadius: 12, cursor: 'pointer', border: 'none', outline: 'none',
                            background: activeQI === 'COMBINED_QI_1_2' ? `rgba(255,255,255,0.09)` : 'transparent',
                            boxShadow: activeQI === 'COMBINED_QI_1_2' ? `inset 0 0 0 1px rgba(255,255,255,0.2)` : 'none',
                            display: 'flex', flexDirection: 'column', gap: sidebarCompact ? 6 : 8,
                            position: 'relative', transition: 'all 0.2s', marginTop: 4
                          }}>
                          {activeQI === 'COMBINED_QI_1_2' && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 32, borderRadius: '0 4px 4px 0', background: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }} />}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', background: `rgba(255,255,255,0.1)`, color: '#cbd5e1', padding: '3px 10px', borderRadius: 5 }}>Phase 1</span>
                          </div>
                          <span style={{ fontSize: 16, fontWeight: 700, color: activeQI === 'COMBINED_QI_1_2' ? '#f8fafc' : '#cbd5e1', lineHeight: 1.3 }}>Gap & Training</span>
                        </button>

                        {obj.qis.map((q, idx) => {
                          const color = QI_COLORS[idx % QI_COLORS.length];
                          const isAct = activeQI === q.id;
                          const prog  = getQIProgress(q);
                          const isChild = q.id === 'QI 1' || q.id === 'QI 2';
                          
                          return (
                            <button key={q.id} onClick={() => setActiveQI(q.id)}
                              style={{
                                textAlign: 'left', padding: sidebarCompact ? '8px 16px 8px 36px' : '10px 16px 10px 36px',
                                borderRadius: 12, cursor: 'pointer', border: 'none', outline: 'none',
                                background: isAct ? `${color}14` : 'transparent',
                                boxShadow: isAct ? `inset 0 0 0 1px ${color}35` : 'none',
                                display: 'flex', flexDirection: 'column', gap: 6,
                                position: 'relative', transition: 'all 0.2s',
                                marginLeft: isChild ? 16 : 0, 
                                paddingLeft: isChild ? 20 : (sidebarCompact ? 16 : 16)
                              }}>
                              {isAct && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 32, borderRadius: '0 4px 4px 0', background: color, boxShadow: `0 0 8px ${color}` }} />}
                              {isChild && (
                                <div style={{ position: 'absolute', left: -8, top: '50%', width: 16, height: 1.5, background: 'rgba(255,255,255,0.15)' }} />
                              )}
                              {isChild && q.id === 'QI 1' && (
                                <div style={{ position: 'absolute', left: -8, top: -20, width: 1.5, height: 'calc(50% + 20px)', background: 'rgba(255,255,255,0.15)' }} />
                              )}
                              {isChild && q.id === 'QI 2' && (
                                <div style={{ position: 'absolute', left: -8, top: -75, width: 1.5, height: 'calc(50% + 75px)', background: 'rgba(255,255,255,0.15)' }} />
                              )}

                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 15, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', background: `${color}22`, color, padding: '2px 8px', borderRadius: 5 }}>{q.id}</span>
                                <span style={{ fontSize: 15, fontWeight: 900, color: isAct ? color : '#475569' }}>{prog}%</span>
                              </div>
                              <span style={{ fontSize: 15, fontWeight: 600, color: isAct ? '#f8fafc' : '#64748b', lineHeight: 1.2, paddingRight: 4 }}>{q.name}</span>
                              <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${prog}%` }}
                                  transition={{ duration: 0.8, delay: idx * 0.04 }}
                                  style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${color}70, ${color})` }} />
                              </div>
                            </button>
                          );
                        })}
                    </>
                  ) : (
                    obj.qis.map((q, idx) => {
                      const color = QI_COLORS[idx % QI_COLORS.length];
                      const isAct = activeQI === q.id;
                      const prog  = getQIProgress(q);
                      return (
                        <button key={q.id} onClick={() => setActiveQI(q.id)}
                          style={{
                            textAlign: 'left', padding: sidebarCompact ? '10px 16px' : '14px 16px',
                            borderRadius: 12, cursor: 'pointer', border: 'none', outline: 'none',
                            background: isAct ? `${color}14` : 'transparent',
                            boxShadow: isAct ? `inset 0 0 0 1px ${color}35` : 'none',
                            display: 'flex', flexDirection: 'column', gap: sidebarCompact ? 6 : 8,
                            position: 'relative', transition: 'all 0.2s'
                          }}>
                          {isAct && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 32, borderRadius: '0 4px 4px 0', background: color, boxShadow: `0 0 8px ${color}` }} />}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', background: `${color}22`, color, padding: '3px 10px', borderRadius: 5 }}>{q.id}</span>
                            <span style={{ fontSize: 18, fontWeight: 900, color: isAct ? color : '#475569' }}>{prog}%</span>
                          </div>
                          <span style={{ fontSize: 18, fontWeight: 600, color: isAct ? '#f8fafc' : '#64748b', lineHeight: 1.3, paddingRight: 4 }}>{q.name}</span>
                          <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${prog}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.04 }}
                              style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${color}70, ${color})` }} />
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Main content panel */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#f8fafc', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '16px 210px 16px 28px', background: '#fff', borderBottom: '2px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em', color: accent.hex }}>QO {activeQO}</span>
                      <ChevronRight size={18} style={{ color: '#cbd5e1' }} />
                      <span style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#475569' }}>
                        {activeQI === 'MILESTONES' ? 'Milestones' : activeQI === 'OVERVIEW' ? 'Overview' : activeQI === 'COMBINED_QI_1_2' ? 'Phase 1: Gap & Training' : (qi ? qi.id : '')}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', lineHeight: 1.55 }}>{obj.desc}</div>
                </div>
                <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    {activeQI === 'OVERVIEW' ? (
                      <OverviewPanel key={`ov-${activeQO}`} obj={obj} accent={accent} onSelectQI={setActiveQI} />
                    ) : activeQI === 'COMBINED_QI_1_2' ? (
                      <CombinedQIDetailPanel key={`qi-comb-${activeQO}`} qis={[obj.qis[0], obj.qis[1]]} color={QI_COLORS[0]} />
                    ) : qi ? (
                      <QIDetailPanel key={`qi-${activeQO}-${qi.id}`} qi={qi} objId={activeQO} color={QI_COLORS[obj.qis.findIndex(q => q.id === qi.id) % QI_COLORS.length]} detail={null} />
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default QualityObjectivesSlide;
