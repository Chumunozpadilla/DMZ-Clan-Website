import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredArmoryWeapons, getFeaturedVariant } from '../../data/weaponBuilds';
import { requestCompactRadio } from '../../utils/radioLayout';
import BuildStatusBadge from '../ui/BuildStatusBadge';
import CopyBuildCodeButton from '../ui/CopyBuildCodeButton';
import ArmoryWeaponVisual from './ArmoryWeaponVisual';

export default function FeaturedArmoryCarousel() {
  const weapons = useMemo(() => featuredArmoryWeapons, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const activeWeapon = weapons[activeIndex];
  const activeVariant = activeWeapon ? getFeaturedVariant(activeWeapon) : undefined;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => requestCompactRadio(entry.isIntersecting, 'left'),
      { threshold: 0.2 },
    );
    observer.observe(card);

    return () => {
      observer.disconnect();
      requestCompactRadio(false, 'left');
    };
  }, []);

  const moveSlide = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + weapons.length) % weapons.length);
  };

  if (!activeWeapon || !activeVariant) {
    return (
      <article className="media-card featured-armory-card">
        <div className="featured-armory-empty">Armory</div>
        <h3>FEATURED ARMORY</h3>
        <p>Source-verified Black Ops 7 weapon builds will appear here once confirmed.</p>
        <Link className="featured-armory-link" to="/armory">View Full Armory</Link>
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
    if (touchStartX.current === null) return;
    const delta = clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) moveSlide(delta < 0 ? 1 : -1);
  };

  return (
    <article
      ref={cardRef}
      className="media-card featured-armory-card"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      aria-label="Featured Armory carousel. Use left and right arrow keys to change featured weapons."
    >
      <div className="featured-armory-preview">
        <ArmoryWeaponVisual weapon={activeWeapon} variant={activeVariant} eager />
        <div className="featured-armory-top">
          <BuildStatusBadge label={activeVariant.sourceType} tone="source" />
          <BuildStatusBadge label={activeVariant.verificationStatus} tone="verified" />
        </div>
        <div className="featured-weapon-labels">
          <strong>{activeWeapon.weapon}</strong>
          <small>{activeWeapon.weaponClass}</small>
          <span>{activeVariant.mode}</span>
        </div>
      </div>

      <div className="featured-armory-content">
        <div className="featured-armory-heading-row">
          <h3>FEATURED ARMORY</h3>
          <span>{activeIndex + 1} of {weapons.length}</span>
        </div>
        <h4>{activeVariant.buildName}</h4>
        <p>{activeVariant.summary}</p>

        <div className="build-code-panel compact">
          <span>Build Code</span>
          <code>{activeVariant.buildCode}</code>
        </div>

        <div className="featured-armory-actions">
          <CopyBuildCodeButton code={activeVariant.buildCode} />
          <Link className="featured-armory-link" to="/armory">View Full Armory</Link>
        </div>
      </div>

      <div className="featured-armory-controls">
        <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous featured weapon"><ChevronLeft size={18} /></button>
        <div className="featured-armory-dots" aria-label="Featured weapon slides">
          {weapons.map((weapon, index) => (
            <button
              key={weapon.id}
              type="button"
              className={index === activeIndex ? 'active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show featured weapon ${index + 1}: ${weapon.weapon}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => moveSlide(1)} aria-label="Next featured weapon"><ChevronRight size={18} /></button>
      </div>
    </article>
  );
}
