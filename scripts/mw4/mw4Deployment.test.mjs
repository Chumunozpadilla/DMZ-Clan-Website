import assert from 'node:assert/strict';
import test from 'node:test';
import { getEasternDateKey, getMw4DeploymentStatus, mw4Deployment } from '../../src/data/mw4Deployment.ts';

test('reports pre-deployment before DMZ early access begins', () => {
  assert.deepEqual(getMw4DeploymentStatus('2026-10-19'), {
    id: 'pre-deployment',
    label: 'Deployment Pending',
    detail: 'DMZ early access begins October 20, 2026.',
  });
});

test('reports DMZ early access between October 20 and full launch', () => {
  assert.deepEqual(getMw4DeploymentStatus('2026-10-20'), {
    id: 'dmz-early-access',
    label: 'DMZ Early Access Active',
    detail: 'Early access is active. Full deployment begins October 23, 2026.',
  });
  assert.equal(getMw4DeploymentStatus('2026-10-22').id, 'dmz-early-access');
});

test('reports full deployment beginning October 23', () => {
  assert.deepEqual(getMw4DeploymentStatus('2026-10-23'), {
    id: 'full-deployment',
    label: 'Full Deployment Active',
    detail: 'Modern Warfare 4 and DMZ are fully deployed.',
  });
  assert.equal(getMw4DeploymentStatus('2027-01-01').id, 'full-deployment');
});

test('keeps official deployment dates and source-backed DMZ intel in one dataset', () => {
  assert.deepEqual(
    mw4Deployment.milestones.map(({ id, date }) => [id, date]),
    [
      ['campaign-early-access', '2026-10-16'],
      ['dmz-early-access', '2026-10-20'],
      ['full-launch', '2026-10-23'],
    ],
  );
  assert.deepEqual(
    mw4Deployment.intelTopics.map(({ id }) => id),
    ['overview', 'dynamic-ops', 'progression', 'story-missions', 'bounty-systems', 'world-building'],
  );
  assert.equal(new URL(mw4Deployment.sourceUrl).hostname, 'www.callofduty.com');
  assert.equal(mw4Deployment.featuredVideo.youtubeId, '5VVW6Z6fZcY');
});

test('uses the Eastern calendar date for deployment status changes', () => {
  assert.equal(getEasternDateKey(new Date('2026-10-23T03:30:00Z')), '2026-10-22');
  assert.equal(getEasternDateKey(new Date('2026-10-23T04:30:00Z')), '2026-10-23');
});
