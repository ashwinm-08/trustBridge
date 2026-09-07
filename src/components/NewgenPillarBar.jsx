import React, { useState } from 'react';
import { Cpu, FileText, GitMerge, MessageSquare, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NEWGEN_PILLARS = [
  {
    id: 'idp',
    name: 'Content Services & IDP',
    alias: 'The Senses',
    color: 'border-cyan-500 text-cyan-400 bg-cyan-950/40',
    glow: 'shadow-glow-cyan',
    icon: FileText,
    screens: ['intake', 'regulatory', 'architecture'],
    description: 'Multimodal document ingestion, OCR, vernacular speech-to-text, and regulatory circular PDF semantic parsing.',
    features: [
      'Hindi/Tamil Speech-to-Text with phonetics',
      'AIIMS Medical Bill & ATM slip OCR extraction',
      'Zero-Day RBI Master Direction PDF clause parsing'
    ]
  },
  {
    id: 'agent-studio',
    name: 'Agent Studio',
    alias: 'The Brain',
    color: 'border-purple-500 text-purple-400 bg-purple-950/40',
    glow: 'shadow-glow-purple',
    icon: Cpu,
    screens: ['hero', 'intake', 'lok-adalat', 'architecture'],
    description: 'Algorithmic Empathy Engine & Adversarial 3-Agent Virtual Lok Adalat arbitration swarm.',
    features: [
      'Real-time Algorithmic Empathy Scoring (0-100)',
      'Customer Advocate vs Bank Defender vs RBI Judge',
      'Explainability Ledger generation for RBI audit'
    ]
  },
  {
    id: 'bpm',
    name: 'Low-Code BPM',
    alias: 'The Nervous System',
    color: 'border-blue-500 text-blue-400 bg-blue-950/40',
    glow: '0 0 20px rgba(59, 130, 246, 0.25)',
    icon: GitMerge,
    screens: ['intake', 'ghost-grievance', 'regulatory', 'architecture'],
    description: 'Dynamic SLA clock bypass, Core Banking CBS API orchestration, batch mass reversals.',
    features: [
      'Code Red 2-hr dynamic SLA routing',
      'Autonomous telemetry-driven Ghost Grievance healing',
      'Zero-downtime workflow rule self-updating'
    ]
  },
  {
    id: 'ccm',
    name: 'CCM (Customer Comm.)',
    alias: 'The Voice',
    color: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
    glow: 'shadow-glow-emerald',
    icon: MessageSquare,
    screens: ['intake', 'lok-adalat', 'ghost-grievance', 'architecture'],
    description: 'Omnichannel empathetic communication: vernacular audio notes, WhatsApp decrees, bilingual award letters.',
    features: [
      'Vernacular WhatsApp voice note generation',
      'Instant SMS settlement confirmations',
      'Bilingual tamper-proof Award PDF generation'
    ]
  }
];

export default function NewgenPillarBar({ currentScreen = 'hero' }) {
  const { t } = useLanguage();
  const [selectedPillar, setSelectedPillar] = useState(null);

  return (
    <>
      {/* Persistent Bottom / Inset Ribbon */}
      <div className="bg-slate-900/95 border-t border-slate-800 backdrop-blur-md px-4 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Label */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white tracking-wide font-heading uppercase text-[11px] bg-newgen-dark/80 px-2 py-0.5 rounded border border-cyan-500/30">
              {t.pillars?.title || 'NewgenONE Platform Engine'}
            </span>
            <span className="text-slate-400 hidden lg:inline">| Active 4-Pillar Architecture</span>
          </div>

          {/* 4 Pillars Interactive Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
            {NEWGEN_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isActiveOnScreen = pillar.screens.includes(currentScreen);

              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-left text-xs transition-all ${
                    isActiveOnScreen
                      ? `${pillar.color} shadow-sm ring-1 ring-white/10 scale-[1.02]`
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 opacity-70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActiveOnScreen ? 'text-current animate-pulse' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <div className="font-medium truncate text-[11px] leading-tight flex items-center gap-1">
                      {pillar.name}
                      {isActiveOnScreen && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"></span>
                      )}
                    </div>
                    <div className="text-[9px] text-slate-400 truncate capitalize font-mono">
                      "{pillar.alias}"
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Helper hint */}
          <div className="hidden xl:flex items-center gap-1 text-[11px] text-cyan-400/80 font-mono">
            <Info className="w-3.5 h-3.5" />
            <span>Click any pillar to inspect NewgenONE specs</span>
          </div>
        </div>
      </div>

      {/* Pillar Detail Modal */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel max-w-lg w-full rounded-2xl border border-cyan-500/30 p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-mono"
            >
              ✕ ESC
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <selectedPillar.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  NewgenONE Pillar Spec
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-1">
                  {selectedPillar.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">Role: "{selectedPillar.alias}"</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-5 leading-relaxed">
              {selectedPillar.description}
            </p>

            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-slate-200 uppercase font-mono tracking-wider">
                How TrustBridge Implements this Pillar:
              </div>
              {selectedPillar.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono">
              <span>Active in: {selectedPillar.screens.join(', ')}</span>
              <button
                onClick={() => setSelectedPillar(null)}
                className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
