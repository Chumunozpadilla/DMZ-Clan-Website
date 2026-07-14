import { Shield, Signal, Users } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { clanInfo } from '../data/clanInfo';

export default function About() {
  return (
    <section className="page-section page-intro">
      <SectionHeader
        eyebrow="About DMZ"
        title="A disciplined home for adult squad play"
        description={clanInfo.description}
      />
      <div className="content-grid">
        <article className="info-card tall-card">
          <Shield size={28} />
          <h3>Identity</h3>
          <p>
            DMZ uses a biohazard containment-zone theme to signal control, focus, and tactical readiness. The visual
            direction is industrial and military-inspired without horror imagery.
          </p>
        </article>
        <article className="info-card tall-card">
          <Users size={28} />
          <h3>Community</h3>
          <p>
            This is an 18+ space for players who want dependable teammates, clear expectations, and a place to squad up
            without noise or drama.
          </p>
        </article>
        <article className="info-card tall-card">
          <Signal size={28} />
          <h3>Comms</h3>
          <p>
            Discord is the center of the community. Announcements, recruiting, events, and officer contact all route
            through the server.
          </p>
        </article>
      </div>
      <p className="affiliation-note">{clanInfo.affiliation}</p>
    </section>
  );
}
