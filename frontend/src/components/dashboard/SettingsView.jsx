import React, { useState } from 'react';
import {
  Sliders,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Cloud,
  CheckCircle2,
  RotateCcw,
  Save,
  Server,
  Database,
  Archive,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

export default function SettingsView({ onTriggerToast }) {
  // Tabs
  const [activeTab, setActiveTab] = useState('Risk & Automation Rules');

  // Sliders State
  const [criticalThreshold, setCriticalThreshold] = useState(75);
  const [moderateThreshold, setModerateThreshold] = useState(40);
  const [minConfidence, setMinConfidence] = useState(88);

  // Financial Inputs State
  const [reattemptCost, setReattemptCost] = useState('14.50');
  const [driverHourlyRate, setDriverHourlyRate] = useState('28.00');
  const [lockerFee, setLockerFee] = useState('2.10');

  // Toggle Switches State
  const [autoSendSmartLink, setAutoSendSmartLink] = useState(true);
  const [autoSuggestLocker, setAutoSuggestLocker] = useState(true);
  const [requireDispatcherApproval, setRequireDispatcherApproval] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const handleResetDefaults = () => {
    setCriticalThreshold(75);
    setModerateThreshold(40);
    setMinConfidence(88);
    setReattemptCost('14.50');
    setDriverHourlyRate('28.00');
    setLockerFee('2.10');
    setAutoSendSmartLink(true);
    setAutoSuggestLocker(true);
    setRequireDispatcherApproval(true);

    if (onTriggerToast) {
      onTriggerToast('Settings reverted to enterprise defaults for Terminal 4.');
    }
  };

  const handleSaveConfiguration = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (onTriggerToast) {
        onTriggerToast('Platform & AI Engine Configuration successfully saved & applied to live pipeline.');
      }
    }, 800);
  };

  const tabs = [
    'Risk & Automation Rules',
    'ERP & Carrier Webhooks',
    'Cost & SLA Parameters',
    'Team Roles'
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          1. Page Header Row
         ───────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Platform & AI Engine Configuration
        </h1>
        <p className="text-sm text-amber-200/70 mt-1 font-medium">
          Configure risk prediction thresholds, automated customer interventions, and cloud integrations.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Tabs Toolbar Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-[#4A281E]/70 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs md:text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-[#FFB500] font-black'
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#FFB500] shadow-[0_0_8px_#FFB500]" />
              )}
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. 2x2 Grid of Configuration Cards
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ── CARD 1: ML Risk Scoring Thresholds ── */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="pb-3 border-b border-[#4A281E]/60">
              <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FFB500]" />
                <span>ML Risk Scoring Thresholds</span>
              </h2>
              <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
                Tune how the prediction engine classifies delivery risk.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              
              {/* Slider 1: Critical SLA Breach Threshold */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="font-semibold text-white">Critical SLA Breach Threshold</span>
                  <span className="font-mono font-bold text-rose-400 bg-rose-950/70 border border-rose-800/60 px-2 py-0.5 rounded">
                    {criticalThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={criticalThreshold}
                  onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-[#120907] rounded-lg appearance-none cursor-pointer accent-[#FFB500]"
                />
              </div>

              {/* Slider 2: Moderate Watchlist Threshold */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="font-semibold text-white">Moderate Watchlist Threshold</span>
                  <span className="font-mono font-bold text-[#FFB500] bg-[#351C15] border border-[#FFB500]/40 px-2 py-0.5 rounded">
                    {moderateThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={moderateThreshold}
                  onChange={(e) => setModerateThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-[#120907] rounded-lg appearance-none cursor-pointer accent-[#FFB500]"
                />
              </div>

              {/* Slider 3: Minimum Confidence Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="font-semibold text-white">Minimum Confidence Score for Auto-Action</span>
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded">
                    {minConfidence}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minConfidence}
                  onChange={(e) => setMinConfidence(Number(e.target.value))}
                  className="w-full h-2 bg-[#120907] rounded-lg appearance-none cursor-pointer accent-[#FFB500]"
                />
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-amber-200/40 pt-2 border-t border-[#4A281E]/40">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* ── CARD 2: Delivery Cost Intelligence Inputs ── */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl space-y-6">
          <div className="pb-3 border-b border-[#4A281E]/60">
            <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#FFB500]" />
              <span>Delivery Cost Intelligence Inputs</span>
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
              Baseline rates used by the cost & ROI engine.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Input 1 */}
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-semibold text-white">
                Avg Failed Delivery Re-attempt Cost
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-amber-200/50 font-mono text-sm">$</span>
                <input
                  type="text"
                  value={reattemptCost}
                  onChange={(e) => setReattemptCost(e.target.value)}
                  className="w-full bg-[#120907] border border-[#4A281E] rounded-xl pl-8 pr-14 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#FFB500] transition"
                />
                <span className="absolute right-3.5 text-xs font-mono text-amber-200/40">USD</span>
              </div>
            </div>

            {/* Input 2 */}
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-semibold text-white">
                Driver Hourly Rate
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-amber-200/50 font-mono text-sm">$</span>
                <input
                  type="text"
                  value={driverHourlyRate}
                  onChange={(e) => setDriverHourlyRate(e.target.value)}
                  className="w-full bg-[#120907] border border-[#4A281E] rounded-xl pl-8 pr-14 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#FFB500] transition"
                />
                <span className="absolute right-3.5 text-xs font-mono text-amber-200/40">USD</span>
              </div>
            </div>

            {/* Input 3 */}
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-semibold text-white">
                Smart Locker Drop Fee
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-amber-200/50 font-mono text-sm">$</span>
                <input
                  type="text"
                  value={lockerFee}
                  onChange={(e) => setLockerFee(e.target.value)}
                  className="w-full bg-[#120907] border border-[#4A281E] rounded-xl pl-8 pr-14 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#FFB500] transition"
                />
                <span className="absolute right-3.5 text-xs font-mono text-amber-200/40">USD</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── CARD 3: Automated Intervention Rules ── */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl space-y-6">
          <div className="pb-3 border-b border-[#4A281E]/60">
            <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFB500]" />
              <span>Automated Intervention Rules</span>
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
              Control when AI recommendations become customer actions.
            </p>
          </div>

          <div className="space-y-5">
            
            {/* Toggle 1 */}
            <div
              onClick={() => setAutoSendSmartLink(!autoSendSmartLink)}
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#1C0D0A] border border-[#4A281E] hover:border-[#FFB500]/40 transition cursor-pointer"
            >
              <span className="text-xs md:text-sm font-semibold text-white/90">
                Auto-send Customer Smart-Link when Customer Away probability &gt; 70%
              </span>
              <div className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${autoSendSmartLink ? 'bg-[#FFB500]' : 'bg-[#120907] border border-[#4A281E]'}`}>
                <div className={`w-5 h-5 rounded-full bg-[#170D0A] transition-transform ${autoSendSmartLink ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Toggle 2 */}
            <div
              onClick={() => setAutoSuggestLocker(!autoSuggestLocker)}
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#1C0D0A] border border-[#4A281E] hover:border-[#FFB500]/40 transition cursor-pointer"
            >
              <span className="text-xs md:text-sm font-semibold text-white/90">
                Auto-suggest Parcel Locker redirect for 2nd-attempt failed residential stops
              </span>
              <div className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${autoSuggestLocker ? 'bg-[#FFB500]' : 'bg-[#120907] border border-[#4A281E]'}`}>
                <div className={`w-5 h-5 rounded-full bg-[#170D0A] transition-transform ${autoSuggestLocker ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Toggle 3 */}
            <div
              onClick={() => setRequireDispatcherApproval(!requireDispatcherApproval)}
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#1C0D0A] border border-[#4A281E] hover:border-[#FFB500]/40 transition cursor-pointer"
            >
              <span className="text-xs md:text-sm font-semibold text-white/90">
                Require dispatcher approval before shifting commercial delivery windows
              </span>
              <div className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${requireDispatcherApproval ? 'bg-[#FFB500]' : 'bg-[#120907] border border-[#4A281E]'}`}>
                <div className={`w-5 h-5 rounded-full bg-[#170D0A] transition-transform ${requireDispatcherApproval ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

          </div>
        </div>

        {/* ── CARD 4: AWS & API Integration Status ── */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl space-y-6">
          <div className="pb-3 border-b border-[#4A281E]/60">
            <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#FFB500]" />
              <span>AWS & API Integration Status</span>
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
              Live connectivity across your cloud services.
            </p>
          </div>

          <div className="space-y-4 text-xs md:text-sm font-medium">
            
            {/* Status 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1C0D0A] border border-[#4A281E]">
              <div className="flex items-center gap-2.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse shrink-0" />
                <span>ASP.NET Core SignalR Hub</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Connected · 18ms
              </span>
            </div>

            {/* Status 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1C0D0A] border border-[#4A281E]">
              <div className="flex items-center gap-2.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] shrink-0" />
                <span>AWS RDS MySQL Primary</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Healthy
              </span>
            </div>

            {/* Status 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1C0D0A] border border-[#4A281E]">
              <div className="flex items-center gap-2.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] shrink-0" />
                <span>AWS S3 Telematics Archive</span>
              </div>
              <span className="text-xs font-mono text-amber-200/60">
                Synced 2m ago
              </span>
            </div>

            {/* Status 4 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1C0D0A] border border-[#4A281E]">
              <div className="flex items-center gap-2.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] shrink-0" />
                <span>SMS/WhatsApp Gateway</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Active
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. Bottom Action Footer Bar
         ───────────────────────────────────────────────────────────── */}
      <div className="p-5 rounded-2xl bg-[#1C0D0A] border border-[#4A281E] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-amber-200/50 font-medium">
          Changes apply to North Regional Hub - Terminal 4.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-5 py-2.5 rounded-xl border border-[#4A281E] bg-[#23120E] hover:bg-[#351C15] text-white font-bold text-xs md:text-sm transition cursor-pointer"
          >
            Reset to Defaults
          </button>

          <button
            type="button"
            onClick={handleSaveConfiguration}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#FFB500] hover:bg-[#F0AA00] text-[#170D0A] font-black text-xs md:text-sm transition cursor-pointer shadow-lg shadow-[#FFB500]/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
