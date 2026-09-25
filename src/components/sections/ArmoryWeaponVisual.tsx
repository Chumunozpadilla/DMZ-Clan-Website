import { useEffect, useState } from 'react';
import type { ArmoryWeapon, WeaponBuildVariant } from '../../data/weaponBuilds';
import { getWeaponImageCandidates } from '../../data/weaponBuilds';
import { assetPath } from '../../utils/assetPath';

type ArmoryWeaponVisualProps = {
  weapon: ArmoryWeapon;
  variant: WeaponBuildVariant;
  eager?: boolean;
};

const resolveImageUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : assetPath(url));

export default function ArmoryWeaponVisual({ weapon, variant, eager = false }: ArmoryWeaponVisualProps) {
  const candidates = getWeaponImageCandidates(weapon, variant);
  const [imageIndex, setImageIndex] = useState(0);
  const image = candidates[Math.min(imageIndex, candidates.length - 1)];

  useEffect(() => setImageIndex(0), [variant.id, weapon.id]);

  return (
    <figure className={`armory-weapon-figure image-${image.kind.toLowerCase().replace(/ /g, '-')}`}>
      <img
        className="armory-weapon-image"
        src={resolveImageUrl(image.url)}
        alt={image.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setImageIndex((current) => Math.min(current + 1, candidates.length - 1))}
      />
      {image.kind === 'Official Weapon Image' ? (
        <figcaption>
          <span>Official weapon image. Imported build appearance may vary.</span>
          {image.sourceUrl ? (
            <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">
              Weapon image: {image.sourceName}
            </a>
          ) : null}
        </figcaption>
      ) : image.kind === 'DMZ Gunsmith Screenshot' ? (
        <figcaption>DMZ Gunsmith screenshot for this build.</figcaption>
      ) : (
        <figcaption>DMZ tactical silhouette shown while weapon imagery is unavailable.</figcaption>
      )}
    </figure>
  );
}
