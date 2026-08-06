import { RotateCcw, Search } from 'lucide-react';
import type { SourceType, WeaponMode } from '../../data/weaponBuilds';

export type ArmoryFilterState = {
  query: string;
  mode: 'All' | WeaponMode;
  weaponClass: 'All Classes' | string;
  sourceType: 'All Sources' | SourceType;
  featuredOnly: boolean;
  recentOnly: boolean;
};

type ArmoryFiltersProps = {
  filters: ArmoryFilterState;
  modes: WeaponMode[];
  weaponClasses: string[];
  sources: SourceType[];
  onChange: (filters: ArmoryFilterState) => void;
  onClear: () => void;
};

export default function ArmoryFilters({ filters, modes, weaponClasses, sources, onChange, onClear }: ArmoryFiltersProps) {
  return (
    <form className="armory-filters" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="armory-search-field">
        <span>Search Builds</span>
        <div>
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder="Weapon, build, class, or source"
            aria-label="Search weapon builds"
          />
        </div>
      </label>

      <label>
        <span>Mode</span>
        <select value={filters.mode} onChange={(event) => onChange({ ...filters, mode: event.target.value as ArmoryFilterState['mode'] })}>
          <option>All</option>
          {modes.map((mode) => (
            <option key={mode}>{mode}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Weapon Class</span>
        <select
          value={filters.weaponClass}
          onChange={(event) => onChange({ ...filters, weaponClass: event.target.value as ArmoryFilterState['weaponClass'] })}
        >
          <option>All Classes</option>
          {weaponClasses.map((weaponClass) => (
            <option key={weaponClass}>{weaponClass}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Source</span>
        <select
          value={filters.sourceType}
          onChange={(event) => onChange({ ...filters, sourceType: event.target.value as ArmoryFilterState['sourceType'] })}
        >
          <option>All Sources</option>
          {sources.map((source) => (
            <option key={source}>{source}</option>
          ))}
        </select>
      </label>

      <label className="armory-toggle">
        <input
          type="checkbox"
          checked={filters.featuredOnly}
          onChange={(event) => onChange({ ...filters, featuredOnly: event.target.checked })}
        />
        <span>Featured Builds</span>
      </label>

      <label className="armory-toggle">
        <input
          type="checkbox"
          checked={filters.recentOnly}
          onChange={(event) => onChange({ ...filters, recentOnly: event.target.checked })}
        />
        <span>Recently Checked</span>
      </label>

      <button className="armory-clear" type="button" onClick={onClear}>
        <RotateCcw size={16} />
        Clear Filters
      </button>
    </form>
  );
}
