import { divisions } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import DisclaimerBanner from '../components/DisclaimerBanner';
import SectionHeader from '../components/SectionHeader';
import { DebtPayoffCalculator, SavingsGoalCalculator } from '../components/Calculators';

export default function FinancialPlanning() {
  return (
    <>
      <Seo title="Financial Planning AI" description="Educational tools for budgeting, saving and understanding personal finance." />
      <PageHero
        eyebrow="Financial Planning AI"
        title="Understand your money with educational tools"
        text="Explore budgeting, saving and debt scenarios in plain language."
      >
        <DisclaimerBanner kind="financial" />
      </PageHero>
      <section className="section">
        <div className="container-page">
          <SectionHeader title="What this area covers" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {divisions.financial.features.map((f) => (
              <li key={f} className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3">{f}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section bg-navy-950/60">
        <div className="container-page">
          <SectionHeader
            eyebrow="Try it"
            title="Educational calculators"
            text="These run entirely in your browser. Nothing you enter is sent or stored."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <SavingsGoalCalculator />
            <DebtPayoffCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
