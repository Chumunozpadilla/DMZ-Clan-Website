import { AlertTriangle, ExternalLink, PlayCircle } from 'lucide-react';
import Button from '../ui/Button';

const preorderUrl = 'https://store.playstation.com/en-us/product/UP0002-PPSA01649_00-CODMW4STANDARD01';
const trailerUrl = 'https://www.youtube.com/watch?v=kDyF332CUO4';
const trailerEmbedUrl = 'https://www.youtube.com/embed/kDyF332CUO4?rel=0';

export default function OperationsAnnouncement() {
  return (
    <section className="operations-alert" aria-labelledby="operations-alert-heading">
      <div className="operations-alert-copy">
        <div className="operations-alert-topline">
          <span>Classified</span>
          <span>Mission Briefing</span>
          <span>Deployment Update</span>
        </div>
        <p className="eyebrow" id="operations-alert-heading">
          DMZ OPERATIONS ALERT
        </p>
        <h2>CALL OF DUTY: MODERN WARFARE 4 DEPLOYMENT</h2>
        <p>
          Prepare for the next operation. Modern Warfare 4 is available for PS5 pre-order. Secure your copy before
          deployment.
        </p>
        <div className="operations-alert-actions">
          <Button href={preorderUrl}>
            <AlertTriangle size={18} />
            PRE-ORDER MW4 NOW
          </Button>
          <Button href={trailerUrl} variant="secondary">
            <ExternalLink size={18} />
            WATCH VAULT EDITION TRAILER
          </Button>
        </div>
      </div>
      <div className="operations-alert-video" aria-label="Vault Edition trailer">
        <div className="operations-video-label">
          <PlayCircle size={16} aria-hidden="true" />
          <span>Vault Edition Trailer</span>
        </div>
        <iframe
          src={trailerEmbedUrl}
          title="Call of Duty: Modern Warfare 4 Vault Edition trailer"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}
