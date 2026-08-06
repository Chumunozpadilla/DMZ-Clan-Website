import type { SourceType, VerificationStatus, WeaponMode } from '../../data/weaponBuilds';

type BuildStatusBadgeProps = {
  label: SourceType | VerificationStatus | WeaponMode | string;
  tone?: 'source' | 'verified' | 'mode' | 'neutral';
};

export default function BuildStatusBadge({ label, tone = 'neutral' }: BuildStatusBadgeProps) {
  return <span className={`build-badge build-badge-${tone}`}>{label}</span>;
}
