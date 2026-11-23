import React, { useState } from 'react';
import {
  GitBranch,
  RotateCcw,
  CheckSquare,
  Square,
  ArrowRight,
  TrendingDown,
  Clock,
  DollarSign,
  ShieldAlert,
  MapPin,
  Package,
  Layers,
  Sparkles,
  ChevronDown,
  Navigation,
  Send,
  Save,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function RouteSimulatorView({ onTriggerToast }) {
  // Interactive Interventions State
  const [interventions, setInterventions] = useState({
    redirectLocker: true,
    shiftCommercial: false,
    smartLink: true,
  });

  const [selectedRoute, setSelectedRoute] = useState('Route R-042 · Driver: M. Vance · 28 Stops');
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);

  const routes = [
    'Route R-042 · Driver: M. Vance · 28 Stops',
    'Route R-018 · Driver: K. Torres · 32 Stops',
    'Route R-031 · Driver: J. Sterling · 24 Stops',
    'Route R-009 · Driver: L. Nguyen · 36 Stops',
  ];

  const activeInterventionCount = Object.values(interventions).filter(Boolean).length;

  const toggleIntervention = (key) => {
    setInterventions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetSimulation = () => {
    setInterventions({
      redirectLocker: true,
      shiftCommercial: false,
      smartLink: true,
    });
    if (onTriggerToast) {
      onTriggerToast('Simulation reset to default baseline configuration.');
    }
  };

  const handleCommitChanges = () => {
    setIsCommitting(true);
    setTimeout(() => {
      setIsCommitting(false);
      if (onTriggerToast) {
        onTriggerToast('Success: Optimized route manifest committed & pushed to Driver M. Vance app.');
      }
    }, 1000);
  };

  const handleSaveScenario = () => {
    if (onTriggerToast) {
      onTriggerToast('Scenario "R-042 Locker Diversion Plan" saved to workspace templates.');
    }
  };

  // Dynamic outcomes calculated based on interventions
  const getOutcomes = () => {
    if (interventions.redirectLocker && interventions.smartLink) {
      return {
        riskBefore: '94%',
        riskAfter: '11%',
        riskDelta: '-83% Risk',
        timeBefore: '4h 20m',
        timeAfter: '3h 52m',
        timeDelta: '-28 mins saved',
        costBefore: '$142.00',
        costAfter: '$118.40',
        costDelta: '+$23.60 Net Savings',
      };
    } else if (interventions.redirectLocker) {
      return {
        riskBefore: '94%',
        riskAfter: '28%',
        riskDelta: '-66% Risk',
        timeBefore: '4h 20m',
        timeAfter: '4h 01m',
        timeDelta: '-19 mins saved',
        costBefore: '$142.00',
        costAfter: '$126.80',
        costDelta: '+$15.20 Net Savings',
      };
    } else if (interventions.smartLink) {
      return {
        riskBefore: '94%',
        riskAfter: '45%',
        riskDelta: '-49% Risk',
        timeBefore: '4h 20m',
        timeAfter: '4h 12m',
        timeDelta: '-8 mins saved',
        costBefore: '$142.00',
        costAfter: '$134.50',
        costDelta: '+$7.50 Net Savings',
      };
    } else {
      return {
        riskBefore: '94%',
        riskAfter: '94%',
        riskDelta: '0% (No Change)',
        timeBefore: '4h 20m',
        timeAfter: '4h 20m',
        timeDelta: '0 mins',
        costBefore: '$142.00',
        costAfter: '$142.00',
        costDelta: '$0.00 Net Savings',
      };
    }
  };

  const outcomes = getOutcomes();

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          1. Page Header Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Counterfactual Route Simulator
          </h1>
          <p className="text-sm text-amber-200/70 mt-1 font-medium">
            Test delivery interventions and preview real-time SLA and cost impacts before dispatch.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs font-black tracking-widest text-[#FFB500] uppercase">
            TODAY • 24 JUN 2026
          </p>
          <p className="text-xs font-mono text-amber-200/50 tabular-nums mt-0.5">
            Last updated 09:42:08
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Route Context & Simulation Control Bar
         ───────────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-[#23120E] border border-[#4A281E] shadow-xl flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Route Selector & Status */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRouteDropdownOpen(!isRouteDropdownOpen)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#170D0A] border border-[#4A281E] hover:border-[#FFB500]/50 text-xs md:text-sm font-bold text-white transition cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#FFB500]" />
              <span>{selectedRoute}</span>
              <ChevronDown className="w-4 h-4 text-amber-200/50" />
            </button>

            {isRouteDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-xl bg-[#23120E] border border-[#4A281E] shadow-2xl py-1.5 z-40 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 text-xs uppercase font-extrabold text-amber-200/50 border-b border-[#4A281E]/40">
                  Select Dispatch Manifest
                </div>
                {routes.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRoute(r);
                      setIsRouteDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs md:text-sm transition hover:bg-[#351C15] ${
                      selectedRoute === r ? 'text-[#FFB500] font-bold bg-[#351C15]/60' : 'text-white/80'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#351C15]/70 border border-[#4A281E] text-xs font-semibold text-amber-200/90">
            <span className="w-2 h-2 rounded-full bg-[#FFB500] animate-pulse" />
            <span>{activeInterventionCount} interventions enabled</span>
          </div>
        </div>

        {/* Right Reset Action */}
        <div>
          <button
            type="button"
            onClick={resetSimulation}
            className="flex items-center gap-2 text-xs md:text-sm font-bold text-amber-200/60 hover:text-[#FFB500] transition cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#351C15]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Simulation</span>
          </button>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Main 2-Column Split (~60% Left Spatial Map / ~40% Right Controls)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── Left Column: Spatial Corridor & Stop Sequence (60% / 7 cols) ── */}
        <div className="lg:col-span-7 xl:col-span-7 rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl overflow-hidden flex flex-col justify-between">
          
          <div className="p-6">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#4A281E]/60">
              <div>
                <h2 className="text-lg font-black text-white">
                  Spatial corridor & stop sequence
                </h2>
                <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
                  Route R-042 · Central Portland
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                Scenario preview
              </span>
            </div>

            {/* Stylized Urban Grid Map Canvas */}
            <div className="relative mt-5 rounded-2xl bg-[#140A07] border border-[#4A281E]/80 overflow-hidden min-h-[380px] p-4 flex flex-col justify-between">
              
              {/* Subtle Urban Grid Background Texture */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #4A281E 1px, transparent 1px), linear-gradient(to bottom, #4A281E 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Street Names Watermarks */}
              <div className="absolute top-4 left-6 text-[10px] font-mono tracking-widest text-amber-200/20 font-bold uppercase select-none">
                NW EVERETT ST
              </div>
              <div className="absolute top-28 left-44 text-[10px] font-mono tracking-widest text-amber-200/20 font-bold uppercase select-none">
                NW DAVIS ST
              </div>
              <div className="absolute bottom-20 left-12 text-[10px] font-mono tracking-widest text-amber-200/20 font-bold uppercase select-none">
                OAK STREET
              </div>
              <div className="absolute bottom-6 right-8 text-[10px] font-mono tracking-widest text-amber-200/20 font-bold uppercase select-none">
                CENTRAL DISTRICT
              </div>

              {/* Interactive SVG Routing Paths Canvas */}
              <div className="relative w-full h-80 z-10">
                <svg className="w-full h-full" viewBox="0 0 600 320" fill="none">
                  <defs>
                    <linearGradient id="solidPathGrad" x1="0" y1="0" x2="600" y2="300" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#64748B" />
                      <stop offset="1" stopColor="#475569" />
                    </linearGradient>

                    <linearGradient id="emeraldPathGrad" x1="0" y1="0" x2="600" y2="300" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10B981" />
                      <stop offset="1" stopColor="#059669" />
                    </linearGradient>
                  </defs>

                  {/* 1. Original Route Path (Solid dark line connecting 01 to 08) */}
                  <path
                    d="M 50 60 L 140 60 L 220 110 L 310 110 L 390 70 L 460 120 L 520 180 L 560 250"
                    stroke="#475569"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70"
                  />

                  {/* 2. Proposed Locker Diversion Path (Dashed Emerald Green line from 03 -> Locker -> 06) */}
                  {interventions.redirectLocker && (
                    <path
                      d="M 220 110 Q 220 220, 310 220 T 460 120"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      className="animate-[dash_1.5s_linear_infinite]"
                    />
                  )}

                  {/* Stop 01 */}
                  <circle cx="50" cy="60" r="14" fill="#23120E" stroke="#FFB500" strokeWidth="2.5" />
                  <text x="50" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">01</text>

                  {/* Stop 02 */}
                  <circle cx="140" cy="60" r="14" fill="#23120E" stroke="#FFB500" strokeWidth="2.5" />
                  <text x="140" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">02</text>

                  {/* Stop 03 (Branch Point) */}
                  <circle cx="220" cy="110" r="14" fill="#23120E" stroke="#FFB500" strokeWidth="2.5" />
                  <text x="220" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">03</text>

                  {/* Stop 04 (FLAGGED CRITICAL SLA RISK NODE) */}
                  <circle cx="310" cy="110" r="18" fill="#450A0A" stroke="#EF4444" strokeWidth="3.5" />
                  <circle cx="310" cy="110" r="24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
                  <text x="310" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="monospace">04</text>

                  {/* Stop 05 */}
                  <circle cx="390" cy="70" r="14" fill="#23120E" stroke="#FFB500" strokeWidth="2.5" />
                  <text x="390" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">05</text>

                  {/* Stop 06 */}
                  <circle cx="460" cy="120" r="14" fill="#23120E" stroke="#FFB500" strokeWidth="2.5" />
                  <text x="460" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">06</text>

                  {/* Stop 07 */}
                  <circle cx="520" cy="180" r="14" fill="#23120E" stroke="#FFB500" strokeWidth="2.5" />
                  <text x="520" y="185" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">07</text>

                  {/* Stop 08 */}
                  <circle cx="560" cy="250" r="14" fill="#23120E" stroke="#FFB500" strokeWidth="2.5" />
                  <text x="560" y="255" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">08</text>
                </svg>

                {/* Floating Callout Card for Stop 04 */}
                <div className="absolute top-10 left-[260px] bg-[#3B0D0C] border border-rose-500/80 rounded-xl px-3 py-1.5 shadow-2xl shadow-rose-900/50 flex items-center gap-2 text-xs">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-mono font-bold text-white">#NX-084291</span>
                    <span className="text-rose-300 font-semibold block text-[10px]">Stop 04 · SLA risk</span>
                  </div>
                </div>

                {/* Proposed Parcel Locker Box Highlight (South of Stop 04) */}
                {interventions.redirectLocker && (
                  <div className="absolute bottom-6 left-[220px] bg-[#063327] border border-emerald-400 rounded-xl p-2.5 shadow-xl shadow-emerald-950/60 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-900/80 border border-emerald-400/60 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white leading-tight">
                        Central Station Parcel Locker
                      </p>
                      <p className="text-[10px] text-emerald-300 font-medium">
                        Smart Parcel Locker · 0.4 mi away
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Legend Row */}
              <div className="pt-3 border-t border-[#4A281E]/50 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200/60 z-10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-0.5 bg-slate-400 rounded" />
                    <span>Original route</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-0.5 border-b-2 border-emerald-400 border-dashed" />
                    <span className="text-emerald-400 font-semibold">Proposed locker diversion</span>
                  </span>
                </div>
                <div className="font-mono text-[11px] text-amber-200/50">
                  8 of 28 stops shown
                </div>
              </div>

            </div>

            {/* Horizontal Stop Arrival Timeline */}
            <div className="mt-6 pt-5 border-t border-[#4A281E]/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-extrabold text-amber-200/50 uppercase tracking-wider">
                <span>ESTIMATED ARRIVAL · SCENARIO</span>
                <span className="text-[#FFB500] font-sans text-xs">Dynamic Resequence Active</span>
              </div>

              {/* 8 Connected Timeline Dots */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[
                  { stop: 'Stop 01', time: '10:02', isOptimized: false },
                  { stop: 'Stop 02', time: '10:14', isOptimized: false },
                  { stop: 'Stop 03', time: '10:27', isOptimized: false },
                  { stop: 'Stop 04', time: '10:39', isOptimized: true },
                  { stop: 'Stop 05', time: '10:51', isOptimized: false },
                  { stop: 'Stop 06', time: '11:04', isOptimized: false },
                  { stop: 'Stop 07', time: '11:16', isOptimized: false },
                  { stop: 'Stop 08', time: '11:29', isOptimized: false },
                ].map((item) => (
                  <div
                    key={item.stop}
                    className={`rounded-xl p-2.5 text-center border transition ${
                      item.isOptimized
                        ? 'bg-emerald-950/60 border-emerald-400/70 text-emerald-200 shadow-md shadow-emerald-950/50'
                        : 'bg-[#180A07] border-[#4A281E]/70 text-amber-100/80'
                    }`}
                  >
                    <p className={`text-[11px] font-bold ${item.isOptimized ? 'text-emerald-300' : 'text-amber-200/50'}`}>
                      {item.stop}
                    </p>
                    <p className="text-xs font-mono font-black tabular-nums mt-0.5">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ── Right Column: Stacked Controls & Outcome (40% / 5 cols) ── */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6">
          
          {/* Top Card — What-if Interventions */}
          <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl space-y-5">
            <div>
              <h2 className="text-lg font-black text-white">
                What-if interventions
              </h2>
              <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
                Configure the scenario before dispatch.
              </p>
            </div>

            {/* 3 Interactive Checkbox Rows */}
            <div className="space-y-3">
              
              {/* Row 1 */}
              <div
                onClick={() => toggleIntervention('redirectLocker')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  interventions.redirectLocker
                    ? 'bg-[#2A1712] border-[#FFB500] shadow-sm'
                    : 'bg-[#180A07] border-[#4A281E] hover:border-[#FFB500]/40'
                }`}
              >
                <div className="mt-0.5 text-[#FFB500]">
                  {interventions.redirectLocker ? (
                    <CheckSquare className="w-5 h-5 text-[#FFB500]" />
                  ) : (
                    <Square className="w-5 h-5 text-amber-200/40" />
                  )}
                </div>
                <div className="text-xs leading-relaxed font-semibold">
                  <span className="text-white">Redirect Stop 04 </span>
                  <span className="font-mono text-[#FFB500]">(#NX-084291)</span>
                  <span className="text-amber-200/80"> to Central Station Parcel Locker</span>
                </div>
              </div>

              {/* Row 2 */}
              <div
                onClick={() => toggleIntervention('shiftCommercial')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  interventions.shiftCommercial
                    ? 'bg-[#2A1712] border-[#FFB500] shadow-sm'
                    : 'bg-[#180A07] border-[#4A281E] hover:border-[#FFB500]/40'
                }`}
              >
                <div className="mt-0.5 text-[#FFB500]">
                  {interventions.shiftCommercial ? (
                    <CheckSquare className="w-5 h-5 text-[#FFB500]" />
                  ) : (
                    <Square className="w-5 h-5 text-amber-200/40" />
                  )}
                </div>
                <div className="text-xs leading-relaxed font-semibold text-white/90">
                  Shift Evening Commercial Stops (+45 mins)
                </div>
              </div>

              {/* Row 3 */}
              <div
                onClick={() => toggleIntervention('smartLink')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  interventions.smartLink
                    ? 'bg-[#2A1712] border-[#FFB500] shadow-sm'
                    : 'bg-[#180A07] border-[#4A281E] hover:border-[#FFB500]/40'
                }`}
              >
                <div className="mt-0.5 text-[#FFB500]">
                  {interventions.smartLink ? (
                    <CheckSquare className="w-5 h-5 text-[#FFB500]" />
                  ) : (
                    <Square className="w-5 h-5 text-amber-200/40" />
                  )}
                </div>
                <div className="text-xs leading-relaxed font-semibold text-white/90">
                  Trigger Automated Customer Smart-Link Confirmation
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Card — Live Simulation Outcome */}
          <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white">
                  Live simulation outcome
                </h2>
                <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
                  Before vs. after · Route R-042
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                Scenario ready
              </span>
            </div>

            {/* 3-Column Before/After Impact Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Column 1: SLA Breach Risk */}
              <div className="p-3.5 rounded-xl bg-[#180A07] border border-[#4A281E] text-center space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200/50">
                  Route SLA Breach Risk
                </p>
                <div className="flex items-baseline justify-center gap-1.5 font-mono">
                  <span className="text-xs text-amber-200/40 line-through">
                    {outcomes.riskBefore}
                  </span>
                  <span className="text-xs text-amber-200/50">→</span>
                  <span className="text-xl font-black text-emerald-400 tabular-nums">
                    {outcomes.riskAfter}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-emerald-950/80 border border-emerald-600/50 text-emerald-300">
                  {outcomes.riskDelta}
                </span>
              </div>

              {/* Column 2: Total Route Time */}
              <div className="p-3.5 rounded-xl bg-[#180A07] border border-[#4A281E] text-center space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200/50">
                  Total Route Time
                </p>
                <div className="flex items-baseline justify-center gap-1.5 font-mono">
                  <span className="text-xs text-amber-200/40 line-through">
                    {outcomes.timeBefore}
                  </span>
                  <span className="text-xs text-amber-200/50">→</span>
                  <span className="text-xl font-black text-emerald-400 tabular-nums">
                    {outcomes.timeAfter}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-emerald-950/80 border border-emerald-600/50 text-emerald-300">
                  {outcomes.timeDelta}
                </span>
              </div>

              {/* Column 3: Projected Route Cost */}
              <div className="p-3.5 rounded-xl bg-[#180A07] border border-[#4A281E] text-center space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200/50">
                  Projected Route Cost
                </p>
                <div className="flex items-baseline justify-center gap-1.5 font-mono">
                  <span className="text-xs text-amber-200/40 line-through">
                    {outcomes.costBefore}
                  </span>
                  <span className="text-xs text-amber-200/50">→</span>
                  <span className="text-xl font-black text-emerald-400 tabular-nums">
                    {outcomes.costAfter}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-emerald-950/80 border border-emerald-600/50 text-emerald-300">
                  {outcomes.costDelta}
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Action Footer Card */}
          <div className="p-5 rounded-2xl bg-[#1C0D0A] border border-[#4A281E] shadow-xl space-y-4">
            <p className="text-xs text-amber-200/50 font-medium flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-200/60 shrink-0" />
              <span>Preview only. Driver route remains unchanged until committed.</span>
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveScenario}
                className="flex-1 py-3 px-4 rounded-xl border border-[#4A281E] bg-[#23120E] hover:bg-[#351C15] text-white font-bold text-xs transition cursor-pointer"
              >
                Save Scenario
              </button>

              <button
                type="button"
                onClick={handleCommitChanges}
                disabled={isCommitting}
                className="flex-[2] py-3 px-4 rounded-xl bg-[#FFB500] hover:bg-[#F0AA00] text-[#170D0A] font-black text-xs md:text-sm transition cursor-pointer shadow-lg shadow-[#FFB500]/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isCommitting ? 'Pushing to Driver...' : 'Commit Changes & Push to Driver App'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
