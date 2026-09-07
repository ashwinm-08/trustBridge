import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trustbridge_theme');
      if (saved === 'light' || saved === 'dark' || saved === 'mixed') return saved;
    }
    return 'mixed'; // Default to the signature Mixed (Cyber-Aurora) theme!
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'mixed');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    localStorage.setItem('trustbridge_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'mixed';
      return 'dark';
    });
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        toggleTheme, 
        isDark: theme === 'dark', 
        isLight: theme === 'light',
        isMixed: theme === 'mixed'
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
