import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description="Get in touch with SIVA Techno Mart." />
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        text="Ask about our products, learning opportunities or collaboration."
      />
      <section className="section">
        <div className="container-page max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
