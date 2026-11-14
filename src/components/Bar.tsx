'use client';
import { motion } from 'framer-motion';
export const Bar = ({ p, h = 6 }: { p: number; h?: number }) => (
  <div className="mt-2 overflow-hidden rounded-full bg-zinc-800" style={{ height: h }}><motion.div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-300" initial={{ width: 0 }} animate={{ width: `${p}%` }} transition={{ duration: 0.7, ease: 'easeOut' }} /></div>);
