import { Link } from 'react-router-dom';
import { products, site } from '../content';
import Seo from '../components/Seo';
import NeuralCanvas from '../components/NeuralCanvas';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import JourneyStepper from '../components/JourneyStepper';

const divisionCards = [
  { to: '/familybuddy', title: 'FamilyBuddy AI', text: 'A family of practical AI assistants for everyday life.', icon: 'Users' },
  { to: '/financial-planning', title: 'Financial Planning AI', text: 'Educational budgeting, saving and debt tools.', icon: 'TrendingUp' },
  { to: '/wealth-management', title: 'Wealth Management AI', text: 'Organization and education for family wealth.', icon: 'Landmark' },
  { to: '/academy', title: 'SIVA AI Academy', text: 'Planned learning pathways from AI basics to building products.', icon: 'GraduationCap' },
  { to: '/launchpad', title: 'Entrepreneur Launchpad', text: 'Proposed support for turning ideas into prototypes.', icon: 'Rocket' },
  { to: '/innovation-lab', title: 'AI Innovation Lab', text: 'Experimental concepts, clearly labeled.', icon: 'FlaskConical' },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <Seo />
      <section className="relative isolate overflow-hidden bg-navy-950">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <NeuralCanvas />
        <div className="container-page relative py-24 sm:py-32">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-accent">{site.expansion}</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">SIVA TECHNO MART</h1>
          <p className="mt-6 max-w-2xl font-display text-2xl text-gold-light sm:text-3xl">
            &ldquo;{site.tagline}&rdquo;
          </p>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{site.heroStatement}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/familybuddy" className="btn-primary">Explore Our AI Agents</Link>
            <Link to="/academy" className="btn-outline">Learn Vibe Coding</Link>
            <Link to="/launchpad" className="btn-gold">Turn Your Idea Into Reality</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Why SIVA Techno Mart?" title="Technology that serves people" text={site.summary} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="card h-full">
                  <span className="text-cyan-accent"><Icon name={w.icon} className="h-7 w-7" /></span>
                  <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy-950/60">
        <div className="container-page">
          <SectionHeader eyebrow="What we do" title="Six areas of focus" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {divisionCards.map((d) => (
              <Link key={d.to} to={d.to} className="card block">
                <span className="text-cyan-accent"><Icon name={d.icon} className="h-7 w-7" /></span>
                <h3 className="mt-4 text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{d.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Featured products"
            title="FamilyBuddy AI and KinKeep"
            text="Each product shows its current status, so you always know what is available today and what is still on the way."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/20 p-6 text-center text-sm text-slate-400">
              More products will appear here as they are ready.
            </div>
          </div>
          <p className="mt-6">
            <Link to="/familybuddy" className="font-semibold text-cyan-accent hover:underline">
              See the full FamilyBuddy AI ecosystem
            </Link>
          </p>
        </div>
      </section>

      <section className="section bg-navy-950/60">
        <div className="container-page">
          <SectionHeader
            eyebrow="SIVA AI Academy"
            title="Empowering everyday professionals to become technology creators."
            text="A planned set of ten learning pathways for people with little or no programming experience."
          />
          <Link to="/academy" className="btn-primary">View the learning pathways</Link>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Entrepreneur Launchpad"
            title="You Don't Need to Be a Programmer to Start Building."
          />
          <JourneyStepper steps={site.journey.map((title) => ({ title }))} />
          <Link to="/launchpad" className="btn-gold mt-8">Explore the Launchpad</Link>
        </div>
      </section>

      <section className="section bg-navy-950/60">
        <div className="container-page">
          <SectionHeader eyebrow="How we work" title="Five steps from problem to product" />
          <JourneyStepper steps={site.howWeWork} />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Join the SIVA Community" title="Learn, share and build with us" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {site.community.map((c) => (
              <li key={c} className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3 text-slate-200">
                {c}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn-primary mt-8">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
