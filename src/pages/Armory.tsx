import { useMemo, useState } from 'react';
import ArmoryFilters, { type ArmoryFilterState } from '../components/sections/ArmoryFilters';
import WeaponBuildCard from '../components/sections/WeaponBuildCard';
import SectionHeader from '../components/ui/SectionHeader';
import { currentBlackOps7Season, sourceTypes, weaponBuilds, weaponClasses, weaponModes } from '../data/weaponBuilds';

const defaultFilters: ArmoryFilterState = {
  query: '',
  mode: 'All',
  weaponClass: 'All Classes',
  sourceType: 'All Sources',
  featuredOnly: false,
  recentOnly: false,
};

export default function Armory() {
  const [filters, setFilters] = useState<ArmoryFilterState>(defaultFilters);

  const filteredBuilds = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return weaponBuilds.filter((build) => {
      const matchesQuery =
        query.length === 0 ||
        [build.weapon, build.buildName, build.weaponClass, build.sourceName, build.mode, build.buildCode].some((value) =>
          value.toLowerCase().includes(query),
        );
      const matchesMode = filters.mode === 'All' || build.mode === filters.mode;
      const matchesClass = filters.weaponClass === 'All Classes' || build.weaponClass === filters.weaponClass;
      const matchesSource = filters.sourceType === 'All Sources' || build.sourceType === filters.sourceType;
      const matchesFeatured = !filters.featuredOnly || build.featured;
      const matchesRecent = !filters.recentOnly || build.lastCheckedDate === currentBlackOps7Season.lastCheckedDate;

      return matchesQuery && matchesMode && matchesClass && matchesSource && matchesFeatured && matchesRecent;
    });
  }, [filters]);

  return (
    <section className="page-section page-intro armory-page">
      <SectionHeader
        eyebrow="Armory"
        title="DMZ ARMORY"
        description="Source-verified Black Ops 7 weapon builds for Multiplayer, Zombies, and Warzone."
      />

      <div className="armory-briefing">
        <span>Current Season: {currentBlackOps7Season.name}</span>
        <p>
          Weapon balancing and seasonal updates may affect build performance. Source Verified means the code was confirmed on the cited
          webpage; it does not necessarily mean the DMZ clan has tested it in-game. Importing a code may still require the corresponding
          weapon and attachments to be unlocked.
        </p>
      </div>

      <ArmoryFilters
        filters={filters}
        modes={weaponModes}
        weaponClasses={weaponClasses}
        sources={sourceTypes}
        onChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
      />

      <div className="armory-results-header" aria-live="polite">
        <strong>{filteredBuilds.length}</strong>
        <span>{filteredBuilds.length === 1 ? 'build matched' : 'builds matched'}</span>
      </div>

      {filteredBuilds.length > 0 ? (
        <div className="armory-build-grid">
          {filteredBuilds.map((build) => (
            <WeaponBuildCard build={build} key={build.id} />
          ))}
        </div>
      ) : (
        <div className="armory-empty-state">
          <strong>No builds match those filters.</strong>
          <p>Clear the filters or try a different weapon, mode, class, or source.</p>
        </div>
      )}
    </section>
  );
}
