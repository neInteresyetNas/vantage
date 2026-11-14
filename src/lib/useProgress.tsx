'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { IDS } from '@/data/mw4-weapons';
import { merge, norm, type Progress } from './progress';
const KEY = 'vantage-mw4-v1';
export type Sync = 'local' | 'syncing' | 'synced' | 'error';
type Ctx = { progress: Progress; ready: boolean; user: User | null; sync: Sync; setProgress: (f: (p: Progress) => Progress) => void; importJson: (t: string) => boolean; exportJson: () => string };
const C = createContext<Ctx>(null as never);
export const useProgress = () => useContext(C);
const clean = (p: Progress) => Object.fromEntries(IDS.map((id) => [id, norm(p[id])])) as Progress;
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, set] = useState<Progress>(() => clean({}));
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sync, setSync] = useState<Sync>('local');
  const synced = useRef(false), timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => { try { set(clean(JSON.parse(localStorage.getItem(KEY) || '{}'))); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch {} }, [progress, ready]);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => { synced.current = false; setUser(s?.user ?? null); });
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => { // pull + merge + push once per login
    if (!supabase || !user || !ready) { setSync('local'); return; }
    setSync('syncing');
    supabase.from('progress').select('data').eq('user_id', user.id).maybeSingle().then(async ({ data, error }) => {
      if (error) return setSync('error');
      const merged = clean(merge(progress, (data?.data ?? {}) as Progress));
      set(merged);
      const r = await supabase!.from('progress').upsert({ user_id: user.id, data: merged, updated_at: new Date().toISOString() });
      synced.current = !r.error; setSync(r.error ? 'error' : 'synced');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, ready]);
  useEffect(() => { // debounced push on change
    if (!supabase || !user || !synced.current) return;
    clearTimeout(timer.current); setSync('syncing');
    timer.current = setTimeout(async () => {
      const r = await supabase!.from('progress').upsert({ user_id: user.id, data: progress, updated_at: new Date().toISOString() });
      setSync(r.error ? 'error' : 'synced');
    }, 800);
  }, [progress, user]);
  const setProgress = useCallback((f: (p: Progress) => Progress) => set((p) => clean(f(p))), []);
  const importJson = (t: string) => { try { const j = JSON.parse(t); if (!j?.data) return false; set((p) => clean(merge(p, j.data))); return true; } catch { return false; } };
  const exportJson = () => JSON.stringify({ v: 1, game: 'mw4', data: progress });
  return <C.Provider value={{ progress, ready, user, sync, setProgress, importJson, exportJson }}>{children}</C.Provider>;
}
