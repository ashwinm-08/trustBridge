import React, { useState, useEffect } from 'react';
import { PERSONAS } from '../data/scenarios';
import { useLanguage } from '../context/LanguageContext';
import { playVoiceWaveformSound, playUiClick } from '../utils/audioEffects';
import { 
  Mic, 
  MicOff, 
  Upload, 
  FileCheck2, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight, 
  AlertTriangle, 
  Play, 
  RotateCcw, 
  Volume2, 
  Layers, 
  FileText,
  Activity,
  CheckCircle2,
  Globe
} from 'lucide-react';

export default function ScreenIntake({ 
  activePersona, 
  onSelectPersona, 
  onProceedToLokAdalat,
  isCodeRed,
  setIsCodeRed
}) {
  const { currentLang, setCurrentLang, t, languages, currentAudioSample, vernacularSamples } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptionStep, setTranscriptionStep] = useState('translated');
  
  // Vernacular state driven by active language
  const [activeSample, setActiveSample] = useState(currentAudioSample);
  const [inputText, setInputText] = useState(currentAudioSample.vernacularText);
  const [empathyScore, setEmpathyScore] = useState(94);
  const [uploadedDoc, setUploadedDoc] = useState(activePersona?.evidenceDoc || PERSONAS[0].evidenceDoc);
  const [analyzingEmpathy, setAnalyzingEmpathy] = useState(false);

  // Sync state when language changes
  useEffect(() => {
    const sample = vernacularSamples[currentLang] || vernacularSamples.hi;
    setActiveSample(sample);
    setInputText(sample.vernacularText);
    setEmpathyScore(94);
    setIsCodeRed(true);
  }, [currentLang, vernacularSamples, setIsCodeRed]);

  // Handle simulated voice recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      setTranscriptionStep('transcribing');
      interval = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 6) {
            setIsRecording(false);
            setTranscriptionStep('translated');
            return 6;
          }
          return prev + 1;
        });
      }, 700);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      playVoiceWaveformSound(4500);
      setIsRecording(true);
      setTranscriptionStep('transcribing');
    } else {
      playUiClick();
      setIsRecording(false);
      setTranscriptionStep('translated');
    }
  };

  const handleSelectLanguageSample = (langCode) => {
    playUiClick();
    setCurrentLang(langCode);
    const sample = vernacularSamples[langCode] || vernacularSamples.hi;
    setActiveSample(sample);
    setInputText(sample.vernacularText);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-navy-950 via-void-900 to-navy-950">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
              {t.intake.tag}
            </span>
            <span>• Multimodal Ingestion Pipeline</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            {t.intake.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.intake.subtitle}
          </p>
        </div>

        {/* Vernacular Language Selector Strip */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shrink-0">
          <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 mr-1 px-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Voice Language:</span>
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelectLanguageSample(lang.code)}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                currentLang === lang.code
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.native}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Intake Panel, Right Live Empathy & SLA Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Multimodal Intake Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Vernacular Voice Note Simulation */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl border ${isRecording ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'}`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-white">
                    {t.intake.voiceTitle}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {t.intake.voiceSub}
                  </p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="text-xs font-mono">
                {isRecording ? (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    {t.intake.recording} 00:0{recordingSeconds}
                  </span>
                ) : (
                  <span className="text-slate-400">{t.intake.ready}</span>
                )}
              </div>
            </div>

            {/* Audio Waveform Visualizer */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={toggleRecording}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-glow-rose'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRecording ? t.intake.btnStop : t.intake.btnSimulate}</span>
              </button>

              {/* Animated Waveform Bars */}
              <div className="flex-1 flex items-center justify-center gap-1 h-8 px-2 overflow-hidden">
                {[40, 65, 25, 90, 75, 45, 100, 30, 85, 60, 95, 35, 70, 50, 80, 20, 60, 90, 40, 70].map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isRecording
                        ? 'bg-cyan-400'
                        : 'bg-slate-700'
                    }`}
                    style={{
                      height: isRecording ? `${Math.max(15, (height * (1 + Math.sin(recordingSeconds + i)))) % 32}px` : `${height * 0.25}px`
                    }}
                  />
                ))}
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate max-w-[130px]">{activeSample.languageName.split(' ')[0]}</span>
              </div>
            </div>

            {/* Live Vernacular Transcription & Translation Card */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Newgen IDP Live Transcription:
                </span>
                <span className="text-cyan-400">{activeSample.languageName}</span>
              </div>

              {/* Vernacular Box */}
              <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 text-sm text-slate-200 font-sans leading-relaxed">
                <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>{t.intake.audioCapture} ({activeSample.speaker})</span>
                  <span className="text-emerald-400 font-mono">Confidence: 99.4%</span>
                </div>
                <div className="text-base font-normal leading-relaxed text-slate-100">
                  {activeSample.vernacularText}
                </div>
                <div className="mt-2 text-[11px] text-slate-400 font-mono italic">
                  Phonetic: "{activeSample.phonetic}"
                </div>
              </div>

              {/* Real-time English Legal Translation */}
              <div className="bg-cyan-950/20 rounded-xl p-3.5 border border-cyan-500/30 text-sm text-cyan-100 font-sans leading-relaxed">
                <div className="text-[11px] font-mono text-cyan-400 mb-1 flex items-center justify-between">
                  <span>{t.intake.legalTranslation}</span>
                  <span className="text-cyan-300">{t.intake.courtAdmissible}</span>
                </div>
                "{activeSample.english}"
              </div>
            </div>
          </div>

          {/* Card 2: Multimodal Document Evidence Dropzone */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold font-heading text-white uppercase tracking-wider">
                  {t.intake.docTitle}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.intake.ocrVerified}
              </span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {uploadedDoc}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    IDP Entity Extraction: Critical Medical Bill • Hospital ID: AIIMS-DEL-4491 • Amount: ₹72,000
                  </div>
                </div>
              </div>
              <button 
                onClick={() => alert("Document verified via Newgen Content Services OCR Engine: 100% authenticity confidence.")}
                className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/50 shrink-0"
              >
                Inspect OCR
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Algorithmic Empathy & SLA Bypass (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Empathy Score Gauge */}
          <div className={`p-6 rounded-2xl border transition-all duration-500 ${
            isCodeRed 
              ? 'pulse-code-red bg-gradient-to-b from-rose-950/40 via-void-950 to-navy-950 border-rose-500' 
              : 'glass-panel border-slate-800'
          }`}>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-400 animate-pulse" />
                <h3 className="text-sm font-bold font-heading text-white">
                  {t.intake.empathyTitle}
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Agent Studio v2.4
              </span>
            </div>

            {/* Score Big Display */}
            <div className="text-center py-4 space-y-2">
              <div className="text-5xl font-black font-mono tracking-tight text-white flex items-center justify-center gap-1">
                <span className={isCodeRed ? 'text-rose-400' : 'text-cyan-400'}>
                  {empathyScore}
                </span>
                <span className="text-2xl text-slate-500 font-normal">/100</span>
              </div>
              
              <div className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                isCodeRed ? 'text-rose-400' : 'text-cyan-300'
              }`}>
                {isCodeRed ? t.intake.extremeDuress : t.intake.standardPriority}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-3.5 p-0.5 border border-slate-800 overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCodeRed
                      ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 shadow-glow-rose'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                  }`}
                  style={{ width: `${empathyScore}%` }}
                />
              </div>
            </div>

            {/* Detected Empathy Markers */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
              <div className="text-slate-400 text-[11px]">Detected Empathy Factors:</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-rose-950/60 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[11px]">
                  • Medical Oncology Emergency
                </span>
                <span className="bg-rose-950/60 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[11px]">
                  • Pensioner Lifeline (Age 68)
                </span>
                <span className="bg-rose-950/60 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[11px]">
                  • 100% Dispute vs Savings Ratio
                </span>
              </div>
            </div>

            {/* Dynamic SLA Comparison Box */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                {t.intake.slaTitle}
              </div>

              {isCodeRed ? (
                <div className="bg-rose-950/60 border-2 border-rose-500/80 rounded-xl p-4 space-y-2 animate-in zoom-in-95">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
                    <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                    <span>{t.intake.slaShattered}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 line-through">{t.intake.slaStandardLabel}</div>
                      <div className="text-lg font-extrabold text-white font-mono">
                        <span className="text-rose-400">{t.intake.slaBypassLabel}</span>
                      </div>
                    </div>
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase font-mono">
                      82% Faster
                    </span>
                  </div>

                  <p className="text-[11px] text-rose-200/80 leading-relaxed font-sans">
                    Newgen BPM has autonomously reconfigured the routing tree to bypass tier-1 call center queues directly into the Virtual Lok Adalat Tribunal.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-400">
                  Standard 7-day queue routing.
                </div>
              )}
            </div>

            {/* Proceed CTA */}
            <div className="mt-6">
              <button
                onClick={onProceedToLokAdalat}
                className="w-full group flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-purple transition-all"
              >
                <span>{t.intake.btnDispatch}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="text-[10px] text-center text-slate-400 font-mono mt-2">
                Spawns 3 AI Agents: Customer Advocate • Bank Defender • RBI Judge
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
