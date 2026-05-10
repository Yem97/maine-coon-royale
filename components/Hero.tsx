"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Award, Globe, Heart } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Health Guaranteed' },
  { icon: Award, label: 'TICA Registered' },
  { icon: Globe, label: 'Nationwide Shipping' },
  { icon: Heart, label: 'Home Raised' },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy" />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)' }} />
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-medium px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
          ✦ Premium Maine Coon Kittens ✦
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6">
          <span className="text-white">Extraordinary </span>
          <em className="gold-shimmer">Maine Coons</em>
          <br />
          <span className="text-white">Raised with </span>
          <em className="text-gold">Royal Care</em>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Home-bred Maine Coon kittens raised in a loving family environment in the USA.
          Each kitten is health-tested, TICA registered, and ready to be your forever companion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/#kittens"
            className="bg-gold text-navy font-medium px-8 py-4 rounded-full hover:bg-gold-light transition-all hover:scale-105 text-base">
            Meet Our Kittens
          </Link>
          <Link href="/#contact"
            className="glass text-gold border border-gold/30 font-medium px-8 py-4 rounded-full hover:bg-gold/10 transition-all text-base">
            Join Waiting List
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="glass rounded-xl p-4 flex flex-col items-center gap-2">
              <Icon size={20} className="text-gold" />
              <span className="text-xs text-gray-400 font-light">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
