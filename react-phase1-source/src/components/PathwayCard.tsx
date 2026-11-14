import { Link } from 'react-router-dom';
import type { Pathway } from '../content';

export default function PathwayCard({ pathway, index }: { pathway: Pathway; index: number }) {
  return (
    <article className="card flex h-full flex-col">
      <p className="font-mono text-xs text-gold-light">Pathway {String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-2 text-lg font-semibold">{pathway.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-300">{pathway.description}</p>
      <p className="mt-3 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">For: </span>
        {pathway.audience}
      </p>
      <Link to={`/academy/${pathway.slug}`} className="btn-outline mt-5">
        View pathway
      </Link>
    </article>
  );
}
