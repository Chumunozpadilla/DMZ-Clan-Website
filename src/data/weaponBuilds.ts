export type WeaponMode = 'Multiplayer' | 'Zombies' | 'Warzone';
export type SourceType = 'Official' | 'Community';
export type VerificationStatus = 'Source Verified' | 'Clan Tested' | 'Needs Recheck';
export type WeaponImageKind = 'Official Weapon Image' | 'DMZ Gunsmith Screenshot' | 'DMZ Fallback';

export type WeaponImage = {
  url: string;
  alt: string;
  kind: WeaponImageKind;
  sourceName: string;
  sourceUrl?: string;
};

export type WeaponBuildVariant = {
  id: string;
  mode: WeaponMode;
  buildCode: string;
  buildName: string;
  summary: string;
  attachments?: string[];
  sourceType: SourceType;
  sourceName: string;
  sourceUrl: string;
  sourcePublishedDate?: string;
  lastCheckedDate: string;
  verifiedSeason?: string;
  verificationStatus: VerificationStatus;
  image?: WeaponImage;
};

export type ArmoryWeapon = {
  id: string;
  weapon: string;
  weaponClass: string;
  description?: string;
  image: WeaponImage;
  variants: WeaponBuildVariant[];
  featured: boolean;
  featuredVariantId?: string;
};

export const currentBlackOps7Season = {
  name: 'Season 06',
  sourceName: 'Call of Duty Black Ops 7 Season 06 Patch Notes',
  sourceUrl: 'https://www.callofduty.com/patchnotes/2026/09/call-of-duty-black-ops-7-season-06-patch-notes',
  lastCheckedDate: '2026-09-25',
};

const checked = '2026-09-25';
const officialSourceName = 'Call of Duty Weapon Guide';
const gamespotMpName = 'GameSpot - Best Loadouts In BO7 Season 5 Multiplayer';
const gamespotWzName = 'GameSpot - Best Loadouts In Warzone For BO7 Season 5';
const gamespotMpUrl = 'https://www.gamespot.com/articles/best-loadouts-in-call-of-duty-black-ops-7-season-5-multiplayer/';
const gamespotWzUrl = 'https://www.gamespot.com/articles/best-loadouts-in-call-of-duty-warzone-for-bo7-season-5/';

const officialImage = (url: string, alt: string, sourceUrl: string): WeaponImage => ({
  url,
  alt,
  kind: 'Official Weapon Image',
  sourceName: 'Call of Duty',
  sourceUrl,
});

type OfficialVariantInput = Omit<
  WeaponBuildVariant,
  'sourceType' | 'sourceName' | 'lastCheckedDate' | 'verificationStatus'
>;

const officialVariant = (variant: OfficialVariantInput): WeaponBuildVariant => ({
  ...variant,
  sourceType: 'Official',
  sourceName: officialSourceName,
  lastCheckedDate: checked,
  verificationStatus: 'Source Verified',
});

type CommunityVariantInput = Omit<WeaponBuildVariant, 'sourceType' | 'lastCheckedDate' | 'verificationStatus'>;

const communityVariant = (variant: CommunityVariantInput): WeaponBuildVariant => ({
  ...variant,
  sourceType: 'Community',
  lastCheckedDate: checked,
  verificationStatus: 'Source Verified',
});

type OfficialWeaponInput = Omit<ArmoryWeapon, 'variants'> & {
  sourceUrl: string;
  sourcePublishedDate: string;
  verifiedSeason: string;
  builds: Array<Pick<WeaponBuildVariant, 'id' | 'mode' | 'buildCode' | 'buildName' | 'summary'>>;
};

const officialWeapon = ({ sourceUrl, sourcePublishedDate, verifiedSeason, builds, ...weapon }: OfficialWeaponInput): ArmoryWeapon => ({
  ...weapon,
  variants: builds.map((build) => officialVariant({ ...build, sourceUrl, sourcePublishedDate, verifiedSeason })),
});

const cbrsGuide = 'https://www.callofduty.com/guides/blackops7/weapons/smg/s04/cbrs-3';
const krsGuide = 'https://www.callofduty.com/guides/blackops7/weapons/marksman-rifle/KRS-762';
const striderGuide = 'https://www.callofduty.com/guides/blackops7/weapons/sniper-rifle/s03/strider-300';
const mk35Guide = 'https://www.callofduty.com/guides/blackops7/weapons/assault-rifle/s03/mk35-isr';
const pistolGuide = 'https://www.callofduty.com/guides/blackops7/weapons/pistol/s03/1911';
const sg12Guide = 'https://www.callofduty.com/guides/blackops7/weapons/shotgun/sg-12';
const fg42Guide = 'https://www.callofduty.com/guides/blackops7/weapons/assault-rifle/s05/fg42';
const swordfishGuide = 'https://www.callofduty.com/guides/blackops7/weapons/marksman-rifle/swordfish-a1';
const gremlinGuide = 'https://www.callofduty.com/guides/blackops7/weapons/smg/s05/gremlin';
const vstGuide = 'https://www.callofduty.com/guides/blackops7/weapons/smg/s03/vst';

