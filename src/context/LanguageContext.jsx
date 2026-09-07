import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, LANGUAGES, VERNACULAR_AUDIO_SAMPLES } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('trustbridge_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('trustbridge_lang', currentLang);
  }, [currentLang]);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentAudioSample = VERNACULAR_AUDIO_SAMPLES[currentLang] || VERNACULAR_AUDIO_SAMPLES.hi;

  return (
    <LanguageContext.Provider value={{
      currentLang,
      setCurrentLang,
      t,
      languages: LANGUAGES,
      currentAudioSample,
      vernacularSamples: VERNACULAR_AUDIO_SAMPLES
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
