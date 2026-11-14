import Link from 'next/link';
export default function NotFound() {
  return <div className="py-24 text-center"><div className="text-7xl font-black text-amber-400">404</div><p className="my-3 text-zinc-400">This page does not exist.</p><Link href="/tracker" className="inline-flex min-h-11 items-center rounded-xl bg-amber-400 px-5 text-sm font-bold text-black">BACK TO TRACKER</Link></div>;
}
