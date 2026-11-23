import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Calendar,
  ChevronDown,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Fuel,
  Leaf,
  BarChart2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function AnalyticsROIView({ onTriggerToast }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days · Oct 13 – Nov 12, 2026');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const periods = [
    'Last 30 Days · Oct 13 – Nov 12, 2026',
    'Previous Quarter · Q3 2026',
    'Year to Date · 2026',
    'Custom Range...'
  ];

  const handleExport = () => {
    if (onTriggerToast) {
      onTriggerToast('Generating Executive ROI & Cost Intelligence Report (PDF/CSV)... Download started.');
    }
  };

  // Combo chart dataset (4 weekly periods)
  const chartData = [
    { week: 'Oct 13–19', preventedCost: 11000, label: '$11.0k', spend: 1200, spendLabel: '$1.2k' },
    { week: 'Oct 20–26', preventedCost: 12500, label: '$12.5k', spend: 1250, spendLabel: '$1.25k' },
    { week: 'Oct 27–Nov 2', preventedCost: 14200, label: '$14.2k', spend: 1300, spendLabel: '$1.3k' },
    { week: 'Nov 3–12', preventedCost: 16220, label: '$16.22k', spend: 1250, spendLabel: '$1.25k' },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          1. Page Header Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Delivery Cost Intelligence & ROI
          </h1>
          <p className="text-sm text-amber-200/70 mt-1 font-medium">
            Measure financial savings, intervention effectiveness, and ML prediction accuracy over time.
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
          2. Reporting Period & Export Toolbar Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#23120E] border border-[#4A281E] shadow-xl">
        
        {/* Left Reporting Period Selector */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-amber-200/50 uppercase">
            REPORTING PERIOD:
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#170D0A] border border-[#4A281E] hover:border-[#FFB500]/50 text-xs md:text-sm font-bold text-white transition cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#FFB500]" />
              <span>{selectedPeriod}</span>
              <ChevronDown className="w-4 h-4 text-amber-200/50" />
            </button>

            {isPeriodDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#23120E] border border-[#4A281E] shadow-2xl py-1.5 z-40 animate-in fade-in zoom-in-95">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPeriod(p);
                      setIsPeriodDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs md:text-sm transition hover:bg-[#351C15] ${
                      selectedPeriod === p ? 'text-[#FFB500] font-bold bg-[#351C15]/60' : 'text-white/80'
                    }`}
                  >
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Export Button */}
        <div>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#4A281E] bg-[#170D0A] hover:bg-[#351C15] hover:border-[#FFB500]/50 text-white font-bold text-xs md:text-sm transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#FFB500]" />
            <span>Export Executive Report (CSV/PDF)</span>
            <span className="text-amber-200/50">↓</span>
          </button>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Row 1 — 4-Column Executive KPI Summary Cards (Equal width)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Net Operational Savings */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-[#FFB500]/50 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">
              Net Operational Savings
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-xs font-bold text-emerald-300">
              <TrendingUp className="w-3.5 h-3.5" />
              +18.4% vs last month
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#FFB500] tabular-nums tracking-tight">
              $48,920
            </span>
          </div>
          <p className="text-xs text-amber-200/50 mt-4 font-medium">
            After automated intervention tooling costs
          </p>
        </div>

        {/* Card 2: First-Time Delivery Success Rate */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">
              First-Time Delivery Success Rate
            </span>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">
              96.4%
            </span>
            <span className="text-xs font-bold text-emerald-400">
              ↑ 7.3 percentage points
            </span>
          </div>
          <p className="text-xs text-amber-200/50 mt-4 font-medium">
            From 89.1% baseline
          </p>
        </div>

        {/* Card 3: Prevented Failed Attempts */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-[#FFB500]/50 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">
              Prevented Failed Attempts
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">
              1,842
            </span>
          </div>
          <p className="text-xs text-amber-200/50 mt-4 font-medium">
            Shipments saved from re-dispatch
          </p>
        </div>

        {/* Card 4: Carbon & Fuel Reduction */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">
              Carbon & Fuel Reduction
            </span>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">
              3,120 <span className="text-xl font-bold text-amber-200/60">kg CO₂</span>
            </span>
          </div>
          <p className="text-xs text-emerald-300 mt-4 font-semibold flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5" />
            1,180 L fuel saved <span className="text-amber-200/40 font-normal font-sans">· Avoided through fewer repeat trips</span>
          </p>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. Row 2 — 2-Column Asymmetric Data Visualization Row (~62% / ~38%)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Cost of Inaction vs. Realized Savings (~62% / 7-8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Header & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#4A281E]/60">
              <div>
                <h2 className="text-lg font-black text-white">
                  Cost of Inaction vs. Realized Savings
                </h2>
                <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
                  <span className="text-[#FFB500] font-bold">$53,920</span> prevented re-delivery costs &nbsp;/&nbsp; <span className="text-emerald-400 font-bold">$5,000</span> intervention spend
                </p>
              </div>

              {/* Legend & Currency */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#FFB500]" />
                  <span className="text-amber-100/80">Prevented re-delivery costs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-1 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-300">Automated intervention expenses</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#170D0A] border border-[#4A281E] text-[10px] font-mono text-amber-200/60">
                  USD
                </span>
              </div>
            </div>

            {/* Stylized Combo Bar & Line Chart Canvas */}
            <div className="mt-6 relative h-64 w-full">
              
              {/* Horizontal Gridlines & Y-Axis */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-mono text-amber-200/30">
                <div className="flex items-center justify-between border-b border-[#4A281E]/40 pb-1">
                  <span>$20k</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#4A281E]/30 pb-1">
                  <span>$15k</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#4A281E]/30 pb-1">
                  <span>$10k</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#4A281E]/30 pb-1">
                  <span>$5k</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#4A281E]/60 pb-1">
                  <span>$0</span>
                </div>
              </div>

              {/* 4 Weekly Bars Canvas */}
              <div className="absolute inset-0 pl-10 pr-4 pt-6 pb-6 flex items-end justify-around gap-6 z-10">
                {chartData.map((d, idx) => {
                  const maxVal = 20000;
                  const barHeightPct = (d.preventedCost / maxVal) * 100;
                  const isHovered = hoveredBarIndex === idx;

                  return (
                    <div
                      key={d.week}
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                    >
                      {/* Floating Data Label */}
                      <span className="text-xs font-mono font-bold text-[#FFB500] mb-2 transition-transform group-hover:-translate-y-1">
                        {d.label}
                      </span>

                      {/* Bar Graphic with NexLogix Gold Gradient */}
                      <div className="w-full max-w-[64px] rounded-t-xl bg-[#351C15] border border-[#FFB500]/40 overflow-hidden relative group-hover:border-[#FFB500] transition duration-200" style={{ height: `${barHeightPct}%` }}>
                        <div className="w-full h-full bg-gradient-to-t from-[#FFB500]/60 via-[#FFB500]/80 to-[#FFB500] shadow-[0_0_15px_rgba(255,181,0,0.2)]" />
                      </div>

                      {/* X-Axis Week Label */}
                      <span className="mt-3 text-xs font-mono text-amber-200/60 font-semibold">
                        {d.week}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* SVG Overlaid Emerald Green Line Plot (Intervention Spend ~$1.2k) */}
              <div className="absolute inset-0 pl-10 pr-4 pt-6 pb-6 pointer-events-none z-20">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180" preserveAspectRatio="none">
                  {/* Emerald line path along ~$1.2k–$1.3k (Y=165) */}
                  <path
                    d="M 50 162 L 150 160 L 250 157 L 350 160"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    className="drop-shadow-[0_0_6px_#10B981]"
                  />
                  {/* Data Marker Dots */}
                  <circle cx="50" cy="162" r="5" fill="#10B981" stroke="#170D0A" strokeWidth="2" />
                  <circle cx="150" cy="160" r="5" fill="#10B981" stroke="#170D0A" strokeWidth="2" />
                  <circle cx="250" cy="157" r="5" fill="#10B981" stroke="#170D0A" strokeWidth="2" />
                  <circle cx="350" cy="160" r="5" fill="#10B981" stroke="#170D0A" strokeWidth="2" />
                </svg>
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-[#4A281E]/40 text-xs text-amber-200/50 flex items-center justify-between">
            <span>Statistical confidence: <strong>99.4%</strong> across 1,842 resolved exceptions</span>
            <span className="font-mono text-[11px] text-[#FFB500]">Net ROI: 978.4%</span>
          </div>
        </div>

        {/* Right Card: Intervention Effectiveness Breakdown (~38% / 4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            {/* Header & Subtitle */}
            <div className="pb-4 border-b border-[#4A281E]/60">
              <h2 className="text-lg font-black text-white">
                Intervention Effectiveness Breakdown
              </h2>
              <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
                Ranked by realized savings · success rate by action
              </p>
            </div>

            {/* 3 Ranked Horizontal Progress Bar Items */}
            <div className="mt-5 space-y-5">
              
              {/* Item 1: Smart Locker Redirect */}
              <div className="p-4 rounded-xl bg-[#1C0D0A] border border-[#4A281E] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    1. Smart Locker Redirect
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#FFB500] font-mono block">
                      $19.4k saved
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">
                      94% success
                    </span>
                  </div>
                </div>

                {/* Full-width rounded track filled 94% */}
                <div className="w-full h-2.5 rounded-full bg-[#120907] border border-[#4A281E]/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFB500] to-amber-300 shadow-[0_0_8px_rgba(255,181,0,0.4)]"
                    style={{ width: '94%' }}
                  />
                </div>
              </div>

              {/* Item 2: Customer Self-Service Link */}
              <div className="p-4 rounded-xl bg-[#1C0D0A] border border-[#4A281E] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    2. Customer Self-Service Link
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#FFB500] font-mono block">
                      $16.8k saved
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">
                      88% success
                    </span>
                  </div>
                </div>

                {/* Full-width rounded track filled 88% */}
                <div className="w-full h-2.5 rounded-full bg-[#120907] border border-[#4A281E]/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFB500] to-amber-300 shadow-[0_0_8px_rgba(255,181,0,0.4)]"
                    style={{ width: '88%' }}
                  />
                </div>
              </div>

              {/* Item 3: Dynamic Time-Window Shift */}
              <div className="p-4 rounded-xl bg-[#1C0D0A] border border-[#4A281E] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    3. Dynamic Time-Window Shift
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#FFB500] font-mono block">
                      $12.7k saved
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">
                      82% success
                    </span>
                  </div>
                </div>

                {/* Full-width rounded track filled 82% */}
                <div className="w-full h-2.5 rounded-full bg-[#120907] border border-[#4A281E]/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFB500] to-amber-300 shadow-[0_0_8px_rgba(255,181,0,0.4)]"
                    style={{ width: '82%' }}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#351C15]/50 border border-[#4A281E] flex items-center justify-between text-xs text-amber-200/80">
            <span>Automated Fix Adoption</span>
            <span className="font-bold text-[#FFB500]">91.2% dispatched autonomously</span>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. Row 3 — Full-Width Bottom Table Card ("ML Model Feedback")
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl overflow-hidden">
        
        {/* Card Header */}
        <div className="p-6 border-b border-[#4A281E]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-white">
              ML Model Feedback & Root Cause Attribution
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
              Evaluated on closed-loop feedback loops across 64 depot routes.
            </p>
          </div>

          <span className="font-mono text-xs text-amber-200/50">
            Model v3.8 / Closed-loop intervention outcomes
          </span>
        </div>

        {/* Clean 3-Column Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#4A281E]/70 text-xs uppercase tracking-wider font-extrabold text-amber-200/60 bg-[#160B08]">
                <th className="py-4 px-6">Top predicted failure cause</th>
                <th className="py-4 px-6">Prediction Accuracy %</th>
                <th className="py-4 px-6 text-right">Avg Cost Saved per Intervention</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#4A281E]/40 text-sm">
              <tr className="hover:bg-[#2C1712]/70 transition-colors">
                <td className="py-4 px-6 font-semibold text-white flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFB500]" />
                  <span>Customer Away History</span>
                </td>
                <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                  93.2%
                </td>
                <td className="py-4 px-6 text-right font-mono font-black text-[#FFB500]">
                  $14.20
                </td>
              </tr>

              <tr className="hover:bg-[#2C1712]/70 transition-colors">
                <td className="py-4 px-6 font-semibold text-white flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFB500]" />
                  <span>Hub Sort Delay</span>
                </td>
                <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                  95.8%
                </td>
                <td className="py-4 px-6 text-right font-mono font-black text-[#FFB500]">
                  $18.50
                </td>
              </tr>

              <tr className="hover:bg-[#2C1712]/70 transition-colors">
                <td className="py-4 px-6 font-semibold text-white flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFB500]" />
                  <span>Gated Access Lock</span>
                </td>
                <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                  91.0%
                </td>
                <td className="py-4 px-6 text-right font-mono font-black text-[#FFB500]">
                  $11.80
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
