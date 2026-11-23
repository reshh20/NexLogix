import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  Send,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  MapPin,
  Truck,
  Sparkles,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const SAMPLE_EXCEPTIONS = [
  {
    id: '#NX-084291',
    tag: 'Hub Delay',
    tagType: 'delay',
    countdown: 'Breaches in 28m',
    isCritical: true,
    address: '1842 Oak Street · Portland, OR 97205',
    route: 'Terminal 4 · R-042  |  At hub · delayed',
    note: 'Hub congestion detected; delivery window at risk.',
    rootCauseTitle: 'Inbound Line-haul Unload Stoppage',
    rootCauseDetail: 'Inbound feeder truck arrived 45m behind schedule due to I-5 corridor delays. Package missed original sorting wave at Sortation Bay 7.',
    suggestedAction: 'Send automated Smart Link to recipient to offer a 1-hour evening window or direct locker reroute.',
    projectedSavings: '+$12.40',
    recipientName: 'Sarah Jenkins',
    recipientPhone: '+1 (503) 555-0142',
    previewMessage: 'NexLogix Update: Your shipment #NX-084291 is arriving slightly later than planned. Tap to adjust your preferred handoff window or select front-desk hold.'
  },
  {
    id: '#NX-084176',
    tag: 'Gate Lock',
    tagType: 'access',
    countdown: 'Breaches in 46m',
    isCritical: false,
    address: '620 NW Everett St · Portland, OR 97209',
    route: 'Terminal 4 · R-018  |  Out for delivery',
    note: 'Access code unavailable; driver unable to enter.',
    rootCauseTitle: 'Apartment Call-box PIN Missing',
    rootCauseDetail: 'Consignee profile lacks security gate keypad entry PIN. Driver made 1 contact attempt without response.',
    suggestedAction: 'Send instant SMS push requesting gate one-time access code or authorization for leasing office hold.',
    projectedSavings: '+$18.50',
    recipientName: 'David Chen',
    recipientPhone: '+1 (503) 555-0189',
    previewMessage: 'NexLogix Security: Your driver is near 620 NW Everett St. Tap here to provide gate access code or authorize secure drop.'
  },
  {
    id: '#NX-083958',
    tag: 'Customer Away',
    tagType: 'customer',
    countdown: 'Breaches in 1h 12m',
    isCritical: false,
    address: '915 SE Belmont St · Portland, OR 97214',
    route: 'Terminal 4 · R-031  |  Out for delivery',
    note: 'Recipient unavailable; safe handoff not confirmed.',
    rootCauseTitle: 'Signature Required Handoff Lock',
    rootCauseDetail: 'Direct signature required by shipper. Geo-telematics historical profile indicates recipient typically returns home after 17:30.',
    suggestedAction: 'Re-sequence route stop to end of shift or trigger e-signature waiver via secure SMS authorization.',
    projectedSavings: '+$14.20',
    recipientName: 'Elena Rostova',
    recipientPhone: '+1 (503) 555-0219',
    previewMessage: 'NexLogix Delivery: Signature required for package #NX-083958. Tap to e-sign waiver or authorize front-porch placement.'
  }
];