const cbrs = officialWeapon({
  id: 'cbrs-3', weapon: 'CBRS-3', weaponClass: 'SMG', featured: false,
  description: 'High-capacity SMG with balanced range, recoil, and mobile handling.',
  sourceUrl: cbrsGuide, sourcePublishedDate: '2026-06-02', verifiedSeason: 'Season 04',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s04-announcement/BO7-SEASON-04-ANNOUNCEMENT-065.webp',
    'Official Call of Duty showcase of the CBRS-3 submachine gun.', cbrsGuide,
  ),
  builds: [
    { id: 'cbrs-3-multiplayer', mode: 'Multiplayer', buildCode: 'S15-6ZYVJ-P311', buildName: 'Official Multiplayer Build', summary: 'A compact Season 04 SMG build aimed at flexible close-range pressure with steady recoil.' },
    { id: 'cbrs-3-zombies', mode: 'Zombies', buildCode: 'S15-693B1-1E8W1-1', buildName: 'Official Zombies Build', summary: 'A high-capacity SMG setup for sustained undead control and mobile squad support.' },
    { id: 'cbrs-3-warzone', mode: 'Warzone', buildCode: 'S15-Y1LAX-JY911-1', buildName: 'Official Warzone Build', summary: 'A Warzone-ready SMG code for close quarters, quick rotations, and containment pushes.' },
  ],
});

const krs = officialWeapon({
  id: 'krs-762', weapon: 'KRS-7.62', weaponClass: 'Marksman Rifle', featured: false,
  description: 'Semi-auto marksman rifle with heavy damage and fast follow-up potential.',
  sourceUrl: krsGuide, sourcePublishedDate: '2026-06-02', verifiedSeason: 'Season 04',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s04-announcement/BO7-SEASON-04-ANNOUNCEMENT-062.webp',
    'Official Call of Duty showcase of the KRS-7.62 marksman rifle.', krsGuide,
  ),
  builds: [
    { id: 'krs-762-multiplayer', mode: 'Multiplayer', buildCode: 'M07-QMIXD-299H1-1', buildName: 'Official Multiplayer Build', summary: 'A Season 04 marksman code built around heavy two-shot pressure and controlled follow-ups.' },
    { id: 'krs-762-zombies', mode: 'Zombies', buildCode: 'M07-2JDBL-QWM9A-WH11', buildName: 'Official Zombies Build', summary: 'A precision Zombies build for operators who want punchy semi-auto damage at range.' },
    { id: 'krs-762-warzone', mode: 'Warzone', buildCode: 'M07-2JE28-ZYTEY-2W11', buildName: 'Official Warzone Build', summary: 'A source-verified Warzone marksman code for disciplined mid-range target work.' },
  ],
});

const strider = officialWeapon({
  id: 'strider-300', weapon: 'Strider 300', weaponClass: 'Sniper Rifle', featured: true,
  featuredVariantId: 'strider-300-warzone-gamespot-s5',
  description: 'Fast-handling bolt-action sniper rifle for mobile overwatch and lane control.',
  sourceUrl: striderGuide, sourcePublishedDate: '2026-04-09', verifiedSeason: 'Season 03',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-03-announcement/BO7-SEASON-03-ANNOUNCEMENT-066.webp',
    'Official Call of Duty showcase of the Strider 300 sniper rifle.', striderGuide,
  ),
  builds: [
    { id: 'strider-300-multiplayer', mode: 'Multiplayer', buildCode: 'R07-2G9T3-6PP6J-11', buildName: 'Official Multiplayer Build', summary: 'A quick-handling Season 03 sniper build for confident lanes and fast overwatch picks.' },
    { id: 'strider-300-zombies', mode: 'Zombies', buildCode: 'R07-KQ2UX-4N8J1-1', buildName: 'Official Zombies Build', summary: 'A bolt-action Zombies code for precision damage when the squad needs distance control.' },
    { id: 'strider-300-warzone', mode: 'Warzone', buildCode: 'R07-5PLR9-TB11', buildName: 'Official Warzone Build', summary: 'An official Warzone sniper import for clean ranged pressure and disciplined overwatch.' },
  ],
});
strider.variants.push(communityVariant({
  id: 'strider-300-warzone-gamespot-s5', mode: 'Warzone', buildCode: 'R07-2JD6P-5NM5G-6J11', buildName: 'GameSpot Season 5 Warzone Build',
  summary: 'A bolt-action Warzone sniper setup for bullet velocity, ADS time, and reload speed.',
  attachments: ['Muzzle: Monolithic Suppressor', 'Barrel: 25″ Bowen Grooved Barrel', 'Magazine: Carnation Fast Mag', 'Rear Grip: Hatch Quick Grip', 'Fire Mods: .300 WM Overpressured'],
  sourceName: gamespotWzName, sourceUrl: gamespotWzUrl, sourcePublishedDate: '2026-07-27', verifiedSeason: 'Season 05',
}));

