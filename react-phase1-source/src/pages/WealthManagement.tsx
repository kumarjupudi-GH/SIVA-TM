import { divisions } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import DisclaimerBanner from '../components/DisclaimerBanner';
import SectionHeader from '../components/SectionHeader';

export default function WealthManagement() {
  return (
    <>
      <Seo title="Wealth Management AI" description="Educational and organizational tools for family wealth." />
      <PageHero
        eyebrow="Wealth Management AI"
        title="Organize and understand family wealth"
        text="Concepts and organizing tools that help families see their assets, liabilities and legacy more clearly."
      >
        <DisclaimerBanner kind="wealth" />
      </PageHero>
      <section className="section">
        <div className="container-page">
          <SectionHeader title="What this area covers" text="These are proposed educational and organizational tools, not investment advisory services." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {divisions.wealth.features.map((f) => (
              <li key={f} className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3">{f}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
