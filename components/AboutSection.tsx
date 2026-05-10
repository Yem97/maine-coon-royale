import React from 'react';
import Image from 'next/image';
import { AdminProfile } from '@/types';
import { MapPin, Calendar, Heart } from 'lucide-react';

export default function AboutSection({ profile }: { profile: AdminProfile }) {
  return (
    <section id="about" className="py-24 bg-navy-light">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs px-4 py-2 rounded-full mb-6 tracking-widest uppercase">✦ About Us</div>
            <h2 className="font-display text-5xl font-semibold text-white mb-6 leading-tight">
              {profile.full_name}
            </h2>
            <p className="text-gold italic font-display text-xl mb-6">{profile.tagline}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{profile.bio}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              {profile.location && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin size={16} className="text-gold" />
                  {profile.location}
                </div>
              )}
              {profile.years_breeding > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={16} className="text-gold" />
                  {profile.years_breeding}+ years breeding
                </div>
              )}
              {profile.kittens_placed > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Heart size={16} className="text-gold" />
                  {profile.kittens_placed}+ kittens placed
                </div>
              )}
            </div>
            {profile.certifications && profile.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((c, i) => (
                  <span key={i} className="bg-gold/10 text-gold border border-gold/20 text-xs px-3 py-1.5 rounded-full">{c}</span>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gold/20">
              {profile.avatar_url ? (
                <Image src={profile.avatar_url} alt={profile.full_name} fill className="object-cover" sizes="600px" />
              ) : (
                <div className="w-full h-full bg-navy-mid flex items-center justify-center">
                  <span className="text-8xl">🐱</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 glass rounded-xl p-4 border border-gold/20">
              <p className="text-gold font-display text-3xl font-semibold">{profile.kittens_placed}+</p>
              <p className="text-gray-400 text-xs">Happy families</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