const mk35 = officialWeapon({
  id: 'mk35-isr', weapon: 'MK35 ISR', weaponClass: 'Assault Rifle', featured: false,
  description: 'Low-recoil assault rifle tuned for stable, repeatable fire across modes.',
  sourceUrl: mk35Guide, sourcePublishedDate: '2026-03-25', verifiedSeason: 'Season 03',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-03-announcement/BO7-SEASON-03-ANNOUNCEMENT-059.webp',
    'Official Call of Duty showcase of the MK35 ISR assault rifle.', mk35Guide,
  ),
  builds: [
    { id: 'mk35-isr-multiplayer', mode: 'Multiplayer', buildCode: 'A12-AV24B-U9J55-1', buildName: 'Official Multiplayer Build', summary: 'A low-recoil assault rifle code for reliable lanes and repeatable multiplayer engagements.' },
    { id: 'mk35-isr-zombies', mode: 'Zombies', buildCode: 'A12-AV3KS-4YP35-1', buildName: 'Official Zombies Build', summary: 'A steady AR build for Zombies runs where accuracy and moderate handling matter.' },
    { id: 'mk35-isr-warzone', mode: 'Warzone', buildCode: 'A12-AV6A4-TLZN5-1', buildName: 'Official Warzone Build', summary: 'An official Warzone AR import for controlled fire during longer rotations.' },
  ],
});

const pistol1911 = officialWeapon({
  id: '1911', weapon: '1911', weaponClass: 'Pistol', featured: false,
  description: 'High-damage semi-auto sidearm for close-range backup and fast swaps.',
  sourceUrl: pistolGuide, sourcePublishedDate: '2026-04-16', verifiedSeason: 'Season 03',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-03-announcement/BO7-SEASON-03-ANNOUNCEMENT-069.webp',
    'Official Call of Duty showcase of the 1911 pistol.', pistolGuide,
  ),
  builds: [
    { id: '1911-multiplayer', mode: 'Multiplayer', buildCode: 'P07-2JDBL-LWSQ8-AJ11', buildName: 'Official Multiplayer Build', summary: 'A high-damage sidearm code for close-range backup and fast emergency swaps.' },
    { id: '1911-zombies', mode: 'Zombies', buildCode: 'P07-N6LXY-W16N3-1', buildName: 'Official Zombies Build', summary: 'A Zombies pistol code for operators who want a compact fallback with strong close damage.' },
    { id: '1911-warzone', mode: 'Warzone', buildCode: 'P07-AA96T-VBDQ9-11', buildName: 'Official Warzone Build', summary: 'A Warzone pistol import code for a compact secondary slot in close emergencies.' },
  ],
});

const sg12 = officialWeapon({
  id: 'sg-12', weapon: 'SG-12', weaponClass: 'Shotgun', featured: false,
  description: 'Well-rounded semi-auto shotgun for room entry and close containment.',
  sourceUrl: sg12Guide, sourcePublishedDate: '2026-03-11', verifiedSeason: 'Season 02',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/s02-announcement/B07-SEASON-02-ANNOUNCEMENT-068.webp',
    'Official Call of Duty showcase of the SG-12 shotgun.', sg12Guide,
  ),
  builds: [
    { id: 'sg-12-multiplayer-alpha', mode: 'Multiplayer', buildCode: 'C05-SJD6Z-LPYZX-YD11', buildName: 'Official Multiplayer Alpha Build', summary: 'A semi-auto shotgun code for controlled room entry and mid-range pressure.' },
    { id: 'sg-12-zombies', mode: 'Zombies', buildCode: 'C05-2JD6Z-TUE54-FQ11', buildName: 'Official Zombies Build', summary: 'A source-verified shotgun build for close containment and dense horde lanes.' },
    { id: 'sg-12-warzone', mode: 'Warzone', buildCode: 'C05-21X3B-KL4Y2-TF11', buildName: 'Official Warzone Build', summary: 'A Warzone shotgun import for aggressive interiors and short sight-line fights.' },
  ],
});

