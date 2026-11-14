import { team } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';

export default function About() {
  const f = team.founder;
  const hasFounder = f.name || f.introduction || f.background || f.technologyVision;

  return (
    <>
      <Seo title="About" description="The mission, values and people behind SIVA Techno Mart." />
      <PageHero eyebrow="About" title="Mission and values" text={team.mission} />
      <section className="section">
        <div className="container-page max-w-3xl">
          <SectionHeader title="Our values" />
          <ul className="flex flex-wrap gap-3">
            {team.values.map((v) => (
              <li key={v} className="rounded-full border border-cyan-accent/40 px-4 py-1.5 font-display text-cyan-accent">{v}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section bg-navy-950/60">
        <div className="container-page max-w-3xl">
          <SectionHeader title="Founder" />
          {hasFounder ? (
            <div className="space-y-4">
              {f.name && <p className="text-xl font-semibold text-white">{f.name}{f.role && `, ${f.role}`}</p>}
              {f.introduction && <p>{f.introduction}</p>}
              {f.background && (<><h3 className="text-lg font-semibold">Professional background</h3><p>{f.background}</p></>)}
              {f.technologyVision && (<><h3 className="text-lg font-semibold">Technology vision</h3><p>{f.technologyVision}</p></>)}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-white/20 p-6 text-slate-400">
              Founder introduction coming soon. (Owner: edit <code className="font-mono">src/content/team.json</code>.)
            </p>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container-page max-w-3xl">
          <SectionHeader title="Team" />
          {team.members.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/20 p-6 text-slate-400">
              Team members will be introduced here.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
