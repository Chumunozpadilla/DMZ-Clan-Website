import { ChevronDown, ChevronUp, Pause, Play, Radio, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { assetPath } from '../../utils/assetPath';

const audioSrc = assetPath('audio/dmz-theme.mp3');
const volumeKey = 'dmz-radio-volume';
const mutedKey = 'dmz-radio-muted';

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

const readStoredVolume = () => {
  const stored = window.localStorage.getItem(volumeKey);
  const value = stored ? Number(stored) : 0.55;

  return Number.isFinite(value) ? Math.min(Math.max(value, 0), 1) : 0.55;
};

const readStoredMuted = () => window.localStorage.getItem(mutedKey) === 'true';

export default function TacticalRadio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const manuallyPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [volume, setVolume] = useState(() => readStoredVolume());
  const [isMuted, setIsMuted] = useState(() => readStoredMuted());
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const attemptPlayback = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || manuallyPausedRef.current) {
      return;
    }

    try {
      await audio.play();
      setNeedsActivation(false);
    } catch {
      setNeedsActivation(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
    audio.muted = isMuted;
  }, [isMuted, volume]);

  useEffect(() => {
    window.localStorage.setItem(volumeKey, String(volume));
  }, [volume]);

  useEffect(() => {
    window.localStorage.setItem(mutedKey, String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const updateDuration = () => setDuration(audio.duration || 0);
    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const handlePlay = () => {
      setIsPlaying(true);
      setNeedsActivation(false);
    };
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('canplay', attemptPlayback, { once: true });

    attemptPlayback();

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('canplay', attemptPlayback);
    };
  }, [attemptPlayback]);

  useEffect(() => {
    if (!needsActivation || manuallyPausedRef.current) {
      return;
    }

    const retryOnInteraction = () => {
      attemptPlayback();
    };

    window.addEventListener('pointerdown', retryOnInteraction, { once: true });
    window.addEventListener('keydown', retryOnInteraction, { once: true });
    window.addEventListener('touchstart', retryOnInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', retryOnInteraction);
      window.removeEventListener('keydown', retryOnInteraction);
      window.removeEventListener('touchstart', retryOnInteraction);
    };
  }, [attemptPlayback, needsActivation]);

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      manuallyPausedRef.current = false;
      attemptPlayback();
    } else {
      manuallyPausedRef.current = true;
      audio.pause();
      setNeedsActivation(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted((value) => !value);
  };

  const handleVolumeChange = (value: string) => {
    const nextVolume = Number(value);

    if (Number.isFinite(nextVolume)) {
      setVolume(nextVolume);
      if (nextVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    const nextTime = Number(value);

    if (audio && Number.isFinite(nextTime)) {
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  return (
    <aside className={isCollapsed ? 'tactical-radio collapsed' : 'tactical-radio'} aria-label="DMZ Tactical Radio">
      <audio ref={audioRef} src={audioSrc} autoPlay loop preload="auto" />
      <div className="radio-panel-top">
        <div className="radio-title">
          <Radio size={18} aria-hidden="true" />
          <div>
            <strong>DMZ Tactical Radio</strong>
            <small>This Is How We Do It</small>
          </div>
        </div>
        <button
          className="radio-icon-button"
          type="button"
          aria-label={isCollapsed ? 'Expand tactical radio' : 'Collapse tactical radio'}
          onClick={() => setIsCollapsed((value) => !value)}
        >
          {isCollapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {!isCollapsed ? (
        <>
          {needsActivation ? (
            <button className="radio-activation" type="button" onClick={attemptPlayback}>
              DMZ Radio Ready - Tap to Activate
            </button>
          ) : null}

          <div className="radio-equalizer" aria-hidden="true" data-playing={isPlaying ? 'true' : 'false'}>
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="radio-controls">
            <button
              className="radio-icon-button primary"
              type="button"
              aria-label={isPlaying ? 'Pause DMZ Tactical Radio' : 'Play DMZ Tactical Radio'}
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              className="radio-icon-button"
              type="button"
              aria-label={isMuted ? 'Unmute DMZ Tactical Radio' : 'Mute DMZ Tactical Radio'}
              onClick={handleMuteToggle}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <label className="radio-volume">
              <span>Volume</span>
              <input
                aria-label="DMZ Tactical Radio volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) => handleVolumeChange(event.target.value)}
              />
            </label>
          </div>

          <label className="radio-progress">
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <input
              aria-label="DMZ Tactical Radio playback progress"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => handleSeek(event.target.value)}
            />
          </label>
        </>
      ) : null}
    </aside>
  );
}
