export type RosterMember = {
  gamerTag: string;
  rank: string;
  platform: string;
  role: string;
  preferredMode: string;
};

const playStation = 'PlayStation';
const multiplayer = 'Multiplayer';

export const rosterSummary = [
  { label: 'Leaders', value: '5' },
  { label: 'Officers', value: '4' },
  { label: 'Soldiers', value: '8' },
  { label: 'Total Personnel', value: '17' },
];

export const rosterGroups: { title: string; description: string; members: RosterMember[] }[] = [
  {
    title: 'Leadership',
    description: 'Primary command and community direction.',
    members: [
      {
        gamerTag: 'DMZSAINTS13805',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'DMZ_Nolesman9673',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'wingnut3671',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'dustino030303',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'UnicornGamerMom',
        rank: 'Leader',
        platform: playStation,
        role: 'Leader',
        preferredMode: multiplayer,
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
      },
      {
        gamerTag: 'Epikfail510',
        rank: 'Captain',
        platform: playStation,
        role: 'Captain',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'Ron1n_1971',
        rank: 'Lieutenant',
        platform: playStation,
        role: 'Lieutenant',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'ReignOfTerror13',
        rank: 'Lieutenant',
        platform: playStation,
        role: 'Lieutenant',
        preferredMode: multiplayer,
      },
    ],
  },
  {
    title: 'Soldiers',
    description: 'Active players and squad regulars.',
    members: [
      {
        gamerTag: 'DrPapolito',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: 'Multiplayer / Endgame',
      },
      {
        gamerTag: 'Christinaan',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'DMZ_TRIPLE-D',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'Ryans_8991',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'TheDodd0088',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'Whiskey-T-777',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'elric62',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
      },
      {
        gamerTag: 'xMonkeyBoyx11',
        rank: 'Member',
        platform: playStation,
        role: 'Soldier',
        preferredMode: multiplayer,
      },
    ],
  },
];
