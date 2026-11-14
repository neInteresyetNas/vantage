'use client';
import { motion } from 'framer-motion';
export const Bar = ({ p }: { p: number }) => (
  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800"><motion.div className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-400" initial={false} animate={{ width: `${p}%` }} transition={{ duration: 0.5 }} /></div>);
