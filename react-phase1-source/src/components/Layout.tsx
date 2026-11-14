import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../content';
import CookieBanner from './CookieBanner';

const nav = [
  { to: '/familybuddy', label: 'FamilyBuddy AI' },
  { to: '/financial-planning', label: 'Financial AI' },
  { to: '/wealth-management', label: 'Wealth AI' },
  { to: '/academy', label: 'AI Academy' },
  { to: '/launchpad', label: 'Launchpad' },
  { to: '/innovation-lab', label: 'Innovation Lab' },
  { to: '/about', label: 'About' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'text-cyan-accent' : 'text-slate-300 hover:text-white'}`;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-navy-900"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-lg font-bold tracking-wide text-white">
            SIVA <span className="text-cyan-accent">Techno Mart</span>
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkClass}>
                {n.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary ml-3 !py-2">
              Contact
            </Link>
          </nav>
          <button
            type="button"
            className="rounded-md p-2 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-navy-900 lg:hidden">
            <div className="container-page flex flex-col py-3">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} className={linkClass}>
                  {n.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary mt-2">
                Contact
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-navy-950 py-12 text-sm text-slate-400">
        <div className="container-page grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-white">{site.name}</p>
            <p className="mt-1 text-slate-300">{site.expansion}</p>
            <p className="mt-3">{site.philosophy.join('. ')}.</p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-white">Explore</p>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-white">Company</p>
            <ul className="space-y-1">
              <li><Link to="/community" className="hover:text-white">Community</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="container-page mt-8 border-t border-white/10 pt-6">
          <p>
            Financial and wealth tools are educational only and are not individualized or regulated financial
            advice. Experimental ideas are clearly labeled and may not be available today.
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}
