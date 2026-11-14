import { divisions } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import DisclaimerBanner from '../components/DisclaimerBanner';
import StatusBadge from '../components/StatusBadge';

export default function InnovationLab() {
  return (
    <>
      <Seo title="AI Innovation Lab" description="Experimental AI concepts in engineering, science and business." />
      <PageHero
        eyebrow="AI Innovation Lab"
        title="Future-oriented engineering and scientific ideas"
        text="A space for research and experimentation. These are concepts under exploration, separate from products available today."
      >
        <DisclaimerBanner kind="lab" />
      </PageHero>
      <section className="section">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.lab.map((item) => (
            <article key={item.title} className="card flex flex-col gap-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div><StatusBadge status={item.status} /></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
