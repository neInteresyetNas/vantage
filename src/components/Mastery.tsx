'use client';
import { useProgress } from '@/lib/useProgress';
import { totals, NEED_HB } from '@/lib/progress';
import { IDS } from '@/data/mw4-weapons';
import { Bar } from './Bar';
import { CamoImage } from './CamoImage';
export function Mastery() {
  const { progress } = useProgress(); const t = totals(progress, IDS), n = IDS.length;
  const items = [['Gold', 'gold', t.G, n, 'Gold challenge on every weapon'], ['Platinum', 'platinum', t.P, n, 'Unlocks when every weapon of the class has Gold'], ['Harmonic Break', 'harmonic-break', t.H, n, `Unlocks after Platinum on ${NEED_HB} weapons`], ['Divergence', 'divergence', t.H, NEED_HB, `Complete ${NEED_HB} Harmonic Break challenges`]] as const;
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map(([name, k, c, max, d], i) => {
    const un = c >= max, p = Math.min(100, Math.round((c / max) * 100));
    return <div key={name} className={`rounded-2xl border bg-zinc-900 p-4 ${name === 'Divergence' && un ? 'border-red-500 shadow-[0_0_40px_#ff5a4d55]' : 'border-zinc-800'}`}>
      <div className="flex items-center gap-3"><CamoImage k={k} i={i * 3 + 1} size={56} /><div><b>{name.toUpperCase()}</b><div className="text-[10px] font-bold tracking-widest text-amber-400">{un ? 'UNLOCKED' : c ? 'IN PROGRESS' : 'LOCKED'}</div></div></div>
      <p className="mt-2 text-xs text-zinc-400">{d}</p><p className="mt-1 text-sm"><b>{c}</b> / {max} · {p}%</p><Bar p={p} /></div>; })}</div>;
}
