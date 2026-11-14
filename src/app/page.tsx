'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Mastery } from '@/components/Mastery';
import { Bar } from '@/components/Bar';
import { CountUp } from '@/components/CountUp';
import { Reveal } from '@/components/Reveal';
import { useSettings } from '@/lib/settings';
import { useProgress } from '@/lib/useProgress';
import { nextChallenge, totals, NEED_HB } from '@/lib/progress';
import { IDS, WEAPONS } from '@/data/mw4-weapons';
export default function Home() {
  const { progress } = useProgress(); const { t: tr } = useSettings(); const t = totals(progress, IDS), p = Math.round((t.d / t.total) * 100), n = nextChallenge(progress, WEAPONS);
  const stats: [number, string][] = [[t.d, 'Challenges done'], [t.total - t.d, 'Remaining'], [t.cw, 'Weapons complete'], [Math.max(0, NEED_HB - t.H), 'Harmonic Breaks to Divergence']];
  return <div className="space-y-8">
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 p-8 text-white md:p-16" style={{ background: 'linear-gradient(135deg,#18181c,#0a0a0c)' }}>
      <div className="blob pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'repeating-linear-gradient(135deg,#fff 0 1px,transparent 1px 14px)' }} />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative text-xs font-black tracking-[.35em] text-amber-400">MODERN WARFARE 4</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative mt-2 text-5xl font-black leading-[.95] md:text-8xl">CAMO<br /><span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">TRACKER</span></motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="relative my-5 max-w-md text-xs font-bold tracking-[.2em] text-zinc-400 md:text-sm">{tr('tag')}</motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="relative"><Link href="/tracker" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-amber-400 px-6 text-sm font-black text-black transition-transform hover:scale-[1.03]">{tr('open')} <ArrowRight size={18} /></Link></motion.div></section>
    <Reveal><section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"><h2 className="text-xs font-bold tracking-[.25em] text-zinc-400">MASTER CAMO PROGRESS</h2>
      <div className="mt-1 text-6xl font-black text-amber-400 md:text-7xl"><CountUp v={p} suffix="%" /></div><Bar p={p} h={10} />
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">{stats.map(([v, l]) => <div key={l}><b className="text-3xl"><CountUp v={v} /></b><div className="text-xs text-zinc-400">{l}</div></div>)}</div></section></Reveal>
    <Reveal><h2 className="mb-3 text-xs font-bold tracking-[.25em] text-zinc-400">MASTERY CAMOS</h2><Mastery /></Reveal>
    <Reveal><section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5"><div><b className="text-xs tracking-[.2em] text-amber-400">NEXT CHALLENGE</b><p className="mt-1">{n.text}</p></div><Link href="/tracker" className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-amber-400 px-4 text-xs font-black text-amber-400">OPEN <ArrowRight size={14} /></Link></section></Reveal></div>;
}
