import { useEffect, useState, type KeyboardEvent } from 'react';
import { ExternalLink, PlayCircle, RadioTower, ShieldCheck, Users } from 'lucide-react';
import { clanInfo } from '../../data/clanInfo';
import {
  getMw4DeploymentStatus,
  mw4Deployment,
  type Mw4IntelTopic,
} from '../../data/mw4Deployment';
import useEasternDateKey from '../../hooks/useEasternDateKey';
import { requestCompactRadio } from '../../utils/radioLayout';
import Button from '../ui/Button';

export default function Mw4DeploymentCenter() {
  const [activeIntelId, setActiveIntelId] = useState<Mw4IntelTopic['id']>(mw4Deployment.intelTopics[0].id);
  const currentDate = useEasternDateKey();
  const status = getMw4DeploymentStatus(currentDate);
  const activeIntel =
    mw4Deployment.intelTopics.find((topic) => topic.id === activeIntelId) ?? mw4Deployment.intelTopics[0];

  useEffect(() => {
    requestCompactRadio(true, 'right', 'mw4-deployment-center');
    return () => requestCompactRadio(false, 'right', 'mw4-deployment-center');
  }, []);

  const handleIntelKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const lastIndex = mw4Deployment.intelTopics.length - 1;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextTopic = mw4Deployment.intelTopics[nextIndex];
    setActiveIntelId(nextTopic.id);
    window.requestAnimationFrame(() => document.getElementById(`deployment-intel-tab-${nextTopic.id}`)?.focus());
  };

  return (
    <section className="deployment-center" aria-labelledby="deployment-center-heading">
      <div className="deployment-center-header">
        <div>
          <p className="eyebrow">Official Deployment Intel</p>
          <h2 id="deployment-center-heading">MW4 DMZ DEPLOYMENT CENTER</h2>
          <p>
            Source-linked Modern Warfare 4 deployment information, organized for Dead Mans Zone squad coordination.
          </p>
        </div>
        <a href={mw4Deployment.sourceUrl} target="_blank" rel="noopener noreferrer" className="deployment-source-link">
          <ExternalLink size={17} aria-hidden="true" />
          Official Call of Duty source
        </a>
      </div>

      <div className="deployment-command-grid">
        <div className="deployment-command-panel">
          <div className={`deployment-status status-${status.id}`} role="status">
            <RadioTower size={20} aria-hidden="true" />
            <span>
              <strong>{status.label}</strong>
              <small>{status.detail}</small>
            </span>
          </div>

          <ol className="deployment-timeline" aria-label="Modern Warfare 4 deployment timeline">
            {mw4Deployment.milestones.map((milestone) => {
              const activeMilestone =
                (status.id === 'dmz-early-access' && milestone.id === 'dmz-early-access') ||
                (status.id === 'full-deployment' && milestone.id === 'full-launch');
              const state = activeMilestone ? 'active' : currentDate >= milestone.date ? 'complete' : 'upcoming';

              return (
                <li className={state} key={milestone.id}>
                  <span className="deployment-marker" aria-hidden="true" />
                  <div>
                    <time dateTime={milestone.date}>{milestone.displayDate}</time>
                    <h3>{milestone.label}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="deployment-center-actions">
            <Button href={clanInfo.discordInvite}>
              <Users size={18} aria-hidden="true" />
              FORM A DEPLOYMENT SQUAD
            </Button>
            <Button href={mw4Deployment.preorderUrl} variant="secondary">
              <ShieldCheck size={18} aria-hidden="true" />
              PLAYSTATION DEPLOYMENT
            </Button>
          </div>
        </div>

        <div className="deployment-video-panel">
          <div className="operations-video-label">
            <PlayCircle size={16} aria-hidden="true" />
            <span>Official DMZ Documentary</span>
          </div>
          <iframe
            src={mw4Deployment.featuredVideo.embedUrl}
            title={mw4Deployment.featuredVideo.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
          <div className="deployment-video-copy">
            <strong>{mw4Deployment.featuredVideo.title}</strong>
            <a href={mw4Deployment.featuredVideo.watchUrl} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="deployment-intel-terminal">
        <div className="deployment-intel-heading">
          <div>
            <p className="eyebrow">Mission Briefing Index</p>
            <h3>OFFICIAL DMZ INTEL TOPICS</h3>
          </div>
          <span>Source catalog // Call of Duty</span>
        </div>

        <div className="deployment-intel-tabs" role="tablist" aria-label="Official DMZ intel topics">
          {mw4Deployment.intelTopics.map((topic, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={topic.id === activeIntel.id}
              aria-controls="deployment-intel-panel"
              id={`deployment-intel-tab-${topic.id}`}
              key={topic.id}
              tabIndex={topic.id === activeIntel.id ? 0 : -1}
              onClick={() => setActiveIntelId(topic.id)}
              onKeyDown={(event) => handleIntelKeyDown(event, index)}
            >
              {topic.label}
            </button>
          ))}
        </div>

        <div
          className="deployment-intel-panel"
          id="deployment-intel-panel"
          role="tabpanel"
          aria-labelledby={`deployment-intel-tab-${activeIntel.id}`}
          tabIndex={0}
        >
          <span>Official briefing topic</span>
          <h4>{activeIntel.heading}</h4>
          <p>{activeIntel.summary}</p>
          <a href={mw4Deployment.sourceUrl} target="_blank" rel="noopener noreferrer">
            Review on the official MW4 site
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="deployment-disclaimer">
        Official dates and topic names are sourced from CallofDuty.com. Dead Mans Zone summaries and squad-planning
        controls are independent community content.
      </p>
    </section>
  );
}
