import { Monitor, ShieldCheck, Target, UserRound } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { rosterGroups, rosterSummary } from '../data/roster';

export default function Roster() {
  return (
    <section className="page-section page-intro">
      <SectionHeader
        eyebrow="Roster"
        title="DMZ personnel board"
        description="Current DMZ personnel organized by leadership, officers, and soldiers."
      />
      <div className="personnel-summary" aria-label="Personnel summary">
        {rosterSummary.map((item) => (
          <div key={item.label}>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <div className="roster-groups">
        {rosterGroups.map((group) => (
          <section className="roster-group" key={group.title}>
            <div className="roster-heading">
              <div>
                <p className="eyebrow">{group.title}</p>
                <h3>{group.description}</h3>
              </div>
              <span>{group.members.length} listed</span>
            </div>
            <div className="roster-grid">
              {group.members.map((member) => (
                <article className="roster-card" key={member.gamerTag}>
                  <div className="roster-avatar">
                    {member.profileImage ? (
                      <img src={member.profileImage} alt={`${member.gamerTag} profile`} />
                    ) : (
                      <UserRound size={28} />
                    )}
                  </div>
                  <h4>{member.gamerTag}</h4>
                  <dl>
                    <div>
                      <dt>
                        <ShieldCheck size={15} />
                        Rank
                      </dt>
                      <dd>{member.rank}</dd>
                    </div>
                    <div>
                      <dt>
                        <Monitor size={15} />
                        Platform
                      </dt>
                      <dd>{member.platform}</dd>
                    </div>
                    <div>
                      <dt>
                        <Target size={15} />
                        Role
                      </dt>
                      <dd>{member.role}</dd>
                    </div>
                    <div>
                      <dt>Mode</dt>
                      <dd>{member.preferredMode}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
