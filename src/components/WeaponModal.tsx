'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useProgress } from '@/lib/useProgress';
import { CAMOS, count, norm, pct, status } from '@/lib/progress';
import { camoRows, masteryText, type Weapon } from '@/data/mw4-weapons';
import { Bar } from './Bar';
import { Tile, WeaponImg } from './CamoImage';
function T({ t, on, k, i, note, onClick, dim }: { t: string; on: boolean; k: string; i: number; note?: string; onClick: () => void; dim?: boolean }) {
  return <motion.button whileTap={{ scale: 0.97 }} onClick={onClick} aria-pressed={on} className={`relative overflow-hidden rounded-xl border bg-zinc-800/60 text-left transition-colors ${on ? 'border-emerald-400' : 'border-zinc-700 hover:border-amber-400/60'} ${dim ? 'opacity-55' : ''}`}>
    <Tile k={k} i={i} className={`aspect-[5/2] w-full ${on ? '' : 'saturate-[.6]'}`} />
    <div className="p-2"><div className="text-sm font-bold leading-tight">{t}</div>{note && <div className="mt-0.5 text-[11px] leading-snug text-zinc-400">{note}</div>}</div>
    {on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-black"><Check size={14} strokeWidth={4} /></motion.span>}</motion.button>;
}
export function WeaponModal({ w, onClose }: { w: Weapon; onClose: () => void }) {
  const { progress, setProgress } = useProgress(); const s = norm(progress[w.id]); const [arm, setArm] = useState(false); const [msg, setMsg] = useState('');
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); document.body.style.overflow = 'hidden'; addEventListener('keydown', k); return () => { document.body.style.overflow = ''; removeEventListener('keydown', k); }; }, [onClose]);
  const upd = (f: (s: ReturnType<typeof norm>) => void) => { setMsg(''); setProgress((p) => { const n = norm(p[w.id]); f(n); return { ...p, [w.id]: norm(n) }; }); };
  const rows = camoRows(w.id), mt = masteryText(w.id), all = count(s) === CAMOS;
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center" onClick={onClose}>
    <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 320 }} role="dialog" aria-modal="true" aria-label={w.name} onClick={(e) => e.stopPropagation()}
      className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-t-3xl border border-zinc-800 bg-zinc-900 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:rounded-3xl">
      <div className="flex items-center gap-4"><div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-xl bg-zinc-800/70"><WeaponImg id={w.id} name={w.name} /></div>
        <div className="min-w-0 flex-1"><h2 className="truncate text-2xl font-black">{w.name}</h2><p className="text-xs text-zinc-400">{w.cls} · {status(s)} · <b className="text-amber-400">{pct(s)}%</b></p><Bar p={pct(s)} h={8} /></div>
        <button onClick={onClose} aria-label="Close" className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-zinc-700 hover:border-amber-400"><X size={18} /></button></div>
      <h3 className="mb-2 mt-5 text-xs font-bold tracking-[.2em] text-zinc-400">MILITARY & SPECIAL CAMOS · {count(s)}/11</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{rows.map((r, i) => <T key={i} t={r.name} on={!!s.m[i]} k={r.key} i={i} note={r.text} onClick={() => upd((n) => { n.m[i] ^= 1; })} />)}</div>
      <h3 className="mb-2 mt-5 text-xs font-bold tracking-[.2em] text-zinc-400">MASTERY</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <T t="Gold" on={!!s.g} k="gold" i={1} note={mt.gold} dim={!all} onClick={() => all ? upd((n) => { n.g ^= 1; }) : setMsg('Finish all 11 camos first.')} />
        <T t="Platinum" on={!!s.p} k="platinum" i={2} note={mt.plat} dim={!s.g} onClick={() => s.g ? upd((n) => { n.p ^= 1; }) : setMsg('Complete Gold first.')} />
        <T t="Harmonic Break" on={!!s.h} k="harmonic-break" i={3} note={mt.hb} dim={!s.p} onClick={() => s.p ? upd((n) => { n.h ^= 1; }) : setMsg('Complete Platinum first.')} /></div>
      <p role="status" className="mt-2 min-h-5 text-xs font-bold text-amber-400">{msg}</p>
      <button onClick={() => { if (!arm) { setArm(true); setTimeout(() => setArm(false), 3000); return; } upd((n) => { n.m.fill(0); n.g = 0; n.p = 0; n.h = 0; }); setArm(false); }} className="mt-1 min-h-11 rounded-xl border border-red-500/70 px-4 text-xs font-bold text-red-400">{arm ? 'CLICK AGAIN TO CONFIRM' : 'RESET THIS WEAPON'}</button>
    </motion.div></motion.div>;
}
