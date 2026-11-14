'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Mastery } from '@/components/Mastery';
import { WeaponModal } from '@/components/WeaponModal';
import { WeaponCard } from '@/components/WeaponCard';
import { Bar } from '@/components/Bar';
import { useProgress } from '@/lib/useProgress';
import { norm, pct, status, totals } from '@/lib/progress';
import { CLASSES, IDS, WEAPONS } from '@/data/mw4-weapons';
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
  const w = WEAPONS.find((x) => x.id === open); const t = totals(progress, IDS);
  const sel = 'min-h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-sm';
  if (!ready) return <div className="space-y-4"><div className="h-40 animate-pulse rounded-2xl bg-zinc-900" /><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className="h-52 animate-pulse rounded-2xl bg-zinc-900" />)}</div></div>;
  return <div className="space-y-5"><Mastery />
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"><div className="flex justify-between text-sm"><b>MW4 overall</b><span className="text-zinc-400">{t.d} / {t.total} · {t.cw} weapons complete</span></div><Bar p={Math.round((t.d / t.total) * 100)} h={8} /></div>
    <div className="flex flex-wrap gap-2"><label className="relative min-w-0 flex-1 basis-52"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input aria-label="Search" type="search" placeholder="Search weapons…" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} className={`${sel} w-full pl-9`} /></label>
      <select aria-label="Status" value={f.s} onChange={(e) => setF({ ...f, s: e.target.value })} className={sel}>{['All', 'Not Started', 'In Progress', 'Almost Complete', 'Completed'].map((x) => <option key={x}>{x}</option>)}</select>
      <select aria-label="Sort" value={f.o} onChange={(e) => setF({ ...f, o: e.target.value })} className={sel}><option value="alpha">A–Z</option><option value="pct">Progress %</option><option value="inc">Unfinished first</option><option value="alm">Almost done first</option></select>
      <button onClick={() => setF(F0)} className={`${sel} text-xs font-bold hover:border-amber-400`}>CLEAR FILTERS</button></div>
    <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1">{['All', ...CLASSES].map((c) => <button key={c} onClick={() => setF({ ...f, c })} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-bold transition-colors ${f.c === c ? 'border-amber-400 bg-amber-400 text-black' : 'border-zinc-800 bg-zinc-900 hover:border-amber-400/60'}`}>{c === 'All' ? 'All Weapons' : c}</button>)}</div>
    {list.length === 0 ? <div className="rounded-2xl border border-dashed border-zinc-700 p-12 text-center text-zinc-400">No weapons match these filters.<br /><button onClick={() => setF(F0)} className={`${sel} mt-4 text-xs font-bold`}>CLEAR FILTERS</button></div> :
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((x, i) => <WeaponCard key={x.id} w={x} s={norm(progress[x.id])} i={i} onOpen={setOpen} />)}</div>}
    <AnimatePresence>{w && <WeaponModal key={w.id} w={w} onClose={() => setOpen(null)} />}</AnimatePresence></div>;
}
