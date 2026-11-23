import React, { useState } from 'react';
import {
  Radio,
  Warehouse,
  ChevronDown,
  RefreshCw,
  Clock,
  Layers,
  Truck,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Server,
  Zap,
  Gauge
} from 'lucide-react';

export default function HubTelematicsView({ onTriggerToast }) {
  const [selectedHubScope, setSelectedHubScope] = useState('View All Hubs');
  const [isHubScopeDropdownOpen, setIsHubScopeDropdownOpen] = useState(false);
  const [isAutoSyncActive, setIsAutoSyncActive] = useState(true);
  const [isPreAlerting, setIsPreAlerting] = useState(false);

  const hubScopes = [
    'View All Hubs',
    'North Regional Hub - Terminal 4',
    'South Gateway Terminal 2',
    'East Coast Sortation Facility - Hub A',
    'West Pacific Automated Logistics Depot'
  ];

  const handlePreAlertDrivers = () => {
    setIsPreAlerting(true);
    setTimeout(() => {
      setIsPreAlerting(false);
      if (onTriggerToast) {
        onTriggerToast('Pre-Alert dispatched to Drivers on Route R-042 & R-018. Delivery windows shifted +45m.');
      }
    }, 900);
  };

  const handleReassignBay = () => {
    if (onTriggerToast) {
      onTriggerToast('Bay 14 traffic re-routed to Standby Bay 16. Driver wait time clearing.');
    }
  };

  // Hourly volume chart data (06:00 to 13:00)
  const hourlyData = [
    { time: '06:00', volume: 620, isPeak: false },
    { time: '07:00', volume: 780, isPeak: false },
    { time: '08:00', volume: 940, isPeak: false },
    { time: '09:00', volume: 1180, isPeak: true },  // Exceeds 1,000 capacity threshold
    { time: '10:00', volume: 1240, isPeak: true },  // Exceeds 1,000 capacity threshold
    { time: '11:00', volume: 920, isPeak: false },
    { time: '12:00', volume: 750, isPeak: false },
    { time: '13:00', volume: 640, isPeak: false },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          1. Page Header Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Hub Telematics & Bottleneck Monitor
          </h1>
          <p className="text-sm text-amber-200/70 mt-1 font-medium">
            Real-time sorting throughput, bay congestion, and upstream delay propagation across regional terminals.
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
          2. Hub Scope & Auto-Sync Toolbar Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#23120E] border border-[#4A281E] shadow-xl">
        
        {/* Left Hub Selector */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-amber-200/50 uppercase">
            MONITORING / TERMINAL 4:
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsHubScopeDropdownOpen(!isHubScopeDropdownOpen)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#170D0A] border border-[#4A281E] hover:border-[#FFB500]/50 text-xs md:text-sm font-bold text-white transition cursor-pointer"
            >
              <Warehouse className="w-4 h-4 text-[#FFB500]" />
              <span>{selectedHubScope}</span>
              <ChevronDown className="w-4 h-4 text-amber-200/50" />
            </button>

            {isHubScopeDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#23120E] border border-[#4A281E] shadow-2xl py-1.5 z-40 animate-in fade-in zoom-in-95">
                {hubScopes.map((scope) => (
                  <button
                    key={scope}
                    onClick={() => {
                      setSelectedHubScope(scope);
                      setIsHubScopeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs md:text-sm transition hover:bg-[#351C15] ${
                      selectedHubScope === scope ? 'text-[#FFB500] font-bold bg-[#351C15]/60' : 'text-white/80'
                    }`}
                  >
                    <span>{scope}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Auto-Sync Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsAutoSyncActive(!isAutoSyncActive);
              if (onTriggerToast) {
                onTriggerToast(`Auto-Sync telemetry: ${!isAutoSyncActive ? 'Enabled (10s pulse)' : 'Paused'}`);
              }
            }}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs md:text-sm font-bold transition cursor-pointer ${
              isAutoSyncActive
                ? 'bg-[#351C15] border-[#FFB500] text-white shadow-md shadow-[#FFB500]/15'
                : 'bg-[#170D0A] border-[#4A281E] text-amber-200/50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAutoSyncActive ? 'bg-[#FFB500] animate-pulse shadow-[0_0_8px_#FFB500]' : 'bg-amber-200/30'}`} />
            <span>Auto-Sync: 10s</span>
          </button>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Row 1 — 4-Column Telemetry KPI Cards (Equal width)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Avg Hub Processing Duration */}
        <div className="rounded-2xl border border-amber-900/50 bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-[#FFB500]/50 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">
              Avg Hub Processing Duration
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-600/50 text-xs font-bold text-amber-300">
              +9m above SLA baseline
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#FFB500] tabular-nums tracking-tight">
              28 mins
            </span>
          </div>
          <p className="text-xs text-amber-200/50 mt-4 font-medium">
            Historical benchmark: 19 mins
          </p>
        </div>

        {/* Card 2: Active Loading Bays */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-[#FFB500]/50 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">
              Active Loading Bays
            </span>
            <span className="text-xs font-bold text-amber-400">
              90% Utilization
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">
              18 / 20
            </span>
            <span className="text-xs text-amber-200/50 font-bold uppercase">
              Occupied
            </span>
          </div>
          {/* Amber horizontal progress bar */}
          <div className="w-full h-2 rounded-full bg-[#120907] border border-[#4A281E]/50 overflow-hidden mt-4">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-[#FFB500] shadow-[0_0_8px_rgba(255,181,0,0.4)]" style={{ width: '90%' }} />
          </div>
        </div>

        {/* Card 3: Downstream Shipments Impacted */}
        <div className="rounded-2xl border border-rose-900/50 bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-rose-600/60 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300/90">
              Downstream Shipments Impacted
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-rose-400 tabular-nums tracking-tight">
              142
            </span>
          </div>
          <p className="text-xs text-amber-200/50 mt-4 font-medium">
            Parcels facing cascading dispatch delay
          </p>
        </div>

        {/* Card 4: Fleet Vehicles Staged */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-[#FFB500]/50 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">
              Fleet Vehicles Staged
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-600/50 text-xs font-bold text-amber-300">
              6 Delayed at Sortation
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">
              34
            </span>
            <span className="text-xs text-amber-200/50 font-bold uppercase">
              Vans Ready
            </span>
          </div>
          <p className="text-xs text-amber-200/50 mt-4 font-medium">
            Terminal outbound staging docks
          </p>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. Row 2 — 2-Column Asymmetric Split (~62% Left Heatmap / ~38% Right Alert Feed)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Hub Bottleneck & Propagation Heatmap (~62% / 7-8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl p-6 space-y-6">
          
          {/* Card Header & 3-Dot Status Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4A281E]/60">
            <div>
              <h2 className="text-lg font-black text-white">
                Hub Bottleneck & Propagation Heatmap
              </h2>
              <p className="text-xs text-[#FFB500] font-mono tracking-wider font-bold mt-0.5 uppercase">
                TERMINAL 4 / LIVE SORTING LANES
              </p>
            </div>

            {/* 3-Dot Status Legend */}
            <div className="flex items-center gap-3.5 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                Optimal
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
                Warning
              </span>
              <span className="flex items-center gap-1.5 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_#EF4444]" />
                Critical
              </span>
            </div>
          </div>

          {/* 4-Stage Horizontal Node Flow Diagram */}
          <div className="p-4 rounded-xl bg-[#140A07] border border-[#4A281E] overflow-x-auto">
            <div className="min-w-[580px] grid grid-cols-4 gap-4 items-center">
              
              {/* STAGE 1: INBOUND */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold tracking-widest text-amber-200/50 uppercase">
                  1. INBOUND
                </p>
                <div className="p-3.5 rounded-xl bg-[#1F100C] border border-[#4A281E] text-center space-y-1">
                  <Warehouse className="w-5 h-5 text-amber-200/70 mx-auto" />
                  <p className="text-xs font-bold text-white">Inbound Dock</p>
                  <p className="text-[10px] font-mono text-amber-200/50">4 doors active</p>
                </div>
              </div>

              {/* STAGE 2: AUTOMATED SORT */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold tracking-widest text-amber-200/50 uppercase">
                  2. AUTOMATED SORT
                </p>
                <div className="space-y-2.5">
                  {/* Belt A: Optimal */}
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-left">
                    <p className="text-xs font-black text-emerald-300">Belt A</p>
                    <p className="text-[10px] text-emerald-200/70">Normal throughput</p>
                  </div>
                  {/* Belt B: Critical Backlog */}
                  <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-500 text-left shadow-md shadow-rose-950/50 animate-pulse">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-rose-300">Belt B</p>
                      <span className="text-[9px] font-bold px-1 rounded bg-rose-900 text-rose-200">CRITICAL</span>
                    </div>
                    <p className="text-[10px] text-rose-200/90 font-medium">45-min Backlog</p>
                  </div>
                </div>
              </div>

              {/* STAGE 3: STAGING */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold tracking-widest text-amber-200/50 uppercase">
                  3. STAGING
                </p>
                <div className="space-y-1.5">
                  <div className="p-1.5 rounded-md bg-emerald-950/40 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 flex justify-between">
                    <span>Zone 1</span>
                    <span className="text-[10px] text-emerald-400/80">Flow stable</span>
                  </div>
                  <div className="p-1.5 rounded-md bg-emerald-950/40 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 flex justify-between">
                    <span>Zone 2</span>
                    <span className="text-[10px] text-emerald-400/80">Optimal</span>
                  </div>
                  <div className="p-1.5 rounded-md bg-amber-950/60 border border-amber-600/50 text-[11px] font-bold text-amber-300 flex justify-between">
                    <span>Zone 3</span>
                    <span className="text-[10px] text-amber-400">Delay propagating</span>
                  </div>
                  <div className="p-1.5 rounded-md bg-amber-950/60 border border-amber-600/50 text-[11px] font-bold text-amber-300 flex justify-between">
                    <span>Zone 4</span>
                    <span className="text-[10px] text-amber-400">Delay propagating</span>
                  </div>
                </div>
              </div>

              {/* STAGE 4: DISPATCH */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold tracking-widest text-amber-200/50 uppercase">
                  4. DISPATCH
                </p>
                <div className="p-3 rounded-xl bg-[#1F100C] border border-[#4A281E] space-y-2">
                  <p className="text-xs font-bold text-white text-center">Bays 11–14</p>
                  {/* 2x2 Bay Grid */}
                  <div className="grid grid-cols-2 gap-1.5 text-center text-xs font-mono font-bold">
                    <div className="p-1 rounded bg-[#170D0A] border border-[#4A281E] text-amber-200/60">B-11</div>
                    <div className="p-1 rounded bg-[#170D0A] border border-[#4A281E] text-amber-200/60">B-12</div>
                    <div className="p-1 rounded bg-[#170D0A] border border-[#4A281E] text-amber-200/60">B-13</div>
                    <div className="p-1 rounded bg-amber-950/80 border border-amber-500 text-amber-300 shadow-sm">B-14</div>
                  </div>
                  <p className="text-[10px] text-amber-300 font-semibold text-center leading-tight">
                    Bay 14: Driver Wait &gt; 20m
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="h-px bg-[#4A281E]/60" />

          {/* Bottom Sub-Section: Hourly Parcel Sortation Volume vs. Capacity */}
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-black text-white">
                Hourly Parcel Sortation Volume vs. Capacity
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-amber-200/60">
                  <span className="w-3 h-3 rounded-sm bg-slate-500" />
                  Sorted parcels
                </span>
                <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                  <span className="w-4 h-0.5 border-b-2 border-amber-400 border-dashed" />
                  Capacity · 1,000 parcels/hr
                </span>
              </div>
            </div>

            {/* Vertical Column Bar Chart Canvas */}
            <div className="relative h-56 w-full pt-4 pb-2">
              
              {/* Horizontal Capacity Threshold Dashed Line at 1,000 parcels */}
              <div className="absolute top-[35%] inset-x-8 border-b-2 border-dashed border-amber-500/80 z-20 pointer-events-none">
                <span className="absolute -top-3.5 right-0 text-[10px] font-mono font-bold text-amber-400 bg-[#23120E] px-1 rounded">
                  1,000 threshold
                </span>
              </div>

              {/* Y-Axis Labels */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[10px] font-mono text-amber-200/30 pointer-events-none">
                <span>1.2k</span>
                <span>600</span>
                <span>0</span>
              </div>

              {/* 8 Hourly Bars (06:00 to 13:00) */}
              <div className="absolute inset-0 pl-10 pr-4 flex items-end justify-between gap-2 z-10">
                {hourlyData.map((d) => {
                  const maxH = 1400;
                  const barHeightPct = (d.volume / maxH) * 100;

                  return (
                    <div key={d.time} className="flex-1 flex flex-col items-center justify-end h-full group">
                      {/* Bar Volume tooltip on hover */}
                      <span className={`text-[10px] font-mono font-bold mb-1.5 transition ${d.isPeak ? 'text-amber-400 font-black' : 'text-amber-200/40'}`}>
                        {d.volume}
                      </span>

                      {/* Bar Column */}
                      <div
                        className={`w-full max-w-[40px] rounded-t-lg transition duration-200 ${
                          d.isPeak
                            ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-[#FFB500] shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                            : 'bg-slate-600/80 group-hover:bg-slate-500'
                        }`}
                        style={{ height: `${barHeightPct}%` }}
                      />

                      {/* Hour Timestamp */}
                      <span className={`mt-2 text-[10px] font-mono ${d.isPeak ? 'text-amber-300 font-bold' : 'text-amber-200/50'}`}>
                        {d.time}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

        {/* Right Column: Live Hub-to-Route Delay Feed (~38% / 4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl p-6 space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#4A281E]/60">
            <div>
              <h2 className="text-lg font-black text-white">
                Live Hub-to-Route Delay Feed
              </h2>
              <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
                Prioritized hub anomalies triggering downstream delivery risk
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#351C15] border border-[#FFB500]/50 text-[#FFB500]">
              2 active
            </span>
          </div>

          {/* 2 Stacked Alert Cards */}
          <div className="space-y-4">
            
            {/* Alert Card 1: Critical — Rose/Red Border */}
            <div className="rounded-2xl border border-rose-600/70 bg-[#2C100C] p-5 shadow-xl space-y-3.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-950 border border-rose-500 text-xs font-black text-rose-300">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Critical
                </span>
                <span className="text-[11px] font-mono text-amber-200/40">
                  Raised 2m ago
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-white">
                  Belt B Conveyor Lag (+45m)
                </h3>
                <p className="text-xs text-amber-200/70 mt-1 font-medium">
                  → Impacts Route R-042 & Route R-018
                </p>
                <p className="text-xs font-bold text-rose-400 mt-1">
                  38 high-risk shipments
                </p>
              </div>

              {/* Full-Width Primary Action Button */}
              <button
                type="button"
                onClick={handlePreAlertDrivers}
                disabled={isPreAlerting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFB500] hover:bg-[#F0AA00] text-[#170D0A] font-black text-xs md:text-sm transition cursor-pointer shadow-lg shadow-[#FFB500]/20 active:scale-95 disabled:opacity-50"
              >
                {isPreAlerting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Dispatched Alert...</span>
                  </>
                ) : (
                  <>
                    <span>Pre-Alert Drivers & Shift Windows</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Alert Card 2: Warning — Amber Border */}
            <div className="rounded-2xl border border-amber-600/60 bg-[#28150C] p-5 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-950 border border-amber-500 text-xs font-black text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Warning
                </span>
                <span className="text-[11px] font-mono text-amber-200/40">
                  Raised 48s ago
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-white">
                  Bay 11–14 Staging Bottleneck (+22m)
                </h3>
                <p className="text-xs text-amber-200/70 mt-1 font-medium">
                  → Impacts Route R-031
                </p>
                <p className="text-xs font-bold text-amber-400 mt-1">
                  19 shipments
                </p>
              </div>

              {/* Full-Width Secondary Action Button */}
              <button
                type="button"
                onClick={handleReassignBay}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#351C15] hover:bg-[#44231A] border border-[#4A281E] text-white font-bold text-xs transition cursor-pointer"
              >
                <span>Reassign Loading Bay</span>
                <ArrowRight className="w-4 h-4 text-[#FFB500]" />
              </button>
            </div>

          </div>

          {/* Card Footer */}
          <div className="pt-3 border-t border-[#4A281E]/40 flex items-center justify-between text-xs text-amber-200/60">
            <span>57 shipments prioritized across 3 routes</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]" />
              Live
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
