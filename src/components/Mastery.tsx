'use client';
import { useProgress } from '@/lib/useProgress';
import { totals, NEED_HB } from '@/lib/progress';
import { IDS } from '@/data/mw4-weapons';
import { Bar } from './Bar';
import { CamoImage } from './CamoImage';
export function Mastery() {
  const { progress } = useProgress(); const t = totals(progress, IDS);
  const items = [['Gold', 'gold', t.G, 'Complete 11 Military & Special camos'], ['Platinum', 'platinum', t.P, 'Gold on every weapon in its class'], ['Harmonic Break', 'harmonic-break', t.H, 'Platinum on 33 weapons'], ['Divergence', 'divergence', t.H, 'Unlocks after 33 Harmonic Breaks']] as const;
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map(([n, k, c, d], i) => {
    const un = c >= NEED_HB, p = Math.round((c / NEED_HB) * 100);
    return <div key={n} className={`rounded-2xl border bg-zinc-900 p-4 ${n === 'Divergence' && un ? 'border-red-500 shadow-[0_0_40px_#ff5a4d55]' : 'border-zinc-800'}`}>
      <div className="flex items-center gap-3"><CamoImage k={k} i={i * 3 + 1} size={48} /><div><b>{n.toUpperCase()}</b><div className="text-[10px] font-bold tracking-widest text-amber-400">{un ? 'UNLOCKED' : c ? 'IN PROGRESS' : 'LOCKED'}</div></div></div>
      <p className="mt-2 text-xs text-zinc-400">{d}</p><p className="mt-1 text-sm"><b>{c}</b> / {NEED_HB} · {p}%</p><Bar p={p} /></div>; })}</div>;
}
