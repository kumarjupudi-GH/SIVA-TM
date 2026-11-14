import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'siva-analytics-consent';

function loadPlausible(domain: string) {
  if (document.querySelector('script[data-siva-analytics]')) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://plausible.io/js/script.js';
  s.setAttribute('data-domain', domain);
  s.setAttribute('data-siva-analytics', 'true');
  document.head.appendChild(s);
}

/**
 * Privacy-friendly analytics (Plausible, cookieless) loads only after the
 * visitor accepts, and only when VITE_PLAUSIBLE_DOMAIN is configured.
 * If no domain is configured, no banner is shown.
 */
export default function CookieBanner() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
  const [choice, setChoice] = useState<string | null>('pending');

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      stored = null;
    }
    setChoice(stored);
    if (stored === 'accepted' && domain) loadPlausible(domain);
  }, [domain]);

  if (!domain || choice !== null) return null;

  const decide = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage unavailable; choice applies for this visit only */
    }
    setChoice(value);
    if (value === 'accepted') loadPlausible(domain);
  };

  return (
    <div
      role="dialog"
      aria-label="Analytics preferences"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-xl border border-white/15 bg-navy-800 p-4 text-sm shadow-xl"
    >
      <p className="text-slate-200">
        We would like to use privacy-friendly, cookie-free analytics to understand which pages are useful. See our{' '}
        <Link to="/privacy" className="text-cyan-accent underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-3">
        <button type="button" className="btn-primary !py-2" onClick={() => decide('accepted')}>
          Accept
        </button>
        <button type="button" className="btn-outline !py-2" onClick={() => decide('declined')}>
          Decline
        </button>
      </div>
    </div>
  );
}
