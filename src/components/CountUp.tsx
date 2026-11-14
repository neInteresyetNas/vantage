'use client';
import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
export function CountUp({ v, suffix = '' }: { v: number; suffix?: string }) {
  const r = useRef<HTMLSpanElement>(null), prev = useRef(0);
  useEffect(() => { const c = animate(prev.current, v, { duration: 0.8, onUpdate: (x) => { if (r.current) r.current.textContent = Math.round(x) + suffix; } }); prev.current = v; return () => c.stop(); }, [v, suffix]);
  return <span ref={r}>{v}{suffix}</span>;
}
