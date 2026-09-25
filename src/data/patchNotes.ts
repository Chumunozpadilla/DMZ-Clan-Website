import patchNotesCache from '../../public/data/patch-notes.json';

export type PatchNoteSummary = {
  title: string;
  date: string;
  url: string;
  imageUrl?: string;
};

export type PatchNoteStream = {
  id: string;
  gameCode: string;
  gameName: string;
  latest: PatchNoteSummary;
  previous: PatchNoteSummary[];
};

export type PatchNotesFeed = {
  version: number;
  sourceName: string;
  sourceUrl: string;
  generatedAt: string;
  streams: PatchNoteStream[];
};

export const patchNotesFeed = patchNotesCache as PatchNotesFeed;
