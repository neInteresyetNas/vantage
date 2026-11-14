'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { LANGS, useSettings } from '@/lib/settings';
import { useProgress } from '@/lib/useProgress';
export function Header() {
  const { t, lang, setLang, theme, toggleTheme } = useSettings(); const { user } = useProgress(); const path = usePathname();
  const [open, setOpen] = useState(false); const [online, setOnline] = useState(true);
  useEffect(() => { const u = () => setOnline(navigator.onLine); u(); addEventListener('online', u); addEventListener('offline', u); return () => { removeEventListener('online', u); removeEventListener('offline', u); }; }, []);
  useEffect(() => setOpen(false), [path]);
  const links: [string, Parameters<typeof t>[0]][] = [['/', 'home'], ['/tracker', 'tracker'], ['/statistics', 'stats'], ['/about', 'about'], ['/login', 'account']];
  return <><header className="sticky top-0 z-30 flex items-center gap-2 border-b border-zinc-800 bg-[#0b0b0c]/80 px-4 py-1 pt-[env(safe-area-inset-top)] backdrop-blur-md">
    <Link href="/" className="mr-2 flex items-center gap-2 font-black tracking-[.2em] text-amber-400"><span className="grid h-7 w-7 place-items-center rounded-md bg-amber-400 text-sm text-black">V</span>VANTAGE</Link>
    <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 top-12 z-30 w-full flex-col border-b border-zinc-800 bg-zinc-900 p-2 md:static md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0`}>
      {links.map(([h, k]) => <Link key={h} href={h} className={`px-3 py-3 text-xs font-bold ${path === h ? 'text-amber-400' : 'text-zinc-400 hover:text-amber-400'}`}>{t(k)}</Link>)}</nav>
    <div className="ml-auto flex items-center gap-1">
      <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} className="min-h-11 rounded-lg bg-zinc-800 px-2 text-xs font-bold">{LANGS.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}</select>
      <button aria-label="Toggle theme" onClick={toggleTheme} className="grid min-h-11 min-w-11 place-items-center rounded-lg hover:text-amber-400">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <Link href="/login" aria-label="Account" className="grid h-9 w-9 place-items-center rounded-full bg-amber-400 text-xs font-black text-black">{user?.email?.[0]?.toUpperCase() ?? '?'}</Link>
      <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid min-h-11 min-w-11 place-items-center md:hidden">{open ? <X /> : <Menu />}</button></div></header>
    {!online && <div role="status" className="bg-amber-400 px-4 py-1 text-center text-xs font-bold text-black">{t('offline')}</div>}</>;
}
