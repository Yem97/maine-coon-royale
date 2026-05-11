"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { GalleryPhoto } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(d => setPhotos(d.photos || []));
  }, []);

  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition text-sm mb-6">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <h1 className="font-display text-5xl font-semibold text-white mb-4">Royal Gallery</h1>
          <p className="text-gray-400">Life at Maine Coon Royale — our kittens, our home, our families.</p>
        </div>
        {photos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🐱</p>
            <p>Gallery coming soon!</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map(photo => (
              <div key={photo.id} onClick={() => setSelected(photo)}
                className="relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid group border border-gold/10 hover:border-gold/40 transition">
                <Image src={photo.image_url} alt={photo.title || ''} width={400} height={300} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {photo.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm">{photo.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <Image src={selected.image_url} alt={selected.title || ''} width={900} height={600} className="rounded-2xl object-contain max-h-[85vh]" />
        </div>
      )}
    </main>
  );
}
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import GallerySection from '@/components/GallerySection';
// import { supabaseAdmin } from '@/lib/supabaseAdmin';
// import { GalleryPhoto, AdminProfile } from '@/types';

// export const revalidate = 60;

// async function getData() {
//   const [galleryRes, profileRes] = await Promise.all([
//     supabaseAdmin.from('gallery').select('*').order('created_at', { ascending: false }),
//     supabaseAdmin.from('admin_profile').select('*').single(),
//   ]);
//   return {
//     photos: (galleryRes.data || []) as GalleryPhoto[],
//     profile: (profileRes.data || { full_name: 'Maine Coon Royale', tagline: '', bio: '', location: 'USA', years_breeding: 1, kittens_placed: 0 }) as AdminProfile,
//   };
// }

// export default async function GalleryPage() {
//   const { photos, profile } = await getData();
//   return (
//     <main className="min-h-screen bg-navy">
//       <Navbar />
//       <div className="pt-24 pb-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs px-4 py-2 rounded-full mb-4 tracking-widest uppercase">✦ Gallery</div>
//             <h1 className="font-display text-5xl font-semibold text-white mb-4">Our Beautiful Cats</h1>
//             <p className="text-gray-400 max-w-xl mx-auto">A collection of our Maine Coon kittens and their happy families.</p>
//           </div>
//           <GalleryGrid photos={photos} />
//         </div>
//       </div>
//       <Footer profile={profile} />
//     </main>
//   );
// }
