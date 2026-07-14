import { CheckCircle2, Radio } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { clanInfo } from '../data/clanInfo';

const requirements = [
  'Must be 18 or older.',
  'Use Discord for onboarding and event coordination.',
  'Respect squad comms and community rules.',
  'No cheating, boosting, exploit abuse, or harassment.',
  'Bring a cooperative mindset for casual and competitive play.',
];

export default function Join() {
  return (
    <section className="page-section page-intro">
      <SectionHeader
        eyebrow="Recruitment"
        title="Request access to the zone"
        description="Use the placeholder Discord invite below until the official DMZ invite is added."
      />
      <div className="join-layout">
        <div className="info-card">
          <h3>Entry Requirements</h3>
          <ul className="check-list">
            {requirements.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="join-panel">
          <p className="eyebrow">Discord Intake</p>
          <h3>Ready for comms?</h3>
          <p>
            Join Discord, read the server rules, and introduce yourself with your gamer tag, platform, role, and
            preferred modes.
          </p>
          <Button href={clanInfo.discordInvite}>
            <Radio size={18} />
            Join Discord
          </Button>
        </div>
      </div>
    </section>
  );
}
