import { Mail, Radio } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { clanInfo } from '../data/clanInfo';

export default function Contact() {
  return (
    <section className="page-section page-intro">
      <SectionHeader
        eyebrow="Contact"
        title="Open a comms channel"
        description="Discord is the preferred path for recruitment, officer questions, and event coordination."
      />
      <div className="contact-grid">
        <article className="join-panel">
          <Radio size={28} />
          <h3>Discord</h3>
          <p>Placeholder invite link. Replace it with the official DMZ Discord invite when ready.</p>
          <Button href={clanInfo.discordInvite}>Join Discord</Button>
        </article>
        <article className="info-card">
          <Mail size={28} />
          <h3>Social Links</h3>
          <div className="social-list">
            {clanInfo.socials.map((social) => (
              <a href={social.href} key={social.label} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
          <p>{clanInfo.email}</p>
        </article>
      </div>
    </section>
  );
}
