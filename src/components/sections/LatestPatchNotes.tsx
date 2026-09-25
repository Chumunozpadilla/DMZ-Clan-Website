import { ChevronDown, ExternalLink, RadioTower } from 'lucide-react';
import { patchNotesFeed } from '../../data/patchNotes';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';

const toDateTime = (date: string) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
};

export default function LatestPatchNotes() {
  return (
    <section className="page-section patch-notes-section" aria-label="Latest Call of Duty patch notes">
      <div className="patch-notes-heading-row">
        <SectionHeader
          eyebrow="Official Intel Feed"
          title="Latest Call of Duty Patch Notes"
          description="Current deployment updates for Warzone and the main Call of Duty title, synchronized from the official Call of Duty patch-notes hub."
        />
        <a href={patchNotesFeed.sourceUrl} target="_blank" rel="noopener noreferrer" className="patch-notes-source">
          <RadioTower size={17} aria-hidden="true" />
          Official Call of Duty source
        </a>
      </div>

      <div className="patch-notes-grid">
        {patchNotesFeed.streams.map((stream) => (
          <article className="patch-note-card" key={stream.id}>
            <div className={stream.latest.imageUrl ? 'patch-note-visual has-image' : 'patch-note-visual'}>
              {stream.latest.imageUrl ? (
                <img
                  src={stream.latest.imageUrl}
                  alt={`${stream.gameName} official patch notes artwork`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <div className="patch-note-visual-overlay" aria-hidden="true" />
              <div className="patch-note-visual-labels">
                <span>{stream.gameCode}</span>
                <span>Official Dispatch</span>
              </div>
            </div>

            <div className="patch-note-body">
              <div>
                <p className="eyebrow">{stream.gameName}</p>
                <h3>{stream.latest.title}</h3>
                <p className="patch-note-date">
                  Last updated:{' '}
                  <time dateTime={toDateTime(stream.latest.date)}>{stream.latest.date}</time>
                </p>
              </div>

              <Button href={stream.latest.url} className="patch-note-primary-link">
                Read official patch notes
                <ExternalLink size={17} aria-hidden="true" />
              </Button>

              {stream.previous.length ? (
                <details className="patch-note-history">
                  <summary>
                    <span>Previous patch notes ({stream.previous.length})</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <ul>
                    {stream.previous.map((note) => (
                      <li key={note.url}>
                        <a href={note.url} target="_blank" rel="noopener noreferrer">
                          <span>{note.title}</span>
                          <time dateTime={toDateTime(note.date)}>{note.date}</time>
                          <ExternalLink size={15} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <p className="patch-note-history-empty">No previous official notes are currently listed for this title.</p>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="patch-notes-sync">
        Official summaries only. Full patch-note content remains on CallofDuty.com. Feed synchronized{' '}
        <time dateTime={patchNotesFeed.generatedAt}>{new Date(patchNotesFeed.generatedAt).toLocaleString()}</time>.
      </p>
    </section>
  );
}
