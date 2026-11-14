'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { STEPS, count, done, nextStep, pct, status, type WState } from '@/lib/progress';
import { CLASSES, type Weapon } from '@/data/mw4-weapons';
import { WeaponImg } from './CamoImage';
export const hueOf = (c: string) => CLASSES.indexOf(c) * 40 + 30;
export function WeaponCard({ w, s, i, onOpen }: { w: Weapon; s: WState; i: number; onOpen: (id: string) => void }) {
  const p = pct(s), h = hueOf(w.cls), d = done(s), full = p === 100;
  return <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 14) * 0.025 }} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => onOpen(w.id)}
    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 text-left shadow-lg shadow-black/20 transition-colors hover:border-amber-400/70">
    <div className="relative flex h-32 items-center justify-center" style={{ background: `radial-gradient(150px 90px at 50% 65%,hsl(${h} 70% 50% / .3),transparent),linear-gradient(160deg,#1f1f25,#111114)` }}>
      <span className="absolute left-3 top-2.5 text-[10px] font-black tracking-[.22em]" style={{ color: `hsl(${h} 85% 68%)` }}>{w.cls.toUpperCase()}</span>
      {full && <span className="absolute right-3 top-2.5 grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-black"><Check size={14} strokeWidth={4} /></span>}
      <WeaponImg id={w.id} name={w.name} /></div>
    <div className="p-3.5">
      <div className="flex items-baseline justify-between gap-2"><h3 className="truncate font-bold">{w.name}</h3><b className={full ? 'text-emerald-400' : 'text-amber-400'}>{p}%</b></div>
      <div className="mt-2 flex gap-[3px]" aria-hidden>{Array.from({ length: STEPS }, (_, k) => <i key={k} className={`h-1.5 flex-1 rounded-sm ${k < d ? (full ? 'bg-emerald-400' : 'bg-amber-400') : 'bg-zinc-700/70'}`} />)}</div>
      <p className="mt-2 text-xs text-zinc-400">{status(s)} · {count(s)}/11 camos{!full && <> · Next: <span className="text-zinc-200">{nextStep(s)}</span></>}</p>
    </div></motion.button>;
}
