'use client';
import { useState } from 'react';
// Put your own images in public/camos/<key>.jpg (keys: military-1..8, special-1..3, gold, platinum, harmonic-break, divergence).
export function CamoImage({ k, i = 0, size = 40 }: { k: string; i?: number; size?: number }) {
  const [bad, setBad] = useState(false);
  const bg = `linear-gradient(135deg,hsl(${(i * 47 + 20) % 360} 60% 40%),hsl(${(i * 47 + 60) % 360} 70% 18%))`;
  return bad ? <div aria-hidden style={{ width: size, height: size, background: bg }} className="shrink-0 rounded-lg" />
    : // eslint-disable-next-line @next/next/no-img-element
    <img src={`/camos/${k}.jpg`} alt="" width={size} height={size} loading="lazy" onError={() => setBad(true)} className="shrink-0 rounded-lg object-cover" style={{ width: size, height: size }} />;
}

export function WeaponImg({ id }: { id: string }) {
  const [bad, setBad] = useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return bad ? null : <img src={`/weapons/${id}.webp`} alt="" loading="lazy" onError={() => setBad(true)} className="mb-2 h-16 w-full object-contain" />;
}
