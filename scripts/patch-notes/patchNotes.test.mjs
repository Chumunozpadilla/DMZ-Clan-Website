import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { parsePatchNotesHub, refreshPatchNotes } from './patchNotes.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const fixture = await readFile(path.join(scriptDirectory, 'fixtures', 'official-hub.html'), 'utf8');

test('parses the current main title, Warzone, official images, and three safe prior notes', () => {
  const feed = parsePatchNotesHub(fixture, '2026-09-25T12:00:00.000Z');

  assert.deepEqual(feed.streams.map((stream) => stream.gameCode), ['MW4', 'WARZONE']);
  assert.equal(feed.streams[0].gameName, 'Call of Duty: Modern Warfare 4');
  assert.equal(feed.streams[1].latest.title, 'Call of Duty: Warzone Season 06 Patch Notes');
  assert.equal(feed.streams[1].previous.length, 3);
  assert.ok(feed.streams[1].previous.every((note) => note.url.startsWith('https://www.callofduty.com/patchnotes/')));
  assert.equal(feed.streams[1].latest.imageUrl, 'https://imgs.callofduty.com/content/dam/atvi/callofduty/wz-s06.jpg');
});

test('rejects incomplete hub markup instead of replacing the cache with partial data', () => {
  assert.throws(() => parsePatchNotesHub('<main>Unavailable</main>'), /did not contain both/);
});

test('writes a validated cache after a successful refresh', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'dmz-patch-notes-'));
  const cachePath = path.join(directory, 'patch-notes.json');

  try {
    const result = await refreshPatchNotes({
      cachePath,
      fetchImpl: async () => ({ ok: true, text: async () => fixture }),
      now: () => new Date('2026-09-25T12:00:00.000Z'),
      logger: { info() {}, warn() {} },
    });

    const written = JSON.parse(await readFile(cachePath, 'utf8'));
    assert.equal(result.updated, true);
    assert.equal(result.usedFallback, false);
    assert.equal(written.generatedAt, '2026-09-25T12:00:00.000Z');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('preserves and returns the last successful cache when the official hub fails', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'dmz-patch-notes-'));
  const cachePath = path.join(directory, 'patch-notes.json');
  const cached = { version: 1, generatedAt: '2026-09-24T00:00:00.000Z', streams: [{ id: 'cached' }] };
  await writeFile(cachePath, JSON.stringify(cached), 'utf8');

  try {
    const result = await refreshPatchNotes({
      cachePath,
      fetchImpl: async () => {
        throw new Error('network unavailable');
      },
      logger: { info() {}, warn() {} },
    });

    assert.equal(result.updated, false);
    assert.equal(result.usedFallback, true);
    assert.deepEqual(result.feed, cached);
    assert.deepEqual(JSON.parse(await readFile(cachePath, 'utf8')), cached);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
