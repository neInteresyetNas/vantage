'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mastery } from '@/components/Mastery';
import { WeaponModal } from '@/components/WeaponModal';
import { Bar } from '@/components/Bar';
import { WeaponImg } from '@/components/CamoImage';
import { useProgress } from '@/lib/useProgress';
import { count, nextStep, norm, pct, status, STEPS } from '@/lib/progress';
import { CLASSES, WEAPONS } from '@/data/mw4-weapons';
const F0 = { q: '', c: 'All', s: 'All', o: 'alpha' };
export default function Tracker() {
  const { progress, ready } = useProgress(); const [f, setF] = useState(F0); const [open, setOpen] = useState<string | null>(null);
  const list = useMemo(() => {
    const P = (id: string) => pct(norm(progress[id]));
    const l = WEAPONS.filter((w) => (f.c === 'All' || w.cls === f.c) && w.name.toLowerCase().includes(f.q.trim().toLowerCase()) && (f.s === 'All' || status(norm(progress[w.id])) === f.s));
    const fin = (id: string) => Number(P(id) === 100);
    const o: Record<string, (a: typeof l[0], b: typeof l[0]) => number> = { alpha: (a, b) => a.name.localeCompare(b.name), pct: (a, b) => P(b.id) - P(a.id), inc: (a, b) => fin(a.id) - fin(b.id) || P(a.id) - P(b.id), alm: (a, b) => fin(a.id) - fin(b.id) || P(b.id) - P(a.id) };
    return l.sort(o[f.o]);
  }, [f, progress]);
  const w = WEAPONS.find((x) => x.id === open);
  const sel = 'min-h-11 rounded-xl border border-zinc-800 bg-zinc-800 px-3';
  if (!ready) return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-zinc-900" />)}</div>;
  return <div className="space-y-4"><Mastery />
    <div className="flex flex-wrap gap-2"><input aria-label="Search" type="search" placeholder="Search weapons…" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} className={`${sel} min-w-0 flex-1 basis-48`} />
      <select aria-label="Status" value={f.s} onChange={(e) => setF({ ...f, s: e.target.value })} className={sel}>{['All', 'Not Started', 'In Progress', 'Almost Complete', 'Completed'].map((x) => <option key={x}>{x}</option>)}</select>
      <select aria-label="Sort" value={f.o} onChange={(e) => setF({ ...f, o: e.target.value })} className={sel}><option value="alpha">A–Z</option><option value="pct">Progress %</option><option value="inc">Unfinished first</option><option value="alm">Almost done first</option></select>
      <button onClick={() => setF(F0)} className={`${sel} text-xs font-bold`}>CLEAR FILTERS</button></div>
    <div className="flex flex-wrap gap-1.5">{['All', ...CLASSES].map((c) => <button key={c} onClick={() => setF({ ...f, c })} className={`min-h-10 rounded-full border px-3 text-xs font-bold ${f.c === c ? 'border-amber-400 bg-amber-400 text-black' : 'border-zinc-800 bg-zinc-800'}`}>{c === 'All' ? 'All Weapons' : c}</button>)}</div>
    {list.length === 0 ? <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-zinc-400">No weapons match.</div> :
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{list.map((x) => { const s = norm(progress[x.id]); return (
        <motion.button layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }} key={x.id} onClick={() => setOpen(x.id)} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left hover:border-amber-400">
          <WeaponImg id={x.id} /><div className="flex items-center justify-between gap-2"><b>{x.name}</b><span className="text-[10px] font-bold tracking-wider text-amber-400">{status(s).toUpperCase()}</span></div>
          <p className="text-xs text-zinc-400">{x.cls} · {count(s)}/11 camos · {STEPS - (count(s) + s.p + s.h)} left</p><p className="mt-2 text-sm"><b>{pct(s)}%</b> <span className="text-xs text-zinc-400">Next: {nextStep(s)}</span></p><Bar p={pct(s)} /></motion.button>); })}</div>}
    {w && <WeaponModal w={w} onClose={() => setOpen(null)} />}</div>;
}
