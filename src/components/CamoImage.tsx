'use client';
import { useState } from 'react';
const grad = (i: number) => `linear-gradient(135deg,hsl(${(i * 47 + 20) % 360} 60% 38%),hsl(${(i * 47 + 70) % 360} 70% 16%))`;
/** Background-image tile: a missing file silently falls back to a generated gradient (never a broken image). */
export function Tile({ k, i = 0, className = '' }: { k: string; i?: number; className?: string }) {
  return <div aria-hidden className={`bg-cover bg-center ${className}`} style={{ backgroundImage: `url(/camos/${k}.webp), ${grad(i)}` }} />;
}
export function WeaponImg({ id, name }: { id: string; name: string }) {
  const [bad, setBad] = useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return bad ? <span aria-hidden className="select-none text-3xl font-black tracking-wider text-white/10">{name.slice(0, 7).toUpperCase()}</span>
    : // eslint-disable-next-line @next/next/no-img-element
    <img src={`/weapons/${id}.webp`} alt={name} loading="lazy" decoding="async" onError={() => setBad(true)} className="max-h-24 w-auto max-w-[85%] object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,.6)]" />;
}
