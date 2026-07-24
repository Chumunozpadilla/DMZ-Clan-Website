export type RosterMember = {
  gamerTag: string;
  rank: string;
  platform: string;
  role: string;
  preferredMode: string;
  profileImage?: string;
};

const playStation = 'PlayStation';
const multiplayer = 'Multiplayer';
const rosterImage = (gamerTag: string) => `/images/roster/${gamerTag}.png`;

export const rosterSummary = [
  { label: 'Leaders', value: '5' },
  { label: 'Officers', value: '5' },
  { label: 'Soldiers', value: '10' },
  { label: 'Total Personnel', value: '20' },
];

export const rosterGroups: { title: string; description: string; members: RosterMember[] }[] = [
  {
    title: 'Leadership',
    description: 'Primary command and community direction.',
    members: [
      {
        gamerTag: 'UnicornGamerMom',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
        profileImage: rosterImage('UnicornGamerMom'),
      },
      {
        gamerTag: 'DMZ_Nolesman9673',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
        profileImage: rosterImage('DMZ_Nolesman9673'),
      },
      {
        gamerTag: 'DMZSAINTS13805',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
        profileImage: rosterImage('DMZSAINTS13805'),
      },
      {
        gamerTag: 'dustino030303',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
        profileImage: rosterImage('dustino030303'),
      },
      {
        gamerTag: 'wingnut3671',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
        profileImage: rosterImage('wingnut3671'),
      },
    ],
  },
  {
    title: 'Officers',
    description: 'Moderation, event support, and squad coordination.',
    members: [
      {
        gamerTag: 'Croomie03-_-',
        rank: 'Captain',
        platform: playStation,
        role: 'Captain',
        preferredMode: multiplayer,
        profileImage: rosterImage('Croomie03-_-'),
      },
      {
        gamerTag: 'Epikfail510',
        rank: 'Captain',
        platform: playStation,
        role: 'Captain',
        preferredMode: multiplayer,
        profileImage: rosterImage('Epikfail510'),
      },
      {
        gamerTag: 'Ron1n_1971',
        rank: 'Lieutenant',
        platform: playStation,
        role: 'Lieutenant',
        preferredMode: multiplayer,
        profileImage: rosterImage('Ron1n_1971'),
      },
      {
        gamerTag: 'ReignOfTerror13',
        rank: 'Lieutenant',
        platform: playStation,
        role: 'Lieutenant',
        preferredMode: multiplayer,
        profileImage: rosterImage('ReignOfTerror13'),
      },
      {
        gamerTag: 'DrPapolito',
        rank: 'Acting Lieutenant',
        platform: playStation,
        role: 'Acting Lieutenant',
        preferredMode: 'Multiplayer / Endgame',
        profileImage: rosterImage('DrPapolito'),
      },
    ],
  },
  {
    title: 'Soldiers',
    description: 'Active players and squad regulars.',
    members: [
      {
        gamerTag: 'DMZ_TRIPLE-D',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('DMZ_TRIPLE-D'),
      },
      {
        gamerTag: 'elric62',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('elric62'),
      },
      {
        gamerTag: 'Christinaann',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('Christinaann'),
      },
      {
        gamerTag: 'Inthedark10',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('Inthedark10'),
      },
      {
        gamerTag: 'TheDodd0088',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('TheDodd0088'),
      },
      {
        gamerTag: 'lump-hammer',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('lump-hammer'),
      },
      {
        gamerTag: 'Mr_RomperStomper',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('Mr_RomperStomper'),
      },
      {
        gamerTag: 'Whiskey-T-777',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('Whiskey-T-777'),
      },
      {
        gamerTag: 'xMonkeyBoyx11',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('xMonkeyBoyx11'),
      },
      {
        gamerTag: 'Ryans_8991',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
        profileImage: rosterImage('Ryans_8991'),
      },
    ],
  },
];
