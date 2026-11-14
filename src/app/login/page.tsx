'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useProgress } from '@/lib/useProgress';
export default function Login() {
  const { user, sync } = useProgress(); const [email, setE] = useState(''); const [pw, setP] = useState(''); const [msg, setM] = useState('');
  const inp = 'min-h-11 w-full rounded-xl border border-zinc-800 bg-zinc-800 px-3', btn = 'min-h-11 rounded-xl border border-zinc-700 px-4 text-xs font-bold';
  if (!supabase) return <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"><h1 className="text-xl font-black">Local mode</h1><p className="mt-2 text-sm text-zinc-400">Cloud accounts are not configured. Progress is saved on this device only. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see README).</p></div>;
  const run = async (k: 'in' | 'up' | 'reset') => { setM('');
    const r = k === 'in' ? await supabase!.auth.signInWithPassword({ email, password: pw }) : k === 'up' ? await supabase!.auth.signUp({ email, password: pw }) : await supabase!.auth.resetPasswordForEmail(email, { redirectTo: location.origin + '/login' });
    setM(r.error ? r.error.message : k === 'in' ? 'Signed in.' : 'Check your email.'); };
  return <div className="max-w-sm space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"><h1 className="text-xl font-black">Account</h1>
    {user ? <><p className="text-sm">Signed in as {user.email}</p><p className="text-xs text-zinc-400">Sync: {sync}</p><button className={btn} onClick={() => supabase!.auth.signOut()}>SIGN OUT</button></> :
      <><input className={inp} type="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setE(e.target.value)} /><input className={inp} type="password" placeholder="Password" aria-label="Password" value={pw} onChange={(e) => setP(e.target.value)} />
        <div className="flex flex-wrap gap-2"><button className={`${btn} bg-amber-400 text-black`} onClick={() => run('in')}>SIGN IN</button><button className={btn} onClick={() => run('up')}>SIGN UP</button><button className={btn} onClick={() => run('reset')}>FORGOT PASSWORD</button></div></>}
    <p role="status" className="text-xs text-amber-400">{msg}</p></div>;
}
