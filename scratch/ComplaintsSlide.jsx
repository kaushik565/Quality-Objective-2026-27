import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPLAINTS_DATA } from '../data/complaints_data';
import {
  PieChart, Pie, Cell, Tooltip as RTooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { AlertCircle, Maximize2, X, ShieldAlert, Cpu, Wrench, Activity, Inbox, Info, AlertTriangle } from 'lucide-react';

// --- SplashScreen ---
function SplashScreen({ title, isVisible }) {
  return (
    <AnimatePresence>
      {!isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', overflow: 'hidden' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>SECTION 04</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>{title}</div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              style={{ height: 4, background: '#38bdf8', margin: '24px auto 0', borderRadius: 2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Main App Component ---
function ComplaintsApp() {
  const [zoomedSection, setZoomedSection] = useState(null);

  // Common Card Style
  const cardClasses = "bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col group relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-300/60 cursor-pointer";
  
  return (
    <div className="w-full h-full bg-[#f8fafc] flex flex-col font-sans relative isolate" style={{ position: 'absolute', inset: 0 }} onWheel={(e) => e.stopPropagation()}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      {/* HEADER */}
      <div className="shrink-0 px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30 ring-1 ring-white/20">
            <ShieldAlert className="w-6 h-6 text-white drop-shadow-md" />
          </div>
          <div>
            <div className="text-[11px] font-black text-rose-500 tracking-[0.2em] uppercase mb-0.5">Section 04</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">Customer Complaints Intelligence</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-6 relative flex flex-col z-10" onWheel={(e) => e.stopPropagation()}>
        
        {/* KPI Strip */}
        <div className="shrink-0 grid grid-cols-5 gap-5 mb-5">
          {[
            { icon: Inbox, color: 'blue', label: 'Total Complaints', value: COMPLAINTS_DATA.summary.totalComplaints },
            { icon: Activity, color: 'slate', label: 'Devices Affected', value: COMPLAINTS_DATA.summary.totalDevices },
            { icon: AlertTriangle, color: 'rose', label: 'Identified Defects', value: COMPLAINTS_DATA.summary.resolved, isPulse: true },
            { icon: Cpu, color: 'indigo', label: 'Top Root Cause', value: 'Material' },
            { icon: Wrench, color: 'emerald', label: 'Top Stage Issue', value: 'Bottom Cover' }
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            const bgColors = {
              blue: 'bg-blue-50 text-blue-600',
              slate: 'bg-slate-100 text-slate-600',
              rose: 'bg-rose-50 text-rose-600 border border-rose-100 shadow-rose-100/50',
              indigo: 'bg-indigo-50 text-indigo-600',
              emerald: 'bg-emerald-50 text-emerald-600',
            };
            const textColors = {
              blue: 'text-blue-500', slate: 'text-slate-400', rose: 'text-rose-500', indigo: 'text-indigo-400', emerald: 'text-emerald-400'
            };
            return (
              <div key={idx} className={`bg-white/90 backdrop-blur-xl border border-slate-200/60 p-5 rounded-[1.5rem] shadow-sm flex items-center gap-4 relative overflow-hidden ${kpi.color === 'rose' ? 'ring-1 ring-rose-100 shadow-md shadow-rose-500/5' : ''}`}>
                {kpi.color === 'rose' && <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl"></div>}
                <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0 shadow-inner ${bgColors[kpi.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="relative z-10 min-w-0">
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-1 truncate ${textColors[kpi.color]}`}>{kpi.label}</div>
                  <div className={`text-2xl font-black leading-none truncate ${kpi.color === 'rose' ? 'text-rose-600' : 'text-slate-800'}`}>{kpi.value}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Chart Grid Top Row */}
        <div className="flex-[4] min-h-0 grid grid-cols-12 gap-5 mb-5">
          
          {/* RCA Donut */}
          <div onClick={() => setZoomedSection('rca')} className={`col-span-4 ${cardClasses}`}>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-slate-600 bg-white shadow-sm p-1.5 rounded-lg border border-slate-100"><Maximize2 className="w-4 h-4" /></div>
            <div className="mb-2 shrink-0">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Root Cause Analysis</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Defect Origins</p>
            </div>
            <div className="flex-1 min-h-0 flex items-center">
              <div className="w-1/2 h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={COMPLAINTS_DATA.rootCauseAnalysis} cx="50%" cy="50%" innerRadius="65%" outerRadius="90%" paddingAngle={4} dataKey="value" stroke="none" cornerRadius={4}>
                      {COMPLAINTS_DATA.rootCauseAnalysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RTooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text inside donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-slate-800 leading-none">{COMPLAINTS_DATA.summary.totalDevices}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total</span>
                </div>
              </div>
              {/* Custom Legend */}
              <div className="w-1/2 flex flex-col justify-center pl-2 space-y-3">
                {COMPLAINTS_DATA.rootCauseAnalysis.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between group/leg">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-xs font-bold text-slate-600 group-hover/leg:text-slate-900 transition-colors">{entry.name}</span>
                    </div>
                    <span className="text-sm font-black text-slate-800">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process Bottlenecks */}
          <div onClick={() => setZoomedSection('stages')} className={`col-span-4 ${cardClasses}`}>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-slate-600 bg-white shadow-sm p-1.5 rounded-lg border border-slate-100 z-10"><Maximize2 className="w-4 h-4" /></div>
            <div className="mb-4 shrink-0">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Process Bottlenecks</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Issues by Assembly Stage</p>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-between">
              {COMPLAINTS_DATA.processStages.slice(0, 5).map((entry, idx) => {
                const max = 25; // max count for scaling
                const pct = (entry.count / max) * 100;
                const colors = ['from-rose-500 to-rose-400', 'from-amber-500 to-amber-400', 'from-blue-500 to-blue-400', 'from-sky-500 to-sky-400', 'from-indigo-400 to-indigo-300'];
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-700 truncate pr-2">{entry.stage}</span>
                      <span className="text-xs font-black text-slate-900">{entry.count}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${colors[idx] || colors[0]} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-[1px]"></div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unresolved Priority Feed */}
          <div onClick={() => setZoomedSection('unresolved')} className={`col-span-4 bg-gradient-to-br from-rose-50/80 to-white/90 backdrop-blur-xl border border-rose-200/60 rounded-[1.5rem] p-5 shadow-sm flex flex-col group cursor-pointer hover:shadow-md transition-all relative overflow-hidden ring-1 ring-rose-50/50`}>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all text-rose-400 hover:text-rose-600 bg-white shadow-sm p-1.5 rounded-lg border border-rose-100 z-20"><Maximize2 className="w-4 h-4" /></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="mb-4 shrink-0 relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </div>
                  <h3 className="text-xl font-black text-rose-700 tracking-tight">Action Required</h3>
                </div>
                <p className="text-[11px] font-bold text-rose-400/80 uppercase tracking-widest pl-5">Unresolved Priority Cases</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 relative z-10 custom-scrollbar">
              {COMPLAINTS_DATA.unresolvedFeed.slice(0, 4).map((item, i) => (
                <div key={i} className="bg-white/80 p-3 rounded-xl border border-rose-100/60 shadow-sm backdrop-blur-sm group/item hover:border-rose-300 transition-colors flex gap-3">
                  <div className="w-1 bg-rose-400 rounded-full shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black bg-rose-100/50 text-rose-600 px-2 py-0.5 rounded-md font-mono tracking-wider">{item.id}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{item.serial}</span>
                    </div>
                    <div className="text-sm font-black text-slate-800 leading-snug truncate mb-0.5">{item.issue}</div>
                    <div className="text-[10px] font-bold text-slate-500 truncate">{item.product}</div>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2 pb-1 text-[10px] font-black text-rose-400 uppercase tracking-widest group-hover:text-rose-500 transition-colors flex justify-center items-center gap-1">
                View +18 More Cases
              </div>
            </div>
          </div>

        </div>

        {/* Chart Grid Bottom Row */}
        <div className="flex-[3] min-h-0 grid grid-cols-2 gap-5">
          {/* Trend */}
          <div onClick={() => setZoomedSection('timeline')} className={cardClasses}>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-slate-600 bg-white shadow-sm p-1.5 rounded-lg border border-slate-100 z-10"><Maximize2 className="w-4 h-4" /></div>
            <div className="mb-2 shrink-0">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Defect Reporting Trend</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monthly Volume Timeline</p>
            </div>
            <div className="flex-1 min-h-0 -ml-4 -mr-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={COMPLAINTS_DATA.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} dx={-10} />
                  <RTooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 3, boxShadow: '0 0 10px rgba(99,102,241,0.5)' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Products */}
          <div onClick={() => setZoomedSection('products')} className={cardClasses}>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-slate-600 bg-white shadow-sm p-1.5 rounded-lg border border-slate-100 z-10"><Maximize2 className="w-4 h-4" /></div>
            <div className="mb-4 shrink-0">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Affected Product Lines</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Defect Impact Distribution</p>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-4">
              {COMPLAINTS_DATA.productTypes.slice(0, 4).map((prod, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-700">{prod.name}</span>
                    <span className="text-sm font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{prod.value} <span className="text-[10px] text-slate-400 ml-0.5">UNITS</span></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 shadow-inner overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(prod.value / 109) * 100}%` }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full relative ${idx === 0 ? 'bg-gradient-to-r from-rose-500 to-orange-400' : 'bg-gradient-to-r from-slate-700 to-slate-500'}`}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-[1px]"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ZOOMED OVERLAYS */}
      <AnimatePresence>
        {zoomedSection && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-12"
            onClick={() => setZoomedSection(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="bg-[#f8fafc] w-full h-full rounded-[2rem] shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="shrink-0 px-8 py-6 border-b border-slate-200/60 flex justify-between items-center bg-white/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">Detailed Analytics Engine</h2>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Expanded Metric Investigation</p>
                  </div>
                </div>
                <button onClick={() => setZoomedSection(null)} className="w-12 h-12 bg-white hover:bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center transition-colors shadow-sm text-slate-500 hover:text-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-8 overflow-hidden bg-slate-50/50 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                
                {zoomedSection === 'rca' && (
                  <div className="w-full h-full flex flex-col relative z-10">
                    <div className="shrink-0 mb-6 border-b border-slate-200/60 pb-4">
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Complete Root Cause Analysis</h2>
                      <p className="text-slate-500 font-bold mt-1 text-sm tracking-wide">Detailed visualization of defect origins across all resolved and active complaints.</p>
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm flex items-center justify-center">
                      <div className="w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={COMPLAINTS_DATA.rootCauseAnalysis} cx="50%" cy="50%" innerRadius={140} outerRadius={220} paddingAngle={4} dataKey="value" cornerRadius={6}
                              labelLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                              label={({ name, value, cx, cy, x, y }) => (
                                <text x={x} y={y} fill="#334155" fontSize="16" fontWeight="800" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                  {name} ({value} units)
                                </text>
                              )}>
                              {COMPLAINTS_DATA.rootCauseAnalysis.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <RTooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {zoomedSection === 'stages' && (
                  <div className="w-full h-full flex flex-col relative z-10">
                    <div className="shrink-0 mb-6 border-b border-slate-200/60 pb-4">
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Assembly Stage Bottlenecks</h2>
                      <p className="text-slate-500 font-bold mt-1 text-sm tracking-wide">Full ranking of all process stages by defect frequency.</p>
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm overflow-y-auto">
                      <div className="max-w-4xl mx-auto space-y-6 mt-4">
                        {COMPLAINTS_DATA.processStages.map((entry, idx) => {
                           const max = 25; 
                           const pct = (entry.count / max) * 100;
                           const colors = ['from-rose-500 to-rose-400', 'from-amber-500 to-amber-400', 'from-blue-500 to-blue-400', 'from-sky-500 to-sky-400', 'from-indigo-400 to-indigo-300'];
                           return (
                             <div key={idx} className="flex flex-col gap-2">
                               <div className="flex justify-between items-end">
                                 <span className="text-lg font-black text-slate-700">{entry.stage}</span>
                                 <span className="text-2xl font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">{entry.count} <span className="text-xs text-slate-400 ml-1">DEFECTS</span></span>
                               </div>
                               <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${pct}%` }}
                                   transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                   className={`h-full bg-gradient-to-r ${colors[idx] || 'from-slate-400 to-slate-300'} rounded-full relative`}
                                 >
                                   <div className="absolute inset-0 bg-white/20 w-full h-[2px]"></div>
                                 </motion.div>
                               </div>
                             </div>
                           );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {zoomedSection === 'unresolved' && (
                  <div className="w-full h-full flex flex-col relative z-10">
                    <div className="shrink-0 mb-6 border-b border-slate-200/60 pb-4 flex justify-between items-end">
                      <div>
                        <h2 className="text-3xl font-black text-rose-600 flex items-center gap-3 tracking-tight">
                          <AlertCircle className="w-8 h-8" /> Active Priority Cases
                        </h2>
                        <p className="text-slate-500 font-bold mt-1 text-sm tracking-wide">Complete master list of all currently unresolved complaints.</p>
                      </div>
                      <div className="bg-rose-50 text-rose-600 border border-rose-200/60 px-6 py-2.5 rounded-xl font-black text-xl shadow-sm flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                        {COMPLAINTS_DATA.summary.unresolved} Devices Pending
                      </div>
                    </div>
                    <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                      <div className="grid grid-cols-4 gap-4 p-5 bg-slate-50/80 border-b border-slate-200/60 font-black text-slate-400 uppercase tracking-widest text-[11px] shrink-0">
                        <div>Complaint ID</div>
                        <div>Serial Number</div>
                        <div>Product Line</div>
                        <div>Reported Issue</div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        {COMPLAINTS_DATA.unresolvedFeed.map((item, i) => (
                          <div key={i} className="grid grid-cols-4 gap-4 p-4 mb-2 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-md transition-all group/row items-center">
                            <div className="font-mono font-black text-sm text-rose-600 bg-rose-50 w-max px-3 py-1 rounded-lg border border-rose-100">{item.id}</div>
                            <div className="font-mono font-bold text-sm text-slate-600">{item.serial}</div>
                            <div className="font-bold text-sm text-slate-500">{item.product}</div>
                            <div className="font-black text-sm text-slate-800">{item.issue}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {zoomedSection === 'timeline' && (
                  <div className="w-full h-full flex flex-col relative z-10">
                    <div className="shrink-0 mb-6 border-b border-slate-200/60 pb-4">
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Historical Defect Timeline</h2>
                      <p className="text-slate-500 font-bold mt-1 text-sm tracking-wide">Granular view of complaint volume spikes.</p>
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={COMPLAINTS_DATA.timeline} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                          <defs>
                            <linearGradient id="colorCountZoom" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14, fontWeight: 'bold' }} dy={15} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14, fontWeight: 'bold' }} dx={-10} />
                          <RTooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                          <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={6} fillOpacity={1} fill="url(#colorCountZoom)" activeDot={{ r: 10, fill: '#6366f1', stroke: '#fff', strokeWidth: 4, boxShadow: '0 0 20px rgba(99,102,241,0.5)' }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {zoomedSection === 'products' && (
                  <div className="w-full h-full flex flex-col relative z-10">
                    <div className="shrink-0 mb-6 border-b border-slate-200/60 pb-4">
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Detailed Product Line Distribution</h2>
                      <p className="text-slate-500 font-bold mt-1 text-sm tracking-wide">Total impact breakdown across all device portfolios.</p>
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm overflow-y-auto">
                      <div className="space-y-8 max-w-4xl mx-auto mt-8">
                        {COMPLAINTS_DATA.productTypes.map((prod, idx) => (
                          <div key={idx} className="group/prod">
                            <div className="flex justify-between items-end mb-3">
                              <span className="text-2xl font-black text-slate-700 group-hover/prod:text-slate-900 transition-colors">{prod.name}</span>
                              <div className="text-right bg-slate-100 px-4 py-1.5 rounded-xl border border-slate-200/60">
                                <span className="text-3xl font-black text-slate-900 leading-none">{prod.value}</span>
                                <span className="text-[11px] font-black text-slate-400 ml-2 uppercase tracking-widest">Defects</span>
                              </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-5 shadow-inner overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(prod.value / 109) * 100}%` }}
                                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                className={`h-full rounded-full relative ${idx === 0 ? 'bg-gradient-to-r from-rose-500 to-orange-400 shadow-lg shadow-rose-500/30' : idx === 1 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-slate-700 to-slate-500'}`}
                              >
                                <div className="absolute inset-0 bg-white/20 w-full h-[2px]"></div>
                              </motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
    </div>
  );
}

// --- Main Slide Wrapper ---
const ComplaintsOverviewSlide = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check if running inside Reveal.js
    if (!section.closest('.reveal')) {
      setIsVisible(true);
      return;
    }

    const mutObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('present')) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    });
    
    mutObserver.observe(section, { attributes: true, attributeFilter: ['class'] });
    if (section.classList.contains('present')) {
      setIsVisible(true);
    }

    return () => {
      mutObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} data-state="complaints-slide" data-background-color="#f8fafc" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <SplashScreen title="COMPLAINTS OVERVIEW" isVisible={isVisible} />
      {isVisible && <ComplaintsApp />}
    </section>
  );
};

export default ComplaintsOverviewSlide;