export default function ExceptionQueueView({ onTriggerToast }) {
  const [selectedFilter, setSelectedFilter] = useState('Unresolved (24)');
  const [selectedExceptionId, setSelectedExceptionId] = useState('#NX-084291');
  const [isSendingLink, setIsSendingLink] = useState(false);

  const selectedItem = SAMPLE_EXCEPTIONS.find(e => e.id === selectedExceptionId) || SAMPLE_EXCEPTIONS[0];

  const handleSendSmartLink = () => {
    setIsSendingLink(true);
    setTimeout(() => {
      setIsSendingLink(false);
      if (onTriggerToast) {
        onTriggerToast(`Smart Link dispatched to ${selectedItem.recipientName} (${selectedItem.recipientPhone}) for ${selectedItem.id}.`);
      }
    }, 800);
  };

  const handleReassign = () => {
    if (onTriggerToast) {
      onTriggerToast(`Reassignment request queued for ${selectedItem.id} to standby route R-099.`);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          1. Page Header Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Exception Queue
          </h1>
          <p className="text-sm text-amber-200/70 mt-1 font-medium">
            Active delivery anomalies requiring dispatcher intervention.
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
          2. Filter & Sort Toolbar Row
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-1">
        
        {/* Left Filter Pills */}
        <div className="inline-flex items-center gap-2">
          {['Unresolved (24)', 'Customer Link Sent (11)', 'Escalated (3)'].map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFB500] text-[#170D0A] shadow-md shadow-[#FFB500]/25'
                    : 'bg-[#23120E] border border-[#4A281E] text-amber-100/70 hover:text-white hover:border-[#FFB500]/40'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Right Sort Indicator */}
        <div className="text-xs md:text-sm text-amber-200/60 flex items-center gap-1.5 font-mono">
          <span>Sorted by SLA urgency</span>
          <span className="text-[#FFB500] font-bold text-sm">↓</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Main 2-Column Split Layout (~65% Left Master / ~35% Right Detail)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── Left Column: Flagged Shipments List (65% / 8 cols) ── */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl overflow-hidden flex flex-col justify-between">
          
          <div className="p-6">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#4A281E]/60">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-black text-white">
                  Flagged shipments
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#351C15] border border-rose-500/40 text-rose-300">
                  24 unresolved
                </span>
              </div>
              <span className="text-[11px] font-mono font-extrabold tracking-widest text-amber-200/50 uppercase">
                SLA PRIORITY
              </span>
            </div>

            {/* Subheader */}
            <p className="text-xs md:text-sm text-amber-200/60 mt-3 mb-5 font-medium">
              Review the most urgent exceptions first.
            </p>

            {/* Stacked Exception Item Cards */}
            <div className="space-y-4">
              {SAMPLE_EXCEPTIONS.map((item) => {
                const isSelected = selectedExceptionId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedExceptionId(item.id)}
                    className={`rounded-2xl border p-5 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2B1611] border-[#FFB500] shadow-lg shadow-[#FFB500]/10 ring-1 ring-[#FFB500]/50'
                        : 'bg-[#1C0D0A]/70 border-[#4A281E] hover:border-[#FFB500]/40 hover:bg-[#25130F]'
                    }`}
                  >
                    {/* Top Row: ID, Tag, Countdown, Review Button */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-black text-white tracking-wide font-mono">
                          {item.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#351C15] border border-[#4A281E] text-amber-200/90">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-xs font-black tabular-nums ${item.isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
                            {item.countdown}
                          </p>
                          <p className="text-[10px] uppercase font-mono tracking-wider text-amber-200/40">
                            SLA countdown
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedExceptionId(item.id);
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                            isSelected
                              ? 'bg-[#FFB500] text-[#170D0A] shadow-md shadow-[#FFB500]/20'
                              : 'border border-[#4A281E] bg-[#23120E] text-amber-200/80 hover:text-white hover:border-[#FFB500]/40'
                          }`}
                        >
                          Review
                        </button>
                      </div>
                    </div>

                    {/* Address & Route */}
                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-white/95 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#FFB500] shrink-0" />
                        <span>{item.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-amber-200/60 pl-5">
                        <Truck className="w-3.5 h-3.5 text-amber-200/40 shrink-0" />
                        <span>{item.route}</span>
                      </div>
                    </div>

                    {/* Bottom Note */}
                    <div className="mt-3.5 pt-3 border-t border-[#4A281E]/40 flex items-center gap-2 text-xs text-amber-200/70 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 text-[#FFB500] shrink-0" />
                      <span>{item.note}</span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Card Footer */}
          <div className="p-5 bg-[#160B08] border-t border-[#4A281E]/60 flex items-center justify-between text-xs text-amber-200/60">
            <span>Showing <strong className="text-white">3</strong> of <strong className="text-white">24</strong> unresolved exceptions</span>
            <button
              type="button"
              className="text-[#FFB500] hover:text-[#F0AA00] font-bold text-xs flex items-center gap-1 cursor-pointer transition"
            >
              <span>View all exceptions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ── Right Column: Quick-Action Resolution Panel (35% / 4-5 cols) ── */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-2xl border border-[#4A281E] bg-[#23120E] shadow-2xl p-6 space-y-5 sticky top-6">
          
          {/* Panel Header */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">
                Quick-action resolution
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                {selectedItem.projectedSavings} saved
              </span>
            </div>
            <p className="text-xs text-amber-200/50 mt-1 font-medium">
              Selected shipment: <span className="font-mono text-white font-bold">{selectedItem.id}</span>
            </p>
          </div>

          <div className="h-px bg-[#4A281E]/70" />

          {/* Shipment Summary Block */}
          <div className="p-4 rounded-xl bg-[#1C0D0A] border border-[#4A281E] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-black font-mono text-white">
                {selectedItem.id}
              </span>
              <span className={`text-xs font-black tabular-nums ${selectedItem.isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
                {selectedItem.countdown}
              </span>
            </div>
            <p className="text-xs text-amber-200/70 font-medium">
              {selectedItem.address}
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#351C15] border border-[#4A281E] text-amber-200">
                {selectedItem.tag}
              </span>
              <span className="text-[11px] text-amber-200/50">
                Consignee: <strong className="text-white">{selectedItem.recipientName}</strong>
              </span>
            </div>
          </div>

          {/* Root Cause Section */}
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider text-amber-200/50 font-mono">
              ROOT CAUSE ANALYSIS
            </p>
            <div className="p-3.5 rounded-xl bg-[#180A07] border border-[#4A281E]/80 space-y-1.5">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#FFB500] shrink-0" />
                <span>{selectedItem.rootCauseTitle}</span>
              </p>
              <p className="text-xs text-amber-200/70 leading-relaxed font-medium">
                {selectedItem.rootCauseDetail}
              </p>
            </div>
          </div>

          {/* Automated AI Recommendation & SMS Preview */}
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider text-[#FFB500] font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FFB500]" />
              RECOMMENDED INTERVENTION
            </p>
            <div className="p-3.5 rounded-xl bg-[#351C15]/40 border border-[#4A281E] text-xs text-amber-100/90 leading-relaxed">
              {selectedItem.suggestedAction}
            </div>

            {/* Smart Link SMS Live Preview */}
            <div className="p-3.5 rounded-xl bg-[#120907] border border-[#4A281E]/60 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-amber-200/40">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Smart Link SMS Preview
                </span>
                <span>{selectedItem.recipientPhone}</span>
              </div>
              <p className="text-[11px] text-amber-200/80 italic font-mono leading-relaxed bg-[#1F0E0A] p-2.5 rounded-lg border border-[#4A281E]/40">
                "{selectedItem.previewMessage}"
              </p>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={handleSendSmartLink}
              disabled={isSendingLink}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFB500] hover:bg-[#F0AA00] text-[#170D0A] font-black text-sm transition cursor-pointer shadow-lg shadow-[#FFB500]/20 active:scale-[0.99] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSendingLink ? 'Dispatching Link...' : 'Send Smart Link'}</span>
            </button>

            <button
              type="button"
              onClick={handleReassign}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#351C15] hover:bg-[#42231A] border border-[#4A281E] text-white font-bold text-xs transition cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#FFB500]" />
              <span>Reassign Route / Driver</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onTriggerToast) {
                  onTriggerToast(`Exception for ${selectedItem.id} marked as resolved.`);
                }
              }}
              className="w-full text-center py-1.5 text-xs text-amber-200/50 hover:text-white transition cursor-pointer"
            >
              Mark Exception Resolved
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
