import SectionHeader from '../components/ui/SectionHeader';
import { operations } from '../data/operations';

export default function Operations() {
  return (
    <section className="page-section page-intro">
      <SectionHeader
        eyebrow="Operations"
        title="Event board"
        description="Placeholder operations can be replaced with official DMZ events, schedules, and squad rotations."
      />
      <div className="card-grid">
        {operations.map((operation) => (
          <article className="info-card" key={operation.name}>
            <span className="status-pill">{operation.status}</span>
            <h3>{operation.name}</h3>
            <strong>{operation.date}</strong>
            <p>{operation.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
