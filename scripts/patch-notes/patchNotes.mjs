import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

export const PATCH_NOTES_HUB_URL = 'https://www.callofduty.com/patchnotes';

const officialHosts = new Set(['www.callofduty.com', 'callofduty.com']);
const officialImageHosts = new Set(['www.callofduty.com', 'callofduty.com', 'imgs.callofduty.com']);
const knownGameNames = {
  warzone: 'Call of Duty: Warzone',
  wz: 'Call of Duty: Warzone',
  mw4: 'Call of Duty: Modern Warfare 4',
  bo7: 'Call of Duty: Black Ops 7',
};

const cleanText = (value, maxLength = 180) =>
  String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const toOfficialUrl = (value, kind = 'article') => {
  try {
    const url = new URL(String(value ?? ''), PATCH_NOTES_HUB_URL);
    const allowedHosts = kind === 'image' ? officialImageHosts : officialHosts;
    const validPath = kind === 'image' ? url.pathname.startsWith('/content/dam/') : url.pathname.startsWith('/patchnotes/');

    if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname) || !validPath) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
};

const normalizeDate = (value) => {
  const date = cleanText(value, 40);
  return /^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(date) ? date : undefined;
};

const deriveGameName = (code, title) => {
  if (knownGameNames[code]) return knownGameNames[code];

  const derived = cleanText(title, 100)
    .replace(/^Call of Duty:\s*/i, '')
    .replace(/\s+(?:Preseason|Beta|Season\s+\d+|Season\s+\d+\s+Reloaded)?\s*Patch Notes.*$/i, '')
    .trim();

  return derived ? `Call of Duty: ${derived}` : 'Call of Duty';
};

const gameCodeFromCard = ($, card) => {
  const tile = card.find('.game-tile').first();
  const className = cleanText(tile.attr('class'), 100).toLowerCase();
  const classCode = className
    .split(' ')
    .find((name) => name && name !== 'game-tile');

  return cleanText(classCode || tile.text(), 24).toLowerCase();
};

const parseEntry = ($, element, fallbackDate) => {
  const entry = $(element);
  const titleAnchor = entry.find('.title a').first();
  const anchor = titleAnchor.length ? titleAnchor : entry.is('a') ? entry : entry.find('a').first();
  const title = cleanText(entry.find('.post-title').first().text() || entry.find('.title').first().text() || anchor.text());
  const url = toOfficialUrl(anchor.attr('href'));
  const date = normalizeDate(entry.find('.pub-date').first().text() || entry.find('.news-published').attr('data-date') || fallbackDate);

  if (!title || !url || !date) return undefined;
  return { title, date, url };
};

export function parsePatchNotesHub(html, generatedAt = new Date().toISOString()) {
  const $ = load(String(html ?? ''));
  const streams = [];

  $('.patch-notes-game-aggregator-component').each((_, aggregatorElement) => {
    const aggregator = $(aggregatorElement);
    const latestCard = aggregator.find('.post-grid .blog-card-item').first();
    if (!latestCard.length) return;

    const code = gameCodeFromCard($, latestCard);
    const latest = parseEntry($, latestCard);
    if (!code || !latest) return;

    const imageUrl = toOfficialUrl(latestCard.find('.blog-image').first().attr('src'), 'image');
    const previous = [];

    aggregator.find('.post-grid-accordion__list > li').each((__, listItem) => {
      if (previous.length >= 3) return;
      const parsed = parseEntry($, listItem);
      if (parsed && parsed.url !== latest.url) previous.push(parsed);
    });

    streams.push({
      id: code.replace(/[^a-z0-9-]/g, '-'),
      gameCode: code.toUpperCase(),
      gameName: deriveGameName(code, latest.title),
      latest: imageUrl ? { ...latest, imageUrl } : latest,
      previous,
    });
  });

  const warzone = streams.find((stream) => stream.id === 'warzone' || stream.id === 'wz');
  const mainTitle = streams.find((stream) => !['warzone', 'wz', 'wzm', 'cod-mobile'].includes(stream.id));
  const selectedStreams = [mainTitle, warzone].filter(Boolean);

  if (selectedStreams.length !== 2) {
    throw new Error(
      `The official hub did not contain both a current main-title stream and a Warzone stream. Parsed: ${streams
        .map((stream) => stream.id)
        .join(', ') || 'none'}.`,
    );
  }

  return {
    version: 1,
    sourceName: 'Official Call of Duty Patch Notes',
    sourceUrl: PATCH_NOTES_HUB_URL,
    generatedAt,
    streams: selectedStreams,
  };
}

const readCache = async (cachePath) => {
  try {
    return JSON.parse(await readFile(cachePath, 'utf8'));
  } catch {
    return undefined;
  }
};

export async function refreshPatchNotes({
  cachePath,
  fetchImpl = globalThis.fetch,
  now = () => new Date(),
  logger = console,
} = {}) {
  if (!cachePath) throw new Error('A cachePath is required.');

  const cached = await readCache(cachePath);

  try {
    const response = await fetchImpl(PATCH_NOTES_HUB_URL, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'DMZ-Clan-Website-Patch-Notes-Updater/1.0',
      },
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) throw new Error(`Official hub returned HTTP ${response.status}.`);

    const feed = parsePatchNotesHub(await response.text(), now().toISOString());
    await mkdir(path.dirname(cachePath), { recursive: true });
    const temporaryPath = `${cachePath}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(feed, null, 2)}\n`, 'utf8');
    await rename(temporaryPath, cachePath);
    logger.info(`Updated ${cachePath} with ${feed.streams.length} official patch-note streams.`);
    return { feed, updated: true, usedFallback: false };
  } catch (error) {
    if (!cached) throw error;
    logger.warn(`Patch-note refresh failed; preserving the last successful cache. ${error.message}`);
    return { feed: cached, updated: false, usedFallback: true, error };
  }
}
