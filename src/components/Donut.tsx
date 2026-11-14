'use client';
import { useState } from 'react';
export function Donut({ data }: { data: { label: string; value: number }[] }) {
  const [hi, setHi] = useState<number | null>(null); const tot = data.reduce((a, d) => a + d.value, 0) || 1; let acc = 0; const R = 70, C = 2 * Math.PI * R;
  return <div className="flex flex-wrap items-center gap-6"><svg viewBox="0 0 200 200" className="h-48 w-48" role="img" aria-label="Completed challenges by class">
    {data.map((d, i) => { const len = (d.value / tot) * C, off = -acc; acc += len; return <circle key={d.label} cx="100" cy="100" r={R} fill="none" strokeWidth={hi === i ? 30 : 24} stroke={`hsl(${i * 40 + 30} 75% 55%)`} strokeDasharray={`${len} ${C - len}`} strokeDashoffset={off} transform="rotate(-90 100 100)" onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} style={{ transition: 'stroke-width .2s' }} />; })}
    <text x="100" y="96" textAnchor="middle" fontSize="12" fill="currentColor">{hi === null ? 'Done' : data[hi].label}</text><text x="100" y="118" textAnchor="middle" fontSize="22" fontWeight="900" fill="currentColor">{hi === null ? tot : data[hi].value}</text></svg>
    <ul className="grid grid-cols-2 gap-x-4 text-xs">{data.map((d, i) => <li key={d.label} className="flex items-center gap-2 py-1" onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}><i className="h-3 w-3 rounded-sm" style={{ background: `hsl(${i * 40 + 30} 75% 55%)` }} />{d.label}: {d.value}</li>)}</ul></div>;
}
