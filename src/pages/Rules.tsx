import SectionHeader from '../components/ui/SectionHeader';
import { rules } from '../data/rules';

export default function Rules() {
  return (
    <section className="page-section page-intro">
      <SectionHeader
        eyebrow="Rules"
        title="Rules of engagement"
        description="The short version: be adult, be fair, use clean comms, and keep the Discord useful."
      />
      <div className="rule-list">
        {rules.map((rule, index) => (
          <article className="rule-card" key={rule.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{rule.title}</h3>
              <p>{rule.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