const fg42: ArmoryWeapon = {
  id: 'fg42', weapon: 'FG42', weaponClass: 'Assault Rifle', featured: true,
  featuredVariantId: 'fg42-multiplayer-gamespot-s5',
  description: 'Heavy-hitting automatic rifle balanced by slower handling and open-bolt delay.',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-05/BO7-SEASON-05-ANNOUNCEMENT-038.webp',
    'Official Call of Duty showcase of the FG42 assault rifle.', fg42Guide,
  ),
  variants: [
    communityVariant({
      id: 'fg42-multiplayer-gamespot-s5', mode: 'Multiplayer', buildCode: 'A16-34FC8-LJJUI-11', buildName: 'GameSpot Season 5 Multiplayer Build',
      summary: 'A Season 5 multiplayer AR build focused on ammo capacity, fire rate, and recoil control.',
      attachments: ['Optic: Fang Hoverpoint ELO', 'Muzzle: Redwell Shade-X Suppressor', 'Magazine: Overbook Extended Mag', 'Underbarrel: RIF Handguard', 'Rear Grip: Tress Grip', 'Stock: MFS Ambilateral Stock'],
      sourceName: gamespotMpName, sourceUrl: gamespotMpUrl, sourcePublishedDate: '2026-07-27', verifiedSeason: 'Season 05',
    }),
    communityVariant({
      id: 'fg42-warzone-gamespot-s5', mode: 'Warzone', buildCode: 'A16-34FIQ-XHAUL-11', buildName: 'GameSpot Season 5 Warzone Build',
      summary: 'A Warzone long-range FG42 setup for damage range, bullet velocity, and recoil management.',
      attachments: ['Optic: Fang Hoverpoint ELO', 'Muzzle: Monolithic Suppressor', 'Barrel: 16″ Bandolier Barrel', 'Underbarrel: RIF Handguard', 'Magazine: Debase Extended Mag'],
      sourceName: gamespotWzName, sourceUrl: gamespotWzUrl, sourcePublishedDate: '2026-07-27', verifiedSeason: 'Season 05',
    }),
  ],
};

const swordfish: ArmoryWeapon = {
  id: 'swordfish-a1', weapon: 'Swordfish A1', weaponClass: 'Marksman Rifle', featured: true,
  featuredVariantId: 'swordfish-a1-multiplayer-gamespot-s5',
  description: 'Low-recoil burst marksman rifle for measured mid-range engagements.',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-02-reloaded/BO7-S02RELOADED-ANNOUNCEMENT-039.webp',
    'Official Call of Duty showcase of the Swordfish A1 marksman rifle.', swordfishGuide,
  ),
  variants: [communityVariant({
    id: 'swordfish-a1-multiplayer-gamespot-s5', mode: 'Multiplayer', buildCode: 'M05-2TKLA-WUX5U-71', buildName: 'GameSpot Season 5 Multiplayer Build',
    summary: 'A burst-fire marksman setup built for a cleaner sight picture, recoil control, and faster ADS handling.',
    attachments: ['Optic: Fang Hoverpoint ELO', 'Muzzle: Redwell Shade-X Suppressor', 'Underbarrel: Fixus Underbarrel', 'Rear Grip: Hawker VIC-R Grip', 'Fire Mods: MFS Penta Burst Mod'],
    sourceName: gamespotMpName, sourceUrl: gamespotMpUrl, sourcePublishedDate: '2026-07-27', verifiedSeason: 'Season 05',
  })],
};

const gremlin: ArmoryWeapon = {
  id: 'gremlin', weapon: 'Gremlin', weaponClass: 'SMG', featured: true,
  featuredVariantId: 'gremlin-multiplayer-gamespot-s5',
  description: 'Mobility-first SMG designed around aggressive hipfire pressure.',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-05/BO7-SEASON-05-ANNOUNCEMENT-041.webp',
    'Official Call of Duty showcase of the Gremlin submachine gun.', gremlinGuide,
  ),
  variants: [communityVariant({
    id: 'gremlin-multiplayer-gamespot-s5', mode: 'Multiplayer', buildCode: 'S16-3M5Z7-FLY31', buildName: 'GameSpot Season 5 Multiplayer Build',
    summary: 'A dual-wield SMG setup aimed at hipfire control, reload speed, and close-range pressure.',
    attachments: ['Muzzle: Hawker Series', 'Magazine: Leaper Fast Mag', 'Rear Grip: Saber Grip', 'Laser: Convergence Box Laser', 'Fire Mod: Buffer Springs'],
    sourceName: gamespotMpName, sourceUrl: gamespotMpUrl, sourcePublishedDate: '2026-07-27', verifiedSeason: 'Season 05',
  })],
};

