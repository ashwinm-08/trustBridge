import React, { useState } from 'react';
import Header from './components/Header';
import NewgenPillarBar from './components/NewgenPillarBar';
import GuidedDemoBar from './components/GuidedDemoBar';
import ScreenHero from './components/ScreenHero';
import ScreenIntake from './components/ScreenIntake';
import ScreenLokAdalat from './components/ScreenLokAdalat';
import ScreenGhostGrievance from './components/ScreenGhostGrievance';
import ScreenRegulatory from './components/ScreenRegulatory';
import ScreenArchitecture from './components/ScreenArchitecture';
import ScreenImpact from './components/ScreenImpact';
import ScreenPresentation from './components/ScreenPresentation';
import ScreenTeam from './components/ScreenTeam';
import SubmissionCriteriaModal from './components/SubmissionCriteriaModal';
import { PERSONAS } from './data/scenarios';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('hero');
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [isCodeRed, setIsCodeRed] = useState(true);
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);

  const handleSelectPersona = (persona) => {
    setActivePersona(persona);
    setIsCodeRed(persona.distress >= 85);
  };

  const handleResetCase = () => {
    setActivePersona(PERSONAS[0]);
    setIsCodeRed(true);
    setCurrentScreen('hero');
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-void-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300">
        
        {/* Top Header Navigation */}
        <Header
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          activePersona={activePersona}
          isCodeRed={isCodeRed}
          onResetCase={handleResetCase}
          onOpenCriteria={() => setIsCriteriaOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 transition-all">
          {/* 1-Click Guided Demo Tour for Evaluators */}
          <GuidedDemoBar 
            currentScreen={currentScreen} 
            onNavigate={setCurrentScreen} 
          />

          {currentScreen === 'hero' && (
            <ScreenHero
              onSelectPersona={handleSelectPersona}
              onNavigate={setCurrentScreen}
              activePersona={activePersona}
              onOpenCriteria={() => setIsCriteriaOpen(true)}
            />
          )}

          {currentScreen === 'intake' && (
            <ScreenIntake
              activePersona={activePersona}
              onSelectPersona={handleSelectPersona}
              onProceedToLokAdalat={() => setCurrentScreen('lok-adalat')}
              isCodeRed={isCodeRed}
              setIsCodeRed={setIsCodeRed}
            />
          )}

          {currentScreen === 'lok-adalat' && (
            <ScreenLokAdalat
              activePersona={activePersona}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'ghost-grievance' && (
            <ScreenGhostGrievance
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'regulatory' && (
            <ScreenRegulatory
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'architecture' && (
            <ScreenArchitecture
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'impact' && (
            <ScreenImpact
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'presentation' && (
            <ScreenPresentation
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'team' && (
            <ScreenTeam
              onNavigate={setCurrentScreen}
            />
          )}
        </main>

        {/* Persistent NewgenONE 4-Pillars Ribbon */}
        <NewgenPillarBar currentScreen={currentScreen} />

        {/* Submission Criteria Master Modal */}
        <SubmissionCriteriaModal
          isOpen={isCriteriaOpen}
          onClose={() => setIsCriteriaOpen(false)}
          onNavigate={setCurrentScreen}
        />

      </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
