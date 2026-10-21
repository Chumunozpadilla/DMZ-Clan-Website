import assert from 'node:assert/strict';
import test from 'node:test';

const dataset = {};
const testWindow = new EventTarget();

globalThis.document = { documentElement: { dataset } };
globalThis.window = testWindow;

const { getCurrentRadioLayoutRequest, requestCompactRadio } = await import('../../src/utils/radioLayout.ts');

test('keeps the radio compact until every visible section releases its request', () => {
  requestCompactRadio(true, 'right', 'deployment');
  requestCompactRadio(false, 'left', 'armory');

  assert.equal(dataset.dmzRadioCompact, 'right');
  assert.deepEqual(getCurrentRadioLayoutRequest(), { compact: true, align: 'right' });

  requestCompactRadio(true, 'left', 'armory');
  assert.equal(dataset.dmzRadioCompact, 'left');

  requestCompactRadio(false, 'left', 'armory');
  assert.equal(dataset.dmzRadioCompact, 'right');

  requestCompactRadio(false, 'right', 'deployment');
  assert.equal(dataset.dmzRadioCompact, undefined);
  assert.deepEqual(getCurrentRadioLayoutRequest(), { compact: false, align: 'right' });
});
