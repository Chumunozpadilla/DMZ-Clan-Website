import { useEffect, useRef } from 'react';
import { ExternalLink, PlayCircle, RadioTower, ShieldCheck, Users } from 'lucide-react';
import { clanInfo } from '../../data/clanInfo';
import { getMw4DeploymentStatus, mw4Deployment } from '../../data/mw4Deployment';
import useEasternDateKey from '../../hooks/useEasternDateKey';
import { requestCompactRadio } from '../../utils/radioLayout';
import Button from '../ui/Button';

export default function OperationsAnnouncement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const currentDate = useEasternDateKey();
  const status = getMw4DeploymentStatus(currentDate);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => requestCompactRadio(entry.isIntersecting, 'right', 'mw4-announcement'),
      { threshold: 0.2 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      requestCompactRadio(false, 'right', 'mw4-announcement');
    };
  }, []);

  return (
    <section ref={sectionRef} className="operations-alert" aria-labelledby="operations-alert-heading">
      <div className="operations-alert-copy">
        <div className="operations-alert-topline">
          <span>Classified</span>
          <span>Mission Briefing</span>
          <span>Deployment Update</span>
        </div>
        <p className="eyebrow" id="operations-alert-heading">
          DMZ OPERATIONS ALERT
        </p>
        <h2>MW4 DMZ DEPLOYMENT CENTER</h2>
        <div className={`deployment-status status-${status.id}`} role="status">
          <RadioTower size={18} aria-hidden="true" />
          <span>
            <strong>{status.label}</strong>
            <small>{status.detail}</small>
          </span>
        </div>
        <ol className="deployment-mini-timeline" aria-label="Modern Warfare 4 deployment timeline">
          {mw4Deployment.milestones.map((milestone) => (
            <li className={currentDate >= milestone.date ? 'reached' : ''} key={milestone.id}>
              <time dateTime={milestone.date}>{milestone.displayDate.replace(', 2026', '')}</time>
              <span>{milestone.label}</span>
            </li>
          ))}
        </ol>
        <div className="operations-alert-actions">
          <Button href="/operations">
            <ShieldCheck size={18} aria-hidden="true" />
            OPEN DEPLOYMENT CENTER
          </Button>
          <Button href={clanInfo.discordInvite} variant="secondary">
            <Users size={18} aria-hidden="true" />
            FORM DEPLOYMENT SQUAD
          </Button>
          <Button href={mw4Deployment.preorderUrl} variant="ghost">
            <ExternalLink size={18} aria-hidden="true" />
            PLAYSTATION DEPLOYMENT
          </Button>
        </div>
      </div>
      <div className="operations-alert-video" aria-label="Official DMZ briefing video">
        <div className="operations-video-label">
          <PlayCircle size={16} aria-hidden="true" />
          <span>Official DMZ Briefing</span>
        </div>
        <iframe
          src={mw4Deployment.featuredVideo.embedUrl}
          title={mw4Deployment.featuredVideo.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
