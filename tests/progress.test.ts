import { describe, expect, it } from 'vitest';
import { merge, norm, totals } from '../src/lib/progress';
const full = { m: Array(11).fill(1), g: 1, p: 1, h: 1 };
describe('progress', () => {
  it('chain: camos -> Gold -> Platinum -> HB', () => { expect(norm({ m: Array(10).fill(1), g: 1, p: 1, h: 1 })).toMatchObject({ g: 0, p: 0, h: 0 }); expect(norm({ m: Array(11).fill(1), p: 1 }).p).toBe(1); expect(norm({ m: Array(11).fill(1), g: 0, h: 1 }).h).toBe(0); });
  it('migrates old saves without g', () => { expect(norm({ m: Array(11).fill(1), p: 1 }).g).toBe(1); });
  it('counts totals', () => { expect(totals({ a: full }, ['a', 'b'])).toMatchObject({ d: 14, G: 1, P: 1, H: 1, cw: 1, total: 28 }); });
  it('merge never loses progress', () => { const r = merge({ a: norm({ m: [1] }) }, { a: norm({ m: [0, 1] }) }); expect(r.a.m.slice(0, 2)).toEqual([1, 1]); });
});
