# Dead Mans Zone (DMZ)

Version-one website for Dead Mans Zone, an 18+ independent Call of Duty community organized primarily through Discord.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local address printed by Vite.

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Official patch notes feed

The Homepage patch-notes section reads from `public/data/patch-notes.json`; visitors never scrape CallofDuty.com directly. The existing GitHub Pages workflow refreshes that cache from the official patch-notes hub every eight hours, runs the parser tests and project checks, preserves the last successful cache if the source is unavailable, and deploys the resulting static site.

Run a local refresh with:

```bash
pnpm patchnotes:update
```

The scheduled workflow needs GitHub Actions enabled and the repository workflow permission set to allow read and write access so its bot can commit an updated cache. GitHub Pages must continue using GitHub Actions as its source.

## Edit site content

- Clan name, tagline, Discord invite, social links, and affiliation statement: `src/data/clanInfo.ts`
- Navigation: `src/data/navigation.ts`
- Roster: `src/data/roster.ts`
- Operations/events: `src/data/operations.ts`
- Rules: `src/data/rules.ts`
- Media placeholders: `src/data/media.ts`
- Armory weapons, build variants, source links, and imagery: `src/data/weaponBuilds.ts`
- Cached official patch-note summaries: `public/data/patch-notes.json`

## Replace placeholders

Replace placeholder social links, roster entries, event dates, media items, and contact details when official DMZ information is ready.

## Assets

Clan visuals in this version are original CSS-generated industrial, tactical, and containment-zone treatments. The patch-note cards may display the current official article artwork directly from CallofDuty.com and clearly link back to the source; no article body content is copied into the project.

### Armory Gunsmith screenshots

Armory weapons use clearly attributed official Call of Duty weapon imagery as a general visual reference. The existing DMZ class silhouettes remain the final fallback if an official image fails to load.

To replace a general image with an exact DMZ Gunsmith capture:

1. Export a WebP screenshot to `public/images/armory/gunsmith/` using the weapon and mode, for example `cbrs-3-multiplayer.webp`.
2. In `src/data/weaponBuilds.ts`, add an `image` field to that specific build variant with `kind: 'DMZ Gunsmith Screenshot'`, the local URL, and meaningful alt text.
3. Run the checks and build. Variant screenshots automatically take priority over the weapon's official image, which in turn takes priority over the DMZ silhouette.

Do not use generated imitations or third-party weapon images. Keep each screenshot tied to the exact imported build it depicts.
