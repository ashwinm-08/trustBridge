import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  UserCheck, 
  Mic, 
  Scale, 
  Radio, 
  TrendingUp,
  Award
} from 'lucide-react';
import { playUiClick } from '../utils/audioEffects';

const DEMO_STEPS = [
  {
    id: 'hero',
    stepNumber: 1,
    label: '1. Select Case',
    title: 'Rameshwar Prasad (ICU Crisis)',
    icon: UserCheck,
    hint: 'Elderly pensioner with ₹72,000 blocked'
  },
  {
    id: 'intake',
    stepNumber: 2,
    label: '2. Voice Intake',
    title: 'IDP & Empathy Engine',
    icon: Mic,
    hint: 'Bhojpuri note triggers 2-hr SLA bypass'
  },
  {
    id: 'lok-adalat',
    stepNumber: 3,
    label: '3. Adjudication',
    title: 'Virtual Lok Adalat',
    icon: Scale,
    hint: '3 AI agents argue & decree restitution'
  },
  {
    id: 'ghost-grievance',
    stepNumber: 4,
    label: '4. Self-Healing',
    title: 'Ghost Grievances',
    icon: Radio,
    hint: 'ATM cluster auto-heals pre-emptively'
  },
  {
    id: 'impact',
    stepNumber: 5,
    label: '5. Impact & ROI',
    title: 'Quantified Proof',
    icon: TrendingUp,
    hint: '82% faster & ₹14.8 Cr net savings'
  }
];

export default function GuidedDemoBar({ currentScreen, onNavigate }) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-Play Step Progression (Advances every 8 seconds)
  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        const currentIndex = DEMO_STEPS.findIndex((s) => s.id === currentScreen);
        const nextIndex = currentIndex < DEMO_STEPS.length - 1 ? currentIndex + 1 : 0;
        onNavigate(DEMO_STEPS[nextIndex].id);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentScreen, onNavigate]);

  const toggleAutoPlay = () => {
    playUiClick();
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleStepClick = (screenId) => {
    playUiClick();
    setIsAutoPlaying(false);
    onNavigate(screenId);
  };

  return (
    <div className="mb-6 rounded-2xl glass-panel border border-cyan-500/30 p-3 shadow-lg transition-all duration-300">
      
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-heading text-white tracking-wide">
                Evaluator Guided Demo Tour
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                1-Click End-to-End Flow
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Follow the 5 progressive stages from citizen grievance to autonomous restitution
            </p>
          </div>
        </div>

        {/* Right Controls: Auto-Play & Collapse */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoPlay}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
              isAutoPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow-cyan'
            }`}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlaying ? 'Pause Tour' : '▶ Auto-Tour'}</span>
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Steps' : 'Collapse Steps'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 5 Step Progress Strip */}
      {!isCollapsed && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DEMO_STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentScreen === step.id;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-glow-cyan scale-[1.02]'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  isActive ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-mono font-bold leading-tight ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                    {step.label}
                  </div>
                  <div className="text-xs font-semibold text-white truncate leading-snug">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate hidden lg:block">
                    {step.hint}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
