import { Crosshair, ExternalLink, Shield } from 'lucide-react';
import type { WeaponBuild } from '../../data/weaponBuilds';
import BuildStatusBadge from '../ui/BuildStatusBadge';
import CopyBuildCodeButton from '../ui/CopyBuildCodeButton';

type WeaponBuildCardProps = {
  build: WeaponBuild;
};

export default function WeaponBuildCard({ build }: WeaponBuildCardProps) {
  return (
    <article className="weapon-build-card">
      <div className="weapon-build-visual" aria-label={`${build.weapon} ${build.weaponClass} tactical build preview`}>
        <div>
          <Crosshair size={24} aria-hidden="true" />
          <span>{build.mode}</span>
        </div>
        <strong>{build.weapon}</strong>
        <small>{build.weaponClass}</small>
      </div>

      <div className="weapon-build-body">
        <div className="build-badge-row">
          <BuildStatusBadge label={build.sourceType} tone="source" />
          <BuildStatusBadge label={build.verificationStatus} tone="verified" />
          <BuildStatusBadge label={build.mode} tone="mode" />
        </div>

        <h3>{build.buildName}</h3>
        <p>{build.summary}</p>

        <div className="build-code-panel">
          <span>Build Code</span>
          <code>{build.buildCode}</code>
        </div>

        {build.attachments && build.attachments.length > 0 ? (
          <div className="attachment-list">
            <span>Verified Attachments</span>
            <ul>
              {build.attachments.map((attachment) => (
                <li key={attachment}>{attachment}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <dl className="build-meta">
          {build.verifiedSeason ? (
            <div>
              <dt>Season</dt>
              <dd>{build.verifiedSeason}</dd>
            </div>
          ) : null}
          <div>
            <dt>Last Checked</dt>
            <dd>{build.lastCheckedDate}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{build.sourceName}</dd>
          </div>
        </dl>

        <div className="build-card-actions">
          <CopyBuildCodeButton code={build.buildCode} />
          <a href={build.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View source for ${build.weapon} ${build.mode} build`}>
            <Shield size={16} />
            View Source
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
