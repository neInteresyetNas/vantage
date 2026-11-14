export default function About() {
  return <div className="max-w-2xl space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-sm leading-relaxed"><h1 className="text-xl font-black">About</h1>
    <p>VANTAGE is an unofficial fan-made camo tracker for Call of Duty: Modern Warfare 4. It is not affiliated with or endorsed by Activision. Game names and images belong to their owners; downloaded images are for personal, local use.</p>
    <p>Mastery rules: 11 Military &amp; Special camos unlock the Gold challenge on a weapon, then Platinum, then Harmonic Break. Divergence unlocks after 33 Harmonic Breaks. Data lives in <code>src/data/mw4-weapons.ts</code>.</p>
    <p>Challenge details (levels and conditions) are shown for the weapons where they are available; more are added over time via the data file. Progress is stored in your browser and, if you sign in, synced to your own cloud account.</p></div>;
}
