import { Link } from 'react-router-dom';
import { site } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';

export default function Community() {
  return (
    <>
      <Seo title="Community" description="Join the SIVA community to learn, share ideas and collaborate." />
      <PageHero
        eyebrow="Join the SIVA Community"
        title="Learn, share and build together"
        text="Tell us what you would like to explore. We read every message."
      />
      <section className="section">
        <div className="container-page max-w-3xl">
          <ul className="space-y-3">
            {site.community.map((c) => (
              <li key={c} className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3">{c}</li>
            ))}
          </ul>
          <Link to="/contact" className="btn-primary mt-8">Contact us</Link>
        </div>
      </section>
    </>
  );
}
