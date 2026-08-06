import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

type CopyBuildCodeButtonProps = {
  code: string;
  className?: string;
};

export default function CopyBuildCodeButton({ code, className = '' }: CopyBuildCodeButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (status === 'idle') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setStatus('idle'), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  };

  const label = status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy Failed' : 'Copy Code';

  return (
    <>
      <button className={`copy-code-button ${className}`.trim()} type="button" onClick={copyCode} aria-label={`Copy build code ${code}`}>
        <Copy size={16} />
        {label}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? `Copied build code ${code}` : status === 'failed' ? 'Build code copy failed' : ''}
      </span>
    </>
  );
}
