"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryPhoto } from '@/types';

export default function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(d => setPhotos((d.photos || []).slice(0, 6)));
  }, []);

  return (
    <section id="gallery" className="py-20 bg-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">Royal Gallery</h2>
          <p className="text-gray-400 max-w-xl mx-auto">A glimpse into life at Maine Coon Royale — our kittens, our home, our families.</p>
        </div>
        {photos.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square glass rounded-2xl border border-gold/10 flex items-center justify-center text-4xl">🐱</div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map(photo => (
              <div key={photo.id} onClick={() => setSelected(photo)}
                className="aspect-square relative rounded-2xl overflow-hidden cursor-pointer group border border-gold/10 hover:border-gold/40 transition">
                <Image src={photo.image_url} alt={photo.title || 'Gallery'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  {photo.title && <p className="text-white text-sm font-medium">{photo.title}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link href="/gallery" className="glass border border-gold/30 text-gold px-8 py-3 rounded-full hover:bg-gold/10 transition font-medium inline-block">
            View Full Gallery ✦
          </Link>
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full max-h-[80vh]">
            <Image src={selected.image_url} alt={selected.title || ''} width={900} height={600} className="rounded-2xl object-contain w-full max-h-[80vh]" />
            {selected.title && <p className="text-center text-gray-300 mt-4 text-sm">{selected.title}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
