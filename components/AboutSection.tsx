"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Heart, Award, Shield } from 'lucide-react';

export default function AboutSection() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => setProfile(d.profile));
  }, []);

  return (
    <section id="about" className="py-20 bg-navy-light">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
              ✦ About Us
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
              {profile?.full_name || 'Maine Coon Royale'}
            </h2>
            <p className="text-gold text-sm mb-6 font-light tracking-wide italic">
              {profile?.tagline || 'Premium Home-Bred Maine Coon Kittens'}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {profile?.bio || 'We are a family-run cattery based in the USA, raising exceptional Maine Coon kittens with love and dedication.'}
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
              <MapPin size={16} className="text-gold" />
              <span>{profile?.location || 'USA'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: 'Home Raised', desc: 'Every kitten raised in our family home' },
                { icon: Award, label: 'TICA Registered', desc: 'All kittens fully registered with TICA' },
                { icon: Shield, label: 'Health Tested', desc: '2-year genetic health guarantee' },
                { icon: MapPin, label: 'USA Based', desc: 'Nationwide and international delivery' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass rounded-xl p-4 border border-gold/10">
                  <Icon size={18} className="text-gold mb-2" />
                  <p className="text-white text-sm font-medium mb-1">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-gold/20">
              {profile?.avatar_url
                ? <Image src={profile.avatar_url} alt="Breeder" fill className="object-cover" sizes="600px" />
                : <div className="w-full h-full bg-navy-mid flex items-center justify-center text-8xl">🐱</div>
              }
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 glass rounded-2xl border border-gold/20 p-5 shadow-xl">
              <p className="text-gold font-display text-3xl font-semibold">{profile?.kittens_placed || 0}+</p>
              <p className="text-gray-400 text-xs mt-1">Happy families</p>
            </div>
            <div className="absolute -top-5 -right-5 glass rounded-2xl border border-gold/20 p-5 shadow-xl">
              <p className="text-gold font-display text-3xl font-semibold">{profile?.years_breeding || 1}+</p>
              <p className="text-gray-400 text-xs mt-1">Years breeding</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
