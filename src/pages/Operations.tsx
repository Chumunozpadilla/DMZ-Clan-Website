import Mw4DeploymentCenter from '../components/sections/Mw4DeploymentCenter';
import SectionHeader from '../components/ui/SectionHeader';
import { operations } from '../data/operations';

export default function Operations() {
  return (
    <section className="page-section page-intro operations-page">
      <Mw4DeploymentCenter />
      <SectionHeader
        eyebrow="Operations"
        title="Clan event board"
        description="Dead Mans Zone events, squad rotations, and internal operational windows."
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
