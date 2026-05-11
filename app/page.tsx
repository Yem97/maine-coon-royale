import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import KittenGrid from '@/components/KittenGrid';
import AboutSection from '@/components/AboutSection';
import FacebookFeed from '@/components/FacebookFeed';
import ReviewsSection from '@/components/ReviewsSection';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Kitten, AdminProfile } from '@/types';

export const revalidate = 60;

async function getData() {
  const [kittensRes, profileRes] = await Promise.all([
    supabaseAdmin.from('kittens').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('admin_profile').select('*').single(),
  ]);
  return {
    kittens: (kittensRes.data || []) as Kitten[],
    profile: (profileRes.data || { full_name: 'Maine Coon Royale', tagline: 'Premium Home-Bred Maine Coon Kittens', bio: '', location: 'USA', years_breeding: 1, kittens_placed: 0 }) as AdminProfile,
  };
}

export default async function Home() {
  const { kittens, profile } = await getData();
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <section id="kittens" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs px-4 py-2 rounded-full mb-4 tracking-widest uppercase">✦ Available Now</div>
            <h2 className="font-display text-5xl font-semibold text-white mb-4">Our Kittens</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Every kitten is health-tested, vaccinated, and raised with love in our family home.</p>
          </div>
          <KittenGrid kittens={kittens} />
        </div>
      </section>
      <AboutSection profile={profile} />
      <FacebookFeed />
      <ReviewSection />
      <section id="contact" className="py-24 bg-navy-light">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs px-4 py-2 rounded-full mb-4 tracking-widest uppercase">✦ Get In Touch</div>
            <h2 className="font-display text-5xl font-semibold text-white mb-4">Inquire Today</h2>
            <p className="text-gray-400">Interested in a kitten or want to join our waiting list? We'd love to hear from you.</p>
          </div>
          <InquiryForm />
        </div>
      </section>
      <Footer profile={profile} />
      <ChatWidget />
    </main>
  );
}
