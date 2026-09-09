import React, { useState, useEffect, useRef } from 'react';
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
  VolumeX,
  Layers, 
  FileText,
  Activity,
  CheckCircle2,
  Globe,
  Edit3,
  Check,
  Radio,
  Wand2,
  HelpCircle,
  Square
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
  
  // Real Microphone (Web Speech API + MediaRecorder) state
  const [isListeningLive, setIsListeningLive] = useState(false);
  const [liveMicError, setLiveMicError] = useState(null);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [speakingTTS, setSpeakingTTS] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const durationTimerRef = useRef(null);

  // Vernacular state driven by active language & user input
  const [activeSample, setActiveSample] = useState(currentAudioSample);
  const [inputText, setInputText] = useState(currentAudioSample.vernacularText);
  const [empathyScore, setEmpathyScore] = useState(94);
  const [uploadedDoc, setUploadedDoc] = useState(activePersona?.evidenceDoc || PERSONAS[0].evidenceDoc);

  // Dynamic Empathy & Distress evaluation based on spoken/edited words
  const evaluateDynamicEmpathy = (text) => {
    if (!text) return;
    const lower = text.toLowerCase();
    const criticalWords = [
      'emergency', 'hospital', 'icu', 'cardiac', 'cancer', 'chemo', 'chemotherapy',
      'operation', 'pension', 'stuck', 'blocked', 'failed', 'undispensed', 'jam',
      'debit', 'fraud', 'urgently', 'urgent', 'help', 'life', 'save', 'medicine',
      '₹', 'rupees', 'rs', '72000', '45000', '14500', 'doctor', 'treatment',
      'अस्पताल', 'आईसीयू', 'दवा', 'इमरजेंसी', 'पेंशन', 'रुपिया', 'कट',
      'மருத்துவமனை', 'அவசரம்', 'பணம்', 'உயிர்', 'மருந்து'
    ];

    let matches = 0;
    criticalWords.forEach((word) => {
      if (lower.includes(word)) matches++;
    });

    if (matches >= 2 || lower.includes('icu') || lower.includes('hospital') || lower.includes('emergency') || lower.includes('pension')) {
      const score = Math.min(98, 88 + matches * 2);
      setEmpathyScore(score);
      setIsCodeRed(true);
    } else if (matches === 1) {
      setEmpathyScore(78);
      setIsCodeRed(false);
    } else {
      setEmpathyScore(65);
      setIsCodeRed(false);
    }
  };

  // Sync state when language changes
  useEffect(() => {
    const sample = vernacularSamples[currentLang] || vernacularSamples.hi;
    setActiveSample(sample);
    setInputText(sample.vernacularText);
    setEmpathyScore(94);
    setIsCodeRed(true);
  }, [currentLang, vernacularSamples, setIsCodeRed]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    };
  }, []);

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
    if (isListeningLive) {
      stopRealVoiceRecording();
    }
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

  // Start Real Voice Recording (Captures Audio + Transcribes to Words in Real Time)
  const startRealVoiceRecording = async () => {
    playUiClick();
    setLiveMicError(null);
    setRecordedAudioUrl(null);
    audioChunksRef.current = [];
    setInputText('');

    // Stop simulated audio if playing
    if (isRecording) {
      setIsRecording(false);
    }

    // 1. Initialize Speech-to-Text Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.abort(); } catch (e) {}
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        const langCodes = {
          en: 'en-IN',
          hi: 'hi-IN',
          ta: 'ta-IN',
          te: 'te-IN',
          kn: 'kn-IN',
          bn: 'bn-IN'
        };
        recognition.lang = langCodes[currentLang] || 'en-IN';

        recognition.onresult = (event) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; ++i) {
            fullTranscript += event.results[i][0].transcript + ' ';
          }
          const trimmed = fullTranscript.trim();
          if (trimmed) {
            setInputText(trimmed);
            evaluateDynamicEmpathy(trimmed);
          }
        };

        recognition.onerror = (event) => {
          console.warn('SpeechRecognition error:', event.error);
          if (event.error === 'not-allowed') {
            setLiveMicError('Microphone permission blocked. Please allow microphone in your browser address bar.');
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Speech recognition init error:', err);
      }
    } else {
      setLiveMicError('Speech-to-Text is not natively supported in this browser, but audio recording will still work! You can edit words manually below.');
    }

    // 2. Start Real Microphone Audio Capture (MediaRecorder)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          if (audioChunksRef.current.length > 0) {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(blob);
            setRecordedAudioUrl(audioUrl);
          }
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start(250);
        mediaRecorderRef.current = mediaRecorder;
        setIsListeningLive(true);
        setRecordingDuration(0);

        durationTimerRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);
      } catch (err) {
        console.warn('Microphone getUserMedia error:', err);
        setLiveMicError('Microphone access was denied. Please allow microphone permissions in your browser.');
        setIsListeningLive(false);
      }
    } else {
      setLiveMicError('Microphone recording is not supported in this browser environment. You can type words directly below.');
    }
  };

  // Stop Real Voice Recording
  const stopRealVoiceRecording = () => {
    playUiClick();
    if (durationTimerRef.current) clearInterval(durationTimerRef.current);

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch (e) {}
    }

    setIsListeningLive(false);
  };

  // Toggle Live Microphone
  const toggleLiveMicrophone = () => {
    if (isListeningLive) {
      stopRealVoiceRecording();
    } else {
      startRealVoiceRecording();
    }
  };

  // Text-To-Speech: Browser reads back what was recognized/edited
  const handleSpeakAloud = (textToSpeak) => {
    playUiClick();
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingTTS) {
      window.speechSynthesis.cancel();
      setSpeakingTTS(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak || inputText);
    const langCodes = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      bn: 'bn-IN'
    };
    utterance.lang = langCodes[currentLang] || 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingTTS(false);
    utterance.onerror = () => setSpeakingTTS(false);

    setSpeakingTTS(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    setInputText(val);
    evaluateDynamicEmpathy(val);
  };

  const handleQuickInsert = (phrase) => {
    playUiClick();
    const updated = inputText ? `${inputText} ${phrase}` : phrase;
    setInputText(updated);
    evaluateDynamicEmpathy(updated);
  };

  const handleSelectLanguageSample = (langCode) => {
    playUiClick();
    setCurrentLang(langCode);
    const sample = vernacularSamples[langCode] || vernacularSamples.hi;
    setActiveSample(sample);
    setInputText(sample.vernacularText);
  };

  // Dynamic legal translation generated from current inputText
  const getDynamicLegalTranslation = () => {
    if (!inputText) return activeSample.english;
    if (inputText.trim() === activeSample.vernacularText.trim()) return activeSample.english;
    return `Verified Citizen Deposition: "${inputText.trim()}". Statutory basis: RBI Master Direction on Limiting Liability (DBR.No.Leg.BC.78/09.07.005/2017-18) & Section 21 of the Legal Services Authorities Act, 1987. Immediate emergency restitution requested.`;
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
          
          {/* Card 1: Vernacular Voice Note & Live Microphone Suite */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            
            {/* Top Bar of Card 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl border ${
                  isListeningLive
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse shadow-glow-rose'
                    : isRecording
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/50 animate-pulse'
                    : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                }`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                    <span>{t.intake.voiceTitle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      Live Mic Connected
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Speak in your voice or edit words directly below
                  </p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="text-xs font-mono">
                {isListeningLive ? (
                  <span className="text-rose-400 flex items-center gap-1.5 bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-500/40 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    Listening to your voice...
                  </span>
                ) : isRecording ? (
                  <span className="text-purple-400 flex items-center gap-1.5 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/40">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
                    Simulating 00:0{recordingSeconds}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mic Ready
                  </span>
                )}
              </div>
            </div>

            {/* Error Message if Mic Blocked */}
            {liveMicError && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{liveMicError}</span>
              </div>
            )}

            {/* Triple Interactive Action Controls: [Live Mic] | [Simulate Preset] | [Edit Words] */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              
              {/* Button 1: Live Browser Microphone */}
              <button
                onClick={toggleLiveMicrophone}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  isListeningLive
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-glow-rose animate-pulse'
                    : 'bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 shadow-md font-bold'
                }`}
              >
                {isListeningLive ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isListeningLive ? '⏹️ Stop Recording' : '🔴 Record My Voice'}</span>
              </button>

              {/* Button 2: Simulate Preset Vernacular Audio */}
              <button
                onClick={toggleRecording}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  isRecording
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-glow-purple'
                    : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRecording ? 'Stop Preset' : '📻 Play Preset Audio'}</span>
              </button>

              {/* Button 3: Toggle Direct Edit Mode */}
              <button
                onClick={() => {
                  playUiClick();
                  setIsEditingTranscript(!isEditingTranscript);
                }}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                  isEditingTranscript
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-glow-cyan'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditingTranscript ? '✓ Done Editing' : '✏️ Change Words'}</span>
              </button>

            </div>

            {/* Live Recording Active Banner */}
            {isListeningLive && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950 via-rose-900/60 to-rose-950 border-2 border-rose-500 text-white shadow-glow-rose animate-pulse space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                    <span className="text-rose-200">
                      RECORDING YOUR REAL VOICE LIVE (00:{recordingDuration < 10 ? `0${recordingDuration}` : recordingDuration})
                    </span>
                  </div>
                  <button
                    onClick={stopRealVoiceRecording}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-md"
                  >
                    ⏹️ Stop & Save Words
                  </button>
                </div>
                <p className="text-xs text-rose-200/90 font-sans">
                  Speak into your microphone now! Your voice is being recorded and your words will appear below in real time as you speak.
                </p>
              </div>
            )}

            {/* Recorded Audio Playback Box (If User Spoke and Recorded) */}
            {recordedAudioUrl && !isListeningLive && (
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Your Voice Note Successfully Recorded! (Click play to listen)
                  </span>
                  <button
                    onClick={startRealVoiceRecording}
                    className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
                  >
                    🔄 Record Again
                  </button>
                </div>
                <audio src={recordedAudioUrl} controls className="w-full h-9 rounded-lg" />
              </div>
            )}

            {/* Audio Waveform Equalizer (Animates when Mic or Audio is active) */}
            <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Radio className={`w-3.5 h-3.5 ${isListeningLive || isRecording ? 'text-rose-400 animate-pulse' : 'text-slate-600'}`} />
                <span>{isListeningLive ? 'Live Microphone Recording' : 'Acoustic Waveform'}</span>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex-1 flex items-center justify-center gap-1 h-7 px-2 overflow-hidden">
                {[30, 65, 25, 90, 75, 45, 100, 30, 85, 60, 95, 35, 70, 50, 80, 20, 60, 90, 40, 70].map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isListeningLive
                        ? 'bg-gradient-to-t from-rose-500 to-amber-400'
                        : isRecording
                        ? 'bg-cyan-400'
                        : 'bg-slate-800'
                    }`}
                    style={{
                      height: (isListeningLive || isRecording)
                        ? `${Math.max(12, (height * (1 + Math.sin(Date.now() / 150 + i)))) % 28}px`
                        : `${height * 0.2}px`
                    }}
                  />
                ))}
              </div>

              {/* Text-To-Speech Listen Button */}
              <button
                onClick={() => handleSpeakAloud(inputText)}
                title="Listen to Speech Aloud (Text-to-Speech)"
                className={`flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-lg border transition-all ${
                  speakingTTS 
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 animate-pulse'
                    : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                {speakingTTS ? <VolumeX className="w-3.5 h-3.5 text-slate-950" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{speakingTTS ? 'Stop Voice' : '🔊 Listen'}</span>
              </button>
            </div>

            {/* Captured / Editable Voice Speech Section ("See your voice and change it") */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Words Transcribed From Your Voice (Shown on Website):
                </span>
                <span className="text-cyan-400 font-mono text-[11px]">
                  {activeSample.languageName} • {isListeningLive ? '🔴 Transcribing Now' : 'Verified Words'}
                </span>
              </div>

              {/* Editable Voice Box */}
              <div className="bg-slate-900/95 rounded-xl p-3.5 border border-slate-800 text-sm text-slate-200 font-sans leading-relaxed focus-within:border-cyan-500/60 transition-colors">
                <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                    <Edit3 className="w-3 h-3" />
                    <span>Your Spoken Words (You can see & change them here anytime):</span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">
                    {isListeningLive ? 'Live Speech Recognition' : 'Confidence: 99.4%'}
                  </span>
                </div>

                <textarea
                  value={inputText}
                  onChange={handleTextChange}
                  rows={3}
                  placeholder="Your spoken words will appear here as you talk into the microphone. You can also click to edit, add, or change any words..."
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-y leading-relaxed font-sans"
                />

                {/* Quick Add Distress Keywords Chips */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400 mr-1 flex items-center gap-1">
                    <Wand2 className="w-3 h-3 text-cyan-400" />
                    <span>Quick Keywords:</span>
                  </span>
                  {[
                    { label: '+ 🚨 Cardiac ICU Emergency', phrase: 'पत्नी आईसीयू में बाड़ी, emergency ICU treatment urgently required!' },
                    { label: '+ 🏧 ATM Cash Failed ₹72,000', phrase: '₹72,000 debited but cash dispenser jammed without cash.' },
                    { label: '+ ⚠️ Chemotherapy Medicine', phrase: 'Pension money needed immediately for cancer chemotherapy injections!' },
                    { label: '+ ⚡ UPI Duplicate Debit', phrase: '₹45,000 duplicate UPI debit to vendor, working capital frozen.' }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickInsert(chip.phrase)}
                      className="px-2 py-0.5 rounded-md bg-slate-950 hover:bg-slate-800 text-[10px] font-mono text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time English Legal Translation (Generated dynamically from inputText) */}
              <div className="bg-cyan-950/20 rounded-xl p-3.5 border border-cyan-500/30 text-sm text-cyan-100 font-sans leading-relaxed">
                <div className="text-[11px] font-mono text-cyan-400 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.intake.legalTranslation}</span>
                  </span>
                  <span className="text-cyan-300">{t.intake.courtAdmissible}</span>
                </div>
                "{getDynamicLegalTranslation()}"
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
                onClick={() => onProceedToLokAdalat({
                  customVoiceText: inputText,
                  empathyScore,
                  isCodeRed,
                  language: activeSample.languageName,
                  isCustom: inputText.trim() !== activeSample.vernacularText.trim()
                })}
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
