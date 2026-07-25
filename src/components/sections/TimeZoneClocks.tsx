import { useEffect, useMemo, useState } from 'react';

const zones = [
  { label: 'Eastern Time', timeZone: 'America/New_York' },
  { label: 'Central Time', timeZone: 'America/Chicago' },
  { label: 'Mountain Time', timeZone: 'America/Denver' },
  { label: 'Pacific Time', timeZone: 'America/Los_Angeles' },
];

export default function TimeZoneClocks() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  const formatters = useMemo(
    () =>
      zones.map((zone) => ({
        ...zone,
        time: new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: zone.timeZone,
          timeZoneName: 'short',
        }),
        date: new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          timeZone: zone.timeZone,
        }),
      })),
    [],
  );

  return (
    <section className="time-zone-section" aria-labelledby="time-zone-heading">
      <div className="time-zone-header">
        <p className="eyebrow" id="time-zone-heading">
          DMZ Time Zones
        </p>
        <span>Live U.S. comms clock</span>
      </div>
      <div className="time-zone-grid">
        {formatters.map((zone) => (
          <article className="time-zone-card" key={zone.timeZone}>
            <h2>{zone.label}</h2>
            <time dateTime={now.toISOString()}>{zone.time.format(now)}</time>
            <small>{zone.date.format(now)}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
