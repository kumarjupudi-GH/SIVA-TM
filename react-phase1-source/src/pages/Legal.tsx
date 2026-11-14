import Seo from '../components/Seo';
import PageHero from '../components/PageHero';

function Placeholder({ title, intro }: { title: string; intro: string }) {
  return (
    <>
      <Seo title={title} />
      <PageHero eyebrow="Legal" title={title} text={intro} />
      <section className="section">
        <div className="container-page max-w-3xl space-y-4 text-slate-300">
          <p className="rounded-xl border border-gold/40 bg-gold/10 p-4 text-gold-light">
            Placeholder. This page has not been reviewed by a lawyer. Replace it with reviewed text before launch.
          </p>
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <Placeholder
      title="Privacy Policy"
      intro="How SIVA Techno Mart will handle personal information, contact form submissions and analytics."
    />
  );
}

export function Terms() {
  return (
    <Placeholder
      title="Terms of Use"
      intro="Terms for using this website, including that financial and wealth tools are educational only."
    />
  );
}
