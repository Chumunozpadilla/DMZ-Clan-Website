import SectionHeader from '../components/ui/SectionHeader';
import { mediaItems } from '../data/media';
import { assetPath } from '../utils/assetPath';

export default function Media() {
  return (
    <section className="page-section page-intro">
      <SectionHeader
        eyebrow="Media"
        title="Original DMZ highlights"
        description="No copyrighted game artwork is included. Replace these placeholders with approved original clips, screenshots, and community media."
      />
      <div className="media-grid">
        {mediaItems.map((item) => (
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
        ))}
      </div>
    </section>
  );
}
