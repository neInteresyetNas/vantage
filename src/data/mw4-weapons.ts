// Catalog: 35 weapons / 9 classes (matches CODMunity MW4 tracker). Edit here to update.
const RAW: Record<string, string[]> = {
  AR: ['Cronen Osprey','Han 86','Axion','Cronen Squall','Oden','Hyeon Burst','Kastov 762','Patriot XMR','M4'],
  SMG: ['CSG-35','VEL 46','WZ.55 Striga','ISO Nightshade','PPSH-41','X-58 Nyx'],
  Shotgun: ['Warlord','Rezi 12'], LMG: ['APOC-338','FiNN LMG','Type 73'],
  Rifle: ['Mosin-Nagant','MAR-9','Oris 8.6'], Sniper: ['Signal 50','KG-7 Vulcan','Astaroth .57'],
  Pistol: ['.50 GS','KRAIT P68','Mojave .357','Sang 9mm'], Launcher: ['JOKR','PILA','PM-40 Anvil','RPG-8'],
  Melee: ['FSS Carbon Edge 1095'],
};
export type Weapon = { id: string; name: string; cls: string };
export const CLASSES = Object.keys(RAW);
export const WEAPONS: Weapon[] = Object.entries(RAW).flatMap(([cls, l]) =>
  l.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, cls })));
export const IDS = WEAPONS.map((w) => w.id);
// Multiplayer challenge data. Only weapons listed here have challenge details; others show no details.
// sp = [icon slug (public/camos/<slug>.webp), name, challenge]
type Info = { lv: number[]; sp: [string, string, string][]; plat: string; hb: string };
export const GOLD_TEXT = 'Get 15 Player Kills in a single match';
export const INFO: Record<string, Info> = {
  'kg-7-vulcan': { lv: [13,22,31,38,47,54,61,69], sp: [['treeline','Treeline','Get 10 Hipfire Kills against Players'],['spidersilk','Spidersilk','Get 20 Headshot Kills against Players'],['tension','Tension','Get 2 Player Kills without taking damage 20 times']], plat: 'Get 75 Player Kills while Prone', hb: 'Get 75 One Shot Kills against Players' },
  'rezi-12': { lv: [11,18,26,30,38,42,47,54], sp: [['struckoil','Struck Oil','Get 20 Point Blank Kills against Players'],['brushstroke','Brushstroke','Get 10 Longshot Kills against Players'],['whitepine','White Pine','Get 40 Player Kills while Jumping']], plat: 'Get 50 Hipfire Kills against Players', hb: 'Get 2 Player Kills without Reloading 25 times' },
  'iso-nightshade': { lv: [12,19,25,31,38,44,50,57], sp: [['brown','Brown','Get 3 Player Kills without dying 15 times'],['asphalt','Asphalt','Get 50 Player Kills while Aiming Down Sights'],['blacktopo','Black Topo','Get 10 Double Kills against Players']], plat: 'Get 25 Player Kills from Behind', hb: 'Get 50 Hipfire Kills against Players' },
  'finn-lmg': { lv: [12,18,24,31,37,42,48,53], sp: [['deserttactics','Desert Tactics','Get 20 Point Blank Kills against Players'],['greentiger','Green Tiger','Get 2 Kills without Reloading 10 times against Players'],['thunderhead','Thunderhead','Get 30 Longshot Kills against Players']], plat: 'Get 3 Player Kills without dying 15 times', hb: 'Get 2 Player Kills without releasing the trigger 25 times' },
  'mar-9': { lv: [10,19,29,38,45,52,58,69], sp: [['mangrove','Mangrove','Get 20 Mounted Kills against Players'],['fungalgrid','Fungal Grid','Get 25 Player Kills while Crouched'],['white','White','Get 30 Longshot Kills against Players']], plat: 'Get 75 Player Kills while Prone', hb: 'Get 75 One Shot Kills against Players' },
  'sang-9mm': { lv: [9,13,17,21,25,28,31,35], sp: [['autumn','Autumn','Get 25 Player Kills while Aiming Down Sights'],['snakeskin','Snakeskin','Get 3 Player Kills without dying 5 times'],['spacetime','Space Time','Get 50 Player Kills while using Akimbo']], plat: 'Get 20 Player Kills from Behind', hb: 'Get 40 Hipfire Kills against Players' },
};
export const camoRows = (id: string) => { const f = INFO[id]; return Array.from({ length: 11 }, (_, i) => i < 8
  ? { name: `Military ${i + 1}`, key: `military-${i + 1}`, text: f ? `Reach Weapon Level ${f.lv[i]}` : undefined }
  : { name: f?.sp[i - 8][1] ?? `Special ${i - 7}`, key: f?.sp[i - 8][0] ?? `special-${i - 7}`, text: f?.sp[i - 8][2] }); };
export const masteryText = (id: string) => ({ gold: GOLD_TEXT, plat: INFO[id]?.plat, hb: INFO[id]?.hb });
