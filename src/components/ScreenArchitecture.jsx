import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  ArrowDown, 
  Cpu, 
  FileText, 
  GitMerge, 
  MessageSquare, 
  Radio, 
  ShieldAlert, 
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ARCHITECTURE_NODES = [
  {
    id: 1,
    title: 'Channel Ingestion Layer',
    subtitle: 'Dual Reactive & Proactive Event Stream',
    pillar: 'Input Gateway',
    color: 'border-slate-700 bg-slate-900/80',
    glow: 'shadow-slate-800/50',
    icon: Radio,
    reactive: 'WhatsApp Voice Note (Hindi/Tamil), AIIMS Medical PDF, Web Portal',
    proactive: 'ATM Shutter Jam Telemetry, UPI Switch Timeout Buffer (Kafka stream)',
    protocols: 'WebSocket, Webhook, Kafka Topic: telemetry.events.v1',
    description: 'Ingests both citizen grievances (unstructured vernacular voice/text) and real-time core banking telemetry stream.'
  },
  {
    id: 2,
    title: 'Newgen IDP & Content Services',
    subtitle: 'Multimodal Parsing & Speech Intelligence',
    pillar: 'Content Services & IDP ("The Senses")',
    color: 'border-cyan-500/50 bg-cyan-950/20',
    glow: 'shadow-glow-cyan',
    icon: FileText,
    reactive: 'Whisper-Vernacular Speech-to-Text, OCR Medical Slip Entity Extraction',
    proactive: 'Gazette Regulatory PDF Semantic Clause Extractor (Zero-Day Ingest)',
    protocols: 'REST, gRPC, ISO 20022 Document Standard',
    description: 'Converts unstructured audio, images, and regulatory circulars into machine-actionable semantic tokens.'
  },
  {
    id: 3,
    title: 'Agent Studio: Algorithmic Empathy Engine',
    subtitle: 'Distress Scoring & Dynamic SLA Bypass',
    pillar: 'Agent Studio ("The Brain")',
    color: 'border-rose-500/50 bg-rose-950/20',
    glow: 'shadow-glow-rose',
    icon: ShieldAlert,
    reactive: 'Empathy Score (0-100) -> If >85: Triggers Code Red 2-Hour SLA Bypass',
    proactive: 'Systemic Vulnerability Matrix (prioritizes pensioners & rural accounts)',
    protocols: 'TensorFlow/PyTorch Inference microservice, JSON Payload',
    description: 'Prevents the "Empathy Gap" by analyzing life-critical duress and shattering static 7-day queue bottlenecks.'
  },
  {
    id: 4,
    title: 'Agent Studio: The "Virtual Lok Adalat" Swarm',
    subtitle: 'Adversarial 3-Agent Arbitration Arena',
    pillar: 'Agent Studio ("The Brain")',
    color: 'border-purple-500/50 bg-purple-950/20',
    glow: 'shadow-glow-purple',
    icon: Cpu,
    reactive: 'Customer Advocate vs Bank Defender vs RBI Judge -> Consensus Award',
    proactive: 'Explainability Ledger auto-generated with SHA-256 cryptographic audit lock',
    protocols: 'Multi-Agent State Graph, Consensus Convergence Protocol',
    description: 'Adjudicates disputed transactions with verified CBS logs, evidence cross-examination, and statutory statutory directions.'
  },
  {
    id: 5,
    title: 'Newgen Low-Code BPM',
    subtitle: 'Orchestration, Core Banking Execution & Self-Healing',
    pillar: 'Low-Code BPM ("The Nervous System")',
    color: 'border-blue-500/50 bg-blue-950/20',
    glow: '0 0 25px rgba(59, 130, 246, 0.25)',
    icon: GitMerge,
    reactive: 'Dispatches Finacle/BaNCS CBS IMPS Restitution API calls (< 1.4s)',
    proactive: 'Executes mass 142-account auto-reversal batch for Ghost Grievances',
    protocols: 'Finacle API Connect, ISO 8583 switch, OAuth 2.0 mTLS',
    description: 'The transactional engine executing actual money movements and updating bank core ledgers.'
  },
  {
    id: 6,
    title: 'Newgen CCM (Customer Comm.)',
    subtitle: 'Omnichannel Empathetic Communication',
    pillar: 'CCM ("The Voice")',
    color: 'border-emerald-500/50 bg-emerald-950/20',
    glow: 'shadow-glow-emerald',
    icon: MessageSquare,
    reactive: 'Vernacular Hindi WhatsApp voice note + Bilingual PDF Award Decree',
    proactive: 'Pre-emptive SMS: "₹4,500 credited back before you even asked"',
    protocols: 'Meta WhatsApp Business Cloud API, SMPP SMS Gateway, Dynamic PDF Generator',
    description: 'Closes the loop with personalized, empathetic communication in the customer’s mother tongue.'
  }
];

