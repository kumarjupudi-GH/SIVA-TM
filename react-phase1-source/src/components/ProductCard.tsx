import { Link } from 'react-router-dom';
import type { Product } from '../content';
import Icon from './Icon';
import StatusBadge from './StatusBadge';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between">
        <span className="rounded-xl bg-brand/20 p-3 text-cyan-accent">
          <Icon name={product.icon} />
        </span>
        <StatusBadge status={product.status} />
      </div>
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-300">{product.description}</p>
      <Link
        to={`/familybuddy/${product.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-accent hover:underline"
      >
        Learn More <Icon name="ArrowRight" className="h-4 w-4" />
        <span className="sr-only"> about {product.name}</span>
      </Link>
    </article>
  );
}
