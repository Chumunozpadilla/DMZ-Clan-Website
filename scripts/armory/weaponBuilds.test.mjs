import assert from 'node:assert/strict';
import test from 'node:test';
import { armoryWeapons, featuredArmoryWeapons, getWeaponImageCandidates } from '../../src/data/weaponBuilds.ts';

test('Armory migration keeps 10 unique weapons and all 24 build variants', () => {
  const weaponIds = armoryWeapons.map((weapon) => weapon.id);
  const variants = armoryWeapons.flatMap((weapon) => weapon.variants);

  assert.equal(armoryWeapons.length, 10);
  assert.equal(new Set(weaponIds).size, 10);
  assert.equal(variants.length, 24);
  assert.equal(new Set(variants.map((variant) => variant.id)).size, 24);
});

test('Official weapon images use only the official Call of Duty image domain', () => {
  for (const weapon of armoryWeapons) {
    assert.equal(weapon.image.kind, 'Official Weapon Image');
    assert.equal(new URL(weapon.image.url).hostname, 'imgs.callofduty.com');
    assert.equal(new URL(weapon.image.sourceUrl).hostname, 'www.callofduty.com');
  }
});

test('Only source-backed community variants contain published attachments', () => {
  const variants = armoryWeapons.flatMap((weapon) => weapon.variants);
  const withAttachments = variants.filter((variant) => variant.attachments?.length);

  assert.equal(withAttachments.length, 6);
  assert.ok(withAttachments.every((variant) => variant.sourceType === 'Community'));
  assert.ok(variants.filter((variant) => variant.sourceType === 'Official').every((variant) => !variant.attachments));
});

test('Featured carousel data contains unique weapons', () => {
  assert.equal(featuredArmoryWeapons.length, 5);
  assert.equal(new Set(featuredArmoryWeapons.map((weapon) => weapon.id)).size, featuredArmoryWeapons.length);
});

test('A variant Gunsmith screenshot takes priority over official and fallback images', () => {
  const weapon = structuredClone(armoryWeapons[0]);
  const variant = weapon.variants[0];
  variant.image = {
    url: 'images/armory/gunsmith/cbrs-3-multiplayer.webp',
    alt: 'DMZ CBRS-3 Multiplayer Gunsmith build.',
    kind: 'DMZ Gunsmith Screenshot',
    sourceName: 'Dead Mans Zone',
  };

  const candidates = getWeaponImageCandidates(weapon, variant);
  assert.deepEqual(candidates.map((image) => image.kind), ['DMZ Gunsmith Screenshot', 'Official Weapon Image', 'DMZ Fallback']);
});
