'use client';
import Link from 'next/link';
import { Mastery } from '@/components/Mastery';
import { Bar } from '@/components/Bar';
import { useSettings } from '@/lib/settings';
import { useProgress } from '@/lib/useProgress';
import { nextChallenge, totals, NEED_HB } from '@/lib/progress';
import { IDS, WEAPONS } from '@/data/mw4-weapons';
export default function Home() {
  const { progress } = useProgress(); const { t: tr } = useSettings(); const t = totals(progress, IDS), p = Math.round((t.d / t.total) * 100), n = nextChallenge(progress, WEAPONS);
  return <div className="space-y-6">
    <section className="text-white rounded-3xl border border-zinc-800 bg-[radial-gradient(700px_260px_at_80%_-10%,#f5b81c33,transparent),linear-gradient(135deg,#17171a,#0d0d0f)] p-8 md:p-14">
      <h1 className="text-4xl font-black leading-none md:text-7xl">MODERN WARFARE 4<br /><span className="text-amber-400">CAMO TRACKER</span></h1>
      <p className="my-4 text-xs font-bold tracking-[.2em] text-zinc-400">{tr('tag')}</p>
      <Link href="/tracker" className="inline-flex min-h-11 items-center rounded-xl bg-amber-400 px-5 text-sm font-bold text-black">{tr('open')}</Link></section>
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="text-xs font-bold tracking-[.22em] text-zinc-400">MASTER CAMO PROGRESS</h2>
      <div className="text-6xl font-black text-amber-400">{p}%</div><Bar p={p} />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{[[t.d, 'Done'], [t.total - t.d, 'Remaining'], [`${t.cw}/${IDS.length}`, 'Weapons complete'], [Math.max(0, NEED_HB - t.H), 'Harmonic Breaks to Divergence']].map(([v, l]) => <div key={l as string}><b className="text-2xl">{v}</b><div className="text-xs text-zinc-400">{l}</div></div>)}</div></section>
    <Mastery />
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><b className="text-xs tracking-[.15em] text-amber-400">NEXT CHALLENGE</b><p className="mt-1">{n.text}</p></section></div>;
}
