import { mediaItems } from '../../data/media';
import { assetPath } from '../../utils/assetPath';
import SectionHeader from '../ui/SectionHeader';
import FeaturedArmoryCarousel from './FeaturedArmoryCarousel';

export default function MediaPreview() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Media" title="Original clips and community highlights" />
      <div className="media-grid">
        {mediaItems.slice(0, 3).map((item) =>
          item.title === 'Loadout Feature' ? (
            <FeaturedArmoryCarousel key={item.title} />
          ) : (
            <article className="media-card" key={item.title}>
              {item.videoSrc ? (
                <video className="media-player" controls preload="metadata">
                  <source src={assetPath(item.videoSrc)} type="video/mp4" />
                </video>
              ) : (
                <div className="media-placeholder">{item.type}</div>
              )}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