export default function ScreenArchitecture({ onNavigate }) {
  const { t } = useLanguage();
  const [activePacketStep, setActivePacketStep] = useState(1);
  const [isFlowing, setIsFlowing] = useState(true);
  const [selectedNode, setSelectedNode] = useState(ARCHITECTURE_NODES[0]);

  // Animated packet flow loop
  useEffect(() => {
    let interval;
    if (isFlowing) {
      interval = setInterval(() => {
        setActivePacketStep((prev) => (prev >= 6 ? 1 : prev + 1));
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isFlowing]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-navy-950 via-void-900 to-navy-950 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                {t.architecture?.tag || 'Enterprise System Architecture'}
              </span>
              <span>• NewgenONE 4-Pillar Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-3">
              <span>{t.architecture?.title || 'Interactive System Architecture Flow'}</span>
              <Network className="w-6 h-6 text-cyan-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              {t.architecture?.subtitle || 'Follow a dispute packet as it transitions from multimodal intake through IDP, Agent Studio, Low-Code BPM, and CCM in under 2 hours.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFlowing(!isFlowing)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all"
            >
              <Play className={`w-3.5 h-3.5 ${isFlowing ? 'animate-spin' : ''}`} />
              <span>{isFlowing ? 'Pause Packet Animation' : (t.architecture?.btnTrace || 'Trace Packet Flow')}</span>
            </button>
            <button
              onClick={() => setActivePacketStep(1)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Reset Flow to Node 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Packet Tracker Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Active Packet Stage:</span>
            <strong className="text-cyan-400">Node #{activePacketStep}: {ARCHITECTURE_NODES[activePacketStep - 1].title}</strong>
          </div>
          <span className="text-slate-500 hidden sm:inline">
            Latency Benchmark: &lt; 3.4 seconds total computational execution
          </span>
        </div>
      </div>

      {/* Main Layout: Left Architecture Diagram Flow, Right Selected Node Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Vertical Interactive Flow Diagram (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          {ARCHITECTURE_NODES.map((node, index) => {
            const Icon = node.icon;
            const isCurrentPacket = activePacketStep === node.id;
            const isSelected = selectedNode.id === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Architectural Node Card */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative ${
                    isCurrentPacket
                      ? `${node.color} scale-[1.02] shadow-lg ring-1 ring-cyan-400`
                      : isSelected
                      ? 'glass-panel border-cyan-400 shadow-glow-cyan bg-slate-900/90'
                      : 'glass-card-interactive border-slate-800/80'
                  }`}
                >
                  {/* Packet Pulse Indicator */}
                  {isCurrentPacket && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-glow-cyan animate-ping pointer-events-none" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl border shrink-0 ${
                        isCurrentPacket ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                            Layer {node.id}
                          </span>
                          <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                            {node.pillar}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm sm:text-base text-white font-heading">
                          {node.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">
                          {node.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${
                        isCurrentPacket
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 animate-pulse'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}>
                        {isCurrentPacket ? 'PROCESSING' : 'READY'}
                      </span>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                    <div className="truncate">
                      <span className="text-cyan-400">Reactive: </span>
                      {node.reactive.split(',')[0]}
                    </div>
                    <div className="truncate">
                      <span className="text-emerald-400">Proactive: </span>
                      {node.proactive.split(',')[0]}
                    </div>
                  </div>
                </div>

                {/* Animated Connector Arrow between nodes */}
                {index < ARCHITECTURE_NODES.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className={`p-1 rounded-full transition-all duration-300 ${
                      activePacketStep === node.id ? 'text-cyan-400 scale-125' : 'text-slate-700'
                    }`}>
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

        </div>

        {/* Right Column: Node Inspector Specs Drawer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 sticky top-20">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold font-heading text-white uppercase tracking-wider">
                  NewgenONE Pillar Deep-Dive Inspector
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                Layer {selectedNode.id} of 6
              </span>
            </div>

            {/* Selected Node Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <selectedNode.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white font-heading">
                    {selectedNode.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedNode.pillar}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* In-depth Specifications */}
            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-cyan-400 font-bold uppercase text-[10px]">Reactive Mode (Customer Journey):</div>
                <div className="text-slate-300 text-[11px] leading-relaxed">{selectedNode.reactive}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold uppercase text-[10px]">Proactive Mode (Systemic Ghost Healing):</div>
                <div className="text-slate-300 text-[11px] leading-relaxed">{selectedNode.proactive}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold uppercase text-[10px]">Technical Protocols & Standards:</div>
                <div className="text-slate-300 text-[11px] font-mono">{selectedNode.protocols}</div>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('impact')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan"
              >
                <span>Proceed to Impact & Quantified Outcomes</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Explicit Submission Pillars: Orchestrating Intelligent Enterprises & AI Embedded in the Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
        
        {/* Card 1: Platform capabilities used */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="uppercase font-bold">Platform Capabilities Used</span>
          </div>
          <h4 className="font-bold text-base text-white font-heading">
            NewgenONE 4-Pillar Foundation
          </h4>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-cyan-300">1. Content Services & IDP:</strong> Vernacular audio parsing (14 languages), medical OCR, and Gazette circular extraction.
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-purple-300">2. Agent Studio:</strong> Real-time Empathy Engine (0-100) and 3-agent Lok Adalat adversarial debate swarm.
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-blue-300">3. Low-Code BPM:</strong> Dynamic SLA bypass, Core Banking Finacle API execution, and batch mass refunds.
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-emerald-300">4. CCM:</strong> Omnichannel empathetic WhatsApp voice notes, instant SMS, and bilingual Award PDFs.
            </div>
          </div>
        </div>

        {/* Card 2: AI Embedded in the Workflow */}
        <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span className="uppercase font-bold">{t.architecture?.aiEmbeddedTitle || 'AI Embedded in the Workflow'}</span>
          </div>
          <h4 className="font-bold text-base text-white font-heading">
            Operational Decision Intelligence
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {t.architecture?.aiEmbeddedDesc || 'AI is embedded directly at operational decision gates rather than sitting as a cosmetic chat wrapper:'}
          </p>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-rose-400">• Empathy Engine:</strong> Continuous tone and distress scoring (0-100) directly alters BPM SLA routing timers.
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-purple-400">• Virtual Lok Adalat:</strong> 3 adversarial agents argue consumer rights vs bank logs to consensus.
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-emerald-400">• Explainability Ledger:</strong> Tamper-proof SHA-256 audit trail generated at every decision hop.
            </div>
          </div>
        </div>

        {/* Card 3: Orchestrating Intelligent Enterprises */}
        <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="uppercase font-bold">{t.architecture?.coreIntelligentTitle || 'Orchestrating Intelligent Enterprises'}</span>
          </div>
          <h4 className="font-bold text-base text-white font-heading">
            Enterprise Autonomy & Self-Healing
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {t.architecture?.coreIntelligentDesc || 'How TrustBridge implements Newgen’s vision of orchestrating end-to-end intelligent enterprises:'}
          </p>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-cyan-300">• Citizen-to-Core Ledger:</strong> Connects citizen voice notes directly with Finacle/BaNCS CBS APIs in &lt; 3.4 seconds.
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-emerald-300">• Self-Healing Telemetry:</strong> Automatically detects ATM hardware jams and auto-restores funds before tickets are filed.
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-amber-300">• Zero-Day Circular Adaptability:</strong> Ingests regulator circulars and updates BPM workflow rules in zero downtime.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
