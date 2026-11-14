'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@/lib/useProgress';
import { CAMOS, count, norm, pct, status } from '@/lib/progress';
import { camoRows, masteryText, type Weapon } from '@/data/mw4-weapons';
import { Bar } from './Bar';
import { CamoImage } from './CamoImage';
export function WeaponModal({ w, onClose }: { w: Weapon; onClose: () => void }) {
  const { progress, setProgress } = useProgress(); const s = norm(progress[w.id]); const [arm, setArm] = useState(false); const [msg, setMsg] = useState('');
  const upd = (f: (s: ReturnType<typeof norm>) => void) => setProgress((p) => { const n = norm(p[w.id]); f(n); return { ...p, [w.id]: norm(n) }; });
  const rows = camoRows(w.id), mt = masteryText(w.id);
  const Row = ({ t, on, onClick, k, i, note }: { t: string; on: boolean; onClick: () => void; k: string; i: number; note?: string }) => (
    <button onClick={onClick} className={`mb-1.5 flex min-h-[56px] w-full items-center gap-3 rounded-xl border px-3 text-left ${on ? 'border-emerald-400' : 'border-zinc-800'} bg-zinc-800/60`}>
      <CamoImage k={k} i={i} size={44} /><span className="flex-1">{t}<em className="block text-[11px] not-italic text-zinc-400">{note}</em></span>
      <span className={`grid h-6 w-6 place-items-center rounded-md border-2 font-black text-black ${on ? 'border-emerald-400 bg-emerald-400' : 'border-zinc-600'}`}>{on ? '✓' : ''}</span></button>);
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-20 flex items-end justify-center bg-black/70 sm:items-center" onClick={onClose}>
    <motion.div initial={{ y: 40 }} animate={{ y: 0 }} role="dialog" aria-label={w.name} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-xl overflow-auto rounded-t-3xl border border-zinc-800 bg-zinc-900 p-4 sm:rounded-3xl">
      <div className="flex justify-between"><div><h2 className="text-2xl font-black">{w.name}</h2><p className="text-xs text-zinc-400">{w.cls} · {pct(s)}% · {status(s)}</p></div><button onClick={onClose} className="min-h-11 rounded-lg border border-zinc-700 px-4 text-xs font-bold">CLOSE</button></div>
      <Bar p={pct(s)} /><h3 className="mb-2 mt-5 text-xs font-bold tracking-widest text-zinc-400">MILITARY & SPECIAL CAMOS</h3>
      {rows.map((r, i) => <Row key={i} t={r.name} on={!!s.m[i]} k={r.key} i={i} note={r.text} onClick={() => upd((n) => { n.m[i] ^= 1; })} />)}
      <h3 className="mb-2 mt-5 text-xs font-bold tracking-widest text-zinc-400">MASTERY</h3>
      <Row t="Gold" on={!!s.g} k="gold" i={1} note={mt.gold} onClick={() => count(s) < CAMOS ? setMsg('Finish all 11 camos first.') : upd((n) => { n.g ^= 1; })} />
      <Row t="Platinum" on={!!s.p} k="platinum" i={2} note={mt.plat} onClick={() => !s.g ? setMsg('Gold first.') : upd((n) => { n.p ^= 1; })} />
      <Row t="Harmonic Break" on={!!s.h} k="harmonic-break" i={3} note={mt.hb} onClick={() => !s.p ? setMsg('Platinum first.') : upd((n) => { n.h ^= 1; })} />
      <p role="status" className="min-h-5 text-xs text-amber-400">{msg}</p>
      <button onClick={() => { if (!arm) return setArm(true); upd((n) => { n.m.fill(0); n.g = 0; n.p = 0; n.h = 0; }); setArm(false); }} className="mt-2 min-h-11 rounded-lg border border-red-500 px-4 text-xs font-bold text-red-400">{arm ? 'CLICK AGAIN TO CONFIRM' : 'RESET THIS WEAPON'}</button>
    </motion.div></motion.div>;
}
