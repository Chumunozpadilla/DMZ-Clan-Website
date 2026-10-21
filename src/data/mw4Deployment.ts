export type Mw4DeploymentPhaseId = 'pre-deployment' | 'dmz-early-access' | 'full-deployment';

export type Mw4DeploymentStatus = {
  id: Mw4DeploymentPhaseId;
  label: string;
  detail: string;
};

export type Mw4Milestone = {
  id: string;
  label: string;
  date: string;
  displayDate: string;
  description: string;
};

export type Mw4IntelTopic = {
  id: string;
  label: string;
  heading: string;
  summary: string;
};

export const mw4Deployment = {
  sourceUrl: 'https://www.callofduty.com/modernwarfare4',
  preorderUrl: 'https://store.playstation.com/en-us/product/UP0002-PPSA01649_00-CODMW4STANDARD01',
  milestones: [
    {
      id: 'campaign-early-access',
      label: 'Campaign Early Access',
      date: '2026-10-16',
      displayDate: 'October 16, 2026',
      description: 'Early campaign deployment window listed by Call of Duty.',
    },
    {
      id: 'dmz-early-access',
      label: 'DMZ Early Access',
      date: '2026-10-20',
      displayDate: 'October 20, 2026',
      description: 'The first official deployment window for the new DMZ experience.',
    },
    {
      id: 'full-launch',
      label: 'Full Deployment',
      date: '2026-10-23',
      displayDate: 'October 23, 2026',
      description: 'Worldwide Modern Warfare 4 launch date.',
    },
  ] satisfies Mw4Milestone[],
  intelTopics: [
    {
      id: 'overview',
      label: 'Overview',
      heading: 'DMZ Overview',
      summary: 'Review the official introduction to MW4\'s squad-based extraction experience and living combat sandbox.',
    },
    {
      id: 'dynamic-ops',
      label: 'Dynamic Ops',
      heading: 'Dynamic Operations',
      summary: 'Official briefing coverage focused on deployments designed to produce a different story each time.',
    },
    {
      id: 'progression',
      label: 'Progression',
      heading: 'Operator Progression',
      summary: 'Official intel covering how continued deployments contribute to operator advancement.',
    },
    {
      id: 'story-missions',
      label: 'Story Missions',
      heading: 'Story Missions',
      summary: 'Official coverage of mission-driven objectives within the evolving extraction environment.',
    },
    {
      id: 'bounty-systems',
      label: 'Bounties',
      heading: 'Bounty Systems',
      summary: 'Official briefing coverage for the bounty systems that add pressure and opportunity to a deployment.',
    },
    {
      id: 'world-building',
      label: 'World Building',
      heading: 'DMZ World Building',
      summary: 'Official insight into the setting and systems shaping the new conflict zone.',
    },
  ] satisfies Mw4IntelTopic[],
  featuredVideo: {
    title: 'DMZ: Addition By Extraction - From The Ward Ep. 7',
    youtubeId: '5VVW6Z6fZcY',
    watchUrl: 'https://www.youtube.com/watch?v=5VVW6Z6fZcY',
    embedUrl: 'https://www.youtube.com/embed/5VVW6Z6fZcY?rel=0',
  },
} as const;

export function getMw4DeploymentStatus(currentDate: string): Mw4DeploymentStatus {
  if (currentDate >= '2026-10-23') {
    return {
      id: 'full-deployment',
      label: 'Full Deployment Active',
      detail: 'Modern Warfare 4 and DMZ are fully deployed.',
    };
  }

  if (currentDate >= '2026-10-20') {
    return {
      id: 'dmz-early-access',
      label: 'DMZ Early Access Active',
      detail: 'Early access is active. Full deployment begins October 23, 2026.',
    };
  }

  return {
    id: 'pre-deployment',
    label: 'Deployment Pending',
    detail: 'DMZ early access begins October 20, 2026.',
  };
}

export function getEasternDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}
