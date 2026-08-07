import { ChevronLeft, ChevronRight, Crosshair } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredWeaponBuilds } from '../../data/weaponBuilds';
import { assetPath } from '../../utils/assetPath';
import BuildStatusBadge from '../ui/BuildStatusBadge';
import CopyBuildCodeButton from '../ui/CopyBuildCodeButton';

export default function FeaturedArmoryCarousel() {
  const builds = useMemo(() => featuredWeaponBuilds, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeBuild = builds[activeIndex];

  const moveSlide = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + builds.length) % builds.length);
  };

  if (builds.length === 0) {
    return (
      <article className="media-card featured-armory-card">
        <div className="featured-armory-empty">Armory</div>
        <h3>FEATURED ARMORY</h3>
        <p>Source-verified Black Ops 7 weapon builds will appear here once confirmed.</p>
        <Link className="featured-armory-link" to="/armory">
          View Full Armory
        </Link>
      </article>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveSlide(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveSlide(1);
    }
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) {
      return;
    }

    const delta = clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) > 40) {
      moveSlide(delta < 0 ? 1 : -1);
    }
  };

  return (
    <article
      className="media-card featured-armory-card"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      aria-label="Featured Armory carousel. Use left and right arrow keys to change featured builds."
    >
      <div
        className={activeBuild.imageUrl ? 'featured-armory-preview has-image' : 'featured-armory-preview'}
        aria-label={`${activeBuild.weapon} featured armory preview`}
      >
        <div className="featured-armory-scanline" />
        {activeBuild.imageUrl ? (
          <img className="armory-weapon-image" src={assetPath(activeBuild.imageUrl)} alt={activeBuild.imageAlt ?? `${activeBuild.weapon} image`} />
        ) : null}
        <div className="featured-armory-top">
          <Crosshair size={22} aria-hidden="true" />
          <BuildStatusBadge label={activeBuild.sourceType} tone="source" />
        </div>
        <strong>{activeBuild.weapon}</strong>
        <small>{activeBuild.weaponClass}</small>
        <span>{activeBuild.mode}</span>
      </div>

      <div className="featured-armory-content">
        <div className="featured-armory-heading-row">
          <h3>FEATURED ARMORY</h3>
          <span>
            {activeIndex + 1} of {builds.length}
          </span>
        </div>
        <h4>{activeBuild.buildName}</h4>
        <p>{activeBuild.summary}</p>

        <div className="build-code-panel compact">
          <span>Build Code</span>
          <code>{activeBuild.buildCode}</code>
        </div>

        {activeBuild.attachments && activeBuild.attachments.length > 0 ? (
          <div className="featured-attachment-strip">
            <span>Attachments</span>
            <strong>{activeBuild.attachments.length}</strong>
          </div>
        ) : null}

        <div className="featured-armory-actions">
          <CopyBuildCodeButton code={activeBuild.buildCode} />
          <Link className="featured-armory-link" to="/armory">
            View Full Armory
          </Link>
        </div>
      </div>

      <div className="featured-armory-controls">
        <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous featured build">
          <ChevronLeft size={18} />
        </button>
        <div className="featured-armory-dots" aria-label="Featured build slides">
          {builds.map((build, index) => (
            <button
              key={build.id}
              type="button"
              className={index === activeIndex ? 'active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show featured build ${index + 1}: ${build.weapon}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => moveSlide(1)} aria-label="Next featured build">
          <ChevronRight size={18} />
        </button>
      </div>
    </article>
  );
}
