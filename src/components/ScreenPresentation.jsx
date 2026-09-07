import React, { useState, useEffect } from 'react';
import { PPT_SLIDES } from '../data/scenarios';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  ArrowRight,
  MonitorPlay,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ScreenPresentation({ onNavigate }) {
  const { t } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedOutline, setCopiedOutline] = useState(false);

  const currentSlide = PPT_SLIDES[currentSlideIndex];

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex((prev) => Math.min(PPT_SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyDeckOutline = () => {
    const text = PPT_SLIDES.map(
      (s) => `SLIDE ${s.slideNumber}: ${s.title}\nSubtitle: ${s.subtitle}\nKey Points:\n${s.bullets.map(b => ' - ' + b).join('\n')}\nSpeaker Notes: ${s.speakerNotes}\n`
    ).join('\n---\n\n');
    navigator.clipboard.writeText(text);
    setCopiedOutline(true);
    setTimeout(() => setCopiedOutline(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-purple-950/40 via-void-900 to-navy-950">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <Presentation className="w-4 h-4" />
            <span>{t.presentation?.tag || 'PITCH COMPANION'}</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            {t.presentation?.title || '11-Slide Master Pitch Deck'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.presentation?.subtitle || 'Structured slide-by-slide pitch deck for executive demonstration and presentation.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyDeckOutline}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-all"
          >
            {copiedOutline ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedOutline ? (t.presentation?.copied || 'All 11 Slides Copied') : (t.presentation?.btnCopy || 'Copy All 11 Slides Text')}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Slide Thumbnails List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[620px] overflow-y-auto pr-1">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 px-1">
            Slide Index ({PPT_SLIDES.length} Slides):
          </div>

          {PPT_SLIDES.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;

            return (
              <button
                key={slide.slideNumber}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-purple-950/50 border-purple-400 shadow-glow-purple text-white'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isActive ? 'text-purple-300 font-bold' : 'text-slate-500'}>
                    Slide {slide.slideNumber}
                  </span>
                  <span className="text-[10px] text-cyan-400 uppercase font-mono">
                    → {slide.screenTarget}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate">
                  {slide.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Slide Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Slide Card (16:9 Aspect Ratio Feel) */}
          <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-slate-900/90 via-void-950 to-navy-950 shadow-2xl min-h-[460px] flex flex-col justify-between space-y-6 relative overflow-hidden">
            
            {/* Slide Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3 mb-4">
                <span className="text-purple-400 font-bold">
                  SLIDE {currentSlide.slideNumber} OF 11
                </span>
                
                {/* Prototype Screen Link Chip */}
                <button
                  onClick={() => onNavigate(currentSlide.screenTarget)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono text-xs bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30 transition-all hover:scale-105"
                >
                  <span>{t.presentation?.pullsFrom || 'Pulls from screen:'} <strong className="uppercase">{currentSlide.screenTarget}</strong></span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                {currentSlide.title}
              </h3>
              <p className="text-sm text-cyan-400 font-mono mt-1">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Slide Bullet Points */}
            <div className="space-y-3.5 my-4">
              {currentSlide.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0 shadow-glow-purple" />
                  <span className="leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Speaker Notes Box (High Value for Video Recording) */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 text-xs font-mono space-y-1">
              <div className="text-purple-300 font-bold flex items-center gap-1.5">
                <MonitorPlay className="w-3.5 h-3.5" />
                <span>{t.presentation?.speakerNotes || 'Demo Video Voiceover / Speaker Notes:'}</span>
              </div>
              <p className="text-slate-400 font-sans leading-relaxed">
                "{currentSlide.speakerNotes}"
              </p>
            </div>

            {/* Slide Footer Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-mono text-xs transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.presentation?.prev || 'Previous Slide'}</span>
              </button>

              <span className="text-xs font-mono text-slate-500">
                Use ← / → arrow keys to navigate
              </span>

              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(PPT_SLIDES.length - 1, prev + 1))}
                disabled={currentSlideIndex === PPT_SLIDES.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-mono text-xs font-bold shadow-glow-purple transition-all"
              >
                <span>{t.presentation?.next || 'Next Slide'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Screen Jumper */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              Want to show the live interactive feature for this slide?
            </span>
            <button
              onClick={() => onNavigate(currentSlide.screenTarget)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-glow-cyan"
            >
              <span>Launch "{currentSlide.screenTarget}" Screen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
