import React, { useState } from 'react';
import { REGULATORY_DIFF_DATA } from '../data/scenarios';
import { 
  FileCheck, 
  FileText, 
  GitCompare, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldAlert, 
  Lock, 
  Upload, 
  RotateCw,
  Zap,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ScreenRegulatory({ onNavigate }) {
  const { t } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('deployed'); // 'idle' | 'updating' | 'deployed'
  const [activeDiffIndex, setActiveDiffIndex] = useState(0);

  const simulateLiveRegulatoryIngest = () => {
    setIsUpdating(true);
    setUpdateStatus('updating');

    setTimeout(() => {
      setIsUpdating(false);
      setUpdateStatus('deployed');
    }, 1800);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-navy-950 via-void-900 to-navy-950 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                {t.regulatory?.tag || 'Newgen IDP & Low-Code BPM'}
              </span>
              <span>• {t.regulatory?.zeroDay || 'Zero-Day Regulatory Adaptability'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-3">
              <span>{t.regulatory?.title || 'Autonomous Regulatory Self-Updating'}</span>
              <FileCheck className="w-6 h-6 text-cyan-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              {t.regulatory?.subtitle || 'When RBI, IRDAI, or MoF issues a new circular, traditional banks take 4-8 weeks of IT recoding. Newgen IDP parses the regulatory PDF and autonomously reconfigures BPM workflow rules in zero-downtime seconds.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={simulateLiveRegulatoryIngest}
              disabled={isUpdating}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>{isUpdating ? (t.regulatory?.btnIngesting || 'Ingesting & Synthesizing Rules...') : (t.regulatory?.btnIngest || 'Ingest Live RBI Circular PDF')}</span>
            </button>
          </div>
        </div>

        {/* Process Flow Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">STEP 1: INGESTION</div>
            <div className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gazette PDF Semantic Parse</span>
            </div>
            <div className="text-slate-400 text-[10px] mt-1">Via Newgen Content Services</div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">STEP 2: CLAUSE EXTRACTION</div>
            <div className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>IDP Entity & TAT Delta</span>
            </div>
            <div className="text-slate-400 text-[10px] mt-1">99.8% Legal Clause Precision</div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">STEP 3: WORKFLOW DIFF</div>
            <div className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
              <GitCompare className="w-3.5 h-3.5 text-amber-400" />
              <span>Rule Tree Reconfiguration</span>
            </div>
            <div className="text-slate-400 text-[10px] mt-1">Zero-Downtime BPM Hot Patch</div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">STEP 4: ZERO PENALTY</div>
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Compliance Active</span>
            </div>
            <div className="text-slate-400 text-[10px] mt-1">Audit Ledger Cryptographically Locked</div>
          </div>
        </div>
      </div>

      {/* Main Diff Engine & Circular Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: PDF Circular Ingestion Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold font-heading text-white uppercase tracking-wider">
                  Ingested Regulatory Instrument
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Verified Authentic
              </span>
            </div>

            {/* Ingested Circular Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white font-heading">
                {REGULATORY_DIFF_DATA.circularNumber}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {REGULATORY_DIFF_DATA.issuingAuthority}
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                "{REGULATORY_DIFF_DATA.title}"
              </p>
              
              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Ingested: {REGULATORY_DIFF_DATA.ingestedTimestamp}</span>
                <span className="text-cyan-400">PDF OCR: 100%</span>
              </div>
            </div>

            {/* Extracted Changes Selector */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider">
                Extracted Clause Mandates (3 Changes Detected):
              </div>

              {REGULATORY_DIFF_DATA.changes.map((change, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDiffIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    activeDiffIndex === idx
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-glow-cyan text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono flex items-center justify-between">
                    <span>{change.field}</span>
                    <span className="text-[10px] text-emerald-400 font-normal">Active</span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-1">
                    {change.impact}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 text-[11px] font-mono text-slate-400 flex items-center gap-2 border border-slate-800">
              <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">Audit Sig: {REGULATORY_DIFF_DATA.auditSignature}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual "Before Rule vs After Rule" Diff (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-slate-400">Selected Workflow Rule:</div>
                <h3 className="text-lg font-bold font-heading text-white">
                  {REGULATORY_DIFF_DATA.changes[activeDiffIndex].field}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40">
                {REGULATORY_DIFF_DATA.changes[activeDiffIndex].status}
              </span>
            </div>

            {/* Before vs After Split Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* BEFORE RULE (Legacy BPM) */}
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    {t.regulatory?.beforeTitle || 'BEFORE (Legacy Rule)'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Deprecated</span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-rose-500/20 text-xs font-mono text-rose-200/90 leading-relaxed min-h-[90px]">
                  {REGULATORY_DIFF_DATA.changes[activeDiffIndex].before}
                </div>

                <div className="space-y-1 text-[11px] font-mono text-slate-400">
                  <div className="text-rose-400/80">Disadvantages:</div>
                  <div>• 7-day customer distress</div>
                  <div>• Heavy operations call center costs</div>
                  <div>• Regulatory non-compliance exposure</div>
                </div>
              </div>

              {/* AFTER RULE (TrustBridge Autonomous BPM) */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3 shadow-glow-emerald">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    {t.regulatory?.afterTitle || 'AFTER (TrustBridge Self-Healed)'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                    Active Live
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-200 leading-relaxed min-h-[90px]">
                  {REGULATORY_DIFF_DATA.changes[activeDiffIndex].after}
                </div>

                <div className="space-y-1 text-[11px] font-mono text-slate-400">
                  <div className="text-emerald-400">Systemic Benefits:</div>
                  <div>• 96% reduction in dispute turnaround</div>
                  <div>• Zero human intervention required</div>
                  <div>• 100% adherence to RBI Gazette mandate</div>
                </div>
              </div>

            </div>

            {/* Impact callout */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 flex items-start gap-3">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-white font-heading">
                  Platform Impact Analysis:
                </div>
                <div className="text-xs text-slate-300 font-sans leading-relaxed">
                  {REGULATORY_DIFF_DATA.changes[activeDiffIndex].impact}. Compiled and verified across all live branch branches in 1.2 seconds without requiring server reboot.
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-mono text-slate-400">
                Audit Record Logged to Newgen Content Services
              </span>
              <button
                onClick={() => onNavigate('architecture')}
                className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>{t.regulatory?.flowLink || 'View Interactive Architecture Flow'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
