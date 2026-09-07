import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, 
  Mic, 
  Cpu, 
  Radio, 
  FileCheck, 
  Network, 
  TrendingUp, 
  Presentation, 
  ShieldCheck, 
  AlertCircle,
  Globe,
  ChevronDown,
  Check,
  CheckCircle2,
  Users,
  Sun,
  Moon,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { toggleAudioMute, getAudioMuted, playUiClick } from '../utils/audioEffects';

export default function Header({ 
  currentScreen, 
  setCurrentScreen, 
  activePersona, 
  isCodeRed,
  onResetCase,
  onOpenCriteria
}) {
  const { currentLang, setCurrentLang, t, languages } = useLanguage();
  const { theme, toggleTheme, isDark, isLight, isMixed } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMutedState, setIsMutedState] = useState(getAudioMuted);
  const langMenuRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'hero', label: t.nav.overview, icon: Scale },
    { id: 'intake', label: t.nav.intake, icon: Mic, badge: isCodeRed ? 'Code Red' : null },
    { id: 'lok-adalat', label: t.nav.lokAdalat, icon: Cpu, highlight: true },
    { id: 'ghost-grievance', label: t.nav.ghostGrievance, icon: Radio },
    { id: 'regulatory', label: t.nav.regulatory, icon: FileCheck },
    { id: 'architecture', label: t.nav.architecture, icon: Network },
    { id: 'impact', label: t.nav.impact, icon: TrendingUp },
    { id: 'team', label: t.nav.team, icon: Users },
  ];

  const currentLanguageObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <header className="sticky top-0 z-40 bg-void-950/95 border-b border-slate-800/80 backdrop-blur-xl transition-all">
      {/* Top Banner Status Bar */}
      <div className="bg-gradient-to-r from-navy-950 via-void-900 to-navy-950 border-b border-slate-800/50 px-4 py-1 text-[11px] font-mono text-slate-400 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-300 font-semibold">NewgenONE Microservices:</span>
          <span className="text-slate-300">IDP • Agent Studio • Low-Code BPM • CCM</span>
          <span className="text-slate-500">| v24.2.8 Indic NLP Cluster</span>
        </div>

        <div className="flex items-center gap-3">
          {activePersona && (
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
              <span className="text-xs">{activePersona.avatar}</span>
              <span className="text-slate-300 truncate max-w-[140px]">{activePersona.name}</span>
              {isCodeRed && (
                <span className="bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded text-[9px] font-bold border border-rose-500/50 animate-pulse">
                  CODE RED 2HR
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RBI Ombudsman Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setCurrentScreen('hero')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-glow-cyan transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-void-950 rounded-[10px] flex items-center justify-center">
              <Scale className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                TrustBridge
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Virtual Lok Adalat
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <span>Autonomous BFSI Adjudicator</span>
              <span className="text-slate-600">•</span>
              <span className="text-newgen-orange font-semibold">NewgenONE</span>
            </div>
          </div>
        </div>

        {/* Screens Nav Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Language Selector & Pitch Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Multi-Language Dropdown Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border border-cyan-500/30 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:border-cyan-400 transition-all shadow-sm"
              title="Select Language (English, Tamil, Hindi, Telugu, Kannada, Bengali)"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-sans font-medium">{currentLanguageObj.native}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2.5 py-1.5 border-b border-slate-800">
                  Select Vernacular Language
                </div>
                <div className="py-1 space-y-0.5">
                  {languages.map((lang) => {
                    const isSelected = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <div className="text-left">
                            <div className="leading-tight">{lang.native}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{lang.name}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3-Way Theme Toggle (Dark / Light / Mixed) */}
          <button
            onClick={() => {
              playUiClick();
              toggleTheme();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all shadow-sm ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-amber-400 hover:border-amber-400'
                : isLight
                ? 'bg-white border-slate-300 text-indigo-600 hover:border-indigo-400 shadow'
                : 'bg-gradient-to-r from-cyan-950/80 to-purple-950/80 border-cyan-500/50 text-cyan-300 hover:border-cyan-400'
            }`}
            title={`Active Theme: ${theme.toUpperCase()} (Click to cycle: Dark → Light → Mixed)`}
            aria-label="Toggle theme"
          >
            {isDark && <Moon className="w-3.5 h-3.5 text-amber-400" />}
            {isLight && <Sun className="w-3.5 h-3.5 text-amber-500" />}
            {isMixed && <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
            <span className="capitalize text-[11px]">{theme}</span>
          </button>

          {/* Sound Toggle (Web Audio API) */}
          <button
            onClick={() => {
              const muted = toggleAudioMute();
              setIsMutedState(muted);
              if (!muted) playUiClick();
            }}
            className={`flex items-center justify-center w-8 h-8 rounded-xl border transition-all ${
              isMutedState 
                ? 'border-slate-800 bg-slate-950/60 text-slate-500 hover:text-slate-300' 
                : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400 shadow-sm'
            }`}
            title={isMutedState ? 'Audio Muted (Click to enable sound effects)' : 'Sound Effects Active (Click to mute)'}
          >
            {isMutedState ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
          </button>

          {/* Submission Criteria Checklist Button */}
          <button
            onClick={onOpenCriteria}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-400 transition-all shadow-sm"
            title="Inspect Submission Criteria (Target Persona, Capabilities, AI, Orchestration, Tangible Outcomes)"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Submission Checklist</span>
          </button>

          {/* Pitch Button */}
          <button
            onClick={() => setCurrentScreen('presentation')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono border transition-all ${
              currentScreen === 'presentation'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-glow-purple'
                : 'bg-purple-950/40 text-purple-300 border-purple-500/40 hover:bg-purple-900/50 hover:border-purple-400'
            }`}
          >
            <Presentation className="w-4 h-4 text-purple-300" />
            <span>{t.nav.pitch}</span>
            <span className="px-1.5 py-0.2 rounded bg-purple-500/30 text-[10px]">{t.nav.slidesBadge}</span>
          </button>

        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-slate-800/60 bg-void-900">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
