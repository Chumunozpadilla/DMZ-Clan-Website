import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { refreshPatchNotes } from './patchNotes.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..', '..');
const cachePath = path.join(projectRoot, 'public', 'data', 'patch-notes.json');

await refreshPatchNotes({ cachePath });
