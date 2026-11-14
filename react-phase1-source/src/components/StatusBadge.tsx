import type { Status } from '../content';

const styles: Record<Status, string> = {
  Available: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
  Beta: 'border-cyan-accent/50 bg-cyan-accent/10 text-cyan-accent',
  Prototype: 'border-gold/50 bg-gold/10 text-gold-light',
  'Coming Soon': 'border-slate-400/40 bg-slate-400/10 text-slate-300',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-xs ${styles[status] ?? styles['Coming Soon']}`}
    >
      {status}
    </span>
  );
}
