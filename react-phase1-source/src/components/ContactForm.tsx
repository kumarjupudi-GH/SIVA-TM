import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { site } from '../content';

const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const turnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

type Errors = Partial<Record<'name' | 'email' | 'interest' | 'message' | 'consent', string>>;
type State = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => void };
  }
}

export default function ContactForm() {
  const [params] = useSearchParams();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>('idle');
  const [token, setToken] = useState('');
  const openedAt = useRef(Date.now());
  const tsRef = useRef<HTMLDivElement>(null);

  const interestParam = params.get('interest') ?? '';
  const defaultInterest = site.contactAreas.includes(interestParam) ? interestParam : '';
  const defaultMessage = params.get('topic') ? `I am interested in: ${params.get('topic')}\n\n` : '';

  useEffect(() => {
    if (!turnstileKey || !tsRef.current) return;
    const el = tsRef.current;
    const render = () =>
      window.turnstile?.render(el, { sitekey: turnstileKey, callback: (t: string) => setToken(t) });
    if (window.turnstile) {
      render();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Spam protection: hidden honeypot field and a minimum time on the form.
    if (data.get('company_website') || Date.now() - openedAt.current < 3000) {
      setState('sent'); // Pretend success so bots learn nothing.
      return;
    }

    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const interest = String(data.get('interest') ?? '');
    const message = String(data.get('message') ?? '').trim();
    if (name.length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email address.';
    if (!interest) next.interest = 'Please choose an area of interest.';
    if (message.length < 10) next.message = 'Please write at least a short message (10+ characters).';
    if (!data.get('consent')) next.consent = 'Consent is required so we can respond to you.';
    if (turnstileKey && !token) next.consent = next.consent ?? 'Please complete the spam check.';
    setErrors(next);
    if (Object.keys(next).length) return;

    if (!endpoint) {
      setState('unconfigured');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, interest, message, turnstileToken: token }),
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setState('sent');
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <p role="status" className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-5 text-emerald-200">
        Thank you. Your message has been received.
      </p>
    );
  }

  const err = (id: keyof Errors) =>
    errors[id] ? (
      <p id={`${id}-err`} className="mt-1 text-sm text-red-300">
        {errors[id]}
      </p>
    ) : null;
  const aria = (id: keyof Errors) => ({
    'aria-invalid': errors[id] ? true : undefined,
    'aria-describedby': errors[id] ? `${id}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-white">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" className="field" {...aria('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className="field" {...aria('email')} />
        {err('email')}
      </div>
      <div>
        <label htmlFor="interest" className="mb-1 block text-sm font-medium text-white">Area of interest</label>
        <select id="interest" name="interest" defaultValue={defaultInterest} className="field" {...aria('interest')}>
          <option value="">Select an area…</option>
          {site.contactAreas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        {err('interest')}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-white">Message</label>
        <textarea id="message" name="message" rows={5} defaultValue={defaultMessage} className="field" {...aria('message')} />
        {err('message')}
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-slate-300">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4" {...aria('consent')} />
          <span>
            I agree that SIVA Techno Mart may store my details to respond to this enquiry. I have read the Privacy Policy.
          </span>
        </label>
        {err('consent')}
      </div>

      {turnstileKey && <div ref={tsRef} />}

      <button type="submit" disabled={state === 'sending'} className="btn-primary disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      {state === 'error' && (
        <p role="alert" className="text-sm text-red-300">
          Something went wrong sending your message. Please try again later.
        </p>
      )}
      {state === 'unconfigured' && (
        <p role="alert" className="text-sm text-gold-light">
          This form is not connected to a submission service yet, so your message was not sent. (Site owner: set
          VITE_FORM_ENDPOINT.)
        </p>
      )}
    </form>
  );
}
