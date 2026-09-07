// Pure browser Web Audio API sound synthesizer for TrustBridge (Zero external asset dependencies)

let audioCtx = null;
let isAudioMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleAudioMute() {
  isAudioMuted = !isAudioMuted;
  return isAudioMuted;
}

export function getAudioMuted() {
  return isAudioMuted;
}

// 1. Voice Note Harmonic Frequency Sweep (Simulates Vernacular Audio Playback)
export function playVoiceWaveformSound(durationMs = 2500) {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Natural formant-like frequencies (vowel-like sweep)
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(180, now);
  osc1.frequency.exponentialRampToValueAtTime(280, now + 0.5);
  osc1.frequency.exponentialRampToValueAtTime(190, now + 1.2);
  osc1.frequency.exponentialRampToValueAtTime(240, now + 2.0);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(360, now);
  osc2.frequency.exponentialRampToValueAtTime(560, now + 0.5);
  osc2.frequency.exponentialRampToValueAtTime(380, now + 1.2);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + (durationMs / 1000));

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + (durationMs / 1000));
  osc2.stop(now + (durationMs / 1000));
}

// 2. Tribunal Gavel Strike (Realistic double wooden gavel knock for Lok Adalat decree)
export function playGavelStrike() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const strike = (delay) => {
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.09);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  };

  strike(0);
  strike(0.18); // Second authoritative knock
}

// 3. Proactive Resolution Chime (Delightful 3-tone arpeggio for auto-reversals & refunds)
export function playResolutionChime() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const now = ctx.currentTime + (idx * 0.08);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  });
}

// 4. Subtle UI Micro-Click
export function playUiClick() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}
