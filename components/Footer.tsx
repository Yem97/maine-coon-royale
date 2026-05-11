import React from 'react';
import Link from 'next/link';
import { Crown, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crown size={18} className="text-gold" />
              <h3 className="font-display text-xl font-semibold text-gold">Maine Coon Royale</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">Premium home-bred Maine Coon kittens raised with love in the USA. TICA registered, health guaranteed.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gold transition"><Instagram size={18} /></a>
              <a href="#" className="text-gray-500 hover:text-gold transition"><Facebook size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {[['/#kittens','Available Kittens'],['/#about','About Us'],['/gallery','Gallery'],['/#reviews','Reviews'],['/#contact','Contact']].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-gray-500 hover:text-gold transition text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <p className="text-gray-500 text-sm mb-2">📍 United States</p>
            <p className="text-gray-500 text-sm mb-2">💬 WhatsApp available</p>
            <p className="text-gray-500 text-sm">📧 Response within 24 hours</p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Maine Coon Royale. All rights reserved.</p>
          <p>Made with love 🐱 <Link href="/login" className="opacity-30 hover:opacity-60 transition">·</Link></p>
        </div>
      </div>
    </footer>
  );
}
