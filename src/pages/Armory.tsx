import { useEffect, useMemo, useState } from 'react';
import ArmoryFilters, { type ArmoryFilterState } from '../components/sections/ArmoryFilters';
import WeaponBuildCard from '../components/sections/WeaponBuildCard';
import SectionHeader from '../components/ui/SectionHeader';
import { armoryWeapons, currentBlackOps7Season, sourceTypes, weaponClasses, weaponModes } from '../data/weaponBuilds';
import { requestCompactRadio } from '../utils/radioLayout';

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

  useEffect(() => {
    requestCompactRadio(true);
    return () => requestCompactRadio(false);
  }, []);

  const filteredWeapons = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return armoryWeapons.flatMap((weapon) => {
      const weaponMatchesQuery = query.length === 0 || [weapon.weapon, weapon.weaponClass, weapon.description ?? ''].some((value) =>
        value.toLowerCase().includes(query),
      );
      const matchingVariants = weapon.variants.filter((variant) => {
        const variantMatchesQuery =
          query.length === 0 ||
          weaponMatchesQuery ||
          [variant.buildName, variant.sourceName, variant.mode, variant.buildCode].some((value) => value.toLowerCase().includes(query));
        const matchesMode = filters.mode === 'All' || variant.mode === filters.mode;
        const matchesSource = filters.sourceType === 'All Sources' || variant.sourceType === filters.sourceType;
        const matchesRecent = !filters.recentOnly || variant.lastCheckedDate === currentBlackOps7Season.lastCheckedDate;

        return variantMatchesQuery && matchesMode && matchesSource && matchesRecent;
      });
      const matchesClass = filters.weaponClass === 'All Classes' || weapon.weaponClass === filters.weaponClass;
      const matchesFeatured = !filters.featuredOnly || weapon.featured;

      return matchesClass && matchesFeatured && matchingVariants.length > 0
        ? [{ weapon, matchingVariantCount: matchingVariants.length, preferredVariantId: matchingVariants[0].id }]
        : [];
    });
  }, [filters]);

  const matchingBuildCount = filteredWeapons.reduce((total, result) => total + result.matchingVariantCount, 0);

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
        <strong>{filteredWeapons.length} {filteredWeapons.length === 1 ? 'weapon' : 'weapons'}</strong>
        <span>/ {matchingBuildCount} {matchingBuildCount === 1 ? 'verified build' : 'verified builds'}</span>
      </div>

      {filteredWeapons.length > 0 ? (
        <div className="armory-build-grid">
          {filteredWeapons.map(({ weapon, preferredVariantId }) => (
            <WeaponBuildCard weapon={weapon} preferredVariantId={preferredVariantId} key={weapon.id} />
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
