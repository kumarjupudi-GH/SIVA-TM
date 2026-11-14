import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <section className="section">
      <Seo title="Page not found" />
      <div className="container-page text-center">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-slate-300">That page does not exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
