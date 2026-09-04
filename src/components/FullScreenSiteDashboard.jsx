import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, Maximize2, Activity, AlertTriangle, CheckCircle2, Clock, 
  FileText, ShieldAlert, FileSearch, PenTool, LayoutTemplate, 
  TrendingUp, TrendingDown, Target, BarChart2, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  ComposedChart, BarChart, Area, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  CartesianGrid, Legend, PieChart, Pie, Cell, LabelList 
} from 'recharts';

const PIE_COLORS = ['#3b82f6', '#0ea5e9', '#06b6d4', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f97316'];

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (typeof numValue !== 'number' || isNaN(numValue)) {
      setDisplayValue(value);
      return;
    }
    
    let startTimestamp = null;
    const duration = 1500; 

    let frameId;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayValue(Math.floor(easeProgress * numValue));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(numValue);
      }
    };

    frameId = window.requestAnimationFrame(step);
    
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [value]);

  return <>{displayValue}</>;
};

const FullScreenSiteDashboard = ({ site, onClose }) => {
  const { chartData, pieData, aggregate, miniCards, extensions } = useMemo(() => {
    if (!site) return { chartData: [], pieData: [], aggregate: {}, miniCards: [] };

    const labels = {
      CC: 'CC', OOS: 'OOS', CA: 'CA',
      PA: 'PA', IR: 'IR', INV: 'INV',
      DEV: 'DEV', EXT: 'EXT', MAST: 'MAST'
    };
    
    const icons = {
      CC: CheckCircle2, OOS: FileSearch, CA: ShieldAlert, PA: ShieldAlert,
      IR: AlertTriangle, INV: FileSearch, DEV: AlertTriangle, EXT: Clock, MAST: FileText
    };

    let totalPrevVol = 0, totalNowVol = 0;
    let totalMasteringPrev = 0, totalMasteringNow = 0;
    let totalPrevDaysSum = 0, totalNowDaysSum = 0;
    let daysCountPrev = 0, daysCountNow = 0;
    
    let bestEventInfo = { name: 'None', days: 0, reason: '' };
    let bestEventScore = -Infinity;
    
    let eventsWithTargetsCount = 0;
    let eventsMeetingTargetsCount = 0;

    const cData = [];
    const pData = [];
    const mCards = [];

    site?.metrics?.forEach((m, index) => {
      const data = m.calcData || {};
      const name = labels[m.label] || m.label;
      
      const pVol = parseInt(data.prevVolTotal) || 0;
      const nVol = parseInt(data.nowVolTotal) || 0;
      const pDays = parseFloat(data.prevDays);
      const nDays = parseFloat(data.nowDays);
      const target = parseFloat(data.target);

      totalPrevVol += pVol;
      totalNowVol += nVol;

      if (name === 'MAST') {
        totalMasteringPrev = pVol;
        totalMasteringNow = nVol;
      }

      if (!isNaN(pDays) && pDays > 0) { totalPrevDaysSum += pDays; daysCountPrev++; }
      if (!isNaN(nDays)) { 
        totalNowDaysSum += nDays; 
        daysCountNow++; 
        
        let score = (100 - nDays);
        let reasons = [];
        
        if (!isNaN(target) && target > 0) {
           score += ((target - nDays) / target) * 20;
           if (nDays <= target) reasons.push('Met Target');
        }
        if (!isNaN(pDays) && pDays > 0) {
           const imp = (pDays - nDays) / pDays;
           score += imp * 20;
           if (imp > 0) reasons.push(`${Math.round(imp*100)}% Faster`);
        }
        if (nVol > 0) {
           score += Math.log10(nVol) * 10;
           reasons.push(`${nVol} Events`);
        }

        if (score > bestEventScore) {
          bestEventScore = score;
          bestEventInfo = {
            name: name,
            days: Math.round(nDays),
            reason: reasons.join(' • ')
          };
        }
      }

      if (!isNaN(nDays) && !isNaN(target)) {
        eventsWithTargetsCount++;
        if (nDays <= target) eventsMeetingTargetsCount++;
      }

      cData.push({
        name,
        'Last MRM (Days)': isNaN(pDays) ? 0 : Math.round(pDays),
        'Present (Days)': isNaN(nDays) ? 0 : Math.round(nDays),
        Target: isNaN(target) ? 0 : Math.round(target),
      });

      if (nVol > 0) {
        pData.push({ name, value: nVol, color: PIE_COLORS[index % PIE_COLORS.length] });
      }

      mCards.push({
        label: name,
        icon: icons[m.label] || Activity,
        nDays: isNaN(nDays) ? 'NA' : Math.round(nDays),
        pDays: isNaN(pDays) ? 'NA' : Math.round(pDays),
        nVol: nVol,
        pVol: pVol,
        target: isNaN(target) ? 'NA' : Math.round(target),
        color: PIE_COLORS[index % PIE_COLORS.length]
      });
    });

    let targetAdherence = eventsWithTargetsCount > 0 ? Math.round((eventsMeetingTargetsCount / eventsWithTargetsCount) * 100) : 0;
    // Override for Site I as requested by user
    if (site.id === 'SITE-I') {
      targetAdherence = 100;
    }

    const extensionsData = site?.extensionsAnalysis;
    const extensions = {
      hasData: !!extensionsData,
      totalPresent: 0,
      totalLast: 0,
      mostExtended: { name: 'None', count: 0, lastCount: 0 },
      topDept: { name: 'None', count: 0, lastCount: 0 },
      eventComparisonData: [],
      deptStackedData: [],
      deptKeys: []
    };

    if (extensions.hasData) {
      const deptCounts = {};
      
      // Process Present
      extensionsData.presentPeriod.forEach(item => {
        extensions.totalPresent += item.total;
        if (item.total > extensions.mostExtended.count) {
          extensions.mostExtended = { name: item.event, count: item.total };
        }
        
        const row = { event: item.event, Present: item.total, Last: 0 };
        if (item.depts) {
          Object.entries(item.depts).forEach(([dept, count]) => {
            deptCounts[dept] = (deptCounts[dept] || 0) + count;
          });
        }
        extensions.eventComparisonData.push(row);
      });

      // Find top dept
      Object.entries(deptCounts).forEach(([dept, count]) => {
        if (count > extensions.topDept.count) extensions.topDept = { name: dept, count, lastCount: 0 };
      });

      // Process Last
      extensionsData.lastPeriod.forEach(item => {
        extensions.totalLast += item.total;
        const row = extensions.eventComparisonData.find(r => r.event === item.event);
        if (row) row.Last = item.total;
        else extensions.eventComparisonData.push({ event: item.event, Present: 0, Last: item.total });
        
        if (item.event === extensions.mostExtended.name) {
          extensions.mostExtended.lastCount += item.total;
        }
        
        if (item.depts && item.depts[extensions.topDept.name]) {
          extensions.topDept.lastCount += item.depts[extensions.topDept.name];
        }
      });

      // Prepare Department Stacked Data
      extensionsData.presentPeriod.forEach(item => {
        if (item.total > 0) {
           const row = { event: item.event };
           if (item.depts) {
             Object.entries(item.depts).forEach(([dept, count]) => {
               row[dept] = count;
             });
           }
           extensions.deptStackedData.push(row);
        }
      });
      
      extensions.deptKeys = Array.from(new Set(extensionsData.presentPeriod.flatMap(i => Object.keys(i.depts || {}))));
    }

    return { 
      chartData: cData, 
      pieData: pData,
      miniCards: mCards,
      aggregate: {
        totalPrevVol,
        totalNowVol,
        totalMasteringPrev,
        totalMasteringNow,
        avgPrevDays: daysCountPrev ? Math.round(totalPrevDaysSum / daysCountPrev) : 0,
        avgNowDays: daysCountNow ? Math.round(totalNowDaysSum / daysCountNow) : 0,
        bestEventInfo: bestEventInfo,
        targetAdherence
      },
      extensions
    };
  }, [site]);

  return (
    <AnimatePresence>
      {site && (
        <PortalDashboard site={site} onClose={onClose} chartData={chartData} pieData={pieData} aggregate={aggregate} miniCards={miniCards} extensions={extensions} />
      )}
    </AnimatePresence>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-xl">
        <p className="font-black text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm font-bold my-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-slate-600">{entry.name}:</span>
            <span className="text-slate-900">{entry.value} Days</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ExtensionsTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-xl">
        <p className="font-black text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm font-bold my-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-slate-600">{entry.name}:</span>
            <span className="text-slate-900">{entry.value} Extensions</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLabel = (props) => {
  const { x, y, width, value } = props;
  if (!value) return null;
  return (
    <g>
      <path d={`M${x+width/2-4},${y-4} L${x+width/2+4},${y-4} L${x+width/2},${y} Z`} fill="#64748b" opacity={0.8}/>
      <text x={x+width/2} y={y-8} fill="#334155" fontSize={11} fontWeight={800} textAnchor="middle">{value}</text>
    </g>
  );
};

const CustomStackedLabel = (props) => {
  const { x, y, width, value } = props;
  if (!value || value < 3) return null; // Hide labels for very small segments to prevent overlap
  return (
    <g>
      <path d={`M${x+width/2-4},${y-4} L${x+width/2+4},${y-4} L${x+width/2},${y} Z`} fill="#64748b" opacity={0.8}/>
      <text x={x+width/2} y={y-8} fill="#334155" fontSize={11} fontWeight={800} textAnchor="middle">{value}</text>
    </g>
  );
};

const PortalDashboard = ({ site, onClose, chartData, pieData, aggregate, miniCards, extensions }) => {
  const [zoomedSection, setZoomedSection] = React.useState(null);
  // Defer the chart-heavy sections one paint so the KPI counters start animating
  // immediately on open instead of being starved by the synchronous chart render.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#f8fafc] flex flex-col overflow-hidden"
        style={{ width: '100vw', height: '100vh' }}
      >
        {/* Decorative Background */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(191,219,254,0.4) 0%, transparent 70%)` }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,213,255,0.4) 0%, transparent 70%)' }}></div>

        {/* Floating Premium Header */}
        <div className="relative z-10 flex items-center justify-between px-8 py-5 mx-8 mt-6 mb-0 bg-slate-100/80 backdrop-blur-2xl border-2 border-slate-200/60 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex items-center gap-5">
            {/* Glowing Icon Box */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${site.color} flex items-center justify-center shadow-lg relative group`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${site.color} blur-md opacity-40 rounded-2xl group-hover:opacity-70 transition-opacity duration-500`}></div>
              <Activity className="w-6 h-6 text-white relative z-10" />
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-black text-slate-800 tracking-tighter m-0 leading-tight drop-shadow-sm" style={{textTransform: 'none'}}>{site.id}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] m-0">Process Monitoring QMS Analytics</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="h-12 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.23)] hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-rose-400/50"
          >
            <span className="font-bold tracking-widest uppercase text-sm">Close</span>
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative z-10 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-6">

            {/* Top KPI Banner (5 Colorful Cards) */}
            <div className="grid grid-cols-5 gap-6">
              
              {/* Total Event Volume - Soft Blue */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full blur-[30px] opacity-20 bg-blue-500 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-blue-600 opacity-80"></div>
                
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2 relative z-10">Total Event Volume</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-5xl font-black text-slate-800 drop-shadow-sm tracking-tighter"><AnimatedNumber value={aggregate.totalNowVol} /></span>
                </div>
                <div className="mt-2 text-sm font-bold text-slate-500 relative z-10">
                  vs <AnimatedNumber value={aggregate.totalPrevVol} /> Last MRM
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none"><Activity className="w-32 h-32 text-blue-900" /></div>
              </div>

              {/* Global Avg Closure Rate - Soft Purple */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full blur-[30px] opacity-20 bg-purple-500 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-400 to-purple-600 opacity-80"></div>

                <h3 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-2 relative z-10">Avg Closure Rate</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-5xl font-black text-slate-800 drop-shadow-sm tracking-tighter"><AnimatedNumber value={aggregate.avgNowDays} /></span>
                  <span className="text-lg font-bold text-slate-500 uppercase tracking-widest">Days</span>
                </div>
                <div className="mt-2 text-sm font-bold text-slate-500 relative z-10">
                  vs <AnimatedNumber value={aggregate.avgPrevDays} /> Days Last MRM
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none"><Clock className="w-32 h-32 text-purple-900" /></div>
              </div>

              {/* Best Avg Days - Soft Yellow */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full blur-[30px] opacity-20 bg-amber-500 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-amber-600 opacity-80"></div>

                <h3 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2 relative z-10">Best Performing Event</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-5xl font-black text-slate-800 drop-shadow-sm tracking-tighter"><AnimatedNumber value={aggregate.bestEventInfo.days} /></span>
                  <span className="text-lg font-bold text-slate-500 uppercase tracking-widest">Days</span>
                </div>
                <div className="mt-2 flex flex-col gap-0.5 relative z-10">
                  <span className="text-sm font-bold text-slate-500">Led by <strong className="font-black text-amber-600">{aggregate.bestEventInfo.name}</strong></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{aggregate.bestEventInfo.reason}</span>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none"><TrendingUp className="w-32 h-32 text-amber-900" /></div>
              </div>

              {/* Target Adherence - Soft Green */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full blur-[30px] opacity-20 bg-emerald-500 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-80"></div>

                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2 relative z-10">Target Adherence</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-5xl font-black text-slate-800 drop-shadow-sm tracking-tighter"><AnimatedNumber value={aggregate.targetAdherence} />%</span>
                </div>
                <div className="mt-2 text-sm font-bold text-slate-500 relative z-10">
                  Of Events Meeting Target
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none"><Target className="w-32 h-32 text-emerald-900" /></div>
              </div>

              {/* Mastering KPI - Soft Pink */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full blur-[30px] opacity-20 bg-rose-500 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-rose-400 to-rose-600 opacity-80"></div>
                
                <h3 className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-2 relative z-10">Total Mastering</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-5xl font-black text-slate-800 drop-shadow-sm tracking-tighter"><AnimatedNumber value={aggregate.totalMasteringNow || 0} /></span>
                </div>
                <div className="mt-2 text-sm font-bold text-slate-500 relative z-10">
                  vs <AnimatedNumber value={aggregate.totalMasteringPrev || 0} /> Last MRM
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none"><FileText className="w-32 h-32 text-rose-900" /></div>
              </div>

            </div>

            {ready && (<>
            {/* Middle Mini Cards (formerly Bottom) */}
            <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-4">
              {miniCards.map((card, i) => {
                // Override DEV for Site I as requested by user
                const isOverTarget = card.nDays !== 'NA' && card.target !== 'NA' && parseFloat(card.nDays) > parseFloat(card.target) && !(site.id === 'SITE-I' && card.label === 'DEV');
                
                return (
                  <div 
                    key={i} 
                    className="bg-white/60 backdrop-blur-xl rounded-[24px] flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                    style={{ border: '1px solid rgba(255,255,255,0.8)', boxShadow: `0 10px 40px -10px ${card.color}30, inset 0 2px 10px rgba(255,255,255,0.5)` }}
                  >
                    {/* Glassmorphism Ambient Glows */}
                    <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: card.color }}></div>
                    <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full blur-[30px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: card.color }}></div>
                    
                    {/* Subtle Top Edge Highlight (replaces the thick solid bar) */}
                    <div className="absolute top-0 left-0 w-full h-[2px] opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}></div>

                    <div className="p-5 flex-1 flex flex-col items-center justify-between gap-4 relative z-10">
                      {/* Title */}
                      <h4 className="text-xl font-black m-0 tracking-tight" style={{ color: card.color, textTransform: 'none' }}>{card.label}</h4>

                      {/* Total Records */}
                      <div className="flex flex-col items-center text-center">
                        <span className="text-[9px] font-bold text-slate-500/80 uppercase tracking-widest mb-1">Total Records</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-slate-800 leading-none"><AnimatedNumber value={card.nVol} /></span>
                          <span className="text-[10px] font-bold text-slate-500">(was <AnimatedNumber value={card.pVol} />)</span>
                        </div>
                      </div>

                      {/* Hero Days */}
                      <div className="flex flex-col items-center text-center mt-2 mb-2 relative">
                        <span className="text-6xl font-black leading-none tracking-tighter mb-1 drop-shadow-sm" style={{ color: card.color }}><AnimatedNumber value={card.nDays} /></span>
                        <span className="text-[10px] font-bold text-slate-500/80 uppercase tracking-widest">Days</span>
                      </div>

                      {/* % Change */}
                      {card.label === 'MAST' ? (() => {
                        const isImproved = card.nVol > card.pVol;
                        const percentChange = card.pVol > 0 ? Math.round(Math.abs(((card.nVol - card.pVol) / card.pVol) * 100)) : 0;
                        return (
                          <div className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${isImproved ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isImproved ? <TrendingUp className="w-3.5 h-3.5 stroke-[3]" /> : <TrendingDown className="w-3.5 h-3.5 stroke-[3]" />}
                            {percentChange}% {isImproved ? 'Increase' : 'Decrease'}
                          </div>
                        );
                      })() : card.pDays !== 'NA' && parseFloat(card.pDays) > 0 && card.nDays !== 'NA' ? (() => {
                        const nDaysNum = parseFloat(card.nDays);
                        const pDaysNum = parseFloat(card.pDays);
                        const isImproved = nDaysNum < pDaysNum;
                        const percentChange = Math.round(Math.abs(((nDaysNum - pDaysNum) / pDaysNum) * 100));
                        return (
                          <div className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${isImproved ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isImproved ? <TrendingDown className="w-3.5 h-3.5 stroke-[3]" /> : <TrendingUp className="w-3.5 h-3.5 stroke-[3]" />}
                            {percentChange}% {isImproved ? 'Faster' : 'Slower'}
                          </div>
                        );
                      })() : null}

                      {/* From/To & Target */}
                      <div className="flex flex-col items-center gap-1.5 w-full mt-2">
                        <div className="flex justify-center gap-3 text-[10px] font-bold uppercase w-full">
                          {card.label === 'MAST' ? (
                            <>
                              <div><span className="text-slate-500">From:</span> <span className={card.nVol > card.pVol ? 'text-rose-600' : 'text-emerald-600'}>{card.pVol}</span></div>
                              <div><span className="text-slate-500">To:</span> <span className={card.nVol > card.pVol ? 'text-emerald-600' : 'text-rose-600'}>{card.nVol}</span></div>
                            </>
                          ) : (
                            <>
                              <div><span className="text-slate-500">From:</span> <span className={parseFloat(card.nDays) < parseFloat(card.pDays) ? 'text-rose-600' : 'text-emerald-600'}>{card.pDays === 'NA' ? 'NA' : `${card.pDays}d`}</span></div>
                              <div><span className="text-slate-500">To:</span> <span className={parseFloat(card.nDays) < parseFloat(card.pDays) ? 'text-emerald-600' : 'text-rose-600'}>{card.nDays === 'NA' ? 'NA' : `${card.nDays}d`}</span></div>
                            </>
                          )}
                        </div>
                        <div className="text-[10px] font-bold uppercase text-slate-500 w-full text-center">
                          Target: <span className="text-slate-800">{card.target === 'NA' ? 'NA' : `${card.target}d`}</span>
                        </div>
                      </div>
                    </div>

                    {/* Glassmorphic Footer Badge */}
                    <div className={`p-3 text-center text-[10px] font-black uppercase tracking-widest relative z-10 backdrop-blur-md border-t border-white/50 ${isOverTarget ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                      {isOverTarget ? 'Missed Target' : 'On Track'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Charts (formerly Middle) */}
            <div className="grid grid-cols-[2fr_1fr] gap-6 h-[410px]">
              
              {/* Bar Chart */}
              <div onClick={() => setZoomedSection('closure')} className="cursor-pointer hover:border-slate-300 hover:shadow-md transition-all group relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm flex flex-col overflow-hidden">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100/80 p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 z-20"><Maximize2 className="w-4 h-4" /></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><BarChart2 className="w-5 h-5" /></div>
                  <h2 className="text-xl font-black text-slate-800 m-0" style={{textTransform: 'none'}}>Closure Rate Comparison</h2>
                </div>
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                        </linearGradient>
                        <filter id="glowDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.25" />
                        </filter>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" strokeOpacity={0.6} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700, dy: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700, dx: -10 }} />
                      <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', opacity: 0.5 }} />
                      <Legend iconType="circle" wrapperStyle={{ fontWeight: 700, fontSize: '13px', paddingTop: '20px', color: '#475569' }} />
                      
                      {/* Background Area for Baseline */}
                      <Area type="monotone" dataKey="Last MRM (Days)" fill="url(#colorLast)" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" activeDot={{ r: 6, strokeWidth: 0, fill: '#94a3b8' }} />
                      
                      {/* Vibrant Gradient Bar for Current Performance */}
                      <Bar dataKey="Present (Days)" fill="url(#colorPresent)" radius={[8, 8, 0, 0]} barSize={28} style={{ filter: 'url(#glowDropShadow)' }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div onClick={() => setZoomedSection('volume')} className="cursor-pointer hover:border-slate-300 hover:shadow-md transition-all group relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm flex flex-col overflow-hidden">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100/80 p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 z-20"><Maximize2 className="w-4 h-4" /></div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><PieChartIcon className="w-5 h-5" /></div>
                  <h2 className="text-xl font-black text-slate-800 m-0" style={{textTransform: 'none'}}>Volume Distribution</h2>
                </div>
                <div className="flex-1 w-full min-h-0 relative">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <defs>
                        <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.15" />
                        </filter>
                      </defs>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={105}
                        paddingAngle={6}
                        cornerRadius={12}
                        dataKey="value"
                        stroke="none"
                        style={{ filter: 'url(#pieShadow)' }}
                        labelLine={{ stroke: '#cbd5e1', strokeWidth: 1.5 }}
                        label={(props) => {
                          const { cx, cy, midAngle, outerRadius, value, fill } = props;
                          const RADIAN = Math.PI / 180;
                          const radius = outerRadius + 15;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text 
                              x={x} 
                              y={y} 
                              fill={fill} 
                              textAnchor={x > cx ? 'start' : 'end'} 
                              dominantBaseline="central" 
                              fontWeight="900" 
                              fontSize="14"
                              style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))' }}
                            >
                              {value}
                            </text>
                          );
                        }}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                        itemStyle={{ color: '#0f172a' }}
                      />
                      <Legend 
                        iconType="circle" 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        formatter={(value) => <span style={{ color: '#64748b' }}>{value}</span>}
                        wrapperStyle={{ position: 'absolute', bottom: -20, width: '100%', fontWeight: 700, fontSize: '12px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text with Premium Glass Orb */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="bg-white/60 backdrop-blur-md rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-[inset_0_2px_15px_rgba(255,255,255,1),0_4px_15px_rgba(0,0,0,0.05)] border border-white/80 relative">
                      <span className="text-4xl font-black text-slate-800 leading-none drop-shadow-sm tracking-tighter">{aggregate.totalNowVol}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Master Data & Document Control Section */}
            <div className="grid grid-cols-[3fr_1fr] gap-6 mt-6">
              
              {/* Document Mastery Grid */}
              <div onClick={() => setZoomedSection('master')} className="cursor-pointer hover:border-slate-300 hover:shadow-md transition-all bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-4 shadow-sm flex flex-col relative overflow-hidden group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100/80 p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 z-20"><Maximize2 className="w-4 h-4" /></div>
                <div className="absolute -left-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700"></div>
                
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 rounded-xl shadow-inner"><FileText className="w-4 h-4" /></div>
                  <h2 className="text-lg font-black text-slate-800 m-0 drop-shadow-sm" style={{textTransform: 'none'}}>Document Master Data by Department</h2>
                </div>
                
                <div className="relative z-10 flex-1 w-full min-h-0 flex flex-col gap-3">
                  {(() => {
                    const TYPES = ['SOP','FM','STP','SPEC','MVP','LT','VMP','QM','SMF','OSEP','ARTWORK'];
                    const TCOL = { SOP:'#6366f1', FM:'#3b82f6', STP:'#10b981', SPEC:'#f43f5e', MVP:'#f59e0b', LT:'#06b6d4', VMP:'#a855f7', QM:'#8b5cf6', SMF:'#ec4899', OSEP:'#14b8a6', ARTWORK:'#eab308' };
                    const docs = site.masterData?.documents || [];
                    const rowTotal = (d) => TYPES.reduce((a,t)=>a+(d[t]||0),0);
                    const byType = TYPES.map(t=>({ name:t, value: docs.reduce((a,d)=>a+(d[t]||0),0), color:TCOL[t] })).filter(d=>d.value>0).sort((a,b)=>b.value-a.value);
                    const byDept = docs.map(d=>({ name:d.dept, value: rowTotal(d) })).filter(d=>d.value>0).sort((a,b)=>b.value-a.value);
                    const topType = byType[0] || { name:'-', value:0, color:'#94a3b8' };
                    const topDept = byDept[0] || { name:'-', value:0 };
                    return (
                      <>
                        <div className="grid grid-cols-3 gap-2.5 shrink-0">
                          <div className="bg-white/60 border border-white/70 rounded-2xl p-3 flex flex-col justify-center">
                            <div className="text-3xl font-black text-slate-800 leading-none tracking-tighter">{byDept.length}</div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Active Departments</div>
                          </div>
                          <div className="bg-white/60 border border-white/70 rounded-2xl p-3 flex flex-col justify-center">
                            <div className="text-3xl font-black leading-none tracking-tighter" style={{ color: topType.color }}>{topType.value}</div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Top Type &middot; {topType.name}</div>
                          </div>
                          <div className="bg-white/60 border border-white/70 rounded-2xl p-3 flex flex-col justify-center">
                            <div className="text-3xl font-black text-indigo-600 leading-none tracking-tighter">{topDept.value}</div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Top Dept &middot; {topDept.name}</div>
                          </div>
                        </div>
                        <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
                          <div className="bg-white/50 border border-white/70 rounded-2xl p-3 flex flex-col">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Documents by Type</h3>
                            <div className="flex-1 min-h-0">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={byType} margin={{ top: 12, right: 6, left: -20, bottom: 0 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} interval={0} angle={-30} textAnchor="end" height={36} />
                                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                  <RechartsTooltip contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                                  <Bar dataKey="value" radius={[5, 5, 0, 0]} label={{ position: 'top', fontSize: 10, fontWeight: 700, fill: '#475569' }}>
                                    {byType.map((d, i) => <Cell key={i} fill={d.color} />)}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="bg-white/50 border border-white/70 rounded-2xl p-3 flex flex-col">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Documents by Department</h3>
                            <div className="flex-1 min-h-0">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={byDept} layout="vertical" margin={{ top: 2, right: 28, left: 4, bottom: 0 }} barSize={11}>
                                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eef2f7" />
                                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                  <YAxis type="category" dataKey="name" width={44} axisLine={false} tickLine={false} tick={{ fontSize: 9.5, fontWeight: 700, fill: '#475569' }} />
                                  <RechartsTooltip contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                                  <Bar dataKey="value" fill="#6366f1" radius={[0, 5, 5, 0]} label={{ position: 'right', fontSize: 10, fontWeight: 700, fill: '#475569' }} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 text-center shrink-0">Click to open the full department table &rarr;</div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Right Side Stats */}
              <div className="flex flex-col gap-4">
                
                {/* Total Documents Mastered */}
                <div className="flex-1 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="p-2.5 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 rounded-2xl mb-3 shadow-inner z-10">
                    <FileText className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center mb-0 z-10">Documents Mastered</h3>
                  <div className="flex flex-col items-center gap-2 z-10">
                      <div className="text-5xl font-black text-slate-800 leading-none drop-shadow-sm tracking-tighter flex items-baseline gap-2">
                        <AnimatedNumber value={site.masterData?.documents?.reduce((acc, curr) => acc + (curr.SOP || 0) + (curr.FM || 0) + (curr.STP || 0) + (curr.SPEC || 0) + (curr.MVP || 0) + (curr.LT || 0) + (curr.VMP || 0) + (curr.QM || 0) + (curr.SMF || 0) + (curr.OSEP || 0) + (curr.ARTWORK || 0), 0) || 0} />
                      </div>
                      {site.masterData?.documentsLastTotal !== undefined && (() => {
                        const current = site.masterData?.documents?.reduce((acc, curr) => acc + (curr.SOP || 0) + (curr.FM || 0) + (curr.STP || 0) + (curr.SPEC || 0) + (curr.MVP || 0) + (curr.LT || 0) + (curr.VMP || 0) + (curr.QM || 0) + (curr.SMF || 0) + (curr.OSEP || 0) + (curr.ARTWORK || 0), 0) || 0;
                        const last = site.masterData.documentsLastTotal;
                        const isUp = current >= last;
                        return (
                          <div className={`text-sm font-bold flex items-center gap-1.5 ${isUp ? 'text-emerald-600' : 'text-rose-600'} bg-white/50 px-3 py-1 rounded-full shadow-sm border ${isUp ? 'border-emerald-200' : 'border-rose-200'}`}>
                            {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>vs {last} Last MRM</span>
                          </div>
                        );
                      })()}
                    </div>  
                </div>

                {/* Validation Reports Verified */}
                <div className="flex-1 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 rounded-2xl mb-3 shadow-inner z-10">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center mb-0 z-10">Reports Verified</h3>

                  <div className="text-5xl font-black text-slate-800 leading-none drop-shadow-sm tracking-tighter z-10 flex items-baseline gap-2">
                    <AnimatedNumber value={site.masterData?.validationReportsVerified || 0} />
                  </div>

                  {site.masterData?.validationReports && (
                    <div className="z-10 mt-3 w-full flex flex-col items-center gap-2">
                      {(() => {
                        const c = site.masterData.validationReports.completed || 0;
                        const o = site.masterData.validationReports.ongoing || 0;
                        const total = c + o;
                        const pct = total ? Math.round((c / total) * 100) : 0;
                        return (
                          <>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: `${pct}%` }}></div>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span className="text-[12px] font-black text-slate-700"><AnimatedNumber value={c} /></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                <span className="text-[12px] font-black text-slate-700"><AnimatedNumber value={o} /></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ongoing</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Extensions Deep-Dive Analytics */}
            {extensions?.hasData && (
              <div onClick={() => setZoomedSection('extensions')} className="cursor-pointer hover:bg-slate-50/50 hover:shadow-lg hover:border-slate-300 border border-transparent rounded-3xl transition-all mt-6 flex flex-col gap-6 p-4 -mx-4 relative group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-200/80 p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 z-20"><Maximize2 className="w-4 h-4" /></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Clock className="w-5 h-5" /></div>
                  <h2 className="text-xl font-black text-slate-800 m-0" style={{textTransform: 'none'}}>Extensions In-Depth Analysis</h2>
                </div>
                <div className="grid grid-cols-[1fr_2fr_2fr] gap-6">
                  
                  {/* Column 1: Key Insights & KPIs */}
                  <div className="flex flex-col gap-4">
                    {/* Total Extensions */}
                    <div className={`bg-gradient-to-br ${extensions.totalPresent <= extensions.totalLast ? 'from-emerald-50 to-teal-50 border-emerald-100' : 'from-rose-50 to-pink-50 border-rose-100'} border rounded-3xl p-4 shadow-sm relative overflow-hidden group flex-1 flex flex-col justify-center`}>
                      <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ${extensions.totalPresent <= extensions.totalLast ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}></div>
                      <div className={`absolute -left-8 -bottom-8 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ${extensions.totalPresent <= extensions.totalLast ? 'bg-teal-500/20' : 'bg-pink-500/20'}`}></div>
                      
                      <h3 className={`relative z-10 text-xs font-bold ${extensions.totalPresent <= extensions.totalLast ? 'text-emerald-600' : 'text-rose-600'} uppercase tracking-widest mb-1`}>Total Extensions (Present)</h3>
                      <div className="relative z-10 flex items-baseline gap-2">
                        <span className="text-4xl font-black text-slate-800 drop-shadow-sm tracking-tighter"><AnimatedNumber value={extensions.totalPresent} /></span>
                        <span className="text-base font-bold text-slate-500 uppercase tracking-widest">Events</span>
                      </div>
                      <div className={`relative z-10 mt-1 text-xs font-bold flex items-center gap-1.5 ${extensions.totalPresent <= extensions.totalLast ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {extensions.totalPresent <= extensions.totalLast ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                        <span>vs <AnimatedNumber value={extensions.totalLast} /> Last MRM</span>
                      </div>
                    </div>
                    
                    {/* Top Dept */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-4 shadow-sm relative overflow-hidden group flex items-center gap-3 flex-1">
                      <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      
                      <div className="relative z-10 w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Top Contributor</h3>
                        <div className="text-3xl font-black text-slate-800 drop-shadow-sm tracking-tighter leading-none">{extensions.topDept.name || 'N/A'}</div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-sm font-bold text-slate-500">{extensions.topDept.count} Ext.</div>
                          <div className={`text-[10px] font-bold flex items-center gap-1 ${extensions.topDept.count <= extensions.topDept.lastCount ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {extensions.topDept.count <= extensions.topDept.lastCount ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                            <span>vs {extensions.topDept.lastCount} Last</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Most Extended */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-4 shadow-sm relative overflow-hidden group flex items-center gap-3 flex-1">
                      <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                      <div className="relative z-10 w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-inner">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Most Extended Event</h3>
                        <div className="text-3xl font-black text-slate-800 drop-shadow-sm tracking-tighter leading-none">{extensions.mostExtended.name || 'N/A'}</div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-sm font-bold text-slate-500">{extensions.mostExtended.count} Ext.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Event Volume Comparison (Bar Chart) */}
                  <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors duration-700"></div>
                    <h3 className="relative z-10 text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Event Volume Comparison</h3>
                    <div className="relative z-10 flex-1 w-full min-h-[250px]">
                      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                        <ComposedChart data={extensions.eventComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f43f5e" stopOpacity={1}/>
                              <stop offset="100%" stopColor="#e11d48" stopOpacity={0.7}/>
                            </linearGradient>
                            <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#cbd5e1" stopOpacity={0.6}/>
                              <stop offset="100%" stopColor="#e2e8f0" stopOpacity={0.3}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                          <XAxis dataKey="event" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                          <RechartsTooltip content={<ExtensionsTooltip />} cursor={{fill: 'rgba(241, 245, 249, 0.6)', radius: 8}} />
                          <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }} />
                          <Bar dataKey="Last" fill="url(#colorLast)" radius={[6, 6, 0, 0]} maxBarSize={25} />
                          <Bar dataKey="Present" fill="url(#colorPresent)" radius={[6, 6, 0, 0]} maxBarSize={25} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Column 3: Department Breakdown (Stacked Bar) */}
                  <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
                    <h3 className="relative z-10 text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Departmental Breakdown (Present)</h3>
                    <div className="relative z-10 flex-1 w-full min-h-[250px]">
                      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                        <ComposedChart data={extensions.deptStackedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            {['#3b82f6|#2563eb', '#0ea5e9|#0284c7', '#10b981|#059669', '#f59e0b|#d97706', '#ef4444|#dc2626', '#8b5cf6|#7c3aed', '#ec4899|#db2777', '#64748b|#475569', '#14b8a6|#0d9488'].map((c, i) => {
                               const [start, end] = c.split('|');
                               return (
                                 <linearGradient key={`grad-${i}`} id={`gradDept-${i}`} x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="0%" stopColor={start} stopOpacity={1}/>
                                   <stop offset="100%" stopColor={end} stopOpacity={0.8}/>
                                 </linearGradient>
                               );
                            })}
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                          <XAxis dataKey="event" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                          <RechartsTooltip content={<ExtensionsTooltip />} cursor={{fill: 'rgba(241, 245, 249, 0.6)', radius: 8}} />
                          <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }} />
                          {extensions.deptKeys.map((dept, idx) => (
                            <Bar key={dept} dataKey={dept} stackId="a" fill={`url(#gradDept-${idx % 9})`} radius={[0, 0, 0, 0]} maxBarSize={35} />
                          ))}
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>
              </div>
            )}
            </>)}

      {/* ZOOMED MODAL OVERLAY */}
      <AnimatePresence>
        {zoomedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setZoomedSection(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] shadow-2xl p-8 w-full max-w-[90vw] h-[90vh] flex flex-col relative overflow-hidden"
            >
              <button 
                onClick={() => setZoomedSection(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex justify-between items-end mb-6 shrink-0 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 drop-shadow-sm flex items-center gap-3">
                    {zoomedSection === 'closure' && <><BarChart2 className="w-8 h-8 text-blue-500" /> Closure Rate Comparison</>}
                    {zoomedSection === 'volume' && <><PieChartIcon className="w-8 h-8 text-purple-500" /> Volume Distribution</>}
                    {zoomedSection === 'master' && <><FileText className="w-8 h-8 text-indigo-500" /> Document Master Data</>}
                    {zoomedSection === 'extensions' && <><Clock className="w-8 h-8 text-rose-500" /> Extensions Analysis</>}
                  </h2>
                  <p className="text-slate-500 font-bold tracking-widest uppercase mt-2 text-sm flex items-center gap-2">
                    {site?.name} <ChevronRight className="w-4 h-4" /> Process Monitoring QMS Analytics
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full min-h-0 relative overflow-y-auto pr-4 custom-scrollbar">
                {zoomedSection === 'closure' && (
                  <div className="w-full h-[60vh] relative mt-4">
                    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                      <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorLastZoom" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPresentZoom" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" strokeOpacity={0.6} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 16, fontWeight: 700, dy: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 16, fontWeight: 700, dx: -10 }} />
                        <RechartsTooltip cursor={{ fill: '#f8fafc', opacity: 0.5 }} />
                        <Legend iconType="circle" wrapperStyle={{ fontWeight: 700, fontSize: '16px', paddingTop: '20px', color: '#475569' }} />
                        <Area type="monotone" dataKey="Last MRM (Days)" fill="url(#colorLastZoom)" stroke="#94a3b8" strokeWidth={3} strokeDasharray="5 5" activeDot={{ r: 8, strokeWidth: 0, fill: '#94a3b8' }} />
                        <Bar dataKey="Present (Days)" fill="url(#colorPresentZoom)" radius={[12, 12, 0, 0]} barSize={60} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {zoomedSection === 'volume' && (
                  <div className="w-full h-[60vh] relative flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                      <PieChart>
                        <Pie 
                          data={pieData} 
                          cx="50%" cy="50%" 
                          innerRadius={160} outerRadius={220} 
                          paddingAngle={8} 
                          dataKey="value" 
                          stroke="none"
                          labelLine={false}
                          label={({ cx, cy, midAngle, outerRadius, value, name }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = outerRadius * 1.15;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return (
                              <text x={x} y={y} fill={PIE_COLORS[pieData.findIndex(d => d.name === name) % PIE_COLORS.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xl font-black">
                                {name}: {value}
                              </text>
                            );
                          }}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px 20px', fontWeight: 'bold' }}
                          itemStyle={{ color: '#334155', fontSize: '16px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="bg-white/80 backdrop-blur-md rounded-full w-64 h-64 flex flex-col items-center justify-center shadow-2xl border-4 border-white/80">
                        <span className="text-7xl font-black text-slate-800 leading-none drop-shadow-md tracking-tighter">{aggregate.totalNowVol}</span>
                        <span className="text-lg font-bold text-slate-500 uppercase tracking-widest mt-2">Total Issues</span>
                      </div>
                    </div>
                  </div>
                )}

                {zoomedSection === 'master' && (() => {
                  const TYPES = ['SOP','FM','STP','SPEC','MVP','LT','VMP','QM','SMF','OSEP','ARTWORK'];
                  const TCOL = { SOP:'#6366f1', FM:'#3b82f6', STP:'#10b981', SPEC:'#f43f5e', MVP:'#f59e0b', LT:'#06b6d4', VMP:'#a855f7', QM:'#8b5cf6', SMF:'#ec4899', OSEP:'#14b8a6', ARTWORK:'#eab308' };
                  const docs = site.masterData?.documents || [];
                  const rowTotal = (d) => TYPES.reduce((a,t)=>a+(d[t]||0),0);
                  const presentTotal = docs.reduce((a,d)=>a+rowTotal(d),0);
                  return (
                    <div className="w-full mt-2">
                      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="max-h-[70vh] overflow-auto custom-scrollbar">
                          <table className="w-full border-collapse">
                            <thead className="sticky top-0 bg-slate-50 z-10">
                              <tr className="border-b-2 border-slate-200">
                                <th className="text-left px-5 py-4 text-[13px] font-black text-slate-400 uppercase tracking-wider">Department</th>
                                {TYPES.map(t => <th key={t} className="text-center px-3 py-4 text-[13px] font-black uppercase tracking-wider" style={{ color: TCOL[t] }}>{t}</th>)}
                                <th className="text-center px-5 py-4 text-[13px] font-black text-slate-700 uppercase tracking-wider">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {docs.map((d, i) => (
                                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
                                  <td className="px-5 py-3 text-[15px] font-black text-slate-700">{d.dept}</td>
                                  {TYPES.map(t => <td key={t} className="text-center px-3 py-3"><span className="text-[13px] font-bold py-1.5 px-3 rounded-full inline-block min-w-[42px]" style={(d[t]||0) > 0 ? { background: `${TCOL[t]}1A`, color: TCOL[t] } : { background: '#f1f5f9', color: '#cbd5e1' }}>{d[t]||0}</span></td>)}
                                  <td className="text-center px-5 py-3 text-[15px] font-black text-slate-800">{rowTotal(d)}</td>
                                </tr>
                              ))}
                              <tr className="bg-slate-50 border-t-2 border-slate-200">
                                <td className="px-5 py-4 text-[14px] font-black text-slate-700">Total</td>
                                {TYPES.map(t => <td key={t} className="text-center px-3 py-4 text-[13px] font-black text-slate-700">{docs.reduce((a,d)=>a+(d[t]||0),0)}</td>)}
                                <td className="text-center px-5 py-4 text-[16px] font-black text-indigo-600">{presentTotal}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {zoomedSection === 'extensions' && (
                  <div className="w-full mt-4 grid grid-cols-2 gap-8 h-[60vh]">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Event Volume Comparison</h3>
                      <div className="flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                          <ComposedChart data={extensions.eventComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorPresentZ" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f43f5e" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#fb7185" stopOpacity={0.8}/>
                              </linearGradient>
                              <linearGradient id="colorLastZ" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#64748b" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.2}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                            <XAxis dataKey="event" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} />
                            <Bar dataKey="Last" fill="url(#colorLastZ)" radius={[8, 8, 0, 0]} maxBarSize={40}>
                              <LabelList dataKey="Last" content={<CustomLabel />} />
                            </Bar>
                            <Bar dataKey="Present" fill="url(#colorPresentZ)" radius={[8, 8, 0, 0]} maxBarSize={40}>
                              <LabelList dataKey="Present" content={<CustomLabel />} />
                            </Bar>
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Departmental Breakdown</h3>
                      <div className="flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                          <ComposedChart data={extensions.deptStackedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              {['#3b82f6|#2563eb', '#0ea5e9|#0284c7', '#10b981|#059669', '#f59e0b|#d97706', '#ef4444|#dc2626', '#8b5cf6|#7c3aed', '#ec4899|#db2777', '#64748b|#475569', '#14b8a6|#0d9488'].map((c, i) => {
                                 const [start, end] = c.split('|');
                                 return (
                                  <linearGradient key={i} id={`gradDeptZ-${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={start} stopOpacity={1}/>
                                    <stop offset="100%" stopColor={end} stopOpacity={0.8}/>
                                  </linearGradient>
                                 );
                              })}
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                            <XAxis dataKey="event" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} />
                            {extensions.deptKeys.map((dept, idx) => (
                              <Bar key={dept} dataKey={dept} stackId="a" fill={`url(#gradDeptZ-${idx % 9})`} radius={[0, 0, 0, 0]} maxBarSize={45}>
                                <LabelList dataKey={dept} content={<CustomStackedLabel />} />
                              </Bar>
                            ))}
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default FullScreenSiteDashboard;
