import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { LOK_ADALAT_DEBATE_STEPS, VERDICT_DATA } from '../data/scenarios';
import { useLanguage } from '../context/LanguageContext';
import { playGavelStrike, playUiClick } from '../utils/audioEffects';
import { 
  Cpu, 
  Scale, 
  ShieldCheck, 
  Play, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  FileCode, 
  ExternalLink, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Gavel, 
  ChevronRight,
  Send,
  Lock,
  Globe
} from 'lucide-react';

export default function ScreenLokAdalat({ activePersona, customVoiceCase, onNavigate }) {
  const { currentLang, t, languages } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('arena'); // 'arena' | 'ledger' | 'verdict'
  const [copiedHash, setCopiedHash] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);

  // Auto-play debate steps sequentially
  useEffect(() => {
    if (isPlaying) {
      if (currentStepIndex < LOK_ADALAT_DEBATE_STEPS.length) {
        setIsTyping(true);
        const typingTimeout = setTimeout(() => {
          setIsTyping(false);
          timerRef.current = setTimeout(() => {
            setCurrentStepIndex((prev) => prev + 1);
          }, 2400);
        }, 1100);

        return () => {
          clearTimeout(typingTimeout);
          clearTimeout(timerRef.current);
        };
      } else {
        setIsPlaying(false);
        setIsTyping(false);
        playGavelStrike();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    }
  }, [isPlaying, currentStepIndex]);

  const restartDebate = () => {
    playUiClick();
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const visibleSteps = LOK_ADALAT_DEBATE_STEPS.slice(0, currentStepIndex);
  const consensusProgress = Math.min(100, Math.round((currentStepIndex / LOK_ADALAT_DEBATE_STEPS.length) * 100));

  const copyLedgerHash = () => {
    navigator.clipboard.writeText(VERDICT_DATA.hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner: Arena Header & Dynamic Consensus Meter */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-navy-950 via-void-900 to-navy-950 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
                {t.lokAdalat.tag}
              </span>
              <span>• The Virtual Lok Adalat Arbitration Arena</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-3">
              <span>{t.lokAdalat.title}</span>
              <Gavel className="w-6 h-6 text-amber-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              {t.lokAdalat.subtitle}
            </p>
          </div>

          {/* Interactive Playback Controls */}
          <div className="flex items-center gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 self-start lg:self-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-glow-cyan"
            >
              <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlaying ? t.lokAdalat.btnDeliberating : currentStepIndex >= 4 ? t.lokAdalat.btnCompleted : t.lokAdalat.btnResume}</span>
            </button>
            <button
              onClick={restartDebate}
              title="Restart Debate from Beginning"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dynamic Consensus Progress Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3 text-xs font-mono text-slate-300">
            <div className="font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {t.lokAdalat.consensusLabel}
            </div>
            <div className="text-slate-400 text-[11px]">
              {consensusProgress < 40 && 'Phase 1: Opposing Claims Submitted'}
              {consensusProgress >= 40 && consensusProgress < 80 && 'Phase 2: Telemetry Evidence Cross-Examined'}
              {consensusProgress >= 80 && consensusProgress < 100 && 'Phase 3: Statutory Harmonization'}
              {consensusProgress === 100 && 'Phase 4: Unanimous Binding Decree'}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="w-full bg-slate-900 rounded-full h-3.5 p-0.5 border border-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-400 transition-all duration-700 shadow-glow-emerald"
                style={{ width: `${Math.max(10, consensusProgress)}%` }}
              />
            </div>
          </div>

          <div className="md:col-span-2 text-right">
            <span className="text-lg font-black font-mono text-emerald-400">
              {consensusProgress}%
            </span>
            <span className="text-xs text-slate-500 font-mono"> Alignment</span>
          </div>
        </div>
      </div>

      {/* 3 Holographic Agent Pods (Top Overview Arena) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Agent 1: Customer Advocate */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          currentStepIndex === 1 || currentStepIndex === 3
            ? 'glass-panel border-purple-500 shadow-glow-purple bg-purple-950/30 scale-[1.02]'
            : 'glass-card-interactive border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl">
              ⚖️
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
              Agent 1 • Advocate
            </span>
          </div>
          <h3 className="text-base font-bold text-white font-heading">Nyaya Mitra</h3>
          <p className="text-xs text-purple-300 font-mono mb-2">Consumer Protection & Empathy</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Prioritizes complainant duress, hospital emergency receipts, and RBI zero-liability clauses.
          </p>
          {(currentStepIndex === 1 || currentStepIndex === 3) && isTyping && (
            <div className="mt-3 text-[11px] font-mono text-purple-400 flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Presenting legal rebuttal...
            </div>
          )}
        </div>

        {/* Agent 2: Bank Defender */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          currentStepIndex === 2
            ? 'glass-panel border-blue-500 shadow-glow-cyan bg-blue-950/30 scale-[1.02]'
            : 'glass-card-interactive border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xl">
              🛡️
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
              Agent 2 • Defender
            </span>
          </div>
          <h3 className="text-base font-bold text-white font-heading">Kosh Pal</h3>
          <p className="text-xs text-blue-300 font-mono mb-2">Core Banking & Risk Engine</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Verifies Finacle/BaNCS CBS logs, ATM switch journals, 2FA credentials, and anti-fraud filters.
          </p>
          {currentStepIndex === 2 && isTyping && (
            <div className="mt-3 text-[11px] font-mono text-blue-400 flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Analyzing ATM journal switch...
            </div>
          )}
        </div>

        {/* Agent 3: RBI Judge */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          currentStepIndex >= 4
            ? 'glass-panel border-emerald-500 shadow-glow-emerald bg-emerald-950/30 scale-[1.02]'
            : 'glass-card-interactive border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl">
              🏛️
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Agent 3 • Ombudsman
            </span>
          </div>
          <h3 className="text-base font-bold text-white font-heading">Dharma Adhyaksha</h3>
          <p className="text-xs text-emerald-300 font-mono mb-2">Statutory RBI Arbitrator</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enforces RBI Integrated Ombudsman Scheme 2021, Master Directions, and issues binding awards.
          </p>
          {currentStepIndex === 4 && isTyping && (
            <div className="mt-3 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Issuing binding statutory award...
            </div>
          )}
        </div>

      </div>

      {/* Main Debate Flow & Explainability Ledger Section */}
      <div className="space-y-4">
        
        {/* Tab Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('arena')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === 'arena'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.lokAdalat.tabArena} ({visibleSteps.length}/4)
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === 'ledger'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-glow-purple'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.lokAdalat.tabLedger}
            </button>
            <button
              onClick={() => setActiveTab('verdict')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === 'verdict'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.lokAdalat.tabVerdict}
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400 hidden sm:flex items-center gap-2">
            {customVoiceCase?.customVoiceText && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Live User Voice Linked
              </span>
            )}
            <span>Case: <span className="text-white font-semibold">TB-2026-UP-8921</span></span>
          </div>
        </div>

        {/* TAB 1: ARENA (Sequential Animated Speech Bubbles) */}
        {activeTab === 'arena' && (
          <div className="space-y-4">
            <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-5 min-h-[380px]">
              
              {visibleSteps.map((step) => {
                const isAdvocate = step.speaker === 'advocate';
                const isDefender = step.speaker === 'defender';
                const isJudge = step.speaker === 'judge';

                return (
                  <div
                    key={step.step}
                    className={`flex gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      isAdvocate
                        ? 'bg-purple-950/20 border-purple-500/30'
                        : isDefender
                        ? 'bg-blue-950/20 border-blue-500/30'
                        : 'bg-emerald-950/30 border-emerald-500/40 shadow-glow-emerald'
                    }`}
                  >
                    <div className="text-2xl shrink-0 mt-1">{step.avatar}</div>

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white font-heading">
                            {step.speakerName}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            ({step.title})
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {step.timestamp}
                        </div>
                      </div>

                      {/* Render User Spoken Voice Deposition if present */}
                      {isAdvocate && step.step === 1 && customVoiceCase?.customVoiceText && (
                        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-200 shadow-glow-cyan">
                          <div className="font-bold text-cyan-400 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                            Live Citizen Voice Deposition Recorded:
                          </div>
                          <p className="italic text-slate-100 font-sans text-sm">
                            "{customVoiceCase.customVoiceText}"
                          </p>
                        </div>
                      )}

                      <p className="text-sm text-slate-200 leading-relaxed">
                        {step.message}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-[11px] font-mono">
                        <span className="text-cyan-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {step.evidence}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          isAdvocate ? 'bg-purple-950 text-purple-300 border border-purple-500/30' :
                          isDefender ? 'bg-blue-950 text-blue-300 border border-blue-500/30' :
                          'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {step.sentiment}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Live Typing Simulator */}
              {isTyping && currentStepIndex < LOK_ADALAT_DEBATE_STEPS.length && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-cyan-400 animate-pulse">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>
                    Agent Studio: {LOK_ADALAT_DEBATE_STEPS[currentStepIndex].speakerName} is evaluating legal precedents & generating argument...
                  </span>
                </div>
              )}

              {/* Completed Callout */}
              {currentStepIndex >= 4 && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-white">{t.lokAdalat.awardDecreed}</div>
                      <div className="text-xs text-slate-300">
                        All 3 agents have verified evidence. Restitution dispatches instantly via Newgen BPM.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('verdict')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold shadow-glow-emerald hover:bg-emerald-400"
                  >
                    {t.lokAdalat.btnViewAward}
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: EXPLAINABILITY LEDGER */}
        {activeTab === 'ledger' && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>CRYPTOGRAPHIC EXPLAINABILITY LEDGER</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-white">
                  Zero-Prep Regulatory Audit Trail (RBI Inspection Ready)
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Guarantees 100% algorithmic transparency under RBI Integrated Ombudsman Scheme 2021
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={copyLedgerHash}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHash ? 'Hash Copied' : 'Copy Hash'}</span>
                </button>
                <button
                  onClick={() => alert("Downloading RBI Compliance Certified Audit Dossier (TB-2026-UP-8921.pdf)...")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold shadow-glow-purple"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download RBI Dossier</span>
                </button>
              </div>
            </div>

            {/* Cryptographic Hash Banner */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-bold">LEDGER HASH:</span>
                <span className="text-slate-200">{VERDICT_DATA.hash}</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                SHA-256 Tamper Evident
              </span>
            </div>

            {/* Formatted Audit Trail Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 font-semibold">Timestamp</th>
                    <th className="pb-3 font-semibold">Agent Node</th>
                    <th className="pb-3 font-semibold">Mandate / Role</th>
                    <th className="pb-3 font-semibold">Statutory Reference Cited</th>
                    <th className="pb-3 font-semibold">Consensus Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {LOK_ADALAT_DEBATE_STEPS.map((step) => (
                    <tr key={step.step} className="hover:bg-slate-900/40">
                      <td className="py-3 text-slate-300">{step.timestamp}</td>
                      <td className="py-3 font-semibold text-white">{step.speakerName}</td>
                      <td className="py-3 text-purple-300">{step.title}</td>
                      <td className="py-3 text-cyan-400">{step.evidence}</td>
                      <td className="py-3 text-emerald-400">+{25 * step.step}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div className="text-slate-200 font-semibold">Ombudsman Compliance Certification:</div>
              <div>• Certified that no black-box generative hallucination occurred.</div>
              <div>• Every agent premise grounded in verifiable CBS logs and published RBI gazette directions.</div>
              <div>• Permanent audit record stored in Newgen Content Services with immutable retention lock.</div>
            </div>

          </div>
        )}

        {/* TAB 3: VERDICT & RESTITUTION */}
        {activeTab === 'verdict' && (
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-void-950 to-navy-950 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  {VERDICT_DATA.status}
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-1">
                  Tribunal Decree #{VERDICT_DATA.awardId}
                </h3>
                <div className="text-xs text-slate-400 font-mono">{VERDICT_DATA.timestamp}</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-mono">Total Restitution Awarded:</div>
                <div className="text-2xl font-black font-mono text-emerald-400">₹74,500.00</div>
              </div>
            </div>

            {/* 4 Executed Provisions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VERDICT_DATA.provisions.map((prov, i) => (
                <div key={i} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Provision #{i + 1}:</span>
                    <span className="text-emerald-400 font-bold">{prov.amount}</span>
                  </div>
                  <div className="font-bold text-sm text-white font-heading">{prov.title}</div>
                  <div className="text-xs text-slate-300 leading-relaxed font-sans">{prov.action}</div>
                </div>
              ))}
            </div>

            {/* NewgenONE Microservice Actions Triggered */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 font-mono uppercase">
                NewgenONE Orchestration Completed in 1.4 seconds:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>BPM: Core CBS NEFT Dispatched</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>CCM: Multilingual WhatsApp Audio Sent</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>IDP: RBI Compliance Dossier Archived</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => onNavigate('ghost-grievance')}
                className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300"
              >
                <span>Next: Inspect Pre-Emptive "Ghost Grievance" Ops</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('impact')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono shadow-glow-cyan"
              >
                View Quantified Business Impact →
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
