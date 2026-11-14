export const CAMOS = 11, STEPS = 13, NEED_HB = 33;
export type WState = { m: number[]; p: number; h: number };
export type Progress = Record<string, WState>;
export const norm = (s?: Partial<WState>): WState => {
  const m = Array.from({ length: CAMOS }, (_, i) => (s?.m?.[i] ? 1 : 0));
  let p = s?.p ? 1 : 0, h = s?.h ? 1 : 0;
  if (m.includes(0)) p = 0;
  if (!p) h = 0;
  return { m, p, h };
};
export const count = (s: WState) => s.m.reduce((a, b) => a + b, 0);
export const done = (s: WState) => count(s) + s.p + s.h;
export const pct = (s: WState) => Math.round((done(s) / STEPS) * 100);
export const status = (s: WState) => { const p = pct(s); return p === 0 ? 'Not Started' : p === 100 ? 'Completed' : p >= 75 ? 'Almost Complete' : 'In Progress'; };
export const label = (i: number) => (i < 8 ? `Military ${i + 1}` : `Special ${i - 7}`);
export const nextStep = (s: WState) => { const i = s.m.indexOf(0); return i >= 0 ? label(i) : !s.p ? 'Platinum' : !s.h ? 'Harmonic Break' : 'Done'; };
export function totals(pr: Progress, ids: string[]) {
  let d = 0, G = 0, P = 0, H = 0, cw = 0;
  for (const id of ids) { const s = norm(pr[id]); d += done(s); if (count(s) === CAMOS) G++; P += s.p; H += s.h; if (done(s) === STEPS) cw++; }
  return { d, G, P, H, cw, total: ids.length * STEPS };
}
/** Union merge: never removes completed work from either side. */
export function merge(a: Progress, b: Progress): Progress {
  const out: Progress = {};
  for (const id of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const x = norm(a[id]), y = norm(b[id]);
    out[id] = norm({ m: x.m.map((v, i) => v | y.m[i]), p: x.p | y.p, h: x.h | y.h });
  }
  return out;
}
export function nextChallenge(pr: Progress, ws: { id: string; name: string }[]) {
  const best = (f: (s: WState) => boolean) => ws.filter((w) => f(norm(pr[w.id]))).sort((x, y) => done(norm(pr[y.id])) - done(norm(pr[x.id])))[0];
  const t = totals(pr, ws.map((w) => w.id));
  let w = best((s) => count(s) < CAMOS);
  if (w) return { id: w.id, text: `${w.name}: next ${nextStep(norm(pr[w.id]))} — ${CAMOS - count(norm(pr[w.id]))} camos to Gold` };
  if ((w = best((s) => !s.p))) return { id: w.id, text: `Mark Platinum on ${w.name} (${ws.length - t.P} weapons left)` };
  if ((w = best((s) => !s.h))) return { id: w.id, text: `Mark Harmonic Break on ${w.name} — ${NEED_HB - t.H} left until Divergence` };
  return { id: null, text: 'Everything complete. Divergence unlocked.' };
}
