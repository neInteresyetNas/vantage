'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// Add a language: copy an object below and translate; add the key to LANGS.
const D = {
  en: { home: 'HOME', tracker: 'CAMO TRACKER', stats: 'STATISTICS', about: 'ABOUT', account: 'ACCOUNT', tag: 'TRACK EVERY CAMO. COMPLETE EVERY CHALLENGE.', open: 'OPEN TRACKER', offline: 'OFFLINE — progress still saves on this device' },
  ru: { home: 'ГЛАВНАЯ', tracker: 'ТРЕКЕР', stats: 'СТАТИСТИКА', about: 'О ПРОЕКТЕ', account: 'АККАУНТ', tag: 'ОТСЛЕЖИВАЙ КАЖДЫЙ КАМУФЛЯЖ. ВЫПОЛНЯЙ КАЖДОЕ ИСПЫТАНИЕ.', open: 'ОТКРЫТЬ ТРЕКЕР', offline: 'ОФФЛАЙН — прогресс сохраняется на устройстве' },
} as const;
export const LANGS = Object.keys(D) as (keyof typeof D)[];
type K = keyof typeof D.en;
type S = { lang: keyof typeof D; setLang: (l: keyof typeof D) => void; theme: string; toggleTheme: () => void; t: (k: K) => string };
const C = createContext<S>(null as never);
export const useSettings = () => useContext(C);
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<keyof typeof D>('en'); const [theme, setTheme] = useState('dark');
  useEffect(() => { try { const l = localStorage.getItem('vantage-lang') as keyof typeof D; if (l && D[l]) setLang(l); setTheme(localStorage.getItem('vantage-theme') || 'dark'); } catch {} }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.lang = lang; try { localStorage.setItem('vantage-theme', theme); localStorage.setItem('vantage-lang', lang); } catch {} }, [theme, lang]);
  return <C.Provider value={{ lang, setLang, theme, toggleTheme: () => setTheme((x) => (x === 'dark' ? 'light' : 'dark')), t: (k) => D[lang][k] }}>{children}</C.Provider>;
}
