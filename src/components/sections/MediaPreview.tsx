import { mediaItems } from '../../data/media';
import SectionHeader from '../ui/SectionHeader';

export default function MediaPreview() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Media" title="Original clips and community highlights" />
      <div className="media-grid">
        {mediaItems.slice(0, 3).map((item) => (
          <article className="media-card" key={item.title}>
            <div className="media-placeholder">{item.type}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
