import { ExternalLink, Shield } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ArmoryWeapon, WeaponMode } from '../../data/weaponBuilds';
import BuildStatusBadge from '../ui/BuildStatusBadge';
import CopyBuildCodeButton from '../ui/CopyBuildCodeButton';
import ArmoryWeaponVisual from './ArmoryWeaponVisual';

type WeaponBuildCardProps = {
  weapon: ArmoryWeapon;
  preferredVariantId?: string;
};

export default function WeaponBuildCard({ weapon, preferredVariantId }: WeaponBuildCardProps) {
  const initialVariant = weapon.variants.find((variant) => variant.id === preferredVariantId) ?? weapon.variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariant.id);

  useEffect(() => {
    if (preferredVariantId && weapon.variants.some((variant) => variant.id === preferredVariantId)) {
      setSelectedVariantId(preferredVariantId);
    }
  }, [preferredVariantId, weapon.variants]);

  const activeVariant = weapon.variants.find((variant) => variant.id === selectedVariantId) ?? weapon.variants[0];
  const modes = useMemo(() => Array.from(new Set(weapon.variants.map((variant) => variant.mode))), [weapon.variants]);
  const activeModeVariants = weapon.variants.filter((variant) => variant.mode === activeVariant.mode);
  const panelId = `${weapon.id}-build-panel`;

  const selectMode = (mode: WeaponMode) => {
    const nextVariant = weapon.variants.find((variant) => variant.mode === mode);
    if (nextVariant) setSelectedVariantId(nextVariant.id);
  };

  return (
    <article className="weapon-build-card">
      <div className="weapon-build-visual">
        <ArmoryWeaponVisual weapon={weapon} variant={activeVariant} />
        <div className="weapon-visual-labels">
          <span>{weapon.weaponClass}</span>
          <strong>{weapon.weapon}</strong>
        </div>
      </div>

      <div className="weapon-build-body">
        <div className="weapon-mode-tabs" role="tablist" aria-label={`${weapon.weapon} build modes`}>
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={activeVariant.mode === mode}
              aria-controls={panelId}
              className={activeVariant.mode === mode ? 'active' : ''}
              onClick={() => selectMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        <div id={panelId} role="tabpanel" className="weapon-variant-panel">
          {activeModeVariants.length > 1 ? (
            <label className="weapon-variant-select">
              <span>Build Option</span>
              <select value={activeVariant.id} onChange={(event) => setSelectedVariantId(event.target.value)}>
                {activeModeVariants.map((variant) => (
                  <option key={variant.id} value={variant.id}>{variant.buildName}</option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="build-badge-row">
            <BuildStatusBadge label={activeVariant.sourceType} tone="source" />
            <BuildStatusBadge label={activeVariant.verificationStatus} tone="verified" />
            <BuildStatusBadge label={activeVariant.mode} tone="mode" />
          </div>

          <h3>{activeVariant.buildName}</h3>
          <p>{activeVariant.summary}</p>

          <div className="build-code-panel">
            <span>Build Code</span>
            <code>{activeVariant.buildCode}</code>
          </div>

          <div className={activeVariant.attachments?.length ? 'attachment-list' : 'attachment-list empty'}>
            <span>Attachments</span>
            {activeVariant.attachments?.length ? (
              <ul>{activeVariant.attachments.map((attachment) => <li key={attachment}>{attachment}</li>)}</ul>
            ) : (
              <p>Attachments not explicitly published by the official source.</p>
            )}
          </div>

          <dl className="build-meta">
            {activeVariant.verifiedSeason ? <div><dt>Verified Season</dt><dd>{activeVariant.verifiedSeason}</dd></div> : null}
            <div><dt>Last Checked</dt><dd>{activeVariant.lastCheckedDate}</dd></div>
            <div><dt>Source</dt><dd>{activeVariant.sourceName}</dd></div>
          </dl>

          <div className="build-card-actions">
            <CopyBuildCodeButton code={activeVariant.buildCode} />
            <a href={activeVariant.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View source for ${weapon.weapon} ${activeVariant.mode} build`}>
              <Shield size={16} />
              View Source
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
