import { Link } from 'react-router-dom';
import { divisions, site } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import JourneyStepper from '../components/JourneyStepper';

export default function Launchpad() {
  return (
    <>
      <Seo title="Entrepreneur Launchpad" description="Proposed support for turning ideas into prototypes with AI tools." />
      <PageHero
        eyebrow="Entrepreneur Launchpad"
        title="You Don't Need to Be a Programmer to Start Building."
        text="SIVA Techno Mart aims to help people explore ideas, learn AI tools and build early prototypes."
      />
      <section className="section">
        <div className="container-page">
          <SectionHeader title="Who we aim to support" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.launchpad.audiences.map((a) => (
              <li key={a} className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3">{a}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section bg-navy-950/60">
        <div className="container-page">
          <SectionHeader title="The entrepreneurial journey" />
          <JourneyStepper steps={site.journey.map((title) => ({ title }))} />
        </div>
      </section>
      <section className="section">
        <div className="container-page">
          <SectionHeader title="Proposed services" text="These services are proposed offerings and are not yet confirmed." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {divisions.launchpad.services.map((s) => (
              <li key={s} className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3">{s}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-400">
            We do not promise employment, income, business success or certification.
          </p>
          <Link to="/contact?interest=Entrepreneurship%20Mentoring" className="btn-gold mt-6">
            Turn Your Idea Into Reality
          </Link>
        </div>
      </section>
    </>
  );
}
