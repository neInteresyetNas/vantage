import { describe, expect, it } from 'vitest';
import { merge, norm, totals } from '../src/lib/progress';
const full = { m: Array(11).fill(1), p: 1, h: 1 };
describe('progress', () => {
  it('requires Gold before Platinum and Platinum before HB', () => { expect(norm({ m: Array(10).fill(1), p: 1, h: 1 })).toMatchObject({ p: 0, h: 0 }); expect(norm({ m: Array(11).fill(1), h: 1 }).h).toBe(0); });
  it('counts totals', () => { const t = totals({ a: full }, ['a', 'b']); expect(t).toMatchObject({ d: 13, G: 1, P: 1, H: 1, cw: 1, total: 26 }); });
  it('merge never loses progress', () => { const r = merge({ a: norm({ m: [1] }) }, { a: norm({ m: [0, 1] }) }); expect(r.a.m.slice(0, 2)).toEqual([1, 1]); });
});
