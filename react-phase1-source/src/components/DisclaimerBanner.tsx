import { Link } from 'react-router-dom';

type Kind = 'financial' | 'wealth' | 'lab' | 'academy';

const messages: Record<Kind, string> = {
  financial:
    'Educational information only. These tools do not provide individualized financial, tax or legal advice. Consider speaking with a qualified, licensed professional about your own situation.',
  wealth:
    'Educational and organizational tools only. SIVA Techno Mart is not a registered investment adviser and does not provide regulated investment advice.',
  lab: 'Experimental concepts shown here are not products available today. Statuses on this page show how far each idea has progressed.',
  academy:
    'Training is a planned offering. Schedules, instructors and pricing are not yet confirmed, and no employment, income or certification outcome is promised.',
};

export default function DisclaimerBanner({ kind }: { kind: Kind }) {
  return (
    <div
      role="note"
      className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-light"
    >
      <strong className="font-semibold">Please note: </strong>
      {messages[kind]}{' '}
      <Link to="/terms" className="underline underline-offset-2">
        Terms
      </Link>
    </div>
  );
}
