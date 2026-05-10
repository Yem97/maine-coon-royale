"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Crown } from 'lucide-react';

const links = [
  { href: '/#kittens', label: 'Kittens' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#about', label: 'About' },
  { href: '/#facebook', label: 'Updates' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Crown size={20} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="font-display text-xl font-semibold text-gold">Maine Coon Royale</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm text-gray-300 hover:text-gold transition-colors font-light tracking-wide">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/#contact"
              className="text-sm bg-gold text-navy font-medium px-5 py-2 rounded-full hover:bg-gold-light transition-colors">
              Inquire Now
            </Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300 hover:text-gold transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-navy-light border-t border-gold/10">
          <div className="px-4 py-4 space-y-3">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block text-sm text-gray-300 hover:text-gold transition-colors py-1.5">
                {l.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)}
              className="block text-center text-sm bg-gold text-navy font-medium px-5 py-2.5 rounded-full mt-2">
              Inquire Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