const vst: ArmoryWeapon = {
  id: 'vst', weapon: 'VST', weaponClass: 'SMG', featured: true,
  featuredVariantId: 'vst-warzone-gamespot-s5',
  description: 'Lightweight SMG with excellent mobility, good handling, and caliber flexibility.',
  image: officialImage(
    'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-03-announcement/BO7-SEASON-03-ANNOUNCEMENT-062.webp',
    'Official Call of Duty showcase of the VST submachine gun.', vstGuide,
  ),
  variants: [communityVariant({
    id: 'vst-warzone-gamespot-s5', mode: 'Warzone', buildCode: 'S12-6KDYX-HL11', buildName: 'GameSpot Season 5 Warzone Build',
    summary: 'A close-range Warzone SMG build for recoil control, fire rate, and faster movement.',
    attachments: ['Muzzle: LTI Stentorian Brake', 'Barrel: 9.7: Enmity Barrel', 'Underbarrel: EAM Steady-90 Grip', 'Magazine: Amplify Extended Mag I', 'Stock: Hawker Cub-55 Pad'],
    sourceName: gamespotWzName, sourceUrl: gamespotWzUrl, sourcePublishedDate: '2026-07-27', verifiedSeason: 'Season 05',
  })],
};

export const armoryWeapons: ArmoryWeapon[] = [cbrs, krs, strider, mk35, pistol1911, sg12, fg42, swordfish, gremlin, vst];

const weaponIds = new Set(armoryWeapons.map((weapon) => weapon.id));
const buildIds = new Set(armoryWeapons.flatMap((weapon) => weapon.variants.map((variant) => variant.id)));
const buildCount = armoryWeapons.reduce((total, weapon) => total + weapon.variants.length, 0);

if (weaponIds.size !== armoryWeapons.length) throw new Error('Armory weapon IDs must be unique.');
if (buildIds.size !== buildCount) throw new Error('Weapon build variant IDs must be unique.');

for (const weapon of armoryWeapons) {
  if (weapon.featuredVariantId && !weapon.variants.some((variant) => variant.id === weapon.featuredVariantId)) {
    throw new Error(`Featured variant ${weapon.featuredVariantId} does not belong to ${weapon.weapon}.`);
  }
}

export const featuredArmoryWeapons = armoryWeapons.filter((weapon) => weapon.featured);
export const getFeaturedVariant = (weapon: ArmoryWeapon): WeaponBuildVariant =>
  weapon.variants.find((variant) => variant.id === weapon.featuredVariantId) ?? weapon.variants[0];

const fallbackImages: Record<string, WeaponImage> = {
  'Assault Rifle': { url: 'images/armory/assault-rifle.svg', alt: '', kind: 'DMZ Fallback', sourceName: 'DMZ tactical silhouette' },
  SMG: { url: 'images/armory/smg.svg', alt: '', kind: 'DMZ Fallback', sourceName: 'DMZ tactical silhouette' },
  Shotgun: { url: 'images/armory/shotgun.svg', alt: '', kind: 'DMZ Fallback', sourceName: 'DMZ tactical silhouette' },
  'Marksman Rifle': { url: 'images/armory/marksman-rifle.svg', alt: '', kind: 'DMZ Fallback', sourceName: 'DMZ tactical silhouette' },
  'Sniper Rifle': { url: 'images/armory/sniper-rifle.svg', alt: '', kind: 'DMZ Fallback', sourceName: 'DMZ tactical silhouette' },
  Pistol: { url: 'images/armory/pistol.svg', alt: '', kind: 'DMZ Fallback', sourceName: 'DMZ tactical silhouette' },
};

export const getWeaponImageCandidates = (weapon: ArmoryWeapon, variant: WeaponBuildVariant): WeaponImage[] => {
  const candidates = variant.image?.kind === 'DMZ Gunsmith Screenshot' ? [variant.image, weapon.image] : [weapon.image];
  const fallback = fallbackImages[weapon.weaponClass];
  return fallback && !candidates.some((image) => image.url === fallback.url) ? [...candidates, fallback] : candidates;
};

export const weaponModes: WeaponMode[] = ['Multiplayer', 'Zombies', 'Warzone'];
export const sourceTypes: SourceType[] = ['Official', 'Community'];
export const weaponClasses = Array.from(new Set(armoryWeapons.map((weapon) => weapon.weaponClass))).sort();
