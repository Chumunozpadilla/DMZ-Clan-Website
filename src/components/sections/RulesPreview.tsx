import { rules } from '../../data/rules';
import SectionHeader from '../ui/SectionHeader';

export default function RulesPreview() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Rules of Engagement" title="Keep the zone disciplined" />
      <div className="rule-strip">
        {rules.slice(0, 4).map((rule) => (
          <article key={rule.title}>
            <h3>{rule.title}</h3>
            <p>{rule.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
