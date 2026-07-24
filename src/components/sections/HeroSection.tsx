import { ShieldAlert, Users } from 'lucide-react';
import { clanInfo } from '../../data/clanInfo';
import { assetPath } from '../../utils/assetPath';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">18+ Call of Duty Community</p>
        <h1>
          {clanInfo.name.split(' ').map((word) => (
            <span key={word}>{word}</span>
          ))}
        </h1>
        <p className="hero-tagline">{clanInfo.tagline}</p>
        <p>{clanInfo.description}</p>
        <div className="hero-actions">
          <Button href="/join">
            <Users size={18} />
            Join DMZ
          </Button>
          <Button href="/operations" variant="secondary">
            <ShieldAlert size={18} />
            View Operations
          </Button>
        </div>
      </div>
      <div className="containment-panel" aria-label="Containment status display">
        <div className="panel-topline">
          <span>CLASSIFIED / DMZ-CF</span>
          <strong>ZONE ACTIVE</strong>
        </div>
        <div className="panel-warning-row">
          <span>Containment Force Insignia</span>
          <span>18+ Access Only</span>
        </div>
        <div className="dmz-emblem" aria-label="Dead Mans Zone tactical insignia">
          <img src={assetPath('images/emblems/dmz-emblem.png')} alt="Dead Mans Zone DMZ containment force emblem" />
          <div className="emblem-tags">
            <span>Unit Patch</span>
            <span>Biohazard Control</span>
          </div>
        </div>
        <div className="classification-strip">
          <span>WARNING: AUTHORIZED COMMS ONLY</span>
          <span>SECTOR // DEAD MANS ZONE</span>
        </div>
        <div className="readout-grid">
          <div>
            <small>AGE GATE</small>
            <strong>18+</strong>
          </div>
          <div>
            <small>COMMS</small>
            <strong>DISCORD</strong>
          </div>
          <div>
            <small>STYLE</small>
            <strong>TACTICAL</strong>
          </div>
          <div>
            <small>STATUS</small>
            <strong>RECRUITING</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
