import React, { useState } from 'react';
import TrustBridge3D from './TrustBridge3D';
import { PERSONAS } from '../data/scenarios';
import { TEAM_MEMBERS } from '../data/team';
import { useLanguage } from '../context/LanguageContext';
import { 
  Scale, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  HeartHandshake, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Radio, 
  FileText,
  UserCheck,
  Globe,
  Crown,
  Users
} from 'lucide-react';

export default function ScreenHero({ 
  onSelectPersona, 
  onNavigate, 
  activePersona 
}) {
  const { currentLang, setCurrentLang, t, languages } = useLanguage();

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section with 3D Centerpiece */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-navy-900/80 via-void-950 to-navy-950 p-6 sm:p-10 lg:p-12 shadow-2xl">
        
        {/* Subtle background cyber grid */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Tag & Multi-Language Quick Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.hero.badge}</span>
                <span className="text-cyan-500">|</span>
                <span className="text-white font-semibold">NewgenONE</span>
              </div>

              {/* Vernacular Language Badges on Hero */}
              <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800 text-[11px] font-mono">
                <Globe className="w-3 h-3 text-cyan-400 ml-1.5 mr-0.5" />
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`px-2 py-0.5 rounded-full transition-all ${
                      currentLang === lang.code
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang.native}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
                {t.hero.title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  {t.hero.title2}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Problem Statement Narrative */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              {t.hero.narrative}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  onSelectPersona(PERSONAS[0]);
                  onNavigate('intake');
                }}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.hero.btnCustomer}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('ghost-grievance')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
              >
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{t.hero.btnOps}</span>
              </button>
            </div>

            {/* Quick stats ribbon */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">82%</div>
                <div className="text-xs text-slate-400">{t.hero.stat1Label}</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
                <div className="text-xs text-slate-400">{t.hero.stat2Label}</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-purple-400">₹14.8 Cr</div>
                <div className="text-xs text-slate-400">{t.hero.stat3Label}</div>
              </div>
            </div>

          </div>

          {/* Right Hero 3D Centerpiece */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full h-[420px] rounded-2xl glass-panel-glow overflow-hidden">
              <TrustBridge3D />

              {/* Holographic Badge */}
              <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-lg border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                Agent Swarm: 3 Active Nodes
              </div>

              {/* Floating Quick Feature Chips */}
              <div className="absolute bottom-12 right-4 flex flex-col gap-2 pointer-events-none">
                <div className="bg-slate-900/90 border border-purple-500/40 text-purple-300 text-[11px] px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  Customer Advocate
                </div>
                <div className="bg-slate-900/90 border border-blue-500/40 text-blue-300 text-[11px] px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Bank Defender
                </div>
                <div className="bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-[11px] px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  RBI Judge (Ombudsman)
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* The Problem: "The Empathy & Efficiency Gap" Explainer Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card-interactive p-6 rounded-2xl border border-rose-500/20 bg-gradient-to-b from-rose-950/20 to-void-950">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white mb-2">1. The "Silent Sufferers"</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Millions of rural and elderly citizens cannot articulate formal English complaints or navigate OTP portals. They give up and absorb life-altering losses in silence.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
            Solved by: Newgen IDP Vernacular Voice Ingestion (14 Languages)
          </div>
        </div>

        <div className="glass-card-interactive p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-950/20 to-void-950">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white mb-2">2. Zero Empathy Routing</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Static queue systems assign identical 7 to 30 day SLAs to a ₹500 subscription refund and a ₹72,000 emergency medical pension freeze needed in hours.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
            Solved by: Agent Studio Algorithmic Empathy Engine
          </div>
        </div>

        <div className="glass-card-interactive p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-void-950">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white mb-2">3. Static IT Bottlenecks</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            When RBI or IRDAI issues a zero-day circular or an ATM cluster crashes, banks take weeks of manual IT recoding. TrustBridge self-heals in minutes.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
            Solved by: Low-Code BPM & Ghost Grievance Telemetry
          </div>
        </div>
      </div>

      {/* Target Personas Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.hero.personaSectionTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {t.hero.personaSectionTitle}
            </h2>
            <p className="text-sm text-slate-400">
              {t.hero.personaSectionSubtitle}
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Click card to test live simulation →
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERSONAS.map((p) => {
            const isSelected = activePersona?.id === p.id;

            return (
              <div
                key={p.id}
                onClick={() => {
                  onSelectPersona(p);
                  onNavigate('intake');
                }}
                className={`relative group cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                  isSelected
                    ? 'glass-panel border-cyan-400 shadow-glow-cyan bg-slate-900/90 scale-[1.02]'
                    : 'glass-card-interactive border-slate-800 hover:border-cyan-500/50'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-3xl">{p.avatar}</span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                    p.id === 'rameshwar'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : p.id === 'sunita'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {p.id === 'rameshwar' ? '⭐ Recommended Demo' : p.tag.split(':')[0]}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {p.name}
                </h4>
                <div className="text-xs text-slate-400 font-mono mb-2">
                  {p.age ? `${p.age} yrs • ` : ''}{p.location}
                </div>
                
                <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {p.summary}
                </p>

                {/* Dispute / Stats Pill */}
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 space-y-1.5 mb-4 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Dispute:</span>
                    <span className="text-white font-semibold">{p.disputeAmount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Input:</span>
                    <span className="text-cyan-400 truncate max-w-[120px]">{p.inputMethod}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Empathy Score:</span>
                    <span className={p.distress > 80 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                      {p.distress}/100
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>Simulate Grievance</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Innovation Team Roster Section */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-1">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>TEAM NAME: NEXUSNODES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">NexusNodes</span> — Engineering Roster
            </h2>
            <p className="text-sm text-slate-400">
              The cross-functional engineers and architects behind TrustBridge on NewgenONE
            </p>
          </div>

          <button
            onClick={() => onNavigate('team')}
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>View Full Team Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Team Grid: Team Leader + 3 Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM_MEMBERS.map((member) => {
            const isLeader = member.id === 'ragavendra';
            const isAshwin = member.id === 'ashwin';

            return (
              <div
                key={member.id}
                onClick={() => onNavigate('team')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 group ${
                  isLeader
                    ? 'glass-panel border-amber-500/50 shadow-glow-amber bg-gradient-to-b from-amber-950/30 to-slate-950 scale-[1.02]'
                    : isAshwin
                    ? 'glass-panel border-purple-500/50 shadow-glow-purple bg-gradient-to-b from-purple-950/30 to-slate-950'
                    : member.id === 'venkataraam'
                    ? 'glass-panel border-blue-500/50 bg-gradient-to-b from-blue-950/30 to-slate-950'
                    : 'glass-panel border-emerald-500/50 bg-gradient-to-b from-emerald-950/30 to-slate-950'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="relative">
                    <span className="text-3xl p-1.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform block">
                      {member.avatar}
                    </span>
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 p-0.5 rounded-full shadow-md">
                      <Crown className="w-3 h-3" />
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold flex items-center gap-1 ${
                    isLeader
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : isAshwin
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                      : member.id === 'venkataraam'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  }`}>
                    {member.badge}
                  </span>
                </div>

                <h4 className="text-base font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h4>
                <div className="text-xs font-mono text-cyan-400 mb-2">
                  {member.designation.split('&')[0]}
                </div>

                <div className="space-y-1 text-[11px] text-slate-300 font-sans border-t border-slate-800/80 pt-2 mb-3">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Focus Area:</div>
                  <div className="line-clamp-2 leading-relaxed">{member.contributions[0]}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 group-hover:text-cyan-300 pt-1">
                  <span>Inspect Profile</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
