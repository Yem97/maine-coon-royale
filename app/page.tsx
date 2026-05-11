import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import KittenGrid from '@/components/KittenGrid';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import FacebookFeed from '@/components/FacebookFeed';
import ReviewsSection from '@/components/ReviewsSection';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatWidget from '@/components/ChatWidget';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const revalidate = 60;

async function getKittens() {
  try {
    const { data } = await supabaseAdmin
      .from('kittens')
      .select('*')
      .order('created_at', { ascending: false });
    return data || [];
  } catch { return []; }
}

export default async function Home() {
  const kittens = await getKittens();
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <section id="kittens" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">Available Kittens</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Each kitten is health-tested, vaccinated, and raised in our home with love.</p>
        </div>
        <KittenGrid kittens={kittens} />
      </section>
      <AboutSection />
      <GallerySection />
      <FacebookFeed />
      <ReviewsSection />
      <section id="contact" className="py-20 px-4 bg-navy-light">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">Get in Touch</h2>
            <p className="text-gray-400">Interested in one of our kittens? We would love to hear from you.</p>
          </div>
          <InquiryForm />
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </main>
  );
}
