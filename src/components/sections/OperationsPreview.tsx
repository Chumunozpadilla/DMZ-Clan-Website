import { operations } from '../../data/operations';
import SectionHeader from '../ui/SectionHeader';

export default function OperationsPreview() {
  return (
    <section className="page-section">
      <SectionHeader
        eyebrow="Operations"
        title="Scheduled squad movement"
        description="Placeholder operations are ready to edit once DMZ has final event names and dates."
      />
      <div className="card-grid">
        {operations.slice(0, 3).map((operation) => (
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
