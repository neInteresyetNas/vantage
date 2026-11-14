'use client';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { useProgress } from '@/lib/useProgress';
import { totals, NEED_HB } from '@/lib/progress';
import { IDS } from '@/data/mw4-weapons';
import { Bar } from './Bar';
import { Tile } from './CamoImage';
export function Mastery() {
  const { progress } = useProgress(); const t = totals(progress, IDS), n = IDS.length;
  const items = [['Gold', 'gold', t.G, n, 'Gold challenge on every weapon'], ['Platinum', 'platinum', t.P, n, 'Unlocks when every weapon of the class has Gold'], ['Harmonic Break', 'harmonic-break', t.H, n, `Unlocks after Platinum on ${NEED_HB} weapons`], ['Divergence', 'divergence', t.H, NEED_HB, `Complete ${NEED_HB} Harmonic Break challenges`]] as const;
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map(([name, k, c, max, d], i) => {
    const un = c >= max, p = Math.min(100, Math.round((c / max) * 100));
    return <motion.div key={name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={`overflow-hidden rounded-2xl border bg-zinc-900 ${name === 'Divergence' && un ? 'glow border-red-500' : 'border-zinc-800'}`}>
      <div className={`relative h-24 ${c ? '' : 'grayscale'}`}><Tile k={k} i={i * 3 + 1} className="absolute inset-0" /><div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        <span className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black tracking-widest ${un ? 'bg-emerald-400 text-black' : 'bg-black/60 text-amber-300'}`}>{un ? <Unlock size={11} /> : <Lock size={11} />}{un ? 'UNLOCKED' : c ? 'IN PROGRESS' : 'LOCKED'}</span></div>
      <div className="p-4 pt-1"><b className="tracking-wide">{name.toUpperCase()}</b><p className="text-xs text-zinc-400">{d}</p><p className="mt-2 text-sm"><b className="text-lg">{c}</b> / {max} <span className="text-zinc-400">· {p}%</span></p><Bar p={p} /></div></motion.div>; })}</div>;
}
