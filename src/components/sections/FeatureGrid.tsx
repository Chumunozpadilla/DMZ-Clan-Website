import { Crosshair, Headphones, ShieldCheck, Siren } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Mature Community', text: 'Adults-only environment with a calm, reliable squad culture.' },
  { icon: Headphones, title: 'Discord First', text: 'Recruitment, events, announcements, and party finding live in Discord.' },
  { icon: Crosshair, title: 'COD Focused', text: 'Built for multiplayer, ranked, Warzone, customs, and squad nights.' },
  { icon: Siren, title: 'Containment Style', text: 'Industrial identity, sharp contrast, and original tactical visuals.' },
];

export default function FeatureGrid() {
  return (
    <section className="feature-grid">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <article className="feature-card" key={feature.title}>
            <Icon size={24} />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        );
      })}
    </section>
  );
}
