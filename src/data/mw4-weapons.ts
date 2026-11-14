// Source: public WZHUB MW4 tracker (33 weapons). Edit here to update the catalog.
const RAW: Record<string, string[]> = {
  AR: ['Han 86','Axion','Cronen Squall','Oden','Hyeon Burst','Kastov 762','Patriot XMR','M4'],
  SMG: ['VEL 46','WZ.55 Striga','ISO Nightshade','PPSH-41','X-58 Nyx'],
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
// Challenge texts were NOT published on the source page: NEEDS VERIFICATION. Fill in here.
export const CAMO_TEXT: Record<string, string> = {};
