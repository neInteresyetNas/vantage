// Downloads camo + weapon images from assets.codmunity.gg into /public for PERSONAL, local use only.
// Do not redistribute or publicly host them. Never fails the install: missing files fall back to gradients.
import { mkdir, writeFile, access } from 'node:fs/promises';
const A = 'https://assets.codmunity.gg/optimized/';
const specials = ['treeline','spidersilk','tension','struckoil','brushstroke','whitepine','brown','asphalt','blacktopo','deserttactics','greentiger','thunderhead','mangrove','fungalgrid','white','autumn','snakeskin','spacetime'];
const weapons = ['Cronen Osprey','Han 86','Axion','Cronen Squall','Oden','Hyeon Burst','Kastov 762','Patriot XMR','M4','CSG-35','VEL 46','WZ.55 Striga','ISO Nightshade','PPSH-41','X-58 Nyx','Warlord','Rezi 12','FiNN LMG','APOC-338','Type 73','Mosin-Nagant','MAR-9','Oris 8.6','Signal 50','KG-7 Vulcan','Astaroth .57','.50 GS','KRAIT P68','Mojave .357','Sang 9mm','JOKR','PILA','PM-40 Anvil','RPG-8','FSS Carbon Edge 1095'];
const jobs = []; // [file, [candidate urls]]
for (let i = 1; i <= 8; i++) jobs.push([`public/camos/military-${i}.webp`, [`${A}militarycamo${i}_mw4_camo_icon.webp`, `${A}militarycamo${i}_mw4_camo_icon.webp?size=100x40&quality=90&format=webp`]]);
for (const s of specials) jobs.push([`public/camos/${s}.webp`, [`${A}${s}_mw4_camo_icon.webp`, `${A}${s}_mw4_camo_icon.webp?size=100x40&quality=90&format=webp`]]);
for (const [k, f] of [['gold', 'Gold'], ['platinum', 'Platinium'], ['harmonic-break', 'Harmonic-Break'], ['divergence', 'Divergence']]) { const u = `${A}CODMunity_HD_${f}_lowwm.webp`; jobs.push([`public/camos/${k}.webp`, [u, u + '?size=640x256&quality=90&format=webp']]); }
for (const n of weapons) { const id = n.toLowerCase().replace(/[^a-z0-9]+/g, '-'), b = n.replace(/ /g, '-'), up = b.replace(/^[^-]*/, (m) => m.toUpperCase());
  jobs.push([`public/weapons/${id}.webp`, [...new Set([b, up])].flatMap((x) => [`${A}MW4_${x}_green.webp`, `${A}MW4_${x}_green.webp?size=72x36&quality=90&format=webp`])]); }
await mkdir('public/camos', { recursive: true }); await mkdir('public/weapons', { recursive: true });
let ok = 0;
for (const [p, urls] of jobs) {
  try { await access(p); ok++; continue; } catch {}
  for (const u of urls) { try { const r = await fetch(u); if (!r.ok) continue; await writeFile(p, Buffer.from(await r.arrayBuffer())); ok++; break; } catch {} }
}
console.log(`images ready: ${ok}/${jobs.length} (missing ones fall back to placeholders)`);
