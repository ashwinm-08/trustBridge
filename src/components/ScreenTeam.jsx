import React from 'react';
import { TEAM_MEMBERS } from '../data/team';
import { 
  Users, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ScreenTeam({ onNavigate }) {
  const { t } = useLanguage();
  return (
    <div className="space-y-10 pb-12">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-navy-950 via-void-900 to-navy-950 shadow-2xl relative overflow-hidden">
        
        {/* Subtle 3D background glows */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.team?.tag || 'TEAM NAME: NEXUSNODES'}</span>
              <span className="text-cyan-500">•</span>
              <span className="text-white font-semibold">NewgenONE Hackathon</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              {t.team?.title || <>Meet Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">NexusNodes</span></>}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              {t.team?.subtitle || 'Engineering Autonomous Multi-Agent Intelligence on NewgenONE — Creators of TrustBridge: The Virtual Lok Adalat.'}
            </p>
          </div>

          {/* Quick Team Badge */}
          <div className="flex items-center gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-cyan-500/40 shadow-glow-cyan shrink-0">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30">
              <Award className="w-7 h-7" />
            </div>
            <div className="font-mono">
              <div className="text-[11px] text-slate-400">Team: <strong className="text-cyan-300">NexusNodes</strong></div>
              <div className="text-base font-bold text-white">Ragavendra M (Lead)</div>
              <div className="text-[10px] text-slate-400">+ Ashwin, Venkataraam, Sruthi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Leader Showcase (Prominent 3D Feature Card) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
          <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>{t.team?.leaderSection || 'Team Leadership'}</span>
        </div>

        {TEAM_MEMBERS.filter(m => m.id === 'ragavendra').map(leader => (
          <div 
            key={leader.id}
            className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-navy-950 to-void-950 shadow-2xl relative group hover:border-amber-400 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Leader Avatar & Title */}
              <div className="lg:col-span-4 flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-400 via-cyan-500 to-blue-600 p-0.5 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-4xl sm:text-5xl">
                      {leader.avatar}
                    </div>
                  </div>
                  <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1 rounded-full shadow-lg">
                    <Crown className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="inline-block text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    {leader.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono">
                    {leader.designation}
                  </p>
                </div>
              </div>

              {/* Leader Key Contributions */}
              <div className="lg:col-span-8 space-y-3">
                <div className="text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
                  Core Architectural Leadership & Vision:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {leader.contributions.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed font-sans">{c}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Domain Focus:</span>
                  {leader.skills.map((skill, i) => (
                    <span key={i} className="bg-slate-950 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Team Members Grid (3 Distinct 3D Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>{t.team?.specialistsSection || 'Specialized Engineering & Design Leads'}</span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            3 Cross-Functional Domain Specialists
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM_MEMBERS.filter(m => m.id !== 'ragavendra').map((member) => (
            <div
              key={member.id}
              className="glass-card-interactive p-6 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden group"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                  member.id === 'ashwin' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                  member.id === 'venkataraam' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>{member.badge}</span>
                </span>

                <div className="relative">
                  <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform block">
                    {member.avatar}
                  </span>
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 p-1 rounded-full shadow-lg">
                    <Crown className="w-3 h-3" />
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h4>
                <div className="text-xs font-mono text-cyan-400 mt-0.5">
                  {member.designation}
                </div>
              </div>

              {/* Contributions List */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Key Deliverables:</div>
                <div className="space-y-1.5">
                  {member.contributions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="pt-3 border-t border-slate-800/60 flex flex-wrap gap-1">
                {member.skills.map((s, i) => (
                  <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Vision & Collaboration Note */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold">{t.team?.builtFor || 'Built for the NewgenONE Problem Solving Track'}</div>
            <div>Designed and developed collaboratively by 👑 Ragavendra M, 👑 Ashwin M, 👑 Venkataraam VG, and 👑 Sruthi G.</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all shrink-0"
        >
          <span>{t.team?.exploreApp || 'Explore Live Prototype'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
