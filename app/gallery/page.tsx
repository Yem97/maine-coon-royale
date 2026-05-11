import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { GalleryPhoto, AdminProfile } from '@/types';

export const revalidate = 60;

async function getData() {
  const [galleryRes, profileRes] = await Promise.all([
    supabaseAdmin.from('gallery').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('admin_profile').select('*').single(),
  ]);
  return {
    photos: (galleryRes.data || []) as GalleryPhoto[],
    profile: (profileRes.data || { full_name: 'Maine Coon Royale', tagline: '', bio: '', location: 'USA', years_breeding: 1, kittens_placed: 0 }) as AdminProfile,
  };
}

export default async function GalleryPage() {
  const { photos, profile } = await getData();
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs px-4 py-2 rounded-full mb-4 tracking-widest uppercase">✦ Gallery</div>
            <h1 className="font-display text-5xl font-semibold text-white mb-4">Our Beautiful Cats</h1>
            <p className="text-gray-400 max-w-xl mx-auto">A collection of our Maine Coon kittens and their happy families.</p>
          </div>
          <GalleryGrid photos={photos} />
        </div>
      </div>
      <Footer profile={profile} />
    </main>
  );
}
