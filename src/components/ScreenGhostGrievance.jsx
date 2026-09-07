import React, { useState, useEffect } from 'react';
import { GHOST_GRIEVANCE_DATA } from '../data/scenarios';
import { useLanguage } from '../context/LanguageContext';
import { playResolutionChime, playUiClick } from '../utils/audioEffects';
import { 
  Radio, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Zap, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  Smartphone, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight,
  Clock,
  Server,
  Globe
} from 'lucide-react';

export default function ScreenGhostGrievance({ onNavigate }) {
  const { currentLang, t, currentAudioSample, languages, setCurrentLang } = useLanguage();
  const [incidents, setIncidents] = useState(GHOST_GRIEVANCE_DATA.activeIncidents);
  const [preventedCounter, setPreventedCounter] = useState(1842);
  const [isSimulatingHeal, setIsSimulatingHeal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);

  // Subtle live increment of prevented grievances
  useEffect(() => {
    const timer = setInterval(() => {
      setPreventedCounter((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const triggerSelfHealingSimulation = () => {
    playUiClick();
    setIsSimulatingHeal(true);
    setTimeout(() => {
      playResolutionChime();
      setIncidents((prev) => 
        prev.map((inc) => 
          inc.id === 'INC-4103' 
            ? { ...inc, status: 'AUTONOMOUSLY HEALED', progress: 100, preventedCount: 89 }
            : inc
        )
      );
      setPreventedCounter((prev) => prev + 14);
      setIsSimulatingHeal(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-navy-950 via-void-900 to-navy-950 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300">
                {t.ghost.tag}
              </span>
              <span>• Proactive Telemetry & Self-Healing Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-3">
              <span>{t.ghost.title}</span>
              <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              {t.ghost.subtitle}
            </p>
          </div>

          {/* Big Live Counter Box */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/40 shadow-glow-emerald flex items-center gap-4 shrink-0">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">{t.ghost.counterLabel}</div>
              <div className="text-3xl font-black font-mono text-emerald-400 flex items-center gap-2">
                <span>{preventedCounter.toLocaleString()}</span>
                <span className="text-xs text-emerald-500 font-normal bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  +1 Live
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Zero Tickets Logged • ₹1.18 Cr Auto-Restored
              </div>
            </div>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-400 font-mono">Self-Healing Latency:</div>
            <div className="text-lg font-bold font-mono text-white">48 Seconds</div>
            <div className="text-[10px] text-emerald-400 font-mono">vs 7 Days standard</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Regulatory Penalty Avoidance:</div>
            <div className="text-lg font-bold font-mono text-emerald-400">₹34.2 Lakh</div>
            <div className="text-[10px] text-slate-400 font-mono">Under T+1 RBI Rule</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Mass Refund Success Rate:</div>
            <div className="text-lg font-bold font-mono text-cyan-400">99.8%</div>
            <div className="text-[10px] text-slate-400 font-mono">Via Newgen BPM API Hub</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Customer Anxiety Avoided:</div>
            <div className="text-lg font-bold font-mono text-purple-400">100% Proactive</div>
            <div className="text-[10px] text-slate-400 font-mono">Zero helpline calls</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Active Incident Monitor, Right WhatsApp CCM Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Incidents List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold font-heading text-white">
                Live Infrastructure Telemetry Stream
              </h3>
            </div>
            
            <button
              onClick={triggerSelfHealingSimulation}
              disabled={isSimulatingHeal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-glow-cyan transition-all disabled:opacity-50"
            >
              <Zap className={`w-3.5 h-3.5 ${isSimulatingHeal ? 'animate-spin' : ''}`} />
              <span>{isSimulatingHeal ? t.ghost.simulating : t.ghost.btnSimulate}</span>
            </button>
          </div>

          <div className="space-y-3">
            {incidents.map((inc) => {
              const isSelected = selectedIncident.id === inc.id;
              const isHealed = inc.status.includes('HEALED');

              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'glass-panel border-cyan-400 shadow-glow-cyan bg-slate-900/90'
                      : 'glass-card-interactive border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                        {inc.id}
                      </span>
                      <h4 className="font-bold text-sm text-white font-heading">{inc.title}</h4>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      isHealed
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                    }`}>
                      {inc.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-mono mb-3">
                    📍 {inc.location} • Detected {inc.timeDetected} • Total Locked: <strong className="text-white">{inc.totalAmountLocked}</strong>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Autonomous Restitution Progress:</span>
                      <span className="text-emerald-400 font-bold">{inc.preventedCount} / {inc.affectedCount} accounts healed</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          isHealed ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${inc.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed">
                    <span className="text-cyan-400 font-mono text-[11px] font-bold">Newgen BPM Action: </span>
                    {inc.actionTaken}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Omnichannel CCM WhatsApp Dispatch Mockup (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold font-heading text-white">
                Newgen CCM Notice (Customer Phone)
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
              <Globe className="w-3 h-3" />
              <span>{currentAudioSample.languageName.split(' ')[0]}</span>
            </div>
          </div>

          {/* Smartphone Frame */}
          <div className="relative mx-auto max-w-sm rounded-[32px] border-4 border-slate-700 bg-slate-950 p-4 shadow-2xl overflow-hidden">
            {/* Phone Notch */}
            <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3 flex items-center justify-center">
              <div className="w-10 h-1.5 bg-slate-700 rounded-full"></div>
            </div>

            {/* WhatsApp Header Mock */}
            <div className="bg-[#075E54] text-white p-3 rounded-t-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold font-heading">
                TB
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold leading-tight truncate">TrustBridge Bank Care</div>
                <div className="text-[10px] text-emerald-200">Verified Official Service Account</div>
              </div>
              <span className="text-[10px] text-emerald-200 font-mono">14:19 IST</span>
            </div>

            {/* WhatsApp Chat Body */}
            <div className="bg-[#0B141A] p-4 min-h-[340px] space-y-3 font-sans text-xs">
              
              <div className="text-center">
                <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-mono">
                  Today • Auto-Restitution Notice
                </span>
              </div>

              {/* Message Bubble localized dynamically */}
              <div className="bg-[#005C4B] text-slate-100 p-3.5 rounded-2xl rounded-tl-sm space-y-2 shadow-md">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Auto-Reversal Executed</span>
                </div>

                <p className="text-xs leading-relaxed text-slate-100">
                  {currentAudioSample.whatsappNotice}
                </p>

                <div className="bg-[#025142] p-2 rounded-lg border border-emerald-500/30 text-[11px] font-mono text-emerald-200">
                  ✔ 100% Restitution Processed<br />
                  ✔ Zero Forms or Branch Visit Required
                </div>
                
                <div className="text-right text-[10px] text-emerald-200 font-mono">
                  14:19 IST • Newgen CCM
                </div>
              </div>

              {/* Audio Note Attachment Simulation */}
              <div className="bg-[#005C4B] text-slate-100 p-2.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    ▶
                  </div>
                  <div className="flex-1">
                    <div className="h-1 bg-emerald-700 rounded-full w-full">
                      <div className="h-1 bg-emerald-300 rounded-full w-2/3"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-emerald-200 font-mono mt-1">
                      <span>Vernacular Audio Notice (CCM)</span>
                      <span>0:14</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Platform Badge */}
            <div className="p-2 text-center text-[10px] font-mono text-slate-400 border-t border-slate-800 bg-slate-950">
              Generated via <strong className="text-cyan-400">Newgen CCM Engine</strong>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
