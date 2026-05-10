import React from 'react';
import Link from 'next/link';
import { Crown, Instagram, Facebook } from 'lucide-react';
import { AdminProfile } from '@/types';

export default function Footer({ profile }: { profile: AdminProfile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black/40 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crown size={20} className="text-gold" />
              <h3 className="font-display text-xl font-semibold text-gold">Maine Coon Royale</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{profile.tagline}</p>
            <div className="flex gap-4">
              {profile.instagram_url && <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold transition"><Instagram size={18} /></a>}
              {profile.facebook_url && <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold transition"><Facebook size={18} /></a>}
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {[['/#kittens','Available Kittens'], ['/gallery','Gallery'], ['/#about','About Us'], ['/#reviews','Reviews'], ['/#contact','Contact']].map(([href, label]) => (
                <li key={href}><Link href={href} className="hover:text-gold transition">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wide">Contact</h4>
            <div className="space-y-2 text-sm text-gray-500">
              {profile.email && <p>Email: {profile.email}</p>}
              {profile.whatsapp && <p>WhatsApp: {profile.whatsapp}</p>}
              {profile.location && <p>Based in: {profile.location}</p>}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {year} Maine Coon Royale. All rights reserved.</p>
          <p>Raised with love 🐱</p>
        </div>
      </div>
    </footer>
  );
}
