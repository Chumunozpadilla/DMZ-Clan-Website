import { useEffect, useState } from 'react';
import { getEasternDateKey } from '../data/mw4Deployment';

export default function useEasternDateKey() {
  const [dateKey, setDateKey] = useState(() => getEasternDateKey());

  useEffect(() => {
    const updateDate = () => {
      const nextDate = getEasternDateKey();
      setDateKey((currentDate) => (currentDate === nextDate ? currentDate : nextDate));
    };
    const timer = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  return dateKey;
}
