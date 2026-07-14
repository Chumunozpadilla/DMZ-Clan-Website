import { Radio } from 'lucide-react';
import { clanInfo } from '../../data/clanInfo';
import Button from '../ui/Button';

export default function DiscordCTA() {
  return (
    <section className="cta-band">
      <div>
        <p className="eyebrow">Primary Comms</p>
        <h2>All recruitment and operations route through Discord.</h2>
        <p>Use the placeholder invite for now, then replace it with the official DMZ server link.</p>
      </div>
      <Button href={clanInfo.discordInvite}>
        <Radio size={18} />
        Join Discord
      </Button>
    </section>
  );
}
