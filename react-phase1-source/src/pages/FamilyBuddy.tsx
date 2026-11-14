import { Link, useParams } from 'react-router-dom';
import { products } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icon';
import NotFound from './NotFound';

export function FamilyBuddy() {
  return (
    <>
      <Seo title="FamilyBuddy AI" description="A collection of practical AI assistants for everyday family life." />
      <PageHero
        eyebrow="FamilyBuddy AI Ecosystem"
        title="Intelligent assistants for everyday family life"
        text="From homework help to home maintenance, each Buddy is designed to be simple, practical and respectful of your privacy."
      />
      <section className="section">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  if (!product) return <NotFound />;

  return (
    <>
      <Seo title={product.name} description={product.description} />
      <PageHero eyebrow="FamilyBuddy AI" title={product.name} text={product.tagline} />
      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="rounded-xl bg-brand/20 p-4 text-cyan-accent">
              <Icon name={product.icon} className="h-8 w-8" />
            </span>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-6 text-lg text-slate-200">{product.description}</p>
          {product.status === 'Coming Soon' && (
            <p className="mt-4 text-sm text-slate-400">
              This product is not available yet. Contact us to be kept informed.
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {product.url && (
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Open {product.name}
              </a>
            )}
            <Link
              to={`/contact?interest=FamilyBuddy%20AI&topic=${encodeURIComponent(product.name)}`}
              className="btn-outline"
            >
              Request a demonstration
            </Link>
            <Link to="/familybuddy" className="btn-outline">All Buddies</Link>
          </div>
        </div>
      </section>
    </>
  );
}
