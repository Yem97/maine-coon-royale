"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Crown, LayoutDashboard, Cat, Images, Star, MessageSquare, Facebook, User, LogOut, Menu, X, ExternalLink } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/kittens', label: 'Kittens', icon: Cat },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/facebook', label: 'Facebook Posts', icon: Facebook },
  { href: '/admin/profile', label: 'My Profile', icon: User },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  const NavContent = () => (
    <>
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <Crown size={18} className="text-gold" />
          <h2 className="font-display text-lg font-semibold text-white">Maine Coon Royale</h2>
        </div>
        <p className="text-xs text-gray-500">Breeder Admin</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${active ? 'bg-gold/15 text-gold border border-gold/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={17} />{label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/5">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:bg-white/5 hover:text-white transition mb-1">
          <ExternalLink size={17} /> View Live Site
        </a>
        <button onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition">
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-navy border-r border-white/5 z-30">
        <NavContent />
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-navy border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><Crown size={16} className="text-gold" /><span className="font-display text-white">Admin</span></div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-400 hover:text-white">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black/60" onClick={() => setMobileOpen(false)}>
          <aside className="w-72 h-full bg-navy flex flex-col shadow-xl pt-14" onClick={e => e.stopPropagation()}>
            <NavContent />
          </aside>
        </div>
      )}
      <div className="md:hidden h-14" />
    </>
  );
}
