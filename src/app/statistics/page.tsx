'use client';
import { useState } from 'react';
import { Bar } from '@/components/Bar';
import { Donut } from '@/components/Donut';
import { useProgress } from '@/lib/useProgress';
import { totals, STEPS } from '@/lib/progress';
import { CLASSES, IDS, WEAPONS } from '@/data/mw4-weapons';
export default function Stats() {
  const { progress, setProgress, importJson, exportJson } = useProgress(); const [ta, setTa] = useState(''); const [msg, setMsg] = useState(''); const [arm, setArm] = useState(false);
  const t = totals(progress, IDS);
  const cls = CLASSES.map((c) => { const ids = WEAPONS.filter((w) => w.cls === c).map((w) => w.id), x = totals(progress, ids); return { c, d: x.d, tot: x.total, p: Math.round((x.d / x.total) * 100) }; });
  const best = [...cls].sort((a, b) => b.p - a.p)[0], most = [...cls].sort((a, b) => b.tot - b.d - (a.tot - a.d))[0];
  const R = ({ n, d, tot }: { n: string; d: number; tot: number }) => <div className="my-2 grid grid-cols-[110px_1fr_auto] items-center gap-3 text-sm"><span>{n}</span><Bar p={Math.round((d / tot) * 100)} /><b>{d}/{tot}</b></div>;
  const box = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-5'; const btn = 'min-h-11 rounded-xl border border-zinc-700 px-4 text-xs font-bold';
  return <div className="space-y-5">
    <section className={box}><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{[[`${Math.round((t.d / t.total) * 100)}%`, 'MW4 overall'], [t.d, 'Done'], [t.total - t.d, 'Remaining'], [t.cw, 'Weapons complete'], [best.c, 'Most complete class'], [most.c, 'Most left']].map(([v, l]) => <div key={l as string}><b className="text-2xl">{v}</b><div className="text-xs text-zinc-400">{l}</div></div>)}</div></section>
    <section className={box}><Donut data={cls.map((x) => ({ label: x.c, value: x.d }))} /></section>
    <section className={box}><R n="Gold" d={t.G} tot={33} /><R n="Platinum" d={t.P} tot={33} /><R n="Harmonic Break" d={t.H} tot={33} /><R n="Divergence" d={Math.min(t.H, 33)} tot={33} /></section>
    <section className={box}>{cls.map((x) => <R key={x.c} n={x.c} d={x.d} tot={x.tot} />)}</section>
    <section className={box}><R n="Done" d={t.d} tot={t.total} /><R n="Remaining" d={t.total - t.d} tot={t.total} /><p className="text-xs text-zinc-500">{STEPS} steps per weapon: 11 camos + Platinum + Harmonic Break (Gold is automatic).</p></section>
    <section className={box}><h2 className="mb-2 text-xs font-bold tracking-widest text-zinc-400">DATA</h2><textarea aria-label="Progress JSON" value={ta} onChange={(e) => setTa(e.target.value)} className="min-h-28 w-full rounded-xl border border-zinc-800 bg-zinc-800 p-2 font-mono text-xs" />
      <div className="mt-2 flex flex-wrap gap-2"><button className={btn} onClick={() => { const j = exportJson(); setTa(j); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([j], { type: 'application/json' })); a.download = 'vantage-mw4-progress.json'; a.click(); }}>EXPORT JSON</button>
        <label className={`${btn} inline-flex cursor-pointer items-center`}>IMPORT FILE<input type="file" accept="application/json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setMsg(importJson(await f.text()) ? 'Imported and merged.' : 'Invalid file.'); }} /></label>
        <button className={btn} onClick={() => setMsg(importJson(ta) ? 'Imported and merged.' : 'Invalid JSON.')}>IMPORT PASTED</button>
        <button className={`${btn} border-red-500 text-red-400`} onClick={() => { if (!arm) return setArm(true); setProgress(() => ({})); setArm(false); setMsg('Progress reset.'); }}>{arm ? 'CLICK AGAIN TO CONFIRM' : 'RESET ALL'}</button></div><p role="status" className="mt-2 text-xs text-amber-400">{msg}</p></section></div>;
}
