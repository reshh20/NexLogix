import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  BookOpen,
  FileText,
  Keyboard,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  LifeBuoy,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Command,
  CornerDownLeft
} from 'lucide-react';

export default function HelpSupportView({ onTriggerToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Accordion state (Item 1 expanded by default)
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(0);

  // Support Form state
  const [issueCategory, setIssueCategory] = useState('Hub Telematics & Sensor Sync');
  const [issueDescription, setIssueDescription] = useState('');
  const [attachLogs, setAttachLogs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqItems = [
    {
      q: 'Why did SignalR disconnect from Terminal 4?',
      a: 'A network interruption, expired session, or hub restart can break the live connection. Check terminal connectivity and reconnect. If the issue persists, escalate with the CloudWatch ID.'
    },
    {
      q: 'How are failed delivery cost savings calculated?',
      a: 'Cost savings are calculated based on prevented 2nd and 3rd attempt driver fuel, re-dispatch labor hours ($28.00/hr baseline rate), and contractual SLA penalty avoidance measured against historical non-intervention delivery runs.'
    },
    {
      q: 'What happens when a customer ignores a Smart-Link?',
      a: 'If a Smart-Link expires without customer action within the 30-minute grace window, the prediction engine falls back to secondary playbook rules: automated parcel locker reroute or terminal staging hold.'
    },
    {
      q: 'How to override an automated route reassignment?',
      a: 'Dispatchers can manually lock any route manifest in the Route Simulator or Exception Queue by clicking "Manual Override" in the top action menu, which temporarily suspends autonomous AI re-sequencing for that route.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!issueDescription.trim()) {
      if (onTriggerToast) {
        onTriggerToast('Please describe the issue before submitting.');
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIssueDescription('');
      if (onTriggerToast) {
        onTriggerToast('Priority Ticket #TKT-49102 logged with Engineering Ops. CloudWatch logs attached.');
      }
    }, 900);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          1. Top Hero Search Banner Card
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-5">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB500]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            NexLogix Dispatcher Knowledge Base & Support
          </h1>
          <p className="text-xs md:text-sm text-amber-200/70 font-medium">
            Find the right playbook, troubleshoot live operations, or reach the team behind NexLogix.
          </p>
        </div>

        {/* Full-Width Large Search Bar */}
        <div className="relative z-10 max-w-3xl">
          <Search className="w-5 h-5 text-amber-200/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search error codes, SHAP risk factors, or intervention playbooks..."
            className="w-full bg-[#120907] border border-[#4A281E] hover:border-[#FFB500]/50 focus:border-[#FFB500] rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-amber-200/40 focus:outline-none focus:ring-1 focus:ring-[#FFB500]/50 transition shadow-inner"
          />
        </div>

        {/* Quick Help Links Row */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] font-mono font-bold tracking-widest text-amber-200/40 uppercase">
            QUICK HELP:
          </span>
          <button
            type="button"
            onClick={() => setExpandedFaqIndex(0)}
            className="text-[#FFB500] hover:text-[#F0AA00] font-semibold transition cursor-pointer"
          >
            SignalR connection
          </button>
          <span className="text-amber-200/30">/</span>
          <button
            type="button"
            onClick={() => {
              if (onTriggerToast) onTriggerToast('Navigating to Prediction Explainability guide...');
            }}
            className="text-[#FFB500] hover:text-[#F0AA00] font-semibold transition cursor-pointer"
          >
            Risk explanations
          </button>
          <span className="text-amber-200/30">/</span>
          <button
            type="button"
            onClick={() => {
              if (onTriggerToast) onTriggerToast('Navigating to Delivery Interventions Playbooks...');
            }}
            className="text-[#FFB500] hover:text-[#F0AA00] font-semibold transition cursor-pointer"
          >
            Delivery interventions
          </button>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Row 1 — 3-Column Feature Guide Cards (Equal width)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: PREDICTION EXPLAINABILITY */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl flex flex-col justify-between space-y-5 group hover:border-[#FFB500]/50 transition duration-200">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFB500] uppercase block">
              PREDICTION EXPLAINABILITY
            </span>

            <h2 className="text-lg font-black text-white leading-tight">
              Understanding AI Risk Tags
            </h2>

            {/* Tag Pills Row */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#351C15] border border-amber-600/40 text-amber-200">
                Hub Lag
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#351C15] border border-amber-600/40 text-amber-200">
                Customer Away
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#351C15] border border-rose-600/40 text-rose-300">
                Gate Lock
              </span>
            </div>

            <p className="text-xs text-amber-200/70 leading-relaxed font-medium pt-1">
              <strong>Hub Lag:</strong> dwell-time delay. <strong>Customer Away:</strong> availability history. <strong>Gate Lock:</strong> access failures. SHAP values quantify each factor’s contribution to overall failure risk.
            </p>
          </div>

          <div className="pt-4 border-t border-[#4A281E]/50">
            <button
              type="button"
              onClick={() => {
                if (onTriggerToast) onTriggerToast('Opening Risk Tag & SHAP Attribution Documentation...');
              }}
              className="text-xs font-bold text-[#FFB500] hover:text-[#F0AA00] flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Read the risk tag guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: DISPATCHER WORKFLOWS */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl flex flex-col justify-between space-y-5 group hover:border-[#FFB500]/50 transition duration-200">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFB500] uppercase block">
              DISPATCHER WORKFLOWS
            </span>

            <h2 className="text-lg font-black text-white leading-tight">
              Intervention Playbooks
            </h2>

            {/* 3 Bulleted Playbook Definitions */}
            <div className="space-y-2.5 pt-1 text-xs text-amber-200/80 leading-relaxed font-medium">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB500] mt-1.5 shrink-0" />
                <span><strong className="text-white">Smart Links</strong> — confirm customer availability in real-time.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB500] mt-1.5 shrink-0" />
                <span><strong className="text-white">Locker Redirects</strong> — offer contactless secure parcel pickup.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB500] mt-1.5 shrink-0" />
                <span><strong className="text-white">Window Shifts</strong> — agree on an evening delivery timeframe.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#4A281E]/50">
            <button
              type="button"
              onClick={() => {
                if (onTriggerToast) onTriggerToast('Opening Playbook Engine & SOP Library...');
              }}
              className="text-xs font-bold text-[#FFB500] hover:text-[#F0AA00] flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Explore intervention playbooks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: FASTER EXCEPTION TRIAGE */}
        <div className="rounded-2xl border border-[#4A281E] bg-[#23120E] p-6 shadow-2xl flex flex-col justify-between space-y-5 group hover:border-[#FFB500]/50 transition duration-200">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFB500] uppercase block">
              FASTER EXCEPTION TRIAGE
            </span>

            <h2 className="text-lg font-black text-white leading-tight">
              Keyboard Shortcuts & Live Alerts
            </h2>

            {/* 3 Keycap Shortcut Rows */}
            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#180A07] border border-[#4A281E]">
                <span className="text-amber-200/80">Search the exception queue</span>
                <kbd className="px-2 py-0.5 rounded bg-[#2D1610] border border-[#4A281E] font-mono text-[11px] font-bold text-[#FFB500] shadow-sm">
                  /
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#180A07] border border-[#4A281E]">
                <span className="text-amber-200/80">Move between flagged shipments</span>
                <kbd className="px-2 py-0.5 rounded bg-[#2D1610] border border-[#4A281E] font-mono text-[11px] font-bold text-[#FFB500] shadow-sm">
                  ↑ ↓
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#180A07] border border-[#4A281E]">
                <span className="text-amber-200/80">Open selected shipment</span>
                <kbd className="px-2 py-0.5 rounded bg-[#2D1610] border border-[#4A281E] font-mono text-[11px] font-bold text-[#FFB500] shadow-sm flex items-center gap-1">
                  <span>Enter</span>
                  <CornerDownLeft className="w-2.5 h-2.5" />
                </kbd>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#4A281E]/50">
            <p className="text-[11px] text-amber-200/50 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB500]" />
              Live alerts highlight newly flagged SLA risks.
            </p>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Row 2 — 2-Column Asymmetric Split (~65% FAQ / ~35% Escalation Form)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: FAQ & Troubleshooting Accordion (~65% / 7-8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl p-6 space-y-5">
          
          <div className="pb-4 border-b border-[#4A281E]/60">
            <h2 className="text-lg font-black text-white">
              FAQ & Troubleshooting
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
              Answers to common dispatcher questions. Select a question to expand.
            </p>
          </div>

          {/* 4-Item Interactive Accordion List */}
          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isExpanded = expandedFaqIndex === index;

              return (
                <div
                  key={item.q}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#2A1611] border-[#FFB500]/60 shadow-md shadow-[#FFB500]/5'
                      : 'bg-[#180A07] border-[#4A281E] hover:border-[#FFB500]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-bold text-white">
                      {item.q}
                    </span>
                    <span className="text-amber-200/50 shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#FFB500]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-amber-100/80 leading-relaxed font-medium border-t border-[#4A281E]/40 animate-in fade-in">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#4A281E]/40 flex items-center justify-between text-xs text-amber-200/50">
            <span>Still blocked? Include diagnostic logs when you escalate to support.</span>
            <span className="font-mono text-[11px] text-[#FFB500]">KB v2.4</span>
          </div>

        </div>

        {/* Right Column: Escalate to Engineering / Ops Support (~35% / 4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl p-6 space-y-5">
          
          <div className="pb-4 border-b border-[#4A281E]/60">
            <h2 className="text-lg font-black text-white">
              Escalate to Engineering / Ops Support
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5 font-medium">
              Share the context your support team needs to investigate.
            </p>
          </div>

          <form onSubmit={handleTicketSubmit} className="space-y-4">
            
            {/* Field 1: Issue Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white">
                Issue Category
              </label>
              <div className="relative">
                <select
                  value={issueCategory}
                  onChange={(e) => setIssueCategory(e.target.value)}
                  className="w-full bg-[#120907] border border-[#4A281E] rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-[#FFB500] transition appearance-none cursor-pointer"
                >
                  <option value="Hub Telematics & Sensor Sync">Hub Telematics & Sensor Sync</option>
                  <option value="SignalR Real-Time WebSocket Drop">SignalR Real-Time WebSocket Drop</option>
                  <option value="ML Risk Model Anomaly (v3.8)">ML Risk Model Anomaly (v3.8)</option>
                  <option value="Driver App Manifest Push Failure">Driver App Manifest Push Failure</option>
                  <option value="Customer Smart-Link Delivery Error">Customer Smart-Link Delivery Error</option>
                </select>
                <ChevronDown className="w-4 h-4 text-amber-200/40 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Issue Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white">
                Issue Description
              </label>
              <textarea
                rows={4}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Describe the issue, affected shipment IDs, and any steps already taken..."
                className="w-full bg-[#120907] border border-[#4A281E] rounded-xl p-3 text-xs md:text-sm text-white placeholder-amber-200/30 focus:outline-none focus:border-[#FFB500] transition"
              />
            </div>

            {/* Diagnostic Checkbox Row */}
            <div
              onClick={() => setAttachLogs(!attachLogs)}
              className="p-3 rounded-xl bg-[#180A07] border border-[#4A281E] flex items-center gap-3 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={attachLogs}
                onChange={(e) => setAttachLogs(e.target.checked)}
                className="w-4 h-4 rounded border-[#4A281E] bg-[#120907] accent-[#FFB500] cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-bold text-white">Attach Current Diagnostic Logs</span>
                <span className="font-mono text-[11px] text-amber-200/50 block">CloudWatch ID: cw-us-west-2-48912</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#FFB500] hover:bg-[#F0AA00] text-[#170D0A] font-black text-xs md:text-sm transition cursor-pointer shadow-lg shadow-[#FFB500]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Logging Ticket...' : 'Submit Priority Ticket'}</span>
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
