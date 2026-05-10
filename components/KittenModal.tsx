"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Kitten } from '@/types';
import { X } from 'lucide-react';

interface Props { kitten: Kitten; onClose: () => void; onInquire: (name: string) => void; }

export default function KittenModal({ kitten, onClose, onInquire }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  const statusColors: Record<string, string> = {
    available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    reserved: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    sold: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-gold/20" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-navy/80 rounded-full p-2 text-gray-400 hover:text-white transition">
          <X size={18} />
        </button>
        <div className="relative h-72 w-full rounded-t-2xl overflow-hidden">
          {kitten.image_url
            ? <Image src={kitten.image_url} alt={kitten.name} fill className="object-cover" sizes="672px" />
            : <div className="w-full h-full bg-navy-mid flex items-center justify-center text-6xl">🐱</div>
          }
          <div className="absolute inset-0 bg-gradient-to-t from-navy-light/80 to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-display text-3xl font-semibold text-white">{kitten.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${statusColors[kitten.status]}`}>{kitten.status}</span>
          </div>
          <p className="text-gray-400 capitalize mb-5">{kitten.color}{kitten.pattern ? ` · ${kitten.pattern}` : ''} · {kitten.gender} · {kitten.age_weeks} weeks old</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[['Color', kitten.color], ['Gender', kitten.gender], ['Age', `${kitten.age_weeks} weeks`], ['Price', `$${kitten.price_usd.toLocaleString()}`]].map(([k, v]) => (
              <div key={k} className="bg-navy-mid rounded-xl p-3 border border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{k}</p>
                <p className="text-white capitalize font-medium">{v}</p>
              </div>
            ))}
          </div>
          {kitten.description && <p className="text-gray-400 text-sm leading-relaxed mb-6">{kitten.description}</p>}
          <div className="flex gap-3">
            <button onClick={() => onInquire(kitten.name)} disabled={kitten.status === 'sold'}
              className="flex-1 bg-gold text-navy py-3 rounded-xl font-medium hover:bg-gold-light transition disabled:opacity-40 disabled:cursor-not-allowed">
              {kitten.status === 'sold' ? 'This kitten has been adopted' : 'Inquire About This Kitten'}
            </button>
            <button onClick={onClose} className="px-5 py-3 glass border border-white/10 rounded-xl text-gray-400 hover:text-white transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
