import { Link, useParams } from 'react-router-dom';
import { pathways } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import PathwayCard from '../components/PathwayCard';
import DisclaimerBanner from '../components/DisclaimerBanner';
import NotFound from './NotFound';

export function Academy() {
  return (
    <>
      <Seo title="SIVA AI Academy" description="Planned learning pathways for building with AI, no programming background required." />
      <PageHero
        eyebrow="SIVA AI Academy"
        title="Empowering everyday professionals to become technology creators."
        text="Ten planned pathways that help people with little or no programming experience build practical applications using AI-assisted development and vibe coding."
      >
        <DisclaimerBanner kind="academy" />
      </PageHero>
      <section className="section">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map((p, i) => (
            <PathwayCard key={p.slug} pathway={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

export function PathwayDetail() {
  const { slug } = useParams();
  const index = pathways.findIndex((p) => p.slug === slug);
  if (index < 0) return <NotFound />;
  const p = pathways[index];

  return (
    <>
      <Seo title={p.title} description={p.description} />
      <PageHero eyebrow={`Pathway ${String(index + 1).padStart(2, '0')}`} title={p.title} text={p.description} />
      <section className="section">
        <div className="container-page max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Intended audience</h2>
            <p className="mt-2 text-slate-300">{p.audience}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Learning objectives</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              {p.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <DisclaimerBanner kind="academy" />
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/contact?interest=Vibe%20Coding%20Training&topic=${encodeURIComponent(p.title)}`}
              className="btn-primary"
            >
              Join the waitlist
            </Link>
            <Link to="/academy" className="btn-outline">All pathways</Link>
          </div>
        </div>
      </section>
    </>
  );
}
