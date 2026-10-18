'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'calibro-theme';
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeValue, setThemeValueState] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed = stored !== null ? parseFloat(stored) : NaN;
      if (!Number.isNaN(parsed)) setThemeValueState(Math.min(1, Math.max(0, parsed)));
    } catch (_) {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(STORAGE_KEY, String(themeValue)); } catch (_) {}
  }, [themeValue, hydrated]);

  const setThemeValue = useCallback((v) => {
    setThemeValueState(Math.min(1, Math.max(0, v)));
  }, []);

  const theme = themeValue >= 0.5 ? 'dark' : 'light';
  return (
    <ThemeContext.Provider value={{ theme, themeValue, setThemeValue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
