// Downloads camo + weapon images from the WZHUB CDN into /public for PERSONAL, local use only.
// Do not redistribute or publicly host them. Never fails the install: missing files fall back to gradients.
import { mkdir, writeFile, access } from 'node:fs/promises';
const B = 'https://cdn.wzhub.gg/storage/uploads/2026Oct/', T = 'https://api.wzhub.gg/storage/uploads/loadouts/guns/thumbnail/';
const SP = '1792648779_c7a8f1bd-5289-4054-9675-256f1c7267cd';
const camos = { 'military-1': '1792712398_8f49ad31-57fb-4405-94fe-0d37fad0ae6f', 'military-2': '1792712398_b537b14b-028a-47be-b451-675fdfd6bbd0', 'military-3': '1792712395_353d5ff8-940e-4f77-8346-5ac448741d13', 'military-4': '1792712396_aad41799-6fce-4f88-b6a3-19b9453e2b8a', 'military-5': '1792712396_2afb7938-4df4-49c1-8bd0-6b60cdc933fc', 'military-6': '1792712396_0d61b5c8-bfbc-4526-9693-36a942e5bd48', 'military-7': '1792712397_1eda5559-e52f-45af-ba83-1ac05e725e70', 'military-8': '1792712397_8fd65111-fe22-4c20-93f7-4c6e0198c931', 'special-1': SP, 'special-2': SP, 'special-3': SP, gold: '1792712669_90c53a84-0f37-4941-b8fe-03720d1ccde2', platinum: '1792712669_d727dac6-31cd-4fd0-95c5-e0dbcd43a73d', 'harmonic-break': '1792712669_f2fe89eb-dc8e-4f76-8b7b-5b65d4a3fa9c', divergence: '1792713368_b6bed117-5d20-4ea8-83cf-0d6f542bce01' };
const jobs = [...Object.entries(camos).map(([k, f]) => [`public/camos/${k}.jpg`, `${B}${f}.jpg`]),
  ['public/weapons/han-86.webp', T + '1787347924_585a06d3-3324-4c06-bcbb-a38d4dbeabab.webp'], ['public/weapons/kastov-762.webp', T + '1787348343_d2715775-4b7d-42d7-ac72-47544ffc5c29.webp'],
  ['public/weapons/iso-nightshade.webp', T + '1787348150_5f0e5f6e-fb4d-44da-abf7-b36b54c95714.webp'], ['public/weapons/m4.webp', T + '1787347653_c797da2e-a58d-442d-ab54-9fd85d7818d1.webp']];
await mkdir('public/camos', { recursive: true }); await mkdir('public/weapons', { recursive: true });
let ok = 0;
for (const [p, u] of jobs) {
  try { await access(p); ok++; continue; } catch {}
  try { const r = await fetch(u); if (!r.ok) throw new Error(r.status); await writeFile(p, Buffer.from(await r.arrayBuffer())); ok++; } catch (e) { console.warn('skip', p, String(e.message || e)); }
}
console.log(`images ready: ${ok}/${jobs.length}`);
